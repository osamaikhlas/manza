import Link from "next/link";
import { ImageStreamHero } from "@/components/ui/image-stream-hero";
import { heroImages } from "@/lib/products";

export function Hero() {
  return (
    <section className="relative -mt-20 h-[calc(92svh+80px)] min-h-[640px] w-full">
      <ImageStreamHero images={heroImages} cards={18} speed={26} axis="z" path="drift">
        {/* Dedicated scrim so the fixed navbar stays legible over any tile */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/80 to-transparent" />
        <div className="mx-auto flex max-w-2xl flex-col items-center px-6 text-center text-ivory">
          <p className="reveal text-[11px] font-semibold uppercase tracking-[0.32em] text-cream/80">
            The New Collection
          </p>
          <h1 className="reveal mt-5 font-serif text-[2.75rem] font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl" style={{ animationDelay: "120ms" }}>
            Elegance,
            <br />
            in every layer.
          </h1>
          <p className="reveal mt-6 max-w-md text-sm leading-relaxed text-cream/85 sm:text-base" style={{ animationDelay: "220ms" }}>
            Contemporary abayas designed with timeless silhouettes, refined details and
            effortless modesty.
          </p>
          <div className="reveal mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "320ms" }}>
            <Link
              href="/shop?collection=bestsellers"
              className="bg-ivory px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso transition-opacity hover:opacity-90"
            >
              Shop Bestsellers
            </Link>
            <Link
              href="/shop"
              className="border border-ivory/70 px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-ivory/10"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </ImageStreamHero>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-ivory/70">
        <span>Scroll</span>
        <span className="h-8 w-px animate-pulse bg-ivory/50" aria-hidden="true" />
      </div>
    </section>
  );
}
