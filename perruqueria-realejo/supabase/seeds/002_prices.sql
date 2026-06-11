-- ==========================================
-- SEED: Matriz de Precios
-- ==========================================
-- Rangos orientativos para Granada capital
-- Todos con es_precio_real = false (orientativos)

-- IDs de servicios (obtenidos del seed anterior)
-- Baño completo (ID del slug 'banho-completo')
-- Corte mantenimiento (ID del slug 'corte-mantenimiento')
-- Deslanado (ID del slug 'deslanado')
-- Corte uñas (ID del slug 'corte-unas')

-- PRECIOS BAÑO COMPLETO
INSERT INTO price_matrix (service_id, tamano, tipo_pelo, recargo_nudos_pct, precio_min, precio_max, es_precio_real)
SELECT
  (SELECT id FROM services WHERE slug = 'banho-completo'),
  tamano,
  tipo_pelo,
  0, -- recargo nudos
  precio_min,
  precio_max,
  false -- orientativo
FROM (
  VALUES
  -- Mini (<5kg)
  ('mini', 'corto', 15, 20),
  ('mini', 'medio', 18, 22),
  ('mini', 'largo', 20, 25),

  -- Pequeño (5–10kg)
  ('pequeno', 'corto', 18, 25),
  ('pequeno', 'medio', 22, 28),
  ('pequeno', 'largo', 25, 32),

  -- Mediano (10–25kg)
  ('mediano', 'corto', 22, 30),
  ('mediano', 'medio', 28, 35),
  ('mediano', 'largo', 32, 40),

  -- Grande (25–40kg)
  ('grande', 'corto', 30, 40),
  ('grande', 'medio', 38, 48),
  ('grande', 'largo', 45, 55),

  -- Gigante (>40kg)
  ('gigante', 'corto', 40, 55),
  ('gigante', 'medio', 48, 65),
  ('gigante', 'largo', 55, 75)
) AS precios(tamano, tipo_pelo, precio_min, precio_max)
ON CONFLICT (service_id, tamano, tipo_pelo) DO NOTHING;

-- PRECIOS BAÑO + CORTE (usamos el servicio corte-mantenimiento)
INSERT INTO price_matrix (service_id, tamano, tipo_pelo, recargo_nudos_pct, precio_min, precio_max, es_precio_real)
SELECT
  (SELECT id FROM services WHERE slug = 'corte-mantenimiento'),
  tamano,
  tipo_pelo,
  20, -- recargo nudos (base para corte)
  precio_min,
  precio_max,
  false -- orientativo
FROM (
  VALUES
  -- Mini (<5kg)
  ('mini', 'medio', 25, 35),
  ('mini', 'largo', 28, 40),
  ('mini', 'rizado', 30, 45),

  -- Pequeño (5–10kg)
  ('pequeno', 'medio', 32, 42),
  ('pequeno', 'largo', 38, 50),
  ('pequeno', 'rizado', 42, 55),

  -- Mediano (10–25kg)
  ('mediano', 'medio', 42, 55),
  ('mediano', 'largo', 50, 65),
  ('mediano', 'rizado', 55, 72),

  -- Grande (25–40kg)
  ('grande', 'medio', 55, 70),
  ('grande', 'largo', 65, 85),
  ('grande', 'rizado', 72, 95),

  -- Gigante (>40kg)
  ('gigante', 'medio', 70, 90),
  ('gigante', 'largo', 85, 110),
  ('gigante', 'rizado', 95, 125)
) AS precios(tamano, tipo_pelo, precio_min, precio_max)
ON CONFLICT (service_id, tamano, tipo_pelo) DO NOTHING;

-- PRECIOS DESLANADO (solo para doble manto)
INSERT INTO price_matrix (service_id, tamano, tipo_pelo, recargo_nudos_pct, precio_min, precio_max, es_precio_real)
SELECT
  (SELECT id FROM services WHERE slug = 'deslanado'),
  tamano,
  'doble_manto'::TEXT,
  25, -- recargo nudos
  precio_min,
  precio_max,
  false -- orientativo
FROM (
  VALUES
  ('mediano', 40, 60),
  ('grande', 60, 85),
  ('gigante', 85, 120)
) AS precios(tamano, precio_min, precio_max)
ON CONFLICT (service_id, tamano, tipo_pelo) DO NOTHING;

-- PRECIOS CORTE DE UÑAS (misma tarifa para todos los tamaños)
INSERT INTO price_matrix (service_id, tamano, tipo_pelo, recargo_nudos_pct, precio_min, precio_max, es_precio_real)
SELECT
  (SELECT id FROM services WHERE slug = 'corte-unas'),
  'todos'::TEXT,
  'todos'::TEXT,
  0,
  8,
  12,
  false
ON CONFLICT (service_id, tamano, tipo_pelo) DO NOTHING;

-- ==========================================
-- Notas:
-- ==========================================
-- - Todos los precios son ORIENTATIVOS (es_precio_real = false)
-- - Los rangos cubren variaciones según:
--   - Estado del pelo (muy enredado = rango superior)
--   - Comportamiento del perro (nervioso = más tiempo)
--   - Frecuencia (más de 8 semanas = más sucio)
-- - Recargo por nudos: 20% base para corte, 25% para deslanado
-- - Cristina confirma precio al ver al perro
-- ==========================================
