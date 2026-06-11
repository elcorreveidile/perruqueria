# Configuración de Neon — Perruquería Canina Realejo

Este README guía la configuración de Neon PostgreSQL como base de datos del proyecto.

## 1. Crear cuenta en Neon

1. Ve a [https://neon.tech](https://neon.tech)
2. Regístrate con tu cuenta de GitHub o email
3. Crea un proyecto nuevo:
   - Nombre: `perruqueria-realejo` (o el que quieras)
   - Región: eur-amsterdam (recomendado para Europa)
   - PostgreSQL version: 15 (default)

## 2. Obtener Connection String

1. En tu dashboard de Neon, selecciona el proyecto
2. Ve a "Connection Details"
3. Copia el "Connection string" con formato:
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. Sustituye `neondb` por el nombre de tu database si es diferente

## 3. Configurar Variables de Entorno

### 3.1 En local (`.env.local`)

Crea el archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.example .env.local
```

Edita `.env.local` y añade:

```env
DATABASE_URL=postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

### 3.2 En Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Añade:
   - **Nombre**: `DATABASE_URL`
   - **Valor**: tu connection string de Neon
   - **Environments**: Production, Preview, Development

## 4. Ejecutar Migraciones y Seeds

### 4.1 Opción A: Desde Neon Console (recomendado)

1. Ve a tu proyecto en Neon
2. "SQL Editor" > "New query"
3. Copia y pega el contenido de cada archivo SQL:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/seeds/001_services.sql`
   - `supabase/seeds/002_prices.sql`
   - `supabase/seeds/003_availability.sql`
   - `supabase/seeds/004_example_bookings.sql`
4. Ejecuta cada query en orden

### 4.2 Opción B: Desde CLI (si tienes `psql` instalado)

```bash
# Instalar psql si no lo tienes
# macOS: brew install postgresql
# Linux: apt-get install postgresql-client

# Conectar a Neon y ejecutar schema
psql $DATABASE_URL < supabase/migrations/001_initial_schema.sql

# Ejecutar seeds en orden
psql $DATABASE_URL < supabase/seeds/001_services.sql
psql $DATABASE_URL < supabase/seeds/002_prices.sql
psql $DATABASE_URL < supabase/seeds/003_availability.sql
psql $DATABASE_URL < supabase/seeds/004_example_bookings.sql
```

## 5. Verificar Datos

1. En Neon Console, ve a "Tables"
2. Deberías ver las siguientes tablas con datos:
   - `services` — 13 servicios
   - `price_matrix` — 45+ filas de precios
   - `availability_rules` — 5 reglas (L–V)
   - `bookings` — 8 reservas de ejemplo
   - `leads` — vacío (se llena con uso)
   - `scheduled_emails` — vacío (se llena con uso)
   - `waitlist` — vacío (se llena con uso)
   - `blocked_slots` — vacío (se gestiona desde /admin)

## 6. Troubleshooting

### Error: "connection refused"

- Verifica que `DATABASE_URL` es correcta
- Asegúrate de que tu IP no esté bloqueada (Neon no requiere whitelist)

### Error: "relation does not exist"

- Ejecuta primero el schema: `001_initial_schema.sql`
- Luego los seeds en orden

### Error: "extension not found"

- Verifica que tienes las extensiones `uuid-ossp` y `btree_gist`
- Neon debería tenerlas instaladas por defecto

## 7. Recursos

- [Neon Documentation](https://neon.tech/docs)
- [Neon Serverless Driver](https://neon.tech/docs/serverless/serverless-driver)
- [Next.js + Neon Guide](https://neon.tech/docs/guides/nextjs)

## 8. Notas Importantes

- **No uses `@vercel/postgres`** — está deprecated. Usa `@neondatabase/serverless` directamente.
- **Connection pooling**: Neon maneja esto automáticamente. No necesitas configurar nada extra.
- **Branching**: Neon permite branching de BD para testing/staging (feature avanzada, opcional).
- **Backup**: Neon hace backups automáticos. No necesitas configurar nada extra.

---

**¿Problemas?** Revisa la [documentación de Neon](https://neon.tech/docs) o abre un issue en el repo.
