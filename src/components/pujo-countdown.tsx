"use client";

import { usePujoPhase } from "@/components/use-pujo-phase";
import { festivalDays, type PujoPhase } from "@/lib/kolkata/pujo";
import { cn } from "@/lib/utils";

type Phase<K extends PujoPhase["kind"]> = Extract<PujoPhase, { kind: K }>;

function split(ms: number) {
  ms = Math.max(0, ms);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

/**
 * Counts down to Mahasasthi, shows the day from Shashthi to Dashami, then
 * counts down again. Rendered empty on the server so the markup matches,
 * then filled on the client where a real clock exists.
 */
export function PujoCountdown({
  className,
  tone = "dark",
}: {
  className?: string;
  /** `light` sits on a pale banner: ink numbers, aligned to the left. */
  tone?: "dark" | "light";
}) {
  const state = usePujoPhase(1000);
  const light = tone === "light";

  if (state?.phase.kind === "festival") {
    return <FestivalDay phase={state.phase} light={light} className={className} />;
  }

  const phase = state?.phase as Phase<"countdown" | "bijoya"> | undefined;
  const target = phase?.kind === "bijoya" ? phase.next : phase;
  const left = state && target ? split(target.start.getTime() - state.now.getTime()) : null;

  const eyebrow = !phase
    ? "Until Mahasasthi"
    : phase.kind === "bijoya"
      ? `Shubho Bijoya · Until Mahasasthi ${phase.next.year}`
      : `${phase.deviPaksha ? "Devi Paksha · " : ""}Until Mahasasthi ${phase.year}`;

  const closing =
    phase?.kind === "bijoya"
      ? "The goddess has gone home. In January somebody starts binding straw again."
      : (phase?.today?.what ?? "The city is getting ready.");

  const units: [string, number | null][] = [
    ["Days", left?.days ?? null],
    ["Hours", left?.hours ?? null],
    ["Minutes", left?.minutes ?? null],
    ["Seconds", left?.seconds ?? null],
  ];

  return (
    <div className={cn(light ? "text-left" : "text-center", className)}>
      <Eyebrow light={light}>{eyebrow}</Eyebrow>

      <div
        className={cn(
          "flex items-start",
          light ? "mt-4 justify-start gap-3 sm:gap-5" : "mt-6 justify-center gap-4 sm:gap-8",
        )}
      >
        {units.map(([label, value], i) => (
          <div
            key={label}
            className={cn("flex items-start", light ? "gap-3 sm:gap-5" : "gap-4 sm:gap-8")}
          >
            <div>
              <p
                className={cn(
                  "font-display leading-none font-semibold tabular-nums",
                  light
                    ? "text-[clamp(2rem,6vw,3.4rem)] text-foreground"
                    : "text-[clamp(2.4rem,10vw,5.5rem)] text-cream",
                )}
                suppressHydrationWarning
              >
                {value === null ? "––" : String(value).padStart(2, "0")}
              </p>
              <p
                className={cn(
                  "mt-2 font-mono text-[0.54rem] tracking-[0.24em] uppercase",
                  light ? "text-muted-foreground" : "text-cream/50",
                )}
              >
                {label}
              </p>
            </div>
            {i < units.length - 1 ? (
              <span
                className={cn(
                  "font-display leading-none",
                  light
                    ? "text-[clamp(1.6rem,5vw,2.8rem)] text-foreground/20"
                    : "text-[clamp(2rem,8vw,4.5rem)] text-cream/20",
                )}
              >
                :
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <Closing light={light}>{closing}</Closing>
    </div>
  );
}

function FestivalDay({
  phase,
  light,
  className,
}: {
  phase: Phase<"festival">;
  light: boolean;
  className?: string;
}) {
  const { today, index, tomorrow } = phase;

  return (
    <div className={cn(light ? "text-left" : "text-center", className)}>
      <Eyebrow light={light}>
        Day {index + 1} of {festivalDays.length} · It is happening now
      </Eyebrow>

      <div className={cn(light ? "mt-4" : "mt-6")}>
        <p
          className={cn(
            "font-display leading-none font-semibold",
            light
              ? "text-[clamp(2.4rem,7vw,3.8rem)] text-foreground"
              : "text-[clamp(2.8rem,11vw,6rem)] text-cream",
          )}
        >
          {today.day}
        </p>
        <p
          lang="bn"
          className={cn(
            "mt-2 text-[0.95rem]",
            light ? "text-muted-foreground" : "text-cream/55",
          )}
        >
          {today.bengali}
        </p>
      </div>

      <ol
        aria-label="The five days"
        className={cn(
          "mt-6 grid max-w-md grid-cols-5 gap-1.5",
          !light && "mx-auto",
        )}
      >
        {festivalDays.map((d, i) => (
          <li key={d.day} aria-current={i === index ? "date" : undefined}>
            <span
              className={cn(
                "block h-1 rounded-full",
                i === index
                  ? light
                    ? "bg-primary"
                    : "bg-marigold"
                  : i < index
                    ? light
                      ? "bg-primary/35"
                      : "bg-marigold/40"
                    : light
                      ? "bg-foreground/12"
                      : "bg-cream/15",
              )}
            />
            <span
              className={cn(
                "mt-2 block font-mono text-[0.5rem] tracking-[0.14em] uppercase sm:text-[0.54rem]",
                i === index
                  ? light
                    ? "text-foreground"
                    : "text-cream"
                  : light
                    ? "text-muted-foreground/70"
                    : "text-cream/45",
              )}
            >
              {d.day}
            </span>
          </li>
        ))}
      </ol>

      <Closing light={light}>{today.what}</Closing>

      <p
        className={cn(
          "mt-3 font-mono text-[0.58rem] tracking-[0.16em] uppercase",
          light ? "text-primary" : "text-marigold/80",
        )}
      >
        {today.where}
        {tomorrow ? ` · Tomorrow, ${tomorrow.day}` : " · Bisarjan tonight"}
      </p>
    </div>
  );
}

function Eyebrow({ light, children }: { light: boolean; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "font-mono text-[0.6rem] tracking-[0.3em] uppercase",
        light ? "text-primary" : "text-marigold/85",
      )}
      suppressHydrationWarning
    >
      {children}
    </p>
  );
}

function Closing({ light, children }: { light: boolean; children: React.ReactNode }) {
  return (
    <p
      className={cn(
        "max-w-2xl font-display text-balance italic",
        light
          ? "mt-5 text-[1.1rem] text-foreground/70"
          : "mx-auto mt-8 text-[clamp(1.1rem,3vw,1.8rem)] text-cream/80",
      )}
    >
      {children}
    </p>
  );
}
