"use client";

import { useStore } from "@/lib/store-context";
import { products } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <h1 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">Wishlist</h1>
      <p className="mt-4 text-sm text-taupe">
        {items.length} {items.length === 1 ? "piece" : "pieces"} saved on this device.
      </p>
      <div className="mt-10">
        {items.length === 0 ? (
          <p className="py-16 text-center text-sm text-taupe">
            Nothing saved yet — tap the heart on any piece to add it here.
          </p>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
}
