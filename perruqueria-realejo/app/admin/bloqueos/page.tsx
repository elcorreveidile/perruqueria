import { format } from "date-fns";
import { borrarBloqueo, crearBloqueo } from "@/lib/admin-actions";
import { getBlockedSlots } from "@/lib/data";
import { supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function BloqueosPage() {
  if (!supabaseConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura Supabase para gestionar bloqueos.</p>;
  }

  const hoy = format(new Date(), "yyyy-MM-dd");
  const bloqueos = await getBlockedSlots(hoy, "2099-12-31");

  return (
    <div>
      <h1 className="text-2xl">Bloquear huecos</h1>
      <p className="mt-1 text-sm text-tinta-suave">
        Vacaciones, médico, cierres puntuales… Bloquea una franja, una tarde o semanas
        enteras en dos toques.
      </p>

      <form action={crearBloqueo} className="mt-6 grid gap-3 rounded-3xl bg-white p-6 sm:grid-cols-2">
        <label className="text-sm font-bold">
          Desde*
          <input name="desde" type="date" required min={hoy} className="mt-1 w-full rounded-full border border-cielo px-4 py-2 font-normal" />
        </label>
        <label className="text-sm font-bold">
          Hasta <span className="font-normal text-tinta-suave">(vacío = solo ese día)</span>
          <input name="hasta" type="date" min={hoy} className="mt-1 w-full rounded-full border border-cielo px-4 py-2 font-normal" />
        </label>
        <label className="text-sm font-bold">
          Hora inicio <span className="font-normal text-tinta-suave">(vacío = todo el día)</span>
          <input name="hora_inicio" type="time" className="mt-1 w-full rounded-full border border-cielo px-4 py-2 font-normal" />
        </label>
        <label className="text-sm font-bold">
          Hora fin
          <input name="hora_fin" type="time" className="mt-1 w-full rounded-full border border-cielo px-4 py-2 font-normal" />
        </label>
        <label className="text-sm font-bold sm:col-span-2">
          Motivo <span className="font-normal text-tinta-suave">(solo lo ves tú)</span>
          <input name="motivo" placeholder="Vacaciones, médico…" className="mt-1 w-full rounded-full border border-cielo px-4 py-2 font-normal" />
        </label>
        <button type="submit" className="rounded-full bg-coral px-6 py-2.5 font-bold text-white hover:bg-coral-oscuro sm:col-span-2">
          Bloquear
        </button>
      </form>

      <h2 className="mt-8 text-lg">Bloqueos activos</h2>
      {bloqueos.length === 0 ? (
        <p className="mt-2 text-sm text-tinta-suave">No hay bloqueos próximos.</p>
      ) : (
        <ul className="mt-3 grid gap-2">
          {bloqueos.map((b) => (
            <li key={b.id} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
              <span>
                <strong className="capitalize">
                  {new Date(`${b.fecha}T12:00:00`).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" })}
                </strong>{" "}
                · {b.hora_inicio}–{b.hora_fin}
                {b.motivo ? ` · ${b.motivo}` : ""}
              </span>
              <form action={borrarBloqueo}>
                <input type="hidden" name="id" value={b.id} />
                <button type="submit" className="font-bold text-coral hover:underline">
                  Quitar
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
