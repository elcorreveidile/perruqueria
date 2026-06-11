import type { Metadata } from "next";
import { Suspense } from "react";
import { getServices } from "@/lib/data";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Reserva tu cita",
  description: "Reserva online el hueco de tu peludo en menos de 90 segundos.",
};

export const dynamic = "force-dynamic";

export default async function ReservasPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <header className="text-center">
        <h1 className="text-4xl">Reserva tu cita 🐾</h1>
        <p className="mt-3 text-tinta-suave">
          Elige servicio, día y hora, cuéntanos cómo es tu peludo y listo. Menos de minuto y
          medio, prometido.
        </p>
        <p className="mt-3 rounded-xl bg-cielo-claro px-4 py-2 text-xs font-semibold text-tinta-suave">
          ⚠️ Las reservas de esta demo no generan citas reales.
        </p>
      </header>
      <Suspense>
        <BookingWizard services={services} />
      </Suspense>
    </div>
  );
}
