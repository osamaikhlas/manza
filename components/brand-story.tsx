import Link from "next/link";

export function BrandStory() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-32">
      <div className="relative aspect-[4/5] overflow-hidden bg-cream reveal">
        <video
          src="/videos/brand-story.mp4"
          poster="/images/brand-story-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Inside the Manza atelier"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-center reveal" style={{ animationDelay: "120ms" }}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">Our Story</p>
        <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
          Made for your moments.
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-taupe">
          <p>
            Manza began with a simple question: why should modesty and modernity feel like a
            compromise? Every piece is drafted first for how it moves, then refined for how it
            looks — a considered silhouette, an honest fabric, a finish worth a second look.
          </p>
          <p>
            We design in small batches, favour fewer, better pieces over trend cycles, and treat
            every seam as something a customer will actually touch. Quiet confidence, worn daily.
          </p>
        </div>
        <Link
          href="/about"
          className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] link-underline"
        >
          Our Story →
        </Link>
      </div>
    </section>
  );
}
