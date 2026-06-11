/**
 * Cliente de Email — Resend
 *
 * Configuración para emails transaccionales
 * Docs: https://resend.com/docs/introduction
 */

import { Resend } from 'resend';

// Verificar API key
if (!process.env.RESEND_API_KEY) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('RESEND_API_KEY no está definida en producción');
  }
  console.warn('⚠️  RESEND_API_KEY no definida — emails desactivados en desarrollo');
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Configuración de emails
 */
export const emailConfig = {
  fromEmail: process.env.RESEND_FROM_EMAIL || 'noreply@demo.local',
  demoEmail: process.env.RESEND_TO_EMAIL_DEMO || null,
  isDemo: process.env.NEXT_PUBLIC_IS_DEMO === 'true',
};

/**
 * Enviar email
 *
 * En modo DEMO, todos los emails se redirigen a RESEND_TO_EMAIL_DEMO
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}) {
  if (!resend) {
    console.warn('📧 [MOCK] Email no enviado (Resend no configurado):', { to, subject });
    return { success: false, mock: true };
  }

  try {
    // En modo DEMO, redirigir todos los emails
    const finalTo = emailConfig.isDemo && emailConfig.demoEmail
      ? emailConfig.demoEmail
      : to;

    const result = await resend.emails.send({
      from: emailConfig.fromEmail,
      to: finalTo,
      subject,
      html,
      text: text || stripHtml(html),
    });

    console.log('✅ Email enviado:', { to: finalTo, subject });

    // Log si redirigimos en demo
    if (emailConfig.isDemo && emailConfig.demoEmail && finalTo !== to) {
      console.log(`🔄 [DEMO] Email redirigido de ${to} a ${finalTo}`);
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return { success: false, error };
  }
}

/**
 * Helper simple para strip HTML (producción: usar librería real)
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
}

/**
 * Tipos de emails de la aplicación
 */
export type EmailType =
  | 'booking_confirmation'
  | 'booking_reminder_24h'
  | 'booking_recurrence'
  | 'booking_cancellation'
  | 'waitlist_notification'
  | 'contact_form';

export default sendEmail;
