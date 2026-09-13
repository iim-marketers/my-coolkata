import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { TramJourney } from "@/components/tram-journey";
import { tramFacts, tramStops } from "@/lib/kolkata/tram";

export const metadata: Metadata = {
  title: "The Tram",
  description:
    "A virtual journey from Esplanade to Shyambazar, stopping at College Street, Girish Park, Sovabazar and Kumartuli, on a network that has effectively stopped running.",
};

export default function TramPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Asia's first electric tramway, 1902"
        title="Take the tram"
        lede="Esplanade to Shyambazar, seven stops, forty-six minutes. This is a journey the network could once make and no longer can, so it is offered here instead."
        scene="tram"
        photo="hero-tram"
        meta={[
          { label: "Stops", value: String(tramStops.length) },
          { label: "Journey", value: `${tramStops[tramStops.length - 1].minutes} minutes` },
          { label: "Routes in 1970", value: "37" },
          { label: "Routes now", value: "One" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <TramJourney />
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-14 sm:py-20`}>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tramFacts.map((f, i) => (
              <Reveal key={f.t} delay={i * 80} className="h-full">
                <div className="h-full border-t border-border pt-4">
                  <p className="font-display text-3xl font-semibold text-terracotta tabular-nums">
                    {f.v}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold">{f.t}</p>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {f.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Why this matters"
              title="A tram is not a nineteenth-century object"
              lede="It is a twenty-first-century one that happened to arrive early. Melbourne, Lisbon, Prague, Amsterdam and San Francisco all worked that out."
              href="/stories/the-last-tram"
              hrefLabel="The last tram to Tollygunge"
            />
          </Reveal>
          <Reveal delay={80} className="mt-10 max-w-2xl space-y-4 text-[0.98rem] leading-[1.75] text-muted-foreground">
            <p>
              A tram at fifteen kilometres an hour on a dedicated median does
              not stop for the traffic beside it, emits nothing at the point of
              use, and carries two hundred people using less road space per
              passenger than any bus.
            </p>
            <p>
              In a city with among the lowest road-area ratios of any Indian
              metropolis, roughly six per cent against Delhi&rsquo;s
              twenty-plus, that arithmetic should have been decisive. It was
              not.
            </p>
            <p>
              Routes were suspended for road works and never restored. Tracks
              were tarred over during flyover construction. In 2024 the state
              announced it would retain a single heritage route, and the case is
              in the High Court.
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <Link
              href="/sounds"
              className="font-mono text-[0.64rem] tracking-[0.2em] text-terracotta uppercase hover:underline"
            >
              Hear the bell →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
