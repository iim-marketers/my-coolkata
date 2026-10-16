import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  Coffee,
  Gift,
  Hand,
  MapPin,
  Plus,
  Shirt,
  TrainFront,
  UserRound,
} from "lucide-react";
import { Squiggle } from "@/components/hero-backdrop";
import { pageShell } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import {
  blogPath,
  readingMinutes,
  type BlogBlock,
  type BlogFigure,
  type BlogPost,
  type BlogStep,
  type GuideIcon,
} from "@/lib/kolkata/blog";
import { photos } from "@/lib/kolkata/photos";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { ReadingBar } from "./reading-bar";
import { RichText } from "./rich-text";
import { ShareActions } from "./share-actions";

const ICONS: Record<GuideIcon, typeof MapPin> = {
  pin: MapPin,
  train: TrainFront,
  calendar: CalendarDays,
  shirt: Shirt,
  camera: Camera,
  cha: Coffee,
  hand: Hand,
  name: UserRound,
  gift: Gift,
};

const text = "mx-auto w-full max-w-2xl px-5 sm:px-0";
const pad = (n: number) => String(n).padStart(2, "0");

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function BlogArticle({ post }: { post: BlogPost }) {
  const steps = post.sections
    .flatMap((s) => s.blocks)
    .flatMap((b) => (b.kind === "steps" ? b.steps : []));
  const chapters = [
    ...post.sections.map((s) => ({ id: s.id, label: s.nav })),
    { id: post.closing.id, label: post.closing.nav },
  ];
  let chapter = 0;

  return (
    <>
      <Cover post={post} />
      <ReadingBar
        chapters={chapters}
        steps={steps.map((s, i) => ({
          id: `step-${i + 1}`,
          label: s.title.split(":")[0],
        }))}
      />

      <article id="article">
        {post.sections.map((section, si) => {
          const number = section.title ? ++chapter : 0;
          return (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={
                section.title ? `${section.id}-title` : undefined
              }
              className={cn(
                "scroll-mt-28 py-16 sm:py-20",
                section.tone === "tint" &&
                  "border-y border-border bg-secondary/50",
              )}
            >
              {section.title ? (
                <Reveal className={cn(text, "mb-10")}>
                  <p className="font-mono text-[0.66rem] tracking-[0.24em] text-terracotta uppercase">
                    Chapter {pad(number)}
                    <span className="mx-2 text-border">/</span>
                    {section.nav}
                  </p>
                  <h2
                    id={`${section.id}-title`}
                    className="mt-4 font-display text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.025em] text-balance"
                  >
                    {section.title}
                  </h2>
                </Reveal>
              ) : null}

              <div className="space-y-7">
                {section.blocks.map((block, bi) => (
                  <Block key={bi} block={block} />
                ))}
              </div>

              {si === 0 ? <Glance post={post} /> : null}
            </section>
          );
        })}

        <Closing post={post} />
      </article>

      <Related post={post} />
    </>
  );
}

function Cover({ post }: { post: BlogPost }) {
  const cover = photos[post.cover];
  const split = post.title.indexOf(":");
  const overline = post.title.slice(0, split + 1);
  const rest = post.title.slice(split + 1).trim();
  const lastSpace = rest.lastIndexOf(" ");

  return (
    <header className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink pt-16 text-cream">
      <div className="hero-zoom absolute inset-0 -z-20">
        <CityScene
          photo={post.cover}
          preload
          sizes="100vw"
          className="h-full w-full"
          imgClassName="object-[50%_30%]"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,oklch(0.14_0.02_265/0.95)_0%,oklch(0.14_0.02_265/0.7)_38%,oklch(0.14_0.02_265/0.15)_75%,oklch(0.14_0.02_265/0.45)_100%)]"
      />
      <p
        aria-hidden
        lang="bn"
        className="hero-rise pointer-events-none absolute top-24 -right-3 -z-10 font-bangla-display text-[clamp(4.5rem,15vw,14rem)] leading-none text-cream/12"
      >
        {post.bengaliTitle}
      </p>

      <div className={cn(pageShell, "pt-28 pb-12 sm:pb-16")}>
        <h1
          className="hero-rise mt-6 max-w-5xl font-display font-extrabold tracking-[-0.035em] text-balance"
          style={{ animationDelay: "100ms" }}
        >
          <span className="block text-[clamp(1.1rem,2.4vw,1.6rem)] font-semibold tracking-[-0.01em] text-marigold">
            {overline}
          </span>
          <span className="mt-3 block text-[clamp(2.5rem,7vw,6rem)] leading-[0.95]">
            {rest.slice(0, lastSpace + 1)}
            <span className="relative inline-block">
              {rest.slice(lastSpace + 1)}
              <Squiggle className="absolute bottom-[-0.12em] left-0 -z-10 h-[0.26em] w-full text-terracotta" />
            </span>
          </span>
        </h1>

        <p
          className="hero-rise mt-6 max-w-2xl text-[1.04rem] leading-relaxed text-cream/85 sm:text-[1.14rem]"
          style={{ animationDelay: "160ms" }}
        >
          {post.standfirst}
        </p>

        <dl
          className="hero-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.82rem] text-cream/80"
          style={{ animationDelay: "220ms" }}
        >
          <Meta label="By" value={post.author} />
          <Meta
            label="Published"
            value={formatDate(post.published)}
            dateTime={post.published}
          />
          <Meta label="Read" value={`${readingMinutes(post)} min`} />
          {post.reviewedBy ? (
            <Meta label="Fact-checked with" value={post.reviewedBy} />
          ) : null}
        </dl>
      </div>

      <a
        href={cover.credit.source}
        target="_blank"
        rel="noopener"
        className="absolute right-4 bottom-3 font-mono text-[0.56rem] tracking-[0.14em] text-cream/45 uppercase hover:text-cream"
      >
        Photo · {cover.credit.author} · {cover.credit.license}
      </a>
    </header>
  );
}

