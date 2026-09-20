import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center lg:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-taupe">404</p>
      <h1 className="mt-5 font-serif text-4xl font-light tracking-tight sm:text-5xl">
        Page not found.
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-taupe">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-espresso px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-opacity hover:opacity-90"
      >
        Return Home
      </Link>
    </div>
  );
}
