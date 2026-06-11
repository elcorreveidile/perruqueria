import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal, privacidad y cookies",
};

export default function LegalPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed">
      <h1 className="text-3xl">Información legal</h1>
      <p className="mt-3 rounded-xl bg-cielo-claro px-4 py-3 text-xs font-semibold text-tinta-suave">
        ⚠️ Este sitio es una <strong>demo de propuesta comercial</strong> desarrollada por Por
        2 Duros. No es la web oficial de Perruquería Canina Realejo ni existe relación
        contractual con el negocio. Los textos legales siguientes son plantillas adaptadas a
        la naturaleza de demo y deberán completarse con los datos reales del titular antes
        del paso a producción.
      </p>

      <section id="aviso-legal" className="mt-10">
        <h2 className="text-2xl">Aviso legal</h2>
        <p className="mt-3">
          Titular del sitio (demo): Por 2 Duros — por2duros.com. En la versión de producción,
          este apartado identificará al titular real del negocio (nombre, NIF, dirección C.
          Molinos 47, 18009 Granada y datos de contacto), conforme a la LSSI-CE.
        </p>
        <p className="mt-3">
          Los contenidos de esta demo (textos, diseño e identidad visual de muestra) son
          obra original de Por 2 Duros. Las fotografías proceden de bancos de imágenes con
          licencia libre y están marcadas como «imagen de muestra». No se utiliza ningún
          material gráfico propiedad del negocio.
        </p>
      </section>

      <section id="privacidad" className="mt-10">
        <h2 className="text-2xl">Política de privacidad</h2>
        <p className="mt-3">
          Esta demo no recoge datos con fines comerciales. Los formularios son funcionales a
          efectos de demostración: los datos introducidos se almacenan marcados como prueba
          en una tabla purgable y los emails se desvían a una dirección de pruebas del
          desarrollador. No se ceden a terceros y se eliminan periódicamente.
        </p>
        <p className="mt-3">
          En producción, este apartado detallará responsable, finalidades (gestión de citas y
          recordatorios), base jurídica, plazos de conservación y derechos RGPD (acceso,
          rectificación, supresión, etc.) con los datos reales del titular.
        </p>
      </section>

      <section id="cookies" className="mt-10">
        <h2 className="text-2xl">Política de cookies</h2>
        <p className="mt-3">
          Este sitio no utiliza cookies de seguimiento ni analítica de terceros. Solo se usan
          cookies técnicas imprescindibles para el funcionamiento del panel de administración
          (sesión). Por ese motivo no se muestra banner de consentimiento.
        </p>
        <p className="mt-3">
          El mapa incrustado de Google Maps puede establecer cookies propias de Google al
          interactuar con él; consulta la política de privacidad de Google para más detalle.
        </p>
      </section>
    </div>
  );
}
