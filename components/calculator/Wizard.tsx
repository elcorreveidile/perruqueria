"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IMG_TAMANOS } from "@/lib/imagenes";
import { estimar, findPriceRow, formatoDuracion, formatoRango } from "@/lib/pricing";
import { whatsappLink, ETIQUETA_ORIENTATIVO } from "@/lib/site";
import {
  ESTADOS_PELO,
  TAMANOS,
  TIPOS_PELO,
  labelPelo,
  labelTamano,
  type EstadoPelo,
  type PriceRow,
  type Service,
  type Tamano,
  type TipoPelo,
} from "@/lib/types";

interface Props {
  services: Service[];
  prices: PriceRow[];
}

const PASOS = ["Tamaño", "Pelo", "Estado", "Servicio", "Tu tarifa"];

export function Wizard({ services, prices }: Props) {
  const [paso, setPaso] = useState(0);
  const [tamano, setTamano] = useState<Tamano | null>(null);
  const [pelo, setPelo] = useState<TipoPelo | null>(null);
  const [estado, setEstado] = useState<EstadoPelo | null>(null);
  const [servicio, setServicio] = useState<Service | null>(null);
  const [email, setEmail] = useState("");
  const [emailEstado, setEmailEstado] = useState<"idle" | "enviando" | "ok" | "error">("idle");

  const resultado = useMemo(() => {
    if (!tamano || !estado || !servicio) return null;
    const row = findPriceRow(prices, servicio.id, tamano, pelo);
    if (!row) return null;
    return estimar(servicio, row, estado);
  }, [tamano, pelo, estado, servicio, prices]);

  const avanzar = () => setPaso((p) => Math.min(p + 1, 4));
  const retroceder = () => setPaso((p) => Math.max(p - 1, 0));

  const resumenTexto =
    resultado && servicio && tamano
      ? `Hola 🐾 He usado la calculadora de la web: ${servicio.nombre}, perro ${labelTamano(tamano).toLowerCase()}, pelo ${labelPelo(pelo).toLowerCase()}. Rango orientativo: ${formatoRango(resultado.precioMin, resultado.precioMax)} (${formatoDuracion(resultado.duracionMin, resultado.duracionMax)}). ¿Me confirmáis precio y hueco?`
      : "";

  async function enviarPorEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!resultado || !servicio || !tamano || !estado) return;
    setEmailEstado("enviando");
    try {
      const res = await fetch("/api/calculadora/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          servicio: servicio.nombre,
          tamano: labelTamano(tamano),
          pelo: labelPelo(pelo),
          estado: ESTADOS_PELO.find((x) => x.value === estado)?.label,
          rango: formatoRango(resultado.precioMin, resultado.precioMax),
          duracion: formatoDuracion(resultado.duracionMin, resultado.duracionMax),
        }),
      });
      setEmailEstado(res.ok ? "ok" : "error");
    } catch {
      setEmailEstado("error");
    }
  }

  return (
    <div className="mt-8">
      {/* Progreso */}
      <ol className="flex items-center justify-center gap-1.5" aria-label="Progreso">
        {PASOS.map((nombre, i) => (
          <li
            key={nombre}
            aria-current={i === paso ? "step" : undefined}
            className={`h-2.5 rounded-full transition-all ${
              i === paso ? "w-8 bg-coral" : i < paso ? "w-2.5 bg-coral/50" : "w-2.5 bg-cielo"
            }`}
          >
            <span className="sr-only">{nombre}</span>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-3xl border border-cielo/40 bg-white p-6 sm:p-8">
        {paso === 0 && (
          <fieldset>
            <legend className="font-display text-2xl">¿Cómo es tu peludo? 🐶</legend>
            <p className="mt-1 text-sm text-tinta-suave">Más o menos, no hace falta pesarlo.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {TAMANOS.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    setTamano(t.value);
                    avanzar();
                  }}
                  className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-colors ${
                    tamano === t.value ? "border-coral bg-coral/5" : "border-cielo/50 hover:border-coral"
                  }`}
                >
                  <Image
                    src={IMG_TAMANOS[t.value]}
                    alt=""
<<<<<<< HEAD
                    width={144}
                    height={144}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
=======
                    width={112}
                    height={144}
                    className="h-16 w-14 shrink-0 rounded-xl object-cover object-bottom"
>>>>>>> origin/main
                  />
                  <span>
                    <span className="block font-bold">{t.label}</span>
                    <span className="text-xs text-tinta-suave">{t.detalle}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {paso === 1 && (
          <fieldset>
            <legend className="font-display text-2xl">¿Y su pelo? ✂️</legend>
            <p className="mt-1 text-sm text-tinta-suave">El manto manda más que la raza.</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {TIPOS_PELO.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    setPelo(t.value);
                    avanzar();
                  }}
                  className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                    pelo === t.value ? "border-coral bg-coral/5" : "border-cielo/50 hover:border-coral"
                  }`}
                >
                  <span className="block font-bold">{t.label}</span>
                  <span className="text-xs text-tinta-suave">{t.detalle}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {paso === 2 && (
          <fieldset>
            <legend className="font-display text-2xl">¿Cómo está el manto? 🪮</legend>
            <p className="mt-1 text-sm text-tinta-suave">
              Sé sincero, no juzgamos a nadie: pasa en las mejores familias.
            </p>
            <div className="mt-5 grid gap-3">
              {ESTADOS_PELO.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => {
                    setEstado(t.value);
                    avanzar();
                  }}
                  className={`rounded-2xl border-2 p-4 text-left transition-colors ${
                    estado === t.value ? "border-coral bg-coral/5" : "border-cielo/50 hover:border-coral"
                  }`}
                >
                  <span className="block font-bold">{t.label}</span>
                  <span className="text-xs text-tinta-suave">{t.detalle}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {paso === 3 && (
          <fieldset>
            <legend className="font-display text-2xl">¿Qué le hacemos? 🛁</legend>
            <p className="mt-1 text-sm text-tinta-suave">Si dudas, el baño + corte es el clásico.</p>
            <div className="mt-5 grid gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setServicio(s);
                    avanzar();
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

        {paso === 4 && resultado && servicio && tamano && (
          <div aria-live="polite">
            <h2 className="font-display text-2xl">Tu tarifa orientativa 🎉</h2>
            <div className="mt-5 rounded-2xl bg-crema p-6 text-center">
              <p className="text-sm text-tinta-suave">{servicio.nombre} · {labelTamano(tamano)} · pelo {labelPelo(pelo).toLowerCase()}</p>
              <p className="mt-2 font-display text-5xl text-coral">
                {formatoRango(resultado.precioMin, resultado.precioMax)}
              </p>
              <p className="mt-2 text-sm">
                ⏱ {formatoDuracion(resultado.duracionMin, resultado.duracionMax)} aprox.
                {resultado.recargoAplicadoPct > 0 && (
                  <span className="block text-xs text-tinta-suave">
                    (incluye recargo del {resultado.recargoAplicadoPct} % por el estado del manto)
                  </span>
                )}
              </p>
              <p className="mt-3 inline-block rounded-full bg-salvia-claro px-3 py-1 text-xs font-bold">
                🌱 Productos veganos incluidos siempre
              </p>
            </div>
            <p className="mt-3 text-center text-xs text-tinta-suave">{ETIQUETA_ORIENTATIVO}.</p>
            <p className="mt-1 text-center text-xs text-tinta-suave">
              Cada peludo es un mundo: te confirmamos el precio exacto al verlo. 🐾
            </p>

            <div className="mt-6 grid gap-3">
              <Link
                href={`/reservas?servicio=${servicio.slug}&tamano=${tamano}`}
                className="rounded-full bg-coral px-6 py-3.5 text-center font-bold text-white hover:bg-coral-oscuro"
              >
                Reserva ya tu hueco
              </Link>
              <a
                href={whatsappLink(resumenTexto)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#25D366] px-6 py-3.5 text-center font-bold text-white hover:opacity-90"
              >
                Enviar resumen por WhatsApp
              </a>
            </div>

            <form onSubmit={enviarPorEmail} className="mt-6 rounded-2xl border border-cielo/50 p-4">
              <label htmlFor="email-resultado" className="text-sm font-bold">
                ¿Te lo enviamos por email?
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="email-resultado"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-full border border-cielo px-4 py-2 text-sm"
                />
                <button
                  type="submit"
                  disabled={emailEstado === "enviando"}
                  className="rounded-full bg-tinta px-5 py-2 text-sm font-bold text-white disabled:opacity-50"
                >
                  {emailEstado === "enviando" ? "Enviando…" : "Enviar"}
                </button>
              </div>
              {emailEstado === "ok" && (
                <p className="mt-2 text-xs font-bold text-salvia">¡Enviado! Revisa tu bandeja. 🐾</p>
              )}
              {emailEstado === "error" && (
                <p className="mt-2 text-xs font-bold text-coral">No se pudo enviar. Prueba de nuevo.</p>
              )}
              <p className="mt-2 text-[11px] text-tinta-suave">
                Demo: el email se desvía a una dirección de pruebas y los datos no se usan
                con fines comerciales.
              </p>
            </form>
          </div>
        )}

        {paso === 4 && !resultado && (
          <p className="text-center text-tinta-suave">
            Vaya, no tenemos tarifa orientativa para esa combinación. Escríbenos por WhatsApp
            y te la damos al momento. 🐾
          </p>
        )}

        {paso > 0 && (
          <button
            type="button"
            onClick={retroceder}
            className="mt-6 text-sm font-bold text-tinta-suave hover:text-coral"
          >
            ← Volver
          </button>
        )}
      </div>
    </div>
  );
}
