/**
 * StepServicio — Paso 4: ¿Qué servicio necesitas?
 */

import { useEffect, useState } from "react";
import type { Service } from "./types";

interface StepServicioProps {
  onSelect: (servicioSlug: string) => void;
  onBack: () => void;
  value?: string;
}

export default function StepServicio({
  onSelect,
  onBack,
  value,
}: StepServicioProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error("Error cargando servicios");

        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error desconocido"
        );
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky"></div>
        <p className="mt-4 text-ink/60">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-coral mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-ink/70 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-sky text-ink rounded-lg hover:bg-sky/90 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Agrupar servicios por categoría
  const categories = Array.from(
    new Set(services.map((s) => s.categoria))
  );

  const categoryLabels: Record<string, string> = {
    baño_higiene: "Baño e higiene",
    corte_estilismo: "Corte y estilismo",
    pelo_especial: "Pelo especial",
    piel_sensible: "Piel sensible",
    cachorros: "Cachorros",
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
        ¿Qué servicio necesitas? 🛁
      </h2>
      <p className="text-ink/70 mb-8">
        Selecciona el servicio que necesita tu peludo.
      </p>

      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="font-display font-semibold text-lg mb-3 text-sky">
            {categoryLabels[category] || category}
          </h3>
          <div className="space-y-3">
            {services
              .filter((s) => s.categoria === category)
              .map((service) => (
                <button
                  key={service.slug}
                  onClick={() => onSelect(service.slug)}
                  className={`
                    w-full p-5 rounded-lg border-2 text-left transition-all
                    ${
                      value === service.slug
                        ? "border-sky bg-sky/10"
                        : "border-sky/30 hover:border-sky/60 bg-white"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="font-display font-semibold text-lg mb-1">
                        {service.nombre}
                      </div>
                      <div className="text-sm text-ink/70">
                        {service.descripcion_corta}
                      </div>
                      <div className="text-xs text-ink/60 mt-1">
                        ⏱ {service.duracion_min}-{service.duracion_max} min
                      </div>
                    </div>
                    <svg
                      className="w-5 h-5 text-sky flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-8 p-4 bg-sage/10 rounded-lg">
        <p className="text-sm text-ink/70">
          💚 <strong>Productos veganos:</strong> Todos nuestros servicios usan
          productos 100% veganos y cruelty-free.
        </p>
      </div>

      {/* Botón atrás */}
      <button
        onClick={onBack}
        className="mt-8 px-6 py-2 text-ink/70 hover:text-ink transition-colors flex items-center gap-2"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Atrás
      </button>
    </div>
  );
}
