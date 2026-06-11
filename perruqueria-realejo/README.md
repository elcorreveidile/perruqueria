# Perruquería Canina Realejo — demo de propuesta comercial

Demo funcional de web para **Perruquería Canina Realejo** (C. Molinos 47, barrio del
Realejo, Granada): peluquería canina **en positivo**, con productos veganos. Construida
por [Por 2 Duros](https://por2duros.com) como propuesta — **no es el sitio oficial** y no
existe todavía relación contractual con el negocio.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Supabase (datos +
Auth) · Resend (emails) · Vercel (despliegue + cron).

## Qué incluye

- **Home** con el posicionamiento de marca («Sin prisas. Sin miedo. Sin estrés.»), prueba
  social genérica (4,7★), método, FAQ y mapa.
- **Catálogo de servicios** filtrable por categoría (13 servicios en 5 categorías), con
  ficha por servicio y tabla de precios orientativos.
- **Calculadora de tarifas** (pieza estrella): wizard de 4 pasos → rango orientativo +
  duración + CTA a reserva o WhatsApp con resumen precargado + envío por email.
- **Reservas online** con calendario real: huecos generados desde reglas de
  disponibilidad − bloqueos − citas, margen entre citas, antelación mínima y horizonte
  máximo configurables. **Anti-solapamiento garantizado a nivel de base de datos**
  (constraint de exclusión de Postgres). Cancelación por enlace tokenizado y lista de
  espera con aviso automático.
- **Fidelización automática:** recordatorio 24 h antes (Vercel Cron + Resend) y
  «recurrencia inteligente»: al marcar una cita como completada se programa el email «a
  [perro] ya le toca» con re-reserva en un clic.
- **/admin** (Supabase Auth): agenda semanal, confirmar/cancelar/completar/no-show,
  bloqueos de vacaciones en dos toques, CRUD de servicios y matriz de precios, leads con
  export CSV, panel de previsualización de emails programados y ajustes.
- **Modo demo transparente:** `noindex` + `robots.txt` bloqueado, banner fijo de demo,
  todos los emails desviados a una dirección de pruebas, registros con `demo = true`.

> La web pública funciona **incluso sin Supabase configurado** (usa los datos de muestra
> embebidos de `lib/seed-data.ts`); el panel /admin y la persistencia requieren Supabase.

## Instalación

```bash
npm install
cp .env.example .env.local   # rellena las variables
npm run dev
```


### Despliegue en Vercel

El código de Next.js vive en `perruqueria-realejo/`, pero el repositorio se puede
importar en Vercel desde la raíz. Para evitar despliegues vacíos/404 cuando el
proyecto de Vercel apunta al root del repo, la raíz incluye `package.json` y
`vercel.json` que delegan la instalación y el build a `perruqueria-realejo/` y
publican `perruqueria-realejo/.next`.

Si en Vercel se configura **Root Directory = `perruqueria-realejo`**, también
funciona: se usará el `vercel.json` de esa carpeta con el mismo cron.

### Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima (solo para Auth del panel) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave service_role (solo servidor) |
| `RESEND_API_KEY` | API key de Resend |
| `EMAIL_FROM` | Remitente verificado en Resend |
| `DEMO_MODE` | `true` (por defecto): desvía todos los emails |
| `DEMO_EMAIL_TO` | Dirección de pruebas que recibe todo en demo |
| `CRON_SECRET` | Protege `/api/cron/emails` |
| `NEXT_PUBLIC_SITE_URL` | URL pública del despliegue |
| `NEXT_PUBLIC_WHATSAPP` | Número de WhatsApp (placeholder en demo) |

### Base de datos (Supabase)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En el editor SQL ejecuta, por este orden:
   - `supabase/migrations/0001_schema.sql` (esquema + constraint anti-solapamiento + RLS)
   - `supabase/seed.sql` (13 servicios, matriz de precios completa, horario L–V
     10:00–17:45 y 7 reservas de ejemplo en distintos estados)
3. Crea la usuaria admin: **Authentication → Users → Add user**
   - Email: `demo@por2duros.com` · Contraseña: `PerruqueriaDemo2026!` · Auto-confirm ✔
   - (Credenciales de demo: cámbialas en cuanto la propuesta esté enseñada.)

### Cron de recordatorios

`vercel.json` define un cron diario (08:00 UTC) que llama a `/api/cron/emails`: procesa
los `scheduled_emails` pendientes (recordatorios 24 h y recurrencia). Vercel envía
automáticamente `Authorization: Bearer $CRON_SECRET`. Para probarlo en local:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/emails
```

## Restricciones de la demo (importante)

- **Ni una imagen, logo o texto** procede del Instagram/Facebook del negocio: identidad
  visual original «Burbuja Calma» (huella de cinco burbujas) y fotos de stock marcadas
  «imagen de muestra».
- Solo datos públicos verificables: dirección, nombre comercial, posicionamiento «en
  positivo» y productos veganos. Teléfono y horario son **placeholders**.
- **Ningún precio es tarifa oficial**: todos los rangos llevan la etiqueta «orientativo»
  (hasta que Cristina marque `es_precio_real = true` desde /admin, que pasa la etiqueta a
  «desde X €»).
- Las reseñas de Google no se reproducen literalmente (solo «4,7★, los peludos repiten»).
- Formularios funcionales con aviso de demo; datos marcados `demo = true`, purgables.

## Checklist de paso a producción

- [ ] Quitar `robots: noindex` en `app/layout.tsx` y sustituir `public/robots.txt` por uno permisivo + sitemap.
- [ ] Quitar el banner de demo (`components/layout/DemoBanner.tsx`) y los avisos «demo» de reservas/calculadora/legal.
- [ ] `DEMO_MODE=false` y remitente de Resend con dominio propio verificado.
- [ ] Confirmar con Cristina teléfono, WhatsApp real y horario; sustituir placeholders (`lib/site.ts`, `.env`).
- [ ] Sustituir las fotos de stock por fotos reales de su Instagram (310 publicaciones: su mejor activo) con permiso de las familias.
- [ ] Completar los textos legales con los datos reales del titular (RGPD/LSSI).
- [ ] Revisar la matriz de precios con Cristina y marcar `es_precio_real` donde proceda.
- [ ] Dominio propio sugerido: `perruqueriarealejo.com` o similar — **comprobar disponibilidad, no comprar sin su OK**.
- [ ] Purgar los datos de prueba (`delete from bookings where demo; delete from leads where demo; …`).
- [ ] Cambiar las credenciales del admin y el `CRON_SECRET`.

## Mejoras post-venta (argumentos comerciales)

- **SEO local**: ahora mismo el negocio es invisible en Google fuera de directorios; la
  web está preparada (schema.org LocalBusiness + FAQPage, metadatos completos) para
  posicionar «peluquería canina Granada / Realejo» en cuanto se quite el noindex.
- **Feed de Instagram real** en la galería (sus 310 publicaciones).
- **Recordatorios por WhatsApp**: requiere WhatsApp Business API (coste y verificación);
  en la demo el canal de recordatorio es el email.
- **Versión en inglés**: el Realejo tiene muchos residentes internacionales; la
  estructura ya está preparada para i18n.
- Pagos online / señal (Stripe) si algún día interesa: fuera de la v1 a propósito.

## Credenciales de la demo

| Qué | Valor |
| --- | --- |
| Panel admin | `/admin` |
| Usuaria | `demo@por2duros.com` |
| Contraseña | `PerruqueriaDemo2026!` |

## Criterios de aceptación cubiertos

- Calculadora completa en móvil < 45 s y termina siempre en CTA de reserva/WhatsApp.
- Reserva completa en móvil < 90 s.
- Imposible duplicar un hueco (constraint `bookings_sin_solape`, probado con intentos simultáneos: el segundo recibe 409).
- Cristina puede confirmar/cancelar citas, bloquear vacaciones y ver la ficha del perro desde el móvil.
- Completar una cita programa el email de recurrencia (visible en /admin/emails) con re-reserva en un clic.
- Cron de recordatorios extremo a extremo en modo demo.
- CRUD de servicios y precios sin tocar código.
- Ningún precio sin etiqueta «orientativo» salvo `es_precio_real = true`.
- noindex + banner de demo en todas las páginas.
