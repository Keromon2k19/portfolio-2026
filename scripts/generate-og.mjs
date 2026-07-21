import sharp from "sharp";
import { mkdirSync } from "node:fs";

const NAVY = "#032D60";
const BLUE = "#0176D3";

function ogSvg(title, subtitle) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect x="80" y="150" width="72" height="12" fill="${BLUE}"/>
  <text x="80" y="290" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#FFFFFF">Joaquin Haro Filippon</text>
  <text x="80" y="370" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="600" fill="#8BB8E8">${title}</text>
  <text x="80" y="440" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#B9CBE0">${subtitle}</text>
</svg>`;
}

function iconSvg(size) {
  const r = Math.round(size * 0.22);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="${NAVY}"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${Math.round(size * 0.42)}" font-weight="700" fill="#FFFFFF">J<tspan fill="#57A3E8">H</tspan></text>
</svg>`;
}

mkdirSync("public/og", { recursive: true });

await sharp(Buffer.from(ogSvg("Salesforce Administrator &amp; Developer", "CRM data · Flows · Reporting · Documentation")))
  .png()
  .toFile("public/og/og-en.png");

await sharp(Buffer.from(ogSvg("Salesforce Administrator &amp; Developer", "Datos CRM · Flows · Reporting · Documentación")))
  .png()
  .toFile("public/og/og-es.png");

await sharp(Buffer.from(iconSvg(180))).png().toFile("public/apple-touch-icon.png");
await sharp(Buffer.from(iconSvg(512))).png().toFile("public/icon-512.png");

console.log("OG images and icons generated");
