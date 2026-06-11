/**
 * ServicesGrid — Grid de servicios filtrable por categoría
 */

import { getVisibleServices } from "@/lib/services";
import ServiceCard from "./ServiceCard";

export default async function ServicesGrid() {
  let services;
  try {
    services = await getVisibleServices();
  } catch (error) {
    console.error("Error cargando servicios:", error);
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="text-coral mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold mb-2">
          Servicios no disponibles
        </h3>
        <p className="text-ink/70 mb-4">
          No se pudo cargar la información de servicios en este momento.
        </p>
        <a
          href="/contacto"
          className="inline-flex px-6 py-2 bg-sky text-ink rounded-lg font-medium hover:bg-sky/90 transition-colors"
        >
          Contactar por WhatsApp
        </a>
        <p className="text-xs text-ink/60 mt-4">
          Si estás viendo esto en modo demo, es normal. Configura DATABASE_URL
          para ver los servicios.
        </p>
      </div>
    );
  }

  // Agrupar por categoría
  const categories = Array.from(new Set(services.map((s) => s.categoria)));

  const categoryLabels: Record<string, string> = {
    baño_higiene: "Baño e higiene",
    corte_estilismo: "Corte y estilismo",
    pelo_especial: "Pelo especial",
    piel_sensible: "Piel sensible",
    cachorros: "Cachorros",
  };

  const categoryIcons: Record<string, string> = {
    baño_higiene: "🛁",
    corte_estilismo: "✂️",
    pelo_especial: "🐕",
    piel_sensible: "🌿",
    cachorros: "🐾",
  };

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <div key={category}>
          {/* Header de categoría */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">{categoryIcons[category] || "🐾"}</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-sky">
              {categoryLabels[category] || category}
            </h2>
          </div>

          {/* Grid de servicios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter((s) => s.categoria === category)
              .map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
