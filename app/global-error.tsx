"use client";

import "./globals.css";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-ivory text-espresso">
        <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-taupe">Error</p>
          <h1 className="mt-5 font-serif text-4xl font-light tracking-tight sm:text-5xl">
            Something went wrong.
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-taupe">
            We hit an unexpected snag. Please try again.
          </p>
          <button
            type="button"
            onClick={() => retry()}
            className="mt-8 bg-espresso px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition-opacity hover:opacity-90"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
