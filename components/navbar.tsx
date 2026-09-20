"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Search, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { useStore } from "@/lib/store-context";
import { MobileMenu } from "@/components/mobile-menu";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlist, openCart, openSearch } = useStore();

  useEffect(() => {
    // Threshold matches the announcement bar's height (h-9 = 36px) exactly,
    // so the header snaps to top-0 the instant the bar scrolls out of view —
    // no gap, no lag.
    const onScroll = () => setScrolled(window.scrollY >= 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={cn(
        // `top` is intentionally NOT transitioned: it must snap instantly to
        // stay locked to the scroll position, or the header visibly lags
        // behind the announcement bar as it scrolls away.
        "fixed inset-x-0 z-40 h-20 w-full transition-colors duration-500",
        scrolled ? "top-0" : "top-9",
        transparent
          ? "bg-transparent"
          : "border-b border-espresso/10 bg-ivory/95 backdrop-blur-sm"
      )}
    >
      <div
        className={cn(
          "mx-auto grid h-full max-w-7xl grid-cols-3 items-center px-6 transition-colors duration-500 lg:px-10",
          transparent ? "text-ivory" : "text-espresso"
        )}
      >
        <div className="flex items-center gap-4">
          <div className="lg:hidden">
            <MobileMenu transparent={transparent} />
          </div>
          <Link
            href="/"
            className="hidden items-center gap-2.5 lg:flex"
          >
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
              priority
            />
            <span className="font-serif text-2xl font-medium tracking-[0.08em]">
              {siteConfig.name}
            </span>
          </Link>
        </div>

        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 justify-self-center lg:hidden"
        >
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={34}
            height={34}
            className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
            priority
          />
          {/* Wordmark hides below `sm` so it can never be flex-shrunk into
              overlapping the logo on very narrow phones — the logo alone is
              enough to identify the brand at that size. */}
          <span className="hidden shrink-0 whitespace-nowrap font-serif text-xl font-medium tracking-[0.08em] sm:inline">
            {siteConfig.name}
          </span>
        </Link>

        <nav className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-8 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em]">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="link-underline pb-1">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-5">
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            className="hidden transition-opacity hover:opacity-60 lg:inline-flex"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </button>
          <button
            type="button"
            onClick={openSearch}
            aria-label="Search"
            className="inline-flex transition-opacity hover:opacity-60 lg:hidden"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.4} />
          </button>
          <Link
            href="/wishlist"
            aria-label={`Wishlist${wishlist.length ? `, ${wishlist.length} items` : ""}`}
            className="relative inline-flex transition-opacity hover:opacity-60"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.4} />
            {wishlist.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-bronze text-[9px] font-semibold text-ivory">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Shopping bag${cartCount ? `, ${cartCount} items` : ""}`}
            className="relative inline-flex transition-opacity hover:opacity-60"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-bronze text-[9px] font-semibold text-ivory">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
