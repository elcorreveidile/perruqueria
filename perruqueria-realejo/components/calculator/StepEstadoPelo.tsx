/**
 * StepEstadoPelo — Paso 3: ¿Cómo está el pelo?
 */

import type { CoatCondition } from "./types";

interface StepEstadoPeloProps {
  onSelect: (estadoPelo: CoatCondition) => void;
  onBack: () => void;
  value?: CoatCondition;
}

export default function StepEstadoPelo({
  onSelect,
  onBack,
  value,
}: StepEstadoPeloProps) {
  const conditions = [
    {
      id: "al_dia",
      label: "Al día",
      description: "Pelo bien cuidado, sin nudos",
      icon: "✨",
      recargo: 0,
    },
    {
      id: "con_nudos",
      label: "Con nudos",
      description: "Algunos nudos que requieren atención",
      icon: "🔗",
      recargo: 15,
    },
    {
      id: "muy_enredado",
      label: "Muy enredado",
      description: "Pelo muy enredado o con flecos",
      icon: "⚠️",
      recargo: 30,
    },
  ] as const;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
        ¿Cómo está el pelo? 🧶
      </h2>
      <p className="text-ink/70 mb-8">
        Sé sincero: esto ayuda a calcular el tiempo necesario y el precio.
      </p>

      <div className="grid gap-4">
        {conditions.map((condition) => (
          <button
            key={condition.id}
            onClick={() => onSelect(condition.id)}
            className={`
              p-6 rounded-lg border-2 text-left transition-all
              ${
                value === condition.id
                  ? "border-sky bg-sky/10"
                  : "border-sky/30 hover:border-sky/60 bg-white"
              }
            `}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl">{condition.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="font-display font-semibold text-lg">
                    {condition.label}
                  </div>
                  {condition.recargo > 0 && (
                    <div className="px-2 py-0.5 bg-coral/10 text-coral text-xs font-medium rounded">
                      +{condition.recargo}% tiempo
                    </div>
                  )}
                </div>
                <div className="text-sm text-ink/70">
                  {condition.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-sage/10 rounded-lg">
        <p className="text-sm text-ink/70">
          💚 <strong>Buenas noticias:</strong> Usamos productos veganos y
          técnicas suaves. Incluso el pelo más enredado sale suave y brillante.
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
