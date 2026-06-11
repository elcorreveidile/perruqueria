/**
 * Footer Principal
 *
 * Información de contacto, enlaces legales, marca
 */

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Marca */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/favicon.png"
                  alt="Huella de burbujas"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="font-display font-semibold text-lg">
                  Perruquería Canina Realejo
                </div>
                <div className="text-sm text-sky">Peluquería en positivo</div>
              </div>
            </div>
            <p className="text-sm text-cream/80 max-w-xs">
              Sin prisas. Sin miedo. Sin estrés. Todo el cariño del mundo para tu
              peludo.
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sky">Contacto</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>C. Molinos 47, Local</span>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>6XX XXX XXX</span>
              </p>
              <p className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>L–V 10:00–17:45 (confirmar)</span>
              </p>
            </div>
          </div>

          {/* Columna 3: Enlaces */}
          <div className="space-y-3">
            <h3 className="font-display font-semibold text-sky">Información</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/servicios"
                className="hover:text-sky transition-colors"
              >
                Servicios
              </Link>
              <Link
                href="/filosofia"
                className="hover:text-sky transition-colors"
              >
                Nuestra filosofía
              </Link>
              <Link href="/galeria" className="hover:text-sky transition-colors">
                Galería
              </Link>
              <Link href="/contacto" className="hover:text-sky transition-colors">
                Contacto
              </Link>
              <Link
                href="/legal/aviso-legal"
                className="hover:text-sky transition-colors"
              >
                Aviso legal
              </Link>
              <Link
                href="/legal/privacidad"
                className="hover:text-sky transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="/legal/cookies"
                className="hover:text-sky transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-cream/60">
          <p>© 2024 Perruquería Canina Realejo. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            Desarrollado con{" "}
            <svg
              className="w-4 h-4 text-coral"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            por{" "}
            <Link
              href="https://por2duros.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky transition-colors"
            >
              Por 2 Duros
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
