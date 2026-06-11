# Secciones Extraídas de imgs.png

Imágenes individuales descompuestas del mockup original `imgs.png`.

## Archivos Generados

| Archivo | Dimensiones | Uso en Home | Sección Correspondiente |
|---------|-------------|-------------|------------------------|
| `section-1-hero.png` | 1536x460px | Hero Section | Líneas 15-115 de `app/page.tsx` |
| `section-2-servicios.png` | 1536x150px | Sección Servicios | Líneas 117-211 de `app/page.tsx` |
| `section-3-elegirnos.png` | 1536x150px | "Por qué elegirnos" | Líneas 118-211 de `app/page.tsx` |
| `section-4-cristina.png` | 1536x150px | Cristina y su método | Líneas 213-257 de `app/page.tsx` |
| `section-5-contacto.png` | 1536x114px | Contacto + CTA final | Líneas 259-284 de `app/page.tsx` |

## Integración en `app/page.tsx`

Estas imágenes son **mockups de referencia** para el diseño. La implementación actual usa:

- **Hero**: `<Image src="/imgs.png" alt="Perro relajado" />` (línea 107)
- **Grid de servicios**: Componentes HTML con Tailwind (líneas 126-209)
- **Cristina**: Texto + trust badges (líneas 216-256)
- **CTA final**: Componentes HTML (líneas 260-284)

## Próximos Pasos

1. **Decidir enfoque**:
   - **Opción A**: Usar las imágenes como referencia visual para replicar el diseño con HTML/CSS
   - **Opción B**: Insertar las imágenes directamente como `<img>` decorativos
   - **Opción C**: Híbrido (algunas secciones con imágenes, otras con HTML)

2. **Optimización para web** (si se usa Opción B):
   - Reducir tamaño de archivos (actualmente 728K + 254K + 295K + 250K + 138K = 1.6MB)
   - Convertir a WebP con calidad reducida
   - Considerar lazy loading para secciones inferiores

3. **Responsive**:
   - Las imágenes actuales son fijas 1536px de ancho
   - Necesitar versiones móviles (<768px) o implementación fluida

## Notas Técnicas

- Extraído usando ImageMagick: `convert imgs.png -crop [ancho]x[alto]+[x]+[y] +repage`
- Coordenadas aproximadas basadas en análisis visual del mockup
- La sección 6 (footer) parece estar incluida en la sección 5 o es muy pequeña

---
*Generado automáticamente desde imgs.png (1536x1024)*
