# Portfolio 2026 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir de cero el portfolio bilingüe (EN default, ES) de Joaquin Haro Filippon con Astro 7 + Tailwind 4.3, dirección visual "Hero navy" (paleta Salesforce), 100% estático, y dejarlo listo para deploy en Netlify reemplazando el sitio viejo.

**Architecture:** Sitio one-page por idioma (`/` EN, `/es/` ES) generado estáticamente. Todo el contenido vive tipado en `src/data/content.ts`; los componentes Astro solo renderizan datos. Cero JavaScript de framework — el único JS del sitio es el toggle del menú móvil. Tokens de color en `@theme` de Tailwind 4.

**Tech Stack:** Astro 7 (7.0.x), Tailwind CSS 4.3 (`@tailwindcss/vite`), TypeScript estricto, `@astrojs/sitemap`, `@astrojs/check`, Inter variable self-hosted, Netlify (hosting + Forms), sharp (solo devDep para generar imágenes OG una vez).

**Spec de referencia:** `docs/superpowers/specs/2026-07-20-portfolio-redesign-design.md` — leerlo antes de empezar.

**Contexto del entorno:** Windows 11, PowerShell como shell primario (no existe `&&` en PowerShell 5.1 — usar `;` o líneas separadas). El repo git ya está iniciado en la raíz con el spec commiteado. La carpeta contiene un proyecto Astro viejo de mayo 2026 que hay que archivar primero (Task 1). El CV PDF `public/docs/joaquin-haro-filippon-salesforce-cv-2026.pdf` DEBE sobrevivir a la limpieza.

---

## File Structure (estado final)

```
Portfolio 2026/
├── .claude/launch.json            # config del dev server para el preview del harness (gitignored)
├── .gitignore
├── _archive/                      # zip del proyecto viejo (gitignored)
├── astro.config.mjs               # i18n + sitemap + tailwind vite plugin
├── netlify.toml                   # build + headers de cache
├── package.json
├── tsconfig.json
├── README.md
├── docs/superpowers/...           # spec y este plan
├── public/
│   ├── docs/joaquin-haro-filippon-salesforce-cv-2026.pdf
│   ├── favicon.svg
│   ├── fonts/InterVariable.woff2
│   ├── og/og-en.png  og/og-es.png
│   └── robots.txt
├── scripts/generate-og.mjs        # genera los PNG OG con sharp (se corre una vez)
└── src/
    ├── data/content.ts            # TODO el contenido EN/ES tipado
    ├── styles/global.css          # tailwind + @theme tokens + @font-face
    ├── components/
    │   ├── SiteLayout.astro       # <head>, SEO, hreflang, skip-link, footer
    │   ├── Header.astro           # nav fija + toggle EN·ES + menú móvil (único JS)
    │   ├── Hero.astro             # banda navy
    │   ├── SectionHeading.astro   # kicker + h2 reutilizable
    │   ├── ExperienceTimeline.astro
    │   ├── ProjectCards.astro
    │   ├── SkillsGrid.astro
    │   ├── Credentials.astro
    │   ├── ContactSection.astro   # form Netlify + links directos
    │   └── Icon.astro             # SVGs inline (sin dependencia de iconos)
    └── pages/
        ├── index.astro            # EN
        ├── 404.astro
        ├── thanks.astro
        └── es/
            ├── index.astro        # ES
            └── gracias.astro
```

Cada componente tiene una sola responsabilidad. `content.ts` es la única fuente de textos: ningún componente hardcodea copy.

---

### Task 1: Archivar el proyecto de mayo y limpiar la carpeta

**Files:**
- Create: `_archive/portfolio-mayo-2026.zip`
- Modify: `.gitignore`
- Delete: todo el proyecto viejo salvo `.git/`, `docs/`, `_archive/` y el CV PDF

- [ ] **Step 1: Verificar estado limpio de git**

Run (PowerShell): `git status --short`
Expected: sin salida (working tree limpio). Si hay cambios sin commitear, detenerse y revisar.

- [ ] **Step 2: Crear el zip de archivo del proyecto viejo**

Run (PowerShell, desde la raíz del proyecto):
```powershell
New-Item -ItemType Directory -Force _archive
Compress-Archive -Path src, public, qa, astro.config.mjs, postcss.config.mjs, tsconfig.json, package.json, package-lock.json, README.md, netlify.toml -DestinationPath _archive/portfolio-mayo-2026.zip -Force
```
Expected: sin errores.

- [ ] **Step 3: Verificar el zip**

Run: `(Get-Item _archive/portfolio-mayo-2026.zip).Length -gt 100000`
Expected: `True` (el zip pesa >100KB porque incluye screenshots de qa).

- [ ] **Step 4: Rescatar el CV PDF antes de borrar**

Run:
```powershell
New-Item -ItemType Directory -Force _archive/keep
Copy-Item "public/docs/joaquin-haro-filippon-salesforce-cv-2026.pdf" _archive/keep/
```
Expected: `Test-Path _archive/keep/joaquin-haro-filippon-salesforce-cv-2026.pdf` devuelve `True`.

- [ ] **Step 5: Borrar el proyecto viejo**

Run:
```powershell
Remove-Item -Recurse -Force src, public, qa, dist, .astro, node_modules -ErrorAction SilentlyContinue
Remove-Item -Force astro.config.mjs, postcss.config.mjs, tsconfig.json, package.json, package-lock.json, README.md, netlify.toml, astro-dev.err.log, astro-dev.out.log, astro-preview.err.log, astro-preview.out.log -ErrorAction SilentlyContinue
```
Expected: `Get-ChildItem` muestra solo `.claude`, `.git` (oculto), `_archive`, `docs`, `.gitignore`.

- [ ] **Step 6: Actualizar .gitignore**

Reemplazar el contenido completo de `.gitignore` por:
```gitignore
node_modules/
dist/
.astro/

qa/
*.log

.env
.env.*

_archive/
.claude/
```

- [ ] **Step 7: Commit**

```powershell
git add .gitignore
git commit -m "chore: archivar proyecto de mayo 2026 y limpiar carpeta"
```
Expected: commit creado. Nota: el borrado no aparece en git porque el proyecto viejo nunca estuvo trackeado.

---

### Task 2: Scaffold Astro 7 + Tailwind 4.3

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `netlify.toml`, `.claude/launch.json`, `public/robots.txt`, `public/docs/` (restaurar CV)

- [ ] **Step 1: Verificar Node**

Run: `node -v`
Expected: `v22.12.0` o superior (idealmente v24.x). Si es menor, detenerse y avisar al usuario.

- [ ] **Step 2: Crear package.json**

Crear `package.json`:
```json
{
  "name": "joaquin-haro-filippon-portfolio",
  "version": "2.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev --host 127.0.0.1",
    "build": "astro check && astro build",
    "preview": "astro preview --host 127.0.0.1",
    "generate:og": "node scripts/generate-og.mjs"
  },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.2",
    "@tailwindcss/vite": "^4.3.3",
    "astro": "^7.0.9",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.9",
    "sharp": "^0.34.0",
    "typescript": "^5.9.3"
  }
}
```

- [ ] **Step 3: Crear astro.config.mjs**

```js
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://joaquinharofilipponportfolio.netlify.app",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Fallback documentado:** si `npm install` falla por incompatibilidad de `@tailwindcss/vite` con Vite 8/Rolldown (peer dependency error), usar la vía PostCSS: quitar `@tailwindcss/vite` de deps y del config, agregar `"@tailwindcss/postcss": "^4.3.3"` a dependencies y crear `postcss.config.mjs` con:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

- [ ] **Step 4: Crear tsconfig.json**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "src/**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: Crear netlify.toml**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "24"

[[headers]]
  for = "/fonts/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

- [ ] **Step 6: Crear public/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://joaquinharofilipponportfolio.netlify.app/sitemap-index.xml
```

- [ ] **Step 7: Restaurar el CV PDF**

```powershell
New-Item -ItemType Directory -Force public/docs
Copy-Item _archive/keep/joaquin-haro-filippon-salesforce-cv-2026.pdf public/docs/
```
Expected: `Test-Path public/docs/joaquin-haro-filippon-salesforce-cv-2026.pdf` → `True`.

