/**
 * Política de Cookies
 *
 * Adaptado para DEMO
 */

export const metadata = {
  title: "Cookies | Perruquería Canina Realejo",
  description: "Política de cookies del sitio web.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-8">
          Política de Cookies
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
          <div className="bg-sky/10 border border-sky/30 rounded-lg p-4 mb-8">
            <p className="text-sm text-ink/80">
              ⚠️ <strong>DEMO:</strong> Esta es la política de cookies para la
              versión demo. La versión final se adaptará cuando se implemente
              el sistema completo.
            </p>
          </div>

          <h2 className="font-display text-xl font-semibold mb-4">
            ¿Qué son las cookies?
          </h2>
          <p className="text-ink/80">
            Las cookies son pequeños archivos de texto que se almacenan en su
            dispositivo cuando visita un sitio web. Se utilizan para recordar sus
            preferencias y mejorar su experiencia de navegación.
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Tipos de cookies que utilizamos
          </h2>

          <h3 className="font-display text-lg font-semibold mb-2">
            Cookies técnicas
          </h3>
          <p className="text-ink/80 mb-4">
            Son necesarias para el funcionamiento del sitio web. Incluyen:
          </p>
          <ul className="list-disc pl-6 text-ink/80 space-y-1 mb-6">
            <li>Autenticación y navegación por el sitio</li>
            <li>Control de seguridad y prevención de fraudes</li>
            <li>Gestión de reservas y sesiones</li>
          </ul>

          <h3 className="font-display text-lg font-semibold mb-2">
            Cookies analíticas
          </h3>
          <p className="text-ink/80 mb-4">
            Nos permiten analizar el uso del sitio para mejorararlo. Podemos
            utilizar:
          </p>
          <ul className="list-disc pl-6 text-ink/80 space-y-1 mb-6">
            <li>
              <strong>Google Analytics:</strong> Analiza el tráfico y uso del sitio
            </li>
          </ul>

          <h3 className="font-display text-lg font-semibold mb-2">
            Cookies de terceros
          </h3>
          <p className="text-ink/80 mb-4">
            El sitio puede integrar servicios de terceros que utilizan cookies:
          </p>
          <ul className="list-disc pl-6 text-ink/80 space-y-1 mb-6">
            <li>
              <strong>Google Maps:</strong> Para mostrar el mapa de ubicación
            </li>
            <li>
              <strong>WhatsApp:</strong> Para el botón de contacto flotante
            </li>
            <li>
              <strong>Vercel Analytics:</strong> Para análisis de rendimiento
            </li>
          </ul>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            ¿Cómo gestionar las cookies?
          </h2>
          <p className="text-ink/80 mb-4">
            Puede configurar su navegador para rechazar cookies. Sin embargo,
            esto puede afectar al funcionamiento del sitio web.
          </p>

          <h3 className="font-display text-lg font-semibold mb-2">
            Navegadores más comunes
          </h3>
          <ul className="list-disc pl-6 text-ink/80 space-y-1 mb-4">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647?hl=es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky hover:text-coral transition-colors"
              >
                Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/es/kb/habilitar-deshabilitar-cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky hover:text-coral transition-colors"
              >
                Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky hover:text-coral transition-colors"
              >
                Safari
              </a>
            </li>
          </ul>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Cookies utilizadas
          </h2>

          <h3 className="font-display text-lg font-semibold mb-2">
            Cookies propias
          </h3>
          <table className="w-full text-sm text-ink/80 mb-6">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Nombre</th>
                <th className="text-left py-2">Tipo</th>
                <th className="text-left py-2">Duración</th>
                <th className="text-left py-2">Finalidad</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">
                  <code className="bg-cream px-2 py-1 rounded">
                    _session
                  </code>
                </td>
                <td className="py-2">Técnica</td>
                <td className="py-2">Sesión</td>
                <td className="py-2">Gestión de sesión de usuario</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">
                  <code className="bg-cream px-2 py-1 rounded">
                    _token
                  </code>
                </td>
                <td className="py-2">Técnica</td>
                <td className="py-2">Persistente</td>
                <td className="py-2">Verificación de reserva</td>
              </tr>
            </tbody>
          </table>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Actualizaciones
          </h2>
          <p className="text-ink/80">
            Esta política puede actualizarse para reflejar cambios en las cookies
            utilizadas. Le recomendamos revisarla periódicamente.
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Contacto
          </h2>
          <p className="text-ink/80">
            Para cualquier cuestión sobre cookies, contacte en:
          </p>
          <p className="text-ink/80">
            <a
              href="mailto:contacto@ejemplo.com"
              className="text-sky hover:text-coral transition-colors"
            >
              contacto@ejemplo.com
            </a>
          </p>

          <p className="text-sm text-ink/60 mt-8">
            Última actualización: Junio 2024
          </p>
        </div>
      </div>
    </div>
  );
}
