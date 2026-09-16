"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { CityScene, sceneInfo } from "@/components/scenes/city-scene";
import { photos, type PhotoId } from "@/lib/kolkata/photos";
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
  plates: {
    scene: SceneName;
    photo?: PhotoId;
    title?: string;
    caption?: string;
  }[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) =>
      setOpen((i) =>
        i === null ? null : (i + d + plates.length) % plates.length,
      ),
    [plates.length],
  );

  const isOpen = open !== null;
  useEffect(() => {
    if (!isOpen) return;
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
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
      trigger?.focus();
    };
  }, [isOpen, step]);

  const current = open === null ? null : plates[open];
  const photo = current
    ? photos[current.photo ?? sceneInfo[current.scene].photo]
    : null;
  const many = plates.length > 1;

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
                className="group relative block aspect-4/3 w-full overflow-hidden rounded-lg border border-border"
              >
                <CityScene
                  name={plate.scene}
                  photo={plate.photo}
                  detail="card"
                  className="h-full w-full transition-transform duration-1200 group-hover:scale-105"
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

      {/* Portal so a transformed ancestor (Reveal) can't trap the fixed overlay. */}
      {current && photo
        ? createPortal(
            <div
              role="dialog"
              aria-modal
              aria-label={current.title ?? sceneInfo[current.scene].label}
              className="fixed inset-0 z-90 flex flex-col overscroll-contain bg-[oklch(0.1_0.014_50/0.96)] px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:px-8 sm:py-6"
              onClick={() => setOpen(null)}
            >
              <div className="mx-auto flex w-full max-w-7xl items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-display text-lg font-semibold text-cream sm:text-2xl">
                    {current.title ?? sceneInfo[current.scene].label}
                  </p>
                  <p className="mt-1 font-mono text-[0.6rem] tracking-[0.22em] text-marigold/80 uppercase">
                    {open! + 1} / {plates.length}
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(null)}
                  aria-label="Close"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div
                className="relative mt-4 min-h-0 flex-1 sm:mt-6"
                onTouchStart={(e) => {
                  touchX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (touchX.current === null || !many) return;
                  const dx = e.changedTouches[0].clientX - touchX.current;
                  touchX.current = null;
                  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    key={open}
                    src={photo.image}
                    alt={photo.alt}
                    placeholder="blur"
                    sizes="100vw"
                    onClick={(e) => e.stopPropagation()}
                    className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
                  />
                </div>
              </div>

              <div className="mx-auto mt-4 flex w-full max-w-7xl flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <p className="max-w-xl text-[0.86rem] leading-relaxed text-cream/65">
                  {current.caption ?? sceneInfo[current.scene].caption}
                </p>
                {many ? (
                  <div className="flex shrink-0 justify-end gap-2">
                    {[-1, 1].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          step(d);
                        }}
                        aria-label={d < 0 ? "Previous plate" : "Next plate"}
                        className="grid h-10 w-14 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10"
                      >
                        {d < 0 ? (
                          <ArrowLeft className="size-4" />
                        ) : (
                          <ArrowRight className="size-4" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
