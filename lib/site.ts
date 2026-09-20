/**
 * Central brand & site configuration.
 * Change the brand name, contact details, social links, navigation and
 * footer content here — nothing else in the codebase should need editing.
 */

export const siteConfig = {
  name: "Manza",
  logo: "/images/logo.jpg",
  tagline: "Contemporary Abayas",
  description:
    "Manza is a contemporary abaya house crafting refined, modern silhouettes for the woman who moves with quiet confidence.",
  url: "https://manza.example.com", // TODO: replace with real production domain
  currency: "PKR",

  // TODO: replace with real, confirmed business copy before launch.
  announcement: "Complimentary delivery on orders over PKR 10,000",

  contact: {
    email: "244manza244@gmail.com",
    phone: "+923132422836",
    whatsapp: "+923132422836",
  },

  social: {
    instagram: "https://www.instagram.com/manza.modesty/",
    instagramHandle: "@manza.modesty",
    // Placeholders — replace with real links when available.
    tiktok: "#", // TODO: add real TikTok URL
    pinterest: "#", // TODO: add real Pinterest URL
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
      { label: "Journal", href: "#" }, // TODO: connect when journal/blog exists
      { label: "Contact", href: "#contact" },
    ],
    help: [
      { label: "Shipping", href: "/about#shipping" },
      { label: "Returns", href: "/about#returns" },
      { label: "Size Guide", href: "#" }, // TODO: link full size guide page
      { label: "FAQs", href: "#" }, // TODO: add FAQ page
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
