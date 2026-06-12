import Image from "next/image";
import Link from "next/link";
import { Burbujas } from "@/components/layout/Burbujas";
import { SITE } from "@/lib/site";

const faqs = [
  {
    q: "¿Qué significa peluquería canina «en positivo»?",
    a: "Trabajamos sin castigos, sin forzar y sin prisas: el perro marca el ritmo. Usamos premios, pausas y mucha paciencia para que la peluquería sea un buen recuerdo, no un mal trago.",
  },
  {
    q: "¿Qué productos usáis?",
    a: "Productos específicos veganos, suaves con la piel y con el planeta, adaptados a cada tipo de manto y de piel.",
  },
  {
    q: "Mi perro tiene miedo a la peluquería, ¿podéis ayudarle?",
    a: "Es nuestra especialidad. Vamos a su ritmo, con sesiones de habituación si hace falta. Muchos perros que llegaban temblando ahora entran moviendo el rabo.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del tamaño, el pelo y su estado. En la calculadora de la web tienes un rango orientativo al momento; el precio exacto te lo confirmamos al ver a tu perro.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero a sangre completa: foto a la derecha, degradado crema a la izquierda */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/img/bano-hero.jpg"
            alt="Baño tranquilo a un perro feliz (imagen ilustrativa)"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-crema via-crema/90 to-crema/5" />
        </div>
        <Burbujas />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-32">
          <div className="max-w-xl">
            <h1 className="font-display text-5xl leading-[1.05] text-ciruela md:text-6xl">
              Peluquería
              <br />
              canina en
              <br />
              <em className="text-coral">positivo</em>
            </h1>
            <p className="mt-6 text-lg font-bold text-coral">
              Sin miedo. Sin prisas. Sin estrés.
            </p>
            <p className="mt-3 max-w-xs text-sm text-tinta-suave">
              Un lugar donde tu perro se siente seguro, cuidado y feliz.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/reservas"
                className="rounded-full bg-coral px-6 py-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-coral-oscuro"
              >
                Reserva tu hueco
              </Link>
              <Link
                href="/calculadora"
                className="rounded-full border border-tinta/20 bg-white/85 px-6 py-3 text-sm font-bold text-tinta backdrop-blur transition-colors hover:border-coral hover:text-coral"
              >
                Calcula tu tarifa
              </Link>
            </div>
          </div>
        </div>
        <p className="absolute bottom-2 right-3 z-10 text-[10px] text-tinta-suave/80">
          Imagen ilustrativa
        </p>
      </section>

      {/* Franja de valores */}
      <section className="border-b border-cielo/30 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icono: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <circle cx="7" cy="8" r="2.2" /><circle cx="12" cy="6" r="2.2" /><circle cx="17" cy="8" r="2.2" />
                  <ellipse cx="12" cy="15.5" rx="4.8" ry="4" />
                </svg>
              ),
              color: "bg-coral/15 text-coral",
              titulo: "Manejo en positivo",
              texto: "Refuerzo amable y respeto en cada baño.",
            },
            {
              icono: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" d="M5 19C5 11 11 5 19 5c0 8-6 14-14 14zM5 19c3-3 6-5 9-6" />
                </svg>
              ),
              color: "bg-salvia-claro text-[#6f8a6c]",
              titulo: "Productos veganos",
              texto: "Respetuosos con su piel, con los animales y el planeta.",
            },
            {
              icono: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                  <circle cx="9" cy="8" r="3.2" />
                  <path strokeLinecap="round" d="M3.5 19.5c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5M16.5 11.5c1.8 0 3.5 1.4 4 4.5" />
                  <circle cx="17.5" cy="7.5" r="2.2" />
                </svg>
              ),
              color: "bg-cielo/40 text-[#4e7d9b]",
              titulo: "Atención individual",
              texto: "Cada perro es único. Cada sesión también.",
            },
            {
              icono: (
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 20.5l-7.2-7A4.6 4.6 0 0 1 11 6.7l1 1 1-1a4.6 4.6 0 0 1 6.2 6.8z" />
                </svg>
              ),
              color: "bg-coral/15 text-coral",
              titulo: "Bienestar animal",
              texto: "Menos estrés. Más confianza.",
            },
          ].map((v) => (
            <div key={v.titulo} className="flex items-start gap-3">
              <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${v.color}`}>
                {v.icono}
              </span>
              <div>
                <h2 className="text-base font-bold text-tinta">{v.titulo}</h2>
                <p className="mt-1 text-sm text-tinta-suave">{v.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Prueba social */}
      <section className="bg-cielo-claro/60">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <p className="font-display text-3xl">⭐ 4,7 en Google</p>
          <p className="mt-3 text-lg text-tinta-suave">
            Los peludos repiten. Y los que llegaban con miedo… también: salen moviendo el
            rabo, que es la mejor reseña posible.
          </p>
        </div>
      </section>

      {/* El método */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative order-2 md:order-1">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/img/cepillado.jpg"
                alt="Cepillado tranquilo de un perro en la mesa de trabajo (imagen ilustrativa)"
                width={900}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-right text-xs text-tinta-suave">Imagen ilustrativa</p>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl">Un método con alma</h2>
            <p className="mt-4 text-tinta-suave">
              Aquí no se «procesan» perros: se les escucha. Antes de coger una tijera,
              observamos cómo está el perro ese día. Si necesita una pausa, se le da. Si algo
              le asusta, se trabaja poquito a poco.
            </p>
            <ul className="lista-huellas mt-6 space-y-3 text-sm">
              <li>El perro marca el ritmo de la sesión, no el reloj.</li>
              <li>Premios, pausas y voz tranquila: nada de sujetar a la fuerza.</li>
              <li>Sesiones de habituación para cachorros y perros con miedo.</li>
              <li>Honestidad: si algo no le conviene a tu perro, te lo decimos.</li>
            </ul>
            <Link href="/filosofia" className="mt-6 inline-block font-bold text-coral hover:underline">
              Conoce nuestra filosofía en positivo →
            </Link>
          </div>
        </div>
      </section>

      {/* Te avisamos cuando le toque */}
      <section className="bg-salvia-claro/70">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="text-2xl">Te avisamos cuando le toque 🐾</h2>
          <p className="mt-3 text-tinta-suave">
            Al reservar online, te recordamos la cita el día antes y te avisamos cuando a tu
            perro le vuelva a tocar sesión, con un enlace para reservar en un clic. Tú no
            tienes que estar pendiente de nada.
          </p>
        </div>
      </section>

      {/* El tablón de la puerta */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl border-2 border-dashed border-cielo bg-white p-8 text-center">
          <p className="text-3xl" aria-hidden="true">📌</p>
          <h2 className="mt-2 text-2xl">El tablón de la puerta</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-tinta-suave">
            Nuestra puerta es también el tablón del barrio: carteles de perros perdidos,
            adopciones y avisos vecinales siempre tienen su hueco. Si se te ha perdido tu
            peludo o quieres dar difusión a uno que busca casa, tráenos el cartel — lo
            colgamos con mucho gusto. El Realejo cuida de sus perros, y nosotros también.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="text-center text-3xl">Preguntas frecuentes</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-cielo/50 bg-white p-5">
              <summary className="cursor-pointer font-bold marker:text-coral">{f.q}</summary>
              <p className="mt-3 text-sm text-tinta-suave">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Mapa */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="overflow-hidden rounded-3xl border border-cielo/50 bg-white">
          <iframe
            src={SITE.mapsEmbed}
            title="Mapa: Calle Molinos 47, Granada"
            className="h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <p className="text-sm">
              <strong>{SITE.direccion}</strong>
              <br />
              <span className="text-tinta-suave">{SITE.horario}</span>
            </p>
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-cielo px-5 py-2.5 text-sm font-bold text-tinta hover:bg-cielo/70"
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
