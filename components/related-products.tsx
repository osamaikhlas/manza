import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <h2 className="mb-10 font-serif text-3xl font-light tracking-tight">You may also like</h2>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
