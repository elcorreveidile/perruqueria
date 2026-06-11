import { NextResponse } from "next/server";
import { getAdminUser, supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Exportación CSV de leads (solo admin autenticada)
export async function GET() {
  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "Supabase no configurado" }, { status: 503 });
  }
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { data } = await supabaseAdmin()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const cabecera = "fecha;origen;nombre;telefono;email;perro;raza;tamano;observaciones;resumen";
  const escapar = (v: unknown) => String(v ?? "").replaceAll(";", ",").replaceAll("\n", " ");
  const filas = (data ?? []).map((l) =>
    [
      l.created_at,
      l.origen,
      l.nombre,
      l.telefono,
      l.email,
      l.nombre_perro,
      l.raza,
      l.tamano,
      l.observaciones,
      l.resumen_tarifa ? JSON.stringify(l.resumen_tarifa).replaceAll(";", ",") : "",
    ]
      .map(escapar)
      .join(";")
  );

  return new NextResponse([cabecera, ...filas].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=leads-perruqueria.csv",
    },
  });
}
