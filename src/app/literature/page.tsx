import type { Metadata } from "next";
import Link from "next/link";
import { KolkataMap } from "@/components/kolkata-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Wordmark } from "@/components/ambient";
import { project } from "@/lib/kolkata";
import { litEras, literature } from "@/lib/kolkata/literature";

export const metadata: Metadata = {
  title: "The City of Words",
  description:
    "Kolkata through its literature: Tagore, Bankim, Madhusudan, Sarat Chandra, Jibanananda and Begum Rokeya, with the places attached to each.",
};

export default function LiteraturePage() {
  const byEra = litEras
    .map((era) => ({ era, items: literature.filter((l) => l.era === era) }))
    .filter((g) => g.items.length > 0);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Literature"
        title="The City of Words"
        lede="A city that will still buy poetry at scale, which almost no other market anywhere does. Eleven works, the places attached to them, and the excerpts we are allowed to print."
        scene="collegestreet"
        photo="hero-collegestreet"
        meta={[
          { label: "Works", value: String(literature.length) },
          { label: "Eras", value: String(byEra.length) },
          { label: "Excerpts", value: "Public domain only" },
        ]}
      />

      {/* Bengali and English, side by side, which is the point of the page. */}
      <section className="paper border-b border-border">
        <div className={`${pageShell} relative py-16 sm:py-24`}>
          <Reveal className="max-w-3xl">
            <Wordmark bn="শব্দের শহর" en="THE CITY OF WORDS" />
            <p className="mt-8 max-w-2xl text-[1.02rem] leading-[1.8]">
              Bengali prose barely existed as a literary register in 1850. By
              1913 the language had a Nobel laureate. What happened in between
              was largely conducted within a mile of College Street, in
              magazines, in argument, and in print runs of a few hundred.
            </p>
            <p className="typewriter mt-6 max-w-2xl text-[0.82rem] leading-relaxed opacity-70">
              Note on excerpts: works are in the public domain in India sixty
              years after the author&rsquo;s death. Where an author is still in
              copyright, this page carries a description rather than the text.
            </p>
          </Reveal>
        </div>
      </section>

      {byEra.map((group, gi) => (
        <section
          key={group.era}
          className={`border-b border-border ${gi % 2 ? "bg-secondary/40" : ""}`}
        >
          <div className={`${pageShell} py-14 sm:py-20`}>
            <Reveal>
              <p className="font-mono text-[0.6rem] tracking-[0.26em] text-terracotta uppercase">
                {group.era}
              </p>
            </Reveal>
            <ul className="mt-8 space-y-10">
              {group.items.map((l, i) => (
                <Reveal as="li" key={l.slug} delay={(i % 3) * 70}>
                  <article className="sticky-split grid gap-8 border-t border-border pt-7 lg:grid-cols-[1.4fr_1fr]">
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h2 className="font-display text-[clamp(1.3rem,3.2vw,1.9rem)] font-semibold">
                          {l.work}
                        </h2>
                        {l.bengali ? (
                          <p className="text-lg text-muted-foreground" lang="bn">
                            {l.bengali}
                          </p>
                        ) : null}
                        <p className="font-mono text-[0.58rem] tabular-nums text-muted-foreground/70">
                          {l.year}
                        </p>
                      </div>
                      {l.authorHref ? (
                        <Link
                          href={l.authorHref}
                          className="mt-1 inline-block font-mono text-[0.58rem] tracking-[0.16em] text-terracotta uppercase hover:underline"
                        >
                          {l.author} →
                        </Link>
                      ) : (
                        <p className="mt-1 font-mono text-[0.58rem] tracking-[0.16em] text-muted-foreground uppercase">
                          {l.author}
                        </p>
                      )}

                      {l.excerpt ? (
                        <blockquote className="mt-6 border-l-2 border-terracotta pl-6">
                          {l.excerpt.bn ? (
                            <p
                              lang="bn"
                              className="text-[clamp(1.1rem,2.8vw,1.5rem)] leading-relaxed"
                            >
                              {l.excerpt.bn}
                            </p>
                          ) : null}
                          <p
                            className={`font-display text-[clamp(1.05rem,2.6vw,1.4rem)] leading-snug italic ${l.excerpt.bn ? "mt-2 text-muted-foreground" : ""}`}
                          >
                            &ldquo;{l.excerpt.en}&rdquo;
                          </p>
                        </blockquote>
                      ) : (
                        <p className="mt-6 rounded-md border border-dashed border-border p-4 text-[0.84rem] text-muted-foreground">
                          Still in copyright. Described rather than quoted.
                        </p>
                      )}

                      <p className="mt-5 max-w-2xl text-[0.94rem] leading-relaxed text-muted-foreground">
                        {l.context}
                      </p>
                    </div>

                    <aside className="lg:pt-2">
                      <div className="rounded-lg border border-border bg-card p-5">
                        <p className="font-mono text-[0.52rem] tracking-[0.18em] text-muted-foreground/70 uppercase">
                          Where
                        </p>
                        {l.place.href ? (
                          <Link
                            href={l.place.href}
                            className="mt-2 block font-display text-[1.02rem] font-semibold transition-colors hover:text-terracotta"
                          >
                            {l.place.name} →
                          </Link>
                        ) : (
                          <p className="mt-2 font-display text-[1.02rem] font-semibold">
                            {l.place.name}
                          </p>
                        )}
                        <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted-foreground">
                          {l.place.note}
                        </p>
                        <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-md border border-border">
                          <KolkataMap id={`lit-${l.slug}`} />
                          <span
                            className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta ring-2 ring-background"
                            style={{
                              left: `${project(l.place.coords).x}%`,
                              top: `${project(l.place.coords).y}%`,
                            }}
                          />
                        </div>
                      </div>
                    </aside>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section>
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Where the trade is"
              title="A mile and a half of secondhand stalls"
              href="/college-street"
              hrefLabel="College Street"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
