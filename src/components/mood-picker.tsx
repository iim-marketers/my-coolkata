"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Rain } from "@/components/ambient";
import { CityScene } from "@/components/scenes/city-scene";
import { moods } from "@/lib/kolkata/moods";
import { cn } from "@/lib/utils";

/** How do you want to experience Kolkata? Ten answers, each a day. */
export function MoodPicker({ className }: { className?: string }) {
  const [id, setId] = useState<string | null>(null);
  const mood = moods.find((m) => m.id === id);

  return (
    <div className={className}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {moods.map((m) => {
          const on = m.id === id;
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setId(on ? null : m.id)}
                aria-pressed={on}
                className={cn(
                  "flex h-full w-full flex-col items-start rounded-lg border p-4 text-left transition-colors",
                  on
                    ? "border-terracotta bg-terracotta/8"
                    : "border-border hover:border-foreground/30 hover:bg-secondary",
                )}
              >
                <span className="text-2xl" aria-hidden>
                  {m.icon}
                </span>
                <span className="mt-3 font-display text-[0.98rem] leading-tight font-semibold">
                  {m.label}
                </span>
                <span className="mt-1 font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground/70 uppercase">
                  {m.when}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {mood ? (
        <article
          key={mood.id}
          className="mt-10 overflow-hidden rounded-lg border border-border"
          style={{ animation: "rise-in 500ms ease both" }}
        >
          <div className="relative aspect-[21/9] min-h-[16rem]">
            <div className="h-full w-full" style={{ filter: mood.grade }}>
              <CityScene
                name={mood.scene} photo={mood.photo}
                className="h-full w-full"
              />
            </div>
            <div className="scrim-full absolute inset-0" />
            <div className="film-grain absolute inset-0" />
            {mood.id === "rainy" ? <Rain drops={70} /> : null}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
              <p className="text-3xl" aria-hidden>
                {mood.icon}
              </p>
              <h3 className="mt-3 font-display text-[clamp(1.6rem,4.6vw,2.8rem)] leading-tight font-semibold text-cream">
                {mood.label}
              </h3>
              <p className="mt-3 max-w-2xl text-[0.98rem] leading-relaxed text-cream/75">
                {mood.line}
              </p>
            </div>
          </div>

          <div className="grid gap-10 bg-card p-6 sm:p-9 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
            <div>
              <p className="font-mono text-[0.58rem] tracking-[0.24em] text-terracotta uppercase">
                A day like this
              </p>
              <ol className="relative mt-6 border-l border-border">
                {mood.plan.map((s) => (
                  <li key={`${s.time}-${s.what}`} className="relative pb-7 pl-7 last:pb-0">
                    <span className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-terracotta ring-4 ring-card" />
                    <p className="font-mono text-[0.6rem] tracking-[0.16em] text-terracotta uppercase tabular-nums">
                      {s.time}
                    </p>
                    <p className="mt-1.5 max-w-xl text-[0.96rem] leading-snug">{s.what}</p>
                    {s.href ? (
                      <Link
                        href={s.href}
                        className="mt-1 inline-block font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground uppercase transition-colors hover:text-terracotta"
                      >
                        {s.where} →
                      </Link>
                    ) : (
                      <p className="mt-1 font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                        {s.where}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            <aside className="space-y-5">
              <div className="border-t border-border pt-4">
                <p className="font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                  When
                </p>
                <p className="mt-1.5 text-[0.9rem]">{mood.when}</p>
              </div>
              {mood.soundId ? (
                <div className="border-t border-border pt-4">
                  <p className="font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                    What it sounds like
                  </p>
                  <Link
                    href="/sounds"
                    className="mt-1.5 inline-block text-[0.9rem] text-terracotta hover:underline"
                  >
                    Play it on the sound board →
                  </Link>
                </div>
              ) : null}
              {mood.read ? (
                <div className="border-t border-border pt-4">
                  <p className="font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                    Read
                  </p>
                  <Link
                    href={mood.read.href}
                    className="group mt-1.5 inline-flex items-center gap-2 text-[0.9rem] text-terracotta hover:underline"
                  >
                    {mood.read.label}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ) : null}
              <div className="border-t border-border pt-4">
                <Link
                  href="/build-my-day"
                  className="font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
                >
                  Or build your own day →
                </Link>
              </div>
            </aside>
          </div>
        </article>
      ) : (
        <p className="mt-10 rounded-lg border border-dashed border-border p-8 text-center text-[0.92rem] leading-relaxed text-muted-foreground">
          Pick one. Instead of asking what you want to see, this asks how you
          want the day to feel, and then gives you a sequence you could
          actually follow.
        </p>
      )}
    </div>
  );
}
