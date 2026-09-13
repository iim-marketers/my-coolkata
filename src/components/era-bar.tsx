"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronUp, X } from "lucide-react";
import { useEra } from "@/components/era-provider";
import { eraStops } from "@/lib/kolkata/eras";
import { cn } from "@/lib/utils";

const OPEN_KEY = "kolkata:era-bar";

/**
 * The year control, available on every page. Dragging it does not open a
 * new page: it changes the one you are on.
 */
export function EraBar() {
  const { era, setEra, index, stop, isPast } = useEra();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let hidden = false;
    try {
      hidden = localStorage.getItem(OPEN_KEY) === "0";
    } catch {}
    if (!hidden) return;
    const id = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(id);
  }, []);

  const toggle = (next: boolean) => {
    setOpen(next);
    try {
      localStorage.setItem(OPEN_KEY, next ? "1" : "0");
    } catch {}
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => toggle(true)}
        className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3.5 py-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase shadow-lg backdrop-blur transition-colors hover:border-terracotta"
      >
        <ChevronUp className="size-3" />
        {stop.label}
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[88rem] items-center gap-4 px-4 py-2.5 sm:px-8">
        <Link
          href="/through-time"
          className="hidden shrink-0 font-mono text-[0.58rem] tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-foreground lg:block"
        >
          Through time ↗
        </Link>

        {/* The track. Each stop is a tick; the current one is filled. */}
        <div className="relative flex min-w-0 flex-1 items-center">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border" />
          <span
            className="absolute top-1/2 h-px -translate-y-1/2 bg-terracotta transition-[width] duration-500"
            style={{ width: `${(index / (eraStops.length - 1)) * 100}%` }}
          />
          <ul className="relative flex w-full justify-between">
            {eraStops.map((e, i) => {
              const active = e.id === era;
              const passed = i <= index;
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setEra(e.id)}
                    aria-pressed={active}
                    aria-label={`Show ${e.label}: ${e.headline}`}
                    title={e.headline}
                    className="group flex flex-col items-center gap-1.5 px-0.5 py-1"
                  >
                    <span
                      className={cn(
                        "block rounded-full ring-2 ring-background transition-all",
                        active
                          ? "size-2.5 bg-terracotta"
                          : passed
                            ? "size-1.5 bg-terracotta/60"
                            : "size-1.5 bg-border group-hover:bg-muted-foreground",
                      )}
                    />
                    <span
                      className={cn(
                        "font-mono text-[0.55rem] tracking-[0.08em] tabular-nums transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground/55 group-hover:text-foreground",
                      )}
                    >
                      {e.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="hidden max-w-[16rem] shrink-0 truncate text-[0.76rem] text-muted-foreground xl:block">
          {stop.headline}
        </p>

        {isPast ? (
          <button
            type="button"
            onClick={() => setEra("today")}
            className="shrink-0 rounded-full border border-border px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.16em] uppercase transition-colors hover:border-terracotta"
          >
            Now
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => toggle(false)}
          aria-label="Hide the year bar"
          className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      </div>
    </div>
  );
}
