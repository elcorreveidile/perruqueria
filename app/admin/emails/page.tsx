import { getServices } from "@/lib/data";
import { dbConfigured, sql } from "@/lib/db";
import type { WaitlistEntry } from "@/lib/types";

export const dynamic = "force-dynamic";

interface FilaEmail {
  id: string;
  tipo: "recordatorio_24h" | "recurrencia";
  enviar_en: string;
  enviado_at: string | null;
  nombre: string | null;
  email: string | null;
  nombre_perro: string | null;
  service_id: string | null;
  fecha: string | null;
}

export default async function EmailsPage() {
  if (!dbConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura la base de datos para ver los emails programados.</p>;
  }

  const [emails, espera, services] = await Promise.all([
    sql()`
      select se.id, se.tipo, se.enviar_en::text, se.enviado_at::text,
             b.nombre, b.email, b.nombre_perro, b.service_id, b.fecha::text
      from scheduled_emails se
      left join bookings b on b.id = se.booking_id
      order by se.enviar_en limit 100`,
    sql()`select *, fecha_deseada::text, created_at::text from waitlist order by created_at desc limit 50`,
    getServices({ includeHidden: true }),
  ]);

  const filas = emails as unknown as FilaEmail[];
  const pendientes = filas.filter((f) => !f.enviado_at);
  const enviados = filas.filter((f) => f.enviado_at);
  const lista = espera as unknown as WaitlistEntry[];

  const tipoBonito = (t: string) =>
    t === "recordatorio_24h" ? "🔔 Recordatorio 24 h" : "🔁 Recurrencia («ya le toca»)";

  const Tarjeta = ({ f }: { f: FilaEmail }) => (
    <li className="rounded-2xl bg-white p-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold">{tipoBonito(f.tipo)}</p>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${f.enviado_at ? "bg-salvia text-white" : "bg-cielo/50"}`}>
          {f.enviado_at ? "Enviado" : "Programado"}
        </span>
      </div>
      {f.nombre && (
        <p className="mt-1 text-tinta-suave">
          Para {f.nombre} ({f.email ?? "sin email"}) — {f.nombre_perro},{" "}
          {services.find((s) => s.id === f.service_id)?.nombre ?? "servicio"}, cita del{" "}
          {f.fecha ? new Date(`${f.fecha}T12:00:00`).toLocaleDateString("es-ES") : "—"}
        </p>
      )}
      <p className="mt-1 text-xs text-tinta-suave">
        {f.enviado_at
          ? `Enviado el ${new Date(f.enviado_at).toLocaleString("es-ES")}`
          : `Se enviará el ${new Date(f.enviar_en).toLocaleString("es-ES")}`}
      </p>
    </li>
  );

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl">Emails de fidelización</h1>
        <p className="mt-1 text-sm text-tinta-suave">
          Vista previa de los emails automáticos. En modo demo, todos los envíos se desvían
          a la dirección de pruebas para poder enseñarlos sin esperar días reales.
        </p>
      </div>

      <section>
        <h2 className="text-lg">📬 Programados ({pendientes.length})</h2>
        {pendientes.length === 0 ? (
          <p className="mt-2 text-sm text-tinta-suave">
            Nada pendiente. Se programan solos: el recordatorio al confirmar una cita y la
            recurrencia al marcarla como completada.
          </p>
        ) : (
          <ul className="mt-3 grid gap-2">{pendientes.map((f) => <Tarjeta key={f.id} f={f} />)}</ul>
        )}
      </section>

      <section>
        <h2 className="text-lg">✅ Ya enviados ({enviados.length})</h2>
        {enviados.length === 0 ? (
          <p className="mt-2 text-sm text-tinta-suave">Aún no se ha enviado ninguno.</p>
        ) : (
          <ul className="mt-3 grid gap-2">{enviados.map((f) => <Tarjeta key={f.id} f={f} />)}</ul>
        )}
      </section>

      <section>
        <h2 className="text-lg">⏳ Lista de espera ({lista.length})</h2>
        {lista.length === 0 ? (
          <p className="mt-2 text-sm text-tinta-suave">Nadie en lista de espera ahora mismo.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {lista.map((w) => (
              <li key={w.id} className="rounded-2xl bg-white p-4 text-sm">
                <p className="font-bold">
                  {w.nombre} — {new Date(`${w.fecha_deseada}T12:00:00`).toLocaleDateString("es-ES")}
                </p>
                <p className="text-tinta-suave">
                  {services.find((s) => s.id === w.service_id)?.nombre ?? "Servicio"} · {w.email}
                  {w.telefono ? ` · ${w.telefono}` : ""}
                </p>
                <p className="mt-1 text-xs text-tinta-suave">
                  {w.notificado_at
                    ? `Avisado el ${new Date(w.notificado_at).toLocaleString("es-ES")}`
                    : "Esperando hueco"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
