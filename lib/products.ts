/**
 * Centralized product & image data.
 *
 * IMPORTANT — CONFIRM BEFORE LAUNCH:
 * Product names, prices and descriptions below were entered as sample
 * catalog data. Double-check them against the real price list before
 * going live. Images already point at real photography in /public/images
 * — see README.md for where to drop new photos.
 *
 * This is the ONLY file that should need editing to change products/images.
 */

export type Category =
  | "everyday"
  | "signature"
  | "occasion"
  | "embroidered";

export type Collection = "bestsellers" | "signature-edit";

export type ColorOption = {
  name: string;
  swatch: string; // hex used for the tiny color dot
};

export type SizeOption = "S" | "M" | "L";

export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  colors: ColorOption[];
  sizes: SizeOption[];
  description: string;
  details: string[];
  category: Category;
  collection: Collection[];
  featured: boolean;
  bestseller: boolean;
};

export const categories: { value: Category; label: string; image: string; blurb: string }[] = [
  {
    value: "everyday",
    label: "Everyday",
    image: "/images/product-mira-everyday-1.jpg",
    blurb: "Effortless silhouettes for daily wear.",
  },
  {
    value: "signature",
    label: "Signature",
    image: "/images/product-sana-signature-1.jpg",
    blurb: "Our most refined, considered pieces.",
  },
  {
    value: "occasion",
    label: "Occasion",
    image: "/images/product-dania-occasion-2.jpg",
    blurb: "For moments that call for more.",
  },
  {
    value: "embroidered",
    label: "Embroidered",
    image: "/images/product-yusra-embroidered-1.jpg",
    blurb: "Hand-finished detail, quietly luxurious.",
  },
];

const colorLibrary: Record<string, ColorOption> = {
  black: { name: "Black", swatch: "#171310" },
  mocha: { name: "Mocha", swatch: "#6B5644" },
  espresso: { name: "Espresso", swatch: "#3A2E24" },
  sand: { name: "Sand", swatch: "#C9BBA1" },
  ivory: { name: "Ivory", swatch: "#EDE6D8" },
  taupe: { name: "Taupe", swatch: "#8C7A63" },
};

const allSizes: SizeOption[] = ["S", "M", "L"];

export const products: Product[] = [
  {
    id: "p1",
    slug: "aya-signature",
    name: "Aya Signature Abaya",
    price: 12900,
    images: ["/images/product-aya-signature-1.jpg"],
    colors: [colorLibrary.black, colorLibrary.espresso, colorLibrary.sand],
    sizes: allSizes,
    description:
      "A considered, close-to-body silhouette in fluid crepe, finished with a hand-set button placket. Designed to move quietly with you.",
    details: [
      "Fluid crepe, fully lined",
      "Hand-finished button placket",
      "Relaxed sleeve, cuffed at wrist",
      "Dry clean recommended",
    ],
    category: "signature",
    collection: ["signature-edit", "bestsellers"],
    featured: true,
    bestseller: true,
  },
  {
    id: "p2",
    slug: "noor-everyday",
    name: "Noor Everyday Abaya",
    price: 8900,
    images: ["/images/product-noor-everyday-1.jpg"],
    colors: [colorLibrary.black, colorLibrary.mocha],
    sizes: allSizes,
    description:
      "An easy, everyday layer in soft brushed fabric. Minimal seaming keeps the line clean from morning to evening.",
    details: ["Brushed jersey-weight fabric", "Relaxed A-line cut", "Side seam pockets", "Machine washable, cold"],
    category: "everyday",
    collection: ["bestsellers"],
    featured: true,
    bestseller: true,
  },
  {
    id: "p3",
    slug: "layla-occasion",
    name: "Layla Occasion Abaya",
    price: 18500,
    compareAtPrice: 21000,
    images: ["/images/product-layla-occasion-1.jpg", "/images/product-layla-occasion-2.jpg"],
    colors: [colorLibrary.espresso, colorLibrary.black],
    sizes: allSizes,
    description:
      "Draped satin-back crepe with a fluted hem, built for evenings that ask for a little more presence.",
    details: ["Satin-back crepe", "Fluted, weighted hem", "Fully lined", "Dry clean only"],
    category: "occasion",
    collection: [],
    featured: true,
    bestseller: false,
  },
  {
    id: "p4",
    slug: "zara-embroidered",
    name: "Zara Embroidered Abaya",
    price: 22900,
    images: ["/images/product-zara-embroidered-1.jpg", "/images/product-zara-embroidered-2.jpg"],
    colors: [colorLibrary.black, colorLibrary.taupe],
    sizes: allSizes,
    description:
      "Hand-embroidered cuffs and neckline on a structured crepe base — quiet detail, close inspection only.",
    details: ["Hand embroidery at cuff and neckline", "Structured crepe", "Fully lined", "Dry clean only"],
    category: "embroidered",
    collection: ["signature-edit"],
    featured: true,
    bestseller: false,
  },
  {
    id: "p5",
    slug: "sana-signature",
    name: "Sana Signature Abaya",
    price: 13900,
    images: ["/images/product-sana-signature-1.jpg", "/images/product-sana-signature-2.jpg"],
    colors: [colorLibrary.ivory, colorLibrary.sand, colorLibrary.black],
    sizes: allSizes,
    description: "A softly tailored silhouette with a concealed front closure and clean, architectural lines.",
    details: ["Mid-weight crepe", "Concealed front closure", "Structured shoulder", "Dry clean recommended"],
    category: "signature",
    collection: ["signature-edit"],
    featured: false,
    bestseller: false,
  },
  {
    id: "p6",
    slug: "amara-everyday",
    name: "Amara Everyday Abaya",
    price: 7900,
    images: ["/images/product-amara-everyday-1.jpg", "/images/product-amara-everyday-2.jpg"],
    colors: [colorLibrary.black, colorLibrary.mocha, colorLibrary.espresso],
    sizes: allSizes,
    description: "Our lightest everyday layer — breathable, easy-care, and cut for effortless movement.",
    details: ["Lightweight breathable weave", "Easy-care, machine washable", "Relaxed fit", "Side pockets"],
    category: "everyday",
    collection: ["bestsellers"],
    featured: false,
    bestseller: true,
  },
  {
    id: "p7",
    slug: "dania-occasion",
    name: "Dania Occasion Abaya",
    price: 19900,
    images: ["/images/product-dania-occasion-2.jpg"],
    colors: [colorLibrary.black, colorLibrary.espresso],
    sizes: allSizes,
    description: "A fluid, floor-length piece with a subtle sheen — built for weddings and evenings that matter.",
    details: ["Fluid satin-crepe blend", "Floor-length, weighted hem", "Fully lined", "Dry clean only"],
    category: "occasion",
    collection: [],
    featured: false,
    bestseller: false,
  },
  {
    id: "p8",
    slug: "yusra-embroidered",
    name: "Yusra Embroidered Abaya",
    price: 24900,
    images: ["/images/product-yusra-embroidered-1.jpg"],
    colors: [colorLibrary.black, colorLibrary.sand],
    sizes: allSizes,
    description: "Fine tonal embroidery traces the front panel of this structured, occasion-ready piece.",
    details: ["Tonal hand embroidery", "Structured crepe", "Fully lined", "Dry clean only"],
    category: "embroidered",
    collection: ["signature-edit"],
    featured: false,
    bestseller: false,
  },
  {
    id: "p9",
    slug: "farah-signature",
    name: "Farah Signature Abaya",
    price: 14900,
    images: ["/images/product-farah-signature-1.jpg"],
    colors: [colorLibrary.black, colorLibrary.taupe, colorLibrary.ivory],
    sizes: allSizes,
    description: "A signature staple with a gently belted waist and clean, considered proportions.",
    details: ["Mid-weight crepe", "Detachable self-belt", "Structured shoulder", "Dry clean recommended"],
    category: "signature",
    collection: ["bestsellers", "signature-edit"],
    featured: false,
    bestseller: true,
  },
  {
    id: "p10",
    slug: "mira-everyday",
    name: "Mira Everyday Abaya",
    price: 8400,
    images: ["/images/product-mira-everyday-1.jpg", "/images/product-mira-everyday-2.jpg"],
    colors: [colorLibrary.black, colorLibrary.mocha],
    sizes: allSizes,
    description: "A no-fuss layer built for the everyday commute — soft hand, easy care, quietly elegant.",
    details: ["Soft brushed weave", "Machine washable, cold", "Relaxed A-line cut", "Side pockets"],
    category: "everyday",
    collection: [],
    featured: false,
    bestseller: false,
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, count);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured).slice(0, 4);
}

