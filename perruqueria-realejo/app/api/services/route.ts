/**
 * API Route: Services
 *
 * GET /api/services — Retorna todos los servicios visibles
 */

import { NextResponse } from "next/server";
import { getVisibleServices } from "@/lib/services";

export async function GET() {
  try {
    const services = await getVisibleServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error en /api/services:", error);
    return NextResponse.json(
      { error: "Error obteniendo servicios" },
      { status: 500 }
    );
  }
}
