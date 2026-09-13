import Link from "next/link";
import { CityScene } from "@/components/scenes/city-scene";
import type { PhotoId } from "@/lib/kolkata/photos";
import type { SceneName } from "@/lib/kolkata/types";
import { cn } from "@/lib/utils";

/** The banner every section page opens with: one frame, a title, a lede. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  scene,
  photo,
  meta,
  back,
  tall = false,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  scene: SceneName;
  /** The page's own photograph; `scene` is the fallback. */
  photo?: PhotoId;
  meta?: { label: string; value: string }[];
  back?: { href: string; label: string };
  tall?: boolean;
}) {
  return (
    <header
      className={cn(
        "relative flex items-end overflow-hidden",
        tall ? "min-h-[68svh]" : "min-h-[48svh]",
      )}
    >
      <CityScene
        name={scene}
        photo={photo}
        className="absolute inset-0 h-full w-full"
      />
      <div className="scrim-full absolute inset-0" />
      {/* A page banner carries more text than the hero does, so it needs a
          heavier floor under it. */}
      <div className="scrim-bottom absolute inset-x-0 bottom-0 h-3/4" />
      <div className="film-grain absolute inset-0" />

      <div className="relative mx-auto w-full max-w-[88rem] px-5 pt-28 pb-12 sm:px-8 sm:pb-16">
        {back ? (
          <Link
            href={back.href}
            className="mb-6 inline-block font-mono text-[0.62rem] tracking-[0.24em] text-cream/55 uppercase transition-colors hover:text-marigold"
          >
            ← {back.label}
          </Link>
        ) : null}

        <p className="font-mono text-[0.62rem] tracking-[0.3em] text-marigold/85 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.98] font-semibold tracking-[-0.02em] text-cream text-balance">
          {title}
        </h1>
        {lede ? (
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-cream/70">
            {lede}
          </p>
        ) : null}

        {meta?.length ? (
          <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-6">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[0.56rem] tracking-[0.2em] text-cream/45 uppercase">
                  {m.label}
                </dt>
                <dd
                  className="mt-1 text-sm text-cream/90"
                  lang={m.label === "In Bengali" ? "bn" : undefined}
                >
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </header>
  );
}

export const pageShell = "mx-auto w-full max-w-[88rem] px-5 sm:px-8";
