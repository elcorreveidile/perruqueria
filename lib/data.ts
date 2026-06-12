import { dbConfigured, sql } from "./db";
import { DEFAULT_SETTINGS, SEED_RULES, SEED_SERVICES, seedPriceRows } from "./seed-data";
import type {
  AvailabilityRule,
  BlockedSlot,
  Booking,
  PriceRow,
  Service,
  Settings,
} from "./types";

// Capa de lectura: usa Neon si está configurado y, si no, los datos
// de muestra embebidos (la demo funciona sin backend).

export async function getServices(opts?: { includeHidden?: boolean }): Promise<Service[]> {
  if (!dbConfigured()) {
    const all = SEED_SERVICES as Service[];
    return opts?.includeHidden ? all : all.filter((s) => s.visible);
  }
  const rows = opts?.includeHidden
    ? await sql()`select * from services order by orden`
    : await sql()`select * from services where visible order by orden`;
  return rows as Service[];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices({ includeHidden: true });
  return services.find((s) => s.slug === slug) ?? null;
}

export async function getServiceById(id: string): Promise<Service | null> {
  const services = await getServices({ includeHidden: true });
  return services.find((s) => s.id === id) ?? null;
}

export async function getPriceRows(serviceId?: string): Promise<PriceRow[]> {
  if (!dbConfigured()) {
    const rows = seedPriceRows();
    return serviceId ? rows.filter((r) => r.service_id === serviceId) : rows;
  }
  const rows = serviceId
    ? await sql()`select * from price_matrix where service_id = ${serviceId}`
    : await sql()`select * from price_matrix`;
  return rows.map((r) => ({
    ...r,
    recargo_nudos_pct: Number(r.recargo_nudos_pct),
    precio_min: Number(r.precio_min),
    precio_max: Number(r.precio_max),
  })) as PriceRow[];
}

export async function getSettings(): Promise<Settings> {
  if (!dbConfigured()) return DEFAULT_SETTINGS;
  const rows = await sql()`select * from settings where id = 1`;
  const data = rows[0];
  if (!data) return DEFAULT_SETTINGS;
  return {
    margen_minutos: data.margen_minutos ?? DEFAULT_SETTINGS.margen_minutos,
    confirmacion_automatica: data.confirmacion_automatica ?? false,
    antelacion_min_horas: data.antelacion_min_horas ?? DEFAULT_SETTINGS.antelacion_min_horas,
    horizonte_max_semanas: data.horizonte_max_semanas ?? DEFAULT_SETTINGS.horizonte_max_semanas,
    recordatorios_activos: data.recordatorios_activos ?? true,
  };
}

export async function getAvailabilityRules(): Promise<AvailabilityRule[]> {
  if (!dbConfigured()) return SEED_RULES;
  const rows = await sql()`
    select id, dia_semana, hora_inicio::text, hora_fin::text, activo
    from availability_rules where activo`;
  return rows.map((r) => ({
    ...r,
    hora_inicio: String(r.hora_inicio).slice(0, 5),
    hora_fin: String(r.hora_fin).slice(0, 5),
  })) as AvailabilityRule[];
}

export async function getBlockedSlots(desde: string, hasta: string): Promise<BlockedSlot[]> {
  if (!dbConfigured()) return [];
  const rows = await sql()`
    select id, fecha::text, hora_inicio::text, hora_fin::text, motivo
    from blocked_slots
    where fecha between ${desde} and ${hasta}
    order by fecha, hora_inicio`;
  return rows.map((b) => ({
    ...b,
    hora_inicio: String(b.hora_inicio).slice(0, 5),
    hora_fin: String(b.hora_fin).slice(0, 5),
  })) as BlockedSlot[];
}

const COLUMNAS_BOOKING = `id, service_id, fecha::text, hora_inicio::text, hora_fin::text,
  nombre, telefono, email, nombre_perro, raza, tamano, observaciones,
  estado, token_cancelacion, created_at::text`;

function normalizarBooking(b: Record<string, unknown>): Booking {
  return {
    ...b,
    hora_inicio: String(b.hora_inicio).slice(0, 5),
    hora_fin: String(b.hora_fin).slice(0, 5),
  } as Booking;
}

export async function getBookings(desde: string, hasta: string): Promise<Booking[]> {
  if (!dbConfigured()) return [];
  const rows = await sql().query(
    `select ${COLUMNAS_BOOKING} from bookings
     where fecha between $1 and $2
     order by fecha, hora_inicio`,
    [desde, hasta]
  );
  return (rows as Record<string, unknown>[]).map(normalizarBooking);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  if (!dbConfigured()) return null;
  const rows = await sql().query(`select ${COLUMNAS_BOOKING} from bookings where id = $1`, [id]);
  const b = (rows as Record<string, unknown>[])[0];
  return b ? normalizarBooking(b) : null;
}

export async function getBookingByToken(token: string): Promise<Booking | null> {
  if (!dbConfigured()) return null;
  const rows = await sql().query(
    `select ${COLUMNAS_BOOKING} from bookings where token_cancelacion = $1`,
    [token]
  );
  const b = (rows as Record<string, unknown>[])[0];
  return b ? normalizarBooking(b) : null;
}

/** Avisa por email al primero de la lista de espera de un día (orden de llegada). */
export async function notificarListaEspera(fecha: string): Promise<void> {
  if (!dbConfigured()) return;
  const rows = await sql()`
    select * from waitlist
    where fecha_deseada = ${fecha} and notificado_at is null
    order by created_at limit 1`;
  const primero = rows[0];
  if (!primero) return;
  const service = await getServiceById(primero.service_id);
  const { emailWaitlist, enviarEmail } = await import("./emails");
  await enviarEmail(
    emailWaitlist(primero.nombre, primero.email, fecha, service?.nombre ?? "tu servicio")
  );
  await sql()`update waitlist set notificado_at = now() where id = ${primero.id}`;
}
