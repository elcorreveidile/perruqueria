import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Galería de peludos felices",
  description: "Antes y después de nuestros peludos. Perros que entran tranquilos y salen felices.",
};

// Imágenes de stock (Unsplash) claramente marcadas como muestra.
// Al pasar a producción se sustituyen por fotos reales del Instagram
// de la clienta (310 publicaciones: su mejor activo).
const fotos = [
  { src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=700&q=70", alt: "Golden retriever cachorro" },
  { src: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=700&q=70", alt: "Perro pequeño atento" },
  { src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=700&q=70", alt: "Perro marrón sonriente" },
  { src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=700&q=70", alt: "Corgi feliz" },
  { src: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&q=70", alt: "Dos perros paseando" },
  { src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=700&q=70", alt: "Perro con sus humanos" },
  { src: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=700&q=70", alt: "Perro tumbado relajado" },
  { src: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=700&q=70", alt: "Perro durante su cuidado" },
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
          ℹ️ Todas las imágenes de esta página son de muestra (banco de imágenes). En la web
          definitiva se sustituirán por fotos reales con permiso de sus familias.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {fotos.map((f) => (
          <figure key={f.src} className="group relative overflow-hidden rounded-2xl">
            <Image
              src={f.src}
              alt={`${f.alt} (imagen de muestra)`}
              width={700}
              height={700}
              className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
            />
            <figcaption className="absolute bottom-0 w-full bg-tinta/60 px-3 py-1.5 text-center text-[11px] font-semibold text-white">
              Imagen de muestra
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
