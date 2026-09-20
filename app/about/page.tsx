import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Manza — a contemporary abaya house designed for modern modest living.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[52svh] min-h-[380px] w-full overflow-hidden">
        <Image
          src="/images/brand-story-about.jpg"
          alt="Inside the Manza atelier"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-espresso/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-ivory">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cream/80">About {siteConfig.name}</p>
          <h1 className="mt-5 font-serif text-4xl font-light tracking-tight sm:text-5xl">
            Modesty, made modern.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 lg:px-0">
        <div className="space-y-6 text-sm leading-relaxed text-taupe">
          <p>
            {siteConfig.name} began with a simple question: why should modesty and modernity feel
            like a compromise? Every piece is drafted first for how it moves, then refined for how
            it looks — a considered silhouette, an honest fabric, a finish worth a second look.
          </p>
          <p>
            We design in small batches, favour fewer, better pieces over trend cycles, and treat
            every seam as something a customer will actually touch. From everyday essentials to
            occasion-ready pieces finished with hand embroidery, the intention stays the same:
            quiet confidence, worn daily.
          </p>
          <p className="text-espresso">
            {/* TODO: replace this placeholder narrative with the brand's real founding story. */}
            This is placeholder brand copy — replace it with {siteConfig.name}&rsquo;s real story,
            founders, and craftsmanship details.
          </p>
        </div>

        <div id="shipping" className="mt-16 border-t border-espresso/10 pt-10">
          <h2 className="font-serif text-2xl font-light tracking-tight">Shipping</h2>
          <p className="mt-3 text-sm leading-relaxed text-taupe">
            We deliver nationwide across Pakistan with carefully packaged orders.
            {siteConfig.announcement ? ` ${siteConfig.announcement}.` : ""} Exact carriers, rates
            and delivery windows are configured in {siteConfig.name}&rsquo;s checkout once a
            shipping provider is connected. {/* TODO: confirm real shipping details */}
          </p>
        </div>

        <div id="returns" className="mt-12 border-t border-espresso/10 pt-10">
          <h2 className="font-serif text-2xl font-light tracking-tight">Returns</h2>
          <p className="mt-3 text-sm leading-relaxed text-taupe">
            Easy returns within a configurable window of delivery, provided items are unworn and
            in original packaging. {/* TODO: confirm real returns policy before launch */}
          </p>
        </div>

        <div className="mt-12 border-t border-espresso/10 pt-10">
          <h2 className="font-serif text-2xl font-light tracking-tight">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-taupe">
            <a href={`mailto:${siteConfig.contact.email}`} className="link-underline text-espresso">
              {siteConfig.contact.email}
            </a>
            {" · "}
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline text-espresso"
            >
              {siteConfig.contact.phone}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
