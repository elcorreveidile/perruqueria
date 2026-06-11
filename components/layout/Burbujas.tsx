// Burbujas decorativas semitransparentes (animación sutil; se desactiva
// con prefers-reduced-motion desde globals.css).
export function Burbujas({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="burbuja absolute -right-6 top-12 h-24 w-24 rounded-full bg-cielo/30" />
      <div className="burbuja absolute left-8 top-40 h-10 w-10 rounded-full bg-cielo/40" />
      <div className="burbuja absolute bottom-10 right-1/4 h-16 w-16 rounded-full bg-salvia/30" />
    </div>
  );
}
