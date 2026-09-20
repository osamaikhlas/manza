import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store-context";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { SearchOverlay } from "@/components/search-overlay";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      {/* suppressHydrationWarning: browser extensions (Grammarly, ColorZilla,
          etc.) inject attributes like data-gr-ext-installed and
          cz-shortcut-listen onto <body> before React hydrates. That's a
          false-positive mismatch, not an app bug — this only silences
          attribute diffs on this element, not real hydration errors. */}
      <body className="antialiased bg-ivory text-espresso" suppressHydrationWarning>
        <StoreProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-espresso focus:px-4 focus:py-2 focus:text-ivory"
          >
            Skip to content
          </a>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content" className="pt-[116px]">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <SearchOverlay />
        </StoreProvider>
      </body>
    </html>
  );
}
