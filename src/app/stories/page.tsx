import type { Metadata } from "next";
import { PageHeader, pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { StoryCard } from "@/components/story-card";
import { stories } from "@/lib/kolkata";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Stories",
  description:
    "Longer reads on the trams, Kumartuli, the Coffee House, the Hooghly, the book fair and sodium light.",
  path: "/stories",
  photo: "sovabazar-rajbari",
});

export default function StoriesPage() {
  const [lead, ...rest] = stories;

  return (
    <main className="relative z-10 bg-background">
      <PageHeader
        eyebrow="Stories"
        title="Longer reads"
        lede="Six essays on the things the city is currently losing, keeping, or arguing about."
        scene="tram"
        photo="sovabazar-rajbari"
        meta={[
          { label: "Essays", value: String(stories.length) },
          {
            label: "Total",
            value: `${stories.reduce((n, s) => n + s.readingMinutes, 0)} minutes`,
          },
        ]}
      />

      <section className={`${pageShell} py-16 sm:py-24`}>
        <Reveal>
          <StoryCard story={lead} featured />
        </Reveal>
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {rest.map((story, i) => (
            <Reveal as="li" key={story.slug} delay={(i % 2) * 90} className="h-full">
              <StoryCard story={story} />
            </Reveal>
          ))}
        </ul>
      </section>
    </main>
  );
}
