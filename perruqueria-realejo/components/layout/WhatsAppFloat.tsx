"use client";

import { usePathname } from "next/navigation";
import { whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={whatsappLink("Hola 🐾 Os escribo desde la web. Quería preguntar por una cita para mi perro.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-12 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M17.5 14.4l-2.2-1c-.3-.1-.5-.1-.7.1l-1 1.2c-.2.2-.4.2-.6.1-.8-.4-2.7-1.5-3.8-3.6-.1-.2-.1-.4.1-.6l.9-1.1c.2-.2.2-.5.1-.7l-1-2.3c-.2-.4-.5-.5-.9-.4-1 .4-2 1.4-2 2.7 0 .6.1 1.3.5 2.1 1 2.2 3 4.6 5.9 5.9 1.1.5 1.9.7 2.6.6 1.1-.1 2.2-.9 2.6-1.9.1-.5 0-.9-.5-1.1zM12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 6L0 24l6.2-1.6c1.8 1 3.8 1.5 5.8 1.5 6.6 0 12-5.4 12-12S18.6 0 12 0zm0 21.8c-1.8 0-3.6-.5-5.2-1.4l-.4-.2-3.7 1 1-3.6-.2-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 9.8-10 9.8z" />
      </svg>
    </a>
  );
}
