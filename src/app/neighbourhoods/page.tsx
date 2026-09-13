import type { Metadata } from "next";
import { IllustratedMap } from "@/components/illustrated-map";
import { NeighbourhoodCard } from "@/components/neighbourhood-card";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { neighbourhoods, zonesWithQuarters } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Neighbourhoods",
  description:
    "An illustrated map of Kolkata in five zones and twenty-seven quarters, from Kumartuli to Tollygunge, each with its history, buildings, food and people.",
};

export default function NeighbourhoodsPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Neighbourhoods"
        title="The city is a set of paras"
        lede="A para is your few streets: your sweet shop, your tea stall, your Puja, the people who notice if you are away for a week. Ask a Kolkatan where they are from and this is the unit they answer in."
        scene="kumartuli"
        photo="chitpur-road"
        meta={[
          { label: "Quarters", value: String(neighbourhoods.length) },
          { label: "Zones", value: String(zonesWithQuarters.length) },
          { label: "Oldest street", value: "Chitpur Road, pre-1690" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <SectionHeading
            eyebrow="The map"
            title="Twenty-seven quarters, five zones"
            lede="Every dot sits at its real coordinates on a drawn plate. Filter by zone to see the names, or hover a dot to read the quarter."
          />
        </Reveal>
        <Reveal delay={100} className="mt-12">
          <IllustratedMap />
        </Reveal>
      </section>

      {zonesWithQuarters.map((zone) => (
        <section key={zone.id} className="border-t border-border">
          <div className={`${pageShell} py-14 sm:py-20`}>
            <Reveal>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span
                  className="size-2 rounded-full"
                  style={{ background: zone.tone }}
                />
                <h2 className="font-display text-[clamp(1.5rem,3.6vw,2.4rem)] font-semibold">
                  {zone.label}
                </h2>
                <p className="text-sm text-muted-foreground" lang="bn">
                  {zone.bengali}
                </p>
                <p className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground/60 uppercase">
                  {zone.quarters.length} quarters
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground">
                {zone.blurb}
              </p>
            </Reveal>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {zone.quarters.map((area, i) => (
                <Reveal as="li" key={area.slug} delay={(i % 4) * 80} className="h-full">
                  <NeighbourhoodCard area={area} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </main>
  );
}
