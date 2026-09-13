import type { Metadata } from "next";
import { AudioPlayer } from "@/components/audio-player";
import { PageHeader, pageShell } from "@/components/page-header";
import { PhotoGallery } from "@/components/photo-gallery";
import { Quiz } from "@/components/quiz";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cultureStrands } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Culture",
  description:
    "Adda, Rabindrasangeet, pandal art, Bengali cinema, jatra and football: six strands of what the city actually does.",
};

export default function CulturePage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Culture"
        title="Adda, song, pandal, jatra"
        lede="Kolkata's reputation is for talking, and the reputation is deserved. What follows is six strands of a culture that treats argument, music and public art as ordinary weekday activities."
        scene="pujo"
        photo="pandal-night"
        meta={[
          { label: "Strands", value: String(cultureStrands.length) },
          { label: "Songs by one man", value: "≈2,230" },
          { label: "Pandals each autumn", value: "Several thousand" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div className="space-y-20">
            {cultureStrands.map((strand) => (
              <Reveal key={strand.slug} as="article" id={strand.slug} className="scroll-mt-24">
                {strand.bengali ? (
                  <p lang="bn" className="text-base text-terracotta">
                    {strand.bengali}
                  </p>
                ) : null}
                <h2 className="mt-3 font-display text-[clamp(1.6rem,4vw,2.4rem)] font-semibold">
                  {strand.name}
                </h2>
                <p className="mt-4 max-w-2xl text-[1.06rem] leading-relaxed text-foreground/85">
                  {strand.summary}
                </p>
                <div className="mt-6 max-w-2xl space-y-4 text-[0.98rem] leading-[1.75] text-muted-foreground">
                  {strand.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="mt-7 max-w-2xl rounded-lg border border-border bg-card p-5">
                  <p className="font-mono text-[0.58rem] tracking-[0.22em] text-muted-foreground uppercase">
                    Where to find it
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {strand.seeItAt.map((place) => (
                      <li key={place} className="text-[0.9rem] text-foreground/80">
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-6 self-start lg:sticky lg:top-24">
            <Reveal>
              <AudioPlayer />
            </Reveal>
            <Reveal delay={100}>
              <Quiz />
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Plates"
              title="Nine photographs of the city"
              lede="Every frame on this site is a photograph from Wikimedia Commons. Open one to see it at full size."
            />
          </Reveal>
          <Reveal delay={100} className="mt-12">
            <PhotoGallery
              plates={[
                { scene: "howrah" },
                { scene: "tram" },
                { scene: "kumartuli" },
                { scene: "pujo" },
                { scene: "victoria" },
                { scene: "streetfood" },
                { scene: "collegestreet" },
                { scene: "river" },
                { scene: "rooftops" },
              ]}
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
