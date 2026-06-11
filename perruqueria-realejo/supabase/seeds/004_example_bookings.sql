-- ==========================================
-- SEED: Reservas de Ejemplo
-- ==========================================
-- 8 reservas en distintos estados para demo /admin

-- FECHAS DE REFERENCIA (relativas a CURRENT_DATE)
-- - Ayer: CURRENT_DATE - INTERVAL '1 day'
-- - Hoy: CURRENT_DATE
-- - Mañana: CURRENT_DATE + INTERVAL '1 day'
-- - Pasado mañana: CURRENT_DATE + INTERVAL '2 days'
-- - Semana que viene: CURRENT_DATE + INTERVAL '7 days'

-- RESERVA 1: Pendiente (mañana por la mañana)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'corte-mantenimiento'),
  CURRENT_DATE + INTERVAL '1 day',
  '10:00',
  '11:15',
  'María García López',
  '611 123 456',
  'maria.garcia@email.com',
  'Luna',
  'Caniche',
  'pequeno',
  'Es un poco nerviosa con el secador',
  'pendiente',
  true
);

-- RESERVA 2: Pendiente (pasado mañana mediodía)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'banho-completo'),
  CURRENT_DATE + INTERVAL '2 days',
  '12:00',
  '12:45',
  'Carlos Rodríguez Martínez',
  '622 987 654',
  'carlos.rodriguez@email.com',
  'Max',
  'Golden Retriever',
  'grande',
  'Tiene alergia a ciertos shampoos, usar hipoalergénico',
  'pendiente',
  true
);

-- RESERVA 3: Confirmada (semana que viene)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'deslanado'),
  CURRENT_DATE + INTERVAL '7 days',
  '14:00',
  '16:00',
  'Ana Fernández Sánchez',
  '633 456 789',
  'ana.fernandez@email.com',
  'Thor',
  'Husky Siberiano',
  'mediano',
  'Es su primer deslanado de la temporada',
  'confirmada',
  true
);

-- RESERVA 4: Confirmada (semana que viene + 2 días)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'corte-mantenimiento'),
  CURRENT_DATE + INTERVAL '9 days',
  '16:00',
  '17:00',
  'Pedro López Ruiz',
  '644 321 654',
  'pedro.lopez@email.com',
  'Bobby',
  'Bichón Frisé',
  'pequeno',
  NULL,
  'confirmada',
  true
);

-- RESERVA 5: Completada (ayer)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'banho-completo'),
  CURRENT_DATE - INTERVAL '1 day',
  '11:00',
  '11:45',
  'Laura Martín González',
  '655 789 123',
  'laura.martin@email.com',
  'Coco',
  'Yorkshire',
  'mini',
  'Muy bien portado',
  'completada',
  true
);

-- RESERVA 6: Cancelada (hace 3 días)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'corte-mantenimiento'),
  CURRENT_DATE - INTERVAL '3 days',
  '15:00',
  '16:15',
  'Diego Moreno Jiménez',
  '666 234 567',
  'diego.moreno@email.com',
  'Rocky',
  'Bulldog Francés',
  'pequeno',
  NULL,
  'cancelada',
  true
);

-- RESERVA 7: No-show (hace 1 semana)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'primera-visita'),
  CURRENT_DATE - INTERVAL '7 days',
  '10:00',
  '10:45',
  'Isabel Castro Torres',
  '677 567 890',
  'isabel.castro@email.com',
  'Nala',
  'Beagle',
  'mediano',
  'Primerera visita, quería habituación',
  'no_show',
  true
);

-- RESERVA 8: Pendiente (esta tarde, para demo de confirmación)
INSERT INTO bookings (
  service_id,
  fecha,
  hora_inicio,
  hora_fin,
  nombre,
  telefono,
  email,
  nombre_perro,
  raza,
  tamano,
  observaciones,
  estado,
  demo
) VALUES (
  (SELECT id FROM services WHERE slug = 'corte-unas'),
  CURRENT_DATE,
  '17:00',
  '17:15',
  'Sara Vargas Medina',
  '688 901 234',
  'sara.vargas@email.com',
  'Simba',
  'Pastor Alemán',
  'grande',
  'Solo corte de uñas, muy tranquilo',
  'pendiente',
  true
);

-- ==========================================
-- Notas:
-- ==========================================
-- - Todas las reservas tienen demo = true
-- - Estados representativos: pendiente, confirmada, cancelada, completada, no_show
-- - Fechas relativas a CURRENT_DATE para que siempre sean válidas
-- - Nombres y datos ficticios para demo
-- - Incluyen observaciones diversas (miedos, alergias, primeras visitas)
-- ==========================================
