import type { AvailabilityRule, PriceRow, Service, Tamano, TipoPelo } from "./types";

// Datos de demostración: se usan como fallback cuando Supabase no está
// configurado y son la fuente de la semilla SQL (supabase/seed.sql).
// Todos los precios son rangos ORIENTATIVOS de mercado en Granada capital.

type SeedService = Omit<Service, "id"> & { id: string };

export const SEED_SERVICES: SeedService[] = [
  // ── Baño e higiene ──────────────────────────────────────────────
  {
    id: "s-bano-completo",
    slug: "bano-completo",
    nombre: "Baño completo + secado",
    categoria: "bano_higiene",
    descripcion_corta: "Baño tranquilo con champú vegano, secado suave y cepillado.",
    descripcion_larga:
      "Un baño sin prisas, con agua templada y productos veganos adaptados a su piel. Secamos a baja potencia y con pausas para que tu perro esté cómodo en todo momento, y terminamos con un buen cepillado.",
    para_quien: "Para cualquier peludo que necesite ponerse al día con la higiene.",
    incluye: ["Champú y acondicionador veganos", "Secado respetuoso", "Cepillado completo", "Colonia suave (opcional)"],
    duracion_min: 45,
    duracion_max: 90,
    recurrencia_semanas: 4,
    en_calculadora: true,
    visible: true,
    orden: 1,
  },
  {
    id: "s-corte-unas",
    slug: "corte-de-unas",
    nombre: "Corte de uñas",
    categoria: "bano_higiene",
    descripcion_corta: "Uñas a su medida, sin sustos y con mucha calma.",
    descripcion_larga:
      "Cortamos las uñas poco a poco, premiando y sin forzar. Si a tu perro le impone, lo trabajamos con paciencia: mejor dos visitas tranquilas que una mala experiencia.",
    para_quien: "Para todos, especialmente perros urbanos que desgastan poco la uña.",
    incluye: ["Corte y limado", "Revisión de almohadillas", "Premios y pausas"],
    duracion_min: 10,
    duracion_max: 20,
    recurrencia_semanas: 4,
    en_calculadora: true,
    visible: true,
    orden: 2,
  },
  {
    id: "s-limpieza-oidos",
    slug: "limpieza-de-oidos",
    nombre: "Limpieza de oídos",
    categoria: "bano_higiene",
    descripcion_corta: "Higiene del oído con productos suaves y manejo en positivo.",
    descripcion_larga:
      "Limpiamos el oído externo con productos específicos y mucha suavidad. Si vemos algo que no nos cuadra, te lo decimos para que lo valore tu veterinario.",
    para_quien: "Ideal para orejas caídas (cocker, beagle…) y perros que se rascan.",
    incluye: ["Limpieza externa", "Producto específico suave", "Revisión visual"],
    duracion_min: 10,
    duracion_max: 15,
    recurrencia_semanas: 4,
    en_calculadora: false,
    visible: true,
    orden: 3,
  },
  {
    id: "s-glandulas",
    slug: "vaciado-de-glandulas",
    nombre: "Vaciado de glándulas",
    categoria: "bano_higiene",
    descripcion_corta: "Revisión y vaciado cuando de verdad hace falta.",
    descripcion_larga:
      "Revisamos y vaciamos las glándulas anales solo si es necesario: hacerlo sin necesidad puede ser contraproducente. Siempre con delicadeza y sin estrés.",
    para_quien: "Para perros que arrastran el culete o se lamen mucho la zona.",
    incluye: ["Revisión previa", "Vaciado suave si procede", "Higiene de la zona"],
    duracion_min: 10,
    duracion_max: 15,
    recurrencia_semanas: 8,
    en_calculadora: false,
    visible: true,
    orden: 4,
  },
  // ── Corte y estilismo ───────────────────────────────────────────
  {
    id: "s-bano-corte",
    slug: "bano-y-corte",
    nombre: "Baño + corte",
    categoria: "corte_estilismo",
    descripcion_corta: "El pack completo: baño, secado y corte a tu gusto.",
    descripcion_larga:
      "Baño con productos veganos y corte adaptado a tu perro y a vuestra rutina: más cortito para verano, con su flequillo, como más os guste. Todo a su ritmo, con descansos si los necesita.",
    para_quien: "El servicio estrella para la mayoría de peludos cada 6–8 semanas.",
    incluye: ["Baño completo vegano", "Corte personalizado", "Uñas y oídos incluidos", "Cepillado final"],
    duracion_min: 90,
    duracion_max: 180,
    recurrencia_semanas: 7,
    en_calculadora: true,
    visible: true,
    orden: 5,
  },
  {
    id: "s-arreglo-raza",
    slug: "arreglo-por-patron-de-raza",
    nombre: "Arreglo por patrón de raza",
    categoria: "corte_estilismo",
    descripcion_corta: "El corte clásico de su raza, respetando siempre su bienestar.",
    descripcion_larga:
      "Arreglo siguiendo el patrón de la raza (caniche, schnauzer, cocker…), adaptado a la vida real de tu perro. La estética importa, pero su comodidad va primero.",
    para_quien: "Para razas con corte tradicional definido.",
    incluye: ["Baño previo", "Corte según patrón", "Acabado a tijera", "Uñas y oídos"],
    duracion_min: 120,
    duracion_max: 210,
    recurrencia_semanas: 7,
    en_calculadora: false,
    visible: true,
    orden: 6,
  },
  {
    id: "s-corte-mantenimiento",
    slug: "corte-de-mantenimiento",
    nombre: "Corte comercial / de mantenimiento",
    categoria: "corte_estilismo",
    descripcion_corta: "Corte práctico y cómodo para el día a día.",
    descripcion_larga:
      "Un corte sencillo y funcional que mantiene a tu perro fresquito y fácil de cepillar entre visitas. Perfecto para alargar el efecto del arreglo completo.",
    para_quien: "Para quienes prefieren comodidad y poco mantenimiento en casa.",
    incluye: ["Repaso general a máquina y tijera", "Higiene de zonas delicadas", "Cepillado"],
    duracion_min: 60,
    duracion_max: 120,
    recurrencia_semanas: 6,
    en_calculadora: false,
    visible: true,
    orden: 7,
  },
  // ── Pelo especial ───────────────────────────────────────────────
  {
    id: "s-deslanado",
    slug: "deslanado",
    nombre: "Deslanado",
    categoria: "pelo_especial",
    descripcion_corta: "Adiós al subpelo muerto: menos pelo en casa y piel que respira.",
    descripcion_larga:
      "Retiramos el subpelo muerto con técnica y herramientas específicas, sin rapar (en doble manto, rapar es mala idea). Tu perro queda más ligero, con la piel oxigenada, y tu sofá lo agradece.",
    para_quien: "Imprescindible en nórdicos, pastores y razas con doble manto en época de muda.",
    incluye: ["Baño con producto específico", "Deslanado completo", "Secado con soplador a baja potencia", "Cepillado profundo"],
    duracion_min: 90,
    duracion_max: 180,
    recurrencia_semanas: 10,
    en_calculadora: true,
    visible: true,
    orden: 8,
  },
  {
    id: "s-desenredado",
    slug: "desenredado",
    nombre: "Desenredado",
    categoria: "pelo_especial",
    descripcion_corta: "Recuperamos el manto nudo a nudo, sin tirones ni malos ratos.",
    descripcion_larga:
      "Cuando el pelo se ha enredado, vamos nudo a nudo con paciencia y productos desenredantes. Si el manto está demasiado castigado, te proponemos la opción más respetuosa para tu perro, aunque implique cortar más.",
    para_quien: "Para mantos largos o rizados que se han descontrolado.",
    incluye: ["Valoración honesta del manto", "Desenredado progresivo", "Producto acondicionador vegano"],
    duracion_min: 30,
    duracion_max: 90,
    recurrencia_semanas: 6,
    en_calculadora: false,
    visible: true,
    orden: 9,
  },
  {
    id: "s-stripping",
    slug: "stripping",
    nombre: "Stripping / trimming",
    categoria: "pelo_especial",
    descripcion_corta: "Técnica manual para mantos duros, hecha con mimo.",
    descripcion_larga:
      "Retiramos el pelo muerto a mano, como pide el manto duro de algunas razas. Es un trabajo lento y artesanal que mantiene la textura y el color del pelo, repartido en sesiones si tu perro lo prefiere.",
    para_quien: "Para schnauzers, terriers y otras razas de manto duro.",
    incluye: ["Stripping manual por zonas", "Higiene básica", "Plan de mantenimiento del manto"],
    duracion_min: 90,
    duracion_max: 180,
    recurrencia_semanas: 10,
    en_calculadora: false,
    visible: true,
    orden: 10,
  },
  // ── Piel sensible ───────────────────────────────────────────────
  {
    id: "s-dermatologico",
    slug: "tratamiento-dermatologico",
    nombre: "Tratamiento dermatológico",
    categoria: "piel_sensible",
    descripcion_corta: "Baños de tratamiento para pieles que necesitan un extra de cuidado.",
    descripcion_larga:
      "Para pieles atópicas, con dermatitis o picores: baños con productos veganos específicos, tiempos de actuación respetados y secado extra suave. Trabajamos de la mano de la pauta de tu veterinario.",
    para_quien: "Para perros con piel sensible, alergias o tratamiento veterinario activo.",
    incluye: ["Champú dermatológico vegano", "Tiempos de actuación completos", "Secado a baja temperatura", "Seguimiento entre sesiones"],
    duracion_min: 60,
    duracion_max: 105,
    recurrencia_semanas: 3,
    en_calculadora: true,
    visible: true,
    orden: 11,
  },
  {
    id: "s-bano-terapeutico",
    slug: "bano-terapeutico",
    nombre: "Baño terapéutico calmante",
    categoria: "piel_sensible",
    descripcion_corta: "Avena, aloe y mucha calma para pieles irritadas.",
    descripcion_larga:
      "Un baño pensado para calmar: productos veganos con avena y aloe, agua templada, masaje suave y cero prisas. Ideal como mantenimiento entre tratamientos o para pieles que se irritan con facilidad.",
    para_quien: "Para pieles delicadas y perros mayores.",
    incluye: ["Champú calmante vegano", "Masaje durante el baño", "Secado respetuoso"],
    duracion_min: 50,
    duracion_max: 90,
    recurrencia_semanas: 4,
    en_calculadora: false,
    visible: true,
    orden: 12,
  },
  // ── Cachorros ───────────────────────────────────────────────────
  {
    id: "s-cachorro",
    slug: "primera-visita-cachorro",
    nombre: "Primera visita de cachorro",
    categoria: "cachorros",
    descripcion_corta: "Su primera peluquería, convertida en un buen recuerdo.",
    descripcion_larga:
      "Una sesión corta de habituación en positivo: conocer el espacio, los sonidos, el agua y el secador con juegos y premios. El objetivo no es que salga perfecto, sino que quiera volver. Esta visita marca su relación con la peluquería para toda la vida.",
    para_quien: "Para cachorros de 2 a 6 meses con la pauta de vacunación al día.",
    incluye: ["Habituación a sonidos y manejo", "Baño suave si está preparado", "Muchos premios", "Consejos de cepillado en casa"],
    duracion_min: 30,
    duracion_max: 60,
    recurrencia_semanas: 4,
    en_calculadora: false,
    visible: true,
    orden: 13,
  },
];

