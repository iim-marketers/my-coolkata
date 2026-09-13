"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { quizQuestions } from "@/lib/kolkata";
import { cn } from "@/lib/utils";

export function Quiz({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizQuestions[step];
  const last = step === quizQuestions.length - 1;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answerIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (last) {
      setDone(true);
      return;
    }
    setStep((s) => s + 1);
    setPicked(null);
  };

  const restart = () => {
    setStep(0);
    setPicked(null);
    setScore(0);
    setDone(false);
  };

  const verdict =
    score === quizQuestions.length
      ? "You are from here, or you have read too much."
      : score >= quizQuestions.length - 2
        ? "Close enough to order confidently on Zakaria Street."
        : score >= quizQuestions.length / 2
          ? "A working knowledge. Go north and fill the gaps."
          : "Start with the food page and come back.";

  return (
    <div className={cn("rounded-lg border border-border bg-card p-5 sm:p-7", className)}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
          How well do you know it
        </p>
        <p className="font-mono text-[0.62rem] tabular-nums text-muted-foreground">
          {done ? quizQuestions.length : step + 1} / {quizQuestions.length}
        </p>
      </div>

      {/* Progress. */}
      <div className="mt-4 flex gap-1">
        {quizQuestions.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-0.5 flex-1 rounded-full",
              done || i < step ? "bg-terracotta" : i === step ? "bg-terracotta/50" : "bg-border",
            )}
          />
        ))}
      </div>

      {done ? (
        <div className="mt-7">
          <p className="font-display text-[clamp(2.4rem,7vw,3.6rem)] leading-none font-semibold text-terracotta">
            {score}
            <span className="text-muted-foreground/50">/{quizQuestions.length}</span>
          </p>
          <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
            {verdict}
          </p>
          <button
            type="button"
            onClick={restart}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[0.62rem] tracking-[0.18em] uppercase transition-colors hover:border-foreground/30"
          >
            <RotateCcw className="size-3.5" />
            Again
          </button>
        </div>
      ) : (
        <>
          <h3 className="mt-6 font-display text-xl leading-snug font-semibold text-balance">
            {q.question}
          </h3>

          <ul className="mt-5 grid gap-2">
            {q.options.map((opt, i) => {
              const isAnswer = i === q.answerIndex;
              const isPicked = picked === i;
              const revealed = picked !== null;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    disabled={revealed}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-[0.9rem] transition-colors",
                      !revealed && "border-border hover:border-foreground/30 hover:bg-secondary",
                      revealed && isAnswer && "border-verdigris/70 bg-verdigris/10",
                      revealed && isPicked && !isAnswer && "border-alta/70 bg-alta/10",
                      revealed && !isAnswer && !isPicked && "border-border opacity-50",
                    )}
                  >
                    {opt}
                    {revealed && isAnswer ? (
                      <Check className="size-4 shrink-0 text-verdigris" />
                    ) : null}
                    {revealed && isPicked && !isAnswer ? (
                      <X className="size-4 shrink-0 text-alta" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {picked !== null ? (
            <div className="mt-5 border-t border-border pt-5">
              <p className="text-[0.88rem] leading-relaxed text-muted-foreground">
                {q.because}
              </p>
              <button
                type="button"
                onClick={next}
                className="mt-4 rounded-full bg-primary px-5 py-2 font-mono text-[0.62rem] tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
              >
                {last ? "See the score" : "Next"}
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
