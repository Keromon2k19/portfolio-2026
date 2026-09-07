# Joaquin Haro Filippon | Portfolio

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

- `src/data/content.ts`: all EN/ES copy, typed (single source of truth)
- `src/components/`: one section per component
- `/` English (default) · `/es/` Spanish
