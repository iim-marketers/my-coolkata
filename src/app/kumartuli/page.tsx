import type { Metadata } from "next";
import Link from "next/link";
import { CraftProcess } from "@/components/craft-process";
import { PageHeader, pageShell } from "@/components/page-header";
import { PhotoGallery } from "@/components/photo-gallery";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { craftStages } from "@/lib/kolkata/kumartuli";
import { getNeighbourhood } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Kumartuli",
  description:
    "Bamboo, straw, clay, paint, the eyes, and the goddess. Three hundred years of idol makers in a few lanes of north Kolkata, told as the process it is.",
};

export default function KumartuliPage() {
  const quarter = getNeighbourhood("kumartuli");

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="A living craft neighbourhood"
        title="Kumartuli"
        lede="Not a monument. A few lanes two metres wide where several thousand goddesses are built out of river mud every autumn, and then put back in the river."
        scene="kumartuli"
        photo="hero-kumartuli"
        meta={[
          { label: "In Bengali", value: "কুমোরটুলি" },
          { label: "In use since", value: "Early eighteenth century" },
          { label: "Stages", value: `${craftStages.length}, June to October` },
          { label: "Best time", value: "August to Mahalaya" },
        ]}
      />

      {/* The process, driven by scroll. */}
      <section className={`${pageShell} pt-12 sm:pt-16`}>
        <Reveal>
          <SectionHeading
            eyebrow="How she is made"
            title="Bamboo to goddess, in six stages"
            lede="Scroll. The frame stays put and the figure builds itself beside the text."
          />
        </Reveal>
        {/* <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          {craftStages.map((s, i) => (
            <li key={s.key} className="flex items-center gap-3">
              <a
                href={`#${s.key}`}
                className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase transition-colors hover:text-terracotta"
              >
                {s.label}
              </a>
              {i < craftStages.length - 1 ? (
                <span aria-hidden className="text-muted-foreground/40">
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol> */}
      </section>

      <div className={`${pageShell}`}>
        <CraftProcess />
      </div>

      {/* The economics. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="The part nobody puts on the poster"
              title="What it costs to make a goddess"
            />
          </Reveal>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                v: "₹40k–2L",
                t: "A mid-sized idol",
                d: "Major pandal commissions go far higher, and a studio may take only a handful of them.",
              },
              {
                v: "2 months",
                t: "When the money arrives",
                d: "Almost all of the year's income lands in a two-month window. The workshops carry the other ten on credit.",
              },
              {
                v: "Rising",
                t: "The cost of clay",
                d: "Riverbank extraction is increasingly restricted, and the price goes up every year.",
              },
              {
                v: "Flat",
                t: "The number of studios",
                d: "Broadly unchanged for two decades while the number of Pujas has grown, so the surviving studios take on more than they can comfortably finish.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 80} className="h-full">
                <div className="h-full border-t border-border pt-4">
                  <p className="font-display text-2xl font-semibold text-terracotta">
                    {item.v}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold">
                    {item.t}
                  </p>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Plates and etiquette. */}
      <section className="border-t border-border">
        <div
          className={`${pageShell} grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16`}
        >
          <Reveal>
            <SectionHeading eyebrow="Plates" title="The lanes" />
            <PhotoGallery
              className="mt-8 lg:grid-cols-2"
              plates={[
                {
                  scene: "kumartuli",
                  title: "The workshop lane",
                  caption:
                    "Two metres wide, hung with bare bulbs, full of half-finished figures.",
                },
                {
                  scene: "pujo",
                  title: "The pandal",
                  caption: "Where she stands for five days.",
                },
                {
                  scene: "river",
                  title: "Kumartuli Ghat",
                  caption: "Where the clay arrives, and where it goes back.",
                },
                {
                  scene: "rooftops",
                  title: "The quarter",
                  caption: "North Kolkata, between Sovabazar and the river.",
                },
              ]}
            />
          </Reveal>

          <Reveal delay={100} className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-lg border border-terracotta/30 bg-terracotta/5 p-6">
              <p className="font-mono text-[0.6rem] tracking-[0.24em] text-terracotta uppercase">
                If you go
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  [
                    "It is a workplace",
                    "Not a heritage site, not a gallery, and there is no ticket. People are working to a deadline.",
                  ],
                  [
                    "Ask before photographing",
                    "Especially an artisan's face and hands. Most will say yes.",
                  ],
                  [
                    "Do not touch a finished face",
                    "Particularly after the eyes are painted.",
                  ],
                  [
                    "Go early",
                    "Seven to ten in the morning. The light is better and the lanes are passable.",
                  ],
                  [
                    "Mahalaya is the day",
                    "The eyes are painted at dawn. Arrive before it is light.",
                  ],
                ].map(([t, d]) => (
                  <li key={t} className="border-t border-terracotta/20 pt-3">
                    <p className="text-[0.92rem] font-medium">{t}</p>
                    <p className="mt-1 text-[0.84rem] leading-relaxed text-muted-foreground">
                      {d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {quarter ? (
              <div className="mt-6 rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-[0.58rem] tracking-[0.24em] text-muted-foreground uppercase">
                  The walk
                </p>
                <ol className="relative mt-5 border-l border-border">
                  {quarter.walk.map((stop) => (
                    <li
                      key={stop.stop}
                      className="relative pb-5 pl-6 last:pb-0"
                    >
                      <span className="absolute top-1.5 left-[-4.5px] size-2 rounded-full bg-terracotta ring-4 ring-card" />
                      <p className="text-[0.9rem] font-medium">{stop.stop}</p>
                      <p className="mt-0.5 text-[0.8rem] leading-snug text-muted-foreground">
                        {stop.note}
                      </p>
                    </li>
                  ))}
                </ol>
                <Link
                  href="/neighbourhoods/kumartuli"
                  className="mt-5 inline-block font-mono text-[0.6rem] tracking-[0.18em] text-terracotta uppercase hover:underline"
                >
                  The quarter in full →
                </Link>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal className="max-w-2xl">
            <p className="font-display text-[clamp(1.3rem,3.4vw,2rem)] leading-snug italic">
              &ldquo;We do not make her. We finish her, and she leaves.&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap gap-5">
              <Link
                href="/stories/nine-days-in-kumartuli"
                className="font-mono text-[0.64rem] tracking-[0.2em] text-terracotta uppercase hover:underline"
              >
                Nine days in Kumartuli →
              </Link>
              <Link
                href="/durga-puja"
                className="font-mono text-[0.64rem] tracking-[0.2em] text-terracotta uppercase hover:underline"
              >
                Where she goes next →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
