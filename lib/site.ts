export const SITE = {
  nombre: "Perruquería Canina Realejo",
  claim: "Peluquería canina en positivo",
  direccion: "C. Molinos 47, Local — Barrio del Realejo, 18009 Granada",
  telefono: "6XX XXX XXX", // placeholder: confirmar con la clienta
  horario: "L–V 10:00–17:45 (confirmar)",
  instagram: "https://www.instagram.com/perruqueriacaninarealejo/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Calle+Molinos+47%2C+18009+Granada",
  mapsEmbed:
    "https://www.google.com/maps?q=Calle+Molinos+47,+18009+Granada&output=embed",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://perruqueria-realejo-demo.vercel.app",
};

export function whatsappLink(texto?: string): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP ?? "34600000000";
  const base = `https://wa.me/${numero}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

export const ETIQUETA_ORIENTATIVO =
  "Tarifas orientativas de mercado en Granada — el precio final depende de cada perro";
