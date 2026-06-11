/**
 * Página Calculadora de Tarifas
 *
 * Wizard interactivo en 4 pasos para calcular rangos orientativos
 * Objetivo: <45 segundos en móvil
 */

import CalculatorWizard from "@/components/calculator/CalculatorWizard";

export const metadata = {
  title: "Calcula tu tarifa | Perruquería Canina Realejo",
  description:
    "Calcula el precio orientativo de la peluquería de tu perro en menos de 1 minuto. Baños, cortes y tratamientos en Granada.",
};

export default function CalculadoraPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Calcula tu{" "}
            <span className="text-emphasis">tarifa</span>
          </h1>
          <p className="text-lg text-ink/70">
            En menos de 1 minuto sabrás el precio orientativo para tu peludo.
            Cada uno es un mundo: Cristina te confirma el precio exacto al verlo.
          </p>
        </div>

        {/* Aviso legal */}
        <div className="bg-sky/10 border border-sky/30 rounded-lg p-4 mb-8 text-sm text-ink/80">
          <p className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-sky flex-shrink-0 mt-0.5"
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
              <strong>Tarifas orientativas de mercado en Granada.</strong> El
              precio final depende de cada perro: estado del pelo, comportamiento y
              tiempo necesario. Confirmado por Cristina.
            </span>
          </p>
        </div>

        {/* Wizard */}
        <CalculatorWizard />
      </div>
    </div>
  );
}
