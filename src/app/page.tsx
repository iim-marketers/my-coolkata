import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AudioPlayer } from "@/components/audio-player";
import { BeforeAfter } from "@/components/before-after";
import { CoordinateIntro } from "@/components/coordinate-intro";
import { Hero } from "@/components/hero";
import { HeritageCard } from "@/components/heritage-card";
import { IllustratedMap } from "@/components/illustrated-map";
import { InteractiveMap } from "@/components/interactive-map";
import { PortraitTile } from "@/components/portrait-wall";
import { Quiz } from "@/components/quiz";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import { SectionHeading, Stat } from "@/components/section-heading";
import { PersonalityQuiz } from "@/components/personality-quiz";
import { PujoCountdown } from "@/components/pujo-countdown";
import { SoundBoard } from "@/components/sound-board";
import { StoryCard } from "@/components/story-card";
import { TaxiPass, Wordmark } from "@/components/ambient";
import { TastePlate } from "@/components/taste-plate";
import { ThenNowSlider } from "@/components/then-now-slider";
import { Timeline } from "@/components/timeline";
import {
  CITY_COORDS_DISPLAY,
  cityEvents,
  eraStops,
  famousFor,
  getThenNow,
  hiddenPlaces,
  moods,
  heritageSites,
  people,
  stories,
  timeline,
} from "@/lib/kolkata";
import { sectionGroups } from "@/lib/kolkata/section-groups";

const shell = "mx-auto w-full max-w-[88rem] px-5 sm:px-8";