- [ ] **Step 8: Crear .claude/launch.json** (config del preview del harness; gitignored)

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "portfolio",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 4321
    }
  ]
}
```

- [ ] **Step 9: Instalar dependencias**

Run: `npm install`
Expected: termina sin errores (warnings de deprecation son aceptables). Si falla por peers de Tailwind/Vite, aplicar el fallback del Step 3 y reintentar.

- [ ] **Step 10: Descargar Inter variable**

```powershell
New-Item -ItemType Directory -Force public/fonts
curl.exe -L -o public/fonts/InterVariable.woff2 https://rsms.me/inter/font-files/InterVariable.woff2
(Get-Item public/fonts/InterVariable.woff2).Length -gt 100000
```
Expected: `True` (el archivo pesa ~340KB). Si la URL falla, bajar el zip del último release de https://github.com/rsms/inter/releases y extraer `InterVariable.woff2`.

- [ ] **Step 11: Commit**

```powershell
git add package.json package-lock.json astro.config.mjs tsconfig.json netlify.toml public/robots.txt public/fonts/InterVariable.woff2 public/docs/joaquin-haro-filippon-salesforce-cv-2026.pdf
git commit -m "chore: scaffold Astro 7 + Tailwind 4.3 + config de deploy"
```

---

### Task 3: Capa de datos — content.ts completo

**Files:**
- Create: `src/data/content.ts`

- [ ] **Step 1: Crear src/data/content.ts con este contenido exacto**

```ts
export type Locale = "en" | "es";

export const links = {
  email: "mailto:joaquinharofilippon@gmail.com",
  github: "https://github.com/Keromon2k19",
  linkedin: "https://www.linkedin.com/in/joaquin-haro-filippon-a05967191/",
  trailblazer: "https://www.salesforce.com/trailblazer/jharofilippon",
  whatsapp: "https://wa.me/542945699379",
  cv: "/docs/joaquin-haro-filippon-salesforce-cv-2026.pdf",
  repoCloudConsulting: "https://github.com/Keromon2k19/CloudConsulting",
  repoELearning: "https://github.com/Keromon2k19/E-learning-Platform",
} as const;

export interface ExperienceItem {
  role: string;
  company: string;
  dates: string;
  place: string;
  bullets: readonly string[];
}

export interface ProjectItem {
  name: string;
  type: string;
  problem: string;
  solution: string;
  result: string;
  private?: string;
  repo?: string;
}

export interface SkillGroup {
  name: string;
  items: readonly string[];
}

export interface CredentialItem {
  name: string;
  issuer: string;
  detail: string;
  link?: string;
  linkLabel?: string;
}

export interface SiteContent {
  meta: {
    title: string;
    description: string;
    path: string;
    altPath: string;
    altLabel: string;
    ogImage: string;
  };
  nav: {
    experience: string;
    projects: string;
    skills: string;
    credentials: string;
    contact: string;
    cv: string;
    menuLabel: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    availability: string;
    ctaProjects: string;
    ctaCv: string;
    stats: readonly { value: string; label: string }[];
  };
  experience: {
    kicker: string;
    title: string;
    items: readonly ExperienceItem[];
  };
  projects: {
    kicker: string;
    title: string;
    note: string;
    repoLabel: string;
    labels: { problem: string; solution: string; result: string };
    items: readonly ProjectItem[];
  };
  skills: {
    kicker: string;
    title: string;
    groups: readonly SkillGroup[];
  };
  credentials: {
    kicker: string;
    title: string;
    items: readonly CredentialItem[];
  };
  contact: {
    kicker: string;
    title: string;
    body: string;
    directTitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
      action: string;
    };
  };
  footer: {
    note: string;
  };
}

