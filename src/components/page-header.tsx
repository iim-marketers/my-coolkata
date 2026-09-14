import Link from "next/link";
import { HeroBackdrop, Squiggle } from "@/components/hero-backdrop";
import { CityScene } from "@/components/scenes/city-scene";
import type { PhotoId } from "@/lib/kolkata/photos";
import type { SceneName } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

export const pageShell = "mx-auto w-full max-w-[88rem] px-5 sm:px-8";

const BENGALI = /[ঀ-৿]/;
const langOf = (text: string) => (BENGALI.test(text) ? "bn" : undefined);

export function PageHeader({
  eyebrow,
  title,
  lede,
  scene,
  photo,
  meta,
  back,
  tall = false,
  children,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  scene: SceneName;
  /** The page's own photograph; `scene` is the fallback. */
  photo?: PhotoId;
  /** The first entry is pinned to the photograph; the rest sit under the lede. */
  meta?: { label: string; value: string }[];
  back?: { href: string; label: string };
  /** A taller frame, for pages about one place or one story. */
  tall?: boolean;
  /** Anything interactive that belongs in the banner, under the lede. */
  children?: React.ReactNode;
}) {
  const split = title.lastIndexOf(" ");
  const lead = split === -1 ? "" : title.slice(0, split + 1);
  const last = title.slice(split + 1);
  const [pinned, ...rest] = meta ?? [];

  return (
    <header className="relative isolate overflow-x-clip bg-background pt-22 pb-28 sm:pt-26 sm:pb-32 lg:pb-36">
      <HeroBackdrop size="mini" />

      <div
        className={cn(
          pageShell,
          "grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14",
        )}
      >
        <div className="relative z-10">
          <div>
            <p
              lang={langOf(eyebrow)}
              className="hero-rise inline-flex rounded-full border border-border bg-card px-3.5 py-1 text-[0.72rem] font-semibold tracking-[0.14em] text-primary uppercase shadow-sm"
              style={{ animationDelay: "40ms" }}
            >
              {eyebrow}
            </p>
          </div>

          {/* Balanced lines only once the banner splits in two and the
              column is narrow enough to want them. On a phone the title has
              the whole screen, and balancing spent barely half of it. */}
          <h1
            className="hero-rise mt-5 font-display text-[clamp(2.3rem,5.2vw,4.4rem)] leading-none font-extrabold tracking-[-0.035em] text-wrap lg:text-balance"
            style={{ animationDelay: "100ms" }}
          >
            {lead}
            <span className="relative inline-block">
              {last}
              <Squiggle className="absolute bottom-[-0.14em] left-0 -z-10 h-[0.28em] w-full text-marigold" />
            </span>
          </h1>

          {lede ? (
            <p
              className="hero-rise mt-5 max-w-xl text-[1rem] leading-relaxed text-muted-foreground sm:text-[1.08rem]"
              style={{ animationDelay: "160ms" }}
            >
              {lede}
            </p>
          ) : null}

          {children ? (
            <div className="hero-rise mt-8" style={{ animationDelay: "220ms" }}>
              {children}
            </div>
          ) : null}

          {rest.length ? (
            <dl
              className="hero-rise mt-8 flex flex-wrap gap-2.5"
              style={{ animationDelay: "260ms" }}
            >
              {rest.map((m) => (
                <div
                  key={m.label}
                  className="max-w-[18rem] rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-sm backdrop-blur"
                >
                  <dt className="text-[0.6rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {m.label}
                  </dt>
                  <dd
                    lang={langOf(m.value)}
                    className="mt-0.5 text-[0.88rem] leading-snug font-semibold"
                  >
                    {m.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {/* On phones the photograph comes first, as it does on the home page. */}
        <div className="relative isolate order-first mx-auto w-full max-w-xl lg:order-0 lg:max-w-none">
          <div
            aria-hidden
            className="absolute top-1/2 left-1/2 -z-10 aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-marigold/30 blur-3xl"
          />
          <div
            className={cn(
              "hero-zoom group relative aspect-4/3 overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_28px_60px_-30px_oklch(0.25_0.04_265/0.6)] ring-1 ring-foreground/5 lg:rotate-[1.5deg]",
              tall && "lg:aspect-5/6",
            )}
          >
            <CityScene
              name={scene}
              photo={photo}
              preload
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 36rem, 40vw"
              className="h-full w-full"
              imgClassName="transition-transform duration-1400 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
