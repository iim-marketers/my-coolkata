"use client";

import { useCallback, useEffect, useState } from "react";
import { X } from "lucide-react";
import { CityScene, sceneInfo } from "@/components/scenes/city-scene";
import type { PhotoId } from "@/lib/kolkata/photos";
import type { SceneName } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/**
 * A plate gallery. The lightbox shows each photograph as large as the
 * screen allows.
 */
export function PhotoGallery({
  plates,
  className,
}: {
  plates: { scene: SceneName; photo?: PhotoId; title?: string; caption?: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (d: number) =>
      setOpen((i) =>
        i === null ? null : (i + d + plates.length) % plates.length,
      ),
    [plates.length],
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

  const current = open === null ? null : plates[open];

  return (
    <>
      <ul className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3", className)}>
        {plates.map((plate, i) => {
          const p = sceneInfo[plate.scene];
          return (
            <li key={`${plate.scene}-${i}`}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg border border-border"
              >
                <CityScene
                  name={plate.scene} photo={plate.photo}
                  detail="card"
                  className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <span className="scrim-bottom absolute inset-0" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-left">
                  <span className="block font-display text-base font-semibold text-cream">
                    {plate.title ?? p.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-[0.58rem] tracking-[0.18em] text-marigold/80 uppercase">
                    Plate {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {current ? (
        <div
          role="dialog"
          aria-modal
          aria-label={current.title ?? sceneInfo[current.scene].label}
          className="fixed inset-0 z-50 flex flex-col bg-[oklch(0.1_0.014_50/0.96)] p-4 backdrop-blur sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="font-display text-lg font-semibold text-cream sm:text-2xl">
                {current.title ?? sceneInfo[current.scene].label}
              </p>
              <p className="mt-1 font-mono text-[0.6rem] tracking-[0.22em] text-marigold/80 uppercase">
                {open! + 1} / {plates.length}
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
          >
            <CityScene
              name={current.scene} photo={current.photo}
              className="h-full w-full"
            />
          </div>

          <div className="mt-4 flex items-center justify-between gap-6">
            <p className="max-w-xl text-[0.86rem] leading-relaxed text-cream/65">
              {current.caption ?? sceneInfo[current.scene].caption}
            </p>
            <div className="flex shrink-0 gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(d);
                  }}
                  aria-label={d < 0 ? "Previous plate" : "Next plate"}
                  className="rounded-full border border-cream/25 px-4 py-2 font-mono text-xs text-cream transition-colors hover:bg-cream/10"
                >
                  {d < 0 ? "←" : "→"}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