export const content: Record<Locale, SiteContent> = {
  en: {
    meta: {
      title: "Joaquin Haro Filippon — Salesforce Administrator & Developer",
      description:
        "Salesforce Administrator & Developer from Argentina. CRM data quality, Flows, reporting, documentation, and Spanish localization for real orgs.",
      path: "/",
      altPath: "/es/",
      altLabel: "Español",
      ogImage: "/og/og-en.png",
    },
    nav: {
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      credentials: "Credentials",
      contact: "Contact",
      cv: "Download CV",
      menuLabel: "Toggle menu",
    },
    hero: {
      eyebrow: "Salesforce portfolio",
      title: "Salesforce Administrator & Developer",
      lead: "I build CRM systems teams can actually operate: clean data models, Flow automation, reporting, and documentation — in English and Spanish.",
      availability: "Remote from Argentina · Spanish native · English B2",
      ctaProjects: "View projects",
      ctaCv: "Download CV",
      stats: [
        { value: "1+ year", label: "hands-on Salesforce experience" },
        { value: "800+ hrs", label: "intensive Salesforce training" },
        { value: "3", label: "Salesforce & Marketing Cloud credentials" },
      ],
    },
    experience: {
      kicker: "Experience",
      title: "Recent Salesforce work",
      items: [
        {
          role: "Salesforce Administrator",
          company: "InCompany",
          dates: "Nov 2025 – May 2026",
          place: "Remote · Internship",
          bullets: [
            "Audited and corrected record data across multiple objects, resolving inconsistencies and duplicates to restore reporting integrity.",
            "Designed and deployed custom objects and fields to model quoting and operational workflows.",
            "Restructured Account page layouts for sales and ops teams, surfacing critical data earlier in the view.",
            "Wrote end-to-end documentation for a production quoting system used daily by non-technical teams.",
            "Localized the org into Spanish: custom labels, field names, and UI components.",
          ],
        },
        {
          role: "Salesforce Developer & Administrator",
          company: "CloudAvengers",
          dates: "Nov 2024 – Apr 2025",
          place: "Remote",
          bullets: [
            "Built and maintained custom data architecture for end-to-end business process tracking in a client org.",
            "Delivered a reporting and dashboards layer, rebuilt iteratively as requirements evolved across sprints.",
            "Implemented and tested Flow automations within a two-week Agile sprint cadence.",
          ],
        },
        {
          role: "Computer Technician",
          company: "Infinitech",
          dates: "Jun 2017 – Aug 2021",
          place: "Esquel, Chubut",
          bullets: [
            "Diagnosed and resolved hardware and software issues for a high-volume client base, from intake to resolution.",
            "Served as primary technical contact, translating technical problems into plain-language next steps.",
          ],
        },
      ],
    },
    projects: {
      kicker: "Projects",
      title: "Salesforce case studies",
      note: "Private production work is summarized without exposing client data.",
      repoLabel: "View repo on GitHub",
      labels: { problem: "Problem", solution: "Solution", result: "Result" },
      items: [
        {
          name: "Quoting & Localization Support",
          type: "Production org · InCompany",
          problem:
            "Sales and ops teams needed cleaner record data, documentation for their quoting system, and a Spanish interface.",
          solution:
            "Configured custom objects and fields, improved Account layouts, corrected records, localized metadata, and wrote end-to-end documentation.",
          result:
            "Non-technical users got a clear operating reference, and reporting became easier to trust.",
          private: "Private production work — no public repo.",
        },
        {
          name: "Reporting & Automation Layer",
          type: "Client org · CloudAvengers",
          problem:
            "Stakeholders needed reliable visibility into operational metrics while requirements kept evolving.",
          solution:
            "Designed object relationships, reports, dashboards, and Flow automation, iterating inside an Agile cadence.",
          result:
            "The org gained a useful reporting layer and a configurable automation foundation.",
          private: "Client work summarized without sensitive details.",
        },
        {
          name: "CloudConsulting Project Management App",
          type: "Implementation project · Bootcamp",
          problem:
            "A real client had project and resource data scattered across multiple sources.",
          solution:
            "Built a Salesforce project management app with custom objects, Flows, reports, dashboards, and Apex, in a 3-person Scrum team.",
          result:
            "Shipped a unified org for project visibility within a 6-week delivery window.",
          repo: links.repoCloudConsulting,
        },
        {
          name: "E-Learning Platform",
          type: "Configuration project · Bootcamp",
          problem:
            "Students and teachers needed separate access to courses, enrollments, and progress data.",
          solution:
            "Modeled course data with custom objects and enforced role-based access with profiles, permission sets, and validation rules.",
          result:
            "A role-aware org with progress dashboards and strong data integrity rules.",
          repo: links.repoELearning,
        },
      ],
    },
    skills: {
      kicker: "Skills",
      title: "Skills backed by real work",
      groups: [
        {
          name: "Salesforce Platform",
          items: [
            "Custom objects & fields",
            "Page layouts",
            "Flows & process automation",
            "Validation rules",
            "Reports & dashboards",
            "Profiles & permission sets",
            "Translations & localization",
          ],
        },
        {
          name: "CRM Data & Revenue Ops",
          items: [
            "Data quality & record correction",
            "Data management",
            "Segmentation support",
            "Systems documentation",
            "Stakeholder communication",
          ],
        },
        {
          name: "Salesforce Development",
          items: [
            "Apex",
            "SOQL",
            "Integration fundamentals",
            "Custom business logic",
            "Declarative automation",
          ],
        },
        {
          name: "Tools, Web & Marketing Cloud",
          items: [
            "GitHub · VS Code",
            "Agile / Scrum · Trello",
            "Modern AI tools",
            "HTML · CSS · JavaScript",
            "Email Studio · Journey Builder",
          ],
        },
      ],
    },
    credentials: {
      kicker: "Credentials",
      title: "Certifications & training",
      items: [
        {
          name: "Salesforce Certified Associate",
          issuer: "Salesforce",
          detail: "Platform fundamentals, verified credential.",
          link: links.trailblazer,
          linkLabel: "View Trailblazer profile",
        },
        {
          name: "Marketing Cloud Essentials — Level 1",
          issuer: "Orange Academy",
          detail: "Email Studio and Marketing Cloud fundamentals.",
        },
        {
          name: "Marketing Cloud Essentials — Level 2",
          issuer: "Orange Academy",
          detail: "Journey design and applied Marketing Cloud practice.",
        },
        {
          name: "Salesforce Developer Bootcamp — 800+ hours",
          issuer: "Plataforma 5 – CloudGaia",
          detail: "Intensive admin & development training with real client delivery.",
        },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Let's talk Salesforce",
      body: "Best fit: Salesforce Admin/Developer roles involving CRM cleanup, reporting, Flows, documentation, and localization.",
      directTitle: "Direct links",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send message",
        action: "/thanks/",
      },
    },
    footer: {
      note: "Static site built with Astro, TypeScript, and Tailwind CSS.",
    },
  },
  es: {
    meta: {
      title: "Joaquin Haro Filippon — Salesforce Administrator & Developer",
      description:
        "Salesforce Administrator & Developer desde Argentina. Calidad de datos CRM, Flows, reporting, documentación y localización al español para orgs reales.",
      path: "/es/",
      altPath: "/",
      altLabel: "English",
      ogImage: "/og/og-es.png",
    },
    nav: {
      experience: "Experiencia",
      projects: "Proyectos",
      skills: "Skills",
      credentials: "Credenciales",
      contact: "Contacto",
      cv: "Descargar CV",
      menuLabel: "Abrir menú",
    },
    hero: {
      eyebrow: "Portfolio Salesforce",
      title: "Salesforce Administrator & Developer",
      lead: "Construyo sistemas CRM que los equipos pueden operar de verdad: modelos de datos limpios, automatización con Flows, reporting y documentación — en inglés y español.",
      availability: "Remoto desde Argentina · Español nativo · Inglés B2",
      ctaProjects: "Ver proyectos",
      ctaCv: "Descargar CV",
      stats: [
        { value: "1+ año", label: "de experiencia práctica en Salesforce" },
        { value: "800+ hs", label: "de formación intensiva Salesforce" },
        { value: "3", label: "credenciales Salesforce y Marketing Cloud" },
      ],
    },
    experience: {
      kicker: "Experiencia",
      title: "Trabajo Salesforce reciente",
      items: [
        {
          role: "Salesforce Administrator",
          company: "InCompany",
          dates: "Nov 2025 – May 2026",
          place: "Remoto · Pasantía",
          bullets: [
            "Audité y corregí datos de registros en múltiples objetos, resolviendo inconsistencias y duplicados para restaurar la integridad del reporting.",
            "Diseñé y desplegué objetos y campos custom para modelar flujos de cotización y operaciones.",
            "Reestructuré page layouts de Account para ventas y operaciones, priorizando los datos críticos.",
            "Escribí documentación end-to-end de un sistema de cotizaciones en producción, usado a diario por equipos no técnicos.",
            "Localicé la org al español: custom labels, nombres de campos y componentes de UI.",
          ],
        },
        {
          role: "Salesforce Developer & Administrator",
          company: "CloudAvengers",
          dates: "Nov 2024 – Abr 2025",
          place: "Remoto",
          bullets: [
            "Construí y mantuve arquitectura de datos custom para el seguimiento de procesos de negocio en una org de cliente.",
            "Entregué una capa de reportes y dashboards, iterada a medida que evolucionaban los requerimientos.",
            "Implementé y probé automatizaciones con Flows en sprints Agile de dos semanas.",
          ],
        },
        {
          role: "Técnico informático",
          company: "Infinitech",
          dates: "Jun 2017 – Ago 2021",
          place: "Esquel, Chubut",
          bullets: [
            "Diagnostiqué y resolví problemas de hardware y software para una base alta de clientes, de la recepción a la entrega.",
            "Fui el contacto técnico principal, traduciendo problemas técnicos a próximos pasos en lenguaje claro.",
          ],
        },
      ],
    },
    projects: {
      kicker: "Proyectos",
      title: "Casos de estudio Salesforce",
      note: "El trabajo privado en producción se resume sin exponer datos de clientes.",
      repoLabel: "Ver repo en GitHub",
      labels: { problem: "Problema", solution: "Solución", result: "Resultado" },
      items: [
        {
          name: "Quoting & Localization Support",
          type: "Org en producción · InCompany",
          problem:
            "Ventas y operaciones necesitaban datos más limpios, documentación del sistema de cotizaciones y una interfaz en español.",
          solution:
            "Configuré objetos y campos custom, mejoré layouts de Account, corregí registros, localicé metadata y escribí documentación end-to-end.",
          result:
            "Los usuarios no técnicos ganaron una referencia clara de operación y el reporting se volvió confiable.",
          private: "Trabajo privado en producción — sin repo público.",
        },
        {
          name: "Reporting & Automation Layer",
          type: "Org de cliente · CloudAvengers",
          problem:
            "Los stakeholders necesitaban visibilidad confiable de métricas operativas con requerimientos en evolución.",
          solution:
            "Diseñé relaciones de objetos, reportes, dashboards y automatización con Flows, iterando en cadencia Agile.",
          result:
            "La org ganó una capa de reporting útil y una base de automatización configurable.",
          private: "Trabajo de cliente resumido sin detalles sensibles.",
        },
        {
          name: "CloudConsulting Project Management App",
          type: "Proyecto de implementación · Bootcamp",
          problem:
            "Un cliente real tenía datos de proyectos y recursos dispersos en múltiples fuentes.",
          solution:
            "Construimos una app de project management en Salesforce con objetos custom, Flows, reportes, dashboards y Apex, en un equipo Scrum de 3.",
          result:
            "Entregamos una org unificada para visibilidad de proyectos en una ventana de 6 semanas.",
          repo: links.repoCloudConsulting,
        },
        {
          name: "E-Learning Platform",
          type: "Proyecto de configuración · Bootcamp",
          problem:
            "Estudiantes y docentes necesitaban acceso separado a cursos, inscripciones y progreso.",
          solution:
            "Modelé los datos de cursos con objetos custom y apliqué acceso por rol con profiles, permission sets y validation rules.",
          result:
            "Una org con roles bien separados, dashboards de progreso y reglas fuertes de integridad de datos.",
          repo: links.repoELearning,
        },
      ],
    },
    skills: {
      kicker: "Skills",
      title: "Skills respaldadas por trabajo real",
      groups: [
        {
          name: "Salesforce Platform",
          items: [
            "Objetos y campos custom",
            "Page layouts",
            "Flows y automatización",
            "Validation rules",
            "Reportes y dashboards",
            "Profiles y permission sets",
            "Traducciones y localización",
          ],
        },
        {
          name: "Datos CRM & Revenue Ops",
          items: [
            "Calidad de datos y corrección de registros",
            "Gestión de datos",
            "Soporte de segmentación",
            "Documentación de sistemas",
            "Comunicación con stakeholders",
          ],
        },
        {
          name: "Desarrollo Salesforce",
          items: [
            "Apex",
            "SOQL",
            "Fundamentos de integración",
            "Lógica de negocio custom",
            "Automatización declarativa",
          ],
        },
        {
          name: "Herramientas, Web & Marketing Cloud",
          items: [
            "GitHub · VS Code",
            "Agile / Scrum · Trello",
            "Herramientas modernas de IA",
            "HTML · CSS · JavaScript",
            "Email Studio · Journey Builder",
          ],
        },
      ],
    },
    credentials: {
      kicker: "Credenciales",
      title: "Certificaciones y formación",
      items: [
        {
          name: "Salesforce Certified Associate",
          issuer: "Salesforce",
          detail: "Fundamentos de plataforma, credencial verificada.",
          link: links.trailblazer,
          linkLabel: "Ver perfil Trailblazer",
        },
        {
          name: "Marketing Cloud Essentials — Nivel 1",
          issuer: "Orange Academy",
          detail: "Fundamentos de Email Studio y Marketing Cloud.",
        },
        {
          name: "Marketing Cloud Essentials — Nivel 2",
          issuer: "Orange Academy",
          detail: "Diseño de journeys y práctica aplicada en Marketing Cloud.",
        },
        {
          name: "Salesforce Developer Bootcamp — 800+ horas",
          issuer: "Plataforma 5 – CloudGaia",
          detail: "Formación intensiva en administración y desarrollo con entrega a cliente real.",
        },
      ],
    },
    contact: {
      kicker: "Contacto",
      title: "Hablemos de Salesforce",
      body: "Mejor fit: roles Salesforce Admin/Developer con limpieza de CRM, reporting, Flows, documentación y localización.",
      directTitle: "Links directos",
      form: {
        name: "Nombre",
        email: "Email",
        message: "Mensaje",
        submit: "Enviar mensaje",
        action: "/es/gracias/",
      },
    },
    footer: {
      note: "Sitio estático construido con Astro, TypeScript y Tailwind CSS.",
    },
  },
} as const;

