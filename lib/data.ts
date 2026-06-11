import { supabaseAdmin, supabaseConfigured } from "./supabase/server";
import { DEFAULT_SETTINGS, SEED_RULES, SEED_SERVICES, seedPriceRows } from "./seed-data";
import type {
  AvailabilityRule,
  BlockedSlot,
  Booking,
  PriceRow,
  Service,
  Settings,
} from "./types";

// Capa de lectura: usa Supabase si está configurado y, si no, los datos
// de muestra embebidos (la demo funciona sin backend).

export async function getServices(opts?: { includeHidden?: boolean }): Promise<Service[]> {
  if (!supabaseConfigured()) {
    const all = SEED_SERVICES as Service[];
    return opts?.includeHidden ? all : all.filter((s) => s.visible);
  }
  let query = supabaseAdmin().from("services").select("*").order("orden");
  if (!opts?.includeHidden) query = query.eq("visible", true);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Service[];
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
  if (!supabaseConfigured()) {
    const rows = seedPriceRows();
    return serviceId ? rows.filter((r) => r.service_id === serviceId) : rows;
  }
  let query = supabaseAdmin().from("price_matrix").select("*");
  if (serviceId) query = query.eq("service_id", serviceId);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as PriceRow[];
}

export async function getSettings(): Promise<Settings> {
  if (!supabaseConfigured()) return DEFAULT_SETTINGS;
  const { data } = await supabaseAdmin().from("settings").select("*").eq("id", 1).single();
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
  if (!supabaseConfigured()) return SEED_RULES;
  const { data, error } = await supabaseAdmin()
    .from("availability_rules")
    .select("*")
    .eq("activo", true);
  if (error) throw error;
  return (data ?? []).map((r) => ({
    ...r,
    hora_inicio: String(r.hora_inicio).slice(0, 5),
    hora_fin: String(r.hora_fin).slice(0, 5),
  })) as AvailabilityRule[];
}

export async function getBlockedSlots(desde: string, hasta: string): Promise<BlockedSlot[]> {
  if (!supabaseConfigured()) return [];
  const { data, error } = await supabaseAdmin()
    .from("blocked_slots")
    .select("*")
    .gte("fecha", desde)
    .lte("fecha", hasta);
  if (error) throw error;
  return (data ?? []).map((b) => ({
    ...b,
    hora_inicio: String(b.hora_inicio).slice(0, 5),
    hora_fin: String(b.hora_fin).slice(0, 5),
  })) as BlockedSlot[];
}

export async function getBookings(desde: string, hasta: string): Promise<Booking[]> {
  if (!supabaseConfigured()) return [];
  const { data, error } = await supabaseAdmin()
    .from("bookings")
    .select("*")
    .gte("fecha", desde)
    .lte("fecha", hasta)
    .order("fecha")
    .order("hora_inicio");
  if (error) throw error;
  return (data ?? []).map((b) => ({
    ...b,
    hora_inicio: String(b.hora_inicio).slice(0, 5),
    hora_fin: String(b.hora_fin).slice(0, 5),
  })) as Booking[];
}
