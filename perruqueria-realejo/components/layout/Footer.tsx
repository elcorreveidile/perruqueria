"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HuellaBurbujas } from "./Logo";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-cielo/40 bg-cielo-claro/50 pb-24">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <HuellaBurbujas className="h-8 w-8" />
            <p className="font-display text-lg">Perruquería Canina Realejo</p>
          </div>
          <p className="mt-3 text-sm text-tinta-suave">
            Peluquería canina <em className="font-display">en positivo</em> en el corazón del
            Realejo. Sin prisas, sin miedo, sin estrés. Productos veganos.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">Visítanos</p>
          <p>C. Molinos 47, Local</p>
          <p>Barrio del Realejo, 18009 Granada</p>
          <p className="mt-2">L–V 10:00–17:45 <span className="text-tinta-suave">(confirmar)</span></p>
          <p>Tel: 6XX XXX XXX <span className="text-tinta-suave">(placeholder)</span></p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-bold">Enlaces</p>
          <ul className="space-y-1">
            <li><Link className="hover:text-coral" href="/servicios">Servicios</Link></li>
            <li><Link className="hover:text-coral" href="/calculadora">Calculadora de tarifas</Link></li>
            <li><Link className="hover:text-coral" href="/reservas">Reserva tu cita</Link></li>
            <li><Link className="hover:text-coral" href="/filosofia">Filosofía en positivo</Link></li>
            <li><Link className="hover:text-coral" href="/legal">Aviso legal · Privacidad · Cookies</Link></li>
          </ul>
        </div>
      </div>
      <p className="px-4 pb-4 text-center text-xs text-tinta-suave">
        ⭐ 4,7 en Google — los peludos repiten.
      </p>
    </footer>
  );
}
