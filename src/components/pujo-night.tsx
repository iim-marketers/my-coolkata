import Link from "next/link";
import { pageShell } from "@/components/page-header";
import { PujoCountdown } from "@/components/pujo-countdown";
import { Diya, NightLamps } from "@/components/pujo-festive";
import { Reveal } from "@/components/reveal";
import { CityScene } from "@/components/scenes/city-scene";
import { SectionLink } from "@/components/section-link";
import { pujoCalendar } from "@/lib/kolkata/pujo";
import { cn } from "@/lib/utils";

const SHUBHO: Record<string, { bn: string; en: string }> = {
  Panchami: { bn: "শুভ পঞ্চমী", en: "Shubho Panchami" },
  Shashthi: { bn: "শুভ ষষ্ঠী", en: "Shubho Shashthi" },
  Saptami: { bn: "শুভ সপ্তমী", en: "Shubho Saptami" },
  Ashtami: { bn: "শুভ অষ্টমী", en: "Shubho Ashtami" },
  Navami: { bn: "শুভ নবমী", en: "Shubho Navami" },
  Dashami: { bn: "শুভ বিজয়া", en: "Shubho Bijoya" },
};

const PRIMARY =
  "inline-flex items-center gap-2 rounded-full bg-[#f6b733] px-6 py-3 text-[0.92rem] font-semibold text-[#2a0b0d] shadow-[0_10px_30px_-10px_rgba(246,183,51,0.7)] transition-transform hover:-translate-y-0.5";
const SECONDARY =
  "inline-flex items-center gap-2 rounded-full border border-cream/30 px-6 py-3 text-[0.92rem] font-semibold text-cream transition-colors hover:border-cream/70";

const MANTRA = [
  "যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা",
  "নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ",
];

export function PujoNightHero({
  year,
  variant = "page",
}: {
  year: number;
  variant?: "page" | "home";
}) {
  const home = variant === "home";
  const rise = home ? "" : "hero-rise";
  const Root = home ? "section" : "header";
  const Title = home ? "h2" : "h1";
  const Copy = home ? Reveal : "div";

  return (
    <Root
      className={cn(
        "pujo-night relative isolate overflow-hidden text-cream",
        !home && "pt-16",
      )}
    >
      <StringLights className={home ? "top-0" : "top-16"} />
      <Toran className={home ? "top-0" : "top-16"} />
      <Shiuli />

      <div
        className={cn(
          pageShell,
          "grid items-center gap-14 pt-20 pb-20 sm:pt-24 lg:gap-10 lg:pb-24",
          home
            ? "lg:grid-cols-[0.9fr_1.1fr] lg:gap-16"
            : "lg:grid-cols-[1.1fr_0.9fr]",
        )}
      >
        <Copy className={cn("relative z-10", home && "lg:order-last")}>
          {pujoCalendar(year).map((d, i, nights) => {
            const shubho = SHUBHO[d.day];
            const next = nights[i + 1];
            return (
              <div key={i} data-pujo-only={i}>
                <p
                  className={cn(
                    rise,
                    "inline-flex items-center gap-2 rounded-full border border-[#e8c36a]/45 bg-[#e8c36a]/10 px-3.5 py-1 font-mono text-[0.6rem] tracking-[0.24em] text-[#f6d77e] uppercase",
                  )}
                >
                  <span className="size-1.5 animate-pulse rounded-full bg-[#ffb347]" />
                  {home ? "Kolkata during Puja" : `Durga Puja ${year}`} ·{" "}
                  {d.offset < 0
                    ? "The night before"
                    : `Day ${d.offset + 1} of 5`}
                </p>
                <Title
                  lang="bn"
                  className={cn(
                    rise,
                    "pujo-gold mt-1 font-bangla-display text-[clamp(3.6rem,12vw,7.5rem)] leading-[1.15]",
                  )}
                  style={{ animationDelay: "90ms" }}
                >
                  {shubho.bn}
                </Title>
                <p
                  className={cn(
                    rise,
                    "mt-1 font-mono text-[0.68rem] tracking-[0.34em] text-[#f6d77e]/80 uppercase",
                  )}
                  style={{ animationDelay: "150ms" }}
                >
                  {shubho.en}
                </p>
                <p
                  className={cn(
                    rise,
                    "mt-6 max-w-xl font-display text-[clamp(1.15rem,2.4vw,1.45rem)] leading-snug text-balance text-cream/85 italic",
                  )}
                  style={{ animationDelay: "210ms" }}
                >
                  {d.what}
                </p>
                <p
                  className={cn(
                    rise,
                    "mt-3 font-mono text-[0.6rem] tracking-[0.18em] text-[#ffb347] uppercase",
                  )}
                  style={{ animationDelay: "250ms" }}
                >
                  Tonight: {d.where}
                  {!next
                    ? " · Bisarjan at the ghats"
                    : next === d
                      ? ` · ${d.day} again tomorrow`
                      : ` · Tomorrow, ${next.day}`}
                </p>
              </div>
            );
          })}

          <NightLamps className={cn(rise, "mt-9")} />

          <div
            className={cn(rise, "mt-10 flex flex-wrap items-center gap-3")}
            style={{ animationDelay: "320ms" }}
          >
            {home ? (
              <>
                <Link href="/durga-puja#pandals" className={PRIMARY}>
                  Find a pandal tonight
                </Link>
                <Link href="/durga-puja" className={SECONDARY}>
                  Enter the Puja
                </Link>
              </>
            ) : (
              <>
                <SectionLink to="pandals" className={PRIMARY}>
                  Find a pandal tonight
                </SectionLink>
                <SectionLink to="routes" className={SECONDARY}>
                  Pandal-hopping routes
                </SectionLink>
              </>
            )}
          </div>
        </Copy>

        <PandalArch home={home} />
      </div>

      <MantraBand />
    </Root>
  );
}

