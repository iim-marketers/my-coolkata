"use client";

import { useEffect, useState } from "react";
import { nextPujoStart } from "@/lib/kolkata/pujo";
import { cn } from "@/lib/utils";

interface Left {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  year: number;
  during: boolean;
}

function compute(): Left {
  const now = new Date();
  const { date, year } = nextPujoStart(now);
  let ms = date.getTime() - now.getTime();
  // Shashthi to Dashami is roughly five days; treat that window as "now".
  const during = ms < 0 && ms > -5 * 86400000;
  if (ms < 0) ms = 0;
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
    year,
    during,
  };
}

/**
 * Counts down to Mahasasthi. Rendered empty on the server so the markup
 * matches, then filled on the client where a real clock exists.
 */
export function PujoCountdown({ className }: { className?: string }) {
  const [left, setLeft] = useState<Left | null>(null);

  useEffect(() => {
    const tick = () => setLeft(compute());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units: [string, number | null][] = [
    ["Days", left?.days ?? null],
    ["Hours", left?.hours ?? null],
    ["Minutes", left?.minutes ?? null],
    ["Seconds", left?.seconds ?? null],
  ];

  return (
    <div className={cn("text-center", className)}>
      <p className="font-mono text-[0.6rem] tracking-[0.3em] text-marigold/85 uppercase">
        {left?.during ? "It is happening now" : `Until Mahasasthi ${left?.year ?? ""}`}
      </p>

      <div className="mt-6 flex items-start justify-center gap-4 sm:gap-8">
        {units.map(([label, value], i) => (
          <div key={label} className="flex items-start gap-4 sm:gap-8">
            <div>
              <p
                className="font-display text-[clamp(2.4rem,10vw,5.5rem)] leading-none font-semibold text-cream tabular-nums"
                suppressHydrationWarning
              >
                {value === null ? "––" : String(value).padStart(2, "0")}
              </p>
              <p className="mt-2 font-mono text-[0.54rem] tracking-[0.24em] text-cream/50 uppercase">
                {label}
              </p>
            </div>
            {i < units.length - 1 ? (
              <span className="font-display text-[clamp(2rem,8vw,4.5rem)] leading-none text-cream/20">
                :
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <p className="mt-8 font-display text-[clamp(1.1rem,3vw,1.8rem)] text-cream/80 italic">
        {left?.during
          ? "The city is not going to work this week."
          : "The city is getting ready."}
      </p>
    </div>
  );
}
