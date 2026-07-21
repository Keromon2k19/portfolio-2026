import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://joaquinharofilipponportfolio.netlify.app",
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: "en", locales: { en: "en", es: "es" } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
