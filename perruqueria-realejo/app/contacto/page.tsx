/**
 * Página de Contacto
 *
 * Mapa, WhatsApp, teléfono, dirección
 */

export const metadata = {
  title: "Contacto | Perruquería Canina Realejo",
  description:
    "C. Molinos 47, Local, Granada. Contacto por WhatsApp, teléfono o email. Peluquería canina en positivo.",
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            <span className="text-emphasis">Contacto</span>
          </h1>
          <p className="text-lg text-ink/70">
            ¿Tienes alguna pregunta? ¿Quieres reservar cita? Estamos aquí para
            ayudarte.
          </p>
        </div>

        {/* Info principal */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="font-display text-2xl font-semibold mb-6 text-sky">
            Información de contacto
          </h2>

          <div className="space-y-6">
            {/* Dirección */}
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
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Dirección
                </h3>
                <p className="text-ink/70">
                  C. Molinos 47, Local
                  <br />
                  18009 Granada
                  <br />
                  <span className="text-sm text-ink/60">
                    Barrio del Realejo
                  </span>
                </p>
              </div>
            </div>

            {/* Teléfono */}
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  Teléfono
                </h3>
                <p className="text-ink/70">6XX XXX XXX</p>
                <p className="text-sm text-ink/60 mt-1">
                  L–V 10:00–17:45 (confirmar horario)
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-sage"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52.075-.149.669-1.612.916-2.049.198-.336.423-.567.597-.682.297-.198.712-.149 1.16.149.45.297 1.512.966 1.873 1.245.36.28.712.423 1.068.298.357-.149.89-.467 1.035-.645.149-.198.198-.522.198-.798 0-.297-.075-.522-.223-.67-.149-.15-.67-.89-1.254-1.653-.712-.966-1.08-1.43-1.183-1.653-.149-.297-.015-.467.149-.67.15-.15.298-.223.446-.223.149 0 .298.075.446.223.149.15.67.89 1.254 1.653.712.966 1.08 1.43 1.183 1.653.149.297.015.467-.149.67-.15.15-.298.223-.446.223-.149 0-.298-.075-.446-.223-.149-.15-.67-.89-1.254-1.653-.712-.966-1.08-1.43-1.183-1.653-.149-.297-.015-.467.149-.67.15-.15.298-.223.446-.223.149 0 .298.075.446.223.149.15.67.89 1.254 1.653.712.966 1.08 1.43 1.183 1.653.149.297.015.467-.149.67-.15.15-.298.223-.446.223-.149 0-.298-.075-.446-.223zM12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.784l1.483-1.483C4.236 23.228 6.913 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">
                  WhatsApp
                </h3>
                <a
                  href="https://wa.me/34600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky hover:text-coral transition-colors underline"
                >
                  +34 600 000 000
                </a>
                <p className="text-sm text-ink/60 mt-1">
                  Respuesta rápida en horario laboral
                </p>
              </div>
            </div>

            {/* Email */}
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg mb-2">Email</h3>
                <p className="text-ink/70">contacto@ejemplo.com</p>
                <p className="text-sm text-ink/60 mt-1">
                  Respuesta en 24h laborables
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mapa */}
        <section className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3142.123456789!2d-3.5968!3d37.1769!2m3!1f0!2f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4xxxxxx%3A0xxxxx!2sC.+Molinos%2C+47%2C+18009+Granada!5e0!3m2!1ses!2ses!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de ubicación"
            />
          </div>
        </section>

        {/* CTAs */}
        <section className="space-y-4">
          <a
            href="/reserva"
            className="block w-full px-8 py-4 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors text-center"
          >
            🗓 Reserva tu cita
          </a>

          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/calculadora"
              className="px-6 py-3 bg-sky text-ink rounded-lg font-semibold hover:bg-sky/90 transition-colors text-center"
            >
              Calcula tu tarifa
            </a>
            <a
              href="https://wa.me/34600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-sage text-ink rounded-lg font-semibold hover:bg-sage/90 transition-colors text-center"
            >
              💬 WhatsApp
            </a>
          </div>
        </section>

        {/* Nota */}
        <div className="mt-8 text-center text-sm text-ink/60">
          <p>
            ⚠️ Teléfono y WhatsApp son placeholders para esta demo. Los datos
            reales se confirmarán con la clienta.
          </p>
        </div>
      </div>
    </div>
  );
}