function PandalArch({ home }: { home: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[25rem] lg:max-w-[27rem]">
      <div
        aria-hidden
        className="pujo-glow absolute top-[42%] left-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <div
        aria-hidden
        className="pujo-halo absolute top-[42%] left-1/2 -z-10 aspect-square w-[128%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />
      <div
        aria-hidden
        className="pujo-halo-dots absolute top-[42%] left-1/2 -z-10 aspect-square w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      <div
        className={cn(
          !home && "hero-zoom",
          "rounded-t-full bg-linear-to-b from-[#f9e29a] via-[#d9a441] to-[#7a4a16] p-1.5 shadow-[0_30px_80px_-20px_rgba(255,160,60,0.45)]",
        )}
      >
        <div className="rounded-t-full bg-[#2a0b0d] p-1.5">
          <div className="relative aspect-4/5 overflow-hidden rounded-t-full ring-1 ring-[#f6d77e]/50">
            <CityScene
              name="pujo"
              photo="hero-pujo"
              preload={!home}
              sizes="(max-width: 640px) 90vw, 28rem"
              className="h-full w-full"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#2a0b0d]/80 via-transparent to-transparent" />
            <p
              lang="bn"
              className="absolute inset-x-0 bottom-5 text-center font-bangla-display text-2xl text-[#f6d77e]"
            >
              দুর্গা মা
            </p>
          </div>
        </div>
      </div>

      <Dhunuchi />
    </div>
  );
}

