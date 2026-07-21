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
