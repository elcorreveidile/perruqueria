import { Resend } from "resend";
import { SITE } from "./site";
import type { Booking, Service } from "./types";
import { labelTamano } from "./types";

const DEMO = process.env.DEMO_MODE !== "false";

function fechaBonita(fecha: string): string {
  return new Date(`${fecha}T12:00:00`).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function plantilla(titulo: string, cuerpoHtml: string): string {
  return `<!doctype html><html lang="es"><body style="margin:0;background:#FFF8EE;font-family:'Segoe UI',Arial,sans-serif;color:#46505A;">
  <div style="max-width:560px;margin:0 auto;padding:24px;">
    <div style="background:#fff;border-radius:16px;padding:32px;border:1px solid #A8D8F0;">
      <p style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#E46972;margin:0 0 8px;">🐾 ${SITE.nombre}</p>
      <h1 style="font-size:22px;margin:0 0 16px;color:#46505A;">${titulo}</h1>
      ${cuerpoHtml}
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
      <p style="font-size:12px;color:#9aa3ab;margin:0;">${SITE.direccion}<br>
      ${DEMO ? "Demo de propuesta — sitio no oficial. Este email es una prueba y no corresponde a una cita real." : ""}</p>
    </div>
  </div></body></html>`;
}

export interface EmailParaEnviar {
  to: string;
  subject: string;
  html: string;
}

/**
 * Envía un email con Resend. En modo demo, TODO se desvía a DEMO_EMAIL_TO
 * y el asunto se marca con [DEMO]. Si no hay API key, lo registra y sigue.
 */
export async function enviarEmail(email: EmailParaEnviar): Promise<{ ok: boolean; desviado: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = DEMO ? process.env.DEMO_EMAIL_TO ?? email.to : email.to;
  const subject = DEMO ? `[DEMO → ${email.to}] ${email.subject}` : email.subject;

  if (!apiKey) {
    console.log(`[emails] (sin RESEND_API_KEY) ${subject} → ${to}`);
    return { ok: true, desviado: DEMO };
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Perruquería Realejo Demo <onboarding@resend.dev>",
    to,
    subject,
    html: email.html,
  });
  if (error) {
    console.error("[emails] error de Resend:", error);
    return { ok: false, desviado: DEMO };
  }
  return { ok: true, desviado: DEMO };
}

// ── Plantillas ─────────────────────────────────────────────────────

export function emailConfirmacionCliente(booking: Booking, service: Service): EmailParaEnviar {
  const cancelar = `${SITE.url}/reservas/cancelar/${booking.token_cancelacion}`;
  const pendiente = booking.estado === "pendiente";
  return {
    to: booking.email ?? "",
    subject: pendiente
      ? `Hemos recibido tu solicitud para ${booking.nombre_perro} 🐾`
      : `¡Guau! Hueco apartado para ${booking.nombre_perro} 🐾`,
    html: plantilla(
      pendiente ? "Solicitud recibida" : "¡Hueco apartado!",
      `<p>Hola ${booking.nombre},</p>
      <p>${pendiente
        ? `Hemos recibido tu solicitud de cita para <strong>${booking.nombre_perro}</strong>. Cristina la revisará y te confirmaremos en cuanto pueda (la agenda está muy llena, ¡buena señal!).`
        : `La cita de <strong>${booking.nombre_perro}</strong> está apartada. ¡Nos vemos pronto!`}</p>
      <table style="font-size:15px;margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Servicio</td><td><strong>${service.nombre}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Día</td><td>${fechaBonita(booking.fecha)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Hora</td><td>${booking.hora_inicio}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Peludo</td><td>${booking.nombre_perro} (${labelTamano(booking.tamano)})</td></tr>
      </table>
      <p>Te avisaremos también cuando a ${booking.nombre_perro} le vuelva a tocar sesión, para que no tengas que estar pendiente.</p>
      <p style="font-size:13px;">¿No puedes venir? <a href="${cancelar}" style="color:#E46972;">Cancela tu cita aquí</a> — así otro peludo aprovecha el hueco.</p>`
    ),
  };
}

