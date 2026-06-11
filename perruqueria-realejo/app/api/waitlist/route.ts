import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/data";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// POST: apuntarse a la lista de espera de un día completo
export async function POST(req: NextRequest) {
  let body: { servicio: string; fecha: string; nombre: string; telefono: string; email: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }
  const { servicio, fecha, nombre, telefono, email } = body;
  if (!servicio || !fecha || !nombre || !email) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }
  const service = await getServiceBySlug(servicio);
  if (!service) return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });

  if (supabaseConfigured()) {
    const { error } = await supabaseAdmin().from("waitlist").insert({
      fecha_deseada: fecha,
      service_id: service.id,
      nombre,
      telefono: telefono ?? "",
      email,
    });
    if (error) {
      console.error("[waitlist] error:", error);
      return NextResponse.json({ error: "No se pudo guardar" }, { status: 500 });
    }
  }
  return NextResponse.json({ ok: true, demo: !supabaseConfigured() });
}
