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
