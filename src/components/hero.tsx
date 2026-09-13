import Link from "next/link";
import {
  CalendarDays,
  Coffee,
  MapPin,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { HeroSearch } from "@/components/hero-search";
import { CityScene } from "@/components/scenes/city-scene";
import { dishes, hiddenPlaces, neighbourhoods } from "@/lib/kolkata";
import type { PhotoId } from "@/lib/kolkata/photos";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  { label: "Street food", href: "/food", icon: UtensilsCrossed },
  { label: "Durga Puja", href: "/durga-puja", icon: Sparkles },
  { label: "Hidden gems", href: "/hidden", icon: MapPin },
  { label: "Adda spots", href: "/adda", icon: Coffee },
  { label: "What's on", href: "/events", icon: CalendarDays },
];

/**
 * Light and split: the pitch, a search bar and shortcuts on the left, a
 * collage of the city that assembles itself on the right.
 */
export function Hero() {
  const stats = [
    { value: dishes.length, label: "dishes to try" },
    { value: neighbourhoods.length, label: "paras to explore" },
    { value: hiddenPlaces.length, label: "hidden gems" },
  ];

  return (
    // Clip sideways only, and sit above the next section, so the search
    // dropdown can hang past the hero's bottom edge instead of being cut off.
    <section className="relative isolate z-20 overflow-x-clip bg-background pt-22 pb-22 sm:pt-26 lg:pt-30 lg:pb-30">
      <Backdrop />

      <div className="mx-auto grid w-full max-w-352 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div className="relative z-10">
          {/* <p className="hero-rise inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-[0.8rem] font-medium text-muted-foreground shadow-sm backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-primary" />
            </span>
            Your cheat sheet to the City of Joy
          </p> */}

          <h1
            className="hero-rise mt-0 md:mt-6 font-display text-[clamp(2.7rem,6.6vw,5.6rem)] leading-[0.98] font-extrabold tracking-[-0.04em] text-balance"
            style={{ animationDelay: "80ms" }}
          >
            Discover the <span className="text-primary">cool</span> side of{" "}
            <span className="relative inline-block whitespace-nowrap">
              Kolkata
              <Squiggle className="absolute bottom-[-0.16em] left-0 -z-10 h-[0.3em] w-full text-marigold" />
            </span>
          </h1>

          <p
            className="hero-rise mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted-foreground sm:text-[1.14rem]"
            style={{ animationDelay: "160ms" }}
          >
            Phuchka stops, pandal-hopping, sunset ghats, tram rides and weekend
            plans. Everything worth doing in the city, minus the textbook.
          </p>

          {/* Each animated block is its own stacking context, so the search
              has to sit above the chips or its dropdown slides under them. */}
          <div
            className="hero-rise relative z-20 mt-9 max-w-2xl"
            style={{ animationDelay: "240ms" }}
          >
            <HeroSearch />
          </div>

          <div
            className="hero-rise mt-7 flex flex-wrap items-center gap-2.5"
            style={{ animationDelay: "320ms" }}
          >
            <span className="mr-1 text-[0.86rem] font-medium text-muted-foreground">
              Or browse the highlights:
            </span>
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

          <dl
            className="hero-rise mt-11 flex flex-wrap gap-x-10 gap-y-5"
            style={{ animationDelay: "400ms" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="text-[0.82rem] text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="font-display text-[2rem] leading-none font-extrabold tracking-tight">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The collage. Each frame arrives from a different direction. */}
        {/* `isolate` keeps the collage's layers to itself: on phones it sits
            below the search, and the badge must not cover the dropdown. */}
        <div className="relative isolate mx-auto w-full max-w-xl lg:max-w-none lg:pl-6">
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
                  className="-right-2 bottom-8 sm:-right-6 sm:-bottom-4"
                  delay={950}
                  float="reverse"
                />
              </div>
            </div>
          </div>

          <SpinBadge className="-top-5 -right-1 sm:-top-8 sm:-right-4" />
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
        detail="card"
        preload={preload}
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
          {/* Spacing sized so the phrase wraps the whole ring (2π × 35) in
              Geist Bold; the gap after the last dot matches every other gap. */}
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

/** A marker-pen underline that draws itself in. */
function Squiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3 13C30 4 55 18 82 10s53-7 78 1 30 3 37-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="hero-draw"
      />
    </svg>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="hero-dots absolute inset-0" />
      <div className="absolute -top-48 -left-40 size-144 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-24 -right-48 size-128 rounded-full bg-marigold/20 blur-3xl" />
      <Skyline className="absolute inset-x-0 bottom-0 h-24 w-full text-foreground/[0.07] sm:h-32" />
    </div>
  );
}

/** Howrah Bridge, Shaheed Minar, Victoria Memorial and a tram, in one line. */
function Skyline({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      fill="currentColor"
    >
      <rect x="0" y="128" width="1440" height="12" />
      <rect x="0" y="100" width="36" height="28" />
      <rect x="40" y="86" width="30" height="42" />
      <g
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
        strokeLinejoin="round"
      >
        <path d="M80 100 185 40l45 60M185 40v60M425 40l-55 60M425 40l95 60M185 40q120 55 240 0" />
      </g>
      <rect x="80" y="98" width="440" height="7" />
      <rect x="180" y="38" width="10" height="90" />
      <rect x="420" y="38" width="10" height="90" />
      <rect x="540" y="92" width="34" height="36" />
      <path d="M596 128V54l5-14 5 14v74Z" />
      <circle cx="601" cy="38" r="4" />
      <rect x="624" y="104" width="46" height="24" />
      <rect x="700" y="96" width="280" height="32" />
      <rect x="790" y="76" width="100" height="20" />
      <path d="M800 77q40-58 80 0Z" />
      <rect x="836" y="16" width="8" height="16" />
      <circle cx="840" cy="12" r="4" />
      <path d="M708 97q17-24 34 0ZM938 97q17-24 34 0Z" />
      <rect x="1000" y="108" width="24" height="20" />
      <path d="M990 68h450" stroke="currentColor" strokeWidth="2" />
      <path d="M1098 96l20-28" stroke="currentColor" strokeWidth="3" />
      <rect x="1040" y="94" width="140" height="28" rx="7" />
      <rect x="1200" y="80" width="40" height="48" />
      <rect x="1248" y="96" width="30" height="32" />
      <rect x="1286" y="70" width="46" height="58" />
      <rect x="1340" y="92" width="36" height="36" />
      <rect x="1384" y="84" width="56" height="44" />
    </svg>
  );
}
