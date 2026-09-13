"use client";

import { useCallback, useRef, useState } from "react";
import { CityScene } from "@/components/scenes/city-scene";
import type { ThenNow } from "@/lib/kolkata/then-now";
import { cn } from "@/lib/utils";

/**
 * Then and now, wiped. The archival side is a present-day photograph
 * graded like an old plate, not a genuine archive image.
 */
export function ThenNowSlider({ item }: { item: ThenNow }) {
  const [pos, setPos] = useState(48);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setPos(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  }, []);

  return (
    <div>
      <div
        ref={frame}
        className="relative aspect-[16/9] w-full touch-none overflow-hidden rounded-lg border border-border select-none"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          moveTo(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && moveTo(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        {/* Now, underneath. */}
        <CityScene
          name={item.nowScene} photo={item.nowPhoto}
          className="absolute inset-0 h-full w-full"
        />
        {/* Then, clipped from the left, graded like a plate. */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <div className="h-full w-full" style={{ filter: item.thenGrade }}>
            <CityScene
              name={item.thenScene} photo={item.thenPhoto}
              className="h-full w-full"
            />
          </div>
          <div className="film-grain absolute inset-0 opacity-70" />
        </div>

        <span
          className={cn(
            "absolute top-4 left-4 rounded-full bg-[oklch(0.12_0.02_50/0.72)] px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.2em] text-cream uppercase backdrop-blur transition-opacity",
            pos > 16 ? "opacity-100" : "opacity-0",
          )}
        >
          Then · {item.thenYear}
        </span>
        <span
          className={cn(
            "absolute top-4 right-4 rounded-full bg-[oklch(0.12_0.02_50/0.72)] px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.2em] text-cream uppercase backdrop-blur transition-opacity",
            pos < 84 ? "opacity-100" : "opacity-0",
          )}
        >
          Now · {item.nowYear}
        </span>

        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-cream/85"
          style={{ left: `${pos}%` }}
        />
        <button
          type="button"
          role="slider"
          tabIndex={0}
          aria-label={`Wipe between ${item.thenYear} and today at ${item.place}`}
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          className="absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-cream/50 bg-[oklch(0.12_0.02_50/0.8)] text-cream backdrop-blur focus:ring-2 focus:ring-marigold focus:outline-none"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden className="font-mono text-xs tracking-tighter">
            ‹ ›
          </span>
        </button>
      </div>

      <div className="mt-7 grid gap-8 md:grid-cols-2">
        <div>
          <p className="font-mono text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase">
            Then · {item.thenYear}
          </p>
          <p className="mt-3 text-[0.94rem] leading-relaxed text-muted-foreground">
            {item.then}
          </p>
        </div>
        <div>
          <p className="font-mono text-[0.58rem] tracking-[0.22em] text-terracotta uppercase">
            Now
          </p>
          <p className="mt-3 text-[0.94rem] leading-relaxed text-muted-foreground">
            {item.now}
          </p>
        </div>
      </div>

      <p className="mt-6 border-t border-border pt-5 text-[0.92rem] leading-relaxed">
        <span className="font-mono text-[0.54rem] tracking-[0.18em] text-terracotta uppercase">
          What has not changed
        </span>
        <br />
        {item.constant}
      </p>
    </div>
  );
}
