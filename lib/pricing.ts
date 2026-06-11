import type { EstadoPelo, PriceRow, Service, Tamano, TipoPelo } from "./types";

export interface Estimacion {
  precioMin: number;
  precioMax: number;
  duracionMin: number; // minutos
  duracionMax: number;
  esPrecioReal: boolean;
  recargoAplicadoPct: number;
}

/**
 * Busca la fila de la matriz más específica: (tamaño, pelo exacto) y,
 * si no existe, la genérica (tamaño, cualquier pelo).
 */
export function findPriceRow(
  rows: PriceRow[],
  serviceId: string,
  tamano: Tamano,
  tipoPelo: TipoPelo | null
): PriceRow | null {
  const delServicio = rows.filter((r) => r.service_id === serviceId && r.tamano === tamano);
  if (tipoPelo) {
    const exacta = delServicio.find((r) => r.tipo_pelo === tipoPelo);
    if (exacta) return exacta;
  }
  return delServicio.find((r) => r.tipo_pelo === null) ?? delServicio[0] ?? null;
}

/**
 * Calcula el rango orientativo aplicando el recargo por estado del pelo:
 * nudos → +recargo, muy enredado → +recargo×2. La duración también crece.
 */
export function estimar(
  service: Service,
  row: PriceRow,
  estadoPelo: EstadoPelo
): Estimacion {
  const factorRecargo =
    estadoPelo === "nudos" ? row.recargo_nudos_pct : estadoPelo === "muy_enredado" ? row.recargo_nudos_pct * 2 : 0;
  const mult = 1 + factorRecargo / 100;
  const factorDuracion = estadoPelo === "nudos" ? 1.2 : estadoPelo === "muy_enredado" ? 1.5 : 1;

  return {
    precioMin: Math.round(row.precio_min * mult),
    precioMax: Math.round(row.precio_max * mult),
    duracionMin: Math.round((service.duracion_min * factorDuracion) / 5) * 5,
    duracionMax: Math.round((service.duracion_max * factorDuracion) / 5) * 5,
    esPrecioReal: row.es_precio_real,
    recargoAplicadoPct: factorRecargo,
  };
}

/**
 * Duración del hueco de reserva según tamaño: interpola entre la duración
 * mínima (mini) y máxima (gigante) del servicio, redondeada a 15 min.
 */
export function duracionHueco(service: Service, tamano: Tamano): number {
  const idx = ["mini", "pequeno", "mediano", "grande", "gigante"].indexOf(tamano);
  const t = idx < 0 ? 0.5 : idx / 4;
  const minutos = service.duracion_min + (service.duracion_max - service.duracion_min) * t;
  return Math.max(15, Math.round(minutos / 15) * 15);
}

export function formatoRango(min: number, max: number): string {
  return min === max ? `${min} €` : `${min}–${max} €`;
}

export function formatoDuracion(min: number, max?: number): string {
  const f = (m: number) => (m >= 60 ? `${Math.floor(m / 60)} h${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`);
  return max && max !== min ? `${f(min)} – ${f(max)}` : f(min);
}
