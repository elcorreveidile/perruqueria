export type Categoria =
  | "bano_higiene"
  | "corte_estilismo"
  | "pelo_especial"
  | "piel_sensible"
  | "cachorros";

export type Tamano = "mini" | "pequeno" | "mediano" | "grande" | "gigante";

export type TipoPelo = "corto" | "medio" | "largo" | "rizado" | "doble_manto";

export type EstadoPelo = "al_dia" | "nudos" | "muy_enredado";

export type EstadoReserva =
  | "pendiente"
  | "confirmada"
  | "cancelada"
  | "completada"
  | "no_show";

export interface Service {
  id: string;
  slug: string;
  nombre: string;
  categoria: Categoria;
  descripcion_corta: string;
  descripcion_larga: string;
  para_quien: string;
  incluye: string[];
  duracion_min: number; // minutos
  duracion_max: number;
  recurrencia_semanas: number;
  en_calculadora: boolean;
  visible: boolean;
  orden: number;
}

export interface PriceRow {
  id: string;
  service_id: string;
  tamano: Tamano;
  tipo_pelo: TipoPelo | null; // null = cualquier pelo
  recargo_nudos_pct: number;
  precio_min: number;
  precio_max: number;
  es_precio_real: boolean;
}

export interface Lead {
  id: string;
  nombre: string | null;
  telefono: string | null;
  email: string | null;
  nombre_perro: string | null;
  raza: string | null;
  tamano: Tamano | null;
  observaciones: string | null;
  origen: "calculadora" | "cita" | "contacto";
  resumen_tarifa: Record<string, unknown> | null;
  created_at: string;
}

export interface AvailabilityRule {
  id: string;
  dia_semana: number; // 0 = domingo … 6 = sábado
  hora_inicio: string; // "10:00"
  hora_fin: string;
  activo: boolean;
}

export interface BlockedSlot {
  id: string;
  fecha: string; // YYYY-MM-DD
  hora_inicio: string;
  hora_fin: string;
  motivo: string | null;
}

export interface Booking {
  id: string;
  service_id: string;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  nombre: string;
  telefono: string;
  email: string | null;
  nombre_perro: string;
  raza: string | null;
  tamano: Tamano;
  observaciones: string | null;
  estado: EstadoReserva;
  token_cancelacion: string;
  created_at: string;
}

export interface ScheduledEmail {
  id: string;
  booking_id: string;
  tipo: "recordatorio_24h" | "recurrencia";
  enviar_en: string;
  enviado_at: string | null;
}

export interface WaitlistEntry {
  id: string;
  fecha_deseada: string;
  service_id: string;
  nombre: string;
  telefono: string;
  email: string;
  notificado_at: string | null;
  created_at: string;
}

export interface Settings {
  margen_minutos: number;
  confirmacion_automatica: boolean;
  antelacion_min_horas: number;
  horizonte_max_semanas: number;
  recordatorios_activos: boolean;
}

export const TAMANOS: { value: Tamano; label: string; detalle: string }[] = [
  { value: "mini", label: "Mini", detalle: "menos de 5 kg" },
  { value: "pequeno", label: "Pequeño", detalle: "5–10 kg" },
  { value: "mediano", label: "Mediano", detalle: "10–25 kg" },
  { value: "grande", label: "Grande", detalle: "25–40 kg" },
  { value: "gigante", label: "Gigante", detalle: "más de 40 kg" },
];

export const TIPOS_PELO: { value: TipoPelo; label: string; detalle: string }[] = [
  { value: "corto", label: "Corto", detalle: "tipo beagle o bóxer" },
  { value: "medio", label: "Medio", detalle: "tipo cocker o border collie" },
  { value: "largo", label: "Largo", detalle: "tipo yorkshire o maltés" },
  { value: "rizado", label: "Rizado", detalle: "caniche, bichón…" },
  { value: "doble_manto", label: "Doble manto", detalle: "nórdicos, pastores…" },
];

export const ESTADOS_PELO: { value: EstadoPelo; label: string; detalle: string }[] = [
  { value: "al_dia", label: "Al día", detalle: "cepillado y sin nudos" },
  { value: "nudos", label: "Con nudos", detalle: "algunos enredos sueltos" },
  { value: "muy_enredado", label: "Muy enredado", detalle: "hace tiempo del último arreglo" },
];

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: "bano_higiene", label: "Baño e higiene" },
  { value: "corte_estilismo", label: "Corte y estilismo" },
  { value: "pelo_especial", label: "Pelo especial" },
  { value: "piel_sensible", label: "Piel sensible" },
  { value: "cachorros", label: "Cachorros" },
];

export const ESTADOS_RESERVA: { value: EstadoReserva; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "confirmada", label: "Confirmada" },
  { value: "cancelada", label: "Cancelada" },
  { value: "completada", label: "Completada" },
  { value: "no_show", label: "No vino" },
];

export function labelTamano(t: Tamano | null | undefined): string {
  return TAMANOS.find((x) => x.value === t)?.label ?? "—";
}

export function labelPelo(p: TipoPelo | null | undefined): string {
  return p ? TIPOS_PELO.find((x) => x.value === p)?.label ?? "—" : "Cualquiera";
}

export function labelCategoria(c: Categoria): string {
  return CATEGORIAS.find((x) => x.value === c)?.label ?? c;
}

export function labelEstadoReserva(e: EstadoReserva): string {
  return ESTADOS_RESERVA.find((x) => x.value === e)?.label ?? e;
}
