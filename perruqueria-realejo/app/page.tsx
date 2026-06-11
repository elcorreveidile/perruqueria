/**
 * Página Home - Prototipo Visual
 *
 * Versión con imágenes del mockup para visualización rápida
 * CTAs funcionales para navegación
 */

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Imagen del mockup */}
      <section className="relative w-full">
        <div className="relative w-full h-auto">
          <Image
            src="/sections/hero.webp"
            alt="Peluquería Canina Realejo - Peluquería en positivo"
            width={1536}
            height={460}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* CTAs Overlay - Funcionales */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col sm:flex-row gap-4 justify-center px-4">
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
      </section>

      {/* Sección Servicios - Imagen del mockup */}
      <section className="relative w-full">
        <Image
          src="/sections/servicios.webp"
          alt="Nuestros Servicios"
          width={1536}
          height={150}
          className="w-full h-auto"
        />
      </section>

      {/* Sección Por Qué Elegirnos - Imagen del mockup */}
      <section className="relative w-full">
        <Image
          src="/sections/elegirnos.webp"
          alt="Por qué nos elegir"
          width={1536}
          height={150}
          className="w-full h-auto"
        />
      </section>

      {/* Sección Cristina y su método - Imagen del mockup */}
      <section className="relative w-full">
        <Image
          src="/sections/cristina.webp"
          alt="Cristina y su método"
          width={1536}
          height={150}
          className="w-full h-auto"
        />
      </section>

      {/* Sección Contacto + CTA Final - Imagen del mockup */}
      <section className="relative w-full">
        <Image
          src="/sections/contacto.webp"
          alt="Contacto y reserva"
          width={1536}
          height={114}
          className="w-full h-auto"
        />

        {/* CTAs Overlay - Funcionales */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col sm:flex-row gap-4 justify-center px-4">
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
      </section>
    </div>
  );
}
