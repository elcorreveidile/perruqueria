/**
 * ServiceCard — Tarjeta individual de servicio
 */

import type { Service } from "@/components/calculator/types";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  // Generar URLs para CTAs
  const calculadoraUrl = `/calculadora`;
  const reservaUrl = `/reserva?servicio=${service.slug}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="mb-4">
        <h3 className="font-display text-xl font-semibold mb-2">
          {service.nombre}
        </h3>
        <p className="text-sm text-ink/70">{service.descripcion_corta}</p>
      </div>

      {/* Detalles */}
      <div className="space-y-2 mb-6 text-sm">
        <div className="flex items-center gap-2 text-ink/60">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Duración: {service.duracion_min}-{service.duracion_max} min
          </span>
        </div>

        <div className="flex items-center gap-2 text-ink/60">
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>Productos veganos</span>
        </div>

        <div className="flex items-center gap-2 text-ink/60">
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span>Manejo en positivo</span>
        </div>
      </div>

      {/* Descripción larga */}
      {service.descripcion_larga && (
        <p className="text-sm text-ink/60 mb-6 line-clamp-3">
          {service.descripcion_larga}
        </p>
      )}

      {/* CTAs */}
      <div className="space-y-2">
        <a
          href={calculadoraUrl}
          className="block w-full px-4 py-2 bg-sky text-ink rounded-lg font-medium hover:bg-sky/90 transition-colors text-center text-sm"
        >
          Calcula tu tarifa
        </a>
        <a
          href={reservaUrl}
          className="block w-full px-4 py-2 bg-coral text-white rounded-lg font-medium hover:bg-coral/90 transition-colors text-center text-sm"
        >
          Reserva cita
        </a>
      </div>
    </div>
  );
}
