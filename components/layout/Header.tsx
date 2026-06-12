"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Wordmark } from "./Logo";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/filosofia", label: "Filosofía" },
  { href: "/calculadora", label: "Calcula tu tarifa" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
];

export function Header() {
  const [abierto, setAbierto] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-cielo/40 bg-crema/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" aria-label="Perruquería Canina Realejo — inicio">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                pathname === e.href ? "text-coral" : "text-tinta hover:text-coral"
              }`}
            >
              {e.label}
            </Link>
          ))}
          <Link
            href="/reservas"
            className="ml-2 rounded-full bg-coral px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-coral-oscuro"
          >
            Reserva tu hueco
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 md:hidden"
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto(!abierto)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            {abierto ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {abierto && (
        <nav className="border-t border-cielo/40 bg-crema px-4 pb-4 md:hidden" aria-label="Principal móvil">
          {enlaces.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              onClick={() => setAbierto(false)}
              className="block rounded-lg px-3 py-3 font-semibold text-tinta hover:bg-cielo/30"
            >
              {e.label}
            </Link>
          ))}
          <Link
            href="/reservas"
            onClick={() => setAbierto(false)}
            className="mt-2 block rounded-full bg-coral px-5 py-3 text-center font-bold text-white"
          >
            Reserva tu hueco
          </Link>
        </nav>
      )}
    </header>
  );
}
