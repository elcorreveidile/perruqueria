import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getServiceBySlug, getSettings } from "@/lib/data";
import { duracionHueco } from "@/lib/pricing";
import { slotsLibres, toHHMM, toMin } from "@/lib/slots";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";
import {
  emailAvisoPeluquera,
  emailConfirmacionCliente,
  enviarEmail,
} from "@/lib/emails";
import type { Booking, Tamano } from "@/lib/types";

export const dynamic = "force-dynamic";

interface Payload {
  servicio: string; // slug
  tamano: Tamano;
  fecha: string;
  hora_inicio: string;
  nombre: string;
  telefono: string;
  email?: string;
  nombre_perro: string;
  raza?: string;
  observaciones?: string;
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const { servicio, tamano, fecha, hora_inicio, nombre, telefono, nombre_perro } = body;
  if (!servicio || !tamano || !fecha || !hora_inicio || !nombre || !telefono || !nombre_perro) {
    return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha) || !/^\d{2}:\d{2}$/.test(hora_inicio)) {
    return NextResponse.json({ error: "Fecha u hora inválidas" }, { status: 400 });
  }

  const service = await getServiceBySlug(servicio);
  if (!service || !service.visible) {
    return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  }

  const duracion = duracionHueco(service, tamano);
  const hora_fin = toHHMM(toMin(hora_inicio) + duracion);

  // Comprobación de hueco libre (la garantía final la da la base de datos)
  const libres = await slotsLibres(fecha, duracion);
  if (!libres.some((s) => s.hora_inicio === hora_inicio)) {
    return NextResponse.json(
      { error: "Ese hueco acaba de ocuparse. Elige otro, porfa 🐾" },
      { status: 409 }
    );
  }

  const settings = await getSettings();
  const estado = settings.confirmacion_automatica ? "confirmada" : "pendiente";
  const token = randomUUID();

  const booking: Booking = {
    id: randomUUID(),
    service_id: service.id,
    fecha,
    hora_inicio,
    hora_fin,
    nombre,
    telefono,
    email: body.email || null,
    nombre_perro,
    raza: body.raza || null,
    tamano,
    observaciones: body.observaciones || null,
    estado,
    token_cancelacion: token,
    created_at: new Date().toISOString(),
  };

  if (supabaseConfigured()) {
    const db = supabaseAdmin();
    const { error } = await db.from("bookings").insert({
      id: booking.id,
      service_id: booking.service_id,
      fecha,
      hora_inicio,
      hora_fin,
      nombre,
      telefono,
      email: booking.email,
      nombre_perro,
      raza: booking.raza,
      tamano,
      observaciones: booking.observaciones,
      estado,
      token_cancelacion: token,
      demo: true,
    });
    if (error) {
      // 23P01: constraint de exclusión anti-solapamiento
      if (error.code === "23P01" || error.code === "23505") {
        return NextResponse.json(
          { error: "Ese hueco acaba de ocuparse. Elige otro, porfa 🐾" },
          { status: 409 }
        );
      }
      console.error("[reservas] error al insertar:", error);
      return NextResponse.json({ error: "No se pudo guardar la reserva" }, { status: 500 });
    }

    // Si queda confirmada de inicio, programamos el recordatorio 24 h
    if (estado === "confirmada" && settings.recordatorios_activos) {
      const enviarEn = new Date(`${fecha}T${hora_inicio}:00`);
      enviarEn.setHours(enviarEn.getHours() - 24);
      await db.from("scheduled_emails").insert({
        booking_id: booking.id,
        tipo: "recordatorio_24h",
        enviar_en: enviarEn.toISOString(),
        demo: true,
      });
    }
  }

  // Emails (en demo, desviados a la dirección de pruebas)
  if (booking.email) await enviarEmail(emailConfirmacionCliente(booking, service));
  await enviarEmail(emailAvisoPeluquera(booking, service));

  return NextResponse.json({
    ok: true,
    estado,
    demo: !supabaseConfigured(),
    reserva: { fecha, hora_inicio, hora_fin, servicio: service.nombre },
  });
}
