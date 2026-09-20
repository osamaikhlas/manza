"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { SizeOption } from "@/lib/products";
import { cn } from "@/lib/utils";

export function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: SizeOption[];
  value: string;
  onChange: (size: string) => void;
}) {
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (!guideOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGuideOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guideOpen]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">Size</p>
        <button
          type="button"
          onClick={() => setGuideOpen(true)}
          className="link-underline text-xs text-taupe"
          aria-haspopup="dialog"
          aria-expanded={guideOpen}
        >
          Size Guide
        </button>
      </div>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Select a size">
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            aria-pressed={value === s}
            className={cn(
              "h-11 min-w-11 border px-3 text-xs uppercase tracking-wide transition-colors",
              value === s ? "border-espresso bg-espresso text-ivory" : "border-espresso/15 hover:border-espresso/40"
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {guideOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Size guide"
        >
          <div
            className="absolute inset-0 bg-espresso/40"
            onClick={() => setGuideOpen(false)}
          />
          <div className="relative max-h-[80vh] w-full max-w-sm overflow-y-auto bg-ivory p-6 text-xs text-taupe shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso">
                Size Guide
              </p>
              <button type="button" onClick={() => setGuideOpen(false)} aria-label="Close size guide">
                <X className="h-4 w-4" strokeWidth={1.6} />
              </button>
            </div>
            <table className="mt-4 w-full text-left">
              <thead>
                <tr className="text-espresso">
                  <th className="pb-2 font-semibold uppercase tracking-wide">Size</th>
                  <th className="pb-2 font-semibold uppercase tracking-wide">Bust (in)</th>
                  <th className="pb-2 font-semibold uppercase tracking-wide">Length (in)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["S", "38", "55"],
                  ["M", "40", "56"],
                  ["L", "42", "57"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-espresso/10">
                    <td className="py-1.5">{row[0]}</td>
                    <td className="py-1.5">{row[1]}</td>
                    <td className="py-1.5">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
