import Image from "next/image";
import { lookbookImages } from "@/lib/products";

export function Lookbook() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-xl reveal">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
            Editorial
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
            The Lookbook
          </h2>
        </div>
      </div>

      <div className="no-scrollbar flex gap-4 overflow-x-auto px-6 pb-2 lg:mx-auto lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-10">
        {lookbookImages.map((src, i) => (
          <div
            key={src}
            className={`relative aspect-[4/5] w-[72vw] shrink-0 overflow-hidden sm:w-[42vw] lg:w-auto ${
              i === 0 ? "lg:col-span-2 lg:aspect-[16/10]" : ""
            }`}
          >
            <Image
              src={src}
              alt={`Manza lookbook, look ${i + 1}`}
              fill
              sizes="(max-width: 1024px) 70vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
