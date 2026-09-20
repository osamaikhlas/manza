"use client";

import { Heart } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { cn } from "@/lib/utils";

export function WishlistButton({
  productId,
  productName,
  className,
  size = "sm",
}: {
  productId: string;
  productName: string;
  className?: string;
  size?: "sm" | "lg";
}) {
  const { toggleWishlist, isWishlisted } = useStore();
  const active = isWishlisted(productId);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      className={cn(
        "inline-flex items-center justify-center transition-transform hover:scale-105",
        className
      )}
    >
      <Heart
        className={cn(size === "sm" ? "h-4 w-4" : "h-5 w-5")}
        strokeWidth={1.4}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  );
}
