import Link from "next/link";
import {
  Camera,
  Coffee,
  MapPin,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { HeroBackdrop, Squiggle } from "@/components/hero-backdrop";
import { HeroSearch } from "@/components/hero-search";
import { CityScene } from "@/components/scenes/city-scene";
import type { PhotoId } from "@/lib/kolkata/photos";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  { label: "Street food", href: "/food", icon: UtensilsCrossed },
  { label: "Durga Puja", href: "/durga-puja", icon: Sparkles },
  { label: "Hidden gems", href: "/hidden", icon: MapPin },
  { label: "Adda spots", href: "/adda", icon: Coffee },
  { label: "Creator contest", href: "/events", icon: Camera },
];

export function Hero() {
  return (
    <section className="relative isolate z-20 overflow-x-clip bg-background pt-22 pb-36 sm:pt-26 sm:pb-44 lg:pt-30 lg:pb-44">
      <HeroBackdrop />

      <div className="mx-auto grid w-full max-w-352 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="relative z-10">
          <h1
            className="hero-rise mt-0 md:mt-6 font-display text-[clamp(2.7rem,6.6vw,5.6rem)] md:text-[min(10.5vw,5.5rem)] lg:text-[clamp(2.7rem,6.6vw,5.6rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance"
            style={{ animationDelay: "50ms" }}
          >
            Discover the <span className="text-primary">cool</span> side of{" "}
            <span className="relative inline-block whitespace-nowrap">
              Kolkata
              <Squiggle className="absolute bottom-[-0.16em] left-0 -z-10 h-[0.3em] w-full text-marigold" />
            </span>
          </h1>

          <p
            className="hero-rise mt-7 text-[1.05rem] lg:max-w-xl leading-relaxed text-muted-foreground sm:text-[1.14rem]"
            style={{ animationDelay: "160ms" }}
          >
            Phuchka stops, pandal-hopping, sunset ghats, tram rides and weekend
            plans. Everything worth doing in the city, minus the textbook.
          </p>

          <div
            className="hero-rise relative z-20 mt-9 lg:max-w-2xl"
            style={{ animationDelay: "240ms" }}
          >
            <HeroSearch />
          </div>

          <div
            className="hero-rise mt-7 flex flex-wrap items-center gap-2.5"
            style={{ animationDelay: "320ms" }}
          >
            {HIGHLIGHTS.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[0.86rem] font-medium transition-[translate,border-color,color,box-shadow] hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
              >
                <Icon className="size-3.5 text-primary" />
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* On phones the collage comes first and the pitch follows it. */}
        <div className="relative isolate order-first mx-auto w-full max-w-xl lg:order-0 lg:max-w-none lg:pl-6">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/30 blur-3xl"
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <div className="flex flex-col gap-3 sm:gap-5">
              {/* Each note is anchored to its own photo, so it stays with it at every width. */}
              <div className="relative">
                <Frame
                  photo="yellow-taxi"
                  className="hero-down aspect-4/3"
                  preload
                />
                <FloatCard
                  emoji="🚕"
                  title="Hop in"
                  line="No refusal"
                  className="-top-3 -left-2 sm:-top-5 sm:-left-8"
                  delay={750}
                />
                {/* Centred on the gap junction between all three photos: the
                    taxi's bottom-right corner, pushed out by half the grid gap. */}
                <SpinBadge className="top-[calc(100%+0.375rem)] -right-1.5 translate-x-1/2 -translate-y-1/2 sm:top-[calc(100%+0.625rem)] sm:-right-2.5" />
              </div>
              <div className="relative">
                <Frame
                  photo="hero-pujo"
                  className="hero-zoom aspect-4/5"
                  delay={140}
                />
                <FloatCard
                  emoji="🪔"
                  title="Pujo mode"
                  line="5 days, 0 sleep"
                  className="-bottom-3 -left-2 sm:-bottom-5 sm:-left-8"
                  delay={1150}
                />
              </div>
            </div>
            <div className="pt-10 sm:pt-20">
              <div className="relative">
                <Frame
                  photo="kolkata-biryani"
                  className="hero-slide aspect-[3/4.4]"
                  delay={280}
                />
                <FloatCard
                  emoji="🍛"
                  title="Biryani o'clock"
                  line="Don't skip the potato"
                  className="-right-2 -bottom-4 sm:-right-6 sm:-bottom-4"
                  delay={950}
                  float="reverse"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Frame({
  photo,
  className,
  delay = 0,
  preload = false,
}: {
  photo: PhotoId;
  className?: string;
  delay?: number;
  preload?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_28px_60px_-30px_oklch(0.25_0.04_265/0.6)] ring-1 ring-foreground/5",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CityScene
        photo={photo}
        preload={preload}
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 290px, 340px"
        className="h-full w-full"
        imgClassName="transition-transform duration-1400 ease-out group-hover:scale-105"
      />
    </div>
  );
}

function FloatCard({
  emoji,
  title,
  line,
  className,
  delay,
  float = "normal",
}: {
  emoji: string;
  title: string;
  line: string;
  className?: string;
  delay: number;
  float?: "normal" | "reverse";
}) {
  // Two wrappers, so the pop-in and the bob do not fight over `transform`.
  return (
    <div
      className={cn("hero-pop absolute z-10", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Compact on phones, full size from `sm`; text never wraps into a tall card. */}
      <div
        className="hero-float flex items-center gap-2 rounded-xl border border-border bg-card/95 py-1.5 pr-3 pl-1.5 whitespace-nowrap shadow-lg backdrop-blur sm:gap-3 sm:rounded-2xl sm:py-2.5 sm:pr-5 sm:pl-2.5 sm:shadow-xl"
        style={{ animationDirection: float }}
      >
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-lg bg-accent text-sm sm:size-10 sm:rounded-xl sm:text-xl"
        >
          {emoji}
        </span>
        <span>
          <span className="block text-[0.72rem] leading-tight font-semibold sm:text-[0.9rem]">
            {title}
          </span>
          <span className="block text-[0.62rem] leading-tight text-muted-foreground sm:text-[0.76rem]">
            {line}
          </span>
        </span>
      </div>
    </div>
  );
}

/** A slowly turning sticker, because a guide to this city should not sit still. */
function SpinBadge({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "hero-pop absolute z-10 size-16 sm:size-24 lg:size-28",
        className,
      )}
      style={{ animationDelay: "1300ms" }}
    >
      <div className="relative size-full rounded-full bg-ink text-cream shadow-xl ring-2 ring-background sm:ring-4">
        <svg viewBox="0 0 100 100" className="hero-spin size-full">
          <defs>
            <path
              id="hero-badge-ring"
              d="M50 50m-35 0a35 35 0 1 1 70 0a35 35 0 1 1-70 0"
            />
          </defs>

          <text
            fill="currentColor"
            fontSize="10"
            fontWeight="700"
            letterSpacing="4.22"
          >
            <textPath href="#hero-badge-ring">EAT • WANDER • REPEAT •</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 grid place-items-center text-lg sm:text-2xl lg:text-3xl">
          🚋
        </span>
      </div>
    </div>
  );
}
