/**
 * Página de Servicios
 *
 * Catálogo filtrable por categoría
 */

import { Suspense } from "react";
import ServicesGrid from "@/components/services/ServicesGrid";

// Marcar como dinámica para no prerender en build
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Servicios | Perruquería Canina Realejo",
  description:
    "Catálogo completo de servicios: baños, cortes, tratamientos dermatológicos y más. Productos veganos y manejo en positivo.",
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Nuestros <span className="text-emphasis">servicios</span>
          </h1>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto">
            Todo lo que tu peludo necesita, con productos veganos y mucho cariño.
            Cada servicio está pensado para que sea una experiencia positiva.
          </p>
        </div>

        {/* Grid de servicios */}
        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky"></div>
              <p className="mt-4 text-ink/60">Cargando servicios...</p>
            </div>
          }
        >
          <ServicesGrid />
        </Suspense>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-sky/10 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              ¿No estás seguro qué necesita tu peludo?
            </h2>
            <p className="text-ink/70 mb-6">
              Usa nuestra calculadora de tarifas para obtener un precio
              orientativo en menos de 1 minuto.
            </p>
            <a
              href="/calculadora"
              className="inline-flex px-8 py-4 bg-sky text-ink rounded-lg font-semibold hover:bg-sky/90 transition-colors"
            >
              Calcula tu tarifa
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