// Matriz de precios orientativos (Granada capital).
// tipo_pelo null = se aplica a cualquier pelo salvo fila más específica.
type SeedPrice = Omit<PriceRow, "id" | "service_id"> & { service: string };

function p(
  service: string,
  tamano: Tamano,
  precio_min: number,
  precio_max: number,
  tipo_pelo: TipoPelo | null = null,
  recargo_nudos_pct = 20
): SeedPrice {
  return { service, tamano, tipo_pelo, recargo_nudos_pct, precio_min, precio_max, es_precio_real: false };
}

export const SEED_PRICES: SeedPrice[] = [
  // Baño completo
  p("s-bano-completo", "mini", 14, 20),
  p("s-bano-completo", "pequeno", 15, 25),
  p("s-bano-completo", "mediano", 20, 35),
  p("s-bano-completo", "grande", 30, 50),
  p("s-bano-completo", "gigante", 40, 60),
  p("s-bano-completo", "mediano", 25, 40, "doble_manto"),
  p("s-bano-completo", "grande", 35, 55, "doble_manto"),
  p("s-bano-completo", "gigante", 45, 70, "doble_manto"),
  // Baño + corte
  p("s-bano-corte", "mini", 22, 35),
  p("s-bano-corte", "pequeno", 25, 40),
  p("s-bano-corte", "mediano", 35, 55),
  p("s-bano-corte", "grande", 50, 80),
  p("s-bano-corte", "gigante", 60, 95),
  p("s-bano-corte", "pequeno", 30, 45, "rizado"),
  p("s-bano-corte", "mediano", 40, 60, "rizado"),
  // Arreglo por patrón de raza
  p("s-arreglo-raza", "mini", 28, 40),
  p("s-arreglo-raza", "pequeno", 30, 48),
  p("s-arreglo-raza", "mediano", 40, 62),
  p("s-arreglo-raza", "grande", 55, 85),
  p("s-arreglo-raza", "gigante", 65, 100),
  // Corte de mantenimiento
  p("s-corte-mantenimiento", "mini", 18, 28),
  p("s-corte-mantenimiento", "pequeno", 20, 32),
  p("s-corte-mantenimiento", "mediano", 28, 45),
  p("s-corte-mantenimiento", "grande", 40, 65),
  p("s-corte-mantenimiento", "gigante", 50, 75),
  // Deslanado (baño pequeño/mediano/grande + 10–20 €)
  p("s-deslanado", "pequeno", 25, 40),
  p("s-deslanado", "mediano", 30, 50),
  p("s-deslanado", "grande", 40, 65),
  p("s-deslanado", "gigante", 50, 80),
  // Desenredado (por sesión, según estado)
  p("s-desenredado", "mini", 10, 20),
  p("s-desenredado", "pequeno", 10, 25),
  p("s-desenredado", "mediano", 15, 30),
  p("s-desenredado", "grande", 20, 40),
  p("s-desenredado", "gigante", 25, 45),
  // Stripping
  p("s-stripping", "pequeno", 35, 55),
  p("s-stripping", "mediano", 45, 70),
  p("s-stripping", "grande", 60, 90),
  // Tratamiento dermatológico
  p("s-dermatologico", "mini", 20, 30),
  p("s-dermatologico", "pequeno", 22, 35),
  p("s-dermatologico", "mediano", 28, 45),
  p("s-dermatologico", "grande", 38, 60),
  p("s-dermatologico", "gigante", 45, 70),
  // Baño terapéutico
  p("s-bano-terapeutico", "mini", 16, 24),
  p("s-bano-terapeutico", "pequeno", 18, 28),
  p("s-bano-terapeutico", "mediano", 24, 40),
  p("s-bano-terapeutico", "grande", 34, 55),
  p("s-bano-terapeutico", "gigante", 44, 65),
  // Uñas y básicos
  p("s-corte-unas", "mini", 5, 10),
  p("s-corte-unas", "pequeno", 5, 10),
  p("s-corte-unas", "mediano", 5, 10),
  p("s-corte-unas", "grande", 6, 12),
  p("s-corte-unas", "gigante", 6, 12),
  p("s-limpieza-oidos", "mini", 5, 10),
  p("s-limpieza-oidos", "pequeno", 5, 10),
  p("s-limpieza-oidos", "mediano", 5, 10),
  p("s-limpieza-oidos", "grande", 5, 12),
  p("s-limpieza-oidos", "gigante", 5, 12),
  p("s-glandulas", "mini", 5, 10),
  p("s-glandulas", "pequeno", 5, 10),
  p("s-glandulas", "mediano", 5, 10),
  p("s-glandulas", "grande", 6, 12),
  p("s-glandulas", "gigante", 6, 12),
  // Cachorros
  p("s-cachorro", "mini", 15, 25),
  p("s-cachorro", "pequeno", 15, 25),
  p("s-cachorro", "mediano", 18, 30),
  p("s-cachorro", "grande", 20, 35),
  p("s-cachorro", "gigante", 22, 38),
];

export function seedPriceRows(): PriceRow[] {
  return SEED_PRICES.map((row, i) => ({
    id: `pm-${i}`,
    service_id: row.service,
    tamano: row.tamano,
    tipo_pelo: row.tipo_pelo,
    recargo_nudos_pct: row.recargo_nudos_pct,
    precio_min: row.precio_min,
    precio_max: row.precio_max,
    es_precio_real: row.es_precio_real,
  }));
}

// Horario placeholder: L–V 10:00–17:45 (confirmar con la clienta)
export const SEED_RULES: AvailabilityRule[] = [1, 2, 3, 4, 5].map((d) => ({
  id: `ar-${d}`,
  dia_semana: d,
  hora_inicio: "10:00",
  hora_fin: "17:45",
  activo: true,
}));

export const DEFAULT_SETTINGS = {
  margen_minutos: 10,
  confirmacion_automatica: false,
  antelacion_min_horas: 2,
  horizonte_max_semanas: 6,
  recordatorios_activos: true,
};
