# Portfolio 2026 — Rediseño desde cero (Design Doc)

**Fecha:** 2026-07-20
**Estado:** Aprobado por Joaquin en sesión de brainstorming
**Reemplaza a:** (1) el sitio viejo deployado en https://joaquinharofilipponportfolio.netlify.app/ y (2) el rebuild de mayo 2026 que quedó sin deployar en esta carpeta.

## 1. Contexto y objetivo

El portfolio deployado actual es la versión vieja: estilo oscuro con fondo de gato, exceso de animaciones y estilos mezclados, y proyectos web de bootcamp que ya no representan el perfil. Joaquin hoy se posiciona como **Salesforce Administrator & Developer** (CV 2026: pasantía InCompany, CloudAvengers, certificaciones Salesforce/Marketing Cloud).

Objetivo: un portfolio **profesional, sobrio y rápido**, con la paleta simple de Salesforce, construido con las tecnologías más recientes disponibles (julio 2026), que reemplace al sitio viejo en el mismo dominio de Netlify.

Decisión explícita del usuario: **empezar 100% de cero** (código y contenido se re-deciden; el rebuild de mayo se archiva, no se reutiliza).

## 2. Decisiones cerradas

| Tema | Decisión |
|---|---|
| Stack | Astro 7 (7.0.x, jul 2026) + Tailwind CSS 4.3 + TypeScript estricto. Sin framework JS de UI. |
| Idiomas | Bilingüe. `/` = inglés (default, sin prefijo), `/es/` = español. Toggle en header. Sin página selectora de idioma. |
| Dirección visual | **"Hero navy"**: banda hero navy oscura (`#032D60`) con texto blanco y CTA azul; resto del sitio blanco con headings navy y azul funcional. Look inspirado en salesforce.com. |
| Animaciones | Ninguna animación de entrada/scroll. Solo estados hover/focus y smooth scroll. `prefers-reduced-motion` respetado. |
| Contenido | Sale del CV 2026 (`joaquin-haro-filippon-salesforce-cv-2026.pdf`) sin novedades adicionales. No se inventa nada. |
| Hosting | Netlify, mismo sitio/dominio actual. Deploy automático desde GitHub (`main`). |
| Formulario | Netlify Forms + honeypot. Sin backend propio. |
| Código de mayo | Se archiva en `_archive/portfolio-mayo-2026.zip` (carpeta ignorada por git) antes de limpiar la carpeta. No se borra nada sin backup. |

## 3. Estructura del sitio (one-page)

Una sola página con scroll por idioma. Secciones en orden:

1. **Header** (fijo): nombre, links de navegación por anchor (Experience / Projects / Skills / Credentials / Contact), toggle EN·ES, CTA "Download CV". Menú hamburguesa en mobile (único JS del sitio, vanilla, ~1KB).
2. **Hero** (banda navy `#032D60`): eyebrow, H1 "Salesforce Administrator & Developer", pitch de 2 líneas, availability ("Remote from Argentina | Spanish native | English B2"), CTAs "View projects" (azul sólido) y "Download CV" (outline claro), fila de 3 métricas: `1+ year` experiencia / `800+ hrs` bootcamp / `3` credenciales.
3. **Experiencia** (timeline vertical): InCompany (Salesforce Administrator, pasantía, Nov 2025–May 2026), CloudAvengers (SF Developer & Admin, Nov 2024–Abr 2025), Infinitech (Computer Technician, Jun 2017–Ago 2021). Bullets del CV.
4. **Proyectos** (4 case studies, formato problema → solución → resultado): InCompany Quoting & Localization (privado), CloudAvengers Reporting & Automation (privado), CloudConsulting Project Management App (link GitHub), E-Learning Platform (link GitHub). Los privados llevan nota de confidencialidad.
5. **Skills** (4 grupos del CV): Salesforce Platform / CRM Data & Revenue Ops / Salesforce Development / Tools, Web & Marketing Cloud.
6. **Certificaciones**: Salesforce Certified Associate (link Trailblazer), Marketing Cloud Essentials 1 y 2 (Orange Academy), Bootcamp 800+ hrs (Plataforma 5 – CloudGaia).
7. **Contacto**: formulario (nombre, email, mensaje) + links directos: email, LinkedIn, GitHub, Trailblazer, WhatsApp.
8. **Footer**: copyright, nota de stack, links mínimos.

Extras: página **404 bilingüe** con link de vuelta; CV PDF servido desde `/docs/joaquin-haro-filippon-salesforce-cv-2026.pdf`.

