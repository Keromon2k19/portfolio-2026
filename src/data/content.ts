export type Locale = "en" | "es";

export const links = {
  email: "mailto:joaquinharofilippon@gmail.com",
  github: "https://github.com/Keromon2k19",
  linkedin: "https://www.linkedin.com/in/joaquin-haro-filippon-a05967191/",
  trailblazer: "https://www.salesforce.com/trailblazer/jharofilippon",
  whatsapp: "https://wa.me/542945699379",
  cv: "/docs/joaquin-haro-filippon-salesforce-cv-2026.pdf",
} as const;

export interface ExperienceItem {
  role: string;
  company: string;
  dates: string;
  place: string;
  bullets: readonly string[];
}

export interface ProjectDetails {
  overview: string;
  highlights: readonly string[];
  stack: readonly string[];
  context: string;
}

export interface ProjectItem {
  name: string;
  type: string;
  problem: string;
  solution: string;
  result: string;
  details: ProjectDetails;
  liveUrl?: string;
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
    detailLabel: string;
    closeLabel: string;
    liveLabel: string;
    detailSections: {
      highlights: string;
      stack: string;
      context: string;
    };
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
        "Salesforce Administrator & Developer from Argentina, grounded in a decade of customer and technical support. CRM data, Flows, reporting, documentation, and web design.",
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
      lead: "I build CRM systems teams can actually operate: clean data models, Flow automation, reporting, and documentation.",
      availability: "Remote from Argentina · Spanish native · English B2",
      ctaProjects: "View projects",
      ctaCv: "Download CV",
      stats: [
        { value: "10 years", label: "in customer & technical support" },
        { value: "1+ year", label: "hands-on Salesforce experience" },
        { value: "3", label: "Salesforce & Marketing Cloud credentials" },
      ],
    },
    experience: {
      kicker: "Experience",
      title: "Salesforce work, built on a decade of support",
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
          role: "Independent Technical & Customer Support",
          company: "Self-employed",
          dates: "2016 – Present",
          place: "Esquel, Argentina",
          bullets: [
            "Provide end-to-end technical and customer support to individuals and small businesses — diagnosing hardware and software issues and coordinating service follow-up.",
            "Communicate solutions in plain language and document every issue and next step, sustaining a referral-based client base for nearly a decade.",
            "Scope and quote each job to the client's budget and needs — from one-off fixes to ongoing support.",
          ],
        },
        {
          role: "Computer Technician & Customer Support",
          company: "Infinitech",
          dates: "Jun 2017 – Aug 2021",
          place: "Esquel, Chubut",
          bullets: [
            "Delivered front-line customer service and technical support in a repair shop, handling intake and resolving issues for notebooks, PCs, and gaming consoles.",
            "Coordinated diagnosis, repair follow-up, customer updates, and delivery, improving satisfaction and repeat business.",
          ],
        },
      ],
    },
    projects: {
      kicker: "Projects",
      title: "Selected projects",
      note: "Private production work is summarized without exposing client data.",
      detailLabel: "View details",
      closeLabel: "Close",
      liveLabel: "Visit live site",
      detailSections: {
        highlights: "What I built",
        stack: "Stack",
        context: "Context",
      },
      labels: { problem: "Problem", solution: "Solution", result: "Result" },
      items: [
        {
          name: "Marketing Cloud Next Implementation Guide",
          type: "Technical documentation · Esphera Consulting",
          problem:
            "Marketing Cloud Next runs on Data 360 and moves faster than its documentation. Teams had official reference pages, in English and scattered across releases, but no ordered path from an empty org to a first controlled send.",
          solution:
            "Wrote a 167-page operating procedure in Spanish: 13 sequential chapters and 3 annexes, every step classified by who requires it, every chapter closed by an explicit exit criterion, and 218 annotated screenshots.",
          result:
            "An implementation team can take an org from approved design to a monitored first send, leaving an auditable record of every control along the way.",
          details: {
            overview:
              "A Spanish-language operating procedure for implementing Marketing Cloud Next on Data 360 — from design approval and permissions through to go-live and initial monitoring, contrasted against official Salesforce documentation.",
            highlights: [
              "Structured the full path into 13 sequential chapters plus annexes, each sealed by an exit criterion that has to pass before the next one starts.",
              "Built a five-level classification separating what Salesforce imposes, what this implementation route requires, what the project has to decide, and what the guide only recommends.",
              "Documented Data 360 enablement, Data Kits and Data Streams, DLO-to-DMO mapping, and Identity Resolution rulesets.",
              "Covered email domain authentication (SPF, DKIM, DMARC) and IP warm-up, plus the WhatsApp branch through WABA and Meta templates.",
              "Specified consent handling and Preference Manager, including two alternative routes for feeding consent and how to govern their combination.",
              "Defined a go-live protocol around a controlled first microcohort, with named owners, stop criteria, and escalation paths.",
              "Produced an auditable implementation log and a master checklist annex indexing the outcome of every control.",
              "Annotated 218 individual screenshots and mapped every chapter back to its official Salesforce source.",
            ],
            stack: [
              "Marketing Cloud Next",
              "Data 360",
              "Identity Resolution",
              "Email deliverability",
              "WhatsApp / WABA",
              "Consent & Preference Manager",
              "Audience Flows",
              "Technical writing",
            ],
            context:
              "Written for Esphera Consulting, close to three months of work (version 3.16, August 2026). Summarized without client data — the document itself is not public.",
          },
        },
        {
          name: "Quoting & Localization Support",
          type: "Production org · InCompany",
          problem:
            "Sales and ops teams needed cleaner record data, documentation for their quoting system, and a Spanish interface.",
          solution:
            "Configured custom objects and fields, improved Account layouts, corrected records, localized metadata, and wrote end-to-end documentation.",
          result:
            "Non-technical users got a clear operating reference, and reporting became easier to trust.",
          details: {
            overview:
              "A production Salesforce org for InCompany's sales and ops teams, focused on cleaner data, a documented quoting system, and a Spanish interface.",
            highlights: [
              "Designed and deployed custom objects and fields to model quoting and operational workflows.",
              "Restructured Account page layouts to surface critical data earlier in daily use.",
              "Audited and corrected records across objects to restore reporting integrity.",
              "Localized custom labels, field names, and UI components into Spanish.",
              "Wrote end-to-end documentation used daily by non-technical teams.",
            ],
            stack: [
              "Custom objects & fields",
              "Page layouts",
              "Flows",
              "Data quality",
              "Spanish localization",
              "Documentation",
            ],
            context:
              "Internship, remote (Nov 2025 – May 2026). Private production work, summarized without client data — no public repo.",
          },
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
          details: {
            overview:
              "A reporting and automation layer for a client Salesforce org, giving stakeholders visibility into operational metrics as requirements evolved.",
            highlights: [
              "Built and maintained custom data architecture for end-to-end process tracking.",
              "Designed a reporting and dashboards layer, rebuilt iteratively across sprints.",
              "Implemented and tested Flow automations within a two-week Agile cadence.",
            ],
            stack: [
              "Custom data architecture",
              "Reports & dashboards",
              "Flows",
              "Agile / Scrum",
            ],
            context:
              "Remote (Nov 2024 – Apr 2025). Client work summarized without sensitive details — no public repo.",
          },
        },
        {
          name: "CloudConsulting Project Management App",
          type: "Implementation project · Bootcamp",
          problem:
            "A real client had project and resource data scattered across multiple sources.",
          solution:
            "Built a Salesforce project management app with custom objects, Flows, reports, dashboards, and Apex, in a Scrum team.",
          result:
            "Shipped a unified org for project visibility within a 6-week delivery window.",
          details: {
            overview:
              "A Salesforce app that consolidates scattered project and resource data into a single org, giving a client team end-to-end visibility over their projects.",
            highlights: [
              "Modeled projects, resources, and their relationships with custom objects and fields.",
              "Automated tracking with Flows to reduce manual data entry.",
              "Built reports and dashboards for project status and resource allocation.",
              "Added Apex for logic beyond declarative automation.",
            ],
            stack: [
              "Custom objects & fields",
              "Flows",
              "Reports & dashboards",
              "Apex",
              "SFDX",
            ],
            context:
              "Salesforce Developer bootcamp (Plataforma 5 – CloudGaia, 2023). Real client delivery in a collaborative Scrum team, ~6-week window.",
          },
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
          details: {
            overview:
              "A Salesforce org that models an e-learning experience for students and teachers — courses, enrollments, and progress — with role-based access enforced from the ground up.",
            highlights: [
              "Modeled courses, enrollments, and progress data from scratch with custom objects.",
              "Enforced separate student and teacher access with profiles and permission sets, with no overlap.",
              "Added validation rules to keep records consistent across the org.",
              "Built progress-tracking dashboards.",
            ],
            stack: [
              "Custom objects",
              "Profiles & permission sets",
              "Validation rules",
              "Dashboards",
              "SFDX",
            ],
            context:
              "Salesforce configuration project during the bootcamp (Plataforma 5 – CloudGaia, 2023). Focus on data modeling and role-based security.",
          },
        },
        {
          name: "Recuerdos de Cobre",
          type: "Web design · Personal project",
          problem:
            "A long-running tabletop RPG campaign kept generating lore, characters, and session history — a growing pile of information with nowhere organized to live.",
          solution:
            "Designed and built a web archive that structures it all: chronicles, an atlas of characters, factions and places, and a knowledge base — with clear navigation and a consistent taxonomy.",
          result:
            "Players and the game master browse the whole world from one place, and the content stays organized as it keeps growing.",
          details: {
            overview:
              "A web archive for the 'Recuerdos de Cobre' tabletop RPG campaign — worldbuilding, session chronicles, and lore, organized so a large, growing story stays navigable.",
            highlights: [
              "Structured a large body of narrative into a clear information architecture (Chronicles, Atlas, Knowledge).",
              "Designed a cohesive dark theme with custom branding and artwork.",
              "Built reusable content patterns for characters, factions, and locations to stay consistent at scale.",
              "Prioritized navigation and readability across deeply interconnected content.",
            ],
            stack: [
              "Web design",
              "Information architecture",
              "Responsive UI",
              "Content structure",
              "Vercel",
            ],
            context:
              "Personal project — an ongoing worldbuilding and web-design exercise. Live and actively expanding.",
          },
          liveUrl: "https://recuerdos-de-cobre.vercel.app/",
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
          name: "Marketing Cloud",
          items: [
            "Marketing Cloud Next",
            "Data 360",
            "Identity Resolution",
            "Consent & Preference Manager",
            "Email deliverability (SPF, DKIM, DMARC)",
            "WhatsApp / WABA",
            "Audience Flows & segmentation",
            "Email Studio & Journey Builder",
          ],
        },
        {
          name: "Customer & Technical Support",
          items: [
            "Customer retention & service",
            "Ticket & case management",
            "Technical troubleshooting",
            "Service coordination & follow-up",
            "Plain-language communication",
            "Conflict resolution",
          ],
        },
        {
          name: "Tools & AI",
          items: [
            "Claude",
            "ChatGPT",
            "Gemini",
            "NotebookLM",
            "Notion",
            "Obsidian",
            "Slack",
            "Trello",
          ],
        },
        {
          name: "Web & Documentation",
          items: [
            "HTML, CSS & JavaScript",
            "Web design",
            "Information architecture",
            "Technical writing & procedures",
            "GitHub",
            "VS Code",
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
      body: "Best fit: Salesforce Admin/Developer roles. Also open to customer & technical support and web work.",
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
        "Salesforce Administrator & Developer desde Argentina, con una década de atención al cliente y soporte técnico. Datos CRM, Flows, reporting, documentación y diseño web.",
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
      lead: "Construyo sistemas CRM que los equipos pueden operar de verdad: modelos de datos limpios, automatización con Flows, reporting y documentación.",
      availability: "Remoto desde Argentina · Español nativo · Inglés B2",
      ctaProjects: "Ver proyectos",
      ctaCv: "Descargar CV",
      stats: [
        { value: "10 años", label: "en atención al cliente y soporte técnico" },
        { value: "1+ año", label: "de experiencia práctica en Salesforce" },
        { value: "3", label: "credenciales Salesforce y Marketing Cloud" },
      ],
    },
    experience: {
      kicker: "Experiencia",
      title: "Trabajo Salesforce, sobre una década de soporte",
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
          role: "Soporte técnico y al cliente independiente",
          company: "Autónomo",
          dates: "2016 – Presente",
          place: "Esquel, Argentina",
          bullets: [
            "Brindo soporte técnico y atención al cliente end-to-end a personas y pequeños negocios — diagnóstico de hardware y software y coordinación del seguimiento del servicio.",
            "Comunico soluciones en lenguaje claro y documento cada problema y próximo paso, sosteniendo una base de clientes por recomendación durante casi una década.",
            "Cotizo y dimensiono cada trabajo según el presupuesto y las necesidades de cada cliente — desde arreglos puntuales hasta soporte continuo.",
          ],
        },
        {
          role: "Técnico y atención al cliente",
          company: "Infinitech",
          dates: "Jun 2017 – Ago 2021",
          place: "Esquel, Chubut",
          bullets: [
            "Di atención al cliente y soporte técnico de primera línea en un local de reparación, gestionando la recepción y resolviendo casos de notebooks, PCs y consolas.",
            "Coordiné diagnóstico, seguimiento de reparación, avisos al cliente y entrega, mejorando la satisfacción y la recompra.",
          ],
        },
      ],
    },
    projects: {
      kicker: "Proyectos",
      title: "Proyectos seleccionados",
      note: "El trabajo privado en producción se resume sin exponer datos de clientes.",
      detailLabel: "Ver detalle",
      closeLabel: "Cerrar",
      liveLabel: "Visitar sitio",
      detailSections: {
        highlights: "Qué construí",
        stack: "Stack",
        context: "Contexto",
      },
      labels: { problem: "Problema", solution: "Solución", result: "Resultado" },
      items: [
        {
          name: "Guía de implementación de Marketing Cloud Next",
          type: "Documentación técnica · Esphera Consulting",
          problem:
            "Marketing Cloud Next corre sobre Data 360 y avanza más rápido que su documentación. Los equipos tenían las páginas oficiales, en inglés y dispersas entre releases, pero ningún camino ordenado desde una org vacía hasta el primer envío controlado.",
          solution:
            "Escribí un procedimiento operativo de 167 páginas en español: 13 capítulos secuenciales y 3 anexos, cada paso clasificado según quién lo exige, cada capítulo cerrado por un criterio de salida explícito y 218 capturas anotadas.",
          result:
            "Un equipo de implementación puede llevar una org desde el diseño aprobado hasta un primer envío monitoreado, dejando registro auditable de cada control del camino.",
          details: {
            overview:
              "Un procedimiento operativo en español para implementar Marketing Cloud Next sobre Data 360 — desde la aprobación del diseño y los permisos hasta el go-live y el monitoreo inicial, contrastado con la documentación oficial de Salesforce.",
            highlights: [
              "Estructuré el recorrido completo en 13 capítulos secuenciales más anexos, cada uno cerrado por un criterio de salida que debe cumplirse antes de arrancar el siguiente.",
              "Definí una clasificación de cinco niveles que separa lo que impone Salesforce, lo que exige esta ruta de implementación, lo que debe decidir el proyecto y lo que la guía solo recomienda.",
              "Documenté la habilitación de Data 360, Data Kits y Data Streams, el mapeo DLO a DMO y los rulesets de Identity Resolution.",
              "Cubrí la autenticación del dominio de email (SPF, DKIM, DMARC) y el calentamiento de IP, más la rama de WhatsApp vía WABA y templates de Meta.",
              "Especifiqué el manejo del consentimiento y Preference Manager, con dos rutas alternativas de alimentación y cómo gobernar su combinación.",
              "Definí un protocolo de go-live basado en una primera microcohorte controlada, con responsables, criterios de detención y escalamiento.",
              "Armé un registro de implementación auditable y un anexo de checklist maestro que indexa el resultado de cada control.",
              "Anoté 218 capturas individuales y mapeé cada capítulo a su fuente oficial de Salesforce.",
            ],
            stack: [
              "Marketing Cloud Next",
              "Data 360",
              "Identity Resolution",
              "Entregabilidad de email",
              "WhatsApp / WABA",
              "Consentimiento y Preference Manager",
              "Audience Flows",
              "Redacción técnica",
            ],
            context:
              "Escrita para Esphera Consulting, casi tres meses de trabajo (versión 3.16, agosto de 2026). Resumida sin datos del cliente — el documento no es público.",
          },
        },
        {
          name: "Quoting & Localization Support",
          type: "Org en producción · InCompany",
          problem:
            "Ventas y operaciones necesitaban datos más limpios, documentación del sistema de cotizaciones y una interfaz en español.",
          solution:
            "Configuré objetos y campos custom, mejoré layouts de Account, corregí registros, localicé metadata y escribí documentación end-to-end.",
          result:
            "Los usuarios no técnicos ganaron una referencia clara de operación y el reporting se volvió confiable.",
          details: {
            overview:
              "Una org Salesforce en producción para los equipos de ventas y operaciones de InCompany, enfocada en datos más limpios, un sistema de cotizaciones documentado y una interfaz en español.",
            highlights: [
              "Diseñé y desplegué objetos y campos custom para modelar los flujos de cotización y operaciones.",
              "Reestructuré page layouts de Account para priorizar los datos críticos en el uso diario.",
              "Audité y corregí registros en múltiples objetos para restaurar la integridad del reporting.",
              "Localicé custom labels, nombres de campos y componentes de UI al español.",
              "Escribí documentación end-to-end usada a diario por equipos no técnicos.",
            ],
            stack: [
              "Objetos y campos custom",
              "Page layouts",
              "Flows",
              "Calidad de datos",
              "Localización al español",
              "Documentación",
            ],
            context:
              "Pasantía, remoto (Nov 2025 – May 2026). Trabajo privado en producción, resumido sin datos del cliente — sin repo público.",
          },
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
          details: {
            overview:
              "Una capa de reporting y automatización para una org Salesforce de cliente, dándoles a los stakeholders visibilidad de las métricas operativas mientras los requerimientos evolucionaban.",
            highlights: [
              "Construí y mantuve arquitectura de datos custom para el seguimiento de procesos end-to-end.",
              "Diseñé una capa de reportes y dashboards, reconstruida iterativamente entre sprints.",
              "Implementé y probé automatizaciones con Flows en una cadencia Agile de dos semanas.",
            ],
            stack: [
              "Arquitectura de datos custom",
              "Reportes y dashboards",
              "Flows",
              "Agile / Scrum",
            ],
            context:
              "Remoto (Nov 2024 – Abr 2025). Trabajo de cliente resumido sin detalles sensibles — sin repo público.",
          },
        },
        {
          name: "CloudConsulting Project Management App",
          type: "Proyecto de implementación · Bootcamp",
          problem:
            "Un cliente real tenía datos de proyectos y recursos dispersos en múltiples fuentes.",
          solution:
            "Construimos una app de project management en Salesforce con objetos custom, Flows, reportes, dashboards y Apex, en un equipo Scrum.",
          result:
            "Entregamos una org unificada para visibilidad de proyectos en una ventana de 6 semanas.",
          details: {
            overview:
              "Una app Salesforce que consolida datos de proyectos y recursos dispersos en una sola org, dándole al equipo del cliente visibilidad end-to-end de sus proyectos.",
            highlights: [
              "Modelé proyectos, recursos y sus relaciones con objetos y campos custom.",
              "Automaticé el seguimiento con Flows para reducir la carga manual de datos.",
              "Construí reportes y dashboards de estado de proyectos y asignación de recursos.",
              "Sumé Apex para lógica más allá de la automatización declarativa.",
            ],
            stack: [
              "Objetos y campos custom",
              "Flows",
              "Reportes y dashboards",
              "Apex",
              "SFDX",
            ],
            context:
              "Bootcamp Salesforce Developer (Plataforma 5 – CloudGaia, 2023). Entrega a cliente real en un equipo Scrum colaborativo, ventana de ~6 semanas.",
          },
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
          details: {
            overview:
              "Una org Salesforce que modela una experiencia de e-learning para estudiantes y docentes — cursos, inscripciones y progreso — con acceso por rol aplicado desde la base.",
            highlights: [
              "Modelé cursos, inscripciones y datos de progreso desde cero con objetos custom.",
              "Apliqué acceso separado para estudiantes y docentes con profiles y permission sets, sin superposición.",
              "Sumé validation rules para mantener los registros consistentes en toda la org.",
              "Construí dashboards de seguimiento de progreso.",
            ],
            stack: [
              "Objetos custom",
              "Profiles y permission sets",
              "Validation rules",
              "Dashboards",
              "SFDX",
            ],
            context:
              "Proyecto de configuración Salesforce durante el bootcamp (Plataforma 5 – CloudGaia, 2023). Foco en modelado de datos y seguridad por rol.",
          },
        },
        {
          name: "Recuerdos de Cobre",
          type: "Diseño web · Proyecto personal",
          problem:
            "Una campaña de rol de mesa de larga duración generaba lore, personajes e historia de sesiones — una pila creciente de información sin un lugar ordenado donde vivir.",
          solution:
            "Diseñé y construí un archivo web que estructura todo: crónicas, un atlas de personajes, facciones y lugares, y una base de conocimiento — con navegación clara y una taxonomía consistente.",
          result:
            "Jugadores y máster recorren todo el mundo desde un solo lugar, y el contenido se mantiene ordenado a medida que crece.",
          details: {
            overview:
              "Un archivo web para la campaña de rol 'Recuerdos de Cobre' — worldbuilding, crónicas de sesión y lore, organizados para que una historia grande y en crecimiento siga siendo navegable.",
            highlights: [
              "Estructuré un gran volumen de narrativa en una arquitectura de información clara (Crónicas, Atlas, Conocimiento).",
              "Diseñé un tema oscuro cohesivo con identidad y arte propios.",
              "Construí patrones de contenido reutilizables para personajes, facciones y lugares, consistentes a escala.",
              "Prioricé la navegación y la legibilidad en contenido profundamente interconectado.",
            ],
            stack: [
              "Diseño web",
              "Arquitectura de información",
              "UI responsive",
              "Estructura de contenido",
              "Vercel",
            ],
            context:
              "Proyecto personal — un ejercicio continuo de worldbuilding y diseño web. En vivo y en expansión activa.",
          },
          liveUrl: "https://recuerdos-de-cobre.vercel.app/",
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
          name: "Marketing Cloud",
          items: [
            "Marketing Cloud Next",
            "Data 360",
            "Identity Resolution",
            "Consentimiento y Preference Manager",
            "Entregabilidad de email (SPF, DKIM, DMARC)",
            "WhatsApp / WABA",
            "Audience Flows y segmentación",
            "Email Studio y Journey Builder",
          ],
        },
        {
          name: "Atención al cliente y soporte técnico",
          items: [
            "Retención y atención al cliente",
            "Gestión de tickets y casos",
            "Diagnóstico técnico (troubleshooting)",
            "Coordinación y seguimiento de servicio",
            "Comunicación en lenguaje claro",
            "Resolución de conflictos",
          ],
        },
        {
          name: "Herramientas & IA",
          items: [
            "Claude",
            "ChatGPT",
            "Gemini",
            "NotebookLM",
            "Notion",
            "Obsidian",
            "Slack",
            "Trello",
          ],
        },
        {
          name: "Web & Documentación",
          items: [
            "HTML, CSS y JavaScript",
            "Diseño web",
            "Arquitectura de información",
            "Redacción técnica y procedimientos",
            "GitHub",
            "VS Code",
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
      body: "Mejor fit: roles Salesforce Admin/Developer. También abierto a atención al cliente, soporte técnico y trabajo web.",
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
