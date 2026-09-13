import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeritageCard } from "@/components/heritage-card";
import { InteractiveMap } from "@/components/interactive-map";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { getHeritageSite, heritageSites } from "@/lib/kolkata";

export function generateStaticParams() {
  return heritageSites.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/heritage/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const site = getHeritageSite(slug);
  if (!site) return { title: "Not found" };
  return { title: site.name, description: site.summary };
}

export default async function HeritageSitePage({
  params,
}: PageProps<"/heritage/[slug]">) {
  const { slug } = await params;
  const site = getHeritageSite(slug);
  if (!site) notFound();

  const nearby = heritageSites
    .filter((s) => s.slug !== site.slug)
    .map((s) => ({
      s,
      d:
        Math.abs(s.coords.lat - site.coords.lat) +
        Math.abs(s.coords.lng - site.coords.lng),
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 3)
    .map((x) => x.s);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow={site.alsoKnownAs ? `Also ${site.alsoKnownAs}` : site.neighbourhood}
        title={site.name}
        lede={site.summary}
        scene={site.scene} photo={site.photo}
        back={{ href: "/heritage", label: "Heritage" }}
        tall
        meta={[
          { label: "Built", value: site.built },
          { label: "Style", value: site.style },
          ...(site.architect ? [{ label: "Architect", value: site.architect }] : []),
          { label: "Where", value: site.neighbourhood },
        ]}
      />

      <div className={`${pageShell} grid gap-14 py-16 sm:py-24 lg:grid-cols-[1.35fr_1fr] lg:gap-20`}>
        <article>
          <Reveal>
            <div className="max-w-2xl space-y-5 text-[1.02rem] leading-[1.75] text-foreground/85">
              {site.body.map((para, i) => (
                <p key={i} className={i === 0 ? "text-[1.14rem] leading-[1.7]" : undefined}>
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-14 max-w-2xl rounded-lg border border-terracotta/30 bg-terracotta/5 p-6">
            <p className="font-mono text-[0.6rem] tracking-[0.24em] text-terracotta uppercase">
              What the guidebook leaves out
            </p>
            <p className="mt-3 text-[0.98rem] leading-relaxed">{site.overlooked}</p>
          </Reveal>
        </article>

        <aside className="space-y-8 self-start lg:sticky lg:top-24">
          <Reveal>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="font-mono text-[0.6rem] tracking-[0.24em] text-muted-foreground uppercase">
                In figures
              </p>
              <dl className="mt-4 space-y-3">
                {site.detail.map((d) => (
                  <div key={d.label} className="flex justify-between gap-6 border-t border-border pt-3">
                    <dt className="shrink-0 text-[0.82rem] text-muted-foreground">
                      {d.label}
                    </dt>
                    <dd className="text-right text-[0.86rem] font-medium">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <InteractiveMap
              compact
              points={[
                {
                  id: site.slug,
                  name: site.name,
                  coords: site.coords,
                  kind: "heritage",
                  note: site.style,
                },
                ...nearby.map((n) => ({
                  id: n.slug,
                  name: n.name,
                  coords: n.coords,
                  kind: "heritage" as const,
                  href: `/heritage/${n.slug}`,
                  note: n.style,
                })),
              ]}
            />
          </Reveal>
        </aside>
      </div>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Nearest three
            </h2>
            <Link
              href="/map"
              className="font-mono text-[0.64rem] tracking-[0.2em] text-muted-foreground uppercase hover:text-foreground"
            >
              Open the map →
            </Link>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((n, i) => (
              <Reveal as="li" key={n.slug} delay={i * 90} className="h-full">
                <HeritageCard site={n} size="sm" />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
