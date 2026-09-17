"use client";

import { useMemo, useState } from "react";
import { Dialog } from "radix-ui";
import { ArrowUpRight, X } from "lucide-react";
import { PinMap } from "@/components/map/pin-map";
import { hiddenKinds, hiddenPlaces } from "@/lib/kolkata/hidden";
import type { HiddenKind, HiddenPlace } from "@/lib/kolkata/hidden";
import { cn } from "@/lib/utils";

/** Numbered cards. The catalogue number is the point of the thing. */
export function HiddenIndex({ className }: { className?: string }) {
  const [kind, setKind] = useState<HiddenKind | "all">("all");
  const [active, setActive] = useState<HiddenPlace | null>(null);
  const [open, setOpen] = useState(false);

  const shown = useMemo(
    () =>
      kind === "all"
        ? hiddenPlaces
        : hiddenPlaces.filter((h) => h.kind === kind),
    [kind],
  );

  const filters = [
    { id: "all" as const, label: "All", n: hiddenPlaces.length },
    ...hiddenKinds
      .map((k) => ({
        ...k,
        n: hiddenPlaces.filter((h) => h.kind === k.id).length,
      }))
      .filter((k) => k.n > 0),
  ];

  return (
    <div className={className}>
      <div className="relative">
        <div className="-mx-5 flex snap-x snap-proximity gap-2 overflow-x-auto motion-safe:scroll-smooth overscroll-x-contain px-5 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={(e) => {
                setKind(f.id);
                const chip = e.currentTarget.getBoundingClientRect();
                const row = e.currentTarget.parentElement!;
                const { left, width } = row.getBoundingClientRect();
                row.scrollTo({
                  left:
                    row.scrollLeft +
                    chip.left -
                    left -
                    (width - chip.width) / 2,
                });
              }}
              aria-pressed={kind === f.id}
              className={cn(
                "flex min-h-10 shrink-0 snap-center items-center rounded-full border px-4 font-mono text-[0.64rem] tracking-[0.14em] whitespace-nowrap uppercase transition-colors sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-[0.58rem]",
                kind === f.id
                  ? "border-foreground/25 bg-secondary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
              <span className="ml-2 text-muted-foreground/50">{f.n}</span>
            </button>
          ))}
        </div>
        {/* Hints that the row scrolls on phones. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -right-5 w-12 bg-linear-to-l from-background sm:hidden"
        />
      </div>

      <ul className="mt-6 grid sm:mt-8 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((h) => (
          <li key={h.slug}>
            <button
              type="button"
              onClick={() => {
                setActive(h);
                setOpen(true);
              }}
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

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-90 bg-[oklch(0.1_0.014_50/0.5)] backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          {active ? (
            <Dialog.Content className="fixed inset-x-0 bottom-0 z-90 flex max-h-[92svh] flex-col overflow-hidden rounded-t-2xl border border-b-0 border-border bg-popover text-popover-foreground shadow-2xl duration-300 focus:outline-none data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:max-h-[88svh] sm:w-[calc(100%-3rem)] sm:max-w-3xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl sm:border-b sm:duration-200 sm:data-[state=closed]:fade-out-0 sm:data-[state=closed]:zoom-out-95 sm:data-[state=closed]:slide-out-to-bottom-2 sm:data-[state=open]:fade-in-0 sm:data-[state=open]:zoom-in-95 sm:data-[state=open]:slide-in-from-bottom-2">
              <div
                aria-hidden
                className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-border sm:hidden"
              />
              <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-3 sm:px-8 sm:py-4">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-[0.62rem] tracking-[0.2em] text-terracotta uppercase">
                    Hidden #{String(active.n).padStart(3, "0")}
                  </span>
                  <span className="truncate font-mono text-[0.54rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                    {hiddenKinds.find((k) => k.id === active.kind)?.label}
                  </span>
                </div>
                <Dialog.Close
                  aria-label="Close"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-terracotta/60 focus-visible:outline-none"
                >
                  <X className="size-4" />
                </Dialog.Close>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-6 sm:pb-8">
                <Dialog.Title className="font-display text-[clamp(1.5rem,5vw,2.2rem)] leading-tight font-semibold text-balance">
                  {active.name}
                </Dialog.Title>
                <Dialog.Description className="mt-3 font-display text-[1.05rem] leading-snug text-foreground/85 italic sm:text-[1.12rem]">
                  {active.line}
                </Dialog.Description>
                <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground sm:mt-5 sm:text-[0.96rem]">
                  {active.note}
                </p>

                <div className="mt-6 grid gap-6 sm:mt-7 md:grid-cols-[1fr_1.1fr]">
                  <dl className="space-y-4">
                    {[
                      ["Where", active.where],
                      ["Access", active.access],
                    ].map(([k, v]) => (
                      <div key={k} className="border-t border-border pt-3">
                        <dt className="font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                          {k}
                        </dt>
                        <dd className="mt-1 text-[0.88rem] leading-relaxed">
                          {v}
                        </dd>
                      </div>
                    ))}
                    <div className="border-t border-border pt-3">
                      <dt className="font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                        Coordinates
                      </dt>
                      <dd className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.88rem]">
                        <span className="tabular-nums">
                          {active.coords.lat.toFixed(4)},{" "}
                          {active.coords.lng.toFixed(4)}
                        </span>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${active.coords.lat},${active.coords.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[0.56rem] tracking-[0.14em] text-terracotta uppercase hover:underline"
                        >
                          Directions <ArrowUpRight className="size-3" />
                        </a>
                      </dd>
                    </div>
                  </dl>
                  <div className="relative isolate aspect-4/3 overflow-hidden rounded-md border border-border bg-background md:aspect-square">
                    <PinMap
                      pins={[
                        {
                          id: active.slug,
                          lat: active.coords.lat,
                          lng: active.coords.lng,
                          colour: "var(--terracotta)",
                          title: active.name,
                          size: "lg",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </Dialog.Content>
          ) : null}
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
