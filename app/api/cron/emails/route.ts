import { NextRequest, NextResponse } from "next/server";
import { getServiceById, getSettings } from "@/lib/data";
import {
  emailRecordatorio24h,
  emailRecurrencia,
  enviarEmail,
} from "@/lib/emails";
import { dbConfigured, sql } from "@/lib/db";
import type { Booking } from "@/lib/types";

export const dynamic = "force-dynamic";

// Cron diario (Vercel Cron): procesa los emails programados pendientes
// (recordatorios 24 h y recurrencia). En demo todo se desvía a la
// dirección de pruebas.
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  if (!dbConfigured()) {
    return NextResponse.json({ ok: true, procesados: 0, nota: "Base de datos no configurada" });
  }

  const settings = await getSettings();
  if (!settings.recordatorios_activos) {
    return NextResponse.json({ ok: true, procesados: 0, nota: "Recordatorios desactivados" });
  }

  const pendientes = await sql()`
    select se.id, se.tipo,
           b.id as booking_id, b.service_id, b.fecha::text,
           b.hora_inicio::text, b.hora_fin::text, b.nombre, b.telefono,
           b.email, b.nombre_perro, b.raza, b.tamano, b.observaciones,
           b.estado, b.token_cancelacion
    from scheduled_emails se
    join bookings b on b.id = se.booking_id
    where se.enviado_at is null and se.enviar_en <= now()
    limit 50`;

  let enviados = 0;
  for (const fila of pendientes) {
    const booking = {
      ...fila,
      id: fila.booking_id,
      hora_inicio: String(fila.hora_inicio).slice(0, 5),
      hora_fin: String(fila.hora_fin).slice(0, 5),
    } as unknown as Booking;

    // Recordatorio solo si la cita sigue confirmada; recurrencia solo si
    // la cita se completó y el cliente dejó email.
    const procede =
      (fila.tipo === "recordatorio_24h" && booking.estado === "confirmada") ||
      (fila.tipo === "recurrencia" && booking.estado === "completada");

    if (procede && booking.email) {
      const service = await getServiceById(booking.service_id);
      if (service) {
        const email =
          fila.tipo === "recordatorio_24h"
            ? emailRecordatorio24h(booking, service)
            : emailRecurrencia(booking, service);
        const { ok } = await enviarEmail(email);
        if (ok) enviados++;
      }
    }

    // Se marca como procesado en cualquier caso para no reintentar eternamente
    await sql()`update scheduled_emails set enviado_at = now() where id = ${fila.id}`;
  }

  return NextResponse.json({ ok: true, procesados: pendientes.length, enviados });
}
