import type { Metadata } from "next";
import { HeritageCard } from "@/components/heritage-card";
import { InteractiveMap } from "@/components/interactive-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { heritageSites } from "@/lib/kolkata";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Landmarks",
  description:
    "Kolkata's must-see landmarks, from Victoria Memorial to Howrah Bridge, with what to look for and where they are.",
  path: "/heritage",
  photo: "victoria-memorial",
});

export default function HeritagePage() {
  // Grouped by where they are, so a day can take in a cluster at once.
  const byArea = Object.entries(
    Object.groupBy(heritageSites, (s) => s.neighbourhood),
  )
    .map(([area, sites = []]) => ({ area, sites }))
    .sort((a, b) => b.sites.length - a.sites.length || a.area.localeCompare(b.area));

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Landmarks"
        title="The big sights, worth the trip"
        lede="Marble, temples, a bridge held together entirely by rivets, and a few places most visitors never find. Tick them off in clusters."
        scene="victoria"
        photo="victoria-memorial"
        meta={[
          { label: "Landmarks", value: String(heritageSites.length) },
          { label: "Areas", value: String(byArea.length) },
          { label: "Best time", value: "November to February" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <SectionHeading
            eyebrow="All landmarks"
            title={`${heritageSites.length} places to see`}
            lede="Tap one for what to look for, and the three nearest it."
          />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {heritageSites.map((site, i) => (
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
              eyebrow="By area"
              title="See them in clusters"
              lede="Landmarks that sit close together, so you can walk between them instead of sitting in traffic."
            />
            <dl className="mt-10 space-y-6">
              {byArea.map((g) => (
                <div key={g.area} className="border-t border-border pt-4">
                  <dt className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-lg font-bold tracking-tight">
                      {g.area}
                    </span>
                    <span className="text-[0.78rem] text-muted-foreground">
                      {g.sites.length} {g.sites.length === 1 ? "landmark" : "landmarks"}
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
            <InteractiveMap />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
