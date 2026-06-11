-- ==========================================
-- SEED: Reglas de Disponibilidad
-- ==========================================
-- Horario: L–V 10:00–17:45 (placeholder a confirmar)
-- Sábado y domingo: cerrado

-- Lunes (1) - Viernes (5)
INSERT INTO availability_rules (dia_semana, hora_inicio, hora_fin, activo) VALUES
(1, '10:00', '17:45', true), -- Lunes
(2, '10:00', '17:45', true), -- Martes
(3, '10:00', '17:45', true), -- Miércoles
(4, '10:00', '17:45', true), -- Jueves
(5, '10:00', '17:45', true)  -- Viernes
ON CONFLICT (dia_semana) DO NOTHING;

-- Sábado (6) y Domingo (0): sin reglas = cerrado

-- ==========================================
-- Notas:
-- ==========================================
-- - Horario placeholder a confirmar con Cristina
-- - Antelación mínima: 2 horas (configurable en /admin)
-- - Horizonte máximo: 6 semanas (configurable en /admin)
-- - Margen entre citas: 10 minutos (configurable en /admin)
-- - Sábados y domingos cerrados por defecto
-- - Se pueden añadir huecos extra bloqueando fines de semana
-- ==========================================
