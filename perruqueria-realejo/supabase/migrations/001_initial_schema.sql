-- ==========================================
-- ESQUEMA INICIAL — Perruquería Canina Realejo
-- ==========================================
-- Base de datos: Neon PostgreSQL
-- Versión: 1.0
-- Fecha: 2024-06-11

-- Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist"; -- Para EXCLUDE constraints

-- ==========================================
-- TABLAS
-- ==========================================

-- Servicios (catálogo de servicios de peluquería)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  nombre TEXT NOT NULL,
  categoria TEXT NOT NULL, -- 'baño_higiene', 'corte_estilismo', 'pelo_especial', 'piel_sensible', 'cachorros'
  descripcion_corta TEXT,
  descripcion_larga TEXT,
  duracion_min INT NOT NULL, -- minutos
  duracion_max INT NOT NULL,
  visible BOOLEAN DEFAULT true,
  orden INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matriz de precios (rangos por tamaño, tipo de pelo y servicio)
CREATE TABLE IF NOT EXISTS price_matrix (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  tamano TEXT NOT NULL, -- 'mini', 'pequeno', 'mediano', 'grande', 'gigante'
  tipo_pelo TEXT NOT NULL, -- 'corto', 'medio', 'largo', 'rizado', 'doble_manto'
  recargo_nudos_pct INT DEFAULT 0, -- porcentaje (0-50)
  precio_min DECIMAL(10,2) NOT NULL,
  precio_max DECIMAL(10,2) NOT NULL,
  es_precio_real BOOLEAN DEFAULT false, -- false = orientativo
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(service_id, tamano, tipo_pelo)
);

-- Reglas de disponibilidad (horario semanal)
CREATE TABLE IF NOT EXISTS availability_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  dia_semana INT NOT NULL, -- 0=domingo, 1=lunes, ...
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  activo BOOLEAN DEFAULT true,
  UNIQUE(dia_semana)
);

-- Huecos bloqueados (vacaciones, cierres puntuales)
CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  motivo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reservas (citas de clientes)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  nombre_perro TEXT NOT NULL,
  raza TEXT,
  tamano TEXT NOT NULL,
  observaciones TEXT,
  estado TEXT DEFAULT 'pendiente', -- 'pendiente', 'confirmada', 'cancelada', 'completada', 'no_show'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  demo BOOLEAN DEFAULT true,

  -- Anti-solapamiento usando EXCLUDE constraint
  EXCLUDE USING GIST (
    fecha WITH =,
    tsrange(hora_inicio, hora_fin) WITH &&
  )
);

-- Leads (prospectos desde calculadora/contacto)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  nombre_perro TEXT NOT NULL,
  raza TEXT,
  tamano TEXT NOT NULL,
  observaciones TEXT,
  origen TEXT NOT NULL, -- 'calculadora', 'cita', 'contacto'
  resumen_tarifa JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  demo BOOLEAN DEFAULT true
);

-- Emails programados (fidelización)
CREATE TABLE IF NOT EXISTS scheduled_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL, -- 'recordatorio_24h', 'recurrencia'
  enviar_en TIMESTAMPTZ NOT NULL,
  enviado_at TIMESTAMPTZ,
  creado_at TIMESTAMPTZ DEFAULT NOW(),
  demo BOOLEAN DEFAULT true
);

-- Lista de espera
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  fecha_deseada DATE NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  nombre_perro TEXT NOT NULL,
  notificado_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ÍNDICES
-- ==========================================

-- Services
CREATE INDEX IF NOT EXISTS idx_services_visible ON services(visible, orden);
CREATE INDEX IF NOT EXISTS idx_services_categoria ON services(categoria);

-- Price Matrix
CREATE INDEX IF NOT EXISTS idx_price_matrix_service ON price_matrix(service_id);
CREATE INDEX IF NOT EXISTS idx_price_matrix_tamano ON price_matrix(tamano);
CREATE INDEX IF NOT EXISTS idx_price_matrix_tipo_pelo ON price_matrix(tipo_pelo);

-- Bookings
CREATE INDEX IF NOT EXISTS idx_bookings_fecha ON bookings(fecha);
CREATE INDEX IF NOT EXISTS idx_bookings_estado ON bookings(estado);
CREATE INDEX IF NOT EXISTS idx_bookings_service ON bookings(service_id);

-- Leads
CREATE INDEX IF NOT EXISTS idx_leads_origen ON leads(origen);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- Scheduled Emails
CREATE INDEX IF NOT EXISTS idx_scheduled_emails_enviar_en ON scheduled_emails(enviar_en);
CREATE INDEX IF NOT EXISTS idx_scheduled_emails_enviado_at ON scheduled_emails(enviado_at);

-- Waitlist
CREATE INDEX IF NOT EXISTS idx_waitlist_fecha ON waitlist(fecha_deseada);

-- ==========================================
-- TRIGGERS
-- ==========================================

-- Actualizar updated_at automáticamente en services
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_price_matrix_updated_at
  BEFORE UPDATE ON price_matrix
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Activar RLS en todas las tablas
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_matrix ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheduled_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Políticas para services (lectura pública)
DROP POLICY IF EXISTS "services_select_public" ON services;
CREATE POLICY "services_select_public" ON services
  FOR SELECT
  USING (visible = true);

-- Políticas para bookings (solo admin)
-- (TODO: implementar cuando se añada autenticación)

-- ==========================================
-- COMENTARIOS
-- ==========================================

COMMENT ON TABLE services IS 'Catálogo de servicios de peluquería';
COMMENT ON TABLE price_matrix IS 'Matriz de precios por tamaño, tipo de pelo y servicio';
COMMENT ON TABLE availability_rules IS 'Reglas de disponibilidad semanal';
COMMENT ON TABLE blocked_slots IS 'Huecos bloqueados (vacaciones, cierres)';
COMMENT ON TABLE bookings IS 'Reservas/citas de clientes';
COMMENT ON TABLE leads IS 'Leads/prospectos desde calculadora y contacto';
COMMENT ON TABLE scheduled_emails IS 'Emails programados para fidelización';
COMMENT ON TABLE waitlist IS 'Lista de espera para huecos ocupados';

COMMENT ON COLUMN price_matrix.es_precio_real IS 'false = orientativo, true = precio oficial';
COMMENT ON COLUMN bookings.estado IS 'pendiente, confirmada, cancelada, completada, no_show';
COMMENT ON COLUMN bookings.demo IS 'true = reserva de demo, false = reserva real';
COMMENT ON COLUMN leads.origen IS 'calculadora, cita, contacto';
COMMENT ON COLUMN scheduled_emails.tipo IS 'recordatorio_24h, recurrencia';
