"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useStore } from "@/lib/store-context";
import { formatPrice } from "@/lib/utils";

export function CartContent() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useStore();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <h1 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">Your Bag</h1>

      {cart.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-sm text-taupe">Your bag is empty.</p>
          <Link
            href="/shop"
            className="mt-6 inline-block bg-espresso px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
          <ul className="divide-y divide-espresso/10">
            {cart.map((line) => (
              <li key={line.key} className="flex gap-5 py-6">
                <div className="relative h-32 w-24 shrink-0 overflow-hidden bg-cream">
                  <Image src={line.image} alt={line.name} fill sizes="96px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">{line.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-wide text-taupe">
                        {line.color} · {line.size}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(line.key)}
                      aria-label={`Remove ${line.name}`}
                      className="text-taupe hover:text-espresso"
                    >
                      <X className="h-4 w-4" strokeWidth={1.4} />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
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

          <div className="h-fit border border-espresso/10 p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-wide text-taupe">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-taupe">Shipping and taxes calculated at checkout.</p>
            <Link
              href="/checkout"
              className="mt-6 block w-full bg-espresso py-3.5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-ivory transition-opacity hover:opacity-90"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
