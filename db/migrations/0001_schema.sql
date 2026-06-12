-- Esquema de la demo "Perruquería Canina Realejo"
-- Ejecutar en el SQL Editor de Neon (console.neon.tech) o con psql.

create extension if not exists btree_gist;

-- ── Servicios ─────────────────────────────────────────────────────────
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre text not null,
  categoria text not null check (categoria in
    ('bano_higiene','corte_estilismo','pelo_especial','piel_sensible','cachorros')),
  descripcion_corta text not null default '',
  descripcion_larga text not null default '',
  para_quien text not null default '',
  incluye text[] not null default '{}',
  duracion_min int not null default 30,
  duracion_max int not null default 60,
  recurrencia_semanas int not null default 7,
  en_calculadora boolean not null default false,
  visible boolean not null default true,
  orden int not null default 0,
  updated_at timestamptz not null default now()
);

-- ── Matriz de precios ─────────────────────────────────────────────────
create table if not exists price_matrix (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  tamano text not null check (tamano in ('mini','pequeno','mediano','grande','gigante')),
  tipo_pelo text check (tipo_pelo in ('corto','medio','largo','rizado','doble_manto')),
  recargo_nudos_pct numeric not null default 20,
  precio_min numeric not null,
  precio_max numeric not null,
  es_precio_real boolean not null default false, -- false = orientativo
  updated_at timestamptz not null default now()
);
create index if not exists price_matrix_service_idx on price_matrix(service_id);

-- ── Leads ─────────────────────────────────────────────────────────────
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  nombre text,
  telefono text,
  email text,
  nombre_perro text,
  raza text,
  tamano text,
  observaciones text, -- miedos, alergias, manías
  origen text not null check (origen in ('calculadora','cita','contacto')),
  resumen_tarifa jsonb,
  created_at timestamptz not null default now(),
  demo boolean not null default true
);

-- ── Disponibilidad ────────────────────────────────────────────────────
create table if not exists availability_rules (
  id uuid primary key default gen_random_uuid(),
  dia_semana int not null check (dia_semana between 0 and 6), -- 0 = domingo
  hora_inicio time not null,
  hora_fin time not null,
  activo boolean not null default true
);

create table if not exists blocked_slots (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  hora_inicio time not null default '00:00',
  hora_fin time not null default '23:59',
  motivo text
);

-- ── Reservas ──────────────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id),
  fecha date not null,
  hora_inicio time not null,
  hora_fin time not null,
  nombre text not null,
  telefono text not null,
  email text,
  nombre_perro text not null,
  raza text,
  tamano text not null,
  observaciones text,
  estado text not null default 'pendiente' check (estado in
    ('pendiente','confirmada','cancelada','completada','no_show')),
  token_cancelacion uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  demo boolean not null default true,
  -- Franja generada para el constraint de exclusión
  franja tsrange generated always as
    (tsrange(fecha + hora_inicio, fecha + hora_fin, '[)')) stored
);

-- Anti-solapamiento garantizado a nivel de base de datos: imposible
-- reservar dos veces el mismo hueco aunque dos clientes lo intenten a la vez.
alter table bookings drop constraint if exists bookings_sin_solape;
alter table bookings add constraint bookings_sin_solape
  exclude using gist (franja with &&)
  where (estado in ('pendiente','confirmada'));

create index if not exists bookings_fecha_idx on bookings(fecha);
create index if not exists bookings_token_idx on bookings(token_cancelacion);

-- ── Fidelización ──────────────────────────────────────────────────────
create table if not exists scheduled_emails (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings(id) on delete cascade,
  tipo text not null check (tipo in ('recordatorio_24h','recurrencia')),
  enviar_en timestamptz not null,
  enviado_at timestamptz,
  demo boolean not null default true
);
create index if not exists scheduled_emails_pendientes_idx
  on scheduled_emails(enviar_en) where enviado_at is null;

create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  fecha_deseada date not null,
  service_id uuid not null references services(id),
  nombre text not null,
  telefono text not null default '',
  email text not null,
  notificado_at timestamptz,
  created_at timestamptz not null default now()
);

-- ── Ajustes (fila única) ──────────────────────────────────────────────
create table if not exists settings (
  id int primary key check (id = 1),
  margen_minutos int not null default 10,
  confirmacion_automatica boolean not null default false,
  antelacion_min_horas int not null default 2,
  horizonte_max_semanas int not null default 6,
  recordatorios_activos boolean not null default true
);

-- Seguridad: todo el acceso a datos pasa por el servidor de Next.js con la
-- cadena de conexión de Neon (DATABASE_URL); la base de datos no se expone
-- nunca al navegador.