function Dhunuchi() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-[-10%] bottom-[-6%] h-2/3"
    >
      {[
        { left: "8%", size: "7rem", duration: 9, delay: 0 },
        { left: "70%", size: "8rem", duration: 11, delay: 2.5 },
        { left: "30%", size: "6rem", duration: 10, delay: 5 },
        { left: "85%", size: "6.5rem", duration: 12, delay: 7 },
        { left: "50%", size: "9rem", duration: 13, delay: 4 },
      ].map((p, i) => (
        <span
          key={i}
          className="pujo-smoke absolute bottom-0 rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Toran({ className }: { className?: string }) {
  const swag = 240;
  const beads: { x: number; y: number; c: string }[] = [];
  const pendants: number[] = [];
  for (let s = 0; s < 5; s++) {
    const x0 = s * swag;
    pendants.push(x0);
    for (let k = 0; k <= 22; k++) {
      const t = k / 22;
      beads.push({
        x: x0 + t * swag,
        y: 8 + 30 * 4 * t * (1 - t),
        c: k % 2 ? "#f6b733" : "#ee7d23",
      });
    }
  }
  pendants.push(5 * swag);

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 96"
      preserveAspectRatio="xMidYMin slice"
      className={cn(
        "pujo-toran absolute inset-x-0 z-10 h-24 w-full",
        className,
      )}
    >
      {pendants.map((x) => (
        <g key={x}>
          <path d={`M${x} 8c-9 18-9 34 0 52c9-18 9-34 0-52z`} fill="#3f7d3a" />
          <path d={`M${x} 10v48`} stroke="#2c5a28" strokeWidth="1" />
          {[18, 30, 42].map((y, j) => (
            <circle
              key={y}
              cx={x}
              cy={y + 30}
              r="6"
              fill={j % 2 ? "#f6b733" : "#ee7d23"}
              stroke="#c8611a"
              strokeWidth="1"
            />
          ))}
        </g>
      ))}
      {beads.map((b, i) => (
        <circle
          key={i}
          cx={b.x}
          cy={b.y}
          r="6.4"
          fill={b.c}
          stroke="#c8611a"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

const BULB_COLOURS = [
  "#ffd166",
  "#ff6b4a",
  "#fff3d6",
  "#ff9f1c",
  "#ff5d8f",
  "#9be564",
];

function StringLights({ className }: { className?: string }) {
  const strands = [
    { width: 300, y0: 70, sag: 70, opacity: 0.9 },
    { width: 400, y0: 40, sag: 120, opacity: 0.45 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 260"
      preserveAspectRatio="xMidYMin slice"
      className={cn("absolute inset-x-0 -z-10 h-[16rem] w-full", className)}
    >
      {strands.map((s, si) => {
        const swags = Math.ceil(1200 / s.width);
        return (
          <g key={si} opacity={s.opacity}>
            {Array.from({ length: swags }, (_, w) => {
              const x0 = w * s.width;
              return (
                <g key={w}>
                  <path
                    d={`M${x0} ${s.y0}Q${x0 + s.width / 2} ${s.y0 + s.sag * 2} ${x0 + s.width} ${s.y0}`}
                    stroke="#f6d77e"
                    strokeOpacity="0.25"
                    fill="none"
                  />
                  {Array.from({ length: 13 }, (_, k) => {
                    const t = (k + 0.5) / 13;
                    const n = si * 7 + w * 13 + k;
                    return (
                      <circle
                        key={k}
                        className="pujo-bulb"
                        cx={x0 + t * s.width}
                        cy={s.y0 + s.sag * 4 * t * (1 - t)}
                        r={si ? 2.4 : 3.2}
                        fill={BULB_COLOURS[n % BULB_COLOURS.length]}
                        style={{ animationDelay: `${(n * 0.37) % 2.4}s` }}
                      />
                    );
                  })}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function Shiuli() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {[
        { left: 4, duration: 14, delay: 0, size: 18 },
        { left: 13, duration: 18, delay: 6, size: 14 },
        { left: 22, duration: 15, delay: 2.5, size: 16 },
        { left: 33, duration: 20, delay: 9, size: 12 },
        { left: 44, duration: 16, delay: 4, size: 18 },
        { left: 52, duration: 19, delay: 11, size: 13 },
        { left: 61, duration: 15, delay: 1, size: 15 },
        { left: 70, duration: 21, delay: 7.5, size: 12 },
        { left: 79, duration: 14, delay: 3.5, size: 17 },
        { left: 88, duration: 18, delay: 10, size: 14 },
        { left: 95, duration: 16, delay: 5.5, size: 16 },
      ].map((f, i) => (
        <span
          key={i}
          className="pujo-shiuli absolute -top-8"
          style={{
            left: `${f.left}%`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
          }}
        >
          <svg viewBox="-12 -12 24 24" width={f.size} height={f.size}>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse
                key={r}
                cx="0"
                cy="-5.6"
                rx="3.4"
                ry="5.6"
                fill="#fffaf0"
                transform={`rotate(${r})`}
              />
            ))}
            <circle r="2.6" fill="#f07c1b" />
          </svg>
        </span>
      ))}
    </div>
  );
}

function MantraBand() {
  const line = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {MANTRA.map((m) => (
        <span key={m} className="flex items-center gap-8">
          <span
            lang="bn"
            className="font-bangla-display text-[1.35rem] text-[#f6d77e]"
          >
            {m}
          </span>
          <span className="text-[#ffb347]/70">✦</span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="relative overflow-hidden border-y border-[#e8c36a]/35 bg-[#7d1416] py-2.5">
      <div className="pujo-marquee flex w-max">
        {line}
        {line}
        {line}
        {line}
      </div>
    </div>
  );
}

export function LaalPaar({ className }: { className?: string }) {
  return <div aria-hidden className={cn("laal-paar", className)} />;
}

export function AschheBochor() {
  return (
    <section className="pujo-night relative isolate overflow-hidden text-center text-cream">
      <LaalPaar />
      <div className={cn(pageShell, "py-20 sm:py-28")}>
        <p className="font-mono text-[0.6rem] tracking-[0.3em] text-[#f6d77e]/80 uppercase">
          On Dashami, at the ghats
        </p>
        <p
          lang="bn"
          className="pujo-gold mt-1 font-bangla-display text-[clamp(2.6rem,9vw,6rem)] leading-[1.2]"
        >
          আসছে বছর আবার হবে
        </p>
        <p className="mx-auto mt-5 max-w-xl font-display text-[1.1rem] leading-snug text-cream/80 italic">
          &ldquo;Aschhe bochor abar hobe.&rdquo; It happens again next year. The
          dhak plays, the sindoor flies, and the city walks her to the river.
        </p>
      </div>
    </section>
  );
}

export function PujoBijoya({
  year,
  variant = "page",
}: {
  year: number;
  variant?: "page" | "home";
}) {
  const home = variant === "home";
  const rise = home ? "" : "hero-rise";
  const Root = home ? "section" : "header";
  const Title = home ? "h2" : "h1";
  const Copy = home ? Reveal : "div";

  return (
    <Root
      className={cn(
        "pujo-dusk relative isolate overflow-hidden text-center text-cream",
        !home && "pt-16",
      )}
    >
      <Abir />
      <Shiuli />

      <Copy
        className={cn(pageShell, "relative z-10 pt-12 pb-40 sm:pt-14 sm:pb-48")}
      >
        <p
          className={cn(
            rise,
            "inline-flex items-center gap-2 rounded-full border border-[#e8c36a]/45 bg-[#e8c36a]/10 px-3.5 py-1 font-mono text-[0.6rem] tracking-[0.24em] text-[#f6d77e] uppercase",
          )}
        >
          Durga Puja {year} · After the bisarjan
        </p>
        <Title
          lang="bn"
          className={cn(
            rise,
            "pujo-gold mt-2 font-bangla-display text-[clamp(3.6rem,12vw,7.5rem)] leading-[1.15]",
          )}
          style={{ animationDelay: "90ms" }}
        >
          শুভ বিজয়া
        </Title>
        <p
          className={cn(
            rise,
            "mt-1 font-mono text-[0.68rem] tracking-[0.34em] text-[#f6d77e]/80 uppercase",
          )}
          style={{ animationDelay: "150ms" }}
        >
          Shubho Bijoya
        </p>
        <p
          lang="bn"
          className={cn(
            rise,
            "mt-5 font-bangla-display text-[clamp(1.7rem,4.6vw,2.8rem)] leading-snug text-cream/90",
          )}
          style={{ animationDelay: "210ms" }}
        >
          আসছে বছর আবার হবে
        </p>
        <p
          className={cn(
            rise,
            "mx-auto mt-2 max-w-lg text-[0.95rem] leading-relaxed text-balance text-cream/65",
          )}
          style={{ animationDelay: "250ms" }}
        >
          Aschhe bochor abar hobe: she comes again next year. Until then the
          city visits its elders, touches their feet and hands round the mishti.
        </p>

        <PujoCountdown compact className={cn(rise, "mt-9")} />

        <div className="mt-8 flex justify-center">
          {home ? (
            <Link href="/durga-puja" className={PRIMARY}>
              Enter the Puja
            </Link>
          ) : (
            <SectionLink to="the-making" className={PRIMARY}>
              Relive the five days
            </SectionLink>
          )}
        </div>
      </Copy>

      <River />
    </Root>
  );
}

function Abir() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {[
        { left: "-6%", top: "4%", size: "26rem", delay: 0 },
        { left: "62%", top: "-10%", size: "30rem", delay: -7 },
        { left: "28%", top: "30%", size: "22rem", delay: -13 },
        { left: "80%", top: "38%", size: "18rem", delay: -4 },
      ].map((b, i) => (
        <span
          key={i}
          className="pujo-abir absolute rounded-full"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// Periods must divide 1200 so the half-width slide loops seamlessly.
const RIVER_LAYERS = [
  { y: 46, amp: 6, period: 400, fill: "oklch(0.32 0.07 248)", duration: 46 },
  { y: 84, amp: 5, period: 300, fill: "oklch(0.25 0.06 252)", duration: 32 },
  { y: 126, amp: 4, period: 600, fill: "oklch(0.19 0.05 256)", duration: 22 },
];

function wave(y: number, amp: number, period: number) {
  let d = `M0 ${y}`;
  for (let x = 20; x <= 2400; x += 20) {
    d += `L${x} ${(y + amp * Math.sin((x / period) * 2 * Math.PI)).toFixed(1)}`;
  }
  return `${d}L2400 200L0 200Z`;
}

function River() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-36 overflow-hidden sm:h-44"
    >
      {RIVER_LAYERS.map((l) => (
        <svg
          key={l.y}
          viewBox="0 0 2400 200"
          preserveAspectRatio="none"
          className="pujo-river absolute bottom-0 left-0 h-full w-[200%]"
          style={{ animationDuration: `${l.duration}s` }}
        >
          <path d={wave(l.y, l.amp, l.period)} fill={l.fill} />
        </svg>
      ))}
      {[
        { left: "12%", bottom: "48%", delay: 0 },
        { left: "34%", bottom: "22%", delay: -1.6 },
        { left: "63%", bottom: "40%", delay: -3.1 },
        { left: "85%", bottom: "18%", delay: -0.8 },
      ].map((f) => (
        <div
          key={f.left}
          className="absolute"
          style={{ left: f.left, bottom: f.bottom }}
        >
          <span className="absolute top-[85%] left-1/2 h-12 w-2.5 -translate-x-1/2 bg-linear-to-b from-[#ffb347]/45 to-transparent blur-[3px]" />
          <div className="pujo-float" style={{ animationDelay: `${f.delay}s` }}>
            <Diya lit today={false} delay={0} />
          </div>
        </div>
      ))}
    </div>
  );
}
