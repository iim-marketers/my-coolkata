import Link from "next/link";
import { CityScene } from "@/components/scenes/city-scene";
import type { Story } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

export function StoryCard({
  story,
  featured = false,
}: {
  story: Story;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={cn(
        "group grid overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-terracotta/60",
        featured ? "md:grid-cols-2" : "grid-cols-1",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] md:aspect-auto md:min-h-[22rem]" : "aspect-[16/9]",
        )}
      >
        <CityScene
          name={story.scene}
          instance={`st-${story.slug}`}
          detail={featured ? "full" : "card"}
          className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="scrim-bottom absolute inset-0 md:opacity-70" />
      </div>

      <div className={cn("flex flex-col justify-center p-5 sm:p-7", featured && "md:p-10")}>
        <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
          {story.tags[0]}
          <span className="mx-2 text-border">/</span>
          {story.readingMinutes} min
        </p>
        <h3
          className={cn(
            "mt-3 font-display leading-tight font-semibold text-balance",
            featured ? "text-[clamp(1.5rem,3.4vw,2.4rem)]" : "text-xl",
          )}
        >
          {story.title}
        </h3>
        <p className="mt-3 text-[0.92rem] leading-relaxed text-muted-foreground">
          {story.standfirst}
        </p>
        <p className="mt-5 font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground/70 uppercase">
          {new Date(story.published).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}
