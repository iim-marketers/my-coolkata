"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { CityScene } from "@/components/scenes/city-scene";
import { plateCategories, plates } from "@/lib/kolkata/gallery";
import type { PlateCategory } from "@/lib/kolkata/gallery";
import { cn } from "@/lib/utils";

/** Full-bleed plates, ten categories, and the story behind each frame. */
export function FacesGallery({ className }: { className?: string }) {
  const [cat, setCat] = useState<PlateCategory | "all">("all");
  const [open, setOpen] = useState<number | null>(null);

  const shown = useMemo(
    () => (cat === "all" ? plates : plates.filter((p) => p.category === cat)),
    [cat],
  );

  const step = useCallback(
    (d: number) =>
      setOpen((i) => (i === null ? null : (i + d + shown.length) % shown.length)),
    [shown.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, step]);

  const current = open === null ? null : shown[open];

  return (
    <div className={className}>
      <ul className="flex flex-wrap gap-2">
        <li>
          <button
            type="button"
            onClick={() => setCat("all")}
            aria-pressed={cat === "all"}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.16em] uppercase transition-colors",
              cat === "all"
                ? "border-foreground/25 bg-secondary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            All {plates.length}
          </button>
        </li>
        {plateCategories.map((c) => {
          const n = plates.filter((p) => p.category === c.id).length;
          if (n === 0) return null;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setCat(c.id)}
                aria-pressed={cat === c.id}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.16em] uppercase transition-colors",
                  cat === c.id
                    ? "border-foreground/25 bg-secondary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c.label}
                <span className="ml-2 text-muted-foreground/50">{n}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* A staggered wall rather than a grid of equal boxes. */}
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li
            key={p.id}
            className={cn(i % 7 === 0 && "sm:col-span-2 lg:row-span-2")}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={cn(
                "group relative block w-full overflow-hidden rounded-lg border border-border",
                i % 7 === 0 ? "aspect-[16/10] lg:h-full" : "aspect-[4/3]",
              )}
            >
              <div className="h-full w-full" style={{ filter: p.grade }}>
                <CityScene
                  name={p.scene} photo={p.photo}
                  detail={i % 7 === 0 ? "full" : "card"}
                  className="h-full w-full transition-transform duration-[1400ms] group-hover:scale-105"
                />
              </div>
              <span className="scrim-bottom absolute inset-0" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-left sm:p-5">
                <span className="block font-mono text-[0.5rem] tracking-[0.18em] text-marigold/80 uppercase">
                  {plateCategories.find((c) => c.id === p.category)?.label}
                </span>
                <span className="mt-1.5 block font-display text-[1.02rem] leading-snug font-semibold text-cream">
                  {p.title}
                </span>
                <span className="mt-1 block text-[0.78rem] text-cream/55">
                  {p.where}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal
          aria-label={current.title}
          className="fixed inset-0 z-50 flex flex-col bg-[oklch(0.09_0.014_50/0.97)] p-4 backdrop-blur sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-mono text-[0.56rem] tracking-[0.2em] text-marigold/80 uppercase">
                {plateCategories.find((c) => c.id === current.category)?.label}
                <span className="mx-2 text-cream/25">·</span>
                {open! + 1} / {shown.length}
              </p>
              <p className="mt-2 font-display text-xl font-semibold text-cream sm:text-2xl">
                {current.title}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="rounded-full border border-cream/25 p-2 text-cream transition-colors hover:bg-cream/10"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            className="mt-5 min-h-0 flex-1 overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ filter: current.grade }}
          >
            <CityScene
              name={current.scene} photo={current.photo}
              className="h-full w-full"
            />
          </div>

          <div
            className="mt-5 grid gap-6 sm:grid-cols-[1fr_1.4fr] sm:items-start"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="font-mono text-[0.52rem] tracking-[0.18em] text-cream/45 uppercase">
                {current.where}
              </p>
              <p className="mt-2 text-[0.88rem] leading-snug text-cream/70">
                {current.caption}
              </p>
            </div>
            <div>
              <p className="font-mono text-[0.52rem] tracking-[0.18em] text-marigold/70 uppercase">
                The story behind it
              </p>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-cream/80">
                {current.story}
              </p>
              <div className="mt-4 flex items-center gap-4">
                {current.href ? (
                  <Link
                    href={current.href}
                    className="font-mono text-[0.56rem] tracking-[0.16em] text-marigold uppercase hover:underline"
                  >
                    Read more →
                  </Link>
                ) : null}
                <div className="ml-auto flex gap-2">
                  {[-1, 1].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => step(d)}
                      aria-label={d < 0 ? "Previous plate" : "Next plate"}
                      className="rounded-full border border-cream/25 px-4 py-1.5 font-mono text-xs text-cream transition-colors hover:bg-cream/10"
                    >
                      {d < 0 ? "←" : "→"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
