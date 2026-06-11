"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIAS, labelCategoria, type Categoria, type Service } from "@/lib/types";
import { formatoDuracion } from "@/lib/pricing";

interface Props {
  services: Service[];
  rangos: Record<string, { min: number; real: boolean } | null>;
}

export function Catalogo({ services, rangos }: Props) {
  const [filtro, setFiltro] = useState<Categoria | "todas">("todas");
  const visibles = filtro === "todas" ? services : services.filter((s) => s.categoria === filtro);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
        {[{ value: "todas" as const, label: "Todas" }, ...CATEGORIAS].map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => setFiltro(c.value)}
            aria-pressed={filtro === c.value}
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              filtro === c.value
                ? "bg-tinta text-white"
                : "bg-white text-tinta hover:bg-cielo/40"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((s) => {
          const rango = rangos[s.id];
          return (
            <article
              key={s.id}
              className="flex flex-col rounded-3xl border border-cielo/40 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-wide text-coral">
                {labelCategoria(s.categoria)}
              </p>
              <h2 className="mt-1 text-xl">{s.nombre}</h2>
              <p className="mt-2 flex-1 text-sm text-tinta-suave">{s.descripcion_corta}</p>
              <p className="mt-3 text-sm">
                ⏱ {formatoDuracion(s.duracion_min, s.duracion_max)}
                {rango && (
                  <span className="ml-3">
                    💶 desde {rango.min} €{" "}
                    <span className="text-xs text-tinta-suave">
                      {rango.real ? "" : "(orientativo)"}
                    </span>
                  </span>
                )}
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/servicios/${s.slug}`}
                  className="flex-1 rounded-full border-2 border-tinta/15 px-4 py-2 text-center text-sm font-bold hover:border-coral hover:text-coral"
                >
                  Ver ficha
                </Link>
                <Link
                  href={`/reservas?servicio=${s.slug}`}
                  className="flex-1 rounded-full bg-coral px-4 py-2 text-center text-sm font-bold text-white hover:bg-coral-oscuro"
                >
                  Reservar
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
