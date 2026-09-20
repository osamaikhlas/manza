import { Star } from "lucide-react";
import { testimonials } from "@/lib/products";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-10 lg:py-32">
      <h2 className="reveal font-serif text-4xl font-light tracking-tight sm:text-5xl">
        Worn with love.
      </h2>

      <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
        {testimonials.map((t, i) => (
          <figure key={i} className="reveal" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex justify-center gap-1 text-bronze" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-taupe">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso">
              — {t.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
