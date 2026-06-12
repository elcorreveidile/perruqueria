// Símbolo "Huella en positivo": huella formada por cinco burbujas.
export function HuellaBurbujas({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <circle cx="18" cy="22" r="7" fill="#A8D8F0" />
      <circle cx="32" cy="16" r="7.5" fill="#A8D8F0" />
      <circle cx="46" cy="22" r="7" fill="#A8D8F0" />
      <circle cx="10" cy="36" r="6" fill="#B7C9B5" />
      <ellipse cx="33" cy="44" rx="14" ry="12" fill="#E46972" />
      <circle cx="28" cy="41" r="2.5" fill="#FFF8EE" opacity="0.7" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <HuellaBurbujas className="h-10 w-10" />
      <span className="leading-none">
        <span className="block font-display text-2xl font-semibold text-ciruela">
          Realejo
        </span>
        {!compact && (
          <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.22em] text-coral">
            Canina · En positivo
          </span>
        )}
      </span>
    </span>
  );
}
