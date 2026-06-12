import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPriceRows, getServiceBySlug } from "@/lib/data";
import { imagenDeServicio } from "@/lib/imagenes";
import { formatoDuracion, formatoRango } from "@/lib/pricing";
import { ETIQUETA_ORIENTATIVO } from "@/lib/site";
import { labelCategoria, labelPelo, labelTamano, TAMANOS } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ServicioDetalle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service || !service.visible) notFound();

  const prices = await getPriceRows(service.id);
  const ordenTam = TAMANOS.map((t) => t.value);
  const filas = [...prices].sort(
    (a, b) => ordenTam.indexOf(a.tamano) - ordenTam.indexOf(b.tamano)
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-xs font-bold uppercase tracking-wide text-coral">
        {labelCategoria(service.categoria)}
      </p>
      <h1 className="mt-1 text-4xl">{service.nombre}</h1>

      <div className="mt-6 overflow-hidden rounded-3xl shadow-md">
        <Image
          src={imagenDeServicio(service.slug)}
          alt={`${service.nombre} (imagen ilustrativa)`}
          width={1448}
          height={1086}
          priority
          className="h-56 w-full object-cover sm:h-72"
        />
      </div>
      <p className="mt-2 text-right text-xs text-tinta-suave">Imagen ilustrativa</p>

      <p className="mt-4 text-lg text-tinta-suave">{service.descripcion_larga}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-6">
          <h2 className="text-lg">¿Para quién es?</h2>
          <p className="mt-2 text-sm text-tinta-suave">{service.para_quien}</p>
          <p className="mt-4 text-sm">
            ⏱ Duración aproximada: <strong>{formatoDuracion(service.duracion_min, service.duracion_max)}</strong>
          </p>
        </div>
        <div className="rounded-3xl bg-salvia-claro p-6">
          <h2 className="text-lg">Qué incluye</h2>
          <ul className="lista-huellas mt-3 space-y-2 text-sm">
            {service.incluye.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>

      {filas.length > 0 && (
        <div className="mt-8 overflow-hidden rounded-3xl border border-cielo/40 bg-white">
          <table className="w-full text-sm">
            <caption className="bg-cielo-claro px-4 py-3 text-left text-xs font-semibold text-tinta-suave">
              ℹ️ {ETIQUETA_ORIENTATIVO}
            </caption>
            <thead>
              <tr className="border-b border-cielo/40 text-left">
                <th className="px-4 py-3">Tamaño</th>
                <th className="px-4 py-3">Pelo</th>
                <th className="px-4 py-3">Precio</th>
              </tr>
            </thead>
            <tbody>
              {filas.map((f) => (
                <tr key={f.id} className="border-b border-crema last:border-0">
                  <td className="px-4 py-2.5">{labelTamano(f.tamano)}</td>
                  <td className="px-4 py-2.5">{labelPelo(f.tipo_pelo)}</td>
                  <td className="px-4 py-2.5 font-bold">
                    {f.es_precio_real
                      ? `desde ${f.precio_min} €`
                      : `${formatoRango(f.precio_min, f.precio_max)} (orientativo)`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href={`/calculadora?servicio=${service.slug}`}
          className="rounded-full border-2 border-tinta/15 bg-white px-6 py-3 font-bold hover:border-coral hover:text-coral"
        >
          Calcula tu tarifa
        </Link>
        <Link
          href={`/reservas?servicio=${service.slug}`}
          className="rounded-full bg-coral px-6 py-3 font-bold text-white hover:bg-coral-oscuro"
        >
          Reserva cita
        </Link>
      </div>
    </div>
  );
}
