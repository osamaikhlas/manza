"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductGallery } from "@/components/product-gallery";
import { SizeSelector } from "@/components/size-selector";
import { WishlistButton } from "@/components/wishlist-button";
import { useStore } from "@/lib/store-context";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";

export function ProductDetail({ product }: { product: Product }) {
  const color = product.colors[0]?.name ?? "";
  const [size, setSize] = useState<string>(product.sizes[Math.floor(product.sizes.length / 2)] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useStore();

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:px-10 lg:py-16">
      <ProductGallery images={product.images} alt={product.name} />

      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze">
          {product.category}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light tracking-tight sm:text-4xl">{product.name}</h1>
        <div className="mt-3 flex items-center gap-3 text-lg">
          <span>{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-taupe line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-taupe">{product.description}</p>

        {color && (
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">
            Color — <span className="text-espresso">{color}</span>
            <span className="ml-2 normal-case font-normal text-taupe">
              (one of a kind — not available in other colors)
            </span>
          </p>
        )}

        <div className="mt-8 space-y-7">
          <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">Quantity</p>
            <div className="mt-3 flex w-fit items-center gap-4 border border-espresso/15 px-3 py-2">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
              <span className="w-5 text-center text-sm">{quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
                <Plus className="h-3.5 w-3.5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => {
              addToCart(product, color, size, quantity);
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            className="flex-1 bg-espresso py-4 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-opacity hover:opacity-90"
          >
            {added ? "Added to Bag" : "Add to Bag"}
          </button>
          <WishlistButton
            productId={product.id}
            productName={product.name}
            size="lg"
            className="flex aspect-square items-center justify-center border border-espresso/15 px-4"
          />
        </div>

        <div className="mt-10">
          <Accordion type="single" collapsible defaultValue="details">
            <AccordionItem value="details">
              <AccordionTrigger>Details & Fabric</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1.5">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping</AccordionTrigger>
              <AccordionContent>
                Nationwide delivery across Pakistan, carefully packaged. Exact timelines and
                rates are configured at checkout. {/* TODO: confirm real shipping copy */}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
              <AccordionTrigger>Returns</AccordionTrigger>
              <AccordionContent>
                Easy returns within a configurable window of delivery. {/* TODO: confirm real returns policy */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
