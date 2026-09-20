"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function MobileMenu({ transparent }: { transparent?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className={cn("inline-flex", transparent ? "text-ivory" : "text-espresso")}
      >
        <Menu className="h-6 w-6" strokeWidth={1.3} />
      </button>

      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ivory transition-opacity duration-500",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-serif text-xl tracking-[0.08em] text-espresso">{siteConfig.name}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-espresso"
          >
            <X className="h-6 w-6" strokeWidth={1.3} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center px-8">
          <ul className="space-y-5">
            {siteConfig.nav.map((item, i) => (
              <li
                key={item.label}
                className={open ? "reveal" : ""}
                style={{ animationDelay: open ? `${i * 60 + 80}ms` : undefined }}
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-serif text-4xl font-light tracking-tight text-espresso"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6 border-t border-espresso/10 px-8 py-8 text-[11px] uppercase tracking-[0.16em] text-taupe">
          <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer noopener" className="link-underline">
            Instagram
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="link-underline">
            Contact
          </a>
        </div>
      </div>
    </>
  );
}
