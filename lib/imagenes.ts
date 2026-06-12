// Imágenes ilustrativas del set de marca (generadas para la propuesta).
import type { Tamano } from "./types";

export const IMG = {
  hero: "/img/bano-hero.jpg",
  bano: "/img/bano.jpg",
  corte: "/img/corte.jpg",
  unas: "/img/unas.jpg",
  dermatologico: "/img/dermatologico.jpg",
  cepillado: "/img/cepillado.jpg",
  filosofia: "/img/filosofia.jpg",
  perroToalla: "/img/perro-toalla.jpg",
  perrosTamanos: "/img/perros-tamanos.jpg",
};

export const IMG_TAMANOS: Record<Tamano, string> = {
  mini: "/img/tamano-mini.jpg",
  pequeno: "/img/tamano-pequeno.jpg",
  mediano: "/img/tamano-mediano.jpg",
  grande: "/img/tamano-grande.jpg",
  gigante: "/img/tamano-gigante.jpg",
};

const POR_SLUG: Record<string, string> = {
  "bano-completo": IMG.bano,
  "bano-terapeutico": IMG.bano,
  "bano-y-corte": IMG.corte,
  "arreglo-por-patron-de-raza": IMG.corte,
  "corte-de-mantenimiento": IMG.corte,
  "corte-de-unas": IMG.unas,
  "limpieza-de-oidos": IMG.unas,
  "vaciado-de-glandulas": IMG.unas,
  "tratamiento-dermatologico": IMG.dermatologico,
  deslanado: IMG.cepillado,
  desenredado: IMG.cepillado,
  stripping: IMG.cepillado,
  "primera-visita-cachorro": IMG.perroToalla,
};

export function imagenDeServicio(slug: string): string {
  return POR_SLUG[slug] ?? IMG.bano;
}
