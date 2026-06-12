import Link from "next/link";
import { addDays, format, startOfWeek } from "date-fns";
import { getBlockedSlots, getBookings, getServices } from "@/lib/data";
import { dbConfigured } from "@/lib/db";
import { TarjetaReserva } from "@/components/admin/TarjetaReserva";
import { borrarBloqueo } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: Promise<{ semana?: string }>;
}) {
  if (!dbConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura la base de datos (ver README) para activar la agenda.</p>;
  }

  const { semana } = await searchParams;
  const base = semana ? new Date(`${semana}T00:00:00`) : new Date();
  const lunes = startOfWeek(base, { weekStartsOn: 1 });
  const desde = format(lunes, "yyyy-MM-dd");
  const hasta = format(addDays(lunes, 6), "yyyy-MM-dd");

  const [reservas, bloqueos, services] = await Promise.all([
    getBookings(desde, hasta),
    getBlockedSlots(desde, hasta),
    getServices({ includeHidden: true }),
  ]);

  const dias = Array.from({ length: 7 }, (_, i) => format(addDays(lunes, i), "yyyy-MM-dd"));
  const semanaAnterior = format(addDays(lunes, -7), "yyyy-MM-dd");
  const semanaSiguiente = format(addDays(lunes, 7), "yyyy-MM-dd");

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">Agenda</h1>
        <div className="flex items-center gap-2 text-sm font-bold">
          <Link href={`/admin/agenda?semana=${semanaAnterior}`} className="rounded-full border border-tinta/20 px-4 py-1.5 hover:border-coral">
            ← Anterior
          </Link>
          <Link href="/admin/agenda" className="rounded-full border border-tinta/20 px-4 py-1.5 hover:border-coral">
            Hoy
          </Link>
          <Link href={`/admin/agenda?semana=${semanaSiguiente}`} className="rounded-full border border-tinta/20 px-4 py-1.5 hover:border-coral">
            Siguiente →
          </Link>
        </div>
        <Link href="/admin/bloqueos" className="rounded-full bg-tinta px-4 py-1.5 text-sm font-bold text-white">
          + Bloquear huecos
        </Link>
      </header>

      <div className="mt-6 space-y-6">
        {dias.map((dia) => {
          const delDia = reservas.filter((r) => r.fecha === dia);
          const bloqueosDia = bloqueos.filter((b) => b.fecha === dia);
          const esFinde = [0, 6].includes(new Date(`${dia}T12:00:00`).getDay());
          if (esFinde && delDia.length === 0 && bloqueosDia.length === 0) return null;
          return (
            <section key={dia}>
              <h2 className="text-base font-bold capitalize">
                {new Date(`${dia}T12:00:00`).toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </h2>
              {bloqueosDia.map((b) => (
                <div key={b.id} className="mt-2 flex items-center justify-between rounded-2xl bg-tinta/5 px-4 py-2 text-sm">
                  <span>
                    🚫 Bloqueado {b.hora_inicio}–{b.hora_fin}
                    {b.motivo ? ` · ${b.motivo}` : ""}
                  </span>
                  <form action={borrarBloqueo}>
                    <input type="hidden" name="id" value={b.id} />
                    <button type="submit" className="text-xs font-bold text-coral hover:underline">
                      Quitar
                    </button>
                  </form>
                </div>
              ))}
              {delDia.length === 0 && bloqueosDia.length === 0 ? (
                <p className="mt-2 text-sm text-tinta-suave">Sin citas.</p>
              ) : (
                <div className="mt-2 grid gap-3">
                  {delDia.map((b) => (
                    <TarjetaReserva key={b.id} booking={b} service={services.find((s) => s.id === b.service_id)} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
