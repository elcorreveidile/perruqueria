"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { whatsappLink } from "@/lib/site";
import {
  TAMANOS,
  labelTamano,
  type Service,
  type Tamano,
} from "@/lib/types";

interface Props {
  services: Service[];
}

interface Slot {
  hora_inicio: string;
  hora_fin: string;
}

function fechaBonita(fecha: string): string {
  return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function BookingWizard({ services }: Props) {
  const sp = useSearchParams();
  const precargadoServicio = services.find((s) => s.slug === sp.get("servicio")) ?? null;
  const precargadoTamano = (TAMANOS.find((t) => t.value === sp.get("tamano"))?.value ?? null) as Tamano | null;

  const [servicio, setServicio] = useState<Service | null>(precargadoServicio);
  const [tamano, setTamano] = useState<Tamano | null>(precargadoTamano);
  const [paso, setPaso] = useState(precargadoServicio ? (precargadoTamano ? 2 : 1) : 0);

  // Calendario
  const [diasDisponibles, setDiasDisponibles] = useState<string[] | null>(null);
  const [fecha, setFecha] = useState<string | null>(null);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [hora, setHora] = useState<string | null>(null);

  // Ficha
  const [ficha, setFicha] = useState({
    nombre: "",
    telefono: "",
    email: "",
    nombre_perro: sp.get("perro") ?? "",
    raza: "",
    observaciones: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmada, setConfirmada] = useState<null | { estado: string }>(null);

  // Lista de espera
  const [waitlistEstado, setWaitlistEstado] = useState<"idle" | "form" | "ok">("idle");

  const hoy = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);

  const cargarDias = useCallback(async () => {
    if (!servicio || !tamano) return;
    setDiasDisponibles(null);
    const res = await fetch(
      `/api/disponibilidad?servicio=${servicio.slug}&tamano=${tamano}&desde=${hoy}&dias=42`
    );
    const json = await res.json();
    setDiasDisponibles(json.dias ?? []);
  }, [servicio, tamano, hoy]);

  useEffect(() => {
    if (paso === 2) void cargarDias();
  }, [paso, cargarDias]);

  async function elegirFecha(f: string) {
    if (!servicio || !tamano) return;
    setFecha(f);
    setHora(null);
    setSlots(null);
    const res = await fetch(
      `/api/disponibilidad?servicio=${servicio.slug}&tamano=${tamano}&fecha=${f}`
    );
    const json = await res.json();
    setSlots(json.slots ?? []);
  }

  async function confirmar(e: React.FormEvent) {
    e.preventDefault();
    if (!servicio || !tamano || !fecha || !hora) return;
    setEnviando(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          servicio: servicio.slug,
          tamano,
          fecha,
          hora_inicio: hora,
          ...ficha,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Algo ha salido mal. Prueba de nuevo.");
        if (res.status === 409) await elegirFecha(fecha);
      } else {
        setConfirmada({ estado: json.estado });
      }
    } catch {
      setErrorMsg("Error de conexión. Prueba de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  async function apuntarseWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!servicio || !fecha) return;
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        servicio: servicio.slug,
        fecha,
        nombre: ficha.nombre || "Sin nombre",
        telefono: ficha.telefono,
        email: ficha.email,
      }),
    });
    setWaitlistEstado("ok");
  }

  // ── Pantalla de confirmación ──────────────────────────────────────
  if (confirmada && servicio && fecha && hora) {
    const pendiente = confirmada.estado === "pendiente";
    return (
      <div className="mt-8 rounded-3xl border border-salvia bg-white p-8 text-center">
        <p className="text-5xl" aria-hidden="true">🐶</p>
        <h2 className="mt-3 font-display text-3xl">
          {pendiente ? "¡Solicitud enviada!" : "¡Guau! Hueco apartado"}
        </h2>
        <p className="mt-3 text-tinta-suave">
          {pendiente
            ? `Revisaremos tu solicitud y te confirmaremos en cuanto podamos. Apuntado: ${servicio.nombre}, ${fechaBonita(fecha)} a las ${hora}.`
            : `Nos vemos el ${fechaBonita(fecha)} a las ${hora} para el ${servicio.nombre.toLowerCase()} de ${ficha.nombre_perro}.`}
        </p>
        {ficha.email && (
          <p className="mt-2 text-sm text-tinta-suave">
            Te hemos enviado un email con los detalles y el enlace para cancelar si te
            surge algo.
          </p>
        )}
        <p className="mt-4 rounded-2xl bg-salvia-claro p-4 text-sm">
          🔔 Te recordaremos la cita el día antes y te avisaremos cuando a{" "}
          {ficha.nombre_perro || "tu peludo"} le vuelva a tocar sesión. Tú solo tendrás que
          elegir hueco.
        </p>
        <p className="mt-4 text-xs text-tinta-suave">
          Recuerda: esta es una demo y la reserva no genera una cita real.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-3xl border border-cielo/40 bg-white p-6 sm:p-8">
      {/* Paso 0: servicio */}
      {paso === 0 && (
        <fieldset>
          <legend className="font-display text-2xl">¿Qué le hacemos? 🛁</legend>
          <div className="mt-5 grid gap-3">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setServicio(s);
                  setPaso(1);
                }}
                className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                  servicio?.id === s.id ? "border-coral bg-coral/5" : "border-cielo/50 hover:border-coral"
                }`}
              >
                <span className="block font-bold">{s.nombre}</span>
                <span className="text-xs text-tinta-suave">{s.descripcion_corta}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Paso 1: tamaño */}
      {paso === 1 && (
        <fieldset>
          <legend className="font-display text-2xl">¿Cómo de grande es? 🐕</legend>
          <p className="mt-1 text-sm text-tinta-suave">
            Nos sirve para reservarle el tiempo que de verdad necesita.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {TAMANOS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => {
                  setTamano(t.value);
                  setPaso(2);
                }}
                className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                  tamano === t.value ? "border-coral bg-coral/5" : "border-cielo/50 hover:border-coral"
                }`}
              >
                <span className="block font-bold">{t.label}</span>
                <span className="text-xs text-tinta-suave">{t.detalle}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {/* Paso 2: calendario */}
      {paso === 2 && servicio && tamano && (
        <div>
          <h2 className="font-display text-2xl">Elige día y hora 📅</h2>
          <p className="mt-1 text-sm text-tinta-suave">
            {servicio.nombre} · {labelTamano(tamano)}
          </p>

          {diasDisponibles === null && <p className="mt-6 text-sm">Buscando huecos…</p>}

          {diasDisponibles !== null && diasDisponibles.length === 0 && (
            <p className="mt-6 text-sm text-tinta-suave">
              No quedan huecos en las próximas semanas. Escríbenos por{" "}
              <a className="font-bold text-coral" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>{" "}
              y te buscamos algo.
            </p>
          )}

          {diasDisponibles !== null && diasDisponibles.length > 0 && (
            <>
              <div className="mt-5 flex gap-2 overflow-x-auto pb-2" role="listbox" aria-label="Días con huecos">
                {diasDisponibles.map((d) => {
                  const dt = new Date(`${d}T12:00:00`);
                  return (
                    <button
                      key={d}
                      type="button"
                      role="option"
                      aria-selected={fecha === d}
                      onClick={() => void elegirFecha(d)}
                      className={`min-w-16 shrink-0 rounded-2xl border-2 px-3 py-2 text-center transition-colors ${
                        fecha === d ? "border-coral bg-coral/5" : "border-cielo/50 hover:border-coral"
                      }`}
                    >
                      <span className="block text-xs uppercase text-tinta-suave">
                        {dt.toLocaleDateString("es-ES", { weekday: "short" })}
                      </span>
                      <span className="block font-display text-lg">{dt.getDate()}</span>
                      <span className="block text-[10px] text-tinta-suave">
                        {dt.toLocaleDateString("es-ES", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>

              {fecha && slots === null && <p className="mt-4 text-sm">Cargando horas…</p>}

              {fecha && slots !== null && slots.length === 0 && (
                <div className="mt-4 rounded-2xl bg-crema p-4 text-sm">
                  <p>Ese día está completo. 😔</p>
                  {waitlistEstado === "idle" && (
                    <button
                      type="button"
                      className="mt-2 font-bold text-coral hover:underline"
                      onClick={() => setWaitlistEstado("form")}
                    >
                      Apúntame a la lista de espera de ese día →
                    </button>
                  )}
                  {waitlistEstado === "form" && (
                    <form onSubmit={apuntarseWaitlist} className="mt-3 grid gap-2">
                      <input
                        required
                        placeholder="Tu nombre"
                        className="rounded-full border border-cielo px-4 py-2"
                        value={ficha.nombre}
                        onChange={(e) => setFicha({ ...ficha, nombre: e.target.value })}
                      />
                      <input
                        required
                        type="email"
                        placeholder="Tu email"
                        className="rounded-full border border-cielo px-4 py-2"
                        value={ficha.email}
                        onChange={(e) => setFicha({ ...ficha, email: e.target.value })}
                      />
                      <button type="submit" className="rounded-full bg-tinta px-5 py-2 font-bold text-white">
                        Avisadme si queda un hueco
                      </button>
                    </form>
                  )}
                  {waitlistEstado === "ok" && (
                    <p className="mt-2 font-bold text-salvia">
                      ¡Hecho! Si se libera un hueco ese día, te avisamos por email. 🐾
                    </p>
                  )}
                </div>
              )}

              {fecha && slots !== null && slots.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-bold">Huecos el {fechaBonita(fecha)}:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {slots.map((s) => (
                      <button
                        key={s.hora_inicio}
                        type="button"
                        onClick={() => {
                          setHora(s.hora_inicio);
                          setPaso(3);
                        }}
                        className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
                          hora === s.hora_inicio
                            ? "border-coral bg-coral text-white"
                            : "border-cielo/60 hover:border-coral"
                        }`}
                      >
                        {s.hora_inicio}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Paso 3: mini-ficha */}
      {paso === 3 && servicio && tamano && fecha && hora && (
        <form onSubmit={confirmar}>
          <h2 className="font-display text-2xl">La ficha de tu peludo 📋</h2>
          <p className="mt-1 text-sm text-tinta-suave">
            {servicio.nombre} · {fechaBonita(fecha)} · {hora}
          </p>
          <div className="mt-5 grid gap-3">
            <label className="text-sm font-bold">
              Tu nombre*
              <input
                required
                className="mt-1 w-full rounded-full border border-cielo px-4 py-2.5 font-normal"
                value={ficha.nombre}
                onChange={(e) => setFicha({ ...ficha, nombre: e.target.value })}
              />
            </label>
            <label className="text-sm font-bold">
              Teléfono*
              <input
                required
                type="tel"
                className="mt-1 w-full rounded-full border border-cielo px-4 py-2.5 font-normal"
                value={ficha.telefono}
                onChange={(e) => setFicha({ ...ficha, telefono: e.target.value })}
              />
            </label>
            <label className="text-sm font-bold">
              Email <span className="font-normal text-tinta-suave">(para la confirmación y recordatorios)</span>
              <input
                type="email"
                className="mt-1 w-full rounded-full border border-cielo px-4 py-2.5 font-normal"
                value={ficha.email}
                onChange={(e) => setFicha({ ...ficha, email: e.target.value })}
              />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-sm font-bold">
                Nombre del perro*
                <input
                  required
                  className="mt-1 w-full rounded-full border border-cielo px-4 py-2.5 font-normal"
                  value={ficha.nombre_perro}
                  onChange={(e) => setFicha({ ...ficha, nombre_perro: e.target.value })}
                />
              </label>
              <label className="text-sm font-bold">
                Raza
                <input
                  className="mt-1 w-full rounded-full border border-cielo px-4 py-2.5 font-normal"
                  value={ficha.raza}
                  onChange={(e) => setFicha({ ...ficha, raza: e.target.value })}
                />
              </label>
            </div>
            <label className="text-sm font-bold">
              Observaciones{" "}
              <span className="font-normal text-tinta-suave">(miedos, alergias, manías, primera vez…)</span>
              <textarea
                rows={3}
                className="mt-1 w-full rounded-2xl border border-cielo px-4 py-2.5 font-normal"
                value={ficha.observaciones}
                onChange={(e) => setFicha({ ...ficha, observaciones: e.target.value })}
              />
            </label>
          </div>

          {errorMsg && (
            <p className="mt-4 rounded-xl bg-coral/10 px-4 py-2 text-sm font-bold text-coral" role="alert">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={enviando}
            className="mt-6 w-full rounded-full bg-coral px-6 py-3.5 font-bold text-white hover:bg-coral-oscuro disabled:opacity-50"
          >
            {enviando ? "Apartando el hueco…" : "Confirmar reserva"}
          </button>
          <p className="mt-2 text-center text-[11px] text-tinta-suave">
            Demo: los datos se guardan marcados como prueba y se purgan periódicamente.
          </p>
        </form>
      )}

      {paso > 0 && !confirmada && (
        <button
          type="button"
          onClick={() => {
            if (paso === 2) {
              setFecha(null);
              setSlots(null);
              setHora(null);
            }
            setPaso(paso - 1);
          }}
          className="mt-6 text-sm font-bold text-tinta-suave hover:text-coral"
        >
          ← Volver
        </button>
      )}
    </div>
  );
}
