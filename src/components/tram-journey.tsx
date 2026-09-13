"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { CityScene } from "@/components/scenes/city-scene";
import { KolkataMap } from "@/components/kolkata-map";
import { project } from "@/lib/kolkata";
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

  const stop = tramStops[i];
  const progress = i / (tramStops.length - 1);

  return (
    <div className={className}>
      {/* The window. */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border">
        {tramStops.map((s, n) => (
          <div
            key={s.name}
            className="absolute inset-0"
            style={{
              opacity: n === i ? 1 : 0,
              transition: "opacity 1100ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <CityScene name={s.scene} photo={s.photo} className="h-full w-full" />
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
      <div className="relative mt-10">
        <span className="absolute inset-x-0 top-[13px] h-px bg-border" />
        <span
          className="absolute top-[13px] left-0 h-px bg-terracotta transition-[width] duration-1000 ease-in-out"
          style={{ width: `${progress * 100}%` }}
        />
        {/* The car itself, sliding between stops. */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 -translate-x-1/2 transition-[left] duration-1000 ease-in-out motion-reduce:transition-none"
          style={{ left: `${progress * 100}%` }}
        >
          <svg viewBox="0 0 60 26" className="h-6 w-14" fill="var(--terracotta)">
            <rect x="4" y="4" width="48" height="14" rx="3" />
            <rect x="16" y="0" width="6" height="4" rx="1" />
            <path d="M16 0 L19 -6 L22 0" fill="none" stroke="var(--terracotta)" strokeWidth="1.2" />
            <circle cx="14" cy="21" r="3" />
            <circle cx="42" cy="21" r="3" />
          </svg>
        </span>

        <ol className="relative flex justify-between pt-7">
          {tramStops.map((s, n) => (
            <li key={s.name}>
              <button
                type="button"
                onClick={() => {
                  setI(n);
                  setRunning(false);
                }}
                aria-pressed={n === i}
                className="group flex flex-col items-center gap-2"
              >
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
                <span
                  className={cn(
                    "max-w-[4.5rem] text-center font-mono text-[0.5rem] leading-tight tracking-[0.06em] uppercase transition-colors sm:text-[0.56rem]",
                    n === i ? "text-foreground" : "text-muted-foreground/55 group-hover:text-foreground",
                  )}
                >
                  {s.name}
                </span>
                <span className="font-mono text-[0.48rem] tabular-nums text-muted-foreground/40">
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
          {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          {running ? "Stop the tram" : i >= tramStops.length - 1 ? "Ride again" : "Start the journey"}
        </button>
        <p className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
          Esplanade to Shyambazar · {tramStops[tramStops.length - 1].minutes} minutes
        </p>
      </div>

      {/* This stop. */}
      <div key={stop.name} className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
        <div style={{ animation: "rise-in 500ms ease both" }}>
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

        <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
          <KolkataMap id="tram-map" />
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
            <polyline
              points={tramStops.map((s) => {
                const { x, y } = project(s.coords);
                return `${x},${y}`;
              }).join(" ")}
              fill="none"
              stroke="var(--terracotta)"
              strokeWidth="0.7"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
          </svg>
          {tramStops.map((s, n) => {
            const { x, y } = project(s.coords);
            return (
              <span
                key={s.name}
                style={{ left: `${x}%`, top: `${y}%` }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-background transition-all duration-700",
                  n === i ? "size-4 bg-terracotta" : n < i ? "size-2 bg-terracotta/60" : "size-2 bg-muted-foreground/40",
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
