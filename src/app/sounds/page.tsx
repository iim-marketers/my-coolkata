import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SoundBoard } from "@/components/sound-board";
import { citySounds } from "@/lib/kolkata/sounds";

export const metadata: Metadata = {
  title: "Kolkata Sounds",
  description:
    "Eleven sounds of the city, synthesised in your browser: the tram bell, a taxi horn, the dhaak, rain on tin, the Coffee House and the stadium.",
};

export default function SoundsPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Kolkata Sounds"
        title="Close your eyes. Listen to Kolkata."
        lede="Eleven sounds, each one lighting its own point on the map. Play several at once and build the corner you want to be standing on."
        scene="tram"
        photo="dhaki"
        meta={[
          { label: "Sounds", value: String(citySounds.length) },
          { label: "Recordings used", value: "None" },
          { label: "Made with", value: "The Web Audio API, live" },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <SoundBoard />
        </Reveal>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="How this works"
              title="Nothing here was recorded"
            />
          </Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {[
              {
                t: "Synthesis, not samples",
                d: "Each sound is built from oscillators and filtered noise at the moment you press it. A tram bell is six inharmonic partials with a fast decay; a crowd is overlapping bursts of band-limited noise gated into syllables.",
              },
              {
                t: "Nothing is downloaded",
                d: "No audio files are fetched, no third-party service is called, and nothing you do here leaves your browser. The whole board costs a few kilobytes of code.",
              },
              {
                t: "It is an impression",
                d: "A synthesised hawker's call is not a hawker. These are sketches of sounds, in the same spirit as the drawn frames used everywhere else on this site instead of photographs.",
              },
            ].map((item, i) => (
              <Reveal key={item.t} delay={i * 90}>
                <div className="border-t border-border pt-4">
                  <p className="font-display text-lg font-semibold">{item.t}</p>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                    {item.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
