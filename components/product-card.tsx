"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { WishlistButton } from "@/components/wishlist-button";
import { useStore } from "@/lib/store-context";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart } = useStore();
  const secondImage = product.images[1] ?? product.images[0];

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-cream">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-opacity duration-700 ${hovered ? "opacity-0" : "opacity-100"}`}
          />
          <Image
            src={secondImage}
            alt=""
            aria-hidden="true"
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover scale-105 transition-all duration-700 ${hovered ? "opacity-100 scale-100" : "opacity-0"}`}
          />

          <WishlistButton
            productId={product.id}
            productName={product.name}
            className="absolute right-3 top-3 z-10 text-espresso/70 hover:text-espresso"
          />

          {product.compareAtPrice && (
            <span className="absolute left-3 top-3 bg-espresso px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-ivory">
              Sale
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.colors[0].name, product.sizes[Math.floor(product.sizes.length / 2)]);
            }}
            className={`absolute inset-x-3 bottom-3 bg-ivory/95 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso opacity-0 transition-all duration-300 hover:bg-espresso hover:text-ivory group-hover:opacity-100 ${hovered ? "translate-y-0" : "translate-y-1"}`}
          >
            Quick Add
          </button>
        </div>

        <div className="mt-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-espresso">
            {product.name}
          </p>
          <div className="mt-1.5 flex items-center gap-2 text-sm">
            <span>{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-taupe line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
