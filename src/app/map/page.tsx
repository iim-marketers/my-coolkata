import type { Metadata } from "next";
import { InteractiveMap } from "@/components/interactive-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { RoutePlanner } from "@/components/route-planner";
import { SectionHeading } from "@/components/section-heading";
import { CITY_BOUNDS, mapPoints } from "@/lib/kolkata";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Map",
  description:
    "Every heritage site, neighbourhood, ghat and station on this site, plotted at its real coordinates, plus a route planner.",
  path: "/map",
  photo: "kolkata-skyline",
});

export default function MapPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Map"
        title="Everything, plotted"
        lede="Every heritage site, neighbourhood, ghat and station on this site, pinned at its real WGS84 coordinates on an OpenStreetMap base. Zoom in and the street is right there."
        scene="river"
        photo="kolkata-skyline"
        meta={[
          { label: "Points", value: String(mapPoints.length) },
          {
            label: "Bounds",
            value: `${CITY_BOUNDS.south}–${CITY_BOUNDS.north}° N`,
          },
          { label: "Base", value: "OpenStreetMap" },
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
            <SectionHeading eyebrow="How to read it" title="What to look for" />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "The Hooghly",
                d: "The river along the western edge, a distributary of the Ganga. The city sits on the east bank because the water there was deep enough for ships and the marshes made it defensible.",
              },
              {
                t: "The wetlands",
                d: "The patchwork of water to the east. A Ramsar site where sunlight and algae treat a large share of the city's sewage for nothing, and produce ten thousand tonnes of fish a year.",
              },
              {
                t: "The Maidan",
                d: "Cleared in 1758 to give the guns of Fort William a field of fire, never built on, and now a thousand acres of grass in the middle of the city.",
              },
              {
                t: "The pins",
                d: "Terracotta for heritage, marigold for neighbourhoods, verdigris for the river and indigo for stations. Hover or tap one for a note and a link.",
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
