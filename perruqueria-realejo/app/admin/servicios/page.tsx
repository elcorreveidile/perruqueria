import Link from "next/link";
import { alternarVisibleServicio, moverServicio } from "@/lib/admin-actions";
import { getServices } from "@/lib/data";
import { supabaseConfigured } from "@/lib/supabase/server";
import { labelCategoria } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminServiciosPage() {
  if (!supabaseConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura Supabase para gestionar servicios.</p>;
  }

  const services = await getServices({ includeHidden: true });

  return (
    <div>
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl">Servicios y precios</h1>
        <Link href="/admin/servicios/nuevo" className="rounded-full bg-coral px-5 py-2 text-sm font-bold text-white">
          + Nuevo servicio
        </Link>
      </header>

      <ul className="mt-6 grid gap-3">
        {services.map((s, i) => (
          <li key={s.id} className={`rounded-2xl bg-white p-4 ${s.visible ? "" : "opacity-60"}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs font-bold uppercase text-coral">{labelCategoria(s.categoria)}</p>
                <p className="font-bold">
                  {s.nombre} {!s.visible && <span className="text-xs text-tinta-suave">(oculto)</span>}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <form action={moverServicio}>
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="direccion" value="arriba" />
                  <button type="submit" disabled={i === 0} aria-label={`Subir ${s.nombre}`} className="rounded-full border border-tinta/20 px-3 py-1 disabled:opacity-30">↑</button>
                </form>
                <form action={moverServicio}>
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="direccion" value="abajo" />
                  <button type="submit" disabled={i === services.length - 1} aria-label={`Bajar ${s.nombre}`} className="rounded-full border border-tinta/20 px-3 py-1 disabled:opacity-30">↓</button>
                </form>
                <form action={alternarVisibleServicio}>
                  <input type="hidden" name="id" value={s.id} />
                  <input type="hidden" name="visible" value={String(s.visible)} />
                  <button type="submit" className="rounded-full border border-tinta/20 px-3 py-1 font-bold hover:border-coral">
                    {s.visible ? "Ocultar" : "Mostrar"}
                  </button>
                </form>
                <Link href={`/admin/servicios/${s.id}`} className="rounded-full bg-tinta px-4 py-1 font-bold text-white">
                  Editar
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
