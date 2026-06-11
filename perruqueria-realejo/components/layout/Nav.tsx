/**
 * Navegación Principal
 *
 * Logo + menú + CTA destacado para calculadora
 */

import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-cream/95 backdrop-blur-sm border-b border-sky/20">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12">
              <Image
                src="/favicon.png"
                alt="Huella de burbujas"
                width={48}
                height={48}
                className="transition-transform group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-foreground text-lg">
                Perruquería Canina Realejo
              </span>
              <span className="text-xs text-sage font-medium">
                Peluquería en positivo
              </span>
            </div>
          </Link>

          {/* Menú desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/servicios"
              className="text-foreground hover:text-coral transition-colors font-medium"
            >
              Servicios
            </Link>
            <Link
              href="/calculadora"
              className="text-foreground hover:text-coral transition-colors font-medium"
            >
              Calculadora
            </Link>
            <Link
              href="/filosofia"
              className="text-foreground hover:text-coral transition-colors font-medium"
            >
              Filosofía
            </Link>
            <Link
              href="/galeria"
              className="text-foreground hover:text-coral transition-colors font-medium"
            >
              Galería
            </Link>
            <Link
              href="/contacto"
              className="text-foreground hover:text-coral transition-colors font-medium"
            >
              Contacto
            </Link>
          </div>

          {/* CTA Calculadora */}
          <div className="flex items-center gap-3">
            <Link
              href="/reserva"
              className="hidden md:inline-flex px-4 py-2 bg-coral text-white rounded-lg font-medium hover:bg-coral/90 transition-colors"
            >
              Reserva cita
            </Link>
            <Link
              href="/calculadora"
              className="px-4 py-2 bg-sky text-ink rounded-lg font-medium hover:bg-sky/90 transition-colors"
            >
              Calcula tu tarifa
            </Link>
          </div>

          {/* Menú móvil (simplificado) */}
          <button
            className="md:hidden p-2 text-foreground hover:text-coral transition-colors"
            aria-label="Menú"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menú móvil desplegable (TODO: implementar) */}
        <div className="md:hidden hidden mt-4 pt-4 border-t border-sky/20">
          <div className="flex flex-col gap-3">
            <Link
              href="/servicios"
              className="text-foreground hover:text-coral transition-colors font-medium py-2"
            >
              Servicios
            </Link>
            <Link
              href="/calculadora"
              className="text-foreground hover:text-coral transition-colors font-medium py-2"
            >
              Calculadora
            </Link>
            <Link
              href="/filosofia"
              className="text-foreground hover:text-coral transition-colors font-medium py-2"
            >
              Filosofía
            </Link>
            <Link
              href="/galeria"
              className="text-foreground hover:text-coral transition-colors font-medium py-2"
            >
              Galería
            </Link>
            <Link
              href="/contacto"
              className="text-foreground hover:text-coral transition-colors font-medium py-2"
            >
              Contacto
            </Link>
            <Link
              href="/reserva"
              className="px-4 py-2 bg-coral text-white rounded-lg font-medium hover:bg-coral/90 transition-colors text-center"
            >
              Reserva cita
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
