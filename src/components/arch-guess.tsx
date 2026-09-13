"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { archPuzzles, archStyles } from "@/lib/kolkata/architecture";
import type { StyleId } from "@/lib/kolkata/architecture";
import { cn, round2 } from "@/lib/utils";

/**
 * Can you identify this building? A drawn crop rather than a photograph,
 * so the tell is a shape rather than a giveaway detail.
 */
function Crop({ kind, tone }: { kind: string; tone: string }) {
  const common = { fill: "none", stroke: tone, strokeWidth: 3, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 240 180" className="h-full w-full" aria-hidden>
      <rect width="240" height="180" fill="var(--secondary)" />
      {kind === "dome" && (
        <g {...common}>
          <path d="M40 150 Q120 8 200 150" />
          <path d="M56 150 Q120 40 184 150" opacity="0.4" />
          <line x1="30" y1="150" x2="210" y2="150" />
          <circle cx="120" cy="26" r="7" />
          <line x1="120" y1="19" x2="120" y2="4" />
        </g>
      )}
      {kind === "arch" && (
        <g {...common}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <path d={`M${28 + i * 66} 150 L${28 + i * 66} 80 Q${56 + i * 66} 32 ${84 + i * 66} 80 L${84 + i * 66} 150`} />
            </g>
          ))}
          <line x1="14" y1="150" x2="226" y2="150" />
          <line x1="14" y1="66" x2="226" y2="66" opacity="0.35" />
        </g>
      )}
      {kind === "column" && (
        <g {...common}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line x1={40 + i * 40} y1="46" x2={40 + i * 40} y2="150" />
              <line x1={34 + i * 40} y1="46" x2={46 + i * 40} y2="46" />
              <path d={`M${33 + i * 40} 40 q${7} -10 ${14} 0`} opacity="0.6" />
            </g>
          ))}
          <line x1="18" y1="30" x2="222" y2="30" />
          <line x1="18" y1="150" x2="222" y2="150" />
        </g>
      )}
      {kind === "truss" && (
        <g {...common}>
          <line x1="10" y1="130" x2="230" y2="130" />
          <path d="M10 40 Q120 118 230 40" />
          {Array.from({ length: 9 }, (_, i) => {
            const x = 22 + i * 25;
            const t = Math.abs(120 - x) / 110;
            const y = round2(118 - Math.pow(t, 1.6) * 78);
            return <line key={i} x1={x} y1={y} x2={x} y2="130" strokeWidth="2" />;
          })}
          <line x1="52" y1="18" x2="52" y2="130" strokeWidth="4" />
          <line x1="188" y1="18" x2="188" y2="130" strokeWidth="4" />
        </g>
      )}
      {kind === "spire" && (
        <g {...common}>
          <path d="M120 12 L98 78 L142 78 Z" />
          <path d="M70 46 L56 96 L84 96 Z" opacity="0.6" />
          <path d="M170 46 L156 96 L184 96 Z" opacity="0.6" />
          <line x1="30" y1="150" x2="210" y2="150" />
          <line x1="44" y1="96" x2="196" y2="96" />
          <line x1="44" y1="118" x2="196" y2="118" opacity="0.4" />
        </g>
      )}
      {kind === "balcony" && (
        <g {...common}>
          {[0, 1].map((row) => (
            <g key={row}>
              <line x1="16" y1={70 + row * 48} x2="224" y2={70 + row * 48} />
              {Array.from({ length: 14 }, (_, i) => (
                <line key={i} x1={22 + i * 15} y1={70 + row * 48} x2={22 + i * 15} y2={54 + row * 48} strokeWidth="1.6" />
              ))}
              <line x1="16" y1={54 + row * 48} x2="224" y2={54 + row * 48} strokeWidth="1.6" opacity="0.6" />
            </g>
          ))}
          <line x1="16" y1="166" x2="224" y2="166" />
        </g>
      )}
      {kind === "corner" && (
        <g {...common}>
          <path d="M30 160 L30 60 Q30 26 66 26 L210 26" />
          <path d="M44 160 L44 68 Q44 40 74 40 L210 40" opacity="0.45" />
          <line x1="30" y1="92" x2="210" y2="92" opacity="0.5" />
          <line x1="30" y1="118" x2="210" y2="118" opacity="0.5" />
          <rect x="170" y="6" width="16" height="66" rx="2" opacity="0.8" />
        </g>
      )}
    </svg>
  );
}

