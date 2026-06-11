/**
 * ResultadoTarifa — Resultado del cálculo
 *
 * Muestra rango orientativo + duración + CTAs (reserva + WhatsApp)
 */

import { useEffect, useState } from "react";
import type { DogSizes, CoatTypes, CoatCondition, PriceResult } from "./types";

interface ResultadoTarifaProps {
  tamanho: DogSizes;
  tipoPelo: CoatTypes;
  estadoPelo: CoatCondition;
  servicioSlug: string;
  onRestart: () => void;
}

export default function ResultadoTarifa({
  tamanho,
  tipoPelo,
  estadoPelo,
  servicioSlug,
  onRestart,
}: ResultadoTarifaProps) {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    precioMin: number;
    precioMax: number;
    duracionMin: number;
    duracionMax: number;
    servicio: string;
    esPrecioReal: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function calculatePrice() {
      try {
        const response = await fetch(
          `/api/calculate-price?tamanho=${tamanho}&tipoPelo=${tipoPelo}&estadoPelo=${estadoPelo}&servicio=${servicioSlug}`
        );

        if (!response.ok) throw new Error("Error calculando precio");

        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error desconocido"
        );
      } finally {
        setLoading(false);
      }
    }

    calculatePrice();
  }, [tamanho, tipoPelo, estadoPelo, servicioSlug]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky"></div>
        <p className="mt-4 text-ink/60">Calculando tu tarifa...</p>
      </div>
    );
  }

  if (error || !result) {
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
        <p className="text-ink/70 mb-4">{error || "Error calculando precio"}</p>
        <button
          onClick={onRestart}
          className="px-4 py-2 bg-sky text-ink rounded-lg hover:bg-sky/90 transition-colors"
        >
          Empezar de nuevo
        </button>
      </div>
    );
  }

  // Generar enlace de WhatsApp con resumen
  const whatsappText = encodeURIComponent(
    `¡Hola! Me gustaría reservar para mi perro.\n\nServicio: ${result.servicio}\nTamaño: ${tamanho}\nTipo de pelo: ${tipoPelo}\nEstado: ${estadoPelo}\n\nTarifa orientativa: ${result.precioMin}-${result.precioMax} €\nDuración: ${result.duracionMin}-${result.duracionMax} min`
  );
  const whatsappUrl = `https://wa.me/34600000000?text=${whatsappText}`;

  // Generar enlace de reserva con datos precargados
  const reservaUrl = `/reserva?servicio=${servicioSlug}&tamanho=${tamanho}&tipoPelo=${tipoPelo}&estadoPelo=${estadoPelo}`;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-center">
        ¡Guau! Aquí tienes tu tarifa 🐾
      </h2>

      {/* Resultado principal */}
      <div className="bg-cream rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <div className="text-sm text-ink/60 mb-1">Precio orientativo</div>
          <div className="font-display text-4xl md:text-5xl font-semibold text-foreground">
            {result.precioMin} - {result.precioMax} €
          </div>
          <div className="text-xs text-ink/60 mt-1">
            Duración estimada: {result.duracionMin}-{result.duracionMax} min
          </div>
        </div>

        {result.esPrecioReal ? (
          <div className="text-center text-xs text-sage font-medium">
            ✓ Precio oficial
          </div>
        ) : (
          <div className="text-center text-xs text-ink/60">
            * Tarifa orientativa. Confirmado por Cristina.
          </div>
        )}
      </div>

      {/* Detalles del servicio */}
      <div className="bg-sky/10 rounded-lg p-4 mb-6">
        <h3 className="font-display font-semibold mb-3">Detalles</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-ink/70">Servicio:</span>
            <span className="font-medium">{result.servicio}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/70">Tamaño:</span>
            <span className="font-medium capitalize">{tamanho}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/70">Tipo de pelo:</span>
            <span className="font-medium capitalize">
              {tipoPelo.replace("_", " ")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink/70">Estado:</span>
            <span className="font-medium capitalize">
              {estadoPelo.replace("_", " ")}
            </span>
          </div>
        </div>
      </div>

      {/* Nota importante */}
      <div className="bg-sage/10 rounded-lg p-4 mb-6 text-sm text-ink/80">
        <p className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-sage flex-shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            <strong>Importante:</strong> Cada peludo es único. Cristina revisará el
            estado del pelo y el comportamiento de tu perro para confirmar el
            precio final y el tiempo exacto.
          </span>
        </p>
      </div>

      {/* CTAs */}
      <div className="space-y-3">
        <a
          href={reservaUrl}
          className="block w-full px-6 py-4 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors text-center"
        >
          🗓 Reserva tu hueco ahora
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full px-6 py-4 bg-sky text-ink rounded-lg font-semibold hover:bg-sky/90 transition-colors text-center"
        >
          💬 Consultar por WhatsApp
        </a>
      </div>

      {/* Botón reiniciar */}
      <button
        onClick={onRestart}
        className="mt-6 w-full px-6 py-2 text-ink/70 hover:text-ink transition-colors flex items-center justify-center gap-2"
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
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Calcular de nuevo
      </button>
    </div>
  );
}
