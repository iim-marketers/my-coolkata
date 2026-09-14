import type { Metadata } from "next";
import { ContactSheet } from "@/components/events/contact-sheet";
import {
  ContestFaq,
  CrewPass,
  EntryButton,
  FilmStrip,
  PhotoTrack,
  SeasonRoll,
  VideoTrack,
  Viewfinder,
} from "@/components/events/contest-parts";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  crewPerks,
  currentSeason,
  pad,
  statusLabel,
} from "@/lib/kolkata/contest";

const soon = currentSeason.status === "soon";

export const metadata: Metadata = {
  title: soon ? "Events: Frame Kolkata (coming soon)" : "Events: Frame Kolkata",
  description:
    "A recurring photo and video contest for small creators. Shoot a part of Kolkata; the best photographers and videographers are invited to intern with Coolkata.",
};

export default function EventsPage() {
  const season = currentSeason;

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow={soon ? "Events · Coming soon" : "Events · Frame Kolkata"}
        title={
          soon
            ? "Frame Kolkata is coming soon"
            : "Shoot the city. Join the crew."
        }
        lede={
          soon
            ? "A photo and video contest for small creators, run season after season. Season 01 has not started yet, so here is a first look: pick a part of Kolkata, show it the way only you can, and the best photographers and videographers will be invited to intern with Coolkata."
            : "A photo and video contest for small creators, run season after season. Pick a part of Kolkata, show it the way only you can, and the best photographers and videographers are invited to intern with Coolkata."
        }
        scene="howrah"
        photo="hero-howrah"
      >
        <div className="flex flex-wrap items-center gap-3">
          <EntryButton />
          <a
            href="#how"
            className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-[0.9rem] font-medium transition-[translate,border-color,color] hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            How it works
          </a>
          <a
            href="#prize"
            className="inline-flex items-center rounded-full border border-border bg-card px-5 py-2.5 text-[0.9rem] font-medium transition-[translate,border-color,color] hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            The prize
          </a>
        </div>
        <p className="mt-5 flex items-center gap-2 text-[0.84rem] text-muted-foreground">
          <span className="rec-dot size-2 rounded-full bg-alta" />
          Season {pad(season.number)} · {statusLabel[season.status]} · for
          photographers and videographers
        </p>
      </PageHeader>

      {/* Before the season opens: what is coming, and what is still to be announced. */}
      {soon ? (
        <section className="border-t border-border">
          <div className={`${pageShell} py-16 sm:py-24`}>
            <Reveal>
              <Viewfinder />
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Two ways in. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Two ways in"
              title="Shoot stills, or shoot a story"
              lede="Enter one track or both. A phone is enough for either: what we are looking for is an eye for the city, not the price of the kit."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal className="h-full">
              <PhotoTrack />
            </Reveal>
            <Reveal delay={100} className="h-full">
              <VideoTrack />
            </Reveal>
          </div>
        </div>
      </section>

      {/* The paras to choose from. */}
      {/* <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow={`Season ${pad(season.number)} · ${soon ? "First look" : season.theme}`}
              title="Pick your para"
              lede={
                soon
                  ? `Any neighbourhood of Kolkata counts. Here are ${contestThemes.length} to get you started, laid out like a contact sheet: mark one, or take the idea to your own para and start scouting it now, before entries open.`
                  : `Any neighbourhood of Kolkata counts. Here are ${contestThemes.length} to get you started, laid out like a contact sheet: mark one and it opens with a brief, or take the idea to your own para.`
              }
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <ContactSheet />
          </Reveal>
        </div>
      </section> */}

      {/* How it works. */}
      <section
        id="how"
        className="scroll-mt-20 border-t border-border bg-secondary/40"
      >
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="How it works"
              title="From your camera roll to the crew"
              lede="Five frames, start to finish. Every season runs the same way, so once you have entered one you know the next."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <FilmStrip />
          </Reveal>
        </div>
      </section>

      {/* The prize. */}
      <section id="prize" className="scroll-mt-20 border-t border-border">
        <div
          className={`${pageShell} grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-20`}
        >
          <Reveal>
            <CrewPass />
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="The prize"
              title="Not a trophy. A seat on the crew."
              lede={`The best photographers and videographers of each season are invited to intern with Coolkata, for ${season.internship}.`}
            />
            <ul className="mt-9 grid gap-4 sm:grid-cols-2">
              {crewPerks.map((perk, i) => (
                <li
                  key={perk.title}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <p className="font-mono text-[0.58rem] tracking-[0.2em] text-primary uppercase">
                    ▸ {pad(i + 1)}
                  </p>
                  <p className="mt-2 font-display text-[1.05rem] font-bold">
                    {perk.title}
                  </p>
                  <p className="mt-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                    {perk.line}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.84rem] leading-relaxed text-muted-foreground">
              The length of each internship, and how many places there are, is
              announced with the season.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Season after season. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="It keeps rolling"
              title="One season ends, the next one starts"
              lede="Every few months a new theme and a new crew. Miss this one and there is another frame waiting."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <SeasonRoll />
          </Reveal>
        </div>
      </section>

      {/* Questions. */}
      <section className="border-t border-border">
        <div
          className={`${pageShell} sticky-split grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.5fr] lg:gap-16`}
        >
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="Before you shoot"
              lede="The full rules come with each season's entry form. These are the ones people ask first."
            />
          </Reveal>
          <Reveal delay={100}>
            <ContestFaq />
          </Reveal>
        </div>
      </section>

      {/* Last call. */}
      <section className="bg-ink text-khadi">
        <div className={`${pageShell} py-20 text-center sm:py-28`}>
          <p
            lang="bn"
            className="font-bangla-display text-[clamp(2.4rem,7vw,4.8rem)] leading-[1.15] text-marigold"
          >
            তোমার পাড়া, তোমার ফ্রেম
          </p>
          <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.6rem)] leading-none font-extrabold tracking-tight">
            Your para. Your frame.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[1rem] leading-relaxed text-khadi/70">
            Start scouting now. When Season {pad(season.number)} opens, the
            entry form goes up right here.
          </p>
          <div className="mt-8 flex justify-center">
            <EntryButton tone="dark" />
          </div>
        </div>
      </section>
    </main>
  );
}
