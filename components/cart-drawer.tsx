"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function CartDrawer() {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useStore();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-espresso/40 transition-opacity duration-400",
          isCartOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em]">
            Bag {cart.length > 0 && `(${cart.length})`}
          </h2>
          <button type="button" onClick={closeCart} aria-label="Close bag">
            <X className="h-5 w-5" strokeWidth={1.4} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cart.length === 0 ? (
            <p className="mt-16 text-center text-sm text-taupe">Your bag is empty.</p>
          ) : (
            <ul className="space-y-6">
              {cart.map((line) => (
                <li key={line.key} className="flex gap-4">
                  <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-cream">
                    <Image src={line.image} alt={line.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{line.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-taupe">
                          {line.color} · {line.size}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(line.key)}
                        aria-label={`Remove ${line.name} from bag`}
                        className="text-taupe transition-colors hover:text-espresso"
                      >
                        <X className="h-4 w-4" strokeWidth={1.4} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3 border border-espresso/15 px-2 py-1">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(line.key, line.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.6} />
                        </button>
                        <span className="w-4 text-center text-xs">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(line.key, line.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.6} />
                        </button>
                      </div>
                      <p className="text-sm">{formatPrice(line.price * line.quantity)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-espresso/10 px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-wide text-taupe">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-taupe">Shipping and taxes calculated at checkout.</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="border border-espresso px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:bg-espresso hover:text-ivory"
              >
                View Bag
              </Link>
              {/* Checkout has no payment backend wired up yet — see README. */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="bg-espresso px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-opacity hover:opacity-90"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
