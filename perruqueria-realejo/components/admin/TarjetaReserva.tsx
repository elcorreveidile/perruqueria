import { cambiarEstadoReserva } from "@/lib/admin-actions";
import {
  labelEstadoReserva,
  labelTamano,
  type Booking,
  type Service,
} from "@/lib/types";

const colorEstado: Record<string, string> = {
  pendiente: "bg-cielo/50 text-tinta",
  confirmada: "bg-salvia-claro text-tinta",
  cancelada: "bg-crema text-tinta-suave line-through",
  completada: "bg-salvia text-white",
  no_show: "bg-coral/15 text-coral",
};

export function TarjetaReserva({
  booking,
  service,
}: {
  booking: Booking;
  service: Service | undefined;
}) {
  const activa = booking.estado === "pendiente" || booking.estado === "confirmada";
  return (
    <article className="rounded-2xl border border-cielo/40 bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-bold">
          {String(booking.hora_inicio).slice(0, 5)}–{String(booking.hora_fin).slice(0, 5)}{" "}
          · {service?.nombre ?? "Servicio"}
        </p>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${colorEstado[booking.estado]}`}>
          {labelEstadoReserva(booking.estado)}
        </span>
      </div>
      <p className="mt-2 text-sm">
        🐶 <strong>{booking.nombre_perro}</strong>
        {booking.raza ? ` (${booking.raza})` : ""} · {labelTamano(booking.tamano)}
      </p>
      <p className="text-sm text-tinta-suave">
        {booking.nombre} · {booking.telefono}
        {booking.email ? ` · ${booking.email}` : ""}
      </p>
      {booking.observaciones && (
        <p className="mt-1 rounded-xl bg-crema px-3 py-1.5 text-xs">
          📋 {booking.observaciones}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {booking.estado === "pendiente" && (
          <BotonEstado id={booking.id} estado="confirmada" etiqueta="✓ Confirmar" destacado />
        )}
        {booking.estado === "confirmada" && (
          <>
            <BotonEstado id={booking.id} estado="completada" etiqueta="✓ Completada" destacado />
            <BotonEstado id={booking.id} estado="no_show" etiqueta="No vino" />
          </>
        )}
        {activa && <BotonEstado id={booking.id} estado="cancelada" etiqueta="Cancelar" />}
      </div>
    </article>
  );
}

function BotonEstado({
  id,
  estado,
  etiqueta,
  destacado,
}: {
  id: string;
  estado: string;
  etiqueta: string;
  destacado?: boolean;
}) {
  return (
    <form action={cambiarEstadoReserva}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="estado" value={estado} />
      <button
        type="submit"
        className={`rounded-full px-4 py-1.5 text-sm font-bold ${
          destacado
            ? "bg-coral text-white hover:bg-coral-oscuro"
            : "border border-tinta/20 hover:border-coral hover:text-coral"
        }`}
      >
        {etiqueta}
      </button>
    </form>
  );
}
