import type { Metadata } from "next";
import Link from "next/link";
import { PinMap, type MapPin } from "@/components/map/pin-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import { SectionHeading } from "@/components/section-heading";
import { riverChapters } from "@/lib/kolkata/river";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "The River That Watches Kolkata",
  description:
    "The Hooghly: why the city is here, Howrah Bridge, Prinsep Ghat, the ghats, immersion, trade, silt and what is in the water now.",
  path: "/river",
  photo: "hooghly-sunset",
});

export default function RiverPage() {
  const pins = riverChapters.filter((c) => c.coords);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="হুগলি নদী"
        title="The Hooghly"
        lede="The river that watches Kolkata, and has been trying to leave it for two hundred years."
        scene="river"
      />

      {riverChapters.map((chapter, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={chapter.slug}
            id={chapter.slug}
            className={`scroll-mt-20 border-t border-border ${i % 2 ? "bg-secondary/40" : ""}`}
          >
            <div className={`${pageShell} py-16 sm:py-24`}>
              <div
                className={`sticky-split grid gap-10 lg:grid-cols-2 lg:gap-16 ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal>
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border">
                    <CityScene
                      name={chapter.scene}
                      photo={chapter.photo}
                      sizes="(min-width: 1024px) min(50vw, 640px), 100vw"
                      className="h-full w-full"
                    />
                    <div className="scrim-bottom absolute inset-0" />
                    <p className="absolute bottom-4 left-5 font-display text-4xl font-semibold text-cream/70">
                      {chapter.numeral}
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={90}>
                  <p className="font-mono text-[0.58rem] tracking-[0.26em] text-terracotta uppercase">
                    Chapter {chapter.numeral}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(1.7rem,4.2vw,2.6rem)] leading-tight font-semibold">
                    {chapter.title}
                  </h2>
                  {chapter.bengali ? (
                    <p
                      className="mt-1 text-base text-muted-foreground"
                      lang="bn"
                    >
                      {chapter.bengali}
                    </p>
                  ) : null}
                  <p className="mt-4 max-w-xl font-display text-[1.1rem] leading-snug text-foreground/85 italic">
                    {chapter.standfirst}
                  </p>
                  <div className="mt-5 max-w-xl space-y-4 text-[0.96rem] leading-[1.75] text-muted-foreground">
                    {chapter.body.map((p, n) => (
                      <p key={n}>{p}</p>
                    ))}
                  </div>
                  {chapter.detail ? (
                    <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-5 sm:grid-cols-3">
                      {chapter.detail.map((d) => (
                        <div key={d.label}>
                          <dt className="font-mono text-[0.52rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                            {d.label}
                          </dt>
                          <dd className="mt-1 text-[0.84rem]">{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {chapter.href ? (
                    <Link
                      href={chapter.href}
                      className="mt-6 inline-block font-mono text-[0.6rem] tracking-[0.18em] text-terracotta uppercase hover:underline"
                    >
                      More →
                    </Link>
                  ) : null}
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* The river, mapped. */}
      <section className="border-t border-border bg-secondary/40">
        <div
          className={`${pageShell} grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}
        >
          <Reveal>
            <SectionHeading
              eyebrow="Along the water"
              title="Ghats, bridges and docks"
              lede="Everything on this bank arrived by water first, and the city spent two centuries keeping its back to it."
              href="/neighbourhoods/hooghly-river"
              hrefLabel="The riverside quarters"
            />
            <ul className="mt-8 space-y-3">
              {[
                [
                  "Mullick Ghat Flower Market",
                  "Two thousand traders, from four in the morning",
                  "/neighbourhoods/howrah-bridge-strand",
                ],
                [
                  "Babughat",
                  "Ferries, the bus terminus, and the main immersion point",
                  "/neighbourhoods/babughat",
                ],
                [
                  "Prinsep Ghat",
                  "1841 Palladian portico, and the city's sunset",
                  "/neighbourhoods/prinsep-ghat",
                ],
                [
                  "Millennium Park",
                  "The first serious attempt to face the river",
                  "/neighbourhoods/millennium-park",
                ],
                [
                  "Kidderpore Docks",
                  "1780s, and still working",
                  "/neighbourhoods/kidderpore",
                ],
                [
                  "Dakshineswar and Belur",
                  "Twenty minutes apart by ferry",
                  "/heritage/dakshineswar-kali-temple",
                ],
              ].map(([name, note, href]) => (
                <li key={name} className="border-t border-border pt-3">
                  <Link
                    href={href}
                    className="text-[0.92rem] font-medium hover:text-terracotta"
                  >
                    {name} →
                  </Link>
                  <p className="mt-0.5 text-[0.84rem] text-muted-foreground">
                    {note}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative isolate aspect-square overflow-hidden rounded-lg border border-border bg-background">
              <PinMap
                pins={pins.map<MapPin>((c) => ({
                  id: c.slug,
                  lat: c.coords!.lat,
                  lng: c.coords!.lng,
                  colour: "var(--indigo)",
                  title: c.title,
                  size: "lg",
                }))}
              />
            </div>
            <p className="mt-4 text-[0.84rem] leading-relaxed text-muted-foreground">
              The Hooghly runs down the western edge of the map. Everything
              this page describes is within a few hundred metres of it.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
