import type { Metadata } from "next";
import Link from "next/link";
import { PinMap, type MapPin } from "@/components/map/pin-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { filmPeople, films } from "@/lib/kolkata/cinema";

export const metadata: Metadata = {
  title: "Kolkata in Cinema",
  description:
    "Ray, Ghatak and Mrinal Sen, the films they made here, the people who were in them, and a map of where it was shot.",
};

export default function CinemaPage() {
  const directors = filmPeople.filter((p) => p.role === "director");
  const actors = filmPeople.filter((p) => p.role === "actor");
  const allLocations = films.flatMap((f) =>
    f.locations.map((l) => ({ ...l, film: f.title, year: f.year })),
  );

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Kolkata in cinema"
        title="Walk through Kolkata like a filmmaker"
        lede="Three directors made three completely different arguments about what a film could be, within about ten miles of each other, and most of it was shot on these streets."
        scene="collegestreet"
        photo="nandan"
        meta={[
          { label: "Films", value: String(films.length) },
          { label: "Directors", value: String(directors.length) },
          { label: "Locations mapped", value: String(allLocations.length) },
        ]}
      />

      {/* The film strip. */}
      <section className="border-b border-border bg-secondary/40 py-10">
        <div className="relative overflow-x-auto">
          {/* Sprocket holes, top and bottom. */}
          {[0, 1].map((row) => (
            <div
              key={row}
              aria-hidden
              className={`pointer-events-none absolute inset-x-0 flex gap-6 px-4 ${row ? "bottom-2" : "top-2"}`}
            >
              {Array.from({ length: 60 }, (_, i) => (
                <span
                  key={i}
                  className="h-2.5 w-4 shrink-0 rounded-xs bg-foreground/12"
                />
              ))}
            </div>
          ))}
          <ul className="flex gap-4 px-4 py-8">
            {films.map((f) => (
              <li key={f.slug} className="w-64 shrink-0 sm:w-72">
                <a
                  href={`#${f.slug}`}
                  className="group block rounded-sm border border-border bg-card p-4 transition-colors hover:border-terracotta/60"
                >
                  <p className="font-mono text-[0.56rem] tracking-[0.18em] text-terracotta tabular-nums">
                    {f.year}
                  </p>
                  <p className="mt-2 font-display text-[1.05rem] leading-snug font-semibold">
                    {f.title}
                  </p>
                  {f.bengali ? (
                    <p
                      className="mt-0.5 text-[0.78rem] text-muted-foreground"
                      lang="bn"
                    >
                      {f.bengali}
                    </p>
                  ) : null}
                  <p className="mt-2 font-mono text-[0.52rem] tracking-[0.14em] text-muted-foreground/70 uppercase">
                    {f.director}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The films. */}
      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <SectionHeading
            eyebrow="Famous films"
            title="Ten that were made here"
          />
        </Reveal>
        <ul className="mt-12 space-y-12">
          {films.map((f, i) => (
            <Reveal
              as="li"
              key={f.slug}
              delay={(i % 3) * 60}
              id={f.slug}
              className="scroll-mt-24"
            >
              <article className="sticky-split grid gap-6 border-t border-border pt-8 lg:grid-cols-[10rem_1fr]">
                <div>
                  <p className="font-display text-3xl font-semibold tabular-nums text-terracotta">
                    {f.year}
                  </p>
                  <p className="mt-1 font-mono text-[0.56rem] tracking-[0.16em] text-muted-foreground uppercase">
                    {f.director}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-[clamp(1.3rem,3.2vw,1.9rem)] font-semibold">
                    {f.title}
                    {f.bengali ? (
                      <span
                        className="ml-3 text-base font-normal text-muted-foreground"
                        lang="bn"
                      >
                        {f.bengali}
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-3 max-w-2xl font-display text-[1.08rem] leading-snug text-foreground/85 italic">
                    {f.line}
                  </p>
                  <p className="mt-3 max-w-2xl text-[0.94rem] leading-relaxed text-muted-foreground">
                    {f.note}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    {f.locations.map((l) => (
                      <li key={l.name} className="text-[0.84rem]">
                        {l.href ? (
                          <Link
                            href={l.href}
                            className="text-terracotta hover:underline"
                          >
                            {l.name}
                          </Link>
                        ) : (
                          <span className="font-medium">{l.name}</span>
                        )}
                        <span className="text-muted-foreground">
                          {" "}
                          · {l.what}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* The map. */}
      <section className="border-t border-border bg-secondary/40">
        <div
          className={`${pageShell} grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16`}
        >
          <Reveal>
            <SectionHeading
              eyebrow="Locations"
              title="Where it was shot"
              lede="Not every address survives, and Ray filmed a good deal of Pather Panchali in a village south of the city. What is here is what you can still stand in front of."
            />
            <ul className="mt-8 space-y-3">
              {allLocations.map((l) => (
                <li
                  key={`${l.film}-${l.name}`}
                  className="border-t border-border pt-3"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    {l.href ? (
                      <Link
                        href={l.href}
                        className="text-[0.92rem] font-medium hover:text-terracotta"
                      >
                        {l.name}
                      </Link>
                    ) : (
                      <span className="text-[0.92rem] font-medium">
                        {l.name}
                      </span>
                    )}
                    <span className="font-mono text-[0.54rem] tracking-[0.14em] text-muted-foreground/60 uppercase">
                      {l.film}, {l.year}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.82rem] text-muted-foreground">
                    {l.what}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative isolate aspect-square overflow-hidden rounded-lg border border-border bg-background">
              <PinMap
                pins={allLocations.map<MapPin>((l) => ({
                  id: `${l.film}-${l.name}`,
                  lat: l.coords.lat,
                  lng: l.coords.lng,
                  colour: "var(--terracotta)",
                  title: `${l.name} · ${l.film}`,
                }))}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Directors and actors. */}
      <section className="border-t border-border">
        <div
          className={`${pageShell} grid gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16`}
        >
          {[
            { title: "Directors", list: directors },
            { title: "Actors", list: actors },
          ].map((group, gi) => (
            <Reveal key={group.title} delay={gi * 90}>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                {group.title}
              </h2>
              <ul className="mt-8 space-y-5">
                {group.list.map((p) => (
                  <li key={p.name} className="border-t border-border pt-4">
                    <div className="flex flex-wrap items-baseline gap-x-4">
                      {p.href ? (
                        <Link
                          href={p.href}
                          className="font-display text-[1.05rem] font-semibold transition-colors hover:text-terracotta"
                        >
                          {p.name} →
                        </Link>
                      ) : (
                        <p className="font-display text-[1.05rem] font-semibold">
                          {p.name}
                        </p>
                      )}
                      <p className="font-mono text-[0.56rem] tabular-nums text-muted-foreground/70">
                        {p.years}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted-foreground">
                      {p.line}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
