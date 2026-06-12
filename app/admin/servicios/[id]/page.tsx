import { notFound } from "next/navigation";
import {
  borrarPrecio,
  borrarServicio,
  guardarPrecio,
  guardarServicio,
} from "@/lib/admin-actions";
import { getPriceRows, getServices } from "@/lib/data";
import { dbConfigured } from "@/lib/db";
import { CATEGORIAS, TAMANOS, TIPOS_PELO, labelPelo, labelTamano } from "@/lib/types";

export const dynamic = "force-dynamic";

const inputCls = "mt-1 w-full rounded-full border border-cielo px-4 py-2 font-normal";

export default async function EditarServicioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!dbConfigured()) {
    return <p className="rounded-2xl bg-cielo-claro p-4 text-sm">Configura la base de datos (ver README) para editar servicios.</p>;
  }

  const { id } = await params;
  const esNuevo = id === "nuevo";
  const services = await getServices({ includeHidden: true });
  const service = esNuevo ? null : services.find((s) => s.id === id);
  if (!esNuevo && !service) notFound();

  const precios = service ? await getPriceRows(service.id) : [];

  return (
    <div>
      <h1 className="text-2xl">{esNuevo ? "Nuevo servicio" : `Editar: ${service!.nombre}`}</h1>

      <form action={guardarServicio} className="mt-6 grid gap-3 rounded-3xl bg-white p-6 sm:grid-cols-2">
        {!esNuevo && <input type="hidden" name="id" value={service!.id} />}
        <label className="text-sm font-bold">
          Nombre*
          <input name="nombre" required defaultValue={service?.nombre} className={inputCls} />
        </label>
        <label className="text-sm font-bold">
          Slug (URL)*
          <input name="slug" required defaultValue={service?.slug} pattern="[a-z0-9-]+" className={inputCls} />
        </label>
        <label className="text-sm font-bold">
          Categoría
          <select name="categoria" defaultValue={service?.categoria ?? "bano_higiene"} className={inputCls}>
            {CATEGORIAS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-bold">
          ¿Para quién es?
          <input name="para_quien" defaultValue={service?.para_quien} className={inputCls} />
        </label>
        <label className="text-sm font-bold sm:col-span-2">
          Descripción corta
          <input name="descripcion_corta" defaultValue={service?.descripcion_corta} className={inputCls} />
        </label>
        <label className="text-sm font-bold sm:col-span-2">
          Descripción larga
          <textarea name="descripcion_larga" rows={3} defaultValue={service?.descripcion_larga} className="mt-1 w-full rounded-2xl border border-cielo px-4 py-2 font-normal" />
        </label>
        <label className="text-sm font-bold sm:col-span-2">
          Qué incluye <span className="font-normal text-tinta-suave">(una línea por elemento)</span>
          <textarea name="incluye" rows={4} defaultValue={service?.incluye.join("\n")} className="mt-1 w-full rounded-2xl border border-cielo px-4 py-2 font-normal" />
        </label>
        <label className="text-sm font-bold">
          Duración mín. (min)
          <input name="duracion_min" type="number" min={5} step={5} defaultValue={service?.duracion_min ?? 30} className={inputCls} />
        </label>
        <label className="text-sm font-bold">
          Duración máx. (min)
          <input name="duracion_max" type="number" min={5} step={5} defaultValue={service?.duracion_max ?? 60} className={inputCls} />
        </label>
        <label className="text-sm font-bold">
          Recurrencia (semanas)
          <input name="recurrencia_semanas" type="number" min={1} max={52} defaultValue={service?.recurrencia_semanas ?? 7} className={inputCls} />
        </label>
        <div className="flex items-end gap-6 pb-2 text-sm font-bold">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="visible" defaultChecked={service?.visible ?? true} /> Visible
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="en_calculadora" defaultChecked={service?.en_calculadora ?? false} /> En calculadora
          </label>
        </div>
        <button type="submit" className="rounded-full bg-coral px-6 py-2.5 font-bold text-white hover:bg-coral-oscuro sm:col-span-2">
          Guardar servicio
        </button>
      </form>

      {service && (
        <>
          <h2 className="mt-10 text-lg">Matriz de precios</h2>
          <p className="text-sm text-tinta-suave">
            Marca «precio real» cuando la tarifa sea la oficial: la etiqueta pública pasa de
            «orientativo» a «desde X €».
          </p>
          <div className="mt-3 grid gap-3">
            {precios.map((p) => (
              <form key={p.id} action={guardarPrecio} className="grid items-end gap-2 rounded-2xl bg-white p-4 sm:grid-cols-6">
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="service_id" value={service.id} />
                <p className="text-sm font-bold sm:col-span-6">
                  {labelTamano(p.tamano)} · {labelPelo(p.tipo_pelo)}
                  <input type="hidden" name="tamano" value={p.tamano} />
                  <input type="hidden" name="tipo_pelo" value={p.tipo_pelo ?? ""} />
                </p>
                <label className="text-xs font-bold">
                  Mín €
                  <input name="precio_min" type="number" min={0} step={1} defaultValue={p.precio_min} className={inputCls} />
                </label>
                <label className="text-xs font-bold">
                  Máx €
                  <input name="precio_max" type="number" min={0} step={1} defaultValue={p.precio_max} className={inputCls} />
                </label>
                <label className="text-xs font-bold">
                  Recargo nudos %
                  <input name="recargo_nudos_pct" type="number" min={0} max={100} defaultValue={p.recargo_nudos_pct} className={inputCls} />
                </label>
                <label className="flex items-center gap-2 pb-2 text-xs font-bold">
                  <input type="checkbox" name="es_precio_real" defaultChecked={p.es_precio_real} /> Precio real
                </label>
                <button type="submit" className="rounded-full bg-tinta px-4 py-2 text-sm font-bold text-white">
                  Guardar
                </button>
                <button type="submit" formAction={borrarPrecio} className="rounded-full border border-coral px-4 py-2 text-sm font-bold text-coral">
                  Borrar
                </button>
              </form>
            ))}
          </div>

          <h3 className="mt-6 text-base font-bold">Añadir fila de precio</h3>
          <form action={guardarPrecio} className="mt-2 grid items-end gap-2 rounded-2xl bg-white p-4 sm:grid-cols-6">
            <input type="hidden" name="service_id" value={service.id} />
            <label className="text-xs font-bold">
              Tamaño
              <select name="tamano" className={inputCls}>
                {TAMANOS.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold">
              Pelo
              <select name="tipo_pelo" className={inputCls}>
                <option value="">Cualquiera</option>
                {TIPOS_PELO.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </label>
            <label className="text-xs font-bold">
              Mín €
              <input name="precio_min" type="number" min={0} required className={inputCls} />
            </label>
            <label className="text-xs font-bold">
              Máx €
              <input name="precio_max" type="number" min={0} required className={inputCls} />
            </label>
            <label className="text-xs font-bold">
              Recargo %
              <input name="recargo_nudos_pct" type="number" min={0} max={100} defaultValue={20} className={inputCls} />
            </label>
            <button type="submit" className="rounded-full bg-coral px-4 py-2 text-sm font-bold text-white">
              Añadir
            </button>
          </form>

          <form action={borrarServicio} className="mt-10 border-t border-coral/20 pt-6">
            <input type="hidden" name="id" value={service.id} />
            <button type="submit" className="rounded-full border-2 border-coral px-6 py-2 text-sm font-bold text-coral hover:bg-coral hover:text-white">
              Eliminar servicio y sus precios
            </button>
          </form>
        </>
      )}
    </div>
  );
}
