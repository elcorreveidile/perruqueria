-- Semilla de la demo. Ejecutar DESPUÉS de 0001_schema.sql.
-- Precios: rangos ORIENTATIVOS de mercado en Granada capital (es_precio_real = false).

-- ── Servicios (13 en 5 categorías) ───────────────────────────────────
insert into services (id, slug, nombre, categoria, descripcion_corta, descripcion_larga, para_quien, incluye, duracion_min, duracion_max, recurrencia_semanas, en_calculadora, visible, orden) values
('b0000000-0000-4000-8000-000000000001','bano-completo','Baño completo + secado','bano_higiene','Baño tranquilo con champú vegano, secado suave y cepillado.','Un baño sin prisas, con agua templada y productos veganos adaptados a su piel. Secamos a baja potencia y con pausas para que tu perro esté cómodo en todo momento, y terminamos con un buen cepillado.','Para cualquier peludo que necesite ponerse al día con la higiene.','{"Champú y acondicionador veganos","Secado respetuoso","Cepillado completo","Colonia suave (opcional)"}',45,90,4,true,true,1),
('b0000000-0000-4000-8000-000000000002','corte-de-unas','Corte de uñas','bano_higiene','Uñas a su medida, sin sustos y con mucha calma.','Cortamos las uñas poco a poco, premiando y sin forzar. Si a tu perro le impone, lo trabajamos con paciencia: mejor dos visitas tranquilas que una mala experiencia.','Para todos, especialmente perros urbanos que desgastan poco la uña.','{"Corte y limado","Revisión de almohadillas","Premios y pausas"}',10,20,4,true,true,2),
('b0000000-0000-4000-8000-000000000003','limpieza-de-oidos','Limpieza de oídos','bano_higiene','Higiene del oído con productos suaves y manejo en positivo.','Limpiamos el oído externo con productos específicos y mucha suavidad. Si vemos algo que no nos cuadra, te lo decimos para que lo valore tu veterinario.','Ideal para orejas caídas (cocker, beagle…) y perros que se rascan.','{"Limpieza externa","Producto específico suave","Revisión visual"}',10,15,4,false,true,3),
('b0000000-0000-4000-8000-000000000004','vaciado-de-glandulas','Vaciado de glándulas','bano_higiene','Revisión y vaciado cuando de verdad hace falta.','Revisamos y vaciamos las glándulas anales solo si es necesario: hacerlo sin necesidad puede ser contraproducente. Siempre con delicadeza y sin estrés.','Para perros que arrastran el culete o se lamen mucho la zona.','{"Revisión previa","Vaciado suave si procede","Higiene de la zona"}',10,15,8,false,true,4),
('b0000000-0000-4000-8000-000000000005','bano-y-corte','Baño + corte','corte_estilismo','El pack completo: baño, secado y corte a tu gusto.','Baño con productos veganos y corte adaptado a tu perro y a vuestra rutina: más cortito para verano, con su flequillo, como más os guste. Todo a su ritmo, con descansos si los necesita.','El servicio estrella para la mayoría de peludos cada 6–8 semanas.','{"Baño completo vegano","Corte personalizado","Uñas y oídos incluidos","Cepillado final"}',90,180,7,true,true,5),
('b0000000-0000-4000-8000-000000000006','arreglo-por-patron-de-raza','Arreglo por patrón de raza','corte_estilismo','El corte clásico de su raza, respetando siempre su bienestar.','Arreglo siguiendo el patrón de la raza (caniche, schnauzer, cocker…), adaptado a la vida real de tu perro. La estética importa, pero su comodidad va primero.','Para razas con corte tradicional definido.','{"Baño previo","Corte según patrón","Acabado a tijera","Uñas y oídos"}',120,210,7,false,true,6),
('b0000000-0000-4000-8000-000000000007','corte-de-mantenimiento','Corte comercial / de mantenimiento','corte_estilismo','Corte práctico y cómodo para el día a día.','Un corte sencillo y funcional que mantiene a tu perro fresquito y fácil de cepillar entre visitas. Perfecto para alargar el efecto del arreglo completo.','Para quienes prefieren comodidad y poco mantenimiento en casa.','{"Repaso general a máquina y tijera","Higiene de zonas delicadas","Cepillado"}',60,120,6,false,true,7),
('b0000000-0000-4000-8000-000000000008','deslanado','Deslanado','pelo_especial','Adiós al subpelo muerto: menos pelo en casa y piel que respira.','Retiramos el subpelo muerto con técnica y herramientas específicas, sin rapar (en doble manto, rapar es mala idea). Tu perro queda más ligero, con la piel oxigenada, y tu sofá lo agradece.','Imprescindible en nórdicos, pastores y razas con doble manto en época de muda.','{"Baño con producto específico","Deslanado completo","Secado con soplador a baja potencia","Cepillado profundo"}',90,180,10,true,true,8),
('b0000000-0000-4000-8000-000000000009','desenredado','Desenredado','pelo_especial','Recuperamos el manto nudo a nudo, sin tirones ni malos ratos.','Cuando el pelo se ha enredado, vamos nudo a nudo con paciencia y productos desenredantes. Si el manto está demasiado castigado, te proponemos la opción más respetuosa para tu perro, aunque implique cortar más.','Para mantos largos o rizados que se han descontrolado.','{"Valoración honesta del manto","Desenredado progresivo","Producto acondicionador vegano"}',30,90,6,false,true,9),
('b0000000-0000-4000-8000-000000000010','stripping','Stripping / trimming','pelo_especial','Técnica manual para mantos duros, hecha con mimo.','Retiramos el pelo muerto a mano, como pide el manto duro de algunas razas. Es un trabajo lento y artesanal que mantiene la textura y el color del pelo, repartido en sesiones si tu perro lo prefiere.','Para schnauzers, terriers y otras razas de manto duro.','{"Stripping manual por zonas","Higiene básica","Plan de mantenimiento del manto"}',90,180,10,false,true,10),
('b0000000-0000-4000-8000-000000000011','tratamiento-dermatologico','Tratamiento dermatológico','piel_sensible','Baños de tratamiento para pieles que necesitan un extra de cuidado.','Para pieles atópicas, con dermatitis o picores: baños con productos veganos específicos, tiempos de actuación respetados y secado extra suave. Trabajamos de la mano de la pauta de tu veterinario.','Para perros con piel sensible, alergias o tratamiento veterinario activo.','{"Champú dermatológico vegano","Tiempos de actuación completos","Secado a baja temperatura","Seguimiento entre sesiones"}',60,105,3,true,true,11),
('b0000000-0000-4000-8000-000000000012','bano-terapeutico','Baño terapéutico calmante','piel_sensible','Avena, aloe y mucha calma para pieles irritadas.','Un baño pensado para calmar: productos veganos con avena y aloe, agua templada, masaje suave y cero prisas. Ideal como mantenimiento entre tratamientos o para pieles que se irritan con facilidad.','Para pieles delicadas y perros mayores.','{"Champú calmante vegano","Masaje durante el baño","Secado respetuoso"}',50,90,4,false,true,12),
('b0000000-0000-4000-8000-000000000013','primera-visita-cachorro','Primera visita de cachorro','cachorros','Su primera peluquería, convertida en un buen recuerdo.','Una sesión corta de habituación en positivo: conocer el espacio, los sonidos, el agua y el secador con juegos y premios. El objetivo no es que salga perfecto, sino que quiera volver. Esta visita marca su relación con la peluquería para toda la vida.','Para cachorros de 2 a 6 meses con la pauta de vacunación al día.','{"Habituación a sonidos y manejo","Baño suave si está preparado","Muchos premios","Consejos de cepillado en casa"}',30,60,4,false,true,13)
on conflict (slug) do nothing;

