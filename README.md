# Manza — Contemporary Abaya E-Commerce

A luxury, editorial-first storefront built with Next.js (App Router),
TypeScript, Tailwind CSS v4, and hand-authored shadcn-style primitives.

Checkout collects delivery details and places the order over WhatsApp —
payment is Cash on Delivery, there's no payment gateway integration. Cart,
wishlist and recent searches persist to `localStorage` only (device-local,
no accounts/backend).

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
- **Images** — `public/images/*`. Populated with real product/brand
  photography (jpg/png). `scripts/gen-placeholders.mjs` is the original
  placeholder-SVG generator used early on — it's no longer wired into the
  build and can be deleted once you're confident you won't need to
  regenerate stand-ins. Instagram grid images specifically go in
  `public/images/instagram/`.

**Nothing else in the codebase should need to change** to rebrand, re-price,
or reshoot the site.

## Business data to confirm before launch

`lib/products.ts` still carries a header comment flagging its product
names/prices/descriptions as sample data pending catalog confirmation —
double-check those numbers against the real price list before going live.
Site-wide contact details, shipping/returns policy, and Instagram handle in
`lib/site.ts` and `app/about/page.tsx` are already real. The footer's
`legal.links` for Privacy Policy and Terms in `lib/site.ts` still point to
`#` — add real policy pages/URLs before launch, or remove the links.

## Where to connect a real backend (optional — not required to ship)

The site works today without any of this: checkout collects delivery
details and hands the order to WhatsApp for manual confirmation
(`app/checkout/checkout-content.tsx`), Cash on Delivery only. Swap in a real
backend later if/when it's needed:

- **Payments / orders**: replace the WhatsApp hand-off in
  `app/checkout/checkout-content.tsx` with Shopify, Medusa, Stripe Checkout,
  or a similar gateway; `lib/store-context.tsx` (`CartLine`, `addToCart`,
  etc.) is already shaped so a real backend can sit behind the same
  interface.
- **Accounts**: none exist yet — add a customer/auth provider if needed.
- **Newsletter**: `components/newsletter.tsx` just flips local UI state on
  submit — wire the `onSubmit` handler to your ESP (Klaviyo, Mailchimp, etc.).
- **Search**: `components/search-overlay.tsx` searches the local `products`
  array client-side — fine at this catalog size, but swap in a real search
  service if the catalog grows.

## Structure

```
app/                  routes (home, shop, product/[slug], about, cart, checkout, wishlist)
components/           page sections & shared UI (Navbar, ProductCard, CartDrawer, ...)
components/ui/        shadcn-style primitives (accordion, image-stream-hero)
lib/                  site config, product data, cart/wishlist context, utils
public/images/        all imagery
scripts/               legacy one-off placeholder-image generator (unused)
```

## Known limitations / next steps

- Fonts are system stacks, not the intended Fraunces/Inter pairing (see above).
- No payment gateway or accounts — checkout is WhatsApp + Cash on Delivery,
  and cart/wishlist/recent-searches are device-local only (see above).
- Privacy Policy / Terms footer links are `#` placeholders — see
  "Business data to confirm before launch".
