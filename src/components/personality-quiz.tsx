"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Copy, RotateCcw } from "lucide-react";
import {
  emptyScores,
  pQuestions,
  scoreToResult,
  type Trait,
} from "@/lib/kolkata/personality";
import { cn } from "@/lib/utils";

/** How Kolkata Are You? Six questions, one result, one line to share. */
export function PersonalityQuiz({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Trait, number>>(emptyScores);
  const [picked, setPicked] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const done = step >= pQuestions.length;
  const q = pQuestions[step];
  const result = done ? scoreToResult(scores) : null;

  const answer = (i: number) => {
    const opt = q.options[i];
    setScores((s) => {
      const next = { ...s };
      for (const [k, v] of Object.entries(opt.scores)) {
        next[k as Trait] += v as number;
      }
      return next;
    });
    setPicked((p) => [...p, i]);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setStep(0);
    setScores(emptyScores());
    setPicked([]);
    setCopied(false);
  };

  const share = async () => {
    if (!result) return;
    const text = `${result.share} — How Kolkata Are You?`;
    try {
      if (navigator.share) {
        await navigator.share({ text, title: "How Kolkata Are You?" });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // The visitor dismissed the sheet, or the clipboard is blocked.
    }
  };

  return (
    <div className={cn("rounded-lg border border-border bg-card p-6 sm:p-9", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
          How Kolkata are you?
        </p>
        <p className="font-mono text-[0.62rem] tabular-nums text-muted-foreground">
          {Math.min(step + 1, pQuestions.length)} / {pQuestions.length}
        </p>
      </div>

      <div className="mt-4 flex gap-1">
        {pQuestions.map((_, i) => (
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
          <h3 className="mt-8 font-display text-[clamp(1.45rem,3.6vw,2.2rem)] font-semibold">
            {q.question}
          </h3>
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {q.options.map((o, i) => (
              <li key={o.label}>
                <button
                  type="button"
                  onClick={() => answer(i)}
                  className="h-full w-full rounded-md border border-border p-4 text-left transition-colors hover:border-terracotta/60 hover:bg-terracotta/5"
                >
                  <span className="block font-display text-[1.02rem] font-semibold">
                    {o.label}
                  </span>
                  <span className="mt-1 block text-[0.84rem] leading-snug text-muted-foreground">
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
              className="mt-6 font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
            >
              Start again
            </button>
          ) : null}
        </div>
      ) : null}

      {done && result ? (
        <div style={{ animation: "rise-in 500ms ease both" }}>
          <p className="mt-8 font-mono text-[0.58rem] tracking-[0.26em] text-terracotta uppercase">
            You are
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.9rem,6vw,3.4rem)] leading-tight font-semibold">
            {result.title}
          </h3>
          <p className="mt-3 font-display text-[clamp(1.1rem,2.8vw,1.5rem)] leading-snug text-foreground/80 italic">
            {result.line}
          </p>
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-muted-foreground">
            {result.body}
          </p>

          {/* The share card. */}
          <div className="mt-8 rounded-lg border border-terracotta/30 bg-terracotta/5 p-5">
            <p className="font-mono text-[0.54rem] tracking-[0.2em] text-terracotta uppercase">
              Your line
            </p>
            <p className="mt-2 font-display text-[1.05rem] leading-snug">
              &ldquo;{result.share}&rdquo;
            </p>
            <button
              type="button"
              onClick={share}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? "Copied" : "Share this"}
            </button>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
              Go here next
            </p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {result.goNext.map((g) => (
                <li key={g.href}>
                  <Link
                    href={g.href}
                    className="rounded-full border border-border px-4 py-2 text-[0.86rem] transition-colors hover:border-terracotta hover:text-terracotta"
                  >
                    {g.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] uppercase transition-colors hover:border-foreground/30"
            >
              <RotateCcw className="size-3.5" />
              Answer again
            </button>
            <p className="font-mono text-[0.54rem] tracking-[0.12em] text-muted-foreground/60 uppercase">
              {picked.map((p, i) => pQuestions[i].options[p].label).join(" · ")}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
