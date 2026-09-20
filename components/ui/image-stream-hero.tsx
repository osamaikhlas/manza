"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * ImageStreamHero
 * ----------------
 * A cinematic, slow-moving 3D "corridor" of images that appears to drift
 * toward the viewer — built for a full-bleed fashion-editorial hero.
 *
 * This is a from-scratch implementation matching the brief for a component
 * named `ImageStreamHero` (images / cards / speed / axis / path / children
 * props). If you have your own existing `ImageStreamHero` implementation,
 * drop it in at this same path/exports and this file — and every place that
 * imports it — will continue to work unchanged.
 *
 * - `images`: the photography to stream through the corridor.
 * - `cards`: how many floating image tiles are alive at once (default 16).
 * - `speed`: seconds for one tile's full journey — higher = slower/more
 *   cinematic (default 22). This is intentionally slow for a luxury feel.
 * - `axis`: "z" (default, corridor moving toward the viewer), "x" (slow
 *   horizontal drift), or "y" (slow vertical drift).
 * - `path`: "straight" (default) or "drift" (adds a gentle lateral curve to
 *   each tile's motion for a less mechanical, more editorial feel).
 * - `children`: overlay content (eyebrow / heading / CTAs) composited above
 *   the corridor with a soft scrim for legibility.
 *
 * Respects `prefers-reduced-motion`: falls back to a static, gently
 * cross-faded collage instead of continuous motion.
 */

export type ImageStreamHeroProps = {
  images: string[];
  cards?: number;
  speed?: number;
  axis?: "z" | "x" | "y";
  path?: "straight" | "drift";
  className?: string;
  children?: ReactNode;
};

// Deterministic pseudo-random so server and client render identical markup.
function seeded(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Tile = {
  key: string;
  src: string;
  alt: string;
  left: number; // percent
  top: number; // percent
  size: number; // base tile width in px (before scale animation)
  delay: number; // seconds
  duration: number;
  drift: number; // lateral px offset for "drift" path
  depthClass: "near" | "mid" | "far";
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a browser media-query API on mount, not derivable from props/state
    setReduced(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);
  return reduced;
}

export function ImageStreamHero({
  images,
  cards = 16,
  speed = 22,
  axis = "z",
  path = "straight",
  className,
  children,
}: ImageStreamHeroProps) {
  const reducedMotion = useReducedMotion();

  const tiles = useMemo<Tile[]>(() => {
    if (!images.length) return [];
    const rand = seeded(cards * 1000 + images.length);
    const depths: Tile["depthClass"][] = ["far", "mid", "near"];
    return Array.from({ length: cards }, (_, i) => {
      const depthClass = depths[i % depths.length];
      const sizeByDepth = { far: 150, mid: 210, near: 280 }[depthClass];
      return {
        key: `tile-${i}`,
        src: images[i % images.length],
        alt: "Manza abaya campaign photography",
        left: 6 + rand() * 88,
        top: 6 + rand() * 88,
        size: sizeByDepth + rand() * 30,
        delay: -1 * (i / cards) * speed, // negative delay staggers starting phase
        duration: speed + rand() * 6 - 3,
        drift: (rand() - 0.5) * 140,
        depthClass,
      };
    });
  }, [images, cards, speed]);

  if (!images.length) return null;

  if (reducedMotion) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-espresso", className)}>
        <div className="grid h-full w-full grid-cols-2 gap-1 opacity-70 sm:grid-cols-4">
          {images.slice(0, 8).map((src, i) => (
            <div key={src + i} className="relative h-full w-full overflow-hidden">
              <Image
                src={src}
                alt="Manza abaya campaign photography"
                fill
                sizes="25vw"
                className="object-cover"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-espresso/40" />
        <div className="relative z-10 flex h-full w-full items-center justify-center">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "image-stream-hero relative h-full w-full overflow-hidden bg-espresso",
        className
      )}
      style={{ perspective: axis === "z" ? "1400px" : undefined }}
      aria-hidden={false}
      role="img"
      aria-label="A cinematic stream of Manza abaya campaign photography"
    >
      <div className="isr-stage absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {tiles.map((tile) => (
          <div
            key={tile.key}
            className={cn(
              "isr-tile absolute overflow-hidden rounded-[2px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]",
              `isr-axis-${axis}`,
              path === "drift" && "isr-drift"
            )}
            style={
              {
                left: `${tile.left}%`,
                top: `${tile.top}%`,
                width: `${tile.size}px`,
                aspectRatio: "4 / 5",
                animationDuration: `${tile.duration}s`,
                animationDelay: `${tile.delay}s`,
                "--isr-drift-x": `${tile.drift}px`,
              } as React.CSSProperties
            }
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 768px) 40vw, 22vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Legibility scrim beneath overlay content */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-espresso/55 via-espresso/25 to-espresso/60" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">{children}</div>
    </div>
  );
}
