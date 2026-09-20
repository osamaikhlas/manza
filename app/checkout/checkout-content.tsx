"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/lib/store-context";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type FormState = {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
};

const emptyForm: FormState = { fullName: "", phone: "", address: "", city: "", notes: "" };

function buildOrderMessage(form: FormState, cart: ReturnType<typeof useStore>["cart"], subtotal: number) {
  const lines = cart
    .map((line) => `• ${line.name} — ${line.color}, ${line.size} × ${line.quantity} — ${formatPrice(line.price * line.quantity)}`)
    .join("\n");

  return [
    `New order — ${siteConfig.name}`,
    "",
    lines,
    "",
    `Subtotal: ${formatPrice(subtotal)}`,
    "Payment: Cash on Delivery",
    "",
    `Name: ${form.fullName}`,
    `Phone: ${form.phone}`,
    `Address: ${form.address}, ${form.city}`,
    form.notes ? `Notes: ${form.notes}` : undefined,
  ]
    .filter(Boolean)
    .join("\n");
}

export function CheckoutContent() {
  const { cart, subtotal, clearCart } = useStore();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [placed, setPlaced] = useState(false);

  function setField(key: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) next.fullName = "Enter your full name.";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) next.phone = "Enter a valid phone number.";
    if (!form.address.trim()) next.address = "Enter your delivery address.";
    if (!form.city.trim()) next.city = "Enter your city.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const message = buildOrderMessage(form, cart, subtotal);
    const whatsappNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noreferrer noopener");

    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center lg:px-10">
        <h1 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">Order sent.</h1>
        <p className="mt-5 text-sm leading-relaxed text-taupe">
          Your order details have opened in WhatsApp — send that message to confirm. We&rsquo;ll
          reach out on {form.phone} to confirm delivery details. Payment is{" "}
          <span className="text-espresso">Cash on Delivery</span>.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-espresso px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-opacity hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center lg:px-10">
        <h1 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">Checkout</h1>
        <p className="mt-8 text-sm text-taupe">Your bag is empty.</p>
        <Link
          href="/shop"
          className="mt-6 inline-block bg-espresso px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-opacity hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
      <h1 className="font-serif text-4xl font-light tracking-tight sm:text-5xl">Checkout</h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <form onSubmit={placeOrder} noValidate className="space-y-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">
              Delivery Details
            </p>

            <div className="mt-4 space-y-4">
              <Field label="Full Name" error={errors.fullName}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setField("fullName", e.target.value)}
                  className={inputClass(!!errors.fullName)}
                  autoComplete="name"
                />
              </Field>

              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className={inputClass(!!errors.phone)}
                  autoComplete="tel"
                  placeholder="+92 3XX XXXXXXX"
                />
              </Field>

              <Field label="Delivery Address" error={errors.address}>
                <textarea
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className={inputClass(!!errors.address)}
                  rows={2}
                  autoComplete="street-address"
                />
              </Field>

              <Field label="City" error={errors.city}>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className={inputClass(!!errors.city)}
                  autoComplete="address-level2"
                />
              </Field>

              <Field label="Order Notes (optional)">
                <textarea
                  value={form.notes}
                  onChange={(e) => setField("notes", e.target.value)}
                  className={inputClass(false)}
                  rows={2}
                />
              </Field>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">
              Payment Method
            </p>
            <div className="mt-3 border border-espresso bg-cream/40 px-4 py-3 text-sm">
              Cash on Delivery — pay when your order arrives.
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-espresso py-4 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-opacity hover:opacity-90"
          >
            Place Order — {formatPrice(subtotal)}
          </button>
          <p className="text-xs text-taupe">
            Placing your order opens WhatsApp with your order details — send that message to
            confirm with us.
          </p>
        </form>

        <div className="h-fit border border-espresso/10 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-taupe">
            Order Summary
          </p>
          <ul className="mt-4 space-y-4">
            {cart.map((line) => (
              <li key={line.key} className="flex gap-3">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-cream">
                  <Image src={line.image} alt={line.name} fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col text-sm">
                  <p className="font-medium">{line.name}</p>
                  <p className="text-xs uppercase tracking-wide text-taupe">
                    {line.color} · {line.size} · Qty {line.quantity}
                  </p>
                  <p className="mt-auto">{formatPrice(line.price * line.quantity)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-espresso/10 pt-4 text-sm">
            <span className="uppercase tracking-wide text-taupe">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>

          <div className="mt-4 space-y-2 border-t border-espresso/10 pt-4 text-xs leading-relaxed text-taupe">
            <p>
              <span className="font-semibold text-espresso">Shipping — </span>
              Free on orders of 3+ items. Otherwise, standard delivery charges apply and will be
              confirmed with you on WhatsApp.
            </p>
            <p>
              <span className="font-semibold text-espresso">Returns — </span>
              Accepted within 7 days of delivery, provided items are unworn and in original
              packaging.
            </p>
            <Link href="/about#shipping" className="link-underline inline-block text-espresso">
              Read full policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function inputClass(hasError: boolean) {
  return `w-full border bg-transparent px-3 py-2.5 text-sm focus:outline-none ${
    hasError ? "border-red-500" : "border-espresso/15 focus:border-espresso/40"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-wide text-taupe">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </label>
  );
}