-- ── Matriz de precios (orientativos, tipo_pelo null = cualquiera) ────
insert into price_matrix (service_id, tamano, tipo_pelo, recargo_nudos_pct, precio_min, precio_max, es_precio_real) values
-- Baño completo
('b0000000-0000-4000-8000-000000000001','mini',null,20,14,20,false),
('b0000000-0000-4000-8000-000000000001','pequeno',null,20,15,25,false),
('b0000000-0000-4000-8000-000000000001','mediano',null,20,20,35,false),
('b0000000-0000-4000-8000-000000000001','grande',null,20,30,50,false),
('b0000000-0000-4000-8000-000000000001','gigante',null,20,40,60,false),
('b0000000-0000-4000-8000-000000000001','mediano','doble_manto',20,25,40,false),
('b0000000-0000-4000-8000-000000000001','grande','doble_manto',20,35,55,false),
('b0000000-0000-4000-8000-000000000001','gigante','doble_manto',20,45,70,false),
-- Baño + corte
('b0000000-0000-4000-8000-000000000005','mini',null,20,22,35,false),
('b0000000-0000-4000-8000-000000000005','pequeno',null,20,25,40,false),
('b0000000-0000-4000-8000-000000000005','mediano',null,20,35,55,false),
('b0000000-0000-4000-8000-000000000005','grande',null,20,50,80,false),
('b0000000-0000-4000-8000-000000000005','gigante',null,20,60,95,false),
('b0000000-0000-4000-8000-000000000005','pequeno','rizado',20,30,45,false),
('b0000000-0000-4000-8000-000000000005','mediano','rizado',20,40,60,false),
-- Arreglo por patrón de raza
('b0000000-0000-4000-8000-000000000006','mini',null,20,28,40,false),
('b0000000-0000-4000-8000-000000000006','pequeno',null,20,30,48,false),
('b0000000-0000-4000-8000-000000000006','mediano',null,20,40,62,false),
('b0000000-0000-4000-8000-000000000006','grande',null,20,55,85,false),
('b0000000-0000-4000-8000-000000000006','gigante',null,20,65,100,false),
-- Corte de mantenimiento
('b0000000-0000-4000-8000-000000000007','mini',null,20,18,28,false),
('b0000000-0000-4000-8000-000000000007','pequeno',null,20,20,32,false),
('b0000000-0000-4000-8000-000000000007','mediano',null,20,28,45,false),
('b0000000-0000-4000-8000-000000000007','grande',null,20,40,65,false),
('b0000000-0000-4000-8000-000000000007','gigante',null,20,50,75,false),
-- Deslanado
('b0000000-0000-4000-8000-000000000008','pequeno',null,20,25,40,false),
('b0000000-0000-4000-8000-000000000008','mediano',null,20,30,50,false),
('b0000000-0000-4000-8000-000000000008','grande',null,20,40,65,false),
('b0000000-0000-4000-8000-000000000008','gigante',null,20,50,80,false),
-- Desenredado
('b0000000-0000-4000-8000-000000000009','mini',null,25,10,20,false),
('b0000000-0000-4000-8000-000000000009','pequeno',null,25,10,25,false),
('b0000000-0000-4000-8000-000000000009','mediano',null,25,15,30,false),
('b0000000-0000-4000-8000-000000000009','grande',null,25,20,40,false),
('b0000000-0000-4000-8000-000000000009','gigante',null,25,25,45,false),
-- Stripping
('b0000000-0000-4000-8000-000000000010','pequeno',null,20,35,55,false),
('b0000000-0000-4000-8000-000000000010','mediano',null,20,45,70,false),
('b0000000-0000-4000-8000-000000000010','grande',null,20,60,90,false),
-- Tratamiento dermatológico
('b0000000-0000-4000-8000-000000000011','mini',null,15,20,30,false),
('b0000000-0000-4000-8000-000000000011','pequeno',null,15,22,35,false),
('b0000000-0000-4000-8000-000000000011','mediano',null,15,28,45,false),
('b0000000-0000-4000-8000-000000000011','grande',null,15,38,60,false),
('b0000000-0000-4000-8000-000000000011','gigante',null,15,45,70,false),
-- Baño terapéutico
('b0000000-0000-4000-8000-000000000012','mini',null,15,16,24,false),
('b0000000-0000-4000-8000-000000000012','pequeno',null,15,18,28,false),
('b0000000-0000-4000-8000-000000000012','mediano',null,15,24,40,false),
('b0000000-0000-4000-8000-000000000012','grande',null,15,34,55,false),
('b0000000-0000-4000-8000-000000000012','gigante',null,15,44,65,false),
-- Uñas, oídos, glándulas
('b0000000-0000-4000-8000-000000000002','mini',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000002','pequeno',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000002','mediano',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000002','grande',null,0,6,12,false),
('b0000000-0000-4000-8000-000000000002','gigante',null,0,6,12,false),
('b0000000-0000-4000-8000-000000000003','mini',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000003','pequeno',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000003','mediano',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000003','grande',null,0,5,12,false),
('b0000000-0000-4000-8000-000000000003','gigante',null,0,5,12,false),
('b0000000-0000-4000-8000-000000000004','mini',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000004','pequeno',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000004','mediano',null,0,5,10,false),
('b0000000-0000-4000-8000-000000000004','grande',null,0,6,12,false),
('b0000000-0000-4000-8000-000000000004','gigante',null,0,6,12,false),
-- Cachorros
('b0000000-0000-4000-8000-000000000013','mini',null,0,15,25,false),
('b0000000-0000-4000-8000-000000000013','pequeno',null,0,15,25,false),
('b0000000-0000-4000-8000-000000000013','mediano',null,0,18,30,false),
('b0000000-0000-4000-8000-000000000013','grande',null,0,20,35,false),
('b0000000-0000-4000-8000-000000000013','gigante',null,0,22,38,false);

-- ── Disponibilidad: L–V 10:00–17:45 (placeholder a confirmar) ────────
insert into availability_rules (dia_semana, hora_inicio, hora_fin, activo) values
(1,'10:00','17:45',true),
(2,'10:00','17:45',true),
(3,'10:00','17:45',true),
(4,'10:00','17:45',true),
(5,'10:00','17:45',true);

-- ── Ajustes por defecto ───────────────────────────────────────────────
insert into settings (id) values (1) on conflict (id) do nothing;

-- ── Reservas de ejemplo (7, en distintos estados) ─────────────────────
-- Relativas a la fecha actual para que la agenda nunca se vea vacía.
-- Si algún día cae en fin de semana, simplemente aparecerá fuera de horario: es demo.
insert into bookings (service_id, fecha, hora_inicio, hora_fin, nombre, telefono, email, nombre_perro, raza, tamano, observaciones, estado, demo) values
('b0000000-0000-4000-8000-000000000005', current_date, '10:00','12:00','Lucía Fernández','611111111','lucia@example.com','Trufa','Caniche','pequeno','Le asusta el secador: ir despacio','confirmada',true),
('b0000000-0000-4000-8000-000000000001', current_date, '12:30','13:45','Pablo Ortega','622222222','pablo@example.com','Rocco','Mestizo','mediano',null,'pendiente',true),
('b0000000-0000-4000-8000-000000000002', current_date, '16:00','16:15','Marina López','633333333',null,'Pipa','Chihuahua','mini','Primera vez, viene con su hermana','confirmada',true),
('b0000000-0000-4000-8000-000000000008', current_date + 1, '10:30','13:15','Jorge Ruiz','644444444','jorge@example.com','Kira','Husky','grande','Muda fuerte de temporada','confirmada',true),
('b0000000-0000-4000-8000-000000000011', current_date + 2, '11:00','12:30','Ana Castillo','655555555','ana@example.com','Bimba','Bulldog francés','pequeno','Dermatitis atópica, pauta del veterinario','pendiente',true),
('b0000000-0000-4000-8000-000000000005', current_date - 7, '10:00','12:00','Carmen Vega','666666666','carmen@example.com','Lolo','Bichón maltés','pequeno',null,'completada',true),
('b0000000-0000-4000-8000-000000000001', current_date - 3, '13:00','14:15','David Mora','677777777',null,'Thor','Pastor alemán','grande',null,'no_show',true);

-- Email de recurrencia ya programado para la cita completada de Lolo
insert into scheduled_emails (booking_id, tipo, enviar_en, demo)
select id, 'recurrencia', (fecha + interval '7 weeks' + time '10:00')::timestamptz, true
from bookings where nombre_perro = 'Lolo' and estado = 'completada';

-- ── Usuario admin ─────────────────────────────────────────────────────
-- El usuario de Supabase Auth se crea desde el dashboard (ver README):
-- Authentication → Users → Add user → email demo@por2duros.com (confirmado).
