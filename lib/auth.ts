import { cookies } from "next/headers";
import { COOKIE_NAME, DURACION_MS, crearToken, verificarToken } from "./auth-token";

// Sesión del panel /admin: credenciales en variables de entorno y cookie
// firmada (los helpers del token viven en auth-token.ts, aptos para Edge).

export function credencialesValidas(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) return false;
  return email.trim().toLowerCase() === adminEmail.toLowerCase() && password === adminPassword;
}

export function authConfigured(): boolean {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
}

export async function iniciarSesion(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, await crearToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: DURACION_MS / 1000,
    path: "/",
  });
}

export async function cerrarSesion(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function sesionActiva(): Promise<boolean> {
  const cookieStore = await cookies();
  return verificarToken(cookieStore.get(COOKIE_NAME)?.value);
}
