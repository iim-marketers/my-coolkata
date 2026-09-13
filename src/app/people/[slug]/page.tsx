import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KolkataMap } from "@/components/kolkata-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { PortraitTile } from "@/components/portrait-wall";
import { Reveal } from "@/components/reveal";
import { getPerson, people, project } from "@/lib/kolkata";
import { personGroups } from "@/lib/kolkata/types";

export function generateStaticParams() {
  return people.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/people/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) return { title: "Not found" };
  return { title: person.name, description: person.summary };
}

export default async function PersonPage({ params }: PageProps<"/people/[slug]">) {
  const { slug } = await params;
  const person = getPerson(slug);
  if (!person) notFound();

  const group = personGroups.find((g) => g.id === person.group);
  const contemporaries = people
    .filter(
      (p) =>
        p.slug !== person.slug &&
        p.born <= (person.died ?? 2026) &&
        (p.died ?? 2026) >= person.born,
    )
    .slice(0, 5);
  const pins = (person.locations ?? []).filter((l) => l.coords);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow={group?.label ?? person.field}
        title={person.name}
        lede={person.summary}
        scene="rooftops"
        back={{ href: "/people", label: "The portrait wall" }}
        tall
        meta={[
          { label: "Lived", value: `${person.born}–${person.died ?? "present"}` },
          ...(person.bornAt ? [{ label: "Born", value: person.bornAt }] : []),
          { label: "Field", value: person.field },
          ...(person.bengali ? [{ label: "In Bengali", value: person.bengali }] : []),
        ]}
      />

      {/* Born → connection → contribution, as a strip. */}
      {person.kolkataConnection || person.contribution ? (
        <section className="border-b border-border bg-secondary/40">
          <div className={`${pageShell} grid gap-8 py-12 sm:py-16 md:grid-cols-3`}>
            {[
              ["Born", person.bornAt ?? `${person.born}`],
              ["The Kolkata connection", person.kolkataConnection],
              ["The contribution", person.contribution],
            ]
              .filter(([, v]) => Boolean(v))
              .map(([label, value], i) => (
                <Reveal key={String(label)} delay={i * 90}>
                  <p className="font-mono text-[0.56rem] tracking-[0.2em] text-terracotta uppercase">
                    {label}
                  </p>
                  <p className="mt-3 text-[0.96rem] leading-relaxed text-foreground/85">
                    {value}
                  </p>
                </Reveal>
              ))}
          </div>
        </section>
      ) : null}

      <div className={`${pageShell} grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-20`}>
        <article>
          <Reveal>
            <div className="max-w-2xl space-y-5 text-[1.02rem] leading-[1.75] text-foreground/85">
              {person.body.map((para, i) => (
                <p key={i} className={i === 0 ? "text-[1.14rem] leading-[1.7]" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          {person.quote ? (
            <Reveal className="mt-12 max-w-2xl border-l-2 border-terracotta pl-6">
              <blockquote className="font-display text-[clamp(1.25rem,3vw,1.7rem)] leading-snug italic">
                &ldquo;{person.quote.text}&rdquo;
              </blockquote>
              <p className="mt-3 font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
                {person.quote.source}
              </p>
            </Reveal>
          ) : null}

          {person.life?.length ? (
            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-semibold">A life</h2>
              <ol className="relative mt-8 border-l border-border">
                {person.life.map((e) => (
                  <li key={`${e.year}-${e.what}`} className="relative pb-7 pl-8">
                    <span className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-terracotta ring-4 ring-background" />
                    <p className="font-display text-lg font-semibold tabular-nums text-terracotta">
                      {e.year}
                    </p>
                    <p className="mt-1 max-w-xl text-[0.94rem] leading-relaxed text-muted-foreground">
                      {e.what}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          ) : null}
        </article>

        <aside className="space-y-8 self-start lg:sticky lg:top-24">
          <Reveal>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                What they left
              </p>
              <ol className="mt-5 space-y-4">
                {person.works.map((w) => (
                  <li key={w.title} className="border-t border-border pt-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-display text-base font-semibold">{w.title}</p>
                      <p className="shrink-0 font-mono text-[0.6rem] tabular-nums text-terracotta">
                        {w.year}
                      </p>
                    </div>
                    <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted-foreground">
                      {w.note}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {person.locations?.length ? (
            <Reveal delay={90}>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="font-mono text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                  Places connected to them
                </p>

                {pins.length > 0 ? (
                  <div className="relative mt-5 aspect-square overflow-hidden rounded-md border border-border">
                    <KolkataMap id={`person-${person.slug}`} />
                    {pins.map((l) => {
                      const { x, y } = project(l.coords!);
                      return (
                        <span
                          key={l.name}
                          title={l.name}
                          style={{ left: `${x}%`, top: `${y}%` }}
                          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta ring-2 ring-background"
                        />
                      );
                    })}
                  </div>
                ) : null}

                <ul className="mt-5 space-y-4">
                  {person.locations.map((l) => (
                    <li key={l.name} className="border-t border-border pt-3.5">
                      {l.href ? (
                        <Link
                          href={l.href}
                          className="font-display text-[1rem] font-semibold transition-colors hover:text-terracotta"
                        >
                          {l.name} →
                        </Link>
                      ) : (
                        <p className="font-display text-[1rem] font-semibold">{l.name}</p>
                      )}
                      <p className="mt-1 text-[0.84rem] leading-relaxed text-muted-foreground">
                        {l.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : null}
        </aside>
      </div>

      {contemporaries.length > 0 ? (
        <section className="border-t border-border bg-secondary/40">
          <div className={`${pageShell} py-16 sm:py-24`}>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Alive at the same time
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {contemporaries.map((p, i) => (
                <Reveal as="li" key={p.slug} delay={i * 70} className="h-full">
                  <PortraitTile person={p} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