export function emailAvisoPeluquera(booking: Booking, service: Service): EmailParaEnviar {
  return {
    to: process.env.DEMO_EMAIL_TO ?? "pruebas@example.com",
    subject: `Nueva reserva: ${booking.nombre_perro} — ${fechaBonita(booking.fecha)} ${booking.hora_inicio}`,
    html: plantilla(
      "Nueva reserva recibida",
      `<table style="font-size:15px;margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Servicio</td><td><strong>${service.nombre}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Día y hora</td><td>${fechaBonita(booking.fecha)}, ${booking.hora_inicio}–${booking.hora_fin}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Perro</td><td>${booking.nombre_perro}${booking.raza ? ` (${booking.raza})` : ""}, ${labelTamano(booking.tamano)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Humano</td><td>${booking.nombre} — ${booking.telefono}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Observaciones</td><td>${booking.observaciones || "—"}</td></tr>
      </table>
      <p>Confírmala o cancélala desde el <a href="${SITE.url}/admin/agenda" style="color:#E46972;">panel de agenda</a>.</p>`
    ),
  };
}

export function emailRecordatorio24h(booking: Booking, service: Service): EmailParaEnviar {
  const cancelar = `${SITE.url}/reservas/cancelar/${booking.token_cancelacion}`;
  return {
    to: booking.email ?? "",
    subject: `Mañana toca sesión: ${booking.nombre_perro} 🛁`,
    html: plantilla(
      `¡Mañana nos vemos, ${booking.nombre_perro}!`,
      `<p>Hola ${booking.nombre},</p>
      <p>Te recordamos la cita de <strong>${booking.nombre_perro}</strong>: <strong>${fechaBonita(booking.fecha)} a las ${booking.hora_inicio}</strong> (${service.nombre}).</p>
      <p>Estamos en ${SITE.direccion}.</p>
      <p style="font-size:13px;">Si te ha surgido algo, <a href="${cancelar}" style="color:#E46972;">cancela aquí</a> cuanto antes: hay peludos en lista de espera deseando ese hueco.</p>`
    ),
  };
}

export function emailRecurrencia(booking: Booking, service: Service): EmailParaEnviar {
  const rereserva = `${SITE.url}/reservas?servicio=${service.slug}&tamano=${booking.tamano}&perro=${encodeURIComponent(booking.nombre_perro)}`;
  return {
    to: booking.email ?? "",
    subject: `A ${booking.nombre_perro} ya le toca su sesión 🐾`,
    html: plantilla(
      `A ${booking.nombre_perro} ya le toca`,
      `<p>Hola ${booking.nombre},</p>
      <p>Han pasado unas semanas desde la última visita de <strong>${booking.nombre_perro}</strong> y, si todo va como siempre, ya le va tocando su <strong>${service.nombre.toLowerCase()}</strong>.</p>
      <p style="margin:24px 0;"><a href="${rereserva}" style="background:#E46972;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:bold;">Reservar su hueco en un clic</a></p>
      <p style="font-size:13px;">El servicio y los datos de ${booking.nombre_perro} van precargados: solo eliges día y hora.</p>`
    ),
  };
}

export function emailWaitlist(nombre: string, to: string, fecha: string, serviceNombre: string): EmailParaEnviar {
  return {
    to,
    subject: `¡Se ha liberado un hueco el ${fechaBonita(fecha)}! 🎉`,
    html: plantilla(
      "Se ha liberado un hueco",
      `<p>Hola ${nombre},</p>
      <p>Estabas en lista de espera para <strong>${serviceNombre}</strong> el <strong>${fechaBonita(fecha)}</strong>… ¡y acaba de quedar un hueco libre!</p>
      <p style="margin:24px 0;"><a href="${SITE.url}/reservas" style="background:#E46972;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:bold;">Reservar ahora</a></p>
      <p style="font-size:13px;">Los huecos liberados vuelan: cuanto antes reserves, mejor.</p>`
    ),
  };
}

export function emailResultadoCalculadora(
  to: string,
  resumen: { servicio: string; tamano: string; pelo: string; estado: string; rango: string; duracion: string }
): EmailParaEnviar {
  return {
    to,
    subject: `Tu tarifa orientativa — ${resumen.servicio} 🐾`,
    html: plantilla(
      "Tu tarifa orientativa",
      `<table style="font-size:15px;margin:16px 0;">
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Servicio</td><td><strong>${resumen.servicio}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Tamaño</td><td>${resumen.tamano}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Pelo</td><td>${resumen.pelo} · ${resumen.estado}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Rango orientativo</td><td><strong style="color:#E46972;">${resumen.rango}</strong></td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#9aa3ab;">Duración estimada</td><td>${resumen.duracion}</td></tr>
      </table>
      <p style="font-size:13px;">Tarifas orientativas de mercado en Granada. Cada peludo es un mundo: Cristina te confirma el precio exacto al verlo. Productos veganos incluidos siempre.</p>
      <p style="margin:24px 0;"><a href="${SITE.url}/reservas" style="background:#E46972;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:bold;">Reserva ya tu hueco</a></p>`
    ),
  };
}
