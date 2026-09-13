import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CoordinateIntro } from "@/components/coordinate-intro";
import { Hero } from "@/components/hero";
import { HeritageCard } from "@/components/heritage-card";
import { IllustratedMap } from "@/components/illustrated-map";
import { PortraitTile } from "@/components/portrait-wall";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import { SectionHeading, Stat } from "@/components/section-heading";
import { PujoCountdown } from "@/components/pujo-countdown";
import { Wordmark } from "@/components/ambient";
import { TastePlate } from "@/components/taste-plate";
import { CITY_COORDS_DISPLAY, heritageSites, people } from "@/lib/kolkata";

const shell = "mx-auto w-full max-w-[88rem] px-5 sm:px-8";

const HOME_PEOPLE = [
  "raja-ram-mohan-roy",
  "rabindranath-tagore",
  "jagadish-chandra-bose",
  "subhas-chandra-bose",
  "satyajit-ray",
];

export default function Home() {
  return (
    <>
      <CoordinateIntro />
      <Hero />

      {/* Everything below scrolls up over the hero. */}
      <main className="relative z-10 bg-background">
        {/* The approach. */}
        <section className="border-b border-border">
          <div
            className={`${shell} grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.4fr_1fr] lg:gap-20`}
          >
            <Reveal>
              <p className="font-mono text-[0.62rem] tracking-[0.3em] text-primary uppercase">
                {CITY_COORDS_DISPLAY} — you have arrived
              </p>
              <Wordmark className="mt-6 text-terracotta" />
              <h2 className="mt-8 font-display text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-tight text-balance">
                It was three villages on a bend in the river, and then it was
                the second city of an empire.
              </h2>
              <p className="mt-7 max-w-2xl text-[1rem] leading-relaxed text-muted-foreground">
                A city that argues with itself about its trams, its river, and
                which Park Street restaurant does the better kebab. This is a
                guide to the arguments as much as to the buildings.
              </p>
            </Reveal>

            <Reveal
              delay={120}
              className="grid grid-cols-3 gap-x-6 gap-y-8 self-start lg:grid-cols-1"
            >
              <Stat
                value="1690"
                label="The first trading post"
                note="At Sutanuti, on the east bank"
              />
              <Stat
                value="15m"
                label="In the metropolitan area"
                note="Third largest in India"
              />
              <Stat
                value="2"
                label="National anthems"
                note="India and Bangladesh, one author"
              />
            </Reveal>
          </div>
        </section>

        {/* Heritage. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Heritage"
                title="What was built, and who paid for it"
                href="/heritage"
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {heritageSites.slice(0, 3).map((site, i) => (
                <Reveal
                  as="li"
                  key={site.slug}
                  delay={i * 110}
                  className="h-full"
                >
                  <HeritageCard site={site} index={i} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Taste Kolkata. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Taste Kolkata"
                title="Start with the plate"
                lede="Six dishes. Tap one to open it."
                href="/food"
                hrefLabel="The whole plate"
              />
            </Reveal>
            <Reveal delay={100} className="mt-14">
              <TastePlate />
            </Reveal>
          </div>
        </section>

        {/* The illustrated map. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Neighbourhoods"
                title="A city of paras"
                lede="Tap a quarter to open it."
                href="/neighbourhoods"
              />
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <IllustratedMap />
            </Reveal>
          </div>
        </section>

        {/* Durga Puja. */}
        <section className="relative overflow-hidden border-b border-border">
          <CityScene name="pujo" className="absolute inset-0 h-full w-full" />
          <div className="scrim-full absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_50%_at_50%_54%,oklch(0.1_0.015_50/0.76),transparent_74%)]" />
          <div className="film-grain absolute inset-0" />
          <div className={`${shell} relative py-24 sm:py-32`}>
            <Reveal>
              <p className="text-center font-mono text-[0.62rem] tracking-[0.32em] text-cream/55 uppercase">
                Kolkata during Puja
              </p>
              <h2 className="mx-auto mt-5 max-w-3xl text-center font-display text-[clamp(1.9rem,5.5vw,3.8rem)] leading-[0.98] font-semibold text-cream text-balance">
                For five days, the city stops being a city.
              </h2>
              <PujoCountdown className="mt-12" />
              <div className="mt-12 text-center">
                <Link
                  href="/durga-puja"
                  className="group inline-flex items-center gap-3 border-b border-marigold/40 pb-1.5 font-mono text-[0.7rem] tracking-[0.24em] text-marigold uppercase transition-colors hover:border-marigold"
                >
                  Enter the Puja
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* People. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="People who made Kolkata"
                title="Twenty-five lives, on one wall"
                href="/people"
                hrefLabel="The portrait wall"
              />
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {people
                .filter((p) => HOME_PEOPLE.includes(p.slug))
                .map((person, i) => (
                  <Reveal
                    as="li"
                    key={person.slug}
                    delay={i * 70}
                    className="h-full"
                  >
                    <PortraitTile person={person} />
                  </Reveal>
                ))}
            </ul>
          </div>
        </section>

        {/* Close. */}
        <section className="relative overflow-hidden">
          <CityScene name="river" photo="mullick-ghat-flower-market" className="absolute inset-0 h-full w-full" />
          <div className="scrim-full absolute inset-0" />
          <div className="film-grain absolute inset-0" />
          <div className={`${shell} relative py-28 sm:py-40`}>
            <Reveal className="max-w-2xl">
              <p className="font-mono text-[0.62rem] tracking-[0.3em] text-marigold/80 uppercase">
                One more thing
              </p>
              <h2 className="mt-6 font-display text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.06] font-semibold text-cream text-balance">
                Come between November and February, and get up for the flower
                market at five.
              </h2>
              <Link
                href="/plan"
                className="group mt-9 inline-flex items-center gap-3 border-b border-marigold/40 pb-1.5 font-mono text-[0.7rem] tracking-[0.24em] text-marigold uppercase transition-colors hover:border-marigold"
              >
                Plan the trip
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1.5" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
