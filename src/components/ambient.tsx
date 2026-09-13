"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Ambient motion. Used to tell the story, not to decorate: a tram in the
 * navigation because this city lost its trams, a taxi behind a heading
 * because it is yellow and going somewhere, rain because it rains for
 * four months. All of it stops under prefers-reduced-motion.
 */

/** A tiny tram that crosses the navigation bar every couple of minutes. */
export function NavTram({ tone = "currentColor" }: { tone?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-4 overflow-hidden motion-reduce:hidden"
    >
      <svg
        viewBox="0 0 120 26"
        className="absolute bottom-0 h-4 w-[7.5rem] opacity-0"
        style={{ animation: "tram-cross 150s linear infinite" }}
        fill={tone}
      >
        <rect x="6" y="4" width="94" height="15" rx="3" />
        <rect x="30" y="0" width="8" height="4" rx="1" />
        <path d="M30 0 L34 -7 L38 0" fill="none" stroke={tone} strokeWidth="1.4" />
        <circle cx="24" cy="22" r="3" />
        <circle cx="82" cy="22" r="3" />
        <rect x="0" y="24" width="120" height="1.4" opacity="0.45" />
      </svg>
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
            ? { animation: "taxi-pass 9s cubic-bezier(0.4, 0, 0.6, 1) 0.4s both" }
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
        <rect x="8" y="26" width="132" height="5" fill="var(--foreground)" opacity="0.22" />
        <circle cx="36" cy="40" r="5" fill="var(--foreground)" opacity="0.75" />
        <circle cx="112" cy="40" r="5" fill="var(--foreground)" opacity="0.75" />
        <rect x="52" y="2" width="26" height="7" rx="2" fill="var(--foreground)" opacity="0.4" />
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
