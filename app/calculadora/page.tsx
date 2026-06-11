import type { Metadata } from "next";
import { Suspense } from "react";
import { getPriceRows, getServices } from "@/lib/data";
import { Wizard } from "@/components/calculator/Wizard";

export const metadata: Metadata = {
  title: "Calculadora de tarifas",
  description:
    "Calcula en un minuto el rango orientativo de tu peludo según su tamaño, pelo y servicio.",
};

export const dynamic = "force-dynamic";

export default async function CalculadoraPage() {
  const [services, prices] = await Promise.all([getServices(), getPriceRows()]);
  const calculables = services.filter((s) => s.en_calculadora);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="text-center">
        <h1 className="text-4xl">Calcula tu tarifa 🐾</h1>
        <p className="mt-3 text-tinta-suave">
          Cuéntanos cómo es tu peludo y te damos un rango orientativo al momento. Sin
          compromiso y sin dejar tus datos.
        </p>
      </header>
      <Suspense>
        <Wizard services={calculables} prices={prices} />
      </Suspense>
    </div>
  );
}
