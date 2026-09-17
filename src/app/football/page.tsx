import type { Metadata } from "next";
import { TaxiPass } from "@/components/ambient";
import { DerbyBoard } from "@/components/derby-board";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { clubs, fanCulture, footballFacts } from "@/lib/kolkata/football";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Football Kolkata",
  description:
    "Mohun Bagan, East Bengal and Mohammedan Sporting; the Maidan, the derby, and a rivalry that carries Partition inside it.",
  path: "/football",
  photo: "salt-lake-stadium",
});

export default function FootballPage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Football"
        title="The city that argues about football"
        lede="Three clubs with their grounds a few hundred metres apart on the same field, and a derby that the fish market prices in advance."
        scene="victoria"
        photo="salt-lake-stadium"
        meta={[
          { label: "Clubs", value: "Three, all on the Maidan" },
          { label: "Oldest", value: "Mohun Bagan, 1889" },
          { label: "Largest crowd", value: "≈131,000, Salt Lake, 1997" },
        ]}
      />

      {/* The three clubs. */}
      <section className={`${pageShell} py-16 sm:py-24`}>
        <ul className="grid gap-5 lg:grid-cols-3">
          {clubs.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 90} className="h-full">
              <article
                id={c.id}
                className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-lg border border-border"
              >
                <div
                  className="p-6"
                  style={{ background: c.tone }}
                >
                  <p
                    className="font-mono text-[0.54rem] tracking-[0.22em] uppercase"
                    style={{ color: c.ink }}
                  >
                    Est. {c.founded} · {c.colours}
                  </p>
                  <h2 className="mt-3 font-display text-2xl leading-tight font-semibold text-white">
                    {c.name}
                  </h2>
                  {c.bengali ? (
                    <p className="mt-0.5 text-sm text-white/65" lang="bn">
                      {c.bengali}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[0.82rem] text-white/70">{c.nickname}</p>
                </div>
                <div className="flex flex-1 flex-col bg-card p-6">
                  <p className="font-display text-[1.05rem] leading-snug italic">
                    {c.line}
                  </p>
                  <div className="mt-4 flex-1 space-y-3 text-[0.9rem] leading-relaxed text-muted-foreground">
                    {c.body.map((p, n) => (
                      <p key={n}>{p}</p>
                    ))}
                  </div>
                  <ul className="mt-5 space-y-2 border-t border-border pt-4">
                    {c.honours.map((h) => (
                      <li key={h.what}>
                        <p className="text-[0.86rem] font-medium">{h.what}</p>
                        <p className="text-[0.8rem] leading-snug text-muted-foreground">
                          {h.note}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The derby. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <div className="relative pb-10">
              <SectionHeading
                eyebrow="The Kolkata Derby"
                title="Mohun Bagan — East Bengal"
                lede="First played in 1921 and still the longest-running club rivalry in Asia. Drag through the moments people actually argue about."
              />
              <TaxiPass />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <DerbyBoard />
          </Reveal>
        </div>
      </section>

      {/* Facts. */}
      <section className="border-t border-border">
        <div className={`${pageShell} py-14 sm:py-20`}>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {footballFacts.map((f, i) => (
              <Reveal key={f.t} delay={i * 80} className="h-full">
                <div className="h-full border-t border-border pt-4">
                  <p className="font-display text-2xl font-semibold text-terracotta">
                    {f.v}
                  </p>
                  <p className="mt-2 font-display text-lg font-semibold">{f.t}</p>
                  <p className="mt-2 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {f.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* The Maidan and fan culture. */}
      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} sticky-split grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}>
          <Reveal>
            <SectionHeading
              eyebrow="The Maidan"
              title="A thousand acres, three club tents"
              lede="Cleared in 1758 to give the guns of Fort William a field of fire, never built on, and now holding every football club that matters in eastern India."
              href="/neighbourhoods/esplanade"
              hrefLabel="The Maidan"
            />
            <p className="mt-6 max-w-xl text-[0.96rem] leading-relaxed text-muted-foreground">
              On 29 July 1911 Mohun Bagan beat East Yorkshire Regiment 2–1 in
              the IFA Shield final on this ground, playing barefoot against
              booted opposition. The political reading of that result was
              immediate, enormous, and is still being discussed.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h3 className="font-display text-2xl font-semibold">Fan culture</h3>
            <ul className="mt-8 space-y-5">
              {fanCulture.map((f) => (
                <li key={f.t} className="border-t border-border pt-4">
                  <p className="font-display text-[1.05rem] font-semibold">{f.t}</p>
                  <p className="mt-1.5 text-[0.88rem] leading-relaxed text-muted-foreground">
                    {f.d}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