export const shared = {
  name: "Joaquin Haro Filippon",
  email: "joaquinharofilippon@gmail.com",
  location: "Argentina",
} as const;
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: sin errores. (Aún no hay componentes; esto valida solo content.ts.)

- [ ] **Step 3: Commit**

```powershell
git add src/data/content.ts
git commit -m "feat: capa de datos bilingue tipada (contenido del CV 2026)"
```

---

### Task 4: Tokens, tipografía y SiteLayout + páginas mínimas

**Files:**
- Create: `src/styles/global.css`, `src/components/SiteLayout.astro`, `src/pages/index.astro`, `src/pages/es/index.astro`, `public/favicon.svg`

- [ ] **Step 1: Crear src/styles/global.css**

```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif;
  --color-navy: #032d60;
  --color-blue: #0176d3;
  --color-blue-dark: #014486;
  --color-ink: #181818;
  --color-slate: #5b6b79;
  --color-line: #e4eaf0;
  --color-mist: #f8fafc;
  --color-hero-muted: #b9cbe0;
  --color-hero-eyebrow: #8bb8e8;
}

@font-face {
  font-family: "Inter Variable";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/InterVariable.woff2") format("woff2");
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

body {
  background: #ffffff;
  color: var(--color-ink);
  font-family: var(--font-sans);
  text-rendering: optimizeLegibility;
}

::selection {
  background: rgba(1, 118, 211, 0.18);
}

a,
button,
input,
textarea {
  touch-action: manipulation;
}

button:not(:disabled) {
  cursor: pointer;
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 60;
  transform: translateY(-150%);
  border-radius: 6px;
  background: var(--color-navy);
  color: #fff;
  padding: 0.6rem 0.8rem;
}

.skip-link:focus {
  transform: translateY(0);
}

a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 3px solid rgba(1, 118, 211, 0.45);
  outline-offset: 2px;
}
```

- [ ] **Step 2: Crear public/favicon.svg** (monograma JH navy/azul)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#032D60"/>
  <text x="32" y="42" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#FFFFFF" text-anchor="middle">J<tspan fill="#57A3E8">H</tspan></text>
</svg>
```

- [ ] **Step 3: Crear src/components/SiteLayout.astro**

```astro
---
import "../styles/global.css";
import type { Locale, SiteContent } from "../data/content";
import { shared } from "../data/content";

interface Props {
  locale: Locale;
  c: SiteContent;
}

const { locale, c } = Astro.props;
const site = Astro.site!.href.replace(/\/$/, "");
const canonical = site + c.meta.path;
const alternate = site + c.meta.altPath;
const skipLabel = locale === "en" ? "Skip to content" : "Saltar al contenido";
---

