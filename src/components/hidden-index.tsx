"use client";

import { useMemo, useState } from "react";
import { KolkataMap } from "@/components/kolkata-map";
import { project } from "@/lib/kolkata";
import { hiddenKinds, hiddenPlaces } from "@/lib/kolkata/hidden";
import type { HiddenKind, HiddenPlace } from "@/lib/kolkata/hidden";
import { cn } from "@/lib/utils";

/** Numbered cards. The catalogue number is the point of the thing. */
export function HiddenIndex({ className }: { className?: string }) {
  const [kind, setKind] = useState<HiddenKind | "all">("all");
  const [open, setOpen] = useState<HiddenPlace | null>(null);

  const shown = useMemo(
    () => (kind === "all" ? hiddenPlaces : hiddenPlaces.filter((h) => h.kind === kind)),
    [kind],
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setKind("all")}
          aria-pressed={kind === "all"}
          className={cn(
            "rounded-full border px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.14em] uppercase transition-colors",
            kind === "all"
              ? "border-foreground/25 bg-secondary"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          All {hiddenPlaces.length}
        </button>
        {hiddenKinds.map((k) => {
          const n = hiddenPlaces.filter((h) => h.kind === k.id).length;
          if (n === 0) return null;
          return (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              aria-pressed={kind === k.id}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[0.58rem] tracking-[0.14em] uppercase transition-colors",
                kind === k.id
                  ? "border-foreground/25 bg-secondary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {k.label}
              <span className="ml-2 text-muted-foreground/50">{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((h) => (
          <li key={h.slug}>
            <button
              type="button"
              onClick={() => setOpen(h)}
              className="group flex h-full w-full flex-col rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-terracotta/60"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-[0.58rem] tracking-[0.18em] text-terracotta uppercase">
                  Hidden #{String(h.n).padStart(3, "0")}
                </span>
                <span className="font-mono text-[0.52rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
                  {hiddenKinds.find((k) => k.id === h.kind)?.label}
                </span>
              </div>
              <p className="mt-4 font-display text-[1.15rem] leading-snug font-semibold">
                {h.line}
              </p>
              <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-muted-foreground">
                {h.note}
              </p>
              <p className="mt-4 border-t border-border pt-3 font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                {h.name} · {h.where}
              </p>
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          role="dialog"
          aria-modal
          aria-label={open.name}
          className="fixed inset-0 z-50 grid place-items-center bg-[oklch(0.1_0.014_50/0.85)] p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="max-h-[86svh] w-full max-w-2xl overflow-y-auto rounded-lg border border-border bg-popover p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline justify-between gap-4">
              <p className="font-mono text-[0.62rem] tracking-[0.2em] text-terracotta uppercase">
                Hidden #{String(open.n).padStart(3, "0")}
              </p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
              >
                Close
              </button>
            </div>
            <h3 className="mt-4 font-display text-[clamp(1.5rem,4vw,2.2rem)] leading-tight font-semibold">
              {open.name}
            </h3>
            <p className="mt-3 font-display text-[1.12rem] leading-snug text-foreground/85 italic">
              {open.line}
            </p>
            <p className="mt-5 text-[0.96rem] leading-relaxed text-muted-foreground">
              {open.note}
            </p>

            <div className="mt-7 grid gap-6 sm:grid-cols-[1fr_1.1fr]">
              <dl className="space-y-4">
                {[
                  ["Where", open.where],
                  ["Access", open.access],
                  [
                    "Coordinates",
                    `${open.coords.lat.toFixed(4)}, ${open.coords.lng.toFixed(4)}`,
                  ],
                ].map(([k, v]) => (
                  <div key={k} className="border-t border-border pt-3">
                    <dt className="font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                      {k}
                    </dt>
                    <dd className="mt-1 text-[0.88rem]">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="relative aspect-square overflow-hidden rounded-md border border-border">
                <KolkataMap id="hidden-modal" />
                <span
                  className="absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta ring-2 ring-background"
                  style={{
                    left: `${project(open.coords).x}%`,
                    top: `${project(open.coords).y}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <p className="mt-8 font-mono text-[0.58rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
        {shown.length} of {hiddenPlaces.length} · numbers are permanent, the
        list is not finished
      </p>
    </div>
  );
}