function Meta({
  label,
  value,
  dateTime,
}: {
  label: string;
  value: string;
  dateTime?: string;
}) {
  return (
    <div className="flex items-baseline gap-2">
      <dt className="font-mono text-[0.6rem] tracking-[0.2em] text-cream/50 uppercase">
        {label}
      </dt>
      <dd className="font-semibold text-cream">
        {dateTime ? <time dateTime={dateTime}>{value}</time> : value}
      </dd>
    </div>
  );
}

function Glance({ post }: { post: BlogPost }) {
  return (
    <div className="mx-auto mt-14 w-full max-w-5xl px-5 sm:px-8">
      <Reveal>
        <div className="kantha rounded-3xl bg-khadi p-7 sm:p-10">
          <p className="font-mono text-[0.64rem] tracking-[0.24em] text-alta uppercase">
            At a glance
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
            {post.glance.map((g) => (
              <div
                key={g.label}
                className="border-l-2 border-terracotta/40 pl-4"
              >
                <dt className="sr-only">{g.label}</dt>
                <dd className="font-display text-[clamp(1.4rem,3vw,2rem)] leading-none font-extrabold text-terracotta">
                  {g.value}
                </dd>
                <dd className="mt-2 text-[0.84rem] leading-snug text-muted-foreground">
                  {g.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      <Reveal delay={80} className="mt-10">
        <p className="font-mono text-[0.64rem] tracking-[0.24em] text-muted-foreground uppercase">
          Words you will hear in the lanes
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {post.glossary.map((g) => (
            <li
              key={g.roman}
              className="rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm"
            >
              <p
                lang="bn"
                className="text-[1.15rem] font-semibold text-foreground"
              >
                {g.bengali}
              </p>
              <p className="mt-0.5 text-[0.82rem] font-medium text-terracotta italic">
                {g.roman}
              </p>
              <p className="mt-1.5 text-[0.76rem] leading-snug text-muted-foreground">
                {g.meaning}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.kind) {
    case "lead":
      return (
        <Reveal className={text}>
          <p className="text-[1.22rem] leading-[1.7] text-foreground/90 first-letter:float-left first-letter:mt-1.5 first-letter:mr-3 first-letter:font-display first-letter:text-[4.4em] first-letter:leading-[0.8] first-letter:font-extrabold first-letter:text-terracotta sm:text-[1.32rem]">
            <RichText text={block.text} />
          </p>
        </Reveal>
      );
    case "para":
      return (
        <Reveal className={text}>
          <p className="text-[1.06rem] leading-[1.85] text-foreground/85">
            <RichText text={block.text} />
          </p>
        </Reveal>
      );
    case "figure":
      return (
        <Reveal
          className={cn(
            "mx-auto w-full px-5 sm:px-8",
            block.wide ? "max-w-5xl py-4" : "max-w-2xl",
          )}
        >
          <Figure
            figure={block.figure}
            sizes="(min-width: 1024px) 64rem, 100vw"
          />
        </Reveal>
      );
    case "pair":
      return (
        <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-3 px-5 py-4 sm:gap-6 sm:px-8">
          {block.figures.map((f, i) => (
            <Reveal
              key={f.photo}
              delay={i * 120}
              className={cn(i === 1 && "mt-10 sm:mt-20")}
            >
              <Figure figure={f} sizes="(min-width: 1024px) 28rem, 50vw" />
            </Reveal>
          ))}
        </div>
      );
    case "etymology":
      return <Etymology block={block} />;
    case "steps":
      return <Steps steps={block.steps} />;
    case "guide":
      return <Guide block={block} />;
    case "etiquette":
      return (
        <ul className="mx-auto grid w-full max-w-4xl gap-3 px-5 sm:grid-cols-3 sm:px-8">
          {block.items.map((item, i) => {
            const Icon = ICONS[item.icon];
            return (
              <Reveal as="li" key={i} delay={i * 90} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <span className="grid size-10 place-items-center rounded-full bg-terracotta/10 text-terracotta">
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <p className="mt-4 text-[0.98rem] leading-relaxed font-medium">
                    <RichText text={item.text} />
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      );
    case "faq":
      return (
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          {block.items.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details
                name="faq"
                className="group border-b border-border py-1 first:border-t"
                open={i === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                  <h3 className="font-display text-[1.12rem] leading-snug font-semibold transition-colors group-hover:text-terracotta sm:text-[1.24rem]">
                    {item.q}
                  </h3>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-card transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-open:bg-terracotta group-open:text-cream">
                    <Plus className="size-4" />
                  </span>
                </summary>
                <p className="pr-12 pb-6 text-[1rem] leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      );
  }
}

function Figure({
  figure,
  sizes,
  className,
}: {
  figure: BlogFigure;
  sizes: string;
  className?: string;
}) {
  const photo = photos[figure.photo];
  const ratio = Math.max(photo.image.width / photo.image.height, 0.8);
  return (
    <figure className={cn("group", className)}>
      <div
        className="relative overflow-hidden rounded-2xl bg-muted shadow-[0_24px_50px_-30px_oklch(0.25_0.04_265/0.55)] ring-1 ring-foreground/5"
        style={{ aspectRatio: ratio }}
      >
        <CityScene
          photo={figure.photo}
          sizes={sizes}
          className="h-full w-full"
          imgClassName="transition-transform duration-1400 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-[0.86rem] leading-snug text-foreground/75">
          <RichText text={figure.caption} />
        </span>
        <a
          href={photo.credit.source}
          target="_blank"
          rel="noopener"
          className="font-mono text-[0.56rem] tracking-[0.14em] text-muted-foreground/80 uppercase hover:text-terracotta"
        >
          {photo.credit.author} · {photo.credit.license}
        </a>
      </figcaption>
    </figure>
  );
}

function Etymology({
  block,
}: {
  block: Extract<BlogBlock, { kind: "etymology" }>;
}) {
  const cell =
    "rounded-2xl border border-border bg-card px-5 py-5 text-center shadow-sm";
  const sign = "font-display text-2xl font-bold text-muted-foreground/60";
  return (
    <Reveal className="mx-auto w-full max-w-3xl px-5 py-4 sm:px-8">
      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        {block.parts.map((p, i) => (
          <div key={p.roman} className="contents">
            {i > 0 ? (
              <span aria-hidden className={cn(sign, "text-center")}>
                +
              </span>
            ) : null}
            <div className={cn(cell, "min-w-0 flex-1")}>
              <p
                lang="bn"
                className="font-bangla-display text-[1.8rem] leading-tight text-foreground sm:text-[2.2rem]"
              >
                {p.bengali}
              </p>
              <p className="mt-1 text-[0.9rem] font-medium text-terracotta italic">
                {p.roman}
              </p>
              <p className="mt-0.5 font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
                {p.meaning}
              </p>
            </div>
          </div>
        ))}
        <span aria-hidden className={cn(sign, "hidden text-center sm:block")}>
          =
        </span>
        <div className="w-full rounded-2xl bg-ink px-6 py-5 text-center text-cream sm:w-auto sm:flex-[1.4]">
          <p
            lang="bn"
            className="font-bangla-display text-[2.6rem] leading-tight text-marigold"
          >
            {block.whole.bengali}
          </p>
          <p className="mt-1 font-display text-[1.05rem] font-bold">
            {block.whole.roman}
          </p>
          <p className="mt-0.5 font-mono text-[0.6rem] tracking-[0.2em] text-cream/60 uppercase">
            The potters’ quarter
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function StageMeter({ n, total }: { n: number; total: number }) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <div
        role="img"
        aria-label={`Stage ${n} of ${total}`}
        className="flex flex-1 gap-1"
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i + 1 < n && "bg-kansa",
              i + 1 === n && "bg-terracotta",
              i + 1 > n && "bg-border",
            )}
          />
        ))}
      </div>
      <span className="font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground uppercase">
        Straw → Goddess
      </span>
    </div>
  );
}

function StepText({
  step,
  n,
  total,
  dark = false,
}: {
  step: BlogStep;
  n: number;
  total: number;
  dark?: boolean;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
        <span
          aria-hidden
          className={cn(
            "font-display text-[clamp(4rem,9vw,6.5rem)] leading-[0.8] font-extrabold text-transparent",
            dark
              ? "[-webkit-text-stroke:2px_var(--marigold)]"
              : "[-webkit-text-stroke:2px_var(--terracotta)]",
          )}
        >
          {pad(n)}
        </span>
        <div className="flex flex-wrap gap-2 pb-1">
          {step.bengali ? (
            <span
              lang="bn"
              className={cn(
                "rounded-full px-3 py-1 text-[0.9rem] font-semibold",
                dark
                  ? "bg-marigold text-ink"
                  : "bg-terracotta/10 text-terracotta",
              )}
            >
              {step.bengali}
            </span>
          ) : null}
          {step.when ? (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[0.74rem] font-semibold",
                dark
                  ? "border-cream/25 text-cream/85"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              <CalendarDays className="size-3.5" />
              {step.when}
            </span>
          ) : null}
        </div>
      </div>

      <h3 className="mt-5 font-display text-[clamp(1.4rem,2.8vw,1.9rem)] leading-tight font-bold tracking-[-0.015em]">
        <span className="sr-only">{n}. </span>
        {step.title}
      </h3>
      {dark ? null : <StageMeter n={n} total={total} />}
      <div
        className={cn(
          "mt-5 space-y-4 text-[1.03rem] leading-[1.8]",
          dark ? "text-cream/80" : "text-foreground/85",
        )}
      >
        {step.body.map((p, i) => (
          <p key={i}>
            <RichText text={p} />
          </p>
        ))}
      </div>
    </div>
  );
}

function Steps({ steps }: { steps: BlogStep[] }) {
  const total = steps.length;
  return (
    <ol className="relative mt-6">
      {steps.map((step, i) => {
        const n = i + 1;
        if (step.sacred) {
          return (
            <li
              key={n}
              id={`step-${n}`}
              data-tone="dark"
              className="relative isolate my-16 scroll-mt-32 overflow-hidden bg-ink py-16 text-cream sm:my-24 sm:py-24"
            >
              <div
                aria-hidden
                className="absolute top-0 left-1/4 -z-10 size-160 -translate-x-1/2 -translate-y-1/3 rounded-full bg-marigold/15 blur-3xl"
              />
              <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                <Reveal>
                  <div
                    className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] ring-1 ring-cream/10"
                    style={{ aspectRatio: 0.8 }}
                  >
                    <CityScene
                      photo={step.figure.photo}
                      sizes="(min-width: 1024px) 28rem, 90vw"
                      className="h-full w-full"
                    />
                  </div>
                  <p className="mx-auto mt-3 flex max-w-md flex-wrap justify-between gap-x-4 text-[0.84rem] text-cream/65">
                    <span>
                      <RichText text={step.figure.caption} />
                    </span>
                    <a
                      href={photos[step.figure.photo].credit.source}
                      target="_blank"
                      rel="noopener"
                      className="font-mono text-[0.56rem] tracking-[0.14em] text-cream/45 uppercase hover:text-cream"
                    >
                      {photos[step.figure.photo].credit.author} ·{" "}
                      {photos[step.figure.photo].credit.license}
                    </a>
                  </p>
                </Reveal>
                <Reveal delay={120}>
                  <StepText step={step} n={n} total={total} dark />
                  {step.pullQuote ? (
                    <blockquote className="mt-10 border-l-2 border-marigold pl-6 font-display text-[clamp(1.4rem,3vw,2.1rem)] leading-snug font-semibold text-balance text-marigold">
                      “{step.pullQuote}”
                    </blockquote>
                  ) : null}
                </Reveal>
              </div>
            </li>
          );
        }

        const flip = i % 2 === 1;
        return (
          <li
            key={n}
            id={`step-${n}`}
            className="relative mx-auto grid w-full max-w-6xl scroll-mt-32 items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-20"
          >
            <span
              aria-hidden
              className="absolute top-0 bottom-0 left-1/2 hidden w-px -translate-x-1/2 bg-linear-to-b from-kansa/0 via-kansa to-terracotta/60 lg:block"
            />
            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 hidden size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta ring-6 ring-secondary lg:block"
            />
            <Reveal className={cn(flip && "lg:order-2")}>
              <StepText step={step} n={n} total={total} />
            </Reveal>
            <Reveal delay={120} className={cn(flip && "lg:order-1")}>
              <Figure
                figure={step.figure}
                sizes="(min-width: 1024px) 34rem, 100vw"
              />
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

function Guide({ block }: { block: Extract<BlogBlock, { kind: "guide" }> }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Reveal>
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_30px_60px_-40px_oklch(0.25_0.04_265/0.5)] lg:grid lg:grid-cols-[1.25fr_0.75fr]">
          <div className="p-6 sm:p-10">
            <p className="font-mono text-[0.64rem] tracking-[0.24em] text-terracotta uppercase">
              Field card{" "}
              <span lang="bn" className="ml-2 text-[0.8rem] tracking-normal">
                কুমোরটুলি
              </span>
            </p>
            <dl className="mt-7 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {block.rows.map((row) => {
                const Icon = ICONS[row.icon];
                return (
                  <div key={row.q} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-terracotta/10 text-terracotta">
                      <Icon className="size-[1.1rem]" />
                    </span>
                    <div>
                      <dt className="text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {row.q}
                      </dt>
                      <dd className="mt-1.5 text-[0.96rem] leading-relaxed">
                        <RichText text={row.a} />
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>

          <div className="relative border-t-2 border-dashed border-border bg-secondary/60 p-6 sm:p-8 lg:border-t-0 lg:border-l-2">
            <Figure
              figure={block.figure}
              sizes="(min-width: 1024px) 24rem, 100vw"
            />
            <a
              href={block.map.href}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.9rem] font-semibold text-cream transition-colors hover:bg-terracotta"
            >
              <MapPin className="size-4" />
              {block.map.label}
              <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

function Closing({ post }: { post: BlogPost }) {
  const { closing } = post;
  return (
    <section
      id={closing.id}
      aria-labelledby={`${closing.id}-title`}
      data-tone="dark"
      className="relative isolate scroll-mt-28 overflow-hidden bg-ink py-24 text-cream sm:py-36"
    >
      <div className="absolute inset-0 -z-20 opacity-90">
        <CityScene
          photo={closing.photo}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_50%_50%,oklch(0.14_0.02_265/0.72),oklch(0.14_0.02_265/0.35))]"
      />

      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2
            id={`${closing.id}-title`}
            className="font-mono text-[0.7rem] tracking-[0.3em] text-marigold uppercase"
          >
            {closing.title}
          </h2>
          <div className="mt-8 space-y-6 font-display text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.2] font-bold tracking-[-0.02em] text-balance">
            {closing.lines.map((l, i) => (
              <p key={i}>
                <RichText text={l} />
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-12">
          <p className="mx-auto max-w-xl text-[1.04rem] leading-relaxed text-cream/80">
            <RichText text={closing.prompt} />
          </p>
          <div className="mt-8">
            <ShareActions
              title={post.title}
              url={absoluteUrl(blogPath(post.slug))}
            />
          </div>
          <p className="mt-10 text-[0.92rem] font-medium text-cream/70">
            {closing.follow}
          </p>
        </Reveal>
      </div>

      <a
        href={photos[closing.photo].credit.source}
        target="_blank"
        rel="noopener"
        className="absolute right-4 bottom-3 font-mono text-[0.56rem] tracking-[0.14em] text-cream/40 uppercase hover:text-cream"
      >
        Photo · {photos[closing.photo].credit.author} ·{" "}
        {photos[closing.photo].credit.license}
      </a>
    </section>
  );
}

function Related({ post }: { post: BlogPost }) {
  return (
    <section
      aria-labelledby="keep-walking"
      className="border-t border-border bg-secondary/40"
    >
      <div className={cn(pageShell, "py-16 sm:py-20")}>
        <h2
          id="keep-walking"
          className="font-display text-[clamp(1.6rem,3.4vw,2.3rem)] font-extrabold tracking-[-0.02em]"
        >
          Keep walking
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {post.related.map((r, i) => (
            <Reveal as="li" key={r.href} delay={i * 90} className="h-full">
              <Link
                href={r.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-terracotta/60"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="font-display text-[1.25rem] leading-tight font-bold">
                    {r.label}
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-terracotta transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-3 text-[0.9rem] leading-relaxed text-muted-foreground">
                  {r.blurb}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
