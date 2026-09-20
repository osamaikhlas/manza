import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { instagramImages } from "@/lib/products";
import { siteConfig } from "@/lib/site";

export function InstagramGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-12 text-center reveal">
        <h2 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">
          Follow the Journey
        </h2>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noreferrer noopener"
          className="link-underline mt-3 inline-block text-sm text-taupe"
        >
          {siteConfig.social.instagramHandle}
        </a>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {instagramImages.map((img) => (
          <a
            key={img.src}
            href={img.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group relative aspect-square overflow-hidden bg-cream"
            aria-label="View this post on Instagram"
          >
            <Image
              src={img.src}
              alt="Manza Instagram photography"
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/40">
              <ExternalLink
                className="h-6 w-6 text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                strokeWidth={1.4}
              />
            </div>
          </a>
        ))}
      </div>
      {/* Static imagery pulled from @manza.modesty, not a live Instagram API
          feed — replace files in /public/images/instagram to update. */}
    </section>
  );
}
