import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopExperience } from "@/components/shop-experience";

export const metadata: Metadata = {
  title: "Shop Abayas",
  description: "Browse the full Manza collection — everyday, signature, occasion and embroidered abayas.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopExperience />
    </Suspense>
  );
}
