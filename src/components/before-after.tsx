"use client";

import { useCallback, useRef, useState } from "react";
import { CityScene } from "@/components/scenes/city-scene";
import type { PhotoId } from "@/lib/kolkata/photos";
import type { SceneName } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/**
 * Two frames of the same place, one wiped over the other. Drag, or use
 * the arrow keys once the handle has focus.
 */
export function BeforeAfter({
  before,
  after,
  beforePhoto,
  afterPhoto,
  beforeLabel,
  afterLabel,
  caption,
  className,
}: {
  before: SceneName;
  after: SceneName;
  beforePhoto?: PhotoId;
  afterPhoto?: PhotoId;
  beforeLabel: string;
  afterLabel: string;
  caption?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const box = frame.current?.getBoundingClientRect();
    if (!box) return;
    setPos(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <figure className={className}>
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
        <CityScene name={after} photo={afterPhoto} className="absolute inset-0 h-full w-full" />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <CityScene name={before} photo={beforePhoto} className="h-full w-full" />
        </div>

        {[
          { label: beforeLabel, side: "left" as const, show: pos > 16 },
          { label: afterLabel, side: "right" as const, show: pos < 84 },
        ].map((l) => (
          <span
            key={l.side}
            className={cn(
              "absolute top-4 rounded-full bg-[oklch(0.12_0.02_50/0.72)] px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.2em] text-cream uppercase backdrop-blur transition-opacity",
              l.side === "left" ? "left-4" : "right-4",
              l.show ? "opacity-100" : "opacity-0",
            )}
          >
            {l.label}
          </span>
        ))}

        {/* The handle. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-cream/85"
          style={{ left: `${pos}%` }}
        />
        <button
          type="button"
          onKeyDown={onKey}
          aria-label={`Wipe between ${beforeLabel} and ${afterLabel}`}
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          role="slider"
          tabIndex={0}
          className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border border-cream/50 bg-[oklch(0.12_0.02_50/0.8)] text-cream backdrop-blur focus:ring-2 focus:ring-marigold focus:outline-none"
          style={{ left: `${pos}%` }}
        >
          <span aria-hidden className="font-mono text-xs tracking-tighter">
            ‹ ›
          </span>
        </button>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-[0.84rem] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
