import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, pageShell } from "@/components/page-header";
import { PhotoGallery } from "@/components/photo-gallery";
import { PujoCountdown } from "@/components/pujo-countdown";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import { SectionHeading } from "@/components/section-heading";
import { pujoChapters, pujoDays } from "@/lib/kolkata/pujo";

export const metadata: Metadata = {
  title: "Kolkata During Puja",
  description:
    "Durga Puja as an experience rather than a listing: the making, the pandal, the food, the dhaak, the crowd, the rituals and the immersion.",
};

export default function DurgaPujaPage() {
  return (
    <main className="relative z-10 bg-background">
      {/* Countdown hero. */}
      <PageHeader
        eyebrow="Kolkata during Puja"
        title="For five days, the city stops being a city."
        lede="UNESCO inscribed Durga Puja on the Representative List of the Intangible Cultural Heritage of Humanity in December 2021, the first festival in India to be listed."
        scene="pujo"
      >
        <PujoCountdown tone="light" />
      </PageHeader>

      {/* The seven chapters. */}
      {pujoChapters.map((chapter, i) => {
        const flip = i % 2 === 1;
        return (
          <section
            key={chapter.slug}
            id={chapter.slug}
            className="scroll-mt-20 border-t border-border"
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
                  <p className="font-mono text-[0.6rem] tracking-[0.28em] text-terracotta uppercase">
                    Chapter {chapter.numeral}
                  </p>
                  <h2 className="mt-3 font-display text-[clamp(1.8rem,4.4vw,2.8rem)] leading-tight font-semibold">
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
                  <p className="mt-4 max-w-xl font-display text-[1.12rem] leading-snug text-foreground/85 italic">
                    {chapter.standfirst}
                  </p>
                  <div className="mt-5 max-w-xl space-y-4 text-[0.96rem] leading-[1.75] text-muted-foreground">
                    {chapter.body.map((para, n) => (
                      <p key={n}>{para}</p>
                    ))}
                  </div>
                  {chapter.detail ? (
                    <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-border pt-5">
                      {chapter.detail.map((d) => (
                        <div key={d.label}>
                          <dt className="font-mono text-[0.54rem] tracking-[0.16em] text-muted-foreground/70 uppercase">
                            {d.label}
                          </dt>
                          <dd className="mt-1 text-[0.86rem]">{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* The five days, as a schedule. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="The days"
              title="Mahalaya to Dashami"
              lede="The festival moves each year with the lunisolar calendar. What does not move is the shape of it."
            />
          </Reveal>
          <ol className="relative mt-12 border-l border-border">
            {pujoDays.map((d, i) => (
              <Reveal
                as="li"
                key={d.day}
                delay={i * 60}
                className="relative pb-9 pl-8"
              >
                <span className="absolute top-2 left-[-4.5px] size-2 rounded-full bg-terracotta ring-4 ring-background" />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-semibold">
                    {d.day}
                  </h3>
                  <p className="text-sm text-muted-foreground" lang="bn">
                    {d.bengali}
                  </p>
                  <p className="font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground/60 uppercase">
                    {d.offset === 0
                      ? "Day one"
                      : d.offset < 0
                        ? `${Math.abs(d.offset)} days before`
                        : `Day ${d.offset + 1}`}
                  </p>
                </div>
                <p className="mt-2 max-w-2xl text-[0.94rem] leading-relaxed text-muted-foreground">
                  {d.what}
                </p>
                <p className="mt-1.5 font-mono text-[0.58rem] tracking-[0.14em] text-terracotta uppercase">
                  {d.where}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Plates. */}
      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading eyebrow="Plates" title="Five nights" />
            <PhotoGallery
              className="mt-8 lg:grid-cols-4"
              plates={[
                {
                  scene: "kumartuli",
                  title: "The workshop",
                  caption: "Straw, river clay, and the eyes painted last.",
                },
                {
                  scene: "pujo",
                  title: "The pandal",
                  caption: "A commissioned installation, up for ten days.",
                },
                {
                  scene: "pandalqueue",
                  title: "The queue",
                  caption:
                    "The queue of people waiting for witness the pandal.",
                },
                {
                  scene: "immersion",
                  title: "The immersion",
                  caption: "Dashami. The clay goes back into the river.",
                },
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* Practical. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="If you are coming"
              title="Six things nobody tells you"
            />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Go on Panchami",
                d: "Most pandals are open unofficially and the crowds have not arrived. Ashtami is impassable.",
              },
              {
                t: "Do not book a car",
                d: "Roads close. The metro runs extended hours and walking is faster than anything with wheels.",
              },
              {
                t: "Eat the bhog",
                d: "Khichuri and labra on a leaf plate, free, at most community Pujas. Better than the paid food.",
              },
              {
                t: "See a bonedi bari",
                d: "A household Puja in an old family courtyard is a completely different thing from a street pandal.",
              },
              {
                t: "Get up for Mahalaya",
                d: "Four in the morning, a week before. The radio broadcast, then the eyes being painted in Kumartuli.",
              },
              {
                t: "Stay for the carnival",
                d: "Two days after Dashami, the prize-winning pujas parade down Red Road. Ticketed, and orderly.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={(i % 3) * 80}>
                <div className="border-t border-border pt-4">
                  <p className="font-display text-lg font-semibold">{item.t}</p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-12">
            <Link
              href="/neighbourhoods/kumartuli"
              className="group inline-flex items-center gap-3 border-b border-terracotta/40 pb-1.5 font-mono text-[0.68rem] tracking-[0.22em] text-terracotta uppercase transition-colors hover:border-terracotta"
            >
              Start in Kumartuli →
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
