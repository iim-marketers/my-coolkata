"use client";

import Link from "next/link";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import {
  foodQuestions,
  trailFor,
  type Axis,
} from "@/lib/kolkata/food-quiz";
import { cn } from "@/lib/utils";

const ZERO: Record<Axis, number> = {
  sweetness: 0,
  protein: 0,
  formality: 0,
  hour: 0,
};

/** Four questions, then a trail built out of places on this site. */
export function FoodQuiz({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Axis, number>>(ZERO);
  const [picked, setPicked] = useState<number[]>([]);

  const done = step >= foodQuestions.length;
  const q = foodQuestions[step];
  const trail = done ? trailFor(scores) : null;

  const answer = (i: number) => {
    const opt = q.options[i];
    setScores((s) => {
      const next = { ...s };
      for (const [k, v] of Object.entries(opt.scores)) {
        next[k as Axis] += v as number;
      }
      return next;
    });
    setPicked((p) => [...p, i]);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setStep(0);
    setScores(ZERO);
    setPicked([]);
  };

  return (
    <div className={cn("rounded-lg border border-border bg-card p-6 sm:p-8", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
          What kind of Kolkata eater are you?
        </p>
        <p className="font-mono text-[0.62rem] tabular-nums text-muted-foreground">
          {Math.min(step + 1, foodQuestions.length)} / {foodQuestions.length}
        </p>
      </div>

      <div className="mt-4 flex gap-1">
        {foodQuestions.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-0.5 flex-1 rounded-full",
              i < step ? "bg-terracotta" : i === step ? "bg-terracotta/50" : "bg-border",
            )}
          />
        ))}
      </div>

      {!done && q ? (
        <div key={q.id} style={{ animation: "rise-in 400ms ease both" }}>
          <h3 className="mt-7 font-display text-[clamp(1.4rem,3.4vw,2rem)] font-semibold">
            {q.question}
          </h3>
          <ul className="mt-6 grid gap-2.5">
            {q.options.map((o, i) => (
              <li key={o.label}>
                <button
                  type="button"
                  onClick={() => answer(i)}
                  className="w-full rounded-md border border-border p-4 text-left transition-colors hover:border-terracotta/60 hover:bg-terracotta/5"
                >
                  <span className="block font-display text-[1.05rem] font-semibold">
                    {o.label}
                  </span>
                  <span className="mt-1 block text-[0.86rem] leading-snug text-muted-foreground">
                    {o.note}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {step > 0 ? (
            <button
              type="button"
              onClick={restart}
              className="mt-6 font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
            >
              Start again
            </button>
          ) : null}
        </div>
      ) : null}

      {done && trail ? (
        <div style={{ animation: "rise-in 500ms ease both" }}>
          <p className="mt-7 font-mono text-[0.6rem] tracking-[0.26em] text-terracotta uppercase">
            Your Kolkata food trail
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.7rem,4.4vw,2.6rem)] leading-tight font-semibold">
            {trail.title}
          </h3>
          <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-muted-foreground">
            {trail.line}
          </p>

          <ol className="relative mt-8 border-l border-border">
            {trail.stops.map((s) => (
              <li key={`${s.time}-${s.place}`} className="relative pb-7 pl-7 last:pb-0">
                <span className="absolute top-1.5 -left-[4.5px] size-2 rounded-full bg-terracotta ring-4 ring-card" />
                <p className="font-mono text-[0.6rem] tracking-[0.16em] text-terracotta uppercase">
                  {s.time}
                </p>
                {s.href ? (
                  <Link
                    href={s.href}
                    className="mt-1 block font-display text-[1.05rem] font-semibold transition-colors hover:text-terracotta"
                  >
                    {s.place} →
                  </Link>
                ) : (
                  <p className="mt-1 font-display text-[1.05rem] font-semibold">
                    {s.place}
                  </p>
                )}
                <p className="mt-1 text-[0.88rem] text-foreground/80">
                  <span className="text-muted-foreground/60">Order: </span>
                  {s.order}
                </p>
                <p className="mt-0.5 text-[0.84rem] leading-snug text-muted-foreground">
                  {s.note}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[0.62rem] tracking-[0.18em] uppercase transition-colors hover:border-foreground/30"
            >
              <RotateCcw className="size-3.5" />
              Answer again
            </button>
            <p className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
              You picked: {picked.map((p, i) => foodQuestions[i].options[p].label).join(" · ")}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
