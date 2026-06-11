import { NextRequest, NextResponse } from "next/server";
import { getServiceById, getSettings } from "@/lib/data";
import {
  emailRecordatorio24h,
  emailRecurrencia,
  enviarEmail,
} from "@/lib/emails";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";
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

  if (!supabaseConfigured()) {
    return NextResponse.json({ ok: true, procesados: 0, nota: "Supabase no configurado" });
  }

  const settings = await getSettings();
  if (!settings.recordatorios_activos) {
    return NextResponse.json({ ok: true, procesados: 0, nota: "Recordatorios desactivados" });
  }

  const db = supabaseAdmin();
  const { data: pendientes, error } = await db
    .from("scheduled_emails")
    .select("*, bookings(*)")
    .is("enviado_at", null)
    .lte("enviar_en", new Date().toISOString())
    .limit(50);

  if (error) {
    console.error("[cron] error consultando scheduled_emails:", error);
    return NextResponse.json({ error: "Error de consulta" }, { status: 500 });
  }

  let enviados = 0;
  for (const fila of pendientes ?? []) {
    const booking = fila.bookings as Booking | null;
    if (!booking) continue;

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
            ? emailRecordatorio24h(
                { ...booking, hora_inicio: String(booking.hora_inicio).slice(0, 5) },
                service
              )
            : emailRecurrencia(booking, service);
        const { ok } = await enviarEmail(email);
        if (ok) enviados++;
      }
    }

    // Se marca como procesado en cualquier caso para no reintentar eternamente
    await db
      .from("scheduled_emails")
      .update({ enviado_at: new Date().toISOString() })
      .eq("id", fila.id);
  }

  return NextResponse.json({ ok: true, procesados: pendientes?.length ?? 0, enviados });
}
