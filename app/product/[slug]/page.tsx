import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductDetail } from "@/components/product-detail";
import { RelatedProducts } from "@/components/related-products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)}.`,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <>
      <ProductDetail product={product} />
      <RelatedProducts products={related} />
    </>
  );
}
