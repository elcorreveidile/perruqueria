-- ==========================================
-- SEED: Servicios
-- ==========================================
-- 13 servicios en 5 categorías

-- BAÑO E HIGIENE
INSERT INTO services (slug, nombre, categoria, descripcion_corta, descripcion_larga, duracion_min, duracion_max, orden) VALUES
('banho-completo', 'Baño + secado completo', 'baño_higiene',
 'Baño con productos veganos + secado a toalla',
 'Baño completo con shampoos y acondicionadores 100% veganos y cruelty-free. Incluye secado a toalla. Perfecto para mantener a tu peludo limpio y con buen olfato.',
 30, 45, 1),

('corte-unas', 'Corte de uñas', 'baño_higiene',
 'Corte de uñas + limado',
 'Corte de uñas con cuidado y limado para evitar bordes afilados. Fundamental para la comodidad y salud de las patas de tu perro.',
 10, 15, 2),

('limpieza-oidos', 'Limpieza de oídos', 'baño_higiene',
 'Limpieza profunda de oídos',
 'Limpieza de oídos con productos específicos y seguros. Elimina cerumen y previene infecciones auditivas.',
 10, 15, 3),

('vaciado-glandulas', 'Vaciado de glándulas', 'baño_higiene',
 'Vaciado de glándulas anales',
 'Vaciado de glándulas anales para prevenir problemas y molestias. Realizado con técnica suave.',
 5, 10, 4);

-- CORTE Y ESTILISMO
INSERT INTO services (slug, nombre, categoria, descripcion_corta, descripcion_larga, duracion_min, duracion_max, orden) VALUES
('arreglo-patron', 'Arreglo por patrón de raza', 'corte_estilismo',
 'Corte según estándar de raza',
 'Corte completo siguiendo el patrón oficial de la raza. Ideal para perros de exposición o para mantener el estándar.',
 60, 90, 5),

('corte-mantenimiento', 'Corte comercial/mantenimiento', 'corte_estilismo',
 'Corte práctico y fácil de mantener',
 'Corte comercial que facilita el mantenimiento en casa. Corto, práctico y funcional. Perfecto para perros activos.',
 45, 75, 6),

('estilismo-creativo', 'Estilismo creativo (tintes seguros)', 'corte_estilismo',
 'Estilismo con tintes veganos seguros',
 'Diseños creativos con tintes 100% veganos y seguros para perros. Colores divertidos y temporales. ¡Tu peludo será el más original!',
 60, 90, 7);

-- PELO ESPECIAL
INSERT INTO services (slug, nombre, categoria, descripcion_corta, descripcion_larga, duracion_min, duracion_max, orden) VALUES
('deslanado', 'Deslanado (razas de doble manto)', 'pelo_especial',
 'Eliminación de pelo muerto en razas nórdicas',
 'Deslanado profesional para razas de doble manto (Golden, Husky, Pastor Belga...). Elimina el subpelo muerto y estimula el crecimiento de pelo sano.',
 60, 120, 8),

('desenredado', 'Desenredado profundo', 'pelo_especial',
 'Desenredado intenso para pelo muy enredado',
 'Desenredado profundo para peludos con nudos. Requiere paciencia y técnica suave. Incluye hidratación posterior.',
 45, 90, 9),

('stripping', 'Stripping/trimming (terrier, wire-haired)', 'pelo_especial',
 'Stripping para razas de pelo duro',
 'Stripping o trimming para terrier y razas de pelo duro. Técnica manual que respeta el ciclo natural del pelo.',
 45, 75, 10);

-- PIEL SENSIBLE
INSERT INTO services (slug, nombre, categoria, descripcion_corta, descripcion_larga, duracion_min, duracion_max, orden) VALUES
('tratamiento-dermato', 'Tratamientos dermatológicos', 'piel_sensible',
 'Baños terapéuticos con productos veganos',
 'Tratamientos específicos para problemas de piel: picor, irritación, dermatitis. Productos veganos de alta calidad formulados para pieles sensibles.',
 45, 60, 11),

('banho-terapeutico', 'Baños terapéuticos', 'piel_sensible',
 'Baños especiales para pieles sensibles',
 'Baños con productos hipoalergénicos y calmantes. Ideales para perros con piel sensible, alergias o recién operados.',
 30, 45, 12);

-- CACHORROS
INSERT INTO services (slug, nombre, categoria, descripcion_corta, descripcion_larga, duracion_min, duracion_max, orden) VALUES
('primera-visita', 'Primera visita de habituación en positivo', 'cachorros',
 'Primera experiencia sin miedo ni estrés',
 'Primera visita a la peluquería diseñada para ser una experiencia positiva. Sin prisas, con mucho cariño y refuerzo positivo. Acostumbramos al cachorro al sonido del secador, a que toquen sus patas, etc.',
 30, 45, 13);

ON CONFLICT (slug) DO NOTHING;
