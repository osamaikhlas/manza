import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <p className="py-16 text-center text-sm text-taupe">No products match these filters.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
