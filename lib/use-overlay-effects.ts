"use client";

import { useEffect } from "react";

/**
 * Shared behavior for full-screen overlays (cart drawer, mobile menu, search):
 * locks background scroll while open and closes on Escape.
 */
export function useOverlayEffects(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;

    // Lock both <html> and <body> — whichever is the viewport's scrolling
    // box varies by browser default/stylesheet, so overflow:hidden on body
    // alone isn't reliably enough to stop background scroll.
    const html = document.documentElement;
    const { overflow: htmlOverflow } = html.style;
    const { overflow: bodyOverflow } = document.body.style;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      html.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, onClose]);
}
