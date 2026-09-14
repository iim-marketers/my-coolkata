"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import kolkataTaxi from "@/assets/kolkata-taxi.png";
import { cn } from "@/lib/utils";

/** Staggered, so the exhaust reads as a stream rather than a blink. */
const SMOKE_PUFFS = [
  { size: "0.45rem", bottom: "0.3rem", duration: 1.3, delay: 0 },
  { size: "0.55rem", bottom: "0.4rem", duration: 1.5, delay: 0.45 },
  { size: "0.4rem", bottom: "0.25rem", duration: 1.2, delay: 0.9 },
];

/**
 * A yellow Ambassador taxi driving along the bottom edge of the navigation
 * bar every half minute. Render it before the nav content so the links and
 * buttons stay on top.
 */
export function NavTaxi() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-9 overflow-hidden motion-reduce:hidden"
    >
      <div
        className="absolute bottom-0 left-0"
        style={{ animation: "taxi-drive 30s linear 1.5s infinite both" }}
      >
        {/* Exhaust: puffs left behind the rear bumper, rising as they thin out. */}
        {SMOKE_PUFFS.map((p, i) => (
          <span
            key={i}
            className="absolute -left-1 rounded-full opacity-0 blur-[1px]"
            style={{
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              background:
                "radial-gradient(circle, oklch(0.62 0.01 265 / 0.75), oklch(0.62 0.01 265 / 0) 70%)",
              animation: `taxi-smoke ${p.duration}s ease-out ${p.delay}s infinite`,
            }}
          />
        ))}
        {/* Road bumps rock the body; the engine keeps it trembling in between. */}
        <div
          className="origin-bottom"
          style={{ animation: "taxi-bump 2.3s ease-in-out infinite" }}
        >
          <Image
            src={kolkataTaxi}
            alt=""
            sizes="72px"
            loading="eager"
            draggable={false}
            className="h-8 w-auto select-none drop-shadow-[0_1px_1px_oklch(0.2_0.02_265/0.35)]"
            style={{
              animation: "taxi-rumble 0.16s ease-in-out infinite alternate",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** A yellow taxi crossing behind a heading, once, when it comes into view. */
export function TaxiPass({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-10 overflow-hidden motion-reduce:hidden",
        className,
      )}
    >
      <svg
        viewBox="0 0 160 44"
        className="h-10 w-40"
        style={
          go
            ? {
                animation:
                  "taxi-pass 9s cubic-bezier(0.4, 0, 0.6, 1) 0.4s both",
              }
            : { transform: "translateX(-40%)", opacity: 0 }
        }
      >
        {/* The Ambassador silhouette: one long curve and a lot of glass. */}
        <path
          d="M8 34 q2 -14 18 -16 q10 -10 34 -10 q26 0 38 10 q22 2 26 16 q1 6 -6 6 h-104 q-7 0 -6 -6 Z"
          fill="var(--marigold)"
          opacity="0.85"
        />
        <path
          d="M32 18 q10 -8 28 -8 q22 0 32 8 Z"
          fill="var(--foreground)"
          opacity="0.28"
        />
        <rect
          x="8"
          y="26"
          width="132"
          height="5"
          fill="var(--foreground)"
          opacity="0.22"
        />
        <circle cx="36" cy="40" r="5" fill="var(--foreground)" opacity="0.75" />
        <circle
          cx="112"
          cy="40"
          r="5"
          fill="var(--foreground)"
          opacity="0.75"
        />
        <rect
          x="52"
          y="2"
          width="26"
          height="7"
          rx="2"
          fill="var(--foreground)"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

/** Rain, for the rainy mood and the monsoon sections. */
export function Rain({
  drops = 60,
  className,
}: {
  drops?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden",
        className,
      )}
    >
      {Array.from({ length: drops }, (_, i) => {
        // Deterministic scatter, so the server and client agree.
        const x = ((i * 137.508) % 100).toFixed(2);
        const delay = ((i * 0.37) % 2.4).toFixed(2);
        const dur = (0.75 + ((i * 0.13) % 0.7)).toFixed(2);
        const len = 12 + ((i * 7) % 26);
        return (
          <span
            key={i}
            className="absolute top-0 w-px bg-gradient-to-b from-transparent via-cream/45 to-transparent"
            style={{
              left: `${x}%`,
              height: `${len}px`,
              animation: `rain-fall ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/**
 * কলকাতা over KOLKATA. The pairing the brief asks for, used wherever a
 * section wants the city's name in both scripts.
 */
export function Wordmark({
  bn = "কলকাতা",
  en = "KOLKATA",
  className,
  size = "lg",
}: {
  bn?: string;
  en?: string;
  className?: string;
  size?: "sm" | "lg";
}) {
  return (
    <span className={cn("block", className)}>
      <span
        lang="bn"
        className={cn(
          "block font-normal opacity-80",
          size === "lg"
            ? "text-[clamp(1.4rem,4.5vw,2.6rem)]"
            : "text-[clamp(0.95rem,2.4vw,1.2rem)]",
        )}
      >
        {bn}
      </span>
      <span
        className={cn(
          "mt-1 block font-display font-semibold tracking-[0.06em]",
          size === "lg"
            ? "text-[clamp(2.4rem,9vw,6rem)] leading-[0.9]"
            : "text-[clamp(1.1rem,3vw,1.5rem)] leading-tight",
        )}
      >
        {en}
      </span>
    </span>
  );
}
