import Link from "next/link";
import { addDays, format } from "date-fns";
import { getBookings, getServices } from "@/lib/data";
import { supabaseConfigured } from "@/lib/supabase/server";
import { TarjetaReserva } from "@/components/admin/TarjetaReserva";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  if (!supabaseConfigured()) {
    return (
      <p className="rounded-2xl bg-cielo-claro p-4 text-sm">
        Configura Supabase (ver README) para activar el panel.
      </p>
    );
  }

  const hoy = format(new Date(), "yyyy-MM-dd");
  const finSemana = format(addDays(new Date(), 7), "yyyy-MM-dd");
  const [reservas, services] = await Promise.all([
    getBookings(hoy, finSemana),
    getServices({ includeHidden: true }),
  ]);

  const deHoy = reservas.filter((r) => r.fecha === hoy);
  const pendientes = reservas.filter((r) => r.estado === "pendiente");
  const proximas = reservas
    .filter((r) => r.fecha > hoy && (r.estado === "confirmada" || r.estado === "pendiente"))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">Hoy, {new Date().toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}</h1>
        <Link href="/admin/agenda" className="rounded-full bg-coral px-5 py-2 text-sm font-bold text-white">
          Ver agenda completa
        </Link>
      </header>

      {pendientes.length > 0 && (
        <section>
          <h2 className="text-lg">⏳ Por confirmar ({pendientes.length})</h2>
          <div className="mt-3 grid gap-3">
            {pendientes.map((b) => (
              <TarjetaReserva key={b.id} booking={b} service={services.find((s) => s.id === b.service_id)} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg">📅 Citas de hoy ({deHoy.length})</h2>
        {deHoy.length === 0 ? (
          <p className="mt-3 text-sm text-tinta-suave">Hoy no hay citas en la demo.</p>
        ) : (
          <div className="mt-3 grid gap-3">
            {deHoy.map((b) => (
              <TarjetaReserva key={b.id} booking={b} service={services.find((s) => s.id === b.service_id)} />
            ))}
          </div>
        )}
      </section>

      {proximas.length > 0 && (
        <section>
          <h2 className="text-lg">🔜 Próximos días</h2>
          <div className="mt-3 grid gap-3">
            {proximas.map((b) => (
              <div key={b.id}>
                <p className="mb-1 text-xs font-bold uppercase text-tinta-suave">
                  {new Date(`${b.fecha}T12:00:00`).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <TarjetaReserva booking={b} service={services.find((s) => s.id === b.service_id)} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
