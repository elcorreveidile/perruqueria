"use client";

/**
 * CalculatorWizard — Orquestador del wizard de cálculo
 *
 * 4 pasos: Tamaño → Tipo pelo → Estado → Servicio → Resultado
 */

import { useState } from "react";
import StepTamanho from "./StepTamanho";
import StepTipoPelo from "./StepTipoPelo";
import StepEstadoPelo from "./StepEstadoPelo";
import StepServicio from "./StepServicio";
import ResultadoTarifa from "./ResultadoTarifa";

type Step = "tamanho" | "tipo_pelo" | "estado_pelo" | "servicio" | "resultado";

interface CalculatorState {
  step: Step;
  tamanho?: "mini" | "pequeno" | "mediano" | "grande" | "gigante";
  tipoPelo?: "corto" | "medio" | "largo" | "rizado" | "doble_manto";
  estadoPelo?: "al_dia" | "con_nudos" | "muy_enredado";
  servicio?: string; // slug del servicio
}

export default function CalculatorWizard() {
  const [state, setState] = useState<CalculatorState>({
    step: "tamanho",
  });

  const totalSteps = 4;
  const currentStepNumber =
    state.step === "resultado"
      ? 5
      : state.step === "tamanho"
      ? 1
      : state.step === "tipo_pelo"
      ? 2
      : state.step === "estado_pelo"
      ? 3
      : 4;

  const handleTamanhoSelect = (tamanho: CalculatorState["tamanho"]) => {
    setState({ ...state, tamanho, step: "tipo_pelo" });
  };

  const handleTipoPeloSelect = (tipoPelo: CalculatorState["tipoPelo"]) => {
    setState({ ...state, tipoPelo, step: "estado_pelo" });
  };

  const handleEstadoPeloSelect = (
    estadoPelo: CalculatorState["estadoPelo"]
  ) => {
    setState({ ...state, estadoPelo, step: "servicio" });
  };

  const handleServicioSelect = (servicio: string) => {
    setState({ ...state, servicio, step: "resultado" });
  };

  const handleBack = () => {
    switch (state.step) {
      case "tipo_pelo":
        setState({ ...state, step: "tamanho" });
        break;
      case "estado_pelo":
        setState({ ...state, step: "tipo_pelo" });
        break;
      case "servicio":
        setState({ ...state, step: "estado_pelo" });
        break;
      case "resultado":
        setState({ ...state, step: "servicio" });
        break;
    }
  };

  const handleRestart = () => {
    setState({ step: "tamanho" });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      {/* Progress bar */}
      {state.step !== "resultado" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-ink/60">
              Paso {currentStepNumber} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-sky">
              {Math.round((currentStepNumber / totalSteps) * 100)}%
            </span>
          </div>
          <div className="w-full bg-cream rounded-full h-2">
            <div
              className="bg-sky h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStepNumber / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps */}
      {state.step === "tamanho" && (
        <StepTamanho onSelect={handleTamanhoSelect} value={state.tamanho} />
      )}

      {state.step === "tipo_pelo" && (
        <StepTipoPelo
          onSelect={handleTipoPeloSelect}
          onBack={handleBack}
          value={state.tipoPelo}
        />
      )}

      {state.step === "estado_pelo" && (
        <StepEstadoPelo
          onSelect={handleEstadoPeloSelect}
          onBack={handleBack}
          value={state.estadoPelo}
        />
      )}

      {state.step === "servicio" && (
        <StepServicio
          onSelect={handleServicioSelect}
          onBack={handleBack}
          value={state.servicio}
        />
      )}

      {state.step === "resultado" && (
        <ResultadoTarifa
          tamanho={state.tamanho!}
          tipoPelo={state.tipoPelo!}
          estadoPelo={state.estadoPelo!}
          servicioSlug={state.servicio!}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
