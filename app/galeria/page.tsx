import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galería de peludos felices",
  description: "Antes y después de nuestros peludos. Perros que entran tranquilos y salen felices.",
};

// Imágenes ilustrativas del set de marca, marcadas como tales.
// Al pasar a producción se sustituyen por fotos reales del Instagram
// del negocio (310 publicaciones: su mejor activo).
const fotos = [
  { src: "/img/perro-toalla.jpg", alt: "Perro feliz recién bañado con su toalla" },
  { src: "/img/bano.jpg", alt: "Baño con espuma y mucha calma" },
  { src: "/img/corte.jpg", alt: "Corte a tijera con paciencia" },
  { src: "/img/cepillado.jpg", alt: "Cepillado tranquilo en la mesa" },
  { src: "/img/unas.jpg", alt: "Corte de uñas sin estrés" },
  { src: "/img/dermatologico.jpg", alt: "Cuidado de piel sensible" },
  { src: "/img/filosofia.jpg", alt: "Caricia tranquila: manejo en positivo" },
  { src: "/img/perros-tamanos.jpg", alt: "Peludos de todos los tamaños" },
];

export default function GaleriaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-4xl">Perros felices 🐾</h1>
        <p className="mt-3 text-tinta-suave">
          El antes y el después importa, pero lo que más nos gusta enseñar es la cara con la
          que salen. Esta galería está preparada para llenarse con fotos reales de nuestros
          peludos.
        </p>
        <p className="mt-3 rounded-xl bg-cielo-claro px-4 py-2 text-xs font-semibold text-tinta-suave">
          ℹ️ Todas las imágenes de esta página son ilustrativas, creadas para la propuesta.
          En la web definitiva se sustituirán por fotos reales con permiso de sus familias.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {fotos.map((f) => (
          <figure key={f.src} className="group relative overflow-hidden rounded-2xl">
            <Image
              src={f.src}
              alt={`${f.alt} (imagen ilustrativa)`}
              width={700}
              height={700}
              className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
            />
            <figcaption className="absolute bottom-0 w-full bg-tinta/60 px-3 py-1.5 text-center text-[11px] font-semibold text-white">
              Imagen ilustrativa
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
