"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cerrarSesion, credencialesValidas, iniciarSesion, sesionActiva } from "./auth";
import { getBookingById, getServiceById, getSettings, notificarListaEspera } from "./data";
import { dbConfigured, sql } from "./db";
import type { EstadoReserva } from "./types";

// ── Sesión ───────────────────────────────────────────────────────────

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!credencialesValidas(email, password)) {
    redirect("/admin/login?error=credenciales");
  }
  await iniciarSesion();
  redirect("/admin");
}

export async function logoutAction() {
  await cerrarSesion();
  redirect("/admin/login");
}

async function requireAdmin(): Promise<boolean> {
  return (await sesionActiva()) && dbConfigured();
}

// ── Agenda ───────────────────────────────────────────────────────────

export async function cambiarEstadoReserva(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id"));
  const estado = String(formData.get("estado")) as EstadoReserva;

  const booking = await getBookingById(id);
  if (!booking) return;

  await sql()`update bookings set estado = ${estado} where id = ${id}`;
  const settings = await getSettings();

  if (estado === "confirmada" && settings.recordatorios_activos) {
    // Recordatorio 24 h antes (si no existe ya)
    const enviarEn = new Date(`${booking.fecha}T${booking.hora_inicio}:00`);
    enviarEn.setHours(enviarEn.getHours() - 24);
    const existentes = await sql()`
      select id from scheduled_emails
      where booking_id = ${id} and tipo = 'recordatorio_24h' and enviado_at is null`;
    if (existentes.length === 0) {
      await sql()`
        insert into scheduled_emails (booking_id, tipo, enviar_en, demo)
        values (${id}, 'recordatorio_24h', ${enviarEn.toISOString()}, true)`;
    }
  }

  if (estado === "completada") {
    // Recurrencia inteligente: email a las X semanas con re-reserva en un clic
    const service = await getServiceById(booking.service_id);
    const semanas = service?.recurrencia_semanas ?? 7;
    const enviarEn = new Date(`${booking.fecha}T10:00:00`);
    enviarEn.setDate(enviarEn.getDate() + semanas * 7);
    await sql()`
      insert into scheduled_emails (booking_id, tipo, enviar_en, demo)
      values (${id}, 'recurrencia', ${enviarEn.toISOString()}, true)`;
  }

  if (estado === "cancelada") {
    await sql()`
      delete from scheduled_emails
      where booking_id = ${id} and enviado_at is null`;
    await notificarListaEspera(booking.fecha);
  }

  revalidatePath("/admin/agenda");
  revalidatePath("/admin");
}

// ── Bloqueos ─────────────────────────────────────────────────────────

export async function crearBloqueo(formData: FormData) {
  if (!(await requireAdmin())) return;
  const desde = String(formData.get("desde"));
  const hasta = String(formData.get("hasta") || desde);
  const hora_inicio = String(formData.get("hora_inicio") || "00:00");
  const hora_fin = String(formData.get("hora_fin") || "23:59");
  const motivo = String(formData.get("motivo") || "");

  const ini = new Date(`${desde}T00:00:00`);
  const fin = new Date(`${hasta}T00:00:00`);
  for (let d = new Date(ini); d <= fin; d.setDate(d.getDate() + 1)) {
    const fecha = d.toISOString().slice(0, 10);
    await sql()`
      insert into blocked_slots (fecha, hora_inicio, hora_fin, motivo)
      values (${fecha}, ${hora_inicio}, ${hora_fin}, ${motivo})`;
  }
  revalidatePath("/admin/bloqueos");
  revalidatePath("/admin/agenda");
}

export async function borrarBloqueo(formData: FormData) {
  if (!(await requireAdmin())) return;
  await sql()`delete from blocked_slots where id = ${String(formData.get("id"))}`;
  revalidatePath("/admin/bloqueos");
  revalidatePath("/admin/agenda");
}

// ── Servicios ────────────────────────────────────────────────────────

export async function guardarServicio(formData: FormData) {
  if (!(await requireAdmin())) return;
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
  };
  if (id) {
    await sql()`
      update services set
        slug = ${fila.slug}, nombre = ${fila.nombre}, categoria = ${fila.categoria},
        descripcion_corta = ${fila.descripcion_corta},
        descripcion_larga = ${fila.descripcion_larga},
        para_quien = ${fila.para_quien}, incluye = ${fila.incluye},
        duracion_min = ${fila.duracion_min}, duracion_max = ${fila.duracion_max},
        recurrencia_semanas = ${fila.recurrencia_semanas},
        en_calculadora = ${fila.en_calculadora}, visible = ${fila.visible},
        updated_at = now()
      where id = ${id}`;
  } else {
    await sql()`
      insert into services (slug, nombre, categoria, descripcion_corta,
        descripcion_larga, para_quien, incluye, duracion_min, duracion_max,
        recurrencia_semanas, en_calculadora, visible, orden)
      values (${fila.slug}, ${fila.nombre}, ${fila.categoria},
        ${fila.descripcion_corta}, ${fila.descripcion_larga}, ${fila.para_quien},
        ${fila.incluye}, ${fila.duracion_min}, ${fila.duracion_max},
        ${fila.recurrencia_semanas}, ${fila.en_calculadora}, ${fila.visible},
        (select coalesce(max(orden), 0) + 1 from services))`;
  }
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
  redirect("/admin/servicios");
}

