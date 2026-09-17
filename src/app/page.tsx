import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { HeritageCard } from "@/components/heritage-card";
import { IllustratedMap } from "@/components/illustrated-map";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import { SectionHeading } from "@/components/section-heading";
import { PujoCountdown } from "@/components/pujo-countdown";
import { TastePlate } from "@/components/taste-plate";
import { heritageSites } from "@/lib/kolkata";
import { currentSeason } from "@/lib/kolkata/contest";
import type { PhotoId } from "@/lib/kolkata/photos";
import { pageMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  description: SITE_DESCRIPTION,
  path: "/",
});

const shell = "mx-auto w-full max-w-[88rem] px-5 sm:px-8";

/** The ways in, by what you feel like doing rather than by district. */
const VIBES: { label: string; line: string; href: string; photo: PhotoId }[] = [
  {
    label: "Eat everything",
    line: "Rolls, phuchka, biryani and mishti",
    href: "/food",
    photo: "kathi-roll",
  },
  {
    label: "Pandal-hopping",
    line: "Five days, zero sleep",
    href: "/durga-puja",
    photo: "pandal-night",
  },
  {
    label: "Hidden gems",
    line: "Spots most people walk right past",
    href: "/hidden",
    photo: "north-kolkata-lane",
  },
  {
    label: "Sunset by the river",
    line: "Ghats, ferries and golden hour",
    href: "/river",
    photo: "hooghly-sunset",
  },
  {
    label: "Adda & coffee",
    line: "Where the city talks for hours",
    href: "/adda",
    photo: "coffee-house",
  },
  {
    label: "Ride the tram",
    line: "Slow, rattly and completely worth it",
    href: "/tram",
    photo: "tram-esplanade",
  },
  {
    label: "Match day",
    line: "Mohun Bagan, East Bengal and a lot of noise",
    href: "/football",
    photo: "salt-lake-stadium",
  },
  {
    label: "Night out",
    line: "Park Street after dark",
    href: "/neighbourhoods/park-street",
    photo: "park-street-night",
  },
];

const PLANS = [
  {
    emoji: "🎭",
    title: "Kolkata by mood",
    line: "Rainy, bookish, hungry or up all night.",
    href: "/mood",
  },
  {
    emoji: "🧠",
    title: "How Kolkata are you?",
    line: "A quick quiz. No pressure. Some pressure.",
    href: "/how-kolkata-are-you",
  },
  {
    emoji: "📸",
    title: "Frame Kolkata",
    line:
      currentSeason.status === "soon"
        ? "Coming soon: a photo and video contest. The best join the crew."
        : "Shoot the city. The best join the My Coolkata crew.",
    href: "/events",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <main className="relative z-10 bg-background">
        {/* Durga Puja. */}
        <section className="relative overflow-hidden border-b border-border mt-10">
          <CityScene name="pujo" className="absolute inset-0 h-full w-full" />
          <div className="scrim-full absolute inset-0" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(58%_50%_at_50%_54%,oklch(0.12_0.02_265/0.72),transparent_74%)]" />
          <div className="film-grain absolute inset-0" />
          <div className={`${shell} relative py-24 sm:py-32`}>
            <Reveal>
              <p className="text-center font-mono text-[0.62rem] tracking-[0.32em] text-cream/60 uppercase">
                Kolkata during Puja
              </p>
              <h2 className="mx-auto mt-5 max-w-3xl text-center font-display text-[clamp(1.9rem,5.5vw,3.8rem)] leading-[0.98] font-extrabold tracking-tight text-cream text-balance">
                For five days, the city stops being a city.
              </h2>
              <PujoCountdown className="mt-12" />
              <div className="mt-12 text-center">
                <Link
                  href="/durga-puja"
                  className="group inline-flex items-center gap-2 rounded-full bg-marigold px-6 py-3 text-[0.92rem] font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Enter the Puja
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Pick a vibe. */}
        <section className="border-y border-border bg-secondary/60">
          <div className={`${shell} pb-16 pt-12 sm:pb-24 sm:pt-18`}>
            <Reveal>
              <SectionHeading
                eyebrow="Pick your vibe"
                title="Searching is easier by mood"
                lede="Start with what you feel like doing. We'll point you at the right corner of the city."
              />
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {VIBES.map((v, i) => (
                <Reveal as="li" key={v.href} delay={i * 60} className="h-full">
                  <Link
                    href={v.href}
                    className="group relative block aspect-4/5 overflow-hidden rounded-3xl bg-muted"
                  >
                    <CityScene
                      photo={v.photo}
                      // Two to a row on a phone, four from `lg`.
                      sizes="(max-width: 1024px) 48vw, 330px"
                      className="absolute inset-0 h-full w-full transition-transform duration-1200 ease-out group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/20 to-transparent" />
                    <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-card/90 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100 sm:top-4 sm:right-4">
                      <ArrowUpRight className="size-4" />
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                      <p className="font-display text-[clamp(1.05rem,2.2vw,1.45rem)] leading-tight font-bold text-cream">
                        {v.label}
                      </p>
                      <p className="mt-1 text-[0.78rem] leading-snug text-cream/75 sm:text-[0.86rem]">
                        {v.line}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Landmarks. */}
        <section className="border-b border-border">
          <div className={`${shell} py-16 sm:py-24`}>
            <Reveal>
              <SectionHeading
                eyebrow="Must-see"
                title="Landmarks worth the trip"
                lede="The big sights everyone should tick off at least once."
                href="/heritage"
                hrefLabel="All landmarks"
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
        <section className="border-b border-border bg-secondary/60">
          <div className={`${shell} py-16 sm:py-24`}>
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

        {/* The neighbourhood map. */}
        <section className="border-b border-border">
          <div className={`${shell} py-16 sm:py-24`}>
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

        {/* Make a plan. */}
        <section className="border-b border-border">
          <div className={`${shell} py-16 sm:py-24`}>
            <Reveal>
              <SectionHeading
                eyebrow="Make a plan"
                title="Not sure where to start?"
                lede="Let the city pick for you."
              />
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PLANS.map((p, i) => (
                <Reveal as="li" key={p.href} delay={i * 80} className="h-full">
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-[translate,border-color,box-shadow] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-30px_oklch(0.25_0.04_265/0.5)]"
                  >
                    <span
                      aria-hidden
                      className="grid size-12 place-items-center rounded-2xl bg-accent text-2xl"
                    >
                      {p.emoji}
                    </span>
                    <p className="mt-6 font-display text-xl font-bold tracking-tight">
                      {p.title}
                    </p>
                    <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted-foreground">
                      {p.line}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-[0.86rem] font-semibold text-primary">
                      Let&apos;s go
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Close. */}
        <section className="relative overflow-hidden">
          <CityScene
            name="river"
            photo="mullick-ghat-flower-market"
            className="absolute inset-0 h-full w-full"
          />
          <div className="scrim-full absolute inset-0" />
          <div className="film-grain absolute inset-0" />
          <div className={`${shell} relative py-28 sm:py-40`}>
            <Reveal className="max-w-2xl">
              <p className="font-mono text-[0.62rem] tracking-[0.3em] text-marigold uppercase">
                One more thing
              </p>
              <h2 className="mt-6 font-display text-[clamp(1.8rem,5vw,3.4rem)] leading-[1.06] font-extrabold tracking-tight text-cream text-balance">
                Come between November and February, and get up for the flower
                market at five.
              </h2>
              <Link
                href="/neighbourhoods/howrah-bridge-strand"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[0.92rem] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                See the flower market
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