export default function Home() {
  const thenNowHome = getThenNow("dalhousie-square");
  const pivots = timeline.filter((t) => t.pivotal).slice(0, 6);
  const featured = stories[0];

  return (
    <>
      <CoordinateIntro />
      <Hero />

      {/* Everything below scrolls up over the hero. */}
      <main className="relative z-10 bg-background">
        {/* The approach. */}
        <section className="border-b border-border">
          <div className={`${shell} grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.25fr_1fr] lg:gap-20`}>
            <Reveal>
              <p className="font-mono text-[0.62rem] tracking-[0.3em] text-primary uppercase">
                {CITY_COORDS_DISPLAY} — you have arrived
              </p>
              <Wordmark className="mt-6 text-terracotta" />
              <h2 className="mt-8 font-display text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.04] font-semibold tracking-tight text-balance">
                It was three villages on a bend in the river, and then it was the
                second city of an empire.
              </h2>
              <div className="mt-7 max-w-2xl space-y-4 text-[1rem] leading-relaxed text-muted-foreground">
                <p>
                  Sutanuti sold cotton yarn. Gobindapur fished. Kalikata had a
                  temple to the goddess the city is probably named after. In 1690
                  an East India Company agent tied up at the east bank because the
                  water was deep and the marshes made it hard to attack, and
                  nothing here has been quiet since.
                </p>
                <p>
                  What grew is a city that argues with itself continuously: about
                  its trams, its river, its politics, whether the rosogolla is
                  Bengali, and which of two neighbouring restaurants on Park Street
                  does the better kebab. This is a guide to the arguments as much
                  as to the buildings.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid grid-cols-2 gap-x-8 gap-y-8 self-start">
              <Stat value="1690" label="The first trading post" note="At Sutanuti, on the east bank" />
              <Stat value="15m" label="In the metropolitan area" note="Third largest in India" />
              <Stat value="2" label="National anthems" note="India and Bangladesh, one author" />
              <Stat value="1984" label="India's first metro" note="Esplanade to Bhowanipore" />
              <Stat value="151" label="Years of trams" note="1873 to 2024" />
              <Stat value="1" label="UNESCO-listed festival" note="Durga Puja, inscribed 2021" />
            </Reveal>
          </div>
        </section>

        {/* Four ways in: the whole index, grouped, in one screen. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Find your way in"
                title="Start anywhere. They all connect."
                lede="Every page is cross-linked, because a dish leads to a neighbourhood, which leads to a person, who leads to a year."
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sectionGroups.map((group, i) => (
                <Reveal as="li" key={group.label} delay={i * 80} className="h-full">
                  <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold">
                        {group.label}
                      </h3>
                      <span className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
                        {group.items.length} pages
                      </span>
                    </div>
                    <p className="mt-2 border-b border-border pb-4 text-[0.84rem] leading-relaxed text-muted-foreground">
                      {group.blurb}
                    </p>
                    <ul className="mt-2">
                      {group.items.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            title={s.blurb}
                            className="group flex items-center justify-between gap-3 py-1.5 text-[0.95rem] transition-colors hover:text-terracotta"
                          >
                            {s.label}
                            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground/30 transition-transform group-hover:translate-x-1 group-hover:text-terracotta" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Heritage. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Heritage"
                title="What was built, and who paid for it"
                lede="Twelve buildings, from a temple older than the city to a bridge that opened without a ceremony in the middle of a war."
                href="/heritage"
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {heritageSites.slice(0, 3).map((site, i) => (
                <Reveal as="li" key={site.slug} delay={i * 110} className="h-full">
                  <HeritageCard site={site} index={i} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Taste Kolkata. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Taste Kolkata"
                title="Start with the plate"
                lede="Six dishes on a rim. Click one and it opens: where it came from, what it costs, and who does it best."
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
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Neighbourhoods"
                title="Twenty-seven quarters, five zones"
                lede="The city is a set of paras. Every dot sits at its real coordinates; hover one to read the quarter, click to open it."
                href="/neighbourhoods"
              />
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <IllustratedMap />
            </Reveal>
          </div>
        </section>

        {/* Through time. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Kolkata Through Time"
                title="Pick a year. The site changes with it."
                lede="Eight stops between 1690 and today. Choosing one regrades the whole site and it follows you from page to page."
                href="/through-time"
                hrefLabel="Open the slider"
              />
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {eraStops.map((e, i) => (
                <Reveal as="li" key={e.id} delay={(i % 4) * 70} className="h-full">
                  <Link
                    href="/through-time"
                    className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-terracotta/60"
                  >
                    <p className="font-display text-3xl font-semibold tabular-nums text-terracotta">
                      {e.label}
                    </p>
                    <p className="mt-3 font-display text-[1.02rem] leading-snug font-semibold">
                      {e.headline}
                    </p>
                    <p className="mt-2 flex-1 text-[0.84rem] leading-relaxed text-muted-foreground">
                      {e.standfirst}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Durga Puja. */}
        <section className="relative overflow-hidden border-b border-border">
          <CityScene name="pujo" instance="home-pujo" className="absolute inset-0 h-full w-full" />
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

        {/* Famous for. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Famous for"
                title="Eight things, and what is actually in them"
                lede="Food, books, football, cinema, theatre, art, music, festivals. Almost every item has a page of its own."
                href="/famous-for"
              />
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {famousFor.map((f, i) => (
                <Reveal as="li" key={f.slug} delay={(i % 4) * 70} className="h-full">
                  <Link
                    href={`/famous-for#${f.slug}`}
                    className="flex h-full flex-col items-start rounded-lg border border-border bg-card p-5 transition-colors hover:border-terracotta/60"
                  >
                    <span className="text-3xl" aria-hidden>
                      {f.icon}
                    </span>
                    <span className="mt-4 font-display text-lg font-semibold">
                      {f.title}
                    </span>
                    <span className="mt-1 font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                      {f.items.length} things
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured story. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Stories"
                title="Longer reads"
                lede="Six essays on the things the city is currently losing, keeping, or arguing about."
                href="/stories"
              />
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <StoryCard story={featured} featured />
            </Reveal>
            <ul className="mt-5 grid gap-5 md:grid-cols-2">
              {stories.slice(1, 3).map((story, i) => (
                <Reveal as="li" key={story.slug} delay={i * 110} className="h-full">
                  <StoryCard story={story} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Timeline and the comparison. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} grid gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20`}>
            <Reveal>
              <SectionHeading
                eyebrow="Timeline"
                title="The moments the city turns on"
                lede="Six of the twenty-six entries. The rest, with a year scrubber, are on the timeline."
                href="/timeline"
                hrefLabel="All 26"
              />
              <div className="mt-10">
                <Timeline entries={pivots} dense />
              </div>
            </Reveal>

            <Reveal delay={140} className="self-start lg:sticky lg:top-24">
              <BeforeAfter
                before="tram"
                after="rooftops"
                beforeLabel="1902 — 37 routes"
                afterLabel="2024 — one"
                caption="Asia's first electric tramway ran for a hundred and fifty-one years. In 2024 the state announced it would keep a single heritage route. The case is still in the High Court."
              />
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
                lede="A poet who wrote two national anthems, a physicist who refused to patent radio, a schoolteacher who took an armoury, and a confectioner who worked out how to boil curd."
                href="/people"
                hrefLabel="The portrait wall"
              />
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {people
                .filter((p) =>
                  [
                    "raja-ram-mohan-roy",
                    "rabindranath-tagore",
                    "jagadish-chandra-bose",
                    "subhas-chandra-bose",
                    "satyajit-ray",
                  ].includes(p.slug),
                )
                .map((person, i) => (
                  <Reveal as="li" key={person.slug} delay={i * 70} className="h-full">
                    <PortraitTile person={person} />
                  </Reveal>
                ))}
            </ul>
          </div>
        </section>

        {/* Map and sound. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16`}>
            <Reveal>
              <SectionHeading
                eyebrow="Map"
                title="Everything, plotted"
                lede="Real coordinates, projected onto a drawing. The river, the wetlands, the Maidan and the Metro spine are where they actually are."
                href="/map"
              />
              <InteractiveMap className="mt-10" />
            </Reveal>
            <Reveal delay={140} className="self-start lg:sticky lg:top-24">
              <AudioPlayer />
              <div className="mt-5">
                <Quiz />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Sounds. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Kolkata Sounds"
                title="Close your eyes. Listen to Kolkata."
                lede="Eleven sounds, all synthesised in your browser. Play several at once and build the corner you want to be standing on."
                href="/sounds"
              />
            </Reveal>
            <Reveal delay={100} className="mt-12">
              <SoundBoard />
            </Reveal>
          </div>
        </section>

        {/* Kumartuli, adda, the day, College Street. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Go deeper"
                title="Four places that needed their own page"
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  href: "/kumartuli",
                  eyebrow: "Craft",
                  title: "Kumartuli",
                  body: "Bamboo, straw, clay, paint, the eyes, the goddess. Scroll and the figure builds itself.",
                },
                {
                  href: "/adda",
                  eyebrow: "আড্ডা",
                  title: "Adda",
                  body: "The long unproductive argument that is close to the city's actual religion. Six topics, and nobody wins.",
                },
                {
                  href: "/a-day-in-kolkata",
                  eyebrow: "05:30 → 02:00",
                  title: "A Day in Kolkata",
                  body: "Ten hours of an ordinary day, on a dial that opens at whatever time it is there now.",
                },
                {
                  href: "/college-street",
                  eyebrow: "Boi Para",
                  title: "College Street",
                  body: "A mile and a half of secondhand stalls, four universities, and one very loud first floor.",
                },
              ].map((card, i) => (
                <Reveal as="li" key={card.href} delay={(i % 4) * 80} className="h-full">
                  <Link
                    href={card.href}
                    className="flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-terracotta/60"
                  >
                    <p className="font-mono text-[0.58rem] tracking-[0.22em] text-terracotta uppercase">
                      {card.eyebrow}
                    </p>
                    <p className="mt-4 font-display text-xl font-semibold">
                      {card.title}
                    </p>
                    <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                      {card.body}
                    </p>
                    <span className="mt-5 font-mono text-[0.58rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                      Open →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Hidden Kolkata. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Hidden Kolkata"
                title="You probably didn't know this existed"
                lede="A numbered catalogue of the forgotten buildings, hidden temples, old signs and half-shut bakeries the guidebooks skip."
                href="/hidden"
                hrefLabel={`All ${hiddenPlaces.length}`}
              />
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {hiddenPlaces.slice(0, 3).map((h, i) => (
                <Reveal as="li" key={h.slug} delay={i * 90} className="h-full">
                  <Link
                    href="/hidden"
                    className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-terracotta/60"
                  >
                    <span className="font-mono text-[0.58rem] tracking-[0.18em] text-terracotta uppercase">
                      Hidden #{String(h.n).padStart(3, "0")}
                    </span>
                    <span className="mt-4 font-display text-[1.15rem] leading-snug font-semibold">
                      {h.line}
                    </span>
                    <span className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-muted-foreground">
                      {h.note}
                    </span>
                    <span className="mt-4 border-t border-border pt-3 font-mono text-[0.54rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                      {h.where}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Then and now. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Then and now"
                title="Kolkata vs old Calcutta"
                lede="Drag the handle. The left is graded like an archival plate, the right is the place today, and underneath is the thing that has not changed."
                href="/then-and-now"
                hrefLabel="All seven"
              />
            </Reveal>
            {thenNowHome ? (
              <Reveal delay={100} className="mt-12">
                <ThenNowSlider item={thenNowHome} />
              </Reveal>
            ) : null}
          </div>
        </section>

        {/* By mood. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <div className="relative pb-10">
                <SectionHeading
                  eyebrow="Kolkata by mood"
                  title="How do you want the day to feel?"
                  lede="Not what do you want to see. Ten moods, each with a sequence you could actually follow."
                  href="/mood"
                />
                <TaxiPass />
              </div>
            </Reveal>
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {moods.map((m, i) => (
                <Reveal as="li" key={m.id} delay={(i % 5) * 60} className="h-full">
                  <Link
                    href="/mood"
                    className="flex h-full flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:border-terracotta/60"
                  >
                    <span className="text-2xl" aria-hidden>
                      {m.icon}
                    </span>
                    <span className="mt-3 font-display text-[0.96rem] leading-tight font-semibold">
                      {m.label}
                    </span>
                    <span className="mt-1 font-mono text-[0.5rem] tracking-[0.12em] text-muted-foreground/70 uppercase">
                      {m.when}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Everything else that has its own page. */}
        <section className="border-b border-border bg-secondary/40">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="More rooms"
                title="Eight more ways in"
              />
            </Reveal>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { href: "/architecture", eyebrow: "Seven styles", title: "Architecture", body: "Indo-Saracenic domes, Deco corners, and a game asking whether you can tell them apart." },
                { href: "/football", eyebrow: "Three clubs", title: "Football", body: "One field, one derby, and a fish market that prices the result in advance." },
                { href: "/cinema", eyebrow: "Ten films", title: "Cinema", body: "Ray, Ghatak and Mrinal Sen, and a map of where it was shot." },
                { href: "/literature", eyebrow: "শব্দের শহর", title: "The City of Words", body: "Eleven works, the places attached to them, and the excerpts we can print." },
                { href: "/tram", eyebrow: "Seven stops", title: "The Tram", body: "Esplanade to Shyambazar, on a network that has effectively stopped." },
                { href: "/river", eyebrow: "হুগলি নদী", title: "The Hooghly", body: "Why the city is here, and what is in the water now." },
                { href: "/gallery", eyebrow: "Twenty-seven plates", title: "Faces of Kolkata", body: "Ten categories, and the story behind every frame." },
                { href: "/build-my-day", eyebrow: "3 hours to 3 days", title: "Build My Day", body: "Say how long you have and what you are here for." },
              ].map((card, i) => (
                <Reveal as="li" key={card.href} delay={(i % 4) * 70} className="h-full">
                  <Link
                    href={card.href}
                    className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-terracotta/60"
                  >
                    <span className="font-mono text-[0.56rem] tracking-[0.2em] text-terracotta uppercase">
                      {card.eyebrow}
                    </span>
                    <span className="mt-3 font-display text-lg font-semibold">
                      {card.title}
                    </span>
                    <span className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-muted-foreground">
                      {card.body}
                    </span>
                    <span className="mt-4 font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
                      Open →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* The quiz. */}
        <section className="border-b border-border">
          <div className={`${shell} grid gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-16`}>
            <Reveal>
              <SectionHeading
                eyebrow="A quiz"
                title="How Kolkata are you?"
                lede="Six questions about evenings, hundred-rupee notes, fish, football and where you would rather be. There is a Bengali answer, and it is usually both."
                href="/how-kolkata-are-you"
                hrefLabel="Take it"
              />
            </Reveal>
            <Reveal delay={100}>
              <PersonalityQuiz />
            </Reveal>
          </div>
        </section>

        {/* Events. */}
        <section className="border-b border-border">
          <div className={`${shell} py-20 sm:py-28`}>
            <Reveal>
              <SectionHeading
                eyebrow="Events"
                title="Time your visit"
                lede="Almost everything worth seeing happens between late September and February. The rest of the year is hot, wet, or both."
                href="/events"
              />
            </Reveal>
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {cityEvents.slice(0, 3).map((event, i) => (
                <Reveal as="li" key={event.slug} delay={i * 100} className="h-full">
                  <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 sm:p-6">
                    <p className="font-mono text-[0.6rem] tracking-[0.22em] text-primary uppercase">
                      {event.when}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold">
                      {event.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-muted-foreground">
                      {event.summary}
                    </p>
                    <p className="mt-5 border-t border-border pt-4 text-[0.82rem] leading-relaxed text-muted-foreground">
                      <span className="font-mono text-[0.56rem] tracking-[0.16em] text-terracotta uppercase">
                        Tip
                      </span>
                      <br />
                      {event.tip}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Close. */}
        <section className="relative overflow-hidden">
          <CityScene name="river" instance="outro" className="absolute inset-0 h-full w-full" />
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
              <p className="mt-6 text-[1rem] leading-relaxed text-cream/70">
                Two thousand traders work under Howrah Bridge by torchlight from
                four in the morning, sorting marigold by the sack. It is the best
                hour in the city and almost nobody sets an alarm for it.
              </p>
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
