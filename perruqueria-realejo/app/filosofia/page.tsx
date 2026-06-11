/**
 * Página de Filosofía
 *
 * "Peluquería canina en positivo" — Alma de la marca
 */

export const metadata = {
  title: "Filosofía | Perruquería Canina Realejo",
  description:
    "Manejo sin miedo ni estrés. Productos veganos. Peluquería canina en positivo en Granada.",
};

export default function FilosofiaPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Peluquería canina{" "}
            <span className="text-emphasis">en positivo</span>
          </h1>
          <p className="text-lg text-ink/70">
            No vendemos baños, cortes ni uñas. Vendemos que tu perro entre
            tranquilo y salga feliz.
          </p>
        </div>

        {/* Sección principal */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-sky">
            ¿Qué significa "en positivo"?
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-ink/80 leading-relaxed mb-4">
              La mayoría de las peluquerías caninas se enfocan en el resultado:
              el perro sale bonito, limpio y con buen olor. Eso está bien, pero
              no es suficiente.
            </p>

            <p className="text-ink/80 leading-relaxed mb-4">
              Para nosotros, <strong>lo más importante es la experiencia del
              perro</strong>. Un perro que tiene miedo de la peluquería es un
              perro que sufre cada vez que viene. Y eso no es aceptable.
            </p>

            <p className="text-ink/80 leading-relaxed">
              "En positivo" significa que trabajamos para que cada visita sea una
              experiencia agradable, sin miedos, sin estrés y con muchísimo
              cariño. El resultado estético viene consecuencia de ese proceso.
            </p>
          </div>
        </section>

        {/* 3 pilares */}
        <section className="space-y-6 mb-12">
          {/* Pilar 1 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky/20 rounded-full flex items-center justify-center flex-shrink-0">
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
              <div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  Sin miedo ni estrés
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  Usamos técnicas de refuerzo positivo y muchísima paciencia.
                  Acostumbramos al perro al sonido del secador, a que le toquen las
                  patas, a que le limpien las orejas. Nunca forzamos. Si un perro
                  necesita un descanso, paramos. Si un perro no puede terminar una
                  sesión en un día, volvemos al día siguiente. El bienestar del perro
                  está por encima de todo.
                </p>
              </div>
            </div>
          </div>

          {/* Pilar 2 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
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
              <div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  Productos veganos
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  Todos los shampoos, acondicionadores y tratamientos que usamos
                  son <strong>100% veganos y cruelty-free</strong>. No contienen
                  ingredientes de origen animal ni han sido testados en animales.
                  Son seguros para perros con piel sensible, alergias o condiciones
                  dermatológicas. Y funcionan de verdad.
                </p>
              </div>
            </div>
          </div>

          {/* Pilar 3 */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-coral/20 rounded-full flex items-center justify-center flex-shrink-0">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  Sin prisas
                </h3>
                <p className="text-ink/70 leading-relaxed">
                  Cada perro es único. Algunos se relajan rápido, otros necesitan más
                  tiempo. Nosotros no tenemos prisa. Si un perro pequeño necesita 30
                  minutos, le dedicamos 30 minutos. Si un perro grande necesita 2
                  horas, le dedicamos 2 horas. La calidad está por encima de la
                  cantidad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Para perros con miedo */}
        <section className="bg-sage/10 rounded-lg p-8 mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            ¿Tu perro tiene miedo de la peluquería?
          </h2>
          <p className="text-ink/80 leading-relaxed mb-6">
            Es más común de lo que piensas. Muchos perros han tenido malas
            experiencias: ruidos fuertes, manos bruscas, mucho tiempo sin ver a
            sus dueños. Eso genera trauma. Y el trauma se cura con paciencia, no
            con fuerza.
          </p>
          <p className="text-ink/80 leading-relaxed mb-6">
            Si tu perro tiene miedo, <strong>háblanos</strong>. Podemos hacer una
            primera visita de habituación muy corta (10-15 minutos) solo para que
            conozca el lugar, que le demos premios, que vea que no pasa nada malo.
            Poco a poco, va perdiendo el miedo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/reserva"
              className="px-6 py-3 bg-sage text-ink rounded-lg font-semibold hover:bg-sage/90 transition-colors text-center"
            >
              Agenda una visita de habituación
            </a>
            <a
              href="/contacto"
              className="px-6 py-3 bg-ink text-white rounded-lg font-semibold hover:bg-ink/90 transition-colors text-center"
            >
              Háblanos de tu caso
            </a>
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold mb-4">
            ¿Te gustaría que tu perro disfrutara de la peluquería?
          </h2>
          <p className="text-ink/70 mb-8">
            Agenda una cita y verás la diferencia. No es magia, es cariño y
            paciencia.
          </p>
          <a
            href="/reserva"
            className="inline-flex px-8 py-4 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors"
          >
            Reserva tu cita
          </a>
        </section>
      </div>
    </div>
  );
}
