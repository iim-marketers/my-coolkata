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
        featured ? "md:grid-cols-2" : "h-full grid-cols-1 grid-rows-[auto_1fr]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          featured ? "aspect-[16/10] md:aspect-auto md:min-h-[22rem]" : "h-36 sm:h-40",
        )}
      >
        <CityScene
          name={story.scene} photo={story.photo}
          detail="card"
          sizes={featured ? "(min-width: 768px) min(50vw, 672px), 100vw" : undefined}
          className="h-full w-full transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="scrim-bottom absolute inset-0 md:opacity-70" />
      </div>

      <div className={cn("flex flex-col", featured ? "justify-center p-5 sm:p-7 md:p-10" : "p-4 sm:p-5")}>
        <p className="font-mono text-[0.6rem] tracking-[0.26em] text-primary uppercase">
          {story.tags[0]}
          <span className="mx-2 text-border">/</span>
          {story.readingMinutes} min
        </p>
        <h3
          className={cn(
            "mt-3 font-display leading-tight font-semibold text-balance",
            featured ? "text-[clamp(1.5rem,3.4vw,2.4rem)]" : "line-clamp-2 text-lg",
          )}
        >
          {story.title}
        </h3>
        <p
          className={cn(
            "text-muted-foreground",
            featured ? "mt-3 text-[0.92rem] leading-relaxed" : "mt-2 line-clamp-2 text-sm leading-snug",
          )}
        >
          {story.standfirst}
        </p>
        <p
          className={cn(
            "font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground/70 uppercase",
            featured ? "mt-5" : "mt-auto pt-3",
          )}
        >
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
