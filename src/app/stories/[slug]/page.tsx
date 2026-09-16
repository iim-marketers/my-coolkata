import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import { getStory, stories } from "@/lib/kolkata";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Not found" };
  return {
    title: story.title,
    description: story.standfirst,
    openGraph: { type: "article", publishedTime: story.published },
  };
}

export default async function StoryPage({
  params,
}: PageProps<"/stories/[slug]">) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();

  const more = stories.filter((s) => s.slug !== story.slug).slice(0, 2);

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow={story.tags.join(" · ")}
        title={story.title}
        lede={story.standfirst}
        scene={story.scene}
        photo={story.photo}
        back={{ href: "/stories", label: "Stories" }}
        meta={[
          { label: "By", value: story.author },
          {
            label: "Published",
            value: new Date(story.published).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
          },
          { label: "Reading time", value: `${story.readingMinutes} minutes` },
        ]}
      />

      <article className={`${pageShell} py-16 sm:py-24`}>
        <div className="mx-auto">
          {story.body.map((block, i) => {
            if (block.kind === "heading") {
              return (
                <Reveal key={i}>
                  <h2 className="mt-14 mb-5 font-display text-[clamp(1.4rem,3.4vw,2rem)] font-semibold">
                    {block.text}
                  </h2>
                </Reveal>
              );
            }
            if (block.kind === "quote") {
              return (
                <Reveal key={i}>
                  <blockquote className="my-12 border-l-2 border-terracotta pl-6 font-display text-[clamp(1.25rem,3vw,1.7rem)] leading-snug italic">
                    “{block.text}”
                  </blockquote>
                </Reveal>
              );
            }
            return (
              <Reveal key={i}>
                <p
                  className={
                    i === 0
                      ? "mb-5 text-[1.16rem] leading-[1.7] text-foreground/90"
                      : "mb-5 text-[1.04rem] leading-[1.8] text-foreground/85"
                  }
                >
                  {block.text}
                </p>
              </Reveal>
            );
          })}
        </div>
      </article>

      <section className="border-t border-border bg-secondary/40">
        <div className={`${pageShell} py-16 sm:py-24`}>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Read next
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {more.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 90} className="h-full">
                <StoryCard story={s} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
