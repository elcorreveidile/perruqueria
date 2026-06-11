/**
 * Política de Privacidad
 *
 * Adaptado para DEMO
 */

export const metadata = {
  title: "Privacidad | Perruquería Canina Realejo",
  description: "Política de privacidad y protección de datos.",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-8">
          Política de Privacidad
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
          <div className="bg-sky/10 border border-sky/30 rounded-lg p-4 mb-8">
            <p className="text-sm text-ink/80">
              ⚠️ <strong>DEMO:</strong> Esta es una política de privacidad para la
              versión demo. La versión final se adaptará cuando el cliente
              apruebe el diseño y se confirme la titularidad del sitio.
            </p>
          </div>

          <h2 className="font-display text-xl font-semibold mb-4">
            Responsable del tratamiento
          </h2>
          <p className="text-ink/80">
            En cumplimiento del RGPD (Reglamento General de Protección de Datos), le
            informamos que los datos personales recogidos en este sitio web serán
            tratados por:
          </p>
          <ul className="list-disc pl-6 text-ink/80 space-y-1">
            <li>
              <strong>Responsable:</strong> [Datos pendientes de confirmar con cliente]
            </li>
            <li>
              <strong>Domicilio:</strong> C. Molinos 47, Local, 18009 Granada
            </li>
            <li>
              <strong>Email:</strong> contacto@ejemplo.com [placeholder]
            </li>
            <li>
              <strong>Finalidad:</strong> Gestión de citas y contacto comercial
            </li>
          </ul>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Datos que recopilamos
          </h2>
          <p className="text-ink/80 mb-4">Recopilamos los siguientes datos:</p>

          <h3 className="font-display text-lg font-semibold mb-2">
            A través del formulario de contacto
          </h3>
          <ul className="list-disc pl-6 text-ink/80 space-y-1 mb-4">
            <li>Nombre</li>
            <li>Teléfono</li>
            <li>Email</li>
            <li>Mensaje</li>
          </ul>

          <h3 className="font-display text-lg font-semibold mb-2">
            A través del sistema de reservas
          </h3>
          <ul className="list-disc pl-6 text-ink/80 space-y-1 mb-4">
            <li>Nombre del cliente</li>
            <li>Teléfono</li>
            <li>Email</li>
            <li>Nombre del perro</li>
            <li>Raza</li>
            <li>Tamaño</li>
            <li>Observaciones (miedos, alergias, etc.)</li>
          </ul>

          <h3 className="font-display text-lg font-semibold mb-2">
            A través de la calculadora de tarifas
          </h3>
          <ul className="list-disc pl-6 text-ink/80 space-y-1 mb-4">
            <li>Email (opcional, si se desea recibir el resultado)</li>
            <li>Datos del perro (tamaño, tipo de pelo, estado)</li>
          </ul>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Base legal para el tratamiento
          </h2>
          <ul className="list-disc pl-6 text-ink/80 space-y-1">
            <li>
              <strong>Consentimiento:</strong> Al enviar el formulario de contacto
              o reservas, usted consiente el tratamiento de sus datos.
            </li>
            <li>
              <strong>Interés legítimo:</strong> Gestión de la relación comercial y
              prestación de servicios solicitados.
            </li>
          </ul>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Destinatarios de los datos
          </h2>
          <p className="text-ink/80">
            Sus datos no serán cedidos a terceros, salvo obligación legal o
            prestación de servicios necesarios para la actividad (ej. email
            transaccional via Resend).
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Derechos ARCO
          </h2>
          <p className="text-ink/80 mb-4">
            Tiene derecho a acceder, rectificar, suprimir, limitar u oponerse al
            tratamiento de sus datos. Para ejercer estos derechos, puede
            contactarnos en:
          </p>
          <p className="text-ink/80">
            <a
              href="mailto:contacto@ejemplo.com"
              className="text-sky hover:text-coral transition-colors"
            >
              contacto@ejemplo.com
            </a>
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Conservación de los datos
          </h2>
          <p className="text-ink/80">
            Los datos se conservarán mientras exista una relación comercial o
            durante el tiempo necesario para cumplir con las obligaciones legales.
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Modificaciones
          </h2>
          <p className="text-ink/80">
            Esta política puede modificarse. Le recomendamos revisarla
            periódicamente.
          </p>

          <p className="text-sm text-ink/60 mt-8">
            Última actualización: Junio 2024
          </p>
        </div>
      </div>
    </div>
  );
}