export function getBestsellers() {
  return products.filter((p) => p.bestseller);
}

// Cinematic hero corridor imagery — real photos pulled from @manza.modesty.
// To refresh, drop new files into /public/images and update this list.
export const heroImages: string[] = [
  "/images/abaya-01.jpg",
  "/images/abaya-02.jpg",
  "/images/abaya-03.jpg",
  "/images/abaya-04.jpg",
  "/images/abaya-05.jpg",
  "/images/abaya-06.jpg",
  "/images/abaya-07.jpg",
  "/images/abaya-08.jpg",
  "/images/abaya-09.jpg",
  "/images/abaya-10.jpg",
];

export const lookbookImages: string[] = [
  "/images/lookbook-1.jpg",
  "/images/lookbook-2.jpg",
  "/images/lookbook-3.jpg",
  "/images/lookbook-4.jpg",
  "/images/lookbook-5.jpg",
  "/images/lookbook-6.jpg",
  "/images/lookbook-7.jpg",
  "/images/lookbook-8.jpg",
  "/images/lookbook-9.jpg",
];

// Instagram feed images — real photos pulled from @manza.modesty. To refresh,
// drop new files into /public/images/instagram and update the permalinks below.
export const instagramImages: { src: string; href: string }[] = [
  { src: "/images/instagram/ig-1.jpg", href: "https://www.instagram.com/manza.modesty/p/DS7QW7jiFTp/" },
  { src: "/images/instagram/ig-2.jpg", href: "https://www.instagram.com/manza.modesty/" },
  { src: "/images/instagram/ig-3.jpg", href: "https://www.instagram.com/manza.modesty/" },
  { src: "/images/instagram/ig-4.jpg", href: "https://www.instagram.com/manza.modesty/" },
  { src: "/images/instagram/ig-5.jpg", href: "https://www.instagram.com/manza.modesty/" },
  { src: "/images/instagram/ig-6.jpg", href: "https://www.instagram.com/manza.modesty/" },
  { src: "/images/instagram/ig-7.jpg", href: "https://www.instagram.com/manza.modesty/" },
  { src: "/images/instagram/ig-8.jpg", href: "https://www.instagram.com/manza.modesty/" },
];

export const testimonials = [
  {
    quote: "The fabric, fit and detailing are absolutely beautiful. It feels like a completely different category of abaya.",
    name: "Rabia Nadeem",
  },
  {
    quote: "Understated, elegant, and exactly the silhouette I've been looking for. It moves beautifully.",
    name: "Faiza Shakeeb",
  },
  {
    quote: "From the packaging to the stitching, everything felt considered. Worth every rupee.",
    name: "Hania Shafeeq",
  },
];
