import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { famousFor } from "@/lib/kolkata";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Famous For",
  description:
    "Food, books, football, cinema, theatre, art, music and festivals: eight things Kolkata is known for, and what is actually in each of them.",
  path: "/famous-for",
  photo: "rosogolla",
});

export default function FamousForPage() {
  const total = famousFor.reduce((n, f) => n + f.items.length, 0);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Famous for"
        title="Kolkata is famous for…"
        lede="Eight strands, and the specific things inside each one. Almost every item here has a page of its own somewhere on this site."
        scene="streetfood"
        photo="rosogolla"
        meta={[
          { label: "Strands", value: String(famousFor.length) },
          { label: "Things", value: String(total) },
        ]}
      />

      {/* Index. */}
      <section className={`${pageShell} py-14 sm:py-20`}>
        <Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {famousFor.map((f) => (
              <li key={f.slug}>
                <a
                  href={`#${f.slug}`}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 transition-colors hover:border-terracotta hover:bg-terracotta/5"
                >
                  <span className="text-2xl" aria-hidden>
                    {f.icon}
                  </span>
                  <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase">
                    {f.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {famousFor.map((strand, i) => (
        <section
          key={strand.slug}
          id={strand.slug}
          className={`scroll-mt-20 border-t border-border ${i % 2 ? "bg-secondary/40" : ""}`}
        >
          <div className={`${pageShell} py-14 sm:py-20`}>
            <Reveal>
              <div className="flex items-start gap-5">
                <span className="text-4xl leading-none sm:text-5xl" aria-hidden>
                  {strand.icon}
                </span>
                <div>
                  <h2 className="font-display text-[clamp(1.7rem,4.4vw,2.8rem)] leading-tight font-semibold">
                    {strand.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[1rem] leading-relaxed text-muted-foreground">
                    {strand.line}
                  </p>
                </div>
              </div>
            </Reveal>

            <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {strand.items.map((item, n) => (
                <Reveal as="li" key={item.name} delay={(n % 3) * 60} className="h-full">
                  <div className="h-full border-t border-border pt-3.5">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="font-display text-[1.05rem] font-semibold transition-colors hover:text-terracotta"
                      >
                        {item.name} →
                      </Link>
                    ) : (
                      <p className="font-display text-[1.05rem] font-semibold">
                        {item.name}
                      </p>
                    )}
                    <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted-foreground">
                      {item.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="border-t border-border">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <Reveal>
            <SectionHeading
              eyebrow="Keep going"
              title="Where each of these lives"
              href="/map"
              hrefLabel="Open the map"
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
