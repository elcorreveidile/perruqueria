"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServiceById, getSettings } from "./data";
import { emailWaitlist, enviarEmail } from "./emails";
import { supabaseAdmin, supabaseAuthServer, supabaseConfigured } from "./supabase/server";
import type { Booking, EstadoReserva } from "./types";

// ── Sesión ───────────────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const supabase = await supabaseAuthServer();
  if (!supabase) redirect("/admin/login?error=config");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=credenciales");
  redirect("/admin");
}

export async function logoutAction() {
  const supabase = await supabaseAuthServer();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

// ── Agenda ───────────────────────────────────────────────────────────

export async function cambiarEstadoReserva(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id"));
  const estado = String(formData.get("estado")) as EstadoReserva;
  const db = supabaseAdmin();

  const { data } = await db.from("bookings").select("*").eq("id", id).single();
  const booking = data as Booking | null;
  if (!booking) return;

  await db.from("bookings").update({ estado }).eq("id", id);
  const settings = await getSettings();

  if (estado === "confirmada" && settings.recordatorios_activos) {
    // Recordatorio 24 h antes (si no existe ya)
    const enviarEn = new Date(`${booking.fecha}T${String(booking.hora_inicio).slice(0, 5)}:00`);
    enviarEn.setHours(enviarEn.getHours() - 24);
    const { data: existente } = await db
      .from("scheduled_emails")
      .select("id")
      .eq("booking_id", id)
      .eq("tipo", "recordatorio_24h")
      .is("enviado_at", null);
    if (!existente?.length) {
      await db.from("scheduled_emails").insert({
        booking_id: id,
        tipo: "recordatorio_24h",
        enviar_en: enviarEn.toISOString(),
        demo: true,
      });
    }
  }

  if (estado === "completada") {
    // Recurrencia inteligente: email a las X semanas con re-reserva en un clic
    const service = await getServiceById(booking.service_id);
    const semanas = service?.recurrencia_semanas ?? 7;
    const enviarEn = new Date(`${booking.fecha}T10:00:00`);
    enviarEn.setDate(enviarEn.getDate() + semanas * 7);
    await db.from("scheduled_emails").insert({
      booking_id: id,
      tipo: "recurrencia",
      enviar_en: enviarEn.toISOString(),
      demo: true,
    });
  }

  if (estado === "cancelada") {
    await db.from("scheduled_emails").delete().eq("booking_id", id).is("enviado_at", null);
    // Aviso al primero de la lista de espera de ese día
    const { data: espera } = await db
      .from("waitlist")
      .select("*")
      .eq("fecha_deseada", booking.fecha)
      .is("notificado_at", null)
      .order("created_at")
      .limit(1);
    const primero = espera?.[0];
    if (primero) {
      const service = await getServiceById(primero.service_id);
      await enviarEmail(
        emailWaitlist(primero.nombre, primero.email, booking.fecha, service?.nombre ?? "tu servicio")
      );
      await db
        .from("waitlist")
        .update({ notificado_at: new Date().toISOString() })
        .eq("id", primero.id);
    }
  }

  revalidatePath("/admin/agenda");
  revalidatePath("/admin");
}

// ── Bloqueos ─────────────────────────────────────────────────────────

export async function crearBloqueo(formData: FormData) {
  if (!supabaseConfigured()) return;
  const desde = String(formData.get("desde"));
  const hasta = String(formData.get("hasta") || desde);
  const hora_inicio = String(formData.get("hora_inicio") || "00:00");
  const hora_fin = String(formData.get("hora_fin") || "23:59");
  const motivo = String(formData.get("motivo") || "");

  const filas = [];
  const ini = new Date(`${desde}T00:00:00`);
  const fin = new Date(`${hasta}T00:00:00`);
  for (let d = new Date(ini); d <= fin; d.setDate(d.getDate() + 1)) {
    filas.push({
      fecha: d.toISOString().slice(0, 10),
      hora_inicio,
      hora_fin,
      motivo,
    });
  }
  await supabaseAdmin().from("blocked_slots").insert(filas);
  revalidatePath("/admin/bloqueos");
  revalidatePath("/admin/agenda");
}

export async function borrarBloqueo(formData: FormData) {
  if (!supabaseConfigured()) return;
  await supabaseAdmin().from("blocked_slots").delete().eq("id", String(formData.get("id")));
  revalidatePath("/admin/bloqueos");
  revalidatePath("/admin/agenda");
}

// ── Servicios ────────────────────────────────────────────────────────

export async function guardarServicio(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id") || "");
  const fila = {
    slug: String(formData.get("slug")),
    nombre: String(formData.get("nombre")),
    categoria: String(formData.get("categoria")),
    descripcion_corta: String(formData.get("descripcion_corta")),
    descripcion_larga: String(formData.get("descripcion_larga")),
    para_quien: String(formData.get("para_quien")),
    incluye: String(formData.get("incluye") || "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    duracion_min: Number(formData.get("duracion_min")),
    duracion_max: Number(formData.get("duracion_max")),
    recurrencia_semanas: Number(formData.get("recurrencia_semanas") || 7),
    en_calculadora: formData.get("en_calculadora") === "on",
    visible: formData.get("visible") === "on",
    updated_at: new Date().toISOString(),
  };
  const db = supabaseAdmin();
  if (id) {
    await db.from("services").update(fila).eq("id", id);
  } else {
    const { count } = await db.from("services").select("*", { count: "exact", head: true });
    await db.from("services").insert({ ...fila, orden: (count ?? 0) + 1 });
  }
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
  redirect("/admin/servicios");
}

export async function alternarVisibleServicio(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id"));
  const visible = formData.get("visible") === "true";
  await supabaseAdmin()
    .from("services")
    .update({ visible: !visible, updated_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
}

export async function moverServicio(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id"));
  const direccion = String(formData.get("direccion")); // "arriba" | "abajo"
  const db = supabaseAdmin();
  const { data } = await db.from("services").select("id, orden").order("orden");
  if (!data) return;
  const idx = data.findIndex((s) => s.id === id);
  const otro = direccion === "arriba" ? idx - 1 : idx + 1;
  if (idx < 0 || otro < 0 || otro >= data.length) return;
  await db.from("services").update({ orden: data[otro].orden }).eq("id", data[idx].id);
  await db.from("services").update({ orden: data[idx].orden }).eq("id", data[otro].id);
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
}

export async function borrarServicio(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id"));
  const db = supabaseAdmin();
  await db.from("price_matrix").delete().eq("service_id", id);
  await db.from("services").delete().eq("id", id);
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
  redirect("/admin/servicios");
}

// ── Matriz de precios ────────────────────────────────────────────────

export async function guardarPrecio(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id") || "");
  const service_id = String(formData.get("service_id"));
  const fila = {
    service_id,
    tamano: String(formData.get("tamano")),
    tipo_pelo: String(formData.get("tipo_pelo") || "") || null,
    precio_min: Number(formData.get("precio_min")),
    precio_max: Number(formData.get("precio_max")),
    recargo_nudos_pct: Number(formData.get("recargo_nudos_pct") || 20),
    es_precio_real: formData.get("es_precio_real") === "on",
    updated_at: new Date().toISOString(),
  };
  const db = supabaseAdmin();
  if (id) {
    await db.from("price_matrix").update(fila).eq("id", id);
  } else {
    await db.from("price_matrix").insert(fila);
  }
  revalidatePath(`/admin/servicios/${service_id}`);
  revalidatePath("/servicios");
}

export async function borrarPrecio(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id"));
  const service_id = String(formData.get("service_id"));
  await supabaseAdmin().from("price_matrix").delete().eq("id", id);
  revalidatePath(`/admin/servicios/${service_id}`);
  revalidatePath("/servicios");
}

// ── Ajustes ──────────────────────────────────────────────────────────

export async function guardarAjustes(formData: FormData) {
  if (!supabaseConfigured()) return;
  await supabaseAdmin()
    .from("settings")
    .upsert({
      id: 1,
      margen_minutos: Number(formData.get("margen_minutos") || 10),
      confirmacion_automatica: formData.get("confirmacion_automatica") === "on",
      antelacion_min_horas: Number(formData.get("antelacion_min_horas") || 2),
      horizonte_max_semanas: Number(formData.get("horizonte_max_semanas") || 6),
      recordatorios_activos: formData.get("recordatorios_activos") === "on",
    });
  revalidatePath("/admin/ajustes");
}

export async function guardarRecurrencia(formData: FormData) {
  if (!supabaseConfigured()) return;
  const id = String(formData.get("id"));
  await supabaseAdmin()
    .from("services")
    .update({ recurrencia_semanas: Number(formData.get("recurrencia_semanas") || 7) })
    .eq("id", id);
  revalidatePath("/admin/ajustes");
}
