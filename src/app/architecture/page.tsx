import type { Metadata } from "next";
import Link from "next/link";
import { ArchGuess } from "@/components/arch-guess";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { archStyles } from "@/lib/kolkata/architecture";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Kolkata Architecture",
  description:
    "Seven styles, from curved Bengali cornices to Indo-Saracenic domes and Deco corners, and a game that asks whether you can tell them apart.",
  path: "/architecture",
  photo: "writers-building",
});

export default function ArchitecturePage() {
  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Architecture"
        title="Seven ways this city was built"
        lede="There is almost no building stone in the delta, so everything here is brick, stucco, terracotta or imported marble. What changes is what the brick is pretending to be."
        scene="victoria"
        photo="writers-building"
        meta={[
          { label: "Styles", value: String(archStyles.length) },
          { label: "Span", value: "Pre-1700 to now" },
          { label: "Common material", value: "Brick, under everything" },
        ]}
      />

      {/* The game, up front, because it teaches the categories. */}
      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <ArchGuess />
        </Reveal>
      </section>

      {/* The styles. */}
      {archStyles.map((style, i) => (
        <section
          key={style.id}
          id={style.id}
          className={`scroll-mt-20 border-t border-border ${i % 2 ? "bg-secondary/40" : ""}`}
        >
          <div className={`${pageShell} py-14 sm:py-20`}>
            <Reveal>
              <div className="sticky-split grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
                <div>
                  <div className="flex items-baseline gap-4">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: style.tone }}
                    />
                    <p className="font-mono text-[0.58rem] tracking-[0.24em] text-muted-foreground uppercase">
                      {style.years}
                    </p>
                  </div>
                  <h2 className="mt-3 font-display text-[clamp(1.7rem,4.4vw,2.8rem)] leading-tight font-semibold">
                    {style.label}
                  </h2>
                  <p className="mt-4 max-w-2xl font-display text-[1.12rem] leading-snug text-foreground/85 italic">
                    {style.line}
                  </p>
                  <p className="mt-5 max-w-2xl text-[0.98rem] leading-[1.75] text-muted-foreground">
                    {style.body}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="rounded-lg border border-border bg-card p-5">
                    <p className="font-mono text-[0.54rem] tracking-[0.2em] text-terracotta uppercase">
                      What gives it away
                    </p>
                    <ul className="mt-3 space-y-2">
                      {style.tells.map((t) => (
                        <li
                          key={t}
                          className="flex gap-3 border-t border-border pt-2.5 text-[0.86rem]"
                        >
                          <span aria-hidden className="text-muted-foreground/40">
                            —
                          </span>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[0.54rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
                      Look at
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {style.examples.map((e) => (
                        <li key={e.name}>
                          {e.href ? (
                            <Link
                              href={e.href}
                              className="text-[0.88rem] transition-colors hover:text-terracotta"
                            >
                              {e.name} →
                            </Link>
                          ) : (
                            <span className="text-[0.88rem] text-muted-foreground">
                              {e.name}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Keep going"
              title="Twenty-two buildings, with the dates"
              href="/heritage"
              hrefLabel="Heritage"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
