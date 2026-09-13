"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CityScene } from "@/components/scenes/city-scene";
import { dayMoments } from "@/lib/kolkata/day";
import { cn } from "@/lib/utils";

/**
 * The day as a dial. Opens at whatever hour it actually is in Kolkata,
 * which is the whole point of building it as a clock rather than a list.
 */
function kolkataHour() {
  const now = new Date();
  // IST is UTC+5:30 and does not observe daylight saving.
  const ist = new Date(now.getTime() + (330 + now.getTimezoneOffset()) * 60000);
  return ist.getHours() + ist.getMinutes() / 60;
}

function nearestMoment(hour: number) {
  let best = 0;
  let bestD = Infinity;
  dayMoments.forEach((m, i) => {
    // Moments after midnight are stored past 24 so the dial stays ordered.
    const h = m.hour > 24 ? m.hour - 24 : m.hour;
    const d = Math.min(Math.abs(h - hour), 24 - Math.abs(h - hour));
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });
  return best;
}

export function DayClock({ className }: { className?: string }) {
  const [i, setI] = useState(0);
  const [liveIndex, setLiveIndex] = useState<number | null>(null);
  const [istLabel, setIstLabel] = useState<string | null>(null);

  // Read the clock after mount so the server and client markup agree.
  useEffect(() => {
    const sync = () => {
      const h = kolkataHour();
      const idx = nearestMoment(h);
      setLiveIndex(idx);
      const hh = Math.floor(h);
      const mm = Math.floor((h - hh) * 60);
      setIstLabel(
        `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`,
      );
    };
    const id = setTimeout(sync, 0);
    const tick = setInterval(sync, 60000);
    return () => {
      clearTimeout(id);
      clearInterval(tick);
    };
  }, []);

  // Jump to the live moment once, when it first arrives.
  const [jumped, setJumped] = useState(false);
  useEffect(() => {
    if (liveIndex === null || jumped) return;
    const id = setTimeout(() => {
      setI(liveIndex);
      setJumped(true);
    }, 0);
    return () => clearTimeout(id);
  }, [liveIndex, jumped]);

  const m = dayMoments[i];

  return (
    <div className={className}>
      {/* The dial. */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-[13px] h-px bg-border" />
        <div
          className="pointer-events-none absolute top-[13px] left-0 h-px bg-terracotta transition-[width] duration-500"
          style={{ width: `${(i / (dayMoments.length - 1)) * 100}%` }}
        />
        <ol className="relative flex justify-between">
          {dayMoments.map((moment, n) => {
            const live = liveIndex === n;
            return (
              <li key={moment.time}>
                <button
                  type="button"
                  onClick={() => setI(n)}
                  aria-pressed={n === i}
                  aria-label={`${moment.time}, ${moment.title}`}
                  className="group flex flex-col items-center gap-2 pt-1.5"
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
                      "font-mono text-[0.54rem] tracking-[0.06em] tabular-nums transition-colors sm:text-[0.62rem]",
                      n === i ? "text-foreground" : "text-muted-foreground/55 group-hover:text-foreground",
                    )}
                  >
                    {moment.time}
                  </span>
                  {live ? (
                    <span className="font-mono text-[0.46rem] tracking-[0.12em] text-marigold uppercase">
                      now
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {istLabel ? (
        <p className="mt-6 font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
          It is {istLabel} in Kolkata
          {liveIndex !== null && liveIndex !== i ? (
            <button
              type="button"
              onClick={() => setI(liveIndex)}
              className="ml-3 text-terracotta hover:underline"
            >
              Jump to now →
            </button>
          ) : null}
        </p>
      ) : null}

      {/* The hour. */}
      <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
          {dayMoments.map((moment, n) => (
            <div
              key={moment.time}
              className="absolute inset-0"
              style={{
                opacity: n === i ? 1 : 0,
                transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <CityScene
                name={moment.scene} photo={moment.photo}
                className="h-full w-full"
              />
            </div>
          ))}
          <div className="scrim-bottom absolute inset-0" />
          <div className="film-grain absolute inset-0" />
          <p
            key={m.time}
            className="absolute top-5 left-5 font-display text-[clamp(2.2rem,6vw,3.6rem)] leading-none font-semibold text-cream tabular-nums"
            style={{ animation: "fade-in 600ms ease both" }}
          >
            {m.time}
          </p>
          {/* How awake the city is at this hour. */}
          <div className="absolute right-5 bottom-5 left-5">
            <p className="font-mono text-[0.52rem] tracking-[0.2em] text-cream/50 uppercase">
              How awake the city is
            </p>
            <div className="mt-2 h-1 w-full rounded-full bg-cream/20">
              <div
                className="h-full rounded-full bg-marigold transition-[width] duration-700"
                style={{ width: `${m.intensity * 100}%` }}
              />
            </div>
          </div>
        </div>

        <article key={m.time} style={{ animation: "rise-in 500ms ease both" }}>
          <h3 className="font-display text-[clamp(1.7rem,4.4vw,2.6rem)] leading-tight font-semibold">
            {m.title}
          </h3>
          {m.bengali ? (
            <p className="mt-1 text-base text-muted-foreground" lang="bn">
              {m.bengali}
            </p>
          ) : null}
          <p className="mt-1.5 font-mono text-[0.58rem] tracking-[0.18em] text-terracotta uppercase">
            {m.where}
          </p>
          <p className="mt-5 max-w-xl text-[1rem] leading-[1.75] text-muted-foreground">
            {m.body}
          </p>
          {m.href ? (
            <Link
              href={m.href}
              className="group mt-6 inline-flex items-center gap-2 border-b border-terracotta/40 pb-1 font-mono text-[0.62rem] tracking-[0.2em] text-terracotta uppercase transition-colors hover:border-terracotta"
            >
              Go there
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : null}
        </article>
      </div>
    </div>
  );
}
