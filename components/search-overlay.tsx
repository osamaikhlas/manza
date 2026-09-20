"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { products } from "@/lib/products";
import { formatPrice, cn } from "@/lib/utils";
import { useOverlayEffects } from "@/lib/use-overlay-effects";

const RECENT_KEY = "manza:recent-searches";

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (isSearchOpen) {
      try {
        const raw = localStorage.getItem(RECENT_KEY);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from browser storage when the overlay opens
        if (raw) setRecent(JSON.parse(raw));
      } catch {}
    }
  }, [isSearchOpen]);

  useOverlayEffects(isSearchOpen, closeSearch);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.includes(q)
    ).slice(0, 6);
  }, [query]);

  function commitSearch(value: string) {
    if (!value.trim()) return;
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, 5);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80] bg-ivory transition-opacity duration-400",
        isSearchOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="mx-auto flex max-w-3xl flex-col px-6 pt-24">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center gap-4 border-b border-espresso/20 pb-4">
            <Search className="h-5 w-5 text-taupe" strokeWidth={1.4} />
            <input
              autoFocus={isSearchOpen}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitSearch(query);
              }}
              type="search"
              placeholder="Search abayas, collections..."
              aria-label="Search products"
              className="w-full bg-transparent font-serif text-2xl placeholder:text-taupe/60 focus:outline-none"
            />
          </div>
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="ml-6 shrink-0"
          >
            <X className="h-6 w-6" strokeWidth={1.4} />
          </button>
        </div>

        <div className="mt-10">
          {query.trim() === "" ? (
            <div>
              {recent.length > 0 && (
                <>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">
                    Recent Searches
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <li key={r}>
                        <button
                          type="button"
                          onClick={() => setQuery(r)}
                          className="border border-espresso/15 px-3 py-1.5 text-xs uppercase tracking-wide transition-colors hover:bg-espresso hover:text-ivory"
                        >
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">
                Suggested
              </p>
              <ul className="mt-4 space-y-2">
                {products.slice(0, 4).map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => closeSearch()}
                      className="link-underline text-sm"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="space-y-4">
              {results.length === 0 && (
                <p className="text-sm text-taupe">No results for &ldquo;{query}&rdquo;.</p>
              )}
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={() => {
                      commitSearch(query);
                      closeSearch();
                    }}
                    className="flex items-center gap-4 py-2"
                  >
                    <div className="relative h-16 w-12 shrink-0 overflow-hidden bg-cream">
                      <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{p.name}</p>
                      <p className="text-xs text-taupe">{formatPrice(p.price)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