## 4. Arquitectura técnica

### Rutas e i18n
- Astro i18n nativo: `defaultLocale: "en"`, `locales: ["en", "es"]`, default sin prefijo.
- `src/pages/index.astro` (EN) y `src/pages/es/index.astro` (ES): ambas renderizan los mismos componentes pasando el locale.
- `hreflang` alternates + canonical en el `<head>`. Sitemap con ambos idiomas.

### Capa de datos
- Todo el contenido (EN y ES) vive en `src/data/content.ts` tipado con TypeScript: un objeto por locale con el mismo shape, `as const`, tipo compartido. Links y datos de contacto centralizados en el mismo módulo.
- Los componentes solo reciben/leen datos tipados; cambiar textos nunca toca componentes.

### Componentes (uno por responsabilidad)
`SiteLayout` (head/SEO/skip-link) · `Header` · `Hero` · `SectionHeading` · `ExperienceTimeline` · `ProjectCards` · `SkillsGrid` · `Credentials` · `ContactSection` · `Footer`.

### Tokens de diseño (Tailwind 4 `@theme`, un solo lugar)
- Navy: `#032D60` (hero band, headings) · Azul: `#0176D3` (CTAs, links, acentos) · Azul hover: `#014486` · Tinta: `#181818` · Gris texto secundario: `#5B6B79` · Bordes: `#E4EAF0` · Fondos: blanco y `#F8FAFC`.
- Sin gradientes decorativos, sin sombras fuertes (máximo una sombra sutil en cards).
- Tipografía: **Inter variable self-hosted**: woff2 en `public/fonts/` + `@font-face` en el CSS global con `font-display: swap`. Sin requests a Google Fonts.

### Assets
- `astro:assets` para imágenes optimizadas. Imagen OG estática por idioma (1200×630, navy + texto). Favicon SVG nuevo (monograma "JH" navy/azul).

## 5. SEO, accesibilidad y performance

- Meta title/description por idioma; Open Graph + Twitter card; sitemap (`@astrojs/sitemap`); `hreflang`; canonical.
- Accesibilidad AA: contraste verificado (blanco sobre navy `#032D60` y azul `#0176D3` sobre blanco cumplen AA), skip link, focus visible, landmarks semánticos, formulario con labels reales.
- Performance: 100% estático, cero JS salvo menú móvil, fonts self-hosted con `font-display: swap`.

## 6. Deploy y ciclo de vida

1. `git init` + primer commit con este spec (hecho al aprobar el diseño).
2. Repo público `portfolio-2026` en GitHub (cuenta Keromon2k19).
3. Netlify conectado al repo: push a `main` → build (`npm run build`) → deploy al dominio existente `joaquinharofilipponportfolio.netlify.app`.
4. **Gate explícito:** el primer deploy que reemplaza al sitio viejo se hace solo con confirmación de Joaquin en ese momento.
5. `netlify.toml` con build command y headers de cache para assets.

## 7. Manejo de errores y edge cases

- **404**: página estática bilingüe (detecta por ruta `/es/*` para idioma) con link al home.
- **Formulario**: Netlify Forms con honeypot; al enviar, redirect a página de éxito estática (`/thanks/` en EN, `/es/gracias/` en ES); si Forms fallara, los links directos de contacto siguen visibles al lado del form.
- **Fonts**: fallback a system-ui si el woff2 no carga.
- **JS deshabilitado**: todo el contenido visible y navegable; sin JS la navegación queda siempre visible vía CSS (el botón hamburguesa solo se muestra cuando hay JS).

## 8. Criterios de aceptación

- [ ] Lighthouse ≥95 en Performance, Accessibility, Best Practices y SEO (ambos idiomas, mobile y desktop).
- [ ] `astro check` y `npm run build` sin errores ni warnings.
- [ ] QA visual: screenshots desktop y mobile de `/` y `/es/`, menú móvil funcionando.
- [ ] Formulario de contacto recibe submissions en Netlify.
- [ ] CV PDF descargable desde ambos idiomas.
- [ ] `hreflang`/canonical válidos; sitemap accesible.
- [ ] Cero animaciones de entrada; hover/focus consistentes.
- [ ] Repo GitHub público con README decente.

## 9. Fuera de alcance

- Blog, CMS, modo oscuro, analytics, dominio custom, testimonios, contenido nuevo no presente en el CV 2026, y cualquier framework/librería JS adicional.
