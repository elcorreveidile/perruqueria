// Token de sesión firmado con HMAC (Web Crypto: funciona en Node y Edge).
// Sin dependencias de next/headers para poder usarse desde el middleware.

export const COOKIE_NAME = "admin_session";
export const DURACION_MS = 1000 * 60 * 60 * 24 * 7; // 7 días

function secreto(): string {
  return process.env.AUTH_SECRET || process.env.ADMIN_PASSWORD || "demo-secret";
}

async function hmac(valor: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secreto()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const firma = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(valor));
  return Array.from(new Uint8Array(firma))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function crearToken(): Promise<string> {
  const exp = String(Date.now() + DURACION_MS);
  return `${exp}.${await hmac(exp)}`;
}

export async function verificarToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [exp, firma] = token.split(".");
  if (!exp || !firma) return false;
  if (Number(exp) < Date.now()) return false;
  return (await hmac(exp)) === firma;
}
