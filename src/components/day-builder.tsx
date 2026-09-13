"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { buildPlan, durations, interests } from "@/lib/kolkata/planner";
import type { Duration, Interest } from "@/lib/kolkata/planner";
import { cn } from "@/lib/utils";

/** Time available, then interests, then a day you could follow. */
export function DayBuilder({ className }: { className?: string }) {
  const [duration, setDuration] = useState<Duration | null>(null);
  const [chosen, setChosen] = useState<Interest[]>([]);

  const plan = useMemo(
    () => (duration ? buildPlan(duration, chosen) : []),
    [duration, chosen],
  );

  const toggle = (i: Interest) =>
    setChosen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <div className={className}>
      {/* Step one. */}
      <div>
        <p className="font-mono text-[0.58rem] tracking-[0.24em] text-terracotta uppercase">
          01 · How long have you got?
        </p>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {durations.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => setDuration(d.id)}
                aria-pressed={duration === d.id}
                className={cn(
                  "rounded-lg border px-4 py-3 text-left transition-colors",
                  duration === d.id
                    ? "border-terracotta bg-terracotta/8"
                    : "border-border hover:border-foreground/30",
                )}
              >
                <span className="block font-display text-[1.05rem] font-semibold">
                  {d.label}
                </span>
                <span className="mt-0.5 block text-[0.78rem] text-muted-foreground">
                  {d.note}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Step two. */}
      {duration ? (
        <div className="mt-10" style={{ animation: "rise-in 400ms ease both" }}>
          <p className="font-mono text-[0.58rem] tracking-[0.24em] text-terracotta uppercase">
            02 · What are you here for?
          </p>
          <p className="mt-2 text-[0.86rem] text-muted-foreground">
            Pick any number. Nothing selected means a bit of everything.
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {interests.map((i) => {
              const on = chosen.includes(i.id);
              return (
                <li key={i.id}>
                  <button
                    type="button"
                    onClick={() => toggle(i.id)}
                    aria-pressed={on}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.88rem] transition-colors",
                      on
                        ? "border-terracotta bg-terracotta/10"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    <span aria-hidden>{i.icon}</span>
                    {i.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {/* The day. */}
      {duration && plan.length > 0 ? (
        <div className="mt-12" style={{ animation: "rise-in 500ms ease both" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-[0.58rem] tracking-[0.24em] text-terracotta uppercase">
                03 · Your Kolkata
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.6rem,4.4vw,2.6rem)] font-semibold">
                {durations.find((d) => d.id === duration)?.label}
                {chosen.length > 0 ? (
                  <span className="ml-3 text-muted-foreground/60">
                    {chosen
                      .map((c) => interests.find((i) => i.id === c)?.label)
                      .join(" · ")}
                  </span>
                ) : null}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setDuration(null);
                setChosen([]);
              }}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors hover:border-foreground/30"
            >
              <RotateCcw className="size-3.5" />
              Start again
            </button>
          </div>

          <div className="mt-10 space-y-12">
            {plan.map((day) => (
              <div key={day.day}>
                {plan.length > 1 ? (
                  <p className="mb-6 font-mono text-[0.62rem] tracking-[0.22em] text-muted-foreground uppercase">
                    Day {day.day}
                  </p>
                ) : null}
                <ol className="relative border-l border-border">
                  {day.stops.map((s) => (
                    <li key={s.block.id} className="relative pb-8 pl-8 last:pb-0">
                      <span className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-terracotta ring-4 ring-background" />
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <p className="font-display text-xl font-semibold tabular-nums text-terracotta">
                          {s.time}
                        </p>
                        {s.block.href ? (
                          <Link
                            href={s.block.href}
                            className="font-display text-lg font-medium transition-colors hover:text-terracotta"
                          >
                            {s.block.place} →
                          </Link>
                        ) : (
                          <p className="font-display text-lg font-medium">
                            {s.block.place}
                          </p>
                        )}
                        <span aria-hidden className="text-base">
                          {s.block.icon}
                        </span>
                      </div>
                      <p className="mt-1.5 max-w-2xl text-[0.92rem] leading-relaxed text-muted-foreground">
                        {s.block.what}
                      </p>
                      <p className="mt-1.5 flex flex-wrap gap-2">
                        {s.block.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-border px-2 py-0.5 font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground/70 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <p className="mt-10 border-t border-border pt-5 text-[0.82rem] leading-relaxed text-muted-foreground/80">
            Times are starts, with half an hour of getting there built in
            between stops. Nothing is scheduled between one and four in the
            afternoon on a full day, because it is too hot and every itinerary
            that ignores that collapses on the second day.
          </p>
        </div>
      ) : null}
    </div>
  );
}
