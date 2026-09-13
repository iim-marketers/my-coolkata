import type { Metadata } from "next";
import { InteractiveMap } from "@/components/interactive-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { RoutePlanner } from "@/components/route-planner";
import { SectionHeading } from "@/components/section-heading";
import { CITY_BOUNDS, mapPoints } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Map",
  description:
    "Every heritage site, neighbourhood, ghat and station on this site, plotted at its real coordinates, plus a route planner.",
};

export default function MapPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Map"
        title="Everything, plotted"
        lede="Real WGS84 coordinates projected onto a drawing. The Hooghly, the East Kolkata Wetlands, the Maidan and the Metro spine are where they actually are; the buildings are not to scale and were never going to be."
        scene="river"
        meta={[
          { label: "Points", value: String(mapPoints.length) },
          {
            label: "Bounds",
            value: `${CITY_BOUNDS.south}–${CITY_BOUNDS.north}° N`,
          },
          { label: "Projection", value: "Equirectangular" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <InteractiveMap />
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Route planner"
              title="Work out a day"
              lede="Pick stops and the order is solved by proximity from your first choice. It is a nearest-neighbour walk rather than an optimal one, which is also how people actually plan."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <RoutePlanner />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading eyebrow="How to read it" title="What the drawing shows" />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "The Hooghly",
                d: "A western distributary of the Ganga. The city sits on the east bank because the water there was deep enough for ships and the marshes made it defensible.",
              },
              {
                t: "The wetlands",
                d: "Hatched, to the east. A Ramsar site where sunlight and algae treat a large share of the city's sewage for nothing, and produce ten thousand tonnes of fish a year.",
              },
              {
                t: "The Maidan",
                d: "Cleared in 1758 to give the guns of Fort William a field of fire, never built on, and now a thousand acres of grass in the middle of the city.",
              },
              {
                t: "The dashed line",
                d: "Metro Line 1, north to south, opened in 1984 as the first underground railway in India.",
              },
            ].map((item, i) => (
              <Reveal as="li" key={item.t} delay={i * 80} className="h-full">
                <div className="border-t border-border pt-4">
                  <p className="font-display text-lg font-semibold">{item.t}</p>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
