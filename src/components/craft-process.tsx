"use client";

import { useEffect, useRef, useState } from "react";
import { CityScene } from "@/components/scenes/city-scene";
import { craftStages } from "@/lib/kolkata/kumartuli";
import { cn } from "@/lib/utils";

/**
 * Bamboo to goddess, driven by scroll. The frame is sticky and the stage
 * behind it changes as each block passes the middle of the screen, so the
 * figure appears to be built while you read about it.
 */
export function CraftProcess() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // The block nearest the middle of the viewport wins.
        let best: { i: number; d: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Number((entry.target as HTMLElement).dataset.stage);
          const box = entry.boundingClientRect;
          const d = Math.abs(box.top + box.height / 2 - window.innerHeight / 2);
          if (!best || d < best.d) best = { i, d };
        }
        if (best) setActive(best.i);
      },
      { rootMargin: "-38% 0px -38% 0px", threshold: [0, 0.5, 1] },
    );
    blocks.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const stage = craftStages[active];

  return (
    <div className="relative">
      <div className="grid lg:grid-cols-2 lg:gap-16">
        {/* The frame, held in place while the text scrolls past it. */}
        <div className="pointer-events-none sticky top-0 z-0 hidden h-[100svh] py-24 lg:block">
          <div className="relative h-full w-full overflow-hidden lg:rounded-lg lg:border lg:border-border">
            {craftStages.map((s, i) => (
              <div
                key={s.key}
                className="absolute inset-0"
                style={{
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <CityScene
                  name={s.scene} photo={s.photo}
                  className="h-full w-full"
                />
              </div>
            ))}
            <div className="scrim-bottom absolute inset-0" />
            <div className="film-grain absolute inset-0" />

            {/* Where the figure is, as a bar. */}
            <div className="absolute inset-x-5 bottom-5">
              <div className="flex items-baseline justify-between">
                <p
                  key={stage.key}
                  className="font-display text-2xl font-semibold text-cream sm:text-3xl"
                  style={{ animation: "fade-in 600ms ease both" }}
                >
                  {stage.label}
                </p>
                <p className="font-mono text-[0.58rem] tracking-[0.2em] text-cream/60 tabular-nums">
                  {String(stage.n).padStart(2, "0")} / 0{craftStages.length}
                </p>
              </div>
              <div className="mt-3 h-0.5 w-full rounded-full bg-cream/20">
                <div
                  className="h-full rounded-full bg-marigold transition-[width] duration-[900ms] ease-out"
                  style={{ width: `${stage.progress * 100}%` }}
                />
              </div>
              <p className="mt-2 font-mono text-[0.56rem] tracking-[0.16em] text-cream/50 uppercase">
                {stage.month} · {stage.takes}
              </p>
            </div>
          </div>
        </div>

        {/* The stages. */}
        <div className="relative z-10">
          {craftStages.map((s, i) => (
            <section
              key={s.key}
              data-stage={i}
              ref={(el) => {
                blocks.current[i] = el;
              }}
              id={s.key}
              className="scroll-mt-20 border-t border-border bg-background py-14 first:border-t-0 sm:py-20 lg:min-h-[86svh] lg:border-t-0 lg:py-32"
            >
              {/* On narrow screens the frame travels with the text. */}
              <div className="relative mb-7 aspect-[4/3] overflow-hidden rounded-lg border border-border lg:hidden">
                <CityScene
                  name={s.scene} photo={s.photo}
                  detail="card"
                  className="h-full w-full"
                />
                <div className="scrim-bottom absolute inset-0" />
                <div className="absolute inset-x-4 bottom-4">
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-xl font-semibold text-cream">
                      {s.label}
                    </p>
                    <p className="font-mono text-[0.56rem] tracking-[0.18em] text-cream/60 tabular-nums">
                      {String(s.n).padStart(2, "0")} / {craftStages.length}
                    </p>
                  </div>
                  <div className="mt-2.5 h-0.5 w-full rounded-full bg-cream/20">
                    <div
                      className="h-full rounded-full bg-marigold"
                      style={{ width: `${s.progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-5">
                <span
                  className={cn(
                    "font-mono text-[0.6rem] tabular-nums transition-colors",
                    i === active
                      ? "text-terracotta"
                      : "text-muted-foreground/50",
                  )}
                >
                  {String(s.n).padStart(2, "0")}
                </span>
                <div>
                  <p
                    className={cn(
                      "font-mono text-[0.58rem] tracking-[0.26em] uppercase transition-colors",
                      i === active
                        ? "text-terracotta"
                        : "text-muted-foreground/60",
                    )}
                  >
                    {s.label}
                    {s.bengali ? (
                      <span
                        className="ml-3 tracking-normal normal-case"
                        lang="bn"
                      >
                        {s.bengali}
                      </span>
                    ) : null}
                  </p>
                  <h2 className="mt-2 font-display text-[clamp(1.7rem,4.4vw,2.8rem)] leading-tight font-semibold">
                    {s.title}
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-xl font-display text-[1.12rem] leading-snug text-foreground/85 italic">
                {s.standfirst}
              </p>
              <div className="mt-5 max-w-xl space-y-4 text-[0.98rem] leading-[1.75] text-muted-foreground">
                {s.body.map((para, n) => (
                  <p key={n}>{para}</p>
                ))}
              </div>

              <dl className="mt-7 grid max-w-xl grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
                {[
                  ["Material", s.material],
                  ["Takes", s.takes],
                  ["When", s.month],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[0.52rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                      {k}
                    </dt>
                    <dd className="mt-1 text-[0.84rem]">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
