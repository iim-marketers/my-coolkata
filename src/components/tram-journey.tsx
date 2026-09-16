"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import kolkataTram from "@/assets/kolkata-tram.png";
import { CityScene } from "@/components/scenes/city-scene";
import { PinMap, type MapPin } from "@/components/map/pin-map";
import { tramStops } from "@/lib/kolkata/tram";
import { cn } from "@/lib/utils";

const RIDE_MS = 6000;

/**
 * A journey the network could once make. The tram moves along the line,
 * and at every stop you can get off and go somewhere.
 */
export function TramJourney({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!running) return;
    timer.current = setInterval(() => {
      setI((n) => {
        if (n >= tramStops.length - 1) {
          setRunning(false);
          return n;
        }
        return n + 1;
      });
    }, RIDE_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [running]);

  const scroller = useRef<HTMLOListElement>(null);
  const stopRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Whenever the tram reaches a stop, bring its chip to the middle of the
  // row on phones. Scrolls only the row, never the page; a no-op from sm up,
  // where nothing overflows.
  useEffect(() => {
    const el = scroller.current;
    const li = stopRefs.current[i];
    if (!el || !li || el.scrollWidth <= el.clientWidth) return;
    const box = el.getBoundingClientRect();
    const item = li.getBoundingClientRect();
    el.scrollBy({
      left: item.left + item.width / 2 - (box.left + box.width / 2),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [i]);

  const stop = tramStops[i];
  const progress = i / (tramStops.length - 1);

  return (
    <div className={className}>
      {/* The window. */}
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border">
        {tramStops.map((s, n) => (
          <div
            key={s.name}
            className="absolute inset-0"
            style={{
              opacity: n === i ? 1 : 0,
              transition: "opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <CityScene
              name={s.scene}
              photo={s.photo}
              className="h-full w-full"
            />
          </div>
        ))}
        <div className="scrim-bottom absolute inset-0" />
        <div className="film-grain absolute inset-0" />

        <div className="absolute top-5 left-5">
          <p className="font-mono text-[0.54rem] tracking-[0.22em] text-cream/55 uppercase">
            Stop {stop.n} of {tramStops.length}
          </p>
          <p
            key={stop.name}
            className="mt-1 font-display text-[clamp(1.5rem,4.5vw,2.6rem)] leading-tight font-semibold text-cream"
            style={{ animation: "fade-in 700ms ease both" }}
          >
            {stop.name}
          </p>
          {stop.bengali ? (
            <p className="mt-0.5 text-sm text-cream/60" lang="bn">
              {stop.bengali}
            </p>
          ) : null}
        </div>

        <p className="absolute right-5 bottom-5 left-5 max-w-lg text-[0.94rem] leading-snug text-cream/80">
          {stop.line}
        </p>
      </div>

      {/* The line, with the car on it. */}
      <div className="relative mt-14 sm:mt-20">
        <div
          className="absolute inset-x-1.5 top-3.25 sm:left-(--rail-inset) sm:right-(--rail-inset)"
          style={
            { "--rail-inset": `${50 / tramStops.length}%` } as CSSProperties
          }
        >
          <span className="absolute inset-x-0 top-0 h-px bg-border" />
          <span
            className="absolute top-0 left-0 h-px bg-terracotta transition-[width] duration-1000 ease-in-out motion-reduce:transition-none"
            style={{ width: `${progress * 100}%` }}
          />
          {tramStops.map((s, n) => (
            <span
              key={s.name}
              aria-hidden
              className={cn(
                "absolute top-0 -translate-x-1/2 transition-all duration-700 sm:hidden",
                n === i
                  ? "h-2.5 w-0.5 bg-terracotta"
                  : n < i
                    ? "h-1.5 w-px bg-terracotta/60"
                    : "h-1.5 w-px bg-muted-foreground/40",
              )}
              style={{ left: `${(n / (tramStops.length - 1)) * 100}%` }}
            />
          ))}
          {/* The car itself, wheels on the line, sliding between stops. It is
              pulled back by its own width in step with progress, so it stays
              inside the line at both termini. */}
          <span
            aria-hidden
            className="pointer-events-none absolute top-0.5 transition-[left,transform] duration-1000 ease-in-out motion-reduce:transition-none"
            style={{
              left: `${progress * 100}%`,
              transform: `translate(${-progress * 100}%, -100%)`,
            }}
          >
            <Image
              src={kolkataTram}
              alt=""
              sizes="96px"
              draggable={false}
              className="h-10 w-auto max-w-none select-none sm:h-12"
            />
          </span>
        </div>

        <ol
          ref={scroller}
          className="relative -mx-5 flex snap-x snap-proximity scroll-px-5 gap-2 overflow-x-auto overscroll-x-contain px-5 pt-9 pb-1 scrollbar-none sm:mx-0 sm:grid sm:gap-0 sm:overflow-visible sm:px-0 sm:pt-7 [&::-webkit-scrollbar]:hidden"
          style={{
            gridTemplateColumns: `repeat(${tramStops.length}, minmax(0, 1fr))`,
          }}
        >
          {tramStops.map((s, n) => (
            <li
              key={s.name}
              ref={(el) => {
                stopRefs.current[n] = el;
              }}
              className="shrink-0 snap-center sm:flex sm:justify-center"
            >
              <button
                type="button"
                onClick={() => {
                  setI(n);
                  setRunning(false);
                }}
                aria-pressed={n === i}
                className={cn(
                  "group flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono whitespace-nowrap transition-colors sm:w-full sm:flex-col sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0.5 sm:py-1 sm:whitespace-normal",
                  n === i
                    ? "border-terracotta bg-terracotta/10 text-terracotta"
                    : n < i
                      ? "border-terracotta/30 text-foreground/80"
                      : "border-border text-muted-foreground",
                )}
              >
                {/* Fixed-height slot, so the active dot growing doesn't
                    push its label down out of line with the others. */}
                <span className="hidden h-3.5 items-center sm:flex">
                  <span
                    className={cn(
                      "block rounded-full ring-4 ring-background transition-all",
                      n === i
                        ? "size-3.5 bg-terracotta"
                        : n < i
                          ? "size-2 bg-terracotta/50"
                          : "size-2 bg-border group-hover:bg-muted-foreground",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "text-[0.62rem] tracking-[0.12em] uppercase transition-colors sm:max-w-18 sm:text-center sm:text-[0.56rem] sm:leading-tight sm:tracking-[0.06em]",
                    n === i
                      ? "sm:text-foreground"
                      : "sm:text-muted-foreground/55 sm:group-hover:text-foreground",
                  )}
                >
                  {s.name}
                </span>
                <span className="text-[0.62rem] tabular-nums opacity-60 sm:text-[0.48rem] sm:text-muted-foreground/40 sm:opacity-100">
                  {s.minutes}m
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => {
            if (i >= tramStops.length - 1) setI(0);
            setRunning((r) => !r);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-[0.62rem] tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
        >
          {running ? (
            <Pause className="size-3.5" />
          ) : (
            <Play className="size-3.5" />
          )}
          {running
            ? "Stop the tram"
            : i >= tramStops.length - 1
              ? "Ride again"
              : "Start the journey"}
        </button>
        <p className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
          Esplanade to Shyambazar · {tramStops[tramStops.length - 1].minutes}{" "}
          minutes
        </p>
      </div>

      {/* This stop. */}
      <div className="sticky-split mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div key={stop.name} style={{ animation: "rise-in 500ms ease both" }}>
          <p className="max-w-2xl text-[1rem] leading-[1.75] text-muted-foreground">
            {stop.body}
          </p>
          <div className="mt-6 rounded-lg border border-terracotta/30 bg-terracotta/5 p-5">
            <p className="font-mono text-[0.56rem] tracking-[0.2em] text-terracotta uppercase">
              Get off here
            </p>
            <p className="mt-2 text-[0.94rem]">{stop.getOff}</p>
            <Link
              href={stop.href}
              className="group mt-4 inline-flex items-center gap-2 border-b border-terracotta/40 pb-1 font-mono text-[0.62rem] tracking-[0.18em] text-terracotta uppercase transition-colors hover:border-terracotta"
            >
              Explore {stop.name}
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="relative isolate aspect-square overflow-hidden rounded-lg border border-border bg-background">
          <PinMap
            pins={tramStops.map<MapPin>((s, n) => ({
              id: s.name,
              lat: s.coords.lat,
              lng: s.coords.lng,
              colour:
                n === i
                  ? "var(--terracotta)"
                  : n < i
                    ? "color-mix(in oklch, var(--terracotta) 60%, transparent)"
                    : "color-mix(in oklch, var(--muted-foreground) 40%, transparent)",
              title: s.name,
              size: n === i ? "xl" : "sm",
              active: n === i,
            }))}
            line={tramStops.map<[number, number]>((s) => [s.coords.lat, s.coords.lng])}
            lineOpacity={0.5}
          />
        </div>
      </div>
    </div>
  );
}
