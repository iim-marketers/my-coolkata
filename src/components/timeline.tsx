import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/lib/kolkata/types";

const ERA_TONE: Record<TimelineEntry["era"], string> = {
  "pre-colonial": "bg-verdigris",
  company: "bg-hooghly",
  renaissance: "bg-marigold",
  raj: "bg-terracotta",
  independence: "bg-alta",
  modern: "bg-foreground",
};

export function Timeline({
  entries,
  dense = false,
}: {
  entries: TimelineEntry[];
  dense?: boolean;
}) {
  if (entries.length === 0) {
    return (
      <p className="border-l border-border py-10 pl-8 text-muted-foreground">
        Nothing in this range. Widen the years.
      </p>
    );
  }

  return (
    <ol className="relative border-l border-border">
      {entries.map((e) => (
        <li
          key={`${e.year}-${e.title}`}
          className={cn("relative pl-8 sm:pl-10", dense ? "pb-7" : "pb-11")}
        >
          <span
            className={cn(
              "absolute top-2 -left-[4.5px] size-2 rounded-full ring-4 ring-background",
              ERA_TONE[e.era],
              e.pivotal && "size-3 -left-[6.5px]",
            )}
          />
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p
              className={cn(
                "font-display font-semibold tabular-nums",
                e.pivotal ? "text-2xl text-terracotta" : "text-xl",
              )}
            >
              {e.displayYear ?? e.year}
            </p>
            <h3 className="font-display text-lg leading-tight font-medium">
              {e.title}
            </h3>
          </div>
          <p
            className={cn(
              "mt-2 max-w-2xl leading-relaxed text-muted-foreground",
              dense ? "text-[0.86rem]" : "text-[0.94rem]",
            )}
          >
            {e.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
