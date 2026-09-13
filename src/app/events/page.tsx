import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cityEvents, months } from "@/lib/kolkata";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Durga Puja, the book fair, Kali Puja, Christmas on Park Street, the derby and the rest of Kolkata's calendar.",
};

const KIND_TONE: Record<string, string> = {
  festival: "text-terracotta border-terracotta/40",
  fair: "text-marigold border-marigold/40",
  arts: "text-verdigris border-verdigris/40",
  sport: "text-alta border-alta/40",
  seasonal: "text-hooghly border-hooghly/40",
};

export default function EventsPage() {
  const byMonth = months.map((m, i) => ({
    month: m,
    events: cityEvents.filter((e) => e.monthIndex === i),
  }));

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Events"
        title="Time your visit"
        lede="Almost everything worth planning around happens between late September and February. The rest of the year is hot, wet, or both, and the city does not pretend otherwise."
        scene="pujo"
        photo="book-fair"
        meta={[
          { label: "In the calendar", value: String(cityEvents.length) },
          { label: "Best window", value: "October to February" },
          { label: "Avoid", value: "April to June" },
        ]}
      />

      {/* Year strip: where the weight of the calendar sits. */}
      <section className={`${pageShell} py-14 sm:py-20`}>
        <Reveal>
          <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
            The year at a glance
          </p>
          <ol className="mt-6 grid grid-cols-6 gap-1.5 sm:grid-cols-12">
            {byMonth.map((m) => (
              <li key={m.month}>
                <div
                  className={
                    m.events.length
                      ? "h-16 rounded-sm bg-terracotta/80"
                      : "h-16 rounded-sm bg-border/60"
                  }
                  style={
                    m.events.length
                      ? { opacity: 0.35 + Math.min(3, m.events.length) * 0.22 }
                      : undefined
                  }
                />
                <p className="mt-2 font-mono text-[0.54rem] tracking-[0.08em] text-muted-foreground uppercase">
                  {m.month.slice(0, 3)}
                </p>
                <p className="font-mono text-[0.54rem] text-muted-foreground/50">
                  {m.events.length || "—"}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className={`${pageShell} pb-16 sm:pb-24`}>
        <Reveal>
          <SectionHeading
            eyebrow="In order"
            title="The calendar"
            lede="Most of these move: Bengali festivals follow a lunisolar calendar, and Ramadan shifts eleven days earlier each year. Check the date before booking."
          />
        </Reveal>

        <ul className="mt-12 space-y-4">
          {[...cityEvents]
            .sort((a, b) => a.monthIndex - b.monthIndex)
            .map((event, i) => (
              <Reveal as="li" key={event.slug} delay={(i % 4) * 60} className="h-full">
                <article
                  id={event.slug}
                  className="scroll-mt-24 rounded-lg border border-border bg-card p-5 sm:p-7"
                >
                  <div className="grid gap-6 lg:grid-cols-[13rem_1fr]">
                    <div>
                      <span
                        className={`inline-block rounded-full border px-2.5 py-1 font-mono text-[0.54rem] tracking-[0.16em] uppercase ${KIND_TONE[event.kind]}`}
                      >
                        {event.kind}
                      </span>
                      <p className="mt-3 font-mono text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">
                        {event.when}
                      </p>
                      <p className="mt-1 font-mono text-[0.62rem] text-muted-foreground/60">
                        {event.duration}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h2 className="font-display text-xl font-semibold sm:text-2xl">
                          {event.name}
                        </h2>
                        {event.bengali ? (
                          <p className="text-sm text-muted-foreground" lang="bn">
                            {event.bengali}
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-1 font-mono text-[0.6rem] tracking-[0.16em] text-terracotta uppercase">
                        {event.where}
                      </p>
                      <p className="mt-4 max-w-3xl text-[0.95rem] leading-relaxed text-muted-foreground">
                        {event.summary}
                      </p>
                      <p className="mt-4 border-t border-border pt-4 text-[0.88rem] leading-relaxed">
                        <span className="font-mono text-[0.54rem] tracking-[0.16em] text-terracotta uppercase">
                          Tip
                        </span>{" "}
                        {event.tip}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
        </ul>
      </section>
    </main>
  );
}
