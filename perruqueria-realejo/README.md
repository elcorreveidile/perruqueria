# Perruquería Canina Realejo — Demo Web

Demo de propuesta comercial para peluquería canina en Granada.

## 🎯 Objetivo

Demo funcional para mostrarle a la clienta un sitio web completo con:
- **Calculadora de tarifas interactiva** (pieza estrella)
- **Catálogo de servicios** filtrable por categoría
- **Filosofía "Peluquería en positivo"** (posicionamiento de marca)
- **Páginas secundarias** completas (galería, contacto, legal)
- **Banner de demo** con atribución a Por 2 Duros

## 🚀 Stack Técnico

- **Next.js 15** (App Router) + TypeScript + Tailwind CSS
- **Neon PostgreSQL** (base de datos)
- **Resend** (emails transaccionales)
- **Vercel** (hosting)

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Configurar variables (ver abajo)
# Editar .env.local con tus datos reales

# Desarrollo
npm run dev

# Build de producción
npm run build

# Start producción
npm start
```

## 🔐 Variables de Entorno

### Neon PostgreSQL (Base de datos)

```env
DATABASE_URL=postgresql://usuario:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

**Cómo obtener**:
1. Ve a [https://console.neon.tech](https://console.neon.tech)
2. Crea un proyecto nuevo
3. Copia el Connection String
4. Ejecuta los archivos SQL del directorio `/supabase` en este orden:
   - `migrations/001_initial_schema.sql`
   - `seeds/001_services.sql`
   - `seeds/002_prices.sql`
   - `seeds/003_availability.sql`
   - `seeds/004_example_bookings.sql`

### Resend (Emails)

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=tu-email@verificado.com
RESEND_TO_EMAIL_DEMO=demo@tudominio.com
```

**Cómo obtener**:
1. Ve a [https://resend.com](https://resend.com)
2. Crea un API key
3. Verifica tu dominio de envío

### Otros

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_IS_DEMO=true
```

## 🌐 Despliegue en Vercel

### Opción 1: Automático desde GitHub

1. Sube este repositorio a GitHub
2. Ve a [Vercel](https://vercel.com)
3. "Import Project" desde GitHub
4. Configura las variables de entorno en Project Settings
5. Deploy automático desde `main`

### Opción 2: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar
vercel
```

### Variables de Entorno en Vercel

En Vercel Dashboard → Project Settings → Environment Variables:

**Production + Preview + Development**:
- `DATABASE_URL` → Tu connection string de Neon
- `RESEND_API_KEY` → Tu API key de Resend
- `RESEND_FROM_EMAIL` → Tu email verificado
- `RESEND_TO_EMAIL_DEMO` → Email para demo
- `NEXT_PUBLIC_APP_URL` → URL del sitio (https://...)
- `NEXT_PUBLIC_IS_DEMO` → `true`

## 📂 Estructura del Proyecto

```
perruqueria-realejo/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home
│   ├── layout.tsx         # Layout raíz
│   ├── calculadora/        # Wizard de tarifas
│   ├── servicios/         # Catálogo de servicios
│   ├── filosofia/         # "Peluquería en positivo"
│   ├── galeria/          # Antes/después
│   ├── contacto/         # Mapa + WhatsApp
│   ├── legal/            # Aviso legal, privacidad, cookies
│   └── api/              # API routes
├── components/            # Componentes React
│   ├── calculator/       # Calculadora
│   ├── services/         # Servicios
│   └── layout/           # Nav, Footer, Banner
├── lib/                   # Utilidades
│   ├── db.ts            # Cliente Neon
│   ├── services.ts      # Helper servicios
│   └── email.ts         # Cliente Resend
├── supabase/             # SQL schema + seeds
│   ├── migrations/       # Esquema BD
│   └── seeds/           # Datos iniciales
└── public/              # Assets estáticos
    ├── favicon.png      # Huella de burbujas
    ├── header.png       # Logo
    └── patron.png       # Patrón decorativo
```

## 🎨 Identidad Visual

**Paleta "Burbuja Calma"**:
- Azul cielo (`#A8D8F0`) — Principal
- Crema (`#FFF8EE`) — Fondos
- Coral (`#E46972`) — Botones y CTAs
- Verde salvia (`#B7C9B5`) — Veganos y tratamientos
- Gris oscuro (`#46505A`) — Texto

**Tipografías**:
- Fraunces — Titulares emocionales
- Nunito Sans — Interfaz y cuerpo

## 🔒 Seguridad y Demo

**Restricciones legales**:
- `noindex, nofollow` en metadata (demo)
- Banner fijo: "Demo de propuesta — Por 2 Duros"
- Precios como "orientativos" (nunca oficiales en demo)
- Solo datos públicos verificables
- Teléfono/email como placeholders

**NO usar**:
- Logo real del cliente
- Fotos de su Instagram/Facebook
- Reseñas literales de Google
- Datos privados reales

## 📋 Checklist Paso a Producción

Cuando la clienta compre la demo:

1. **Quitar `noindex`**
   - Editar `/app/layout.tsx` → `metadata.robots.index: true`
   - Editar `/public/robots.txt`

2. **Sustituir placeholders**
   - Teléfono real: `6XX XXX XXX` → número real
   - Email real
   - Confirmar horario: L–V 10:00–17:45

3. **Fotos reales**
   - Reemplazar placeholders con fotos de su Instagram
   - Actualizar galería con antes/después

4. **Logo real**
   - Reemplazar wordmark con logo real (si desea)
   - O mantener tipográfico actual

5. **Precios reales**
   - Desde /admin, marcar `es_precio_real = true`
   - Etiqueta cambia a "desde X €"

6. **Dominio propio**
   - Sugerir: `perruqueriarealejo.com`
   - Configurar en Vercel

7. **Emails reales**
   - Cambiar `RESEND_TO_EMAIL_DEMO` → email real
   - Verificar dominio en Resend

8. **Quitar banner demo**
   - Eliminar `/components/layout/DemoBanner.tsx`

9. **Datos seed**
   - Eliminar reservas de ejemplo
   - Limpiar leads de prueba

10. **Transferir cuentas**
    - Neon → cuenta cliente
    - Resend → cuenta cliente
    - Vercel → cuenta cliente

## 📱 Criterios de Aceptación

- [ ] Calculadora completa en móvil <45s
- [ ] Rangos orientativos siempre visibles
- [ ] CTAs funcionales (reserva + WhatsApp)
- [ ] Navegación completa entre páginas
- [ ] Banner demo visible en todas las páginas
- [ ] `noindex` activo
- [ ] Build sin errores
- [ ] Desplegado en Vercel

## 🐛 Troubleshooting

### Build falla por DATABASE_URL

Si el build falla con error de BD:
- Verifica que `DATABASE_URL` está en `.env.local`
- Usa una URL dummy local para el build
- Las páginas con BD son dinámicas (`force-dynamic`)

### Error de Neon

Si obtienes "error connecting to database":
- Verifica tu connection string
- Confirma que el proyecto Neon existe
- Revisa que la BD esté activa en Neon Console

### Estilos no se aplican

- Verifica que Tailwind CSS esté configurado
- Limpia `.next` y vuelve a build
- Revisa `/app/globals.css`

## 📞 Soporte

Para cualquier cuestión sobre esta demo:

**Por 2 Duros**
- Web: [https://por2duros.com](https://por2duros.com)
- Email: hola@por2duros.com

---

**Estado**: Demo funcional — Pendiente aprobación cliente
**Fecha**: Junio 2024
**Versión**: 1.0
