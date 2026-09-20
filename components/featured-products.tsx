import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function FeaturedProducts() {
  const products = getFeaturedProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 reveal">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
            Curated Selection
          </p>
          <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
            Curated For You
          </h2>
        </div>
        <Link href="/shop" className="link-underline text-xs font-semibold uppercase tracking-[0.14em]">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
