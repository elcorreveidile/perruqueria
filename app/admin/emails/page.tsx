import { getServices } from "@/lib/data";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";
import type { Booking, WaitlistEntry } from "@/lib/types";

export const dynamic = "force-dynamic";

interface FilaEmail {
  id: string;
  tipo: "recordatorio_24h" | "recurrencia";
  enviar_en: string;
  enviado_at: string | null;
  bookings: Booking | null;
}

export default async function EmailsPage() {
  if (!supabaseConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura Supabase para ver los emails programados.</p>;
  }

  const db = supabaseAdmin();
  const [{ data: emails }, { data: espera }, services] = await Promise.all([
    db.from("scheduled_emails").select("*, bookings(*)").order("enviar_en").limit(100),
    db.from("waitlist").select("*").order("created_at", { ascending: false }).limit(50),
    getServices({ includeHidden: true }),
  ]);

  const filas = (emails ?? []) as FilaEmail[];
  const pendientes = filas.filter((f) => !f.enviado_at);
  const enviados = filas.filter((f) => f.enviado_at);
  const lista = (espera ?? []) as WaitlistEntry[];

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
      {f.bookings && (
        <p className="mt-1 text-tinta-suave">
          Para {f.bookings.nombre} ({f.bookings.email ?? "sin email"}) — {f.bookings.nombre_perro},{" "}
          {services.find((s) => s.id === f.bookings?.service_id)?.nombre ?? "servicio"}, cita del{" "}
          {new Date(`${f.bookings.fecha}T12:00:00`).toLocaleDateString("es-ES")}
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
