"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const SPINES = [
  "#8a6a3a", "#6d4b2c", "#a58445", "#4f4630", "#7d5330",
  "#93763f", "#5c4126", "#9c7a41", "#67512f", "#8f5f33",
];

/**
 * Books slide in from both sides as the block enters the viewport, the
 * way the stalls close in on you when you walk down College Street.
 */
export function BookShelf({
  count = 14,
  className,
}: {
  count?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("flex items-end justify-center gap-[3px] overflow-hidden", className)}
    >
      {Array.from({ length: count }, (_, i) => {
        const fromLeft = i % 2 === 0;
        const h = 58 + ((i * 37) % 42);
        const w = 14 + ((i * 23) % 18);
        return (
          <span
            key={i}
            className="motion-reduce:!translate-x-0 motion-reduce:!opacity-100"
            style={{
              display: "block",
              width: `${w}px`,
              height: `${h}%`,
              background: SPINES[i % SPINES.length],
              borderRadius: "2px 2px 1px 1px",
              opacity: shown ? 0.92 : 0,
              transform: shown
                ? "translateX(0)"
                : `translateX(${fromLeft ? -180 : 180}px)`,
              transition: `transform 900ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 55}ms, opacity 600ms ease ${i * 55}ms`,
              boxShadow: "inset -2px 0 0 rgba(0,0,0,0.22), inset 2px 0 0 rgba(255,255,255,0.08)",
            }}
          />
        );
      })}
    </div>
  );
}
