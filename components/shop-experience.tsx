"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { products, categories, type Category, type Collection } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function ShopExperience() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const initialCollection = searchParams.get("collection") as Collection | null;

  const [category, setCategory] = useState<Category | "all">(initialCategory ?? "all");
  const [collection, setCollection] = useState<Collection | "all">(initialCollection ?? "all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.slice();
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (collection !== "all") list = list.filter((p) => p.collection.includes(collection));

    switch (sort) {
      case "price-asc":
        list = list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = list.sort((a, b) => b.price - a.price);
        break;
      default:
        list = list.filter((p) => p.featured).concat(list.filter((p) => !p.featured));
    }
    return list;
  }, [category, collection, sort]);

  const title =
    collection !== "all"
      ? collection === "bestsellers"
        ? "Bestsellers"
        : "Signature Edit"
      : category !== "all"
      ? categories.find((c) => c.value === category)?.label
      : "All Abayas";

  const FilterPanel = (
    <div className="space-y-8">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">Category</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c.value} active={category === c.value} onClick={() => setCategory(c.value)}>
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">Collection</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip active={collection === "all"} onClick={() => setCollection("all")}>
            All
          </FilterChip>
          <FilterChip active={collection === "bestsellers"} onClick={() => setCollection("bestsellers")}>
            Bestsellers
          </FilterChip>
          <FilterChip active={collection === "signature-edit"} onClick={() => setCollection("signature-edit")}>
            Signature Edit
          </FilterChip>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">Shop</p>
        <h1 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-taupe">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between border-y border-espresso/10 py-4">
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} />
          Filter
        </button>
        <div className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-taupe lg:block">
          Refine
        </div>

        <label className="flex items-center gap-2 text-xs">
          <span className="hidden font-semibold uppercase tracking-[0.14em] text-taupe sm:inline">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-espresso/15 bg-transparent px-3 py-2 text-xs uppercase tracking-wide focus:outline-none"
            aria-label="Sort products"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{FilterPanel}</aside>
        <ProductGrid products={filtered} />
      </div>

      {/* Mobile filter bottom sheet */}
      <div
        className={cn(
          "fixed inset-0 z-[70] bg-espresso/40 transition-opacity duration-300 lg:hidden",
          mobileFiltersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-[80] max-h-[80vh] overflow-y-auto rounded-t-xl bg-ivory p-6 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          mobileFiltersOpen ? "translate-y-0" : "translate-y-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
      >
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.14em]">Filter</p>
          <button type="button" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="mt-6">{FilterPanel}</div>
        <button
          type="button"
          onClick={() => setMobileFiltersOpen(false)}
          className="mt-8 w-full bg-espresso py-3 text-xs font-semibold uppercase tracking-[0.14em] text-ivory"
        >
          Show {filtered.length} results
        </button>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3 py-1.5 text-xs uppercase tracking-wide transition-colors",
        active ? "border-espresso bg-espresso text-ivory" : "border-espresso/15"
      )}
    >
      {children}
    </button>
  );
}
