"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="lg:flex lg:gap-3">
      <div className="hidden flex-col gap-3 lg:flex">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={active === i}
            className={cn(
              "relative h-20 w-16 shrink-0 overflow-hidden bg-cream transition-opacity",
              active === i ? "opacity-100 ring-1 ring-espresso" : "opacity-60 hover:opacity-100"
            )}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream lg:flex-1">
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto lg:hidden">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={active === i}
            className={cn(
              "relative h-16 w-14 shrink-0 overflow-hidden bg-cream",
              active === i ? "ring-1 ring-espresso" : "opacity-60"
            )}
          >
            <Image src={src} alt="" fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