export function ArchGuess({ className }: { className?: string }) {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<StyleId | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);

  const puzzle = archPuzzles[round % archPuzzles.length];
  const style = archStyles.find((s) => s.id === puzzle.styleId)!;

  // Four options: the right one, plus three others, stable per round.
  const options = useMemo(() => {
    const others = archStyles.filter((s) => s.id !== puzzle.styleId);
    const picks: typeof archStyles = [];
    for (let i = 0; i < 3; i++) {
      picks.push(others[(round * 3 + i * 2) % others.length]);
    }
    const unique = [style, ...picks.filter((p) => !picks.slice(0, picks.indexOf(p)).includes(p))];
    const seen = new Set<string>();
    const list = unique.filter((s) => !seen.has(s.id) && seen.add(s.id));
    // Deterministic shuffle, mixed with the round so the correct answer
    // does not sit in the same slot every time.
    const key = (id: string) => (id.charCodeAt(0) * 7 + round * 13) % 11;
    return list.sort((a, b) => key(a.id) - key(b.id));
  }, [round, puzzle.styleId, style]);

  const choose = (id: StyleId) => {
    if (picked) return;
    setPicked(id);
    setAnswered((n) => n + 1);
    if (id === puzzle.styleId) setScore((n) => n + 1);
  };

  const next = () => {
    setRound((r) => r + 1);
    setPicked(null);
  };

  const restart = () => {
    setRound(0);
    setPicked(null);
    setScore(0);
    setAnswered(0);
  };

  return (
    <div className={cn("rounded-lg border border-border bg-card p-6 sm:p-8", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
          Can you identify this building?
        </p>
        <p className="font-mono text-[0.62rem] tabular-nums text-muted-foreground">
          {score} / {answered} correct
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-border">
            <Crop kind={puzzle.crop} tone={picked ? style.tone : "var(--foreground)"} />
            <span className="absolute top-3 left-3 font-mono text-[0.54rem] tracking-[0.18em] text-muted-foreground uppercase">
              Detail · {puzzle.crop}
            </span>
          </div>
          <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
            {puzzle.clue}
          </p>
        </div>

        <div>
          <p className="font-mono text-[0.56rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
            Which style?
          </p>
          <ul className="mt-3 grid gap-2">
            {options.map((o) => {
              const isAnswer = o.id === puzzle.styleId;
              const isPicked = picked === o.id;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => choose(o.id)}
                    disabled={Boolean(picked)}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-[0.9rem] transition-colors",
                      !picked && "border-border hover:border-foreground/30 hover:bg-secondary",
                      picked && isAnswer && "border-verdigris/70 bg-verdigris/10",
                      picked && isPicked && !isAnswer && "border-alta/70 bg-alta/10",
                      picked && !isAnswer && !isPicked && "border-border opacity-50",
                    )}
                  >
                    <span>
                      {o.label}
                      <span className="ml-2 font-mono text-[0.54rem] text-muted-foreground/60">
                        {o.years}
                      </span>
                    </span>
                    {picked && isAnswer ? <Check className="size-4 shrink-0 text-verdigris" /> : null}
                    {picked && isPicked && !isAnswer ? <X className="size-4 shrink-0 text-alta" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {picked ? (
            <div className="mt-6 border-t border-border pt-5">
              <p className="font-mono text-[0.56rem] tracking-[0.2em] text-terracotta uppercase">
                {puzzle.built} · {puzzle.where}
              </p>
              <p className="mt-2 font-display text-xl font-semibold">
                {puzzle.answer}
              </p>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
                {puzzle.reveal}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={next}
                  className="rounded-full bg-primary px-5 py-2 font-mono text-[0.62rem] tracking-[0.18em] text-primary-foreground uppercase transition-opacity hover:opacity-90"
                >
                  Next building
                </button>
                {puzzle.href ? (
                  <Link
                    href={puzzle.href}
                    className="font-mono text-[0.6rem] tracking-[0.18em] text-terracotta uppercase hover:underline"
                  >
                    Read about it →
                  </Link>
                ) : null}
                {answered >= 4 ? (
                  <button
                    type="button"
                    onClick={restart}
                    className="inline-flex items-center gap-1.5 font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase hover:text-foreground"
                  >
                    <RotateCcw className="size-3" />
                    Reset score
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
