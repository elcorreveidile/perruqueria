/**
 * Types compartidos para la Calculadora
 */

export type DogSizes = "mini" | "pequeno" | "mediano" | "grande" | "gigante";
export type CoatTypes = "corto" | "medio" | "largo" | "rizado" | "doble_manto";
export type CoatCondition = "al_dia" | "con_nudos" | "muy_enredado";

export interface Service {
  id: string;
  slug: string;
  nombre: string;
  categoria: string;
  descripcion_corta: string;
  descripcion_larga: string;
  duracion_min: number;
  duracion_max: number;
  visible: boolean;
  orden: number;
}

export interface PriceResult {
  precioMin: number;
  precioMax: number;
  duracionMin: number;
  duracionMax: number;
  recargoNudos: number;
  esPrecioReal: boolean;
}

export interface CalculatorData {
  tamanho: DogSizes;
  tipoPelo: CoatTypes;
  estadoPelo: CoatCondition;
  servicioSlug: string;
}
