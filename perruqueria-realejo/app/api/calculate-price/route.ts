/**
 * API Route: Calculate Price
 *
 * GET /api/calculate-price?tamanho=...&tipoPelo=...&estadoPelo=...&servicio=...
 * Retorna el precio calculado
 */

import { NextRequest, NextResponse } from "next/server";
import {
  getPrice,
  getServiceBySlug,
  calculatePriceWithSurcharge,
  getCoatConditionSurcharge,
} from "@/lib/services";
import type { DogSizes, CoatTypes, CoatCondition } from "@/components/calculator/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tamanho = searchParams.get("tamanho") as DogSizes;
    const tipoPelo = searchParams.get("tipoPelo") as CoatTypes;
    const estadoPelo = searchParams.get("estadoPelo") as CoatCondition;
    const servicioSlug = searchParams.get("servicio");

    // Validar parámetros
    if (!tamanho || !tipoPelo || !estadoPelo || !servicioSlug) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    // Obtener servicio
    const service = await getServiceBySlug(servicioSlug);
    if (!service) {
      return NextResponse.json(
        { error: "Servicio no encontrado" },
        { status: 404 }
      );
    }

    // Obtener precio base
    const priceData = await getPrice(servicioSlug, tamanho, tipoPelo);
    if (!priceData) {
      return NextResponse.json(
        {
          error:
            "No hay precio configurado para esta combinación. Prueba con otra opción.",
        },
        { status: 404 }
      );
    }

    // Obtener recargo por estado del pelo
    const coatConditionSurcharge = getCoatConditionSurcharge(estadoPelo);

    // Calcular precio final
    const finalPrice = calculatePriceWithSurcharge(
      priceData.precioMin,
      priceData.precioMax,
      coatConditionSurcharge
    );

    // Calcular duración con recargo
    const duracionMin = service.duracion_min;
    const duracionMax = Math.round(
      service.duracion_max * (1 + coatConditionSurcharge / 100)
    );

    return NextResponse.json({
      precioMin: finalPrice.precioMin,
      precioMax: finalPrice.precioMax,
      duracionMin,
      duracionMax,
      servicio: service.nombre,
      esPrecioReal: priceData.esPrecioReal,
    });
  } catch (error) {
    console.error("Error en /api/calculate-price:", error);
    return NextResponse.json(
      { error: "Error calculando precio" },
      { status: 500 }
    );
  }
}
