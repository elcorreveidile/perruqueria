import { revalidatePath } from "next/cache";
import { getBookingByToken, getServiceById, notificarListaEspera } from "@/lib/data";
import { dbConfigured, sql } from "@/lib/db";

export const dynamic = "force-dynamic";

function fechaBonita(fecha: string): string {
  return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default async function CancelarPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const booking = await getBookingByToken(token);

  async function cancelar() {
    "use server";
    if (!dbConfigured()) return;
    const b = await getBookingByToken(token);
    if (!b || b.estado === "cancelada" || b.estado === "completada") return;

    await sql()`update bookings set estado = 'cancelada' where id = ${b.id}`;
    // Los emails programados de esta cita dejan de tener sentido
    await sql()`
      delete from scheduled_emails where booking_id = ${b.id} and enviado_at is null`;
    // Avisamos al primero de la lista de espera de ese día (orden de llegada)
    await notificarListaEspera(b.fecha);
    revalidatePath(`/reservas/cancelar/${token}`);
  }

  if (!booking) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="text-3xl">Reserva no encontrada</h1>
        <p className="mt-3 text-tinta-suave">
          El enlace no es válido o la demo no tiene base de datos configurada. Si necesitas
          cambiar tu cita, escríbenos por WhatsApp. 🐾
        </p>
      </div>
    );
  }

  const service = await getServiceById(booking.service_id);

  if (booking.estado === "cancelada") {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-5xl" aria-hidden="true">👋</p>
        <h1 className="mt-3 text-3xl">Cita cancelada</h1>
        <p className="mt-3 text-tinta-suave">
          Hecho, hemos liberado el hueco. ¡Gracias por avisar! Cuando quieras volver,
          {" "}{booking.nombre_perro} tiene su sitio aquí. 🐾
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="text-center text-3xl">¿Cancelar esta cita?</h1>
      <div className="mt-6 rounded-3xl border border-cielo/40 bg-white p-6 text-sm">
        <p><strong>{service?.nombre}</strong></p>
        <p className="mt-1">
          {fechaBonita(booking.fecha)}, {booking.hora_inicio}
        </p>
        <p className="mt-1 text-tinta-suave">
          {booking.nombre_perro} · {booking.nombre}
        </p>
      </div>
      <form action={cancelar} className="mt-6 text-center">
        <button
          type="submit"
          className="rounded-full bg-coral px-8 py-3.5 font-bold text-white hover:bg-coral-oscuro"
        >
          Sí, cancelar la cita
        </button>
        <p className="mt-3 text-xs text-tinta-suave">
          Si hay alguien en lista de espera para ese día, le avisaremos del hueco libre.
        </p>
      </form>
    </div>
  );
}
