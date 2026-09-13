import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { monthNames, todayEntries, todayKinds } from "@/lib/kolkata/today";

export const metadata: Metadata = {
  title: "Kolkata Today",
  description:
    "What is on and when: festivals, exhibitions, theatre, music, sport, seasons and notices, month by month, with where to check the real dates.",
};

export default function TodayPage() {
  const byMonth = monthNames.map((m, i) => ({
    month: m,
    index: i,
    entries: todayEntries.filter((e) => e.months.includes(i)),
  }));

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Kolkata Today"
        title="What is on, and when"
        lede="A living city has a calendar. This is the recurring one: what happens in which month, and where to confirm the actual dates before you book anything."
        scene="pujo"
        photo="new-town"
        meta={[
          { label: "Entries", value: String(todayEntries.length) },
          { label: "Kinds", value: String(todayKinds.length) },
          { label: "Best window", value: "October to February" },
        ]}
      />

      {/* The honesty notice, because this is not a live feed. */}
      <section className="border-b border-border bg-secondary/40">
        <div className={`${pageShell} py-8`}>
          <Reveal>
            <div className="flex flex-wrap items-start gap-4 rounded-lg border border-terracotta/30 bg-terracotta/5 p-5">
              <span className="font-mono text-[0.54rem] tracking-[0.2em] text-terracotta uppercase">
                Read this first
              </span>
              <p className="max-w-3xl flex-1 text-[0.9rem] leading-relaxed">
                This is a recurring calendar, not a live feed. The site is
                static and makes no third-party requests, so nothing here is
                fetched from anywhere. Every entry says where to confirm the
                real dates, and most of the festivals move each year with the
                lunisolar or Islamic calendar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The year, as a strip. */}
      <section className={`${pageShell} py-14 sm:py-20`}>
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
            The year at a glance
          </p>
          <ol className="mt-6 grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {byMonth.map((m) => (
              <li key={m.month}>
                <a href={`#m-${m.index}`} className="block">
                  <div
                    className={
                      m.entries.length
                        ? "h-16 rounded-sm bg-terracotta/80 transition-opacity hover:opacity-100"
                        : "h-16 rounded-sm bg-border/60"
                    }
                    style={
                      m.entries.length
                        ? { opacity: 0.3 + Math.min(6, m.entries.length) * 0.11 }
                        : undefined
                    }
                  />
                  <p className="mt-2 font-mono text-[0.54rem] tracking-[0.08em] text-muted-foreground uppercase">
                    {m.month.slice(0, 3)}
                  </p>
                  <p className="font-mono text-[0.54rem] text-muted-foreground/50">
                    {m.entries.length || "—"}
                  </p>
                </a>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      {/* Month by month. */}
      {byMonth.map((m) =>
        m.entries.length === 0 ? null : (
          <section
            key={m.month}
            id={`m-${m.index}`}
            className="scroll-mt-20 border-t border-border"
          >
            <div className={`${pageShell} py-12 sm:py-16`}>
              <Reveal>
                <div className="flex flex-wrap items-baseline gap-4">
                  <h2 className="font-display text-[clamp(1.5rem,3.6vw,2.2rem)] font-semibold">
                    {m.month}
                  </h2>
                  <p className="font-mono text-[0.58rem] tracking-[0.18em] text-muted-foreground/60 uppercase">
                    {m.entries.length} things on
                  </p>
                </div>
              </Reveal>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {m.entries.map((e, i) => {
                  const kind = todayKinds.find((k) => k.id === e.kind);
                  return (
                    <Reveal as="li" key={e.id} delay={(i % 3) * 70} className="h-full">
                      <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5">
                        <p className="flex items-center gap-2 font-mono text-[0.52rem] tracking-[0.16em] uppercase">
                          <span
                            className="size-1.5 rounded-full"
                            style={{ background: kind?.dot }}
                          />
                          <span className="text-muted-foreground/70">{kind?.label}</span>
                        </p>
                        <h3 className="mt-3 font-display text-[1.05rem] leading-snug font-semibold">
                          {e.title}
                        </h3>
                        <p className="mt-1 font-mono text-[0.56rem] tracking-[0.14em] text-terracotta uppercase">
                          {e.when}
                        </p>
                        <p className="mt-3 flex-1 text-[0.86rem] leading-relaxed text-muted-foreground">
                          {e.body}
                        </p>
                        <p className="mt-4 border-t border-border pt-3 text-[0.78rem] leading-snug text-muted-foreground/80">
                          <span className="font-mono text-[0.5rem] tracking-[0.14em] uppercase">
                            Confirm with
                          </span>
                          <br />
                          {e.checkWith}
                        </p>
                        {e.href ? (
                          <Link
                            href={e.href}
                            className="mt-3 font-mono text-[0.56rem] tracking-[0.14em] text-terracotta uppercase hover:underline"
                          >
                            More →
                          </Link>
                        ) : null}
                      </article>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          </section>
        ),
      )}

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Evergreen"
              title="The rest of the site does not move"
              lede="Everything outside this page is written to stay true: the buildings, the history, the food and the quarters. Only this calendar changes with the year."
              href="/plan"
              hrefLabel="Plan a trip"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
