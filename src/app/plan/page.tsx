import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { RoutePlanner } from "@/components/route-planner";
import { SectionHeading } from "@/components/section-heading";
import { itineraries, practicalNotes } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Plan",
  description:
    "Five itineraries for Kolkata, from one very long day to a Puja week, plus the practical notes that actually matter.",
};

export default function PlanPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Plan"
        title="Itineraries that work"
        lede="Written on the assumption that you will get up early once, that the afternoon is too hot to do anything in, and that the best hour of the day is between five and seven in the morning."
        scene="collegestreet"
        meta={[
          { label: "Itineraries", value: String(itineraries.length) },
          { label: "Best months", value: "November to February" },
          { label: "Earliest start", value: "05:45, the flower market" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <SectionHeading
            eyebrow="Practical"
            title="Six things that change the trip"
          />
        </Reveal>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practicalNotes.map((note, i) => (
            <Reveal key={note.label} delay={(i % 3) * 80}>
              <div className="border-t border-border pt-4">
                <dt className="font-display text-lg font-semibold">{note.label}</dt>
                <dd className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                  {note.value}
                </dd>
              </div>
            </Reveal>
          ))}
          <Reveal delay={160}>
            <div className="border-t border-terracotta/50 pt-4">
              <dt className="font-display text-lg font-semibold text-terracotta">
                One rule
              </dt>
              <dd className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                Do not schedule anything between one and four in the afternoon.
                Every itinerary that ignores this collapses on the second day.
              </dd>
            </div>
          </Reveal>
        </dl>
      </section>

      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Itineraries"
              title="Five ways to spend the time you have"
            />
          </Reveal>

          <div className="mt-14 space-y-20">
            {itineraries.map((it) => (
              <Reveal key={it.slug} as="article" id={it.slug} className="scroll-mt-24">
                <div className="grid gap-8 lg:grid-cols-[18rem_1fr] lg:gap-14">
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <h2 className="font-display text-[clamp(1.5rem,3.6vw,2.2rem)] leading-tight font-semibold">
                      {it.title}
                    </h2>
                    <p className="mt-4 text-[0.92rem] leading-relaxed text-muted-foreground">
                      {it.summary}
                    </p>
                    <dl className="mt-6 space-y-2.5">
                      {[
                        ["Length", it.length],
                        ["Pace", it.pace],
                        ["Season", it.bestSeason],
                        ["Stops", String(it.stops.length)],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between gap-4 border-t border-border pt-2.5">
                          <dt className="font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                            {k}
                          </dt>
                          <dd className="text-right text-[0.84rem] font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <ol className="relative border-l border-border">
                    {it.stops.map((stop) => (
                      <li key={`${it.slug}-${stop.time}-${stop.place}`} className="relative pb-9 pl-8">
                        <span className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-terracotta ring-4 ring-background" />
                        <p className="font-mono text-[0.6rem] tracking-[0.16em] text-terracotta uppercase">
                          {stop.time}
                        </p>
                        <p className="mt-1.5 font-display text-lg font-medium">
                          {stop.place}
                        </p>
                        <p className="mt-2 max-w-2xl text-[0.92rem] leading-relaxed text-muted-foreground">
                          {stop.what}
                        </p>
                        {stop.travel ? (
                          <p className="mt-2 font-mono text-[0.62rem] text-muted-foreground/60">
                            → {stop.travel}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Or build your own"
              title="Route planner"
              lede="Pick your stops and the order is solved by proximity from the first one."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <RoutePlanner />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
