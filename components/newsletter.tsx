"use client";

import { useState } from "react";

export function Newsletter() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  return (
    <section className="bg-espresso py-24 text-ivory lg:py-28">
      <div className="mx-auto max-w-lg px-6 text-center">
        <h2 className="reveal font-serif text-3xl font-light tracking-tight sm:text-4xl">
          Stay in the know.
        </h2>
        <p className="reveal mt-4 text-sm leading-relaxed text-cream/75">
          Be the first to discover new collections, limited pieces and private launches.
        </p>

        {status === "submitted" ? (
          <p className="mt-8 text-sm text-bronze-light">Thank you — you&rsquo;re on the list.</p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              // NOTE: no email backend is connected yet — wire this up to
              // your ESP (Klaviyo, Mailchimp, etc.) before launch.
              setStatus("submitted");
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Your email address"
              className="w-full border border-ivory/25 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-cream/50 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-ivory px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-espresso transition-opacity hover:opacity-90"
            >
              Join Us
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
