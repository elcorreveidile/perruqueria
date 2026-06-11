/**
 * Cliente de Base de Datos — Neon PostgreSQL
 *
 * Configuración para Vercel Postgres con Neon
 * Docs: https://neon.tech/docs/serverless/serverless-driver
 */

import { neon, neonConfig } from '@neondatabase/serverless';

// Configuración para Neon
neonConfig.fetchConnectionCache = true;

// Determinar si estamos en entorno server-side
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL && typeof window === 'undefined') {
  console.warn('DATABASE_URL no está definida — algunas funciones no estarán disponibles');
}

// Cliente SQL para Neon (tagged template function)
const sqlTemplate = DATABASE_URL ? neon(DATABASE_URL) : null;

/**
 * Ejecutar query SQL usando tagged templates
 *
 * Ejemplo: query`SELECT * FROM services WHERE visible = ${true}`
 */
export async function query<T>(strings: TemplateStringsArray, ...values: any[]): Promise<T[]> {
  if (!sqlTemplate) {
    throw new Error('DATABASE_URL no está configurada');
  }
  try {
    const result = await sqlTemplate(strings, ...values);
    return result as T[];
  } catch (error) {
    console.error('Error en query SQL:', error);
    throw error;
  }
}

/**
 * Ejecutar query y retornar primer resultado
 */
export async function queryOne<T>(strings: TemplateStringsArray, ...values: any[]): Promise<T | null> {
  const results = await query<T>(strings, ...values);
  return results.length > 0 ? results[0] : null;
}

/**
 * Helper para queries simples (cuando no se pueden usar tagged templates)
 *
 * Ejemplo: queryRaw('SELECT * FROM services WHERE visible = $1', [true])
 */
export async function queryRaw<T>(text: string, params?: any[]): Promise<T[]> {
  if (!sqlTemplate) {
    throw new Error('DATABASE_URL no está configurada');
  }
  try {
    // Usar el método .query() del cliente Neon para queries con placeholders
    const result = await sqlTemplate.query(text, params || []);
    return result as T[];
  } catch (error) {
    console.error('Error en query SQL raw:', error);
    throw error;
  }
}

// Exportar el cliente raw para casos avanzados
export default sqlTemplate;
