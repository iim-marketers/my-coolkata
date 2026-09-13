import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CityScene, sceneInfo } from "@/components/scenes/city-scene";
import { CITY_COORDS_DISPLAY } from "@/lib/kolkata";

/** The bridge the city is recognised by, lit for the night. */
const scene = sceneInfo.howrah;

export function Hero() {
  return (
    <section className="sticky top-0 z-0 h-svh w-full overflow-hidden bg-[oklch(0.1_0.014_50)]">
      {/*
        A still photograph, no motion. On phones the crop slides left to
        keep the lit main tower in frame.
      */}
      <div className="absolute inset-0">
        <CityScene
          photo="hero-howrah"
          preload
          className="h-full w-full"
          imgClassName="object-[32%_50%] md:object-center"
        />
      </div>

      {/*
        Shade only where the words are: a pool of dark behind the title
        (the light trails there are bright), a band along the bottom, and a
        soft top for the nav.
      */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_18%_72%,oklch(0.09_0.015_50/0.7)_0%,oklch(0.09_0.015_50/0.35)_55%,transparent_100%),linear-gradient(to_top,oklch(0.09_0.015_50/0.75)_0%,oklch(0.09_0.015_50/0.4)_30%,transparent_55%),linear-gradient(to_bottom,oklch(0.09_0.015_50/0.5)_0%,transparent_22%)]" />
      <div className="film-grain absolute inset-0" />

      {/* Coordinates, holding in the corner after the intro lifts. */}
      <p className="absolute top-24 left-6 font-mono text-[0.65rem] tracking-[0.34em] text-cream/70 [text-shadow:0_1px_10px_oklch(0.09_0.015_50/0.8)] sm:left-10 md:top-28">
        {CITY_COORDS_DISPLAY}
      </p>

      {/* What you are looking at, up in the sky, clear of the busy road. */}
      <div className="absolute top-24 right-6 hidden max-w-68 text-right [text-shadow:0_1px_12px_oklch(0.09_0.015_50/0.9)] sm:right-10 sm:block md:top-28">
        <p className="font-mono text-[0.62rem] tracking-[0.28em] text-marigold uppercase">
          {scene.label}
        </p>
        <p className="mt-1.5 text-sm leading-snug text-cream/80">
          {scene.caption}
        </p>
      </div>

      {/* The title. */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-14 sm:px-10 md:pb-20">
        <h1 className="font-display text-[clamp(3rem,12vw,8.5rem)] leading-[0.85] font-semibold tracking-[-0.03em] text-cream [text-shadow:0_2px_30px_oklch(0.09_0.015_50/0.6)]">
          KOLKATA
        </h1>
        <p className="mt-3 font-display text-[clamp(1.05rem,3vw,1.7rem)] text-cream/90 italic [text-shadow:0_1px_14px_oklch(0.09_0.015_50/0.85)]">
          The city of stories.
        </p>

        <Link
          href="/heritage"
          className="group mt-8 inline-flex items-center gap-3 border-b border-marigold/50 pb-1.5 font-mono text-[0.72rem] tracking-[0.26em] text-marigold uppercase [text-shadow:0_1px_10px_oklch(0.09_0.015_50/0.8)] transition-colors hover:border-marigold"
        >
          Explore the city
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1.5" />
        </Link>
      </div>

      {/* Scroll cue. */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[0.58rem] tracking-[0.3em] text-cream/50 uppercase">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-cream/40 to-transparent" />
      </div>
    </section>
  );
}
