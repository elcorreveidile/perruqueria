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
    a: "Depende del tamaño, el pelo y su estado. En la calculadora de la web tienes un rango orientativo al momento; el precio exacto te lo confirma Cristina al ver a tu perro.",
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Burbujas />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 inline-block rounded-full bg-salvia-claro px-4 py-1 text-sm font-bold text-tinta">
              🌱 Productos veganos · Barrio del Realejo
            </p>
            <h1 className="text-4xl leading-tight md:text-5xl">
              Peluquería canina <em className="text-coral">en positivo</em>
            </h1>
            <p className="mt-4 text-xl font-semibold text-tinta-suave">
              Sin prisas. Sin miedo. Sin estrés.
            </p>
            <p className="mt-4 max-w-md text-tinta-suave">
              Aquí tu perro entra tranquilo y sale feliz. Lo demás —el baño, el corte, las
              uñas— es solo la excusa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/calculadora"
                className="rounded-full bg-coral px-7 py-3.5 font-bold text-white shadow-md transition-colors hover:bg-coral-oscuro"
              >
                Calcula tu tarifa
              </Link>
              <Link
                href="/reservas"
                className="rounded-full border-2 border-tinta/20 bg-white px-7 py-3.5 font-bold text-tinta transition-colors hover:border-coral hover:text-coral"
              >
                Reserva cita
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=900&q=75"
                alt="Perro relajado durante una sesión de cuidado tranquila (imagen de muestra)"
                width={900}
                height={650}
                priority
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-right text-xs text-tinta-suave">Imagen de muestra</p>
          </div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 sm:grid-cols-3">
          {[
            {
              icono: "🤍",
              titulo: "En positivo, de verdad",
              texto:
                "Manejo sin miedo ni estrés, con psicología y todo el cariño del mundo. El bienestar de tu perro va por delante del acabado.",
            },
            {
              icono: "🌱",
              titulo: "Productos veganos",
              texto:
                "Champús y tratamientos específicos veganos, suaves con su piel y elegidos para cada tipo de manto.",
            },
            {
              icono: "📍",
              titulo: "En el corazón del Realejo",
              texto:
                "Un local pequeño y tranquilo en la calle Molinos, donde cada perro recibe atención de tú a tú.",
            },
          ].map((v) => (
            <div key={v.titulo} className="rounded-3xl bg-crema p-7">
              <p className="text-3xl" aria-hidden="true">{v.icono}</p>
              <h2 className="mt-3 text-xl">{v.titulo}</h2>
              <p className="mt-2 text-sm text-tinta-suave">{v.texto}</p>
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

      {/* Cristina y su método */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="relative order-2 md:order-1">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900&q=75"
                alt="Manos cuidando a un perro con suavidad (imagen de muestra)"
                width={900}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-2 text-right text-xs text-tinta-suave">Imagen de muestra</p>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl">Cristina y su método</h2>
            <p className="mt-4 text-tinta-suave">
              Cristina no «procesa» perros: los escucha. Antes de coger una tijera, observa
              cómo está el perro ese día. Si necesita una pausa, se le da. Si algo le asusta,
              se trabaja poquito a poco.
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
