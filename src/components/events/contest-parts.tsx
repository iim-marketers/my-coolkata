import { ArrowUpRight, Camera, Check, Clapperboard, Plus } from "lucide-react";
import { CityScene } from "@/components/scenes/city-scene";
import {
  contestFaqs,
  contestSteps,
  contestTracks,
  currentSeason,
  pad,
  statusLabel,
} from "@/lib/kolkata/contest";
import { cn } from "@/lib/utils";

/**
 * The enter button. It only links anywhere once the season is open and has
 * an entry form; until then it is a quiet status pill with a REC light.
 */
export function EntryButton({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const season = currentSeason;
  if (season.status === "open" && season.entryUrl) {
    return (
      <a
        href={season.entryUrl}
        target="_blank"
        rel="noopener"
        className={cn(
          "group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.9rem] font-semibold text-primary-foreground shadow-lg transition-transform hover:-translate-y-0.5",
          className,
        )}
      >
        Enter Season {pad(season.number)}
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    );
  }
  return (
    <span
      aria-disabled="true"
      className={cn(
        "inline-flex cursor-not-allowed items-center gap-2.5 rounded-full px-5 py-2.5 text-[0.9rem] font-semibold",
        tone === "dark"
          ? "bg-khadi/12 text-khadi/85"
          : "bg-foreground/[0.07] text-foreground/65",
        className,
      )}
    >
      <span className="rec-dot size-2 rounded-full bg-alta" />
      {statusLabel[season.status]}
    </span>
  );
}

/** Crop marks for the four corners of a frame. */
function CropMarks({ className }: { className?: string }) {
  return (
    <>
      {[
        "top-4 left-4 border-t-2 border-l-2",
        "top-4 right-4 border-t-2 border-r-2",
        "bottom-4 left-4 border-b-2 border-l-2",
        "bottom-4 right-4 border-b-2 border-r-2",
      ].map((corner) => (
        <span
          key={corner}
          aria-hidden
          className={cn("absolute size-8 sm:size-12", corner, className)}
        />
      ))}
    </>
  );
}

/** The season, seen through a camera's viewfinder. */
export function Viewfinder() {
  const season = currentSeason;
  const readout = [
    ["Formats", "Photo + video"],
    ["Opens", season.opens ?? "To be announced"],
    ["Closes", season.closes ?? "To be announced"],
    ["Prize", `Internship · ${season.internship}`],
  ];

  return (
    <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-ink text-khadi shadow-[0_40px_80px_-40px_oklch(0.2_0.03_265/0.75)]">
      <CityScene
        photo="kumartuli-lane"
        sizes="(max-width: 1024px) 100vw, 88rem"
        className="absolute inset-0 -z-10 h-full w-full opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_75%_at_50%_45%,oklch(0.14_0.02_265/0.35),oklch(0.12_0.02_265/0.9))]" />
      {/* <div
        aria-hidden
        className="viewfinder-thirds absolute inset-10 sm:inset-16"
      /> */}
      <CropMarks className="border-khadi/80" />

      <div className="relative flex items-center justify-between gap-4 px-8 pt-8 font-mono text-[0.6rem] tracking-[0.2em] uppercase sm:px-16 sm:pt-12">
        <span className="flex items-center gap-2">
          <span className="rec-dot size-2.5 rounded-full bg-alta" />
          REC · S{pad(season.number)}
        </span>
        <span className="text-khadi/70">{statusLabel[season.status]}</span>
      </div>

      <div className="relative px-8 py-14 text-center sm:px-16 sm:py-20">
        <p className="font-mono text-[0.64rem] tracking-[0.3em] text-marigold uppercase">
          Season {pad(season.number)} · The theme
        </p>
        <p
          lang="bn"
          className="mt-4 font-bangla-display text-[clamp(3rem,9vw,6.5rem)] leading-[1.05] text-marigold"
        >
          {season.bengali}
        </p>
        <h2 className="mt-1 font-display text-[clamp(2rem,5.5vw,4rem)] leading-none font-extrabold tracking-[-0.03em]">
          {season.theme}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-khadi/75">
          {season.brief}
        </p>
        <div className="mt-8 flex justify-center">
          <EntryButton tone="dark" />
        </div>
      </div>

      <dl className="relative grid grid-cols-2 gap-x-6 gap-y-4 border-t border-khadi/15 px-8 py-6 font-mono text-[0.58rem] tracking-[0.18em] uppercase sm:grid-cols-4 sm:px-16 sm:pb-10">
        {readout.map(([label, value]) => (
          <div key={label}>
            <dt className="text-khadi/45">{label}</dt>
            <dd className="mt-1 text-[0.7rem] text-khadi">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** The photo track, as a frame cut from a strip of negative. */
export function PhotoTrack() {
  const track = contestTracks.photo;
  return (
    <article className="flex h-full flex-col rounded-[1.5rem] bg-ink p-2 text-khadi shadow-[0_30px_60px_-35px_oklch(0.2_0.03_265/0.7)]">
      <div aria-hidden className="sprockets mx-4 mt-2 h-2.5" />
      <div className="m-2 flex flex-1 flex-col rounded-xl bg-[oklch(0.28_0.04_45)] p-7 sm:p-9">
        <div className="flex items-center justify-between font-mono text-[0.58rem] tracking-[0.22em] text-marigold uppercase">
          <span>Kolkata 400</span>
          <span>▸ 24A</span>
        </div>
        <Camera className="mt-8 size-9 text-marigold" strokeWidth={1.6} />
        <p
          lang="bn"
          className="mt-4 font-bangla-display text-5xl leading-tight text-marigold"
        >
          {track.bengali}
        </p>
        <h3 className="font-display text-3xl leading-tight font-extrabold tracking-tight">
          {track.title}
        </h3>
        <p className="mt-3 max-w-md text-[0.96rem] leading-relaxed text-khadi/75">
          {track.brief}
        </p>
        <ul className="mt-7 space-y-2.5">
          {track.specs.map((spec) => (
            <li key={spec} className="flex gap-3 text-[0.92rem]">
              <Check className="mt-0.5 size-4 shrink-0 text-marigold" />
              {spec}
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden className="sprockets mx-4 mb-2 h-2.5" />
    </article>
  );
}

/** The video track, as a clapperboard slate. */
export function VideoTrack() {
  const track = contestTracks.video;
  const slate = [
    ["Roll", `S${pad(currentSeason.number)}`],
    ["Scene", "One para"],
    ["Take", "30–90 sec"],
  ];
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-ink text-khadi shadow-[0_30px_60px_-35px_oklch(0.2_0.03_265/0.7)]">
      <div aria-hidden className="px-6 pt-16 sm:px-9">
        <div className="clapper-stripes h-6 origin-bottom-left -rotate-[5deg] rounded-sm" />
        <div className="clapper-stripes mt-1 h-6 rounded-sm" />
      </div>
      <div className="flex flex-1 flex-col p-7 pt-6 sm:p-9 sm:pt-7">
        {/* <dl className="grid grid-cols-3 rounded-md border border-khadi/25 font-mono text-[0.54rem] tracking-[0.18em] uppercase">
          {slate.map(([label, value], i) => (
            <div
              key={label}
              className={cn("p-3", i > 0 && "border-l border-khadi/25")}
            >
              <dt className="text-khadi/45">{label}</dt>
              <dd className="mt-1 text-[0.78rem] tracking-[0.08em] text-khadi">
                {value}
              </dd>
            </div>
          ))}
        </dl> */}
        <Clapperboard className=" size-9 text-marigold" strokeWidth={1.6} />
        <p
          lang="bn"
          className="mt-4 font-bangla-display text-5xl leading-tight text-marigold"
        >
          {track.bengali}
        </p>
        <h3 className="font-display text-3xl leading-tight font-extrabold tracking-tight">
          {track.title}
        </h3>
        <p className="mt-3 max-w-md text-[0.96rem] leading-relaxed text-khadi/75">
          {track.brief}
        </p>
        <ul className="mt-7 space-y-2.5">
          {track.specs.map((spec) => (
            <li key={spec} className="flex gap-3 text-[0.92rem]">
              <Check className="mt-0.5 size-4 shrink-0 text-marigold" />
              {spec}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/** The steps from camera roll to crew, as frames on a strip of film. */
export function FilmStrip() {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8">
      <ol className="flex w-max rounded-2xl bg-ink p-1.5 text-khadi lg:w-full">
        {contestSteps.map((step, i) => (
          <li
            key={step.title}
            className="flex w-60 shrink-0 flex-col lg:w-auto lg:flex-1"
          >
            <div aria-hidden className="sprockets mx-3 mt-1.5 h-2.5" />
            <div className="m-1.5 flex flex-1 flex-col rounded-lg bg-[oklch(0.3_0.03_265)] p-5">
              <p className="flex items-center justify-between font-mono text-[0.58rem] tracking-[0.2em] text-marigold uppercase">
                <span>▸ {pad(i + 1)}</span>
                {i === contestSteps.length - 1 ? <span>★</span> : null}
              </p>
              <p className="mt-8 font-display text-xl leading-tight font-bold">
                {step.title}
              </p>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-khadi/70">
                {step.line}
              </p>
            </div>
            <div aria-hidden className="sprockets mx-3 mb-1.5 h-2.5" />
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The prize, as a crew pass on a lanyard. */
export function CrewPass() {
  const season = currentSeason;
  const fields = [
    ["Name", "Could be you"],
    ["Role", "Photo / video intern"],
    ["Term", season.internship],
    ["Base", "Kolkata"],
  ];
  return (
    <div className="relative mx-auto w-full max-w-sm pt-2">
      <div className="hero-float -mt-2">
        <div className="rotate-[-4deg] overflow-hidden rounded-[1.4rem] bg-card shadow-[0_40px_70px_-35px_oklch(0.2_0.04_265/0.6)] ring-1 ring-foreground/10">
          <div className="flex items-center justify-between bg-alta px-5 py-3 text-khadi">
            <span className="font-display text-[0.9rem] font-extrabold tracking-[0.12em] uppercase">
              Cool-kata crew
            </span>
            <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase">
              Season {pad(season.number)}
            </span>
          </div>
          <div className="grid grid-cols-[6rem_1fr] gap-5 p-5">
            <div className="flex aspect-3/4 flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-border bg-muted/60 text-center text-muted-foreground">
              <Camera className="size-6" strokeWidth={1.6} />
              <span className="px-1 text-[0.6rem] leading-tight">
                Your face here
              </span>
            </div>
            <dl className="space-y-2.5 text-[0.82rem]">
              {fields.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[0.54rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    {label}
                  </dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-end justify-between gap-4 border-t border-dashed border-border px-5 py-4">
            <div aria-hidden className="barcode h-9 w-32" />
            <span
              lang="bn"
              className="font-bangla-display text-2xl leading-none text-alta"
            >
              শহরের চোখ
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** One season after another: this one live, the next ones still blank. */
export function SeasonRoll() {
  const season = currentSeason;
  const upcoming = [1, 2, 3].map((n) => season.number + n);
  return (
    <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <li className="relative flex aspect-4/5 flex-col justify-between overflow-hidden rounded-2xl bg-ink p-5 text-khadi">
        <span className="font-mono text-[0.58rem] tracking-[0.2em] text-marigold uppercase">
          Season {pad(season.number)}
        </span>
        <div>
          <span className="rec-dot mb-3 inline-block size-2.5 rounded-full bg-alta" />
          <p className="font-display text-xl leading-tight font-bold">
            {season.theme}
          </p>
          <p className="mt-1 text-[0.8rem] text-khadi/60">
            {statusLabel[season.status]}
          </p>
        </div>
      </li>
      {upcoming.map((n, i) => (
        <li
          key={n}
          className="flex aspect-4/5 flex-col justify-between rounded-2xl border-2 border-dashed border-border p-5 text-muted-foreground"
        >
          <span className="font-mono text-[0.58rem] tracking-[0.2em] uppercase">
            Season {pad(n)}
          </span>
          <div>
            <Plus className="mb-3 size-5" />
            <p className="font-display text-lg leading-tight font-bold text-foreground/70">
              {i === upcoming.length - 1
                ? "And the one after that"
                : "A new theme"}
            </p>
            <p className="mt-1 text-[0.8rem]">To be announced</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Questions, as plain disclosure widgets: no script, and keyboard friendly. */
export function ContestFaq() {
  return (
    <div className="divide-y divide-border rounded-[1.5rem] border border-border bg-card">
      {contestFaqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.05rem] font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="size-4 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-muted-foreground">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
