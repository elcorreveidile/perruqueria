/**
 * Banner de Demo — Fijo inferior
 *
 * Aviso obligatorio: "Demo de propuesta — sitio no oficial"
 */

import Link from "next/link";

export default function DemoBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-coral text-white py-2 px-4">
      <div className="container-custom flex items-center justify-center gap-2 text-sm">
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-medium">
          Demo de propuesta — sitio no oficial. Desarrollado por{" "}
        </span>
        <Link
          href="https://por2duros.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:no-underline font-semibold"
        >
          Por 2 Duros
        </Link>
      </div>
    </div>
  );
}
