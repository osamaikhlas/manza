// One-off generator for elegant SVG placeholder imagery so the prototype
// renders beautifully before real product photography is dropped in.
// Run: node scripts/gen-placeholders.mjs
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Built from the brand colors #EEC2F4 (orchid), #DCDADD (lavender-grey) and
// #544E55 (plum-charcoal). Kept in sync with the --color-* tokens in
// app/globals.css.
const palettes = [
  ["#E5E3E6", "#DCDADD"], // cream -> sand
  ["#DCDADD", "#98949A"], // sand -> taupe-light
  ["#4A384D", "#1B111C"], // espresso-light -> charcoal
  ["#F3E4F6", "#EEC2F4"], // pale orchid -> bronze-light
  ["#B7ACBA", "#544E55"], // muted lilac -> taupe
];

function svg(label, sub, w, h, seed) {
  const [c1, c2] = palettes[seed % palettes.length];
  const dark = seed % 3 === 2;
  const textColor = dark ? "#F3F2F3" : "#2F2032";
  const subColor = dark ? "#DCDADD" : "#544E55";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" result="noise" seed="${seed}"/>
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.03 0"/>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g${seed})"/>
  <rect width="${w}" height="${h}" filter="url(#grain)"/>
  <line x1="${w * 0.08}" y1="${h - h * 0.12}" x2="${w * 0.3}" y2="${h - h * 0.12}" stroke="${subColor}" stroke-width="1"/>
  <text x="${w * 0.08}" y="${h - h * 0.08}" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(w * 0.032)}" fill="${textColor}" letter-spacing="1">${label}</text>
  <text x="${w * 0.08}" y="${h - h * 0.045}" font-family="Helvetica, Arial, sans-serif" font-size="${Math.round(w * 0.016)}" fill="${subColor}" letter-spacing="2">${sub}</text>
</svg>`;
}

const outDir = join(process.cwd(), "public", "images");
const igDir = join(outDir, "instagram");
mkdirSync(outDir, { recursive: true });
mkdirSync(igDir, { recursive: true });

let seed = 0;
function make(path, label, sub, w = 1200, h = 1500) {
  writeFileSync(path, svg(label, sub, w, h, seed++));
}

// Hero corridor images
for (let i = 1; i <= 10; i++) {
  make(join(outDir, `abaya-${String(i).padStart(2, "0")}.jpg`.replace(".jpg", ".svg")), `MANZA`, `LOOK ${String(i).padStart(2, "0")} — SAMPLE IMAGE`, 1400, 1750);
}

// Category / editorial images
["everyday", "signature", "occasion", "embroidered", "new-arrivals"].forEach((cat) => {
  make(join(outDir, `category-${cat}.svg`), "MANZA", `${cat.replace("-", " ").toUpperCase()} — SAMPLE IMAGE`, 1200, 1500);
});

// Campaign / brand story
make(join(outDir, "campaign-new-season.svg"), "MANZA", "NEW SEASON CAMPAIGN — SAMPLE IMAGE", 1920, 1080);
make(join(outDir, "brand-story.svg"), "MANZA", "ATELIER — SAMPLE IMAGE", 1200, 1500);

// Lookbook
for (let i = 1; i <= 6; i++) {
  make(join(outDir, `lookbook-${i}.svg`), "MANZA", `LOOKBOOK ${String(i).padStart(2, "0")} — SAMPLE IMAGE`, 1200, 1500);
}

// Instagram grid
for (let i = 1; i <= 8; i++) {
  make(join(igDir, `ig-${i}.svg`), "MANZA", `@MANZA.MODESTY — SAMPLE`, 800, 800);
}

// Product images (2 per product, 10 products)
const productSlugs = [
  "aya-signature",
  "noor-everyday",
  "layla-occasion",
  "zara-embroidered",
  "sana-signature",
  "amara-everyday",
  "dania-occasion",
  "yusra-embroidered",
  "farah-signature",
  "mira-everyday",
];
productSlugs.forEach((slug) => {
  make(join(outDir, `product-${slug}-1.svg`), "MANZA", `${slug.toUpperCase()} — FRONT — SAMPLE`, 1000, 1250);
  make(join(outDir, `product-${slug}-2.svg`), "MANZA", `${slug.toUpperCase()} — DETAIL — SAMPLE`, 1000, 1250);
});

console.log("Placeholder images generated in /public/images");
