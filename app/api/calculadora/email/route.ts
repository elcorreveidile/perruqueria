import { NextRequest, NextResponse } from "next/server";
import { emailResultadoCalculadora, enviarEmail } from "@/lib/emails";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// POST: envía el resultado de la calculadora por email y registra el lead
export async function POST(req: NextRequest) {
  let body: {
    email: string;
    servicio: string;
    tamano: string;
    pelo: string;
    estado: string;
    rango: string;
    duracion: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }
  if (!body.email || !body.servicio || !body.rango) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  if (supabaseConfigured()) {
    await supabaseAdmin().from("leads").insert({
      email: body.email,
      origen: "calculadora",
      resumen_tarifa: {
        servicio: body.servicio,
        tamano: body.tamano,
        pelo: body.pelo,
        estado: body.estado,
        rango: body.rango,
        duracion: body.duracion,
      },
      demo: true,
    });
  }

  const { ok } = await enviarEmail(
    emailResultadoCalculadora(body.email, {
      servicio: body.servicio,
      tamano: body.tamano,
      pelo: body.pelo,
      estado: body.estado,
      rango: body.rango,
      duracion: body.duracion,
    })
  );

  return NextResponse.json({ ok });
}
