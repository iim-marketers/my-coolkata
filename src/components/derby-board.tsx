"use client";

import { useState } from "react";
import { clubs, derbyTimeline } from "@/lib/kolkata/football";
import { cn } from "@/lib/utils";

/** The derby as a scoreboard, with the arguments underneath it. */
export function DerbyBoard({ className }: { className?: string }) {
  const [i, setI] = useState(derbyTimeline.length - 1);
  const moment = derbyTimeline[i];
  const bagan = clubs[0];
  const east = clubs[1];

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      {/* The board. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 p-6 sm:p-10"
        style={{
          background: `linear-gradient(100deg, ${bagan.tone} 0%, ${bagan.tone} 34%, oklch(0.14 0.015 50) 50%, ${east.tone} 66%, ${east.tone} 100%)`,
        }}
      >
        <div className="text-left">
          <p className="font-mono text-[0.54rem] tracking-[0.2em] text-white/60 uppercase">
            Est. {bagan.founded}
          </p>
          <p className="mt-1 font-display text-[clamp(1.1rem,3.4vw,2rem)] leading-tight font-semibold text-white">
            {bagan.name}
          </p>
          <p className="mt-0.5 text-[0.72rem] text-white/60" lang="bn">
            {bagan.bengali}
          </p>
        </div>

        <div className="text-center">
          <p
            key={moment.year}
            className="font-display text-[clamp(1.6rem,6vw,3.4rem)] leading-none font-semibold text-white tabular-nums"
            style={{ animation: "fade-in 500ms ease both" }}
          >
            {moment.score ?? "—"}
          </p>
          <p className="mt-2 font-mono text-[0.6rem] tracking-[0.18em] text-white/70 tabular-nums">
            {moment.year}
          </p>
        </div>

        <div className="text-right">
          <p className="font-mono text-[0.54rem] tracking-[0.2em] text-white/60 uppercase">
            Est. {east.founded}
          </p>
          <p className="mt-1 font-display text-[clamp(1.1rem,3.4vw,2rem)] leading-tight font-semibold text-white">
            {east.name}
          </p>
          <p className="mt-0.5 text-[0.72rem] text-white/60" lang="bn">
            {east.bengali}
          </p>
        </div>
      </div>

      {/* The scrubber. */}
      <div className="border-t border-border bg-card p-6 sm:p-8">
        <div className="relative">
          <span className="absolute inset-x-0 top-[7px] h-px bg-border" />
          <span
            className="absolute top-[7px] left-0 h-px bg-terracotta transition-[width] duration-500"
            style={{ width: `${(i / (derbyTimeline.length - 1)) * 100}%` }}
          />
          <ol className="relative flex justify-between">
            {derbyTimeline.map((m, n) => (
              <li key={m.year}>
                <button
                  type="button"
                  onClick={() => setI(n)}
                  aria-pressed={n === i}
                  aria-label={`${m.year}: ${m.title}`}
                  className="group flex flex-col items-center gap-2 pt-1"
                >
                  <span
                    className={cn(
                      "block rounded-full ring-4 ring-card transition-all",
                      n === i
                        ? "size-3.5 bg-terracotta"
                        : m.pivotal
                          ? "size-2.5 bg-terracotta/50"
                          : "size-2 bg-border group-hover:bg-muted-foreground",
                    )}
                  />
                  <span
                    className={cn(
                      "font-mono text-[0.54rem] tabular-nums transition-colors sm:text-[0.6rem]",
                      n === i ? "text-foreground" : "text-muted-foreground/55 group-hover:text-foreground",
                    )}
                  >
                    {m.year}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div key={moment.year} style={{ animation: "rise-in 400ms ease both" }}>
          <h3 className="mt-8 font-display text-[clamp(1.3rem,3.4vw,2rem)] font-semibold">
            {moment.title}
          </h3>
          <p className="mt-3 max-w-2xl text-[0.96rem] leading-relaxed text-muted-foreground">
            {moment.body}
          </p>
        </div>
      </div>
    </div>
  );
}
