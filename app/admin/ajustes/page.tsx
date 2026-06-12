import { guardarAjustes, guardarRecurrencia } from "@/lib/admin-actions";
import { getServices, getSettings } from "@/lib/data";
import { dbConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

const inputCls = "mt-1 w-full rounded-full border border-cielo px-4 py-2 font-normal";

export default async function AjustesPage() {
  if (!dbConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura la base de datos (ver README) para cambiar los ajustes.</p>;
  }

  const [settings, services] = await Promise.all([
    getSettings(),
    getServices({ includeHidden: true }),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl">Ajustes</h1>
        <p className="mt-1 text-sm text-tinta-suave">Cada pantalla, una tarea. Esta: cómo funciona tu agenda.</p>
      </div>

      <form action={guardarAjustes} className="grid gap-4 rounded-3xl bg-white p-6 sm:grid-cols-2">
        <label className="text-sm font-bold">
          Margen entre citas (minutos)
          <input name="margen_minutos" type="number" min={0} max={60} step={5} defaultValue={settings.margen_minutos} className={inputCls} />
        </label>
        <label className="text-sm font-bold">
          Antelación mínima (horas)
          <input name="antelacion_min_horas" type="number" min={0} max={72} defaultValue={settings.antelacion_min_horas} className={inputCls} />
        </label>
        <label className="text-sm font-bold">
          Horizonte máximo de reserva (semanas)
          <input name="horizonte_max_semanas" type="number" min={1} max={26} defaultValue={settings.horizonte_max_semanas} className={inputCls} />
        </label>
        <div className="grid gap-3 pt-1 text-sm font-bold">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="confirmacion_automatica" defaultChecked={settings.confirmacion_automatica} />
            Confirmación automática de citas
          </label>
          <p className="text-xs font-normal text-tinta-suave">
            Desactivada, tú confirmas cada cita a mano y conservas el control de la agenda.
          </p>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="recordatorios_activos" defaultChecked={settings.recordatorios_activos} />
            Recordatorios y avisos automáticos por email
          </label>
        </div>
        <button type="submit" className="rounded-full bg-coral px-6 py-2.5 font-bold text-white hover:bg-coral-oscuro sm:col-span-2">
          Guardar ajustes
        </button>
      </form>

      <section>
        <h2 className="text-lg">🔁 Recurrencia por servicio</h2>
        <p className="mt-1 text-sm text-tinta-suave">
          Semanas tras una cita completada para enviar el email de «ya le toca».
        </p>
        <ul className="mt-3 grid gap-2">
          {services.map((s) => (
            <li key={s.id}>
              <form action={guardarRecurrencia} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm">
                <input type="hidden" name="id" value={s.id} />
                <span className="font-bold">{s.nombre}</span>
                <span className="flex items-center gap-2">
                  <input
                    name="recurrencia_semanas"
                    type="number"
                    min={1}
                    max={52}
                    defaultValue={s.recurrencia_semanas}
                    className="w-20 rounded-full border border-cielo px-3 py-1.5"
                    aria-label={`Semanas de recurrencia de ${s.nombre}`}
                  />
                  <button type="submit" className="rounded-full bg-tinta px-4 py-1.5 font-bold text-white">
                    OK
                  </button>
                </span>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