<!doctype html>
<html lang={locale}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{c.meta.title}</title>
    <meta name="description" content={c.meta.description} />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="theme-color" content="#032D60" />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hreflang={locale === "en" ? "es" : "en"} href={alternate} />
    <link rel="alternate" hreflang="x-default" href={site + "/"} />
    <link rel="sitemap" href="/sitemap-index.xml" />
    <link
      rel="preload"
      href="/fonts/InterVariable.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={c.meta.title} />
    <meta property="og:description" content={c.meta.description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={site + c.meta.ogImage} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="author" content={shared.name} />
  </head>
  <body>
    <a class="skip-link" href="#main">{skipLabel}</a>
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Crear src/pages/index.astro (versión mínima para validar el esqueleto)**

```astro
---
import SiteLayout from "../components/SiteLayout.astro";
import { content } from "../data/content";

const c = content.en;
---

<SiteLayout locale="en" c={c}>
  <main id="main">
    <h1 class="text-navy text-4xl font-bold">{c.hero.title}</h1>
  </main>
</SiteLayout>
```

- [ ] **Step 5: Crear src/pages/es/index.astro (versión mínima)**

```astro
---
import SiteLayout from "../../components/SiteLayout.astro";
import { content } from "../../data/content";

const c = content.es;
---

<SiteLayout locale="es" c={c}>
  <main id="main">
    <h1 class="text-navy text-4xl font-bold">{c.hero.title}</h1>
  </main>
</SiteLayout>
```

- [ ] **Step 6: Build de verificación**

Run: `npm run build`
Expected: `astro check` 0 errors, build genera `dist/index.html` y `dist/es/index.html`.

- [ ] **Step 7: Verificar HTML generado**

```powershell
Select-String -Path dist/index.html -Pattern 'lang="en"' -Quiet
Select-String -Path dist/es/index.html -Pattern 'lang="es"' -Quiet
Select-String -Path dist/index.html -Pattern 'hreflang="es"' -Quiet
```
Expected: `True` las tres.

- [ ] **Step 8: Commit**

```powershell
git add src/styles/global.css src/components/SiteLayout.astro src/pages/index.astro src/pages/es/index.astro public/favicon.svg
git commit -m "feat: tokens de diseno, layout base y paginas minimas EN/ES"
```

---

### Task 5: Icon.astro + Header con menú móvil

**Files:**
- Create: `src/components/Icon.astro`, `src/components/Header.astro`
- Modify: `src/pages/index.astro`, `src/pages/es/index.astro`

- [ ] **Step 1: Crear src/components/Icon.astro** (SVGs lucide inline, cero dependencias)

```astro
---
interface Props {
  name:
    | "download"
    | "external"
    | "mail"
    | "github"
    | "linkedin"
    | "whatsapp"
    | "arrow-right"
    | "menu"
    | "x"
    | "award"
    | "cloud";
  class?: string;
}

const { name, class: className = "h-4 w-4" } = Astro.props;

const paths: Record<Props["name"], string> = {
  download:
    "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  external:
    "M15 3h6v6 M10 14 21 3 M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  mail:
    "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z M22 6l-10 7L2 6",
  github:
    "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4 M9 18c-4.51 2-5-2-7-2",
  linkedin:
    "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z M2 9h4v12H2z M4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z",
  whatsapp:
    "M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21 M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1",
  "arrow-right": "M5 12h14 M12 5l7 7-7 7",
  menu: "M4 6h16 M4 12h16 M4 18h16",
  x: "M18 6 6 18 M6 6l12 12",
  award:
    "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z M8.21 13.89 7 23l5-3 5 3-1.21-9.12",
  cloud: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
};
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class={className}
  aria-hidden="true"
>
  {paths[name].split(" M").map((d, i) => <path d={i === 0 ? d : "M" + d} />)}
</svg>
```

- [ ] **Step 2: Crear src/components/Header.astro**

```astro
---
import type { Locale, SiteContent } from "../data/content";
import { links, shared } from "../data/content";
import Icon from "./Icon.astro";

interface Props {
  locale: Locale;
  c: SiteContent;
}

const { c } = Astro.props;

const navItems = [
  { href: "#experience", label: c.nav.experience },
  { href: "#projects", label: c.nav.projects },
  { href: "#skills", label: c.nav.skills },
  { href: "#credentials", label: c.nav.credentials },
  { href: "#contact", label: c.nav.contact },
];
---

<header
  id="site-header"
  class="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur"
>
  <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
    <a href={c.meta.path} class="flex items-center gap-2">
      <span class="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-sm font-bold text-white">
        JH
      </span>
      <span class="text-sm font-semibold text-navy sm:text-base">{shared.name}</span>
    </a>

    <nav id="site-nav" class="site-nav" aria-label="Main">
      <ul class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
        {
          navItems.map((item) => (
            <li>
              <a
                href={item.href}
                class="block rounded px-2 py-3 text-sm font-medium text-slate transition-colors hover:text-navy sm:px-0 sm:py-2"
              >
                {item.label}
              </a>
            </li>
          ))
        }
        <li class="sm:ml-2">
          <a
            href={c.meta.altPath}
            class="inline-block rounded-full border border-line px-3.5 py-2 text-sm font-semibold text-blue transition-colors hover:border-blue sm:py-1.5"
          >
            {c.meta.altLabel}
          </a>
        </li>
        <li>
          <a
            href={links.cv}
            download
            class="inline-flex items-center gap-2 rounded-md border border-blue px-3 py-2.5 text-sm font-semibold text-blue transition-colors hover:bg-blue hover:text-white"
          >
            <Icon name="download" class="h-4 w-4" />
            {c.nav.cv}
          </a>
        </li>
      </ul>
    </nav>

    <button
      id="menu-toggle"
      type="button"
      class="menu-btn flex h-11 w-11 items-center justify-center rounded-md border border-line text-navy sm:hidden"
      aria-controls="site-nav"
      aria-expanded="false"
      aria-label={c.nav.menuLabel}
    >
      <Icon name="menu" class="menu-open h-5 w-5" />
      <Icon name="x" class="menu-close hidden h-5 w-5" />
    </button>
  </div>
</header>

<style>
  @media (max-width: 639px) {
    html.js .site-nav {
      display: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      border-bottom: 1px solid var(--color-line);
      background: #fff;
      padding: 0.75rem 1rem 1rem;
    }
    html.js #site-header[data-open] .site-nav {
      display: block;
    }
    html.js #site-header[data-open] .menu-open {
      display: none;
    }
    html.js #site-header[data-open] .menu-close {
      display: block;
    }
  }
  html:not(.js) .menu-btn {
    display: none;
  }
</style>

<script>
  document.documentElement.classList.add("js");
  const header = document.getElementById("site-header");
  const btn = document.getElementById("menu-toggle");
  btn?.addEventListener("click", () => {
    const open = header?.toggleAttribute("data-open");
    btn.setAttribute("aria-expanded", String(Boolean(open)));
  });
  header?.querySelectorAll("a[href^='#']").forEach((a) =>
    a.addEventListener("click", () => {
      header.removeAttribute("data-open");
      btn?.setAttribute("aria-expanded", "false");
    })
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header?.hasAttribute("data-open")) {
      header.removeAttribute("data-open");
      btn?.setAttribute("aria-expanded", "false");
      btn?.focus();
    }
  });
</script>
```

- [ ] **Step 3: Integrar el Header en ambas páginas**

En `src/pages/index.astro` y `src/pages/es/index.astro`, importar y renderizar el Header dentro del layout, antes de `<main>`:

```astro
---
import SiteLayout from "../components/SiteLayout.astro";
import Header from "../components/Header.astro";
import { content } from "../data/content";

const c = content.en;
---

<SiteLayout locale="en" c={c}>
  <Header locale="en" c={c} />
  <main id="main">
    <h1 class="text-navy text-4xl font-bold">{c.hero.title}</h1>
  </main>
</SiteLayout>
```

(En la versión ES: rutas de import con `../../`, `content.es` y `locale="es"`.)

- [ ] **Step 4: Build + verificación**

Run: `npm run build`
Expected: 0 errores.

```powershell
Select-String -Path dist/index.html -Pattern 'menu-toggle' -Quiet
Select-String -Path dist/es/index.html -Pattern 'Descargar CV' -Quiet
```
Expected: `True` ambas.

- [ ] **Step 5: Commit**

```powershell
git add src/components/Icon.astro src/components/Header.astro src/pages/index.astro src/pages/es/index.astro
git commit -m "feat: header fijo con nav, toggle de idioma y menu movil accesible"
```

---

### Task 6: Hero navy

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`, `src/pages/es/index.astro`

- [ ] **Step 1: Crear src/components/Hero.astro**

```astro
---
import type { SiteContent } from "../data/content";
import { links } from "../data/content";
import Icon from "./Icon.astro";

interface Props {
  c: SiteContent;
}

const { c } = Astro.props;
---

<section class="bg-navy text-white">
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-hero-eyebrow">
      {c.hero.eyebrow}
    </p>
    <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
      {c.hero.title}
    </h1>
    <p class="mt-5 max-w-2xl text-lg leading-relaxed text-hero-muted">
      {c.hero.lead}
    </p>
    <p class="mt-4 text-sm font-medium text-hero-eyebrow">{c.hero.availability}</p>

    <div class="mt-8 flex flex-wrap gap-3">
      <a
        href="#projects"
        class="inline-flex items-center gap-2 rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
      >
        {c.hero.ctaProjects}
        <Icon name="arrow-right" class="h-4 w-4" />
      </a>
      <a
        href={links.cv}
        download
        class="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
      >
        <Icon name="download" class="h-4 w-4" />
        {c.hero.ctaCv}
      </a>
    </div>

    <dl class="mt-12 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-3">
      {
        c.hero.stats.map((stat) => (
          <div class="flex flex-col bg-navy px-5 py-4">
            <dt class="order-2 text-xs text-hero-muted">{stat.label}</dt>
            <dd class="text-xl font-bold text-white">{stat.value}</dd>
          </div>
        ))
      }
    </dl>
  </div>
</section>
```

- [ ] **Step 2: Reemplazar el `<h1>` placeholder por el Hero en ambas páginas**

`src/pages/index.astro`:
```astro
---
import SiteLayout from "../components/SiteLayout.astro";
import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
import { content } from "../data/content";

const c = content.en;
---

<SiteLayout locale="en" c={c}>
  <Header locale="en" c={c} />
  <main id="main">
    <Hero c={c} />
  </main>
</SiteLayout>
```
(Espejo en `es/index.astro` con `content.es`, `locale="es"` e imports `../../`.)

- [ ] **Step 3: Build + verificación**

Run: `npm run build`
```powershell
Select-String -Path dist/index.html -Pattern 'View projects' -Quiet
Select-String -Path dist/es/index.html -Pattern 'Ver proyectos' -Quiet
Select-String -Path dist/index.html -Pattern '800\+ hrs' -Quiet
```
Expected: `True` las tres.

- [ ] **Step 4: Commit**

```powershell
git add src/components/Hero.astro src/pages/index.astro src/pages/es/index.astro
git commit -m "feat: hero navy con CTAs y metricas"
```

---

### Task 7: SectionHeading + ExperienceTimeline

**Files:**
- Create: `src/components/SectionHeading.astro`, `src/components/ExperienceTimeline.astro`
- Modify: `src/pages/index.astro`, `src/pages/es/index.astro`

- [ ] **Step 1: Crear src/components/SectionHeading.astro**

```astro
---
interface Props {
  kicker: string;
  title: string;
}

const { kicker, title } = Astro.props;
---

<div class="max-w-2xl">
  <p class="text-xs font-bold uppercase tracking-[0.14em] text-blue">{kicker}</p>
  <h2 class="mt-2 text-3xl font-bold text-navy">{title}</h2>
</div>
```

- [ ] **Step 2: Crear src/components/ExperienceTimeline.astro**

```astro
---
import type { SiteContent } from "../data/content";
import SectionHeading from "./SectionHeading.astro";

interface Props {
  c: SiteContent;
}

const { c } = Astro.props;
---

<section id="experience" class="scroll-mt-20">
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
    <SectionHeading kicker={c.experience.kicker} title={c.experience.title} />
    <ol class="mt-10 space-y-10 border-l-2 border-line pl-6 sm:pl-8">
      {
        c.experience.items.map((item) => (
          <li class="relative">
            <span class="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-blue bg-white sm:-left-[39px]" />
            <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 class="text-lg font-bold text-navy">{item.role}</h3>
              <span class="text-sm font-semibold text-blue">{item.company}</span>
            </div>
            <p class="mt-1 text-sm text-slate">
              {item.dates} · {item.place}
            </p>
            <ul class="mt-3 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-ink">
              {item.bullets.map((b) => (
                <li>{b}</li>
              ))}
            </ul>
          </li>
        ))
      }
    </ol>
  </div>
</section>
```

- [ ] **Step 3: Agregar a ambas páginas** (después de `<Hero c={c} />`):

```astro
<ExperienceTimeline c={c} />
```
con su import `import ExperienceTimeline from "../components/ExperienceTimeline.astro";` (ES: `../../components/...`).

- [ ] **Step 4: Build + verificación**

Run: `npm run build`
```powershell
Select-String -Path dist/index.html -Pattern 'InCompany' -Quiet
Select-String -Path dist/es/index.html -Pattern 'Esquel, Chubut' -Quiet
```
Expected: `True` ambas.

- [ ] **Step 5: Commit**

```powershell
git add src/components/SectionHeading.astro src/components/ExperienceTimeline.astro src/pages/index.astro src/pages/es/index.astro
git commit -m "feat: seccion experiencia con timeline sobrio"
```

---

### Task 8: ProjectCards

**Files:**
- Create: `src/components/ProjectCards.astro`
- Modify: `src/pages/index.astro`, `src/pages/es/index.astro`

- [ ] **Step 1: Crear src/components/ProjectCards.astro**

```astro
---
import type { SiteContent } from "../data/content";
import SectionHeading from "./SectionHeading.astro";
import Icon from "./Icon.astro";

interface Props {
  c: SiteContent;
}

const { c } = Astro.props;
---

<section id="projects" class="scroll-mt-20 bg-mist">
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
    <SectionHeading kicker={c.projects.kicker} title={c.projects.title} />
    <p class="mt-3 max-w-2xl text-sm text-slate">{c.projects.note}</p>

    <div class="mt-10 grid gap-6 md:grid-cols-2">
      {
        c.projects.items.map((p) => (
          <article class="flex flex-col rounded-lg border border-line bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wide text-blue">{p.type}</p>
            <h3 class="mt-2 text-lg font-bold text-navy">{p.name}</h3>
            <dl class="mt-4 space-y-3 text-base leading-relaxed">
              <div>
                <dt class="text-xs font-bold uppercase tracking-wide text-slate">
                  {c.projects.labels.problem}
                </dt>
                <dd class="mt-1 text-ink">{p.problem}</dd>
              </div>
              <div>
                <dt class="text-xs font-bold uppercase tracking-wide text-slate">
                  {c.projects.labels.solution}
                </dt>
                <dd class="mt-1 text-ink">{p.solution}</dd>
              </div>
              <div>
                <dt class="text-xs font-bold uppercase tracking-wide text-slate">
                  {c.projects.labels.result}
                </dt>
                <dd class="mt-1 text-ink">{p.result}</dd>
              </div>
            </dl>
            <div class="mt-auto pt-5">
              {p.repo ? (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 text-sm font-semibold text-blue transition-colors hover:text-blue-dark"
                >
                  <Icon name="github" class="h-4 w-4" />
                  {c.projects.repoLabel}
                  <Icon name="external" class="h-3.5 w-3.5" />
                </a>
              ) : (
                <p class="inline-flex items-center gap-2 text-sm text-slate">
                  <Icon name="cloud" class="h-4 w-4" />
                  {p.private}
                </p>
              )}
            </div>
          </article>
        ))
      }
    </div>
  </div>
</section>
```

- [ ] **Step 2: Agregar `<ProjectCards c={c} />` a ambas páginas** (después de ExperienceTimeline, con su import).

- [ ] **Step 3: Build + verificación**

Run: `npm run build`
```powershell
Select-String -Path dist/index.html -Pattern 'CloudConsulting Project Management App' -Quiet
Select-String -Path dist/es/index.html -Pattern 'sin repo p' -Quiet
Select-String -Path dist/index.html -Pattern 'github.com/Keromon2k19' -Quiet
```
Expected: `True` las tres.

- [ ] **Step 4: Commit**

```powershell
git add src/components/ProjectCards.astro src/pages/index.astro src/pages/es/index.astro
git commit -m "feat: case studies de proyectos en formato problema-solucion-resultado"
```

---

### Task 9: SkillsGrid + Credentials

**Files:**
- Create: `src/components/SkillsGrid.astro`, `src/components/Credentials.astro`
- Modify: `src/pages/index.astro`, `src/pages/es/index.astro`

- [ ] **Step 1: Crear src/components/SkillsGrid.astro**

```astro
---
import type { SiteContent } from "../data/content";
import SectionHeading from "./SectionHeading.astro";

interface Props {
  c: SiteContent;
}

const { c } = Astro.props;
---

<section id="skills" class="scroll-mt-20">
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
    <SectionHeading kicker={c.skills.kicker} title={c.skills.title} />
    <div class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
      {
        c.skills.groups.map((group) => (
          <div class="border-t-2 border-line pt-4">
            <h3 class="text-sm font-bold uppercase tracking-wide text-navy">{group.name}</h3>
            <ul class="mt-3 grid gap-1.5 text-base text-ink">
              {group.items.map((item) => (
                <li class="flex items-start gap-2">
                  <span class="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  </div>
</section>
```

- [ ] **Step 2: Crear src/components/Credentials.astro**

```astro
---
import type { SiteContent } from "../data/content";
import SectionHeading from "./SectionHeading.astro";
import Icon from "./Icon.astro";

interface Props {
  c: SiteContent;
}

const { c } = Astro.props;
---

<section id="credentials" class="scroll-mt-20 bg-mist">
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
    <SectionHeading kicker={c.credentials.kicker} title={c.credentials.title} />
    <ul class="mt-10 grid gap-6 sm:grid-cols-2">
      {
        c.credentials.items.map((cred) => (
          <li class="flex gap-4 rounded-lg border border-line bg-white p-5">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy text-white">
              <Icon name="award" class="h-5 w-5" />
            </span>
            <div>
              <h3 class="font-bold text-navy">{cred.name}</h3>
              <p class="text-sm font-medium text-slate">{cred.issuer}</p>
              <p class="mt-1 text-sm text-ink">{cred.detail}</p>
              {cred.link && (
                <a
                  href={cred.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition-colors hover:text-blue-dark"
                >
                  {cred.linkLabel}
                  <Icon name="external" class="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </li>
        ))
      }
    </ul>
  </div>
</section>
```

- [ ] **Step 3: Agregar ambos componentes a las dos páginas** (orden: SkillsGrid, luego Credentials).

- [ ] **Step 4: Build + verificación**

Run: `npm run build`
```powershell
Select-String -Path dist/index.html -Pattern 'Salesforce Certified Associate' -Quiet
Select-String -Path dist/es/index.html -Pattern 'Validation rules' -Quiet
Select-String -Path dist/index.html -Pattern 'trailblazer' -Quiet
```
Expected: `True` las tres.

- [ ] **Step 5: Commit**

```powershell
git add src/components/SkillsGrid.astro src/components/Credentials.astro src/pages/index.astro src/pages/es/index.astro
git commit -m "feat: secciones de skills y credenciales"
```

---

### Task 10: ContactSection + footer + páginas de gracias

**Files:**
- Create: `src/components/ContactSection.astro`, `src/pages/thanks.astro`, `src/pages/es/gracias.astro`
- Modify: `src/components/SiteLayout.astro` (footer), `src/pages/index.astro`, `src/pages/es/index.astro`

- [ ] **Step 1: Crear src/components/ContactSection.astro**

```astro
---
import type { SiteContent } from "../data/content";
import { links, shared } from "../data/content";
import SectionHeading from "./SectionHeading.astro";
import Icon from "./Icon.astro";

interface Props {
  c: SiteContent;
}

const { c } = Astro.props;

const direct = [
  { href: links.email, label: shared.email, icon: "mail" as const },
  { href: links.linkedin, label: "LinkedIn", icon: "linkedin" as const },
  { href: links.github, label: "GitHub", icon: "github" as const },
  { href: links.trailblazer, label: "Trailblazer", icon: "cloud" as const },
  { href: links.whatsapp, label: "WhatsApp", icon: "whatsapp" as const },
];
---

<section id="contact" class="scroll-mt-20 bg-navy text-white">
  <div class="mx-auto grid max-w-5xl gap-12 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
    <div>
      <p class="text-xs font-bold uppercase tracking-[0.14em] text-hero-eyebrow">
        {c.contact.kicker}
      </p>
      <h2 class="mt-2 text-3xl font-bold text-white">{c.contact.title}</h2>
      <p class="mt-4 max-w-md leading-relaxed text-hero-muted">{c.contact.body}</p>

      <h3 class="mt-8 text-sm font-bold uppercase tracking-wide text-hero-eyebrow">
        {c.contact.directTitle}
      </h3>
      <ul class="mt-4 space-y-3">
        {
          direct.map((d) => (
            <li>
              <a
                href={d.href}
                target={d.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                class="inline-flex min-h-11 items-center gap-3 text-sm font-medium text-white transition-colors hover:text-hero-eyebrow"
              >
                <span class="flex h-10 w-10 items-center justify-center rounded-md border border-white/25">
                  <Icon name={d.icon} class="h-4 w-4" />
                </span>
                {d.label}
              </a>
            </li>
          ))
        }
      </ul>
    </div>

    <form
      name="contact"
      method="POST"
      action={c.contact.form.action}
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="rounded-lg bg-white p-6 text-ink"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p class="hidden">
        <label>Bot field<input name="bot-field" /></label>
      </p>
      <div class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-semibold text-navy">
            {c.contact.form.name} <span class="text-blue" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autocomplete="name"
            required
            class="mt-1.5 w-full rounded-md border border-line px-3 py-3 text-base transition-colors focus:border-blue"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-semibold text-navy">
            {c.contact.form.email} <span class="text-blue" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="mt-1.5 w-full rounded-md border border-line px-3 py-3 text-base transition-colors focus:border-blue"
          />
        </div>
        <div>
          <label for="message" class="block text-sm font-semibold text-navy">
            {c.contact.form.message} <span class="text-blue" aria-hidden="true">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            class="mt-1.5 w-full rounded-md border border-line px-3 py-3 text-base transition-colors focus:border-blue"></textarea>
        </div>
        <button
          type="submit"
          class="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
        >
          {c.contact.form.submit}
          <Icon name="arrow-right" class="h-4 w-4" />
        </button>
      </div>
    </form>
  </div>
</section>
```

- [ ] **Step 2: Agregar el footer al SiteLayout**

En `src/components/SiteLayout.astro`, reemplazar `<slot />` por:

```astro
<slot />
<footer class="border-t border-white/10 bg-navy">
  <div
    class="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-4 py-6 text-sm text-hero-muted sm:flex-row sm:items-center sm:px-6"
  >
    <p>© 2026 {shared.name}</p>
    <p>{c.footer.note}</p>
  </div>
</footer>
```

- [ ] **Step 3: Agregar `<ContactSection c={c} />` a ambas páginas** (última sección dentro de `<main>`).

- [ ] **Step 4: Crear src/pages/thanks.astro**

```astro
---
import SiteLayout from "../components/SiteLayout.astro";
import { content } from "../data/content";

const c = content.en;
---

<SiteLayout locale="en" c={c}>
  <main id="main" class="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
    <h1 class="text-3xl font-bold text-navy">Message sent</h1>
    <p class="max-w-md text-slate">
      Thanks for reaching out — I'll reply as soon as possible.
    </p>
    <a href="/" class="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-dark">
      Back to home
    </a>
  </main>
</SiteLayout>
```

- [ ] **Step 5: Crear src/pages/es/gracias.astro**

```astro
---
import SiteLayout from "../../components/SiteLayout.astro";
import { content } from "../../data/content";

const c = content.es;
---

<SiteLayout locale="es" c={c}>
  <main id="main" class="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-24 sm:px-6">
    <h1 class="text-3xl font-bold text-navy">Mensaje enviado</h1>
    <p class="max-w-md text-slate">Gracias por escribirme — te respondo lo antes posible.</p>
    <a
      href="/es/"
      class="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
    >
      Volver al inicio
    </a>
  </main>
</SiteLayout>
```

- [ ] **Step 6: Build + verificación**

Run: `npm run build`
```powershell
Select-String -Path dist/index.html -Pattern 'data-netlify' -Quiet
Select-String -Path dist/index.html -Pattern 'action="/thanks/"' -Quiet
Select-String -Path dist/es/index.html -Pattern 'action="/es/gracias/"' -Quiet
Test-Path dist/thanks/index.html
Test-Path dist/es/gracias/index.html
```
Expected: `True` las cinco.

- [ ] **Step 7: Commit**

```powershell
git add src/components/ContactSection.astro src/components/SiteLayout.astro src/pages/thanks.astro src/pages/es/gracias.astro src/pages/index.astro src/pages/es/index.astro
git commit -m "feat: contacto con Netlify Forms, footer y paginas de gracias"
```

---

### Task 11: 404, imágenes OG y README

**Files:**
- Create: `src/pages/404.astro`, `scripts/generate-og.mjs`, `public/og/og-en.png`, `public/og/og-es.png`, `README.md`

- [ ] **Step 1: Crear src/pages/404.astro** (bilingüe: sin JS muestra ambos bloques; con JS oculta el que no corresponde según la ruta)

```astro
---
import SiteLayout from "../components/SiteLayout.astro";
import { content } from "../data/content";

const c = content.en;
---

<SiteLayout locale="en" c={c}>
  <main id="main" class="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-24 sm:px-6">
    <p class="text-6xl font-bold text-navy">404</p>
    <div data-lang-block="en" class="flex flex-col items-start gap-3">
      <h1 class="text-2xl font-bold text-navy">Page not found</h1>
      <a href="/" class="rounded-md bg-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-dark">
        Back to home
      </a>
    </div>
    <div data-lang-block="es" class="flex flex-col items-start gap-3">
      <h1 class="text-2xl font-bold text-navy">Página no encontrada</h1>
      <a
        href="/es/"
        class="rounded-md border border-line px-5 py-3 text-sm font-semibold text-blue transition-colors hover:border-blue"
      >
        Volver al inicio
      </a>
    </div>
  </main>
</SiteLayout>

<script>
  const isEs = window.location.pathname.startsWith("/es/");
  document
    .querySelector(`[data-lang-block="${isEs ? "en" : "es"}"]`)
    ?.setAttribute("hidden", "");
</script>
```

- [ ] **Step 2: Crear scripts/generate-og.mjs**

```js
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const NAVY = "#032D60";
const BLUE = "#0176D3";

function svg(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="80" y="150" width="72" height="12" fill="${BLUE}"/>
  <text x="80" y="290" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">Joaquin Haro Filippon</text>
  <text x="80" y="370" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="600" fill="#8BB8E8">${title}</text>
  <text x="80" y="440" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#B9CBE0">${subtitle}</text>
</svg>`;
}

mkdirSync("public/og", { recursive: true });

await sharp(Buffer.from(svg("Salesforce Administrator &amp; Developer", "CRM data · Flows · Reporting · Documentation")))
  .png()
  .toFile("public/og/og-en.png");

await sharp(Buffer.from(svg("Salesforce Administrator &amp; Developer", "Datos CRM · Flows · Reporting · Documentación")))
  .png()
  .toFile("public/og/og-es.png");

console.log("OG images generated");
```

- [ ] **Step 3: Generar las imágenes**

Run: `npm run generate:og`
Expected: `OG images generated`; existen `public/og/og-en.png` y `public/og/og-es.png` (verificar con `Test-Path`).

- [ ] **Step 4: Crear README.md**

````markdown
# Joaquin Haro Filippon — Portfolio

Bilingual (EN/ES) portfolio for a Salesforce Administrator & Developer.
Static site: zero framework JavaScript, Salesforce-inspired palette.

**Live:** https://joaquinharofilipponportfolio.netlify.app/

## Stack

- [Astro 7](https://astro.build) + TypeScript (strict)
- [Tailwind CSS 4](https://tailwindcss.com)
- Netlify (hosting + Forms)

## Development

```bash
npm install
npm run dev        # http://127.0.0.1:4321
npm run build      # astro check + build to dist/
npm run preview
```

## Structure

- `src/data/content.ts` — all EN/ES copy, typed (single source of truth)
- `src/components/` — one section per component
- `/` English (default) · `/es/` Spanish
````

- [ ] **Step 5: Build + verificación final del sitio completo**

Run: `npm run build`
```powershell
Test-Path dist/404.html
Select-String -Path dist/index.html -Pattern 'og/og-en.png' -Quiet
Select-String -Path dist/es/index.html -Pattern 'og/og-es.png' -Quiet
Test-Path dist/sitemap-index.xml
```
Expected: `True` las cuatro.

- [ ] **Step 6: Commit**

```powershell
git add src/pages/404.astro scripts/generate-og.mjs public/og/og-en.png public/og/og-es.png README.md
git commit -m "feat: 404 bilingue, imagenes OG y README"
```

---

### Task 12: QA visual y de accesibilidad

**Files:**
- Ninguno nuevo (verificación). Screenshots van a `qa/` (gitignored).

- [ ] **Step 1: Levantar el preview**

Usar el Browser pane del harness: `preview_start` con `{name: "portfolio"}` (usa `.claude/launch.json`). Si se ejecuta fuera del harness: `npm run dev` y abrir `http://127.0.0.1:4321`.

- [ ] **Step 2: Verificación funcional EN** (`/`)

- Hero navy visible con título "Salesforce Administrator & Developer", 2 CTAs y 3 métricas.
- Nav ancla a cada sección; toggle "Español" lleva a `/es/`.
- "Download CV" descarga el PDF.
- Los 2 links de GitHub de proyectos abren los repos.
- Form presente con labels; submit local NO funciona (Netlify Forms solo procesa deployado — esperado).

- [ ] **Step 3: Verificación funcional ES** (`/es/`)

- Todo el contenido en español; toggle "English" vuelve a `/`.

- [ ] **Step 4: Verificación mobile**

Redimensionar a 375px de ancho: aparece el botón hamburguesa, abre/cierra el menú, los grids colapsan a 1 columna, no hay overflow horizontal.

- [ ] **Step 5: Accesibilidad rápida**

- Tab desde el inicio: primer foco = skip link visible.
- Todos los inputs del form tienen label asociado.
- Contraste: texto `#B9CBE0` sobre `#032D60` y blanco sobre `#0176D3` — verificar con el checker del navegador que cumplen AA (≥4.5:1 texto normal).

- [ ] **Step 6: Lighthouse**

Correr Lighthouse (DevTools o CLI) sobre `/` y `/es/` en modo mobile.
Expected: ≥95 en Performance, Accessibility, Best Practices y SEO. Si algo baja de 95, diagnosticar y corregir antes de seguir.

- [ ] **Step 7: Screenshots de evidencia**

Guardar screenshots desktop (1440px) y mobile (375px) de ambos idiomas en `qa/screenshots/` y compartirlos con el usuario.

- [ ] **Step 8: Commit de cierre (si hubo fixes)**

```powershell
git add -A
git commit -m "fix: ajustes de QA (accesibilidad/performance)"
```
(Solo si el QA produjo cambios.)

---

### Task 13: GitHub + Netlify (GATE DE USUARIO para el deploy final)

**Files:**
- Ninguno nuevo.

- [ ] **Step 1: Verificar autenticación de gh**

Run: `gh auth status`
Expected: logueado como Keromon2k19. Si no está autenticado, pedirle al usuario que corra `gh auth login` o crear el repo manualmente en github.com.

- [ ] **Step 2: Crear el repo y pushear**

```powershell
gh repo create portfolio-2026 --public --source . --push
```
Expected: repo `Keromon2k19/portfolio-2026` creado con la rama `main` pusheada.

- [ ] **Step 3: PARAR — confirmación del usuario**

**No deployar sin confirmación explícita de Joaquin en el chat.** El deploy a Netlify reemplaza el sitio viejo en `joaquinharofilipponportfolio.netlify.app`. Preguntar y esperar el OK.

- [ ] **Step 4: Conectar Netlify (acción del usuario, guiarlo)**

En https://app.netlify.com → sitio existente `joaquinharofilipponportfolio` → Site configuration → Build & deploy → Link repository → elegir `Keromon2k19/portfolio-2026`. Build command y publish dir ya vienen de `netlify.toml`. Alternativa CLI si tiene `netlify-cli`: `netlify link` + `netlify deploy --build --prod`.

- [ ] **Step 5: Verificación post-deploy**

- Abrir https://joaquinharofilipponportfolio.netlify.app/ → se ve el sitio nuevo (hero navy).
- `/es/` funciona; `/algo-que-no-existe` muestra el 404.
- Enviar un mensaje de prueba por el form → aparece en Netlify → Forms.
- Verificar en Netlify que el form "contact" quedó registrado.

- [ ] **Step 6: Marcar el goal como cumplido y avisar al usuario.**

---

## Design QA aplicado (ui-ux-pro-max)

Pase de reglas de diseño aplicado sobre el código del plan (2026-07-20, a pedido del usuario):

- **Touch targets ≥44px**: menú móvil (links `py-3`), botón hamburguesa (`h-11 w-11`), toggle idioma (`py-2` mobile), inputs (`py-3`), links directos de contacto (`min-h-11`), CTAs (`py-3`). Regla `touch-target-size`.
- **Micro-transiciones**: `transition-colors` (~150ms default de Tailwind) en todo elemento interactivo. NO son animaciones de entrada — el spec sigue prohibiéndolas. Reglas `state-transition`, anti-pattern "instant state changes".
- **Un solo CTA primario por vista**: el "Download CV" del header pasó a outline; el único botón azul sólido above-the-fold es "View projects" del hero. Regla `primary-action`.
- **Body ≥16px**: `text-base` en bullets, case studies y skills (antes 15px). Regla `readable-font-size`.
- **Form**: `autocomplete` en name/email, asteriscos de requerido (`required-indicators`), `focus:border-blue`, teclado semántico via `type="email"`.
- **Interacción**: `touch-action: manipulation` y `cursor: pointer` globales; menú móvil cierra con Escape y devuelve el foco al botón.
- **Mobile polish**: `<meta name="theme-color" content="#032D60">`.
- **Contraste verificado (AA)**: blanco/#032D60 ≈ 15:1 · #B9CBE0/#032D60 ≈ 8:1 · #8BB8E8/#032D60 ≈ 6.5:1 · blanco/#0176D3 ≈ 4.8:1 · #0176D3/blanco ≈ 4.8:1 · #5B6B79/blanco ≈ 5.3:1. Re-verificar con tooling en Task 12.

**Checklist extra para Task 12** (además de lo ya listado): probar a 375px y en landscape, verificar con `prefers-reduced-motion` activado, confirmar que ningún contenido queda tapado por el header sticky (`scroll-mt-20` en todas las secciones), y validar contraste con el checker de DevTools en ambos idiomas.

## Self-Review del plan (hecho al escribirlo)

1. **Cobertura del spec:** estructura one-page ✓ (Tasks 5-10), i18n EN default ✓ (Task 2 config + páginas), visual Hero navy ✓ (Task 6), tokens ✓ (Task 4), Inter self-hosted ✓ (Tasks 2/4), Netlify Forms + honeypot + thanks ✓ (Task 10), 404 bilingüe ✓ (Task 11), OG/SEO/sitemap/robots ✓ (Tasks 2/4/11), a11y + Lighthouse ≥95 ✓ (Task 12), git/GitHub/Netlify con gate ✓ (Tasks 1/13), archivo de mayo ✓ (Task 1), README ✓ (Task 11), cero animaciones de entrada ✓ (ningún task las introduce).
2. **Placeholders:** ninguno — todo código completo.
3. **Consistencia de tipos:** `SiteContent`/`Locale` definidos en Task 3 y usados con el mismo shape en Tasks 4-11; props `{ locale, c }` para SiteLayout/Header y `{ c }` para el resto, consistente en todas las páginas.
