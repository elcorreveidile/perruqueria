/**
 * StepTipoPelo — Paso 2: ¿Qué tipo de pelo tiene?
 */

import type { CoatTypes } from "./types";

interface StepTipoPeloProps {
  onSelect: (tipoPelo: CoatTypes) => void;
  onBack: () => void;
  value?: CoatTypes;
}

export default function StepTipoPelo({
  onSelect,
  onBack,
  value,
}: StepTipoPeloProps) {
  const coatTypes = [
    {
      id: "corto",
      label: "Corto",
      description: "Pelo corto, fácil de mantener",
      examples: "Boxer, Doberman, Pitbull",
      icon: "✂️",
    },
    {
      id: "medio",
      label: "Medio",
      description: "Pelo de longitud media",
      examples: "Golden Retriever, Labrador",
      icon: "✂️",
    },
    {
      id: "largo",
      label: "Largo",
      description: "Pelo largo que requiere cepillado",
      examples: "Cocker, Setter, Spaniel",
      icon: "✂️",
    },
    {
      id: "rizado",
      label: "Rizado",
      description: "Pelo rizado o con textura",
      examples: "Caniche, Bichón",
      icon: "🌀",
    },
    {
      id: "doble_manto",
      label: "Doble manto",
      description: "Pelo denso con subpelo",
      examples: "Husky, Pastor Belga, Golden",
      icon: "🐕",
    },
  ] as const;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
        ¿Qué tipo de pelo tiene? ✂️
      </h2>
      <p className="text-ink/70 mb-8">
        Selecciona el tipo de pelo de tu perro para calcular el tiempo necesario.
      </p>

      <div className="grid gap-4">
        {coatTypes.map((coat) => (
          <button
            key={coat.id}
            onClick={() => onSelect(coat.id)}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${
                value === coat.id
                  ? "border-sky bg-sky/10"
                  : "border-sky/30 hover:border-sky/60 bg-white"
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{coat.icon}</div>
              <div className="flex-1">
                <div className="font-display font-semibold text-lg mb-1">
                  {coat.label}
                </div>
                <div className="text-sm text-ink/70 mb-2">
                  {coat.description}
                </div>
                <div className="text-xs text-ink/60">
                  Ej: {coat.examples}
                </div>
              </div>
            </div>
          </button>
        ))}
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
