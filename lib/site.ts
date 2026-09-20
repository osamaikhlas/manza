/**
 * Central brand & site configuration.
 * Change the brand name, contact details, social links, navigation and
 * footer content here — nothing else in the codebase should need editing.
 */

// Resolves to (in order): an explicit override, the Vercel production
// domain, the current Vercel deployment URL, or localhost for local dev —
// so metadata/OG URLs are always correct without hardcoding a domain here.
// Set NEXT_PUBLIC_SITE_URL once a custom domain is live.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ??
  "http://localhost:3000";

export const siteConfig = {
  name: "Manza",
  logo: "/images/logo.jpg",
  tagline: "Contemporary Abayas",
  description:
    "Manza is a contemporary abaya house crafting refined, modern silhouettes for the woman who moves with quiet confidence.",
  url: siteUrl,
  currency: "PKR",

  announcement: "Complimentary delivery when you order 3 or more items",

  contact: {
    email: "manza.modesty@gmail.com",
    phone: "+923408768938",
    whatsapp: "+923408768938",
  },

  social: {
    instagram: "https://www.instagram.com/manza.modesty/",
    instagramHandle: "@manza.modesty",
  },

  nav: [
    { label: "Collections", href: "/shop" },
    { label: "About", href: "/about" },
  ],

  footerLinks: {
    shop: [
      { label: "Abayas", href: "/shop" },
      { label: "Collections", href: "/shop" },
      { label: "Bestsellers", href: "/shop?collection=bestsellers" },
    ],
    about: [
      { label: "Our Story", href: "/about" },
      { label: "Contact", href: "/about#contact" },
    ],
    help: [
      { label: "Shipping", href: "/about#shipping" },
      { label: "Returns", href: "/about#returns" },
    ],
  },

  trust: [
    { label: "Secure checkout" },
    { label: "Easy returns" },
    { label: "Nationwide delivery" },
    { label: "Carefully packaged orders" },
    { label: "Customer support" },
  ],

  legal: {
    year: new Date().getFullYear(),
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Shipping & Returns", href: "/about#shipping" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
