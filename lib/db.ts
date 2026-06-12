import { neon } from "@neondatabase/serverless";

/** ¿Está Neon configurado? Si no, el sitio funciona con datos de muestra. */
export function dbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/**
 * Cliente SQL de Neon (tagged template). Solo servidor.
 * Uso: const rows = await sql()`select * from services`;
 */
export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Base de datos no configurada: define DATABASE_URL (Neon)");
  }
  return neon(url);
}

/** ¿Es el error de Postgres por solapamiento o duplicado? */
export function esConflictoDeHueco(error: unknown): boolean {
  const code = (error as { code?: string })?.code;
  return code === "23P01" || code === "23505";
}
