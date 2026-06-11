/**
 * StepTamanho — Paso 1: ¿Cómo es tu peludo?
 *
 * Selección de tamaño con iconos de siluetas
 */

import type { DogSizes } from "./types";

interface StepTamanhoProps {
  onSelect: (tamanho: DogSizes) => void;
  value?: DogSizes;
}

export default function StepTamanho({ onSelect, value }: StepTamanhoProps) {
  const sizes = [
    {
      id: "mini",
      label: "Mini",
      description: "< 5 kg",
      icon: "🐕",
    },
    {
      id: "pequeno",
      label: "Pequeño",
      description: "5–10 kg",
      icon: "🐕",
    },
    {
      id: "mediano",
      label: "Mediano",
      description: "10–25 kg",
      icon: "🐕",
    },
    {
      id: "grande",
      label: "Grande",
      description: "25–40 kg",
      icon: "🐕",
    },
    {
      id: "gigante",
      label: "Gigante",
      description: "> 40 kg",
      icon: "🐕",
    },
  ] as const;

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-semibold mb-2">
        ¿Cómo es tu peludo? 🐾
      </h2>
      <p className="text-ink/70 mb-8">
        Selecciona el tamaño aproximado de tu perro para calcular la tarifa.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSelect(size.id)}
            className={`
              p-6 rounded-lg border-2 transition-all
              ${
                value === size.id
                  ? "border-sky bg-sky/10"
                  : "border-sky/30 hover:border-sky/60 bg-white"
              }
            `}
          >
            <div className="text-4xl mb-2">{size.icon}</div>
            <div className="font-display font-semibold text-lg mb-1">
              {size.label}
            </div>
            <div className="text-sm text-ink/60">{size.description}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 p-4 bg-sage/10 rounded-lg">
        <p className="text-sm text-ink/70">
          💡 <strong>Tip:</strong> Si no estás seguro, selecciona el tamaño más
          cercano. Cristina confirmará el precio al ver a tu peludo.
        </p>
      </div>
    </div>
  );
}
