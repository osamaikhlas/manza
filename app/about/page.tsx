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
            At {siteConfig.name}, we believe modesty and modernity should never feel like a
            compromise. Our pieces are thoughtfully designed to bring together comfort, elegance,
            and contemporary style — creating clothing that feels as effortless as it looks.
          </p>
          <p>
            Every design begins with movement and wearability in mind, then evolves through
            considered silhouettes, carefully selected fabrics, and refined finishing. We pay
            attention to the details that matter: the way a fabric falls, the feel of every seam,
            and the craftsmanship behind every finish.
          </p>
          <p>
            We believe in creating with intention. Our collections are produced in small batches,
            with a focus on thoughtfully made pieces rather than fleeting trends. From everyday
            essentials to occasion-ready designs featuring intricate hand embroidery, each piece is
            created to become a lasting part of your wardrobe.
          </p>
          <p>
            For us, {siteConfig.name} is more than clothing. It is a quiet expression of
            confidence, designed to be worn, lived in, and cherished.
          </p>
        </div>

        <div id="shipping" className="mt-16 border-t border-espresso/10 pt-10">
          <h2 className="font-serif text-2xl font-light tracking-tight">Shipping</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-taupe">
            <p>
              We offer nationwide delivery across Pakistan. Every order is carefully packaged to
              ensure it reaches you in excellent condition.
            </p>
            <p>Enjoy complimentary delivery when you purchase 3 or more products in a single order.</p>
            <p>
              For orders containing fewer than 3 products, standard delivery charges apply and will
              be calculated at checkout based on your location.
            </p>
          </div>
        </div>

        <div id="returns" className="mt-12 border-t border-espresso/10 pt-10">
          <h2 className="font-serif text-2xl font-light tracking-tight">Returns</h2>
          <div className="mt-3 space-y-3 text-sm leading-relaxed text-taupe">
            <p>
              We want you to feel confident when shopping with {siteConfig.name}. Returns are
              accepted within 7 days of delivery, provided the items are unworn, unused, and
              returned in their original condition and packaging.
            </p>
            <p>
              Items that have been worn, washed, altered, or damaged may not be eligible for
              return.
            </p>
            <p>For assistance with a return, please contact us within 7 days of receiving your order.</p>
          </div>
        </div>

        <div id="contact" className="mt-12 border-t border-espresso/10 pt-10">
          <h2 className="font-serif text-2xl font-light tracking-tight">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-taupe">
            For questions about your order, products, returns, or anything else, we&rsquo;re happy
            to help.
          </p>
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
