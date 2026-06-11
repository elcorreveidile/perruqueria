import type { Metadata } from "next";
import { getPriceRows, getServices } from "@/lib/data";
import { ETIQUETA_ORIENTATIVO } from "@/lib/site";
import { Catalogo } from "@/components/services/Catalogo";

export const metadata: Metadata = {
  title: "Servicios de peluquería canina",
  description:
    "Baños, cortes, deslanados y tratamientos para piel sensible. Todo en positivo y con productos veganos.",
};

export const dynamic = "force-dynamic";

export default async function ServiciosPage() {
  const [services, prices] = await Promise.all([getServices(), getPriceRows()]);

  // Rango global por servicio para mostrar "desde"
  const rangos = Object.fromEntries(
    services.map((s) => {
      const filas = prices.filter((p) => p.service_id === s.id);
      if (filas.length === 0) return [s.id, null];
      const min = Math.min(...filas.map((f) => f.precio_min));
      const real = filas.every((f) => f.es_precio_real);
      return [s.id, { min, real }];
    })
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="max-w-2xl">
        <h1 className="text-4xl">Servicios</h1>
        <p className="mt-3 text-tinta-suave">
          Cada servicio se hace al ritmo de tu perro, con productos veganos y manejo en
          positivo. Elige el suyo o pregúntanos: te aconsejamos sin compromiso.
        </p>
        <p className="mt-3 rounded-xl bg-cielo-claro px-4 py-2 text-xs font-semibold text-tinta-suave">
          ℹ️ {ETIQUETA_ORIENTATIVO}
        </p>
      </header>
      <Catalogo services={services} rangos={rangos} />
    </div>
  );
}
