import type { Categoria } from "@/lib/types";

// Iconos de línea por categoría, recreados del board de identidad
// (estilo trazo fino, heredan el color vía currentColor).

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconoBano({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M3 13h18v1.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5z" />
      <path d="M6 19l-.8 2M18 19l.8 2M4.5 13V6.2A2.2 2.2 0 0 1 6.7 4c1 0 1.8.6 2.1 1.5" />
      <circle cx="13" cy="8.5" r="1.3" />
      <circle cx="16.5" cy="6" r="1" />
      <circle cx="18.5" cy="9.5" r="0.8" />
    </svg>
  );
}

function IconoCorte({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="6" cy="6.5" r="2.3" />
      <circle cx="6" cy="17.5" r="2.3" />
      <path d="M8.1 7.6L20 16M8.1 16.4L20 8" />
    </svg>
  );
}

function IconoCepillo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <rect x="3.5" y="9.5" width="17" height="4.5" rx="2.2" />
      <path d="M7 14v3M10.3 14v3M13.7 14v3M17 14v3" />
    </svg>
  );
}

function IconoPiel({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <path d="M4 13C4 7.5 8.5 4 14.5 4c0 6-4 9.5-10.5 9.5z" />
      <path d="M4 13c2.2-2.2 4.4-3.7 7-4.6" />
      <path d="M17.5 13.5c1.6 2 2.5 3.4 2.5 4.7a2.5 2.5 0 0 1-5 0c0-1.3.9-2.7 2.5-4.7z" />
    </svg>
  );
}

function IconoCachorro({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
      <circle cx="7.2" cy="8" r="1.7" />
      <circle cx="12" cy="6.3" r="1.7" />
      <circle cx="16.8" cy="8" r="1.7" />
      <path d="M12 11.2c2.9 0 5 1.9 5 4.2 0 1.7-1.3 2.8-2.7 2.5-.9-.2-1.6-.6-2.3-.6s-1.4.4-2.3.6c-1.4.3-2.7-.8-2.7-2.5 0-2.3 2.1-4.2 5-4.2z" />
    </svg>
  );
}

export function IconoCategoria({
  categoria,
  className,
}: {
  categoria: Categoria;
  className?: string;
}) {
  switch (categoria) {
    case "bano_higiene":
      return <IconoBano className={className} />;
    case "corte_estilismo":
      return <IconoCorte className={className} />;
    case "pelo_especial":
      return <IconoCepillo className={className} />;
    case "piel_sensible":
      return <IconoPiel className={className} />;
    case "cachorros":
      return <IconoCachorro className={className} />;
  }
}
