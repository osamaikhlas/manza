import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/products";

export function CollectionSection() {
  const [large, ...rest] = categories;
  const small = rest.slice(0, 2);
  const wide = rest.slice(2);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-14 max-w-xl reveal">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
          Shop by Category
        </p>
        <h2 className="mt-4 font-serif text-4xl font-light tracking-tight sm:text-5xl">
          The Collection
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-taupe">
          Four ways to wear Manza — from everyday essentials to considered, occasion-ready
          pieces.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CategoryTile category={large} className="lg:row-span-2" tall />
        <div className="grid grid-cols-2 gap-4">
          {small.map((c) => (
            <CategoryTile key={c.value} category={c} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-1">
          {wide.map((c) => (
            <CategoryTile key={c.value} category={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTile({
  category,
  className = "",
  tall = false,
}: {
  category: (typeof categories)[number];
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/shop?category=${category.value}`}
      className={`group relative block overflow-hidden bg-cream ${tall ? "aspect-[4/5] lg:aspect-auto lg:h-full" : "aspect-[4/5]"} ${className}`}
    >
      <Image
        src={category.image}
        alt={`${category.label} category`}
        fill
        sizes="(max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-ivory">
        <div className="transition-transform duration-500 group-hover:-translate-y-1">
          <p className="font-serif text-2xl font-light tracking-tight">{category.label}</p>
          <p className="mt-1 text-xs text-ivory/75">{category.blurb}</p>
        </div>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
          strokeWidth={1.4}
        />
      </div>
    </Link>
  );
}