export async function alternarVisibleServicio(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id"));
  const visible = formData.get("visible") === "true";
  await sql()`
    update services set visible = ${!visible}, updated_at = now() where id = ${id}`;
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
}

export async function moverServicio(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id"));
  const direccion = String(formData.get("direccion")); // "arriba" | "abajo"
  const data = await sql()`select id, orden from services order by orden`;
  const idx = data.findIndex((s) => s.id === id);
  const otro = direccion === "arriba" ? idx - 1 : idx + 1;
  if (idx < 0 || otro < 0 || otro >= data.length) return;
  await sql()`update services set orden = ${data[otro].orden} where id = ${data[idx].id}`;
  await sql()`update services set orden = ${data[idx].orden} where id = ${data[otro].id}`;
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
}

export async function borrarServicio(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id"));
  await sql()`delete from price_matrix where service_id = ${id}`;
  await sql()`delete from services where id = ${id}`;
  revalidatePath("/admin/servicios");
  revalidatePath("/servicios");
  redirect("/admin/servicios");
}

// ── Matriz de precios ────────────────────────────────────────────────

export async function guardarPrecio(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id") || "");
  const service_id = String(formData.get("service_id"));
  const tamano = String(formData.get("tamano"));
  const tipo_pelo = String(formData.get("tipo_pelo") || "") || null;
  const precio_min = Number(formData.get("precio_min"));
  const precio_max = Number(formData.get("precio_max"));
  const recargo = Number(formData.get("recargo_nudos_pct") || 20);
  const es_precio_real = formData.get("es_precio_real") === "on";

  if (id) {
    await sql()`
      update price_matrix set
        tamano = ${tamano}, tipo_pelo = ${tipo_pelo},
        precio_min = ${precio_min}, precio_max = ${precio_max},
        recargo_nudos_pct = ${recargo}, es_precio_real = ${es_precio_real},
        updated_at = now()
      where id = ${id}`;
  } else {
    await sql()`
      insert into price_matrix (service_id, tamano, tipo_pelo, precio_min,
        precio_max, recargo_nudos_pct, es_precio_real)
      values (${service_id}, ${tamano}, ${tipo_pelo}, ${precio_min},
        ${precio_max}, ${recargo}, ${es_precio_real})`;
  }
  revalidatePath(`/admin/servicios/${service_id}`);
  revalidatePath("/servicios");
}

export async function borrarPrecio(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id"));
  const service_id = String(formData.get("service_id"));
  await sql()`delete from price_matrix where id = ${id}`;
  revalidatePath(`/admin/servicios/${service_id}`);
  revalidatePath("/servicios");
}

// ── Ajustes ──────────────────────────────────────────────────────────

export async function guardarAjustes(formData: FormData) {
  if (!(await requireAdmin())) return;
  const margen = Number(formData.get("margen_minutos") || 10);
  const auto = formData.get("confirmacion_automatica") === "on";
  const antelacion = Number(formData.get("antelacion_min_horas") || 2);
  const horizonte = Number(formData.get("horizonte_max_semanas") || 6);
  const recordatorios = formData.get("recordatorios_activos") === "on";
  await sql()`
    insert into settings (id, margen_minutos, confirmacion_automatica,
      antelacion_min_horas, horizonte_max_semanas, recordatorios_activos)
    values (1, ${margen}, ${auto}, ${antelacion}, ${horizonte}, ${recordatorios})
    on conflict (id) do update set
      margen_minutos = excluded.margen_minutos,
      confirmacion_automatica = excluded.confirmacion_automatica,
      antelacion_min_horas = excluded.antelacion_min_horas,
      horizonte_max_semanas = excluded.horizonte_max_semanas,
      recordatorios_activos = excluded.recordatorios_activos`;
  revalidatePath("/admin/ajustes");
}

export async function guardarRecurrencia(formData: FormData) {
  if (!(await requireAdmin())) return;
  const id = String(formData.get("id"));
  const semanas = Number(formData.get("recurrencia_semanas") || 7);
  await sql()`update services set recurrencia_semanas = ${semanas} where id = ${id}`;
  revalidatePath("/admin/ajustes");
}
