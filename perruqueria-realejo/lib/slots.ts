import { addDays, format } from "date-fns";
import { getAvailabilityRules, getBlockedSlots, getBookings, getSettings } from "./data";
import type { AvailabilityRule, BlockedSlot, Booking, Settings } from "./types";

export interface Slot {
  hora_inicio: string; // "10:00"
  hora_fin: string;
}

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
export const toHHMM = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/**
 * Cálculo puro de huecos libres de un día:
 * reglas semanales − bloqueos − reservas activas, con margen entre citas,
 * antelación mínima y horizonte máximo.
 */
export function calcularSlots(
  fecha: string, // YYYY-MM-DD
  duracionMin: number,
  rules: AvailabilityRule[],
  bloqueos: BlockedSlot[],
  reservas: Booking[],
  cfg: Settings,
  ahora: Date = new Date()
): Slot[] {
  const dia = new Date(`${fecha}T00:00:00`);
  const hoyStr = format(ahora, "yyyy-MM-dd");
  if (fecha < hoyStr) return [];
  if (dia > addDays(ahora, cfg.horizonte_max_semanas * 7)) return [];

  const reglasDia = rules.filter((r) => r.activo && r.dia_semana === dia.getDay());
  if (reglasDia.length === 0) return [];

  const ocupados = [
    ...bloqueos
      .filter((b) => b.fecha === fecha)
      .map((b) => ({ inicio: toMin(b.hora_inicio), fin: toMin(b.hora_fin) })),
    ...reservas
      .filter(
        (r) => r.fecha === fecha && (r.estado === "pendiente" || r.estado === "confirmada")
      )
      .map((r) => ({ inicio: toMin(r.hora_inicio), fin: toMin(r.hora_fin) })),
  ];

  const esHoy = fecha === hoyStr;
  const minInicio = esHoy
    ? ahora.getHours() * 60 + ahora.getMinutes() + cfg.antelacion_min_horas * 60
    : 0;

  const slots: Slot[] = [];
  for (const rule of reglasDia) {
    const apertura = toMin(rule.hora_inicio);
    const cierre = toMin(rule.hora_fin);
    for (let inicio = apertura; inicio + duracionMin <= cierre; inicio += 15) {
      if (inicio < minInicio) continue;
      const fin = inicio + duracionMin;
      // margen entre citas a ambos lados
      const choca = ocupados.some(
        (o) => inicio < o.fin + cfg.margen_minutos && fin + cfg.margen_minutos > o.inicio
      );
      if (!choca) slots.push({ hora_inicio: toHHMM(inicio), hora_fin: toHHMM(fin) });
    }
  }
  return slots.sort((a, b) => toMin(a.hora_inicio) - toMin(b.hora_inicio));
}

/** Huecos libres de un día concreto (consulta datos). */
export async function slotsLibres(fecha: string, duracionMin: number): Promise<Slot[]> {
  const [cfg, rules, bloqueos, reservas] = await Promise.all([
    getSettings(),
    getAvailabilityRules(),
    getBlockedSlots(fecha, fecha),
    getBookings(fecha, fecha),
  ]);
  return calcularSlots(fecha, duracionMin, rules, bloqueos, reservas, cfg);
}

/**
 * Disponibilidad de un rango de días (una sola tanda de consultas):
 * devuelve los días que tienen al menos un hueco libre.
 */
export async function diasConHueco(
  desde: string,
  dias: number,
  duracionMin: number
): Promise<string[]> {
  const hasta = format(addDays(new Date(`${desde}T00:00:00`), dias - 1), "yyyy-MM-dd");
  const [cfg, rules, bloqueos, reservas] = await Promise.all([
    getSettings(),
    getAvailabilityRules(),
    getBlockedSlots(desde, hasta),
    getBookings(desde, hasta),
  ]);
  const resultado: string[] = [];
  for (let i = 0; i < dias; i++) {
    const fecha = format(addDays(new Date(`${desde}T00:00:00`), i), "yyyy-MM-dd");
    if (calcularSlots(fecha, duracionMin, rules, bloqueos, reservas, cfg).length > 0) {
      resultado.push(fecha);
    }
  }
  return resultado;
}
