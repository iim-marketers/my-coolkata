import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IllustratedMap } from "@/components/illustrated-map";
import { NeighbourhoodCard } from "@/components/neighbourhood-card";
import { PageHeader, pageShell } from "@/components/page-header";
import { PhotoGallery } from "@/components/photo-gallery";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import {
  getNeighbourhood,
  getStory,
  neighbourhoods,
  zones,
} from "@/lib/kolkata";

export function generateStaticParams() {
  return neighbourhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/neighbourhoods/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const area = getNeighbourhood(slug);
  if (!area) return { title: "Not found" };
  return { title: area.name, description: `${area.tagline} ${area.summary}` };
}

/** A titled block with a rule, used for each of the quarter's facets. */
function Facet({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section" className="border-t border-border pt-8">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[0.58rem] text-terracotta">{n}</span>
        <h2 className="font-display text-[clamp(1.4rem,3.2vw,2rem)] font-semibold">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </Reveal>
  );
}

export default async function NeighbourhoodPage({
  params,
}: PageProps<"/neighbourhoods/[slug]">) {
  const { slug } = await params;
  const area = getNeighbourhood(slug);
  if (!area) notFound();

  const zone = zones.find((z) => z.id === area.zone);
  const others = neighbourhoods
    .filter((n) => n.slug !== area.slug && n.zone === area.zone)
    .slice(0, 4);
  const stories = (area.storySlugs ?? [])
    .map(getStory)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const totalWalk = area.walk[area.walk.length - 1]?.minutes ?? 0;

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow={zone?.label ?? "Kolkata"}
        title={area.name}
        lede={area.tagline}
        scene={area.scene}
        photo={area.photo}
        back={{ href: "/neighbourhoods", label: "All quarters" }}
        tall
        meta={[
          { label: "In Bengali", value: area.bengali },
          ...(area.alsoKnownAs
            ? [{ label: "Also", value: area.alsoKnownAs }]
            : []),
          { label: "Known for", value: area.knownFor },
          { label: "Best hour", value: area.bestHour },
          {
            label: "Walk",
            value: `${totalWalk} min, ${area.walk.length} stops`,
          },
        ]}
      />

      <div
        className={`${pageShell} grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:gap-20`}
      >
        <div className="space-y-12">
          <Reveal>
            <p className="max-w-2xl font-display text-[clamp(1.15rem,2.6vw,1.5rem)] leading-snug text-foreground/90">
              {area.summary}
            </p>
          </Reveal>

          <Facet n="01" title="Photographs">
            <p className="mb-5 max-w-2xl text-[0.9rem] leading-relaxed text-muted-foreground">
              Photographs of the quarter. Open one to see it full size.
            </p>
            <PhotoGallery
              plates={area.plates.map((scene, i) => ({
                scene,
                photo: area.photos?.[i],
              }))}
              className="lg:grid-cols-3"
            />
          </Facet>

          <Facet n="02" title="Must-see buildings">
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {area.buildings.map((b) => (
                <li key={b.name} className="border-t border-border pt-3.5">
                  {b.href ? (
                    <Link
                      href={b.href}
                      className="font-display text-[1.05rem] font-semibold transition-colors hover:text-terracotta"
                    >
                      {b.name} →
                    </Link>
                  ) : (
                    <p className="font-display text-[1.05rem] font-semibold">
                      {b.name}
                    </p>
                  )}
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {b.note}
                  </p>
                </li>
              ))}
            </ul>
          </Facet>

          <Facet n="03" title="Where to eat">
            <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {area.eats.map((e) => (
                <li key={e.name} className="border-t border-border pt-3.5">
                  <p className="font-display text-[1.05rem] font-semibold">
                    {e.name}
                  </p>
                  <p className="mt-0.5 font-mono text-[0.56rem] tracking-[0.16em] text-terracotta uppercase">
                    {e.where}
                  </p>
                  <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted-foreground">
                    {e.note}
                  </p>
                </li>
              ))}
            </ul>
          </Facet>

          <Facet n="04" title="Things to see">
            <ol className="space-y-5">
              {area.thingsToSee.map((t, i) => (
                <li
                  key={t.name}
                  className="flex gap-5 border-t border-border pt-3.5"
                >
                  <span className="mt-1 font-mono text-[0.58rem] text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-[1.05rem] font-semibold">
                      {t.name}
                    </p>
                    <p className="mt-1 max-w-xl text-[0.88rem] leading-relaxed text-muted-foreground">
                      {t.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Facet>

          {stories.length > 0 ? (
            <Facet n="05" title="Stories">
              <ul className="grid gap-5">
                {stories.map((s) => (
                  <li key={s.slug}>
                    <StoryCard story={s} />
                  </li>
                ))}
              </ul>
            </Facet>
          ) : null}
        </div>

        <aside className="space-y-8 self-start lg:sticky lg:top-24">
          <Reveal>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-[0.58rem] tracking-[0.24em] text-muted-foreground uppercase">
                The walk
              </p>
              <ol className="relative mt-5 border-l border-border">
                {area.walk.map((stop) => (
                  <li key={stop.stop} className="relative pb-6 pl-6 last:pb-0">
                    <span className="absolute top-1.5 left-[-4.5px] size-2 rounded-full bg-terracotta ring-4 ring-card" />
                    <div className="flex flex-wrap items-baseline gap-x-3">
                      <p className="text-[0.92rem] font-medium">{stop.stop}</p>
                      <p className="font-mono text-[0.56rem] tabular-nums text-muted-foreground">
                        +{stop.minutes}m
                      </p>
                    </div>
                    <p className="mt-1 text-[0.82rem] leading-snug text-muted-foreground">
                      {stop.note}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </aside>
      </div>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Where this sits
            </h2>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <IllustratedMap initial={area.slug} />
          </Reveal>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="border-t border-border">
          <div className={`${pageShell} py-16 sm:py-24`}>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Also in {zone?.label}
            </h2>
            <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((n, i) => (
                <Reveal as="li" key={n.slug} delay={i * 80} className="h-full">
                  <NeighbourhoodCard area={n} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </main>
  );
}
