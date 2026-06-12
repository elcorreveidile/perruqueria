import { NextResponse } from "next/server";
import { sesionActiva } from "@/lib/auth";
import { dbConfigured, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

// Exportación CSV de leads (solo con sesión de admin)
export async function GET() {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "Base de datos no configurada" }, { status: 503 });
  }
  if (!(await sesionActiva())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const data = await sql()`
    select created_at::text, origen, nombre, telefono, email, nombre_perro,
           raza, tamano, observaciones, resumen_tarifa
    from leads order by created_at desc`;

  const cabecera = "fecha;origen;nombre;telefono;email;perro;raza;tamano;observaciones;resumen";
  const escapar = (v: unknown) => String(v ?? "").replaceAll(";", ",").replaceAll("\n", " ");
  const filas = data.map((l) =>
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
