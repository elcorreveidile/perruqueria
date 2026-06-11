export function DemoBanner() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-tinta px-4 py-2 text-center text-xs text-white/90">
      Demo de propuesta — sitio no oficial. Desarrollado por{" "}
      <a
        href="https://por2duros.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold underline decoration-coral underline-offset-2 hover:text-coral"
      >
        Por 2 Duros
      </a>
    </div>
  );
}
