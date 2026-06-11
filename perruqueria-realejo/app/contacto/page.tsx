import type { Metadata } from "next";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Dónde estamos, horario y cómo escribirnos. C. Molinos 47, Realejo, Granada.",
};

export default function ContactoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl">Contacto</h1>
      <p className="mt-3 max-w-xl text-tinta-suave">
        ¿Dudas sobre tu peludo, su manto o qué servicio le conviene? Escríbenos: respondemos
        en cuanto soltamos el secador.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-3xl bg-white p-6">
            <h2 className="text-lg">📍 Dónde estamos</h2>
            <p className="mt-2 text-sm">{SITE.direccion}</p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-full bg-cielo px-5 py-2 text-sm font-bold hover:bg-cielo/70"
            >
              Cómo llegar
            </a>
          </div>

          <div className="rounded-3xl bg-white p-6">
            <h2 className="text-lg">🕙 Horario</h2>
            <p className="mt-2 text-sm">
              {SITE.horario}
              <span className="block text-xs text-tinta-suave">
                Horario placeholder de la demo, pendiente de confirmar.
              </span>
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6">
            <h2 className="text-lg">💬 Habla con nosotros</h2>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Hola 🐾 Quería preguntaros una cosita sobre mi perro.")}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
              >
                WhatsApp
              </a>
              <a
                href="tel:+34600000000"
                className="rounded-full border-2 border-tinta/15 px-5 py-2.5 text-sm font-bold hover:border-coral hover:text-coral"
              >
                📞 {SITE.telefono} <span className="text-xs text-tinta-suave">(placeholder)</span>
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-tinta/15 px-5 py-2.5 text-sm font-bold hover:border-coral hover:text-coral"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-cielo/50 bg-white">
          <iframe
            src={SITE.mapsEmbed}
            title="Mapa: Calle Molinos 47, Granada"
            className="h-full min-h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
