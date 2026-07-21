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
