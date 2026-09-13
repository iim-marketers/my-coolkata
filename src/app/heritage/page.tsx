import type { Metadata } from "next";
import { HeritageCard } from "@/components/heritage-card";
import { InteractiveMap } from "@/components/interactive-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { eras, heritageSites, mapPoints } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Heritage",
  description:
    "Twelve buildings in Kolkata, from a temple older than the city to a cantilever bridge that opened without a ceremony in 1943.",
};

export default function HeritagePage() {
  const byEra = eras
    .map((era) => ({
      era,
      sites: heritageSites.filter((s) => s.era === era.id),
    }))
    .filter((g) => g.sites.length > 0);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Heritage"
        title="What was built, and who paid for it"
        lede="A trading post became a capital, and the capital built accordingly: mausoleums for queens who never visited, a mosque copied from Akbar's tomb, and a bridge held together entirely by rivets."
        scene="victoria"
        photo="victoria-memorial"
        meta={[
          { label: "Sites", value: String(heritageSites.length) },
          { label: "Oldest", value: "Kalighat, rebuilt 1809" },
          { label: "Newest", value: "Belur Math, 1938" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <SectionHeading
            eyebrow="All sites"
            title="Twelve buildings"
            lede="Ordered by the year they were finished, which is also roughly the order in which the city changed hands."
          />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[...heritageSites]
            .sort((a, b) => a.builtYear - b.builtYear)
            .map((site, i) => (
              <Reveal as="li" key={site.slug} delay={(i % 3) * 90} className="h-full">
                <HeritageCard site={site} index={i} />
              </Reveal>
            ))}
        </ul>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className={`${pageShell} grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
          <Reveal>
            <SectionHeading
              eyebrow="By period"
              title="Everything is a hand-over"
              lede="The city has changed regime five or six times depending on how you count, and each one left buildings that argue with the last set."
            />
            <dl className="mt-10 space-y-6">
              {byEra.map((g) => (
                <div key={g.era.id} className="border-t border-border pt-4">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg font-semibold">
                      {g.era.label}
                    </span>
                    <span className="font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
                      {g.era.span}
                    </span>
                  </dt>
                  <dd className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                    {g.sites.map((s) => s.name).join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120} className="self-start lg:sticky lg:top-24">
            <InteractiveMap
              points={mapPoints.filter((p) => p.kind === "heritage")}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
