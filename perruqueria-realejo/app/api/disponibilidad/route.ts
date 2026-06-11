import { NextRequest, NextResponse } from "next/server";
import { getServiceBySlug } from "@/lib/data";
import { duracionHueco } from "@/lib/pricing";
import { diasConHueco, slotsLibres } from "@/lib/slots";
import type { Tamano } from "@/lib/types";

export const dynamic = "force-dynamic";

// GET /api/disponibilidad?servicio=slug&tamano=mediano&fecha=2026-06-15
// GET /api/disponibilidad?servicio=slug&tamano=mediano&desde=2026-06-15&dias=42
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const servicio = sp.get("servicio");
  const tamano = (sp.get("tamano") ?? "mediano") as Tamano;

  if (!servicio) {
    return NextResponse.json({ error: "Falta el servicio" }, { status: 400 });
  }
  const service = await getServiceBySlug(servicio);
  if (!service) {
    return NextResponse.json({ error: "Servicio no encontrado" }, { status: 404 });
  }
  const duracion = duracionHueco(service, tamano);

  const fecha = sp.get("fecha");
  if (fecha) {
    const slots = await slotsLibres(fecha, duracion);
    return NextResponse.json({ duracion, slots });
  }

  const desde = sp.get("desde");
  if (desde) {
    const dias = Math.min(Number(sp.get("dias") ?? 42), 60);
    const disponibles = await diasConHueco(desde, dias, duracion);
    return NextResponse.json({ duracion, dias: disponibles });
  }

  return NextResponse.json({ error: "Indica fecha o desde" }, { status: 400 });
}
