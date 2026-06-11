import { loginAction } from "@/lib/admin-actions";
import { supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (!supabaseConfigured()) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-2xl">Panel de administración</h1>
        <p className="mt-4 rounded-2xl bg-cielo-claro p-4 text-sm text-tinta-suave">
          Supabase no está configurado en este despliegue. Define las variables de entorno
          (ver README) para activar el panel: hasta entonces, la web pública funciona con
          datos de muestra.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md py-12">
      <h1 className="text-center text-3xl">Hola, Cristina 👋</h1>
      <p className="mt-2 text-center text-sm text-tinta-suave">
        Entra para gestionar tu agenda, servicios y tarifas.
      </p>
      <form action={loginAction} className="mt-8 grid gap-4 rounded-3xl bg-white p-6">
        <label className="text-sm font-bold">
          Email
          <input
            name="email"
            type="email"
            required
            autoComplete="username"
            className="mt-1 w-full rounded-full border border-cielo px-4 py-2.5 font-normal"
          />
        </label>
        <label className="text-sm font-bold">
          Contraseña
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-full border border-cielo px-4 py-2.5 font-normal"
          />
        </label>
        {error === "credenciales" && (
          <p className="text-sm font-bold text-coral" role="alert">
            Email o contraseña incorrectos.
          </p>
        )}
        <button
          type="submit"
          className="rounded-full bg-coral px-6 py-3 font-bold text-white hover:bg-coral-oscuro"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
