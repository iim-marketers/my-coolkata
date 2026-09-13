"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEra } from "@/components/era-provider";
import { CityScene } from "@/components/scenes/city-scene";
import { eraStops } from "@/lib/kolkata/eras";
import { cn } from "@/lib/utils";

/**
 * The full year experience. It shares state with the bar at the bottom
 * of every page, so scrubbing here also changes the rest of the site.
 */
export function ThroughTime() {
  const { era, setEra, index, stop } = useEra();

  return (
    <div>
      {/* The frame for the selected year. */}
      <div className="relative min-h-[62svh] overflow-hidden">
        <CityScene
          name={stop.scene}
          instance="through-time"
          className="absolute inset-0 h-full w-full"
        />
        <div className="scrim-full absolute inset-0" />
        <div className="scrim-bottom absolute inset-x-0 bottom-0 h-3/4" />
        <div className="film-grain absolute inset-0" />

        <div className="relative mx-auto flex min-h-[62svh] w-full max-w-[88rem] flex-col justify-end px-5 pt-28 pb-12 sm:px-8">
          <p className="font-mono text-[0.62rem] tracking-[0.3em] text-marigold/85 uppercase">
            You are looking at
          </p>
          <p
            key={stop.id}
            className="mt-3 font-display text-[clamp(3.4rem,13vw,9rem)] leading-[0.85] font-semibold tracking-[-0.03em] text-cream tabular-nums"
            style={{ animation: "fade-in 700ms ease both" }}
          >
            {stop.label}
          </p>
          <h2 className="mt-5 max-w-3xl font-display text-[clamp(1.3rem,3.6vw,2.4rem)] leading-tight font-semibold text-cream text-balance">
            {stop.headline}
          </h2>
          <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-cream/70">
            {stop.standfirst}
          </p>

          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-6">
            {[
              ["Population", stop.population],
              ["Getting around", stop.getAround],
              ["What it sounds like", stop.soundtrack],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="font-mono text-[0.56rem] tracking-[0.2em] text-cream/45 uppercase">
                  {k}
                </dt>
                <dd className="mt-1 max-w-xs text-sm text-cream/90">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* The scrubber. */}
      <div className="border-y border-border bg-secondary/40">
        <div className="mx-auto w-full max-w-[88rem] px-5 py-8 sm:px-8">
          <label
            htmlFor="era-scrub"
            className="font-mono text-[0.6rem] tracking-[0.26em] text-muted-foreground uppercase"
          >
            Drag the year
          </label>
          <input
            id="era-scrub"
            type="range"
            min={0}
            max={eraStops.length - 1}
            step={1}
            value={index}
            onChange={(e) => setEra(eraStops[Number(e.target.value)].id)}
            className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-terracotta [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-terracotta"
            style={{
              background: `linear-gradient(to right, var(--terracotta) ${(index / (eraStops.length - 1)) * 100}%, var(--border) ${(index / (eraStops.length - 1)) * 100}%)`,
            }}
          />
          <ol className="mt-4 flex justify-between">
            {eraStops.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setEra(e.id)}
                  aria-pressed={e.id === era}
                  className={cn(
                    "font-mono text-[0.58rem] tracking-[0.1em] tabular-nums transition-colors sm:text-[0.68rem]",
                    e.id === era
                      ? "text-terracotta"
                      : "text-muted-foreground/60 hover:text-foreground",
                  )}
                >
                  {e.label}
                </button>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-[0.84rem] leading-relaxed text-muted-foreground">
            The year stays with you. Every page on this site is graded to the
            era you pick, and the bar at the bottom of the screen carries it
            with you as you move around.
          </p>
        </div>
      </div>

      {/* What you would see. */}
      <div className="mx-auto w-full max-w-[88rem] px-5 py-16 sm:px-8 sm:py-24">
        <h3 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-semibold">
          In {stop.label}, you would see
        </h3>
        <ul key={stop.id} className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-2">
          {stop.sees.map((item, i) => (
            <li
              key={item.title}
              className="border-t border-border pt-5"
              style={{ animation: `rise-in 600ms ease ${i * 70}ms both` }}
            >
              <p className="font-mono text-[0.58rem] text-terracotta">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="mt-2 font-display text-xl font-semibold">
                {item.title}
              </h4>
              <p className="mt-2.5 max-w-xl text-[0.94rem] leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            href="/timeline"
            className="group inline-flex items-center gap-2 border-b border-border pb-1 font-mono text-[0.66rem] tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            The full timeline
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/heritage"
            className="group inline-flex items-center gap-2 border-b border-border pb-1 font-mono text-[0.66rem] tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            What was standing then
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
