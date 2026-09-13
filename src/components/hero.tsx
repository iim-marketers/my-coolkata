"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CityScene, scenePalettes } from "@/components/scenes/city-scene";
import { CITY_COORDS_DISPLAY } from "@/lib/kolkata";
import type { SceneName } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/** The opening sequence, in order. Each frame is a different hour of the day. */
const SEQUENCE: SceneName[] = [
  "howrah",
  "tram",
  "kumartuli",
  "pujo",
  "victoria",
  "streetfood",
  "collegestreet",
];

const HOLD_MS = 5200;
const FADE_MS = 1600;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  /**
   * Only the frame on screen and the one after it are in the document to
   * begin with. Mounting all seven up front costs about 70KB of gzipped
   * markup that nobody sees for the first five seconds.
   */
  const [mounted, setMounted] = useState<number[]>([0, 1]);
  const indexRef = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback((to?: number) => {
    const next =
      to === undefined ? (indexRef.current + 1) % SEQUENCE.length : to;
    indexRef.current = next;
    setIndex(next);
    setMounted((m) => {
      const after = (next + 1) % SEQUENCE.length;
      if (m.includes(next) && m.includes(after)) return m;
      return Array.from(new Set([...m, next, after]));
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = setInterval(() => advance(), HOLD_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [advance, paused]);

  // Stop cycling while the hero is off screen; nobody is watching it.
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setPaused(!e.isIntersecting),
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = scenePalettes[SEQUENCE[index]];

  return (
    <section
      ref={rootRef}
      className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden bg-[oklch(0.1_0.014_50)]"
    >
      {/* The sequence. All frames are mounted; only opacity moves. */}
      {SEQUENCE.map((name, i) =>
        !mounted.includes(i) ? null : (
        <div
          key={name}
          className="absolute inset-0"
          style={{
            opacity: i === index ? 1 : 0,
            transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <div
            className="h-full w-full will-change-transform"
            style={
              i === index
                ? {
                    animation: `ken-burns ${HOLD_MS + FADE_MS}ms linear forwards`,
                  }
                : { transform: "scale(1.04)" }
            }
          >
            <CityScene name={name} instance="hero" className="h-full w-full" />
          </div>
        </div>
        ),
      )}

      <div className="scrim-full absolute inset-0" />
      <div className="film-grain absolute inset-0" />

      {/* Coordinates, holding in the corner after the intro lifts. */}
      <p className="absolute top-24 left-6 font-mono text-[0.65rem] tracking-[0.34em] text-cream/50 sm:left-10 md:top-28">
        {CITY_COORDS_DISPLAY}
      </p>

      {/* What you are actually looking at. */}
      <div
        key={SEQUENCE[index]}
        className="absolute right-6 bottom-32 max-w-[17rem] text-right sm:right-10 md:bottom-40"
        style={{ animation: "fade-in 1200ms ease both" }}
      >
        <p className="font-mono text-[0.62rem] tracking-[0.28em] text-marigold/80 uppercase">
          {active.label}
        </p>
        <p className="mt-1.5 text-sm leading-snug text-cream/55">
          {active.caption}
        </p>
      </div>

      {/* The title. */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 md:pb-20">
        <h1 className="font-display text-[clamp(3.2rem,15vw,11rem)] leading-[0.82] font-semibold tracking-[-0.03em] text-cream">
          KOLKATA
        </h1>
        <p className="mt-3 font-display text-[clamp(1.05rem,3.2vw,1.85rem)] text-cream/75 italic">
          The city of stories.
        </p>

        <Link
          href="/heritage"
          className="group mt-8 inline-flex items-center gap-3 border-b border-marigold/40 pb-1.5 font-mono text-[0.72rem] tracking-[0.26em] text-marigold uppercase transition-colors hover:border-marigold"
        >
          Explore the city
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1.5" />
        </Link>

        {/* Frame ticks: where you are in the sequence. */}
        <div className="mt-10 flex items-center gap-2">
          {SEQUENCE.map((name, i) => (
            <button
              key={name}
              type="button"
              onClick={() => advance(i)}
              aria-label={`Show ${scenePalettes[name].label}`}
              aria-current={i === index}
              className="group py-2"
            >
              <span
                className={cn(
                  "block h-px w-8 transition-all duration-500 sm:w-11",
                  i === index
                    ? "bg-marigold"
                    : "bg-cream/25 group-hover:bg-cream/60",
                )}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Scroll cue. */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[0.58rem] tracking-[0.3em] text-cream/35 uppercase">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-cream/40 to-transparent" />
      </div>
    </section>
  );
}
