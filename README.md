# Manza — Contemporary Abaya E-Commerce (Frontend Prototype)

A luxury, editorial-first storefront prototype built with Next.js (App Router),
TypeScript, Tailwind CSS v4, and hand-authored shadcn-style primitives.

This is a **frontend prototype**: there is no payment processor or commerce
backend wired up yet. Cart, wishlist and recent searches persist to
`localStorage` only, and checkout clearly states that no order is placed.

## Stack

- Next.js 16 (App Router, React 19, TypeScript, Turbopack)
- Tailwind CSS v4 (CSS-based theme in `app/globals.css`, no `tailwind.config.js`)
- shadcn-style structure (`components.json`, `components/ui/*`), Radix UI
  primitives for the accordion, `lucide-react` for icons
- No backend / payment integration (see "Where to connect a real backend" below)

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

`npm run build` produces a production build; `npm run lint` runs ESLint.

## The `ImageStreamHero` component

The brief referenced an existing `ImageStreamHero` component (a cinematic 3D
corridor of images) that was not actually attached to this conversation, so
`components/ui/image-stream-hero.tsx` is a from-scratch implementation built
to the same contract described in the brief:

```tsx
<ImageStreamHero
  images={heroImages}   // string[] of image URLs
  cards={18}             // how many floating tiles are alive at once
  speed={26}              // seconds per tile's full journey — higher = slower
  axis="z"                // "z" (corridor toward viewer), "x", or "y"
  path="drift"            // "straight" or "drift" (adds lateral motion)
>
  {/* hero overlay content — eyebrow, heading, CTAs */}
</ImageStreamHero>
```

It's pure CSS (`@keyframes` in `globals.css`, prefixed `isr-*`) driven by
`transform: translateZ()`/`scale()`/`opacity`, wrapped in a `perspective`
container — no animation library dependency, and it fully respects
`prefers-reduced-motion` (falls back to a static cross-faded collage).

**If you have your own real `ImageStreamHero` implementation**, drop it in at
this same path with the same export name and prop names, and every place
that imports it (`components/hero.tsx`) will keep working unchanged.

## Fonts

The brief asked for an elegant serif + clean sans pairing (e.g. Fraunces +
Inter). This sandbox environment couldn't reach `fonts.googleapis.com` at
build time, so `app/globals.css` currently points `--font-serif` /
`--font-sans` at robust **system font stacks** instead, so the build never
depends on network access. To restore the intended Google Fonts pairing:

1. In `app/layout.tsx`, re-add:
   ```tsx
   import { Fraunces, Inter } from "next/font/google";
   const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal","italic"], weight: ["300","400","500","600"] });
   const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["300","400","500","600"] });
   ```
   and add `${fraunces.variable} ${inter.variable}` to the `<body>` className.
2. In `app/globals.css`, point `--font-serif`/`--font-sans` at
   `var(--font-fraunces)` / `var(--font-inter)`.

## Where everything lives (edit these, not the components)

- **Brand config** — name, tagline, Instagram, contact, nav, footer links,
  announcement bar copy, trust messaging: `lib/site.ts`
- **Products & imagery** — every product, category, hero/lookbook/Instagram
  image arrays, testimonials: `lib/products.ts`
- **Images** — `public/images/*`. Every image the storefront uses today is a
  generated placeholder SVG (see `scripts/gen-placeholders.mjs`) clearly
  labelled "SAMPLE IMAGE". Replace them with real photography exported from
  the brand's Instagram/product shoots, keeping the same file names (or
  updating the paths in `lib/products.ts`), and swap `.svg` for `.jpg`/`.webp`
  as needed — `next.config.ts` currently allows local SVGs for the
  placeholders and can stay as-is once real raster photos are dropped in.
  Instagram grid images specifically go in `public/images/instagram/`.

**Nothing else in the codebase should need to change** to rebrand, re-price,
or reshoot the site.

## Sample data disclosure

Every product, price, testimonial, and the brand-story/about copy is
**placeholder/sample data**, clearly marked with `// TODO` comments or
"sample" copy where it appears. No real business claims (shipping times,
return windows, etc.) were invented — those are flagged with TODOs in
`lib/site.ts`, `app/about/page.tsx`, and `components/product-detail.tsx` for
you to confirm before launch.

## Where to connect a real backend

- **Payments / orders**: `app/checkout/page.tsx` explicitly states no
  payment is processed. Wire up Shopify, Medusa, Stripe Checkout, or a local
  gateway here; `lib/store-context.tsx` (`CartLine`, `addToCart`, etc.) is
  already shaped so a real backend can sit behind the same interface.
- **Accounts**: `app/account/page.tsx` is a placeholder — connect a real
  customer/auth provider.
- **Newsletter**: `components/newsletter.tsx` just flips local UI state on
  submit — wire the `onSubmit` handler to your ESP (Klaviyo, Mailchimp, etc.).
- **Search**: `components/search-overlay.tsx` searches the local `products`
  array client-side — fine at this catalog size, but swap in a real search
  service if the catalog grows.

## Structure

```
app/                  routes (home, shop, product/[slug], about, cart, checkout, account, wishlist)
components/           page sections & shared UI (Navbar, ProductCard, CartDrawer, ...)
components/ui/        shadcn-style primitives (accordion, image-stream-hero)
lib/                  site config, product data, cart/wishlist context, utils
public/images/        all imagery (placeholders — see above)
scripts/               one-off placeholder-image generator
```

## Known limitations / next steps

- Fonts are system stacks, not the intended Fraunces/Inter pairing (see above).
- All imagery is placeholder SVG art, not real photography.
- No backend: payments, accounts, and newsletter are UI-only.
- TikTok/Pinterest footer links are `#` placeholders — add real URLs in
  `lib/site.ts` when available.
