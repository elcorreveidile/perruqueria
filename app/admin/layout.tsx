import Link from "next/link";
import { logoutAction } from "@/lib/admin-actions";
import { sesionActiva } from "@/lib/auth";
import { HuellaBurbujas } from "@/components/layout/Logo";

const enlaces = [
  { href: "/admin", label: "Hoy" },
  { href: "/admin/agenda", label: "Agenda" },
  { href: "/admin/bloqueos", label: "Bloqueos" },
  { href: "/admin/servicios", label: "Servicios y precios" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/emails", label: "Emails" },
  { href: "/admin/ajustes", label: "Ajustes" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await sesionActiva();

  return (
    <div className="min-h-screen bg-crema pb-24">
      <header className="sticky top-0 z-40 border-b border-cielo/40 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="flex items-center gap-2 font-display text-lg">
            <HuellaBurbujas className="h-7 w-7" /> Panel
          </Link>
          {user && (
            <form action={logoutAction}>
              <button type="submit" className="text-sm font-bold text-tinta-suave hover:text-coral">
                Salir
              </button>
            </form>
          )}
        </div>
        {user && (
          <nav className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 pb-2" aria-label="Panel">
            {enlaces.map((e) => (
              <Link
                key={e.href}
                href={e.href}
                className="shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold text-tinta hover:bg-cielo/30"
              >
                {e.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
