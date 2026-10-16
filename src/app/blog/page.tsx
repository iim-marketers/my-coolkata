import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/components/blog/blog-article";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import { blogPath, blogPosts, readingMinutes } from "@/lib/kolkata/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Walks, Pujo guides and field notes from Kolkata: the lanes, the people and the work behind the city.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = [...blogPosts].sort((a, b) => b.published.localeCompare(a.published));
  const [latest] = posts;

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Blog"
        title="Walks and field notes"
        lede="Guides you can follow on foot, and the people and work behind the city we love."
        scene="kumartuli"
        photo="kumartuli-idol-row"
        meta={
          latest
            ? [
                { label: "Updated", value: formatDate(latest.published) },
                { label: "Posts", value: String(posts.length) },
                { label: "Latest walk", value: latest.title.split(":")[0] },
              ]
            : undefined
        }
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        {posts.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <p className="font-display text-2xl font-extrabold tracking-[-0.02em]">
              The first walk is on its way
            </p>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-muted-foreground">
              Until then, the longer reads are worth your time.
            </p>
            <Link
              href="/stories"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[0.9rem] font-semibold text-cream transition-colors hover:bg-terracotta"
            >
              Read the stories
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        ) : null}
        <ul className="grid gap-6">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 90}>
              <Link
                href={blogPath(post.slug)}
                className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-terracotta/60 md:grid-cols-[1.1fr_1fr]"
              >
                <div className="relative aspect-16/10 overflow-hidden md:aspect-auto md:min-h-104">
                  <CityScene
                    photo={post.cover}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-full w-full"
                    imgClassName="transition-transform duration-1400 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <p className="font-mono text-[0.62rem] tracking-[0.24em] text-primary uppercase">
                    {post.eyebrow}
                    <span className="mx-2 text-border">/</span>
                    {readingMinutes(post)} min
                  </p>
                  <h2 className="mt-4 font-display text-[clamp(1.6rem,3.4vw,2.5rem)] leading-[1.08] font-extrabold tracking-[-0.02em] text-balance">
                    {post.title}
                  </h2>
                  <p className="mt-4 text-[0.98rem] leading-relaxed text-muted-foreground">
                    {post.standfirst}
                  </p>
                  <p className="mt-6 flex items-center justify-between gap-4 font-mono text-[0.62rem] tracking-[0.2em] text-muted-foreground/80 uppercase">
                    <time dateTime={post.published}>{formatDate(post.published)}</time>
                    <span className="inline-flex items-center gap-1.5 text-terracotta">
                      Read the walk
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
