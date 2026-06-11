/**
 * Página Home
 *
 * Hero con posicionamiento "Peluquería canina en positivo"
 * Propuesta de valor + prueba social + CTAs
 */

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-cream overflow-hidden">
        {/* Patrón decorativo de burbujas */}
        <div className="absolute inset-0 bubble-pattern opacity-10" />

        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Titular principal */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground mb-6 leading-tight">
              Peluquería canina{" "}
              <span className="text-emphasis">en positivo</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl md:text-2xl text-ink/80 mb-8 leading-relaxed">
              Sin prisas. Sin miedo. Sin estrés.
            </p>

            {/* Propuesta de valor */}
            <p className="text-lg text-ink/70 mb-10 max-w-xl leading-relaxed">
              Aquí tu perro entra tranquilo y sale feliz. Productos veganos,
              manejo respetuoso y todo el cariño del mundo para tu peludo en el
              barrio del Realejo.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/calculadora"
                className="px-8 py-4 bg-sky text-ink rounded-lg font-semibold hover:bg-sky/90 transition-colors text-center"
              >
                Calcula tu tarifa
              </Link>
              <Link
                href="/reserva"
                className="px-8 py-4 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors text-center"
              >
                Reserva cita
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 text-sm text-ink/60">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-sage"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span>4,7★ en Google</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-sage"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Los peludos repiten</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-sage"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span>Productos veganos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Imagen decorativa (placeholder) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-20 hidden lg:block">
          <div className="relative w-full h-full">
            <Image
              src="/imgs.png"
              alt="Perro relajado"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Sección: Por qué elegirnos */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-center mb-12">
            Por qué{" "}
            <span className="text-emphasis">nos eligen</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 bg-cream rounded-lg border border-sky/20 hover:border-sky/40 transition-colors">
              <div className="w-12 h-12 bg-sky/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-sky"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Sin miedo ni estrés
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                Manejo en positivo con paciencia y cariño. Tu perro no tiene por
                qué tener miedo de la peluquería.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 bg-cream rounded-lg border border-sky/20 hover:border-sky/40 transition-colors">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-sage"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                Productos veganos
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                Shampoos y tratamientos 100% veganos y cruelty-free. Seguros para
                tu perro y para el planeta.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 bg-cream rounded-lg border border-sky/20 hover:border-sky/40 transition-colors">
              <div className="w-12 h-12 bg-coral/20 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-coral"
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
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">
                En el Realejo
              </h3>
              <p className="text-ink/70 text-sm leading-relaxed">
                C. Molinos 47, Local. Barrio histórico de Granada, cerca de la
                Alhambra y con acceso fácil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Cristina y su método */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Cristina y su{" "}
              <span className="text-emphasis">método</span>
            </h2>
            <p className="text-lg text-ink/70 leading-relaxed mb-8">
              Más de 10 años cuidando peludos en Granada. Cada perro es único,
              con su carácter, su historia y sus miedos. Mi trabajo es que cada
              visita sea una experiencia positiva, sin prisas y con muchísimo
              cariño.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-ink/60">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span>4,7/5 en Google</span>
              </div>
              <div className="flex items-center gap-2">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>+36 clientes felices</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: CTA final */}
      <section className="py-16 bg-sky/10">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
 ¿Preparado para que tu peludo disfrute?
          </h2>
          <p className="text-lg text-ink/70 mb-8 max-w-xl mx-auto">
            Calcula tu tarifa en menos de 1 minuto o reserva directamente tu
            hueco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculadora"
              className="px-8 py-4 bg-sky text-ink rounded-lg font-semibold hover:bg-sky/90 transition-colors"
            >
              Calcula tu tarifa
            </Link>
            <Link
              href="/reserva"
              className="px-8 py-4 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors"
            >
              Reserva cita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
