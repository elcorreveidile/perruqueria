import { revalidatePath } from "next/cache";
import { getServiceById } from "@/lib/data";
import { emailWaitlist, enviarEmail } from "@/lib/emails";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/server";
import type { Booking } from "@/lib/types";

export const dynamic = "force-dynamic";

function fechaBonita(fecha: string): string {
  return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

async function getBookingByToken(token: string): Promise<Booking | null> {
  if (!supabaseConfigured()) return null;
  const { data } = await supabaseAdmin()
    .from("bookings")
    .select("*")
    .eq("token_cancelacion", token)
    .single();
  return (data as Booking) ?? null;
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
    if (!supabaseConfigured()) return;
    const db = supabaseAdmin();
    const { data } = await db
      .from("bookings")
      .select("*")
      .eq("token_cancelacion", token)
      .single();
    const b = data as Booking | null;
    if (!b || b.estado === "cancelada" || b.estado === "completada") return;

    await db.from("bookings").update({ estado: "cancelada" }).eq("id", b.id);
    // Los emails programados de esta cita dejan de tener sentido
    await db.from("scheduled_emails").delete().eq("booking_id", b.id).is("enviado_at", null);

    // Avisamos al primero de la lista de espera de ese día (orden de llegada)
    const { data: espera } = await db
      .from("waitlist")
      .select("*")
      .eq("fecha_deseada", b.fecha)
      .is("notificado_at", null)
      .order("created_at")
      .limit(1);
    const primero = espera?.[0];
    if (primero) {
      const service = await getServiceById(primero.service_id);
      await enviarEmail(
        emailWaitlist(primero.nombre, primero.email, b.fecha, service?.nombre ?? "tu servicio")
      );
      await db
        .from("waitlist")
        .update({ notificado_at: new Date().toISOString() })
        .eq("id", primero.id);
    }
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
          {fechaBonita(booking.fecha)}, {String(booking.hora_inicio).slice(0, 5)}
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
