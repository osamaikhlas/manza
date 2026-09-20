"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center lg:px-10">
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-taupe">Error</p>
      <h1 className="mt-5 font-serif text-4xl font-light tracking-tight sm:text-5xl">
        Something went wrong.
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-taupe">
        We hit an unexpected snag loading this page. Please try again.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => retry()}
          className="bg-espresso px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-espresso/15 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-espresso"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
