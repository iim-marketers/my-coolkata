import { ArrowDown } from "lucide-react";
import { Alpana } from "@/components/food/alpana";
import { FoodCutout } from "@/components/food/food-cutout";
import type { CutoutId } from "@/lib/kolkata/cutouts";
import { cn } from "@/lib/utils";

/** Street food drifting around the thali, each with its name on a paper chit. */
const DRIFT: { id: CutoutId; bengali: string; className: string; delay: number }[] = [
  { id: "cha-bhaar", bengali: "ভাঁড়ের চা", className: "left-[1%] top-[3%] w-[19%]", delay: 0 },
  { id: "jhalmuri", bengali: "ঝালমুড়ি", className: "right-[2%] top-[-1%] w-[18%]", delay: -2.2 },
  { id: "rosogolla", bengali: "রসগোল্লা", className: "right-[-3%] bottom-[5%] w-[26%]", delay: -4.1 },
  { id: "kathi-roll", bengali: "কাঠি রোল", className: "left-[-4%] bottom-[7%] w-[28%]", delay: -1.3 },
];

/**
 * The /food banner. No photograph: a red-oxide floor with an alpana drawn on
 * it, and a thali set down in the middle.
 */
export function FoodHero({ meta }: { meta: { label: string; value: string }[] }) {
  return (
    <>
      <header className="lal-meje relative isolate overflow-hidden text-khadi">
        <Alpana className="absolute top-1/2 -left-104 size-208 -translate-y-1/2 text-khadi/6" />
        <div className="film-grain absolute inset-0" />

        <div className="relative mx-auto grid w-full max-w-352 items-center gap-8 px-5 pt-24 pb-20 sm:px-8 sm:pt-28 lg:grid-cols-[1fr_1.08fr] lg:gap-10 lg:pb-24">
          <div className="relative z-10">
            <p className="hero-rise font-mono text-[0.62rem] tracking-[0.3em] text-marigold/90 uppercase">
              Taste Kolkata
            </p>
            <p
              lang="bn"
              className="hero-rise mt-3 font-bangla-display text-[clamp(4.4rem,14vw,9.5rem)] leading-none text-marigold [text-shadow:0_5px_0_oklch(0.28_0.1_25/0.55)]"
              style={{ animationDelay: "80ms" }}
            >
              খাই খাই
            </p>
            <h1
              className="hero-rise mt-5 max-w-xl font-display text-[clamp(2rem,5vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.02em] text-balance"
              style={{ animationDelay: "160ms" }}
            >
              Bitter first, sweet last, fish in between
            </h1>
            <p
              className="hero-rise mt-6 max-w-lg text-[1rem] leading-relaxed text-khadi/75"
              style={{ animationDelay: "240ms" }}
            >
              Mustard oil, river fish, fresh chhena, and a relationship with
              sugar that the rest of India finds excessive. Sukumar Ray called a
              book of his verse <em>Khai Khai</em>, after the itch to eat
              everything. This page is for that itch.
            </p>

            <div
              className="hero-rise mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "320ms" }}
            >
              <a
                href="#famous"
                className="group inline-flex items-center gap-2 rounded-full bg-marigold px-5 py-2.5 text-[0.9rem] font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                What Kolkata is famous for
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="#map"
                className="inline-flex items-center rounded-full border border-khadi/30 px-5 py-2.5 text-[0.9rem] font-medium transition-colors hover:border-khadi/70"
              >
                Where to eat
              </a>
            </div>

            <dl
              className="hero-rise mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-khadi/15 pt-6"
              style={{ animationDelay: "400ms" }}
            >
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[0.56rem] tracking-[0.2em] text-khadi/50 uppercase">
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-sm text-khadi/90">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The floor drawing, and the thali set down on it. */}
          <div className="relative mx-auto aspect-square w-full max-w-160">
            <Alpana className="alpana-spin absolute inset-0 text-khadi/85" />
            <div className="hero-zoom absolute inset-[15%] grid place-items-center">
              <FoodCutout id="thali" preload sizes="(max-width: 1024px) 78vw, 560px" />
            </div>
            {DRIFT.map((d) => (
              <div key={d.id} className={cn("absolute", d.className)}>
                <div className="hero-float relative" style={{ animationDelay: `${d.delay}s` }}>
                  <FoodCutout id={d.id} sizes="(max-width: 640px) 28vw, 180px" />
                  <span
                    lang="bn"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 -rotate-3 rounded-sm bg-khadi px-2 py-0.5 font-bangla-display text-[clamp(0.8rem,1.6vw,1.05rem)] leading-snug whitespace-nowrap text-alta shadow-[0_6px_14px_-6px_oklch(0.15_0.04_30/0.6)]"
                  >
                    {d.bengali}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
      <div aria-hidden className="meje-scallop relative z-10 -mb-3.5" />
    </>
  );
}
