/**
 * Aviso Legal
 *
 * Adaptado para DEMO
 */

export const metadata = {
  title: "Aviso Legal | Perruquería Canina Realejo",
  description: "Aviso legal y términos de uso.",
};

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="container-custom max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-8">
          Aviso Legal
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg max-w-none">
          <div className="bg-sky/10 border border-sky/30 rounded-lg p-4 mb-8">
            <p className="text-sm text-ink/80">
              ⚠️ <strong>DEMO:</strong> Este es un sitio de demostración no oficial.
              Todos los datos (dirección, teléfono, email) son ficticios o
              placeholders pending confirmación con la clienta.
            </p>
          </div>

          <h2 className="font-display text-xl font-semibold mb-4">
            Titular del sitio web
          </h2>
          <p className="text-ink/80">
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
            Servicios de la Sociedad de la Información y Comercio Electrónico, se
            informa:
          </p>
          <ul className="list-disc pl-6 text-ink/80 space-y-1">
            <li>
              <strong>Titular:</strong> [Datos pendientes de confirmación con cliente]
            </li>
            <li>
              <strong>Domicilio:</strong> C. Molinos 47, Local, 18009 Granada
            </li>
            <li>
              <strong>Email:</strong> contacto@ejemplo.com [placeholder]
            </li>
            <li>
              <strong>Actividad:</strong> Peluquería canina
            </li>
          </ul>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Finalidad del sitio web
          </h2>
          <p className="text-ink/80">
            Este sitio web es una DEMO de propuesta comercial desarrollada por{" "}
            <a
              href="https://por2duros.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky hover:text-coral transition-colors"
            >
              Por 2 Duros
            </a>
            . No representa un sitio oficial ni está autorizado por el titular de
            Perruquería Canina Realejo.
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Propiedad intelectual e industrial
          </h2>
          <p className="text-ink/80">
            El diseño, estructura, contenidos y elementos gráficos de este sitio
            web son propiedad de Por 2 Duros. Queda prohibida su reproducción,
            distribución o modificación sin autorización expresa.
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Exención de responsabilidad
          </h2>
          <p className="text-ink/80">
            Este sitio es una DEMO y contiene datos ficticios o placeholders. Los
            precios mostrados son orientativos y no vinculantes. Para obtener
            información real sobre servicios y precios, contacte directamente con
            Perruquería Canina Realejo.
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Ley aplicable y jurisdicción
          </h2>
          <p className="text-ink/80">
            Este sitio se rige por la legislación española. Para cualquier
            controversia, las partes se someten a los Juzgados y Tribunales de
            Granada.
          </p>

          <h2 className="font-display text-xl font-semibold mb-4 mt-8">
            Contacto
          </h2>
          <p className="text-ink/80">
            Para cualquier cuestión sobre este sitio web (demo), contacte con:{" "}
            <a
              href="mailto:hola@por2duros.com"
              className="text-sky hover:text-coral transition-colors"
            >
              hola@por2duros.com
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
