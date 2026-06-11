/**
 * Services Helper — Consultas de servicios desde Neon
 */

import { query, queryRaw } from "./db";
import type { Service } from "@/components/calculator/types";

/**
 * Obtener todos los servicios visibles
 */
export async function getVisibleServices(): Promise<Service[]> {
  const sql = `
    SELECT
      id,
      slug,
      nombre,
      categoria,
      descripcion_corta,
      descripcion_larga,
      duracion_min,
      duracion_max,
      visible,
      orden
    FROM services
    WHERE visible = true
    ORDER BY orden ASC
  `;

  const services = await queryRaw<Service>(sql);
  return services;
}

/**
 * Obtener servicio por slug
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const sql = `
    SELECT
      id,
      slug,
      nombre,
      categoria,
      descripcion_corta,
      descripcion_larga,
      duracion_min,
      duracion_max,
      visible,
      orden
    FROM services
    WHERE slug = $1 AND visible = true
  `;

  const services = await queryRaw<Service>(sql, [slug]);
  return services.length > 0 ? services[0] : null;
}

/**
 * Obtener servicios por categoría
 */
export async function getServicesByCategory(
  category: string
): Promise<Service[]> {
  const sql = `
    SELECT
      id,
      slug,
      nombre,
      categoria,
      descripcion_corta,
      descripcion_larga,
      duracion_min,
      duracion_max,
      visible,
      orden
    FROM services
    WHERE categoria = $1 AND visible = true
    ORDER BY orden ASC
  `;

  const services = await queryRaw<Service>(sql, [category]);
  return services;
}

/**
 * Obtener precio para un servicio, tamaño y tipo de pelo
 */
export async function getPrice(
  serviceSlug: string,
  tamanho: string,
  tipoPelo: string
): Promise<{
  precioMin: number;
  precioMax: number;
  recargoNudos: number;
  esPrecioReal: boolean;
} | null> {
  const sql = `
    SELECT
      pm.precio_min,
      pm.precio_max,
      pm.recargo_nudos_pct,
      pm.es_precio_real
    FROM price_matrix pm
    INNER JOIN services s ON s.id = pm.service_id
    WHERE s.slug = $1
      AND pm.tamano = $2
      AND pm.tipo_pelo = $3
  `;

  const prices = await queryRaw(sql, [serviceSlug, tamanho, tipoPelo]);

  if (prices.length === 0) return null;

  const price = prices[0] as any;
  return {
    precioMin: parseFloat(price.precio_min),
    precioMax: parseFloat(price.precio_max),
    recargoNudos: price.recargo_nudos_pct,
    esPrecioReal: price.es_precio_real,
  };
}

/**
 * Calcular precio final con recargo por nudos
 */
export function calculatePriceWithSurcharge(
  baseMin: number,
  baseMax: number,
  surchargePercent: number
): { precioMin: number; precioMax: number } {
  const surcharge = surchargePercent / 100;
  return {
    precioMin: Math.round(baseMin * (1 + surcharge)),
    precioMax: Math.round(baseMax * (1 + surcharge)),
  };
}

/**
 * Mapeo de recargo por estado del pelo
 */
export function getCoatConditionSurcharge(condition: string): number {
  switch (condition) {
    case "al_dia":
      return 0;
    case "con_nudos":
      return 15;
    case "muy_enredado":
      return 30;
    default:
      return 0;
  }
}
