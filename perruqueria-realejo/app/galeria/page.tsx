/**
 * Página de Galería
 *
 * Antes/después (placeholder para fotos reales del cliente)
 */

export const metadata = {
  title: "Galería | Perruquería Canina Realejo",
  description:
    "Antes y después de nuestros servicios. Próximamente con fotos reales de nuestros peludos felices.",
};

export default function GaleríaPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Galería de{" "}
            <span className="text-emphasis">transformaciones</span>
          </h1>
          <p className="text-lg text-ink/70 max-w-2xl mx-auto">
            Próximamente mostraremos fotos reales de antes y después de nuestros
            servicios. Mientras tanto, puedes ver nuestros resultados en{" "}
            <a
              href="https://www.instagram.com/perruqueriacaninarealejo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky hover:text-coral transition-colors underline"
            >
              nuestro Instagram
            </a>
            .
          </p>
        </div>

        {/* Placeholder avisando que son imágenes de muestra */}
        <div className="bg-sky/10 border border-sky/30 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-sky flex-shrink-0 mt-0.5"
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
            <div>
              <p className="font-medium text-ink mb-1">Imagen de muestra</p>
              <p className="text-sm text-ink/70">
                Esta es una página de demostración. Las fotografías reales de antes
                y después se añadirán cuando la clienta apruebe el diseño. Por
                ahora puedes ver nuestros resultados en nuestro perfil de Instagram
                con más de 300 publicaciones.
              </p>
            </div>
          </div>
        </div>

        {/* Grid de placeholders (dividido por categorías) */}
        <div className="space-y-12">
          {/* Baño completo */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-sky">
              🛁 Baño completo
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlaceholderCard
                tipo="Baño + secado"
                descripcion="Ejemplo: Labrador con pelo sucio y enredado"
              />
              <PlaceholderCard
                tipo="Baño + secado"
                descripcion="Ejemplo: Golden Retriever tras una vuelta al campo"
              />
              <PlaceholderCard
                tipo="Baño + secado"
                descripcion="Ejemplo: Perro mix con pelo muy enredado"
              />
            </div>
          </section>

          {/* Corte y estilismo */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-sky">
              ✂️ Corte y estilismo
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlaceholderCard
                tipo="Corte mantenimiento"
                descripcion="Ejemplo: Caniche antes y después del corte"
              />
              <PlaceholderCard
                tipo="Corte comercial"
                descripcion="Ejemplo: Bichón con corte práctico"
              />
              <PlaceholderCard
                tipo="Arreglo por raza"
                descripcion="Ejemplo: Westie con patrón de raza"
              />
            </div>
          </section>

          {/* Pelo especial */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-sky">
              🐕 Pelo especial
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PlaceholderCard
                tipo="Deslanado"
                descripcion="Ejemplo: Husky antes y después del deslanado"
              />
              <PlaceholderCard
                tipo="Stripping"
                descripcion="Ejemplo: Terrier con stripping profesional"
              />
              <PlaceholderCard
                tipo="Desenredado"
                descripcion="Ejemplo: Cocker antes y después del desenredado"
              />
            </div>
          </section>

          {/* Cachorros */}
          <section>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6 text-sky">
              🐾 Cachorros
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <PlaceholderCard
                tipo="Primera visita"
                descripcion="Ejemplo: Cachorro de 3 meses en su primera experiencia"
              />
              <PlaceholderCard
                tipo="Habituación"
                descripcion="Ejemplo: Cachorro aprendiendo a disfrutar de la peluquería"
              />
            </div>
          </section>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-sage/10 rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="font-display text-2xl font-semibold mb-4">
              ¿Quieres que tu peludo luzca así de bien?
            </h2>
            <p className="text-ink/70 mb-6">
              Agenda una cita y verás la diferencia. Cada peludo es único, y
              nosotros tratamos a cada uno como si fuera de la familia.
            </p>
            <a
              href="/reserva"
              className="inline-flex px-8 py-4 bg-coral text-white rounded-lg font-semibold hover:bg-coral/90 transition-colors"
            >
              Reserva tu cita
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente placeholder para cada tarjeta
function PlaceholderCard({
  tipo,
  descripcion,
}: {
  tipo: string;
  descripcion: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-square bg-gradient-to-br from-sky/20 to-sage/20 flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-sky/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm text-ink/60 mt-2">Imagen de muestra</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg mb-2">{tipo}</h3>
        <p className="text-sm text-ink/60">{descripcion}</p>
      </div>
    </div>
  );
}
