import { dbConfigured, sql } from "@/lib/db";
import { labelTamano, type Lead } from "@/lib/types";

export const dynamic = "force-dynamic";

const etiquetaOrigen: Record<string, string> = {
  calculadora: "🧮 Calculadora",
  cita: "📅 Cita",
  contacto: "💬 Contacto",
};

export default async function LeadsPage() {
  if (!dbConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura la base de datos para ver los leads.</p>;
  }

  const data = await sql()`
    select id, nombre, telefono, email, nombre_perro, raza, tamano,
           observaciones, origen, resumen_tarifa, created_at::text
    from leads order by created_at desc limit 200`;
  const leads = data as unknown as Lead[];

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">Leads ({leads.length})</h1>
        <a href="/api/admin/leads-csv" className="rounded-full bg-tinta px-5 py-2 text-sm font-bold text-white">
          ⬇ Exportar CSV
        </a>
      </header>
      <p className="mt-1 text-sm text-tinta-suave">
        Personas que han dejado sus datos en la calculadora, las citas o el contacto.
      </p>

      {leads.length === 0 ? (
        <p className="mt-6 text-sm text-tinta-suave">Todavía no hay leads.</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {leads.map((l) => (
            <li key={l.id} className="rounded-2xl bg-white p-4 text-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold">
                  {l.nombre || l.email || l.telefono || "Anónimo"}
                  {l.nombre_perro && (
                    <span className="font-normal text-tinta-suave">
                      {" "}· 🐶 {l.nombre_perro}{l.raza ? ` (${l.raza})` : ""} {l.tamano ? `· ${labelTamano(l.tamano)}` : ""}
                    </span>
                  )}
                </p>
                <span className="rounded-full bg-cielo/40 px-3 py-1 text-xs font-bold">
                  {etiquetaOrigen[l.origen] ?? l.origen}
                </span>
              </div>
              <p className="mt-1 text-tinta-suave">
                {[l.email, l.telefono].filter(Boolean).join(" · ")}
                {" · "}
                {new Date(l.created_at).toLocaleString("es-ES")}
              </p>
              {l.observaciones && <p className="mt-1 rounded-xl bg-crema px-3 py-1.5 text-xs">📋 {l.observaciones}</p>}
              {l.resumen_tarifa && (
                <p className="mt-1 text-xs text-tinta-suave">
                  Tarifa consultada: {Object.entries(l.resumen_tarifa).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
