"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import dhak from "@/assets/dhak.webp";
import { pujoNow } from "@/components/use-pujo-phase";
import {
  pujoNightIndex,
  pujoNights,
  pujoNightWindows,
} from "@/lib/kolkata/pujo";
import { cn } from "@/lib/utils";

const DEV_CLOCK =
  process.env.NODE_ENV === "production"
    ? ""
    : `var q=new URLSearchParams(location.search).get("pujoNow");if(q){var a=new Date(/[zZ]|[+-]\\d\\d:?\\d\\d$/.test(q)?q:q+"+05:30").getTime();if(a===a)t=a}`;

const MARK_SCRIPT = `(function(){try{var t=Date.now();${DEV_CLOCK}var w=${JSON.stringify(pujoNightWindows())};for(var i=0;i<w.length;i++)if(t>=w[i][0]&&t<w[i][1]){var r=document.documentElement;r.dataset.pujo="festive";r.dataset.pujoDay=Math.floor((t-w[i][0])/864e5);return}}catch(e){}})()`;

function mark(night: number) {
  const root = document.documentElement;
  if (night < 0) {
    delete root.dataset.pujo;
    delete root.dataset.pujoDay;
    return;
  }
  root.dataset.pujo = "festive";
  root.dataset.pujoDay = String(night);
}

/**
 * Dresses the page for Panchami to Dashami by marking `<html>`. The inline
 * script does it before first paint on a full load; the effect covers client
 * navigations, midnight, and leaving the page.
 */
export function PujoFestiveSwitch() {
  useLayoutEffect(() => {
    const update = () => mark(pujoNightIndex(pujoNow()));
    update();
    const id = setInterval(update, 60000);
    return () => {
      clearInterval(id);
      mark(-1);
    };
  }, []);

  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: MARK_SCRIPT }}
    />
  );
}

function useTonight() {
  const [night, setNight] = useState(-1);
  useEffect(() => {
    const update = () => setNight(pujoNightIndex(pujoNow()));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);
  return night;
}

/** One clay diya per night, lit up to tonight. */
export function NightLamps({ className }: { className?: string }) {
  const tonight = useTonight();

  return (
    <ol
      aria-label="Panchami to Dashami"
      className={cn("grid max-w-lg grid-cols-6 gap-1", className)}
    >
      {pujoNights.map((d, i) => {
        const lit = i <= tonight;
        const today = i === tonight;
        return (
          <li
            key={d.day}
            aria-current={today ? "date" : undefined}
            className="flex flex-col items-center text-center"
          >
            <Diya lit={lit} today={today} delay={i * 160} />
            <span
              className={cn(
                "mt-1.5 font-mono text-[0.5rem] tracking-[0.14em] uppercase transition-colors duration-700 sm:text-[0.56rem]",
                today
                  ? "text-[#f6d77e]"
                  : lit
                    ? "text-cream/70"
                    : "text-cream/35",
              )}
            >
              {d.day}
            </span>
            <span
              lang="bn"
              className={cn(
                "text-[0.7rem]",
                today ? "text-cream/80" : "text-cream/35",
              )}
            >
              {d.bengali}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Diya({
  lit,
  today,
  delay,
}: {
  lit: boolean;
  today: boolean;
  delay: number;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 40 44"
      className={cn("w-10 overflow-visible sm:w-12", today && "scale-115")}
    >
      <g
        className="transition-[opacity,transform] duration-700 ease-out"
        style={{
          opacity: lit ? 1 : 0,
          transform: lit ? "scale(1)" : "scale(0.2)",
          transformOrigin: "20px 26px",
          transitionDelay: `${delay}ms`,
        }}
      >
        <circle
          cx="20"
          cy="18"
          r={today ? 15 : 10}
          fill="#ffb347"
          opacity={today ? 0.28 : 0.16}
        />
        <g className="diya-flame">
          <path
            d="M20 5c4.5 6.5 5 11.5 0 17c-5-5.5-4.5-10.5 0-17z"
            fill="#ffc24a"
          />
          <path
            d="M20 11c2.2 3.4 2.4 6.2 0 9c-2.4-2.8-2.2-5.6 0-9z"
            fill="#fff4c8"
          />
        </g>
      </g>
      <path
        d="M4 25h32c-1.6 8.5-8.4 13-16 13S5.6 33.5 4 25z"
        fill={lit ? "#b9542b" : "#6b3a2a"}
      />
      <path
        d="M34 25.5c2.5-.6 4-1.6 5-3c-.6 2.6-2.3 4.4-5.6 5.2z"
        fill={lit ? "#b9542b" : "#6b3a2a"}
      />
      <ellipse
        cx="20"
        cy="25"
        rx="16"
        ry="2.6"
        fill={lit ? "#e08a3c" : "#7d4a33"}
      />
      <g fill="#fdf3dc" opacity={lit ? 0.85 : 0.3}>
        <circle cx="11" cy="31" r="1" />
        <circle cx="20" cy="33.5" r="1" />
        <circle cx="29" cy="31" r="1" />
      </g>
    </svg>
  );
}

const DHAK_OFF = "coolkata:dhak-off";
const noSubscribe = () => () => {};
const isLiveNight = () => pujoNightIndex(pujoNow()) >= 0;
const GESTURES = ["pointerdown", "pointerup", "keydown"] as const;

/**
 * The dhak, Panchami to Dashami. One burst on arrival, or on the first tap
 * where the browser holds sound back; the button keeps it going or stops it.
 */
export function DhakPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  // Server snapshot is false: the clock is the browser's.
  const live = useSyncExternalStore(noSubscribe, isLiveNight, () => false);
  const [playing, setPlaying] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    const a = audio.current;
    if (!live || !a) return;
    a.volume = 0.6;

    let off = false;
    try {
      off = localStorage.getItem(DHAK_OFF) === "1";
    } catch {}

    const disarm = () => {
      GESTURES.forEach((g) => window.removeEventListener(g, onGesture, true));
      setWaiting(false);
    };
    const onGesture = (e: Event) => {
      if (button.current?.contains(e.target as Node)) return disarm();
      a.play().then(disarm, () => {});
    };
    const onHidden = () => {
      if (document.hidden) a.pause();
    };

    if (!off) {
      a.play().catch(() => {
        GESTURES.forEach((g) => window.addEventListener(g, onGesture, true));
        setWaiting(true);
      });
    }
    document.addEventListener("visibilitychange", onHidden);

    return () => {
      disarm();
      document.removeEventListener("visibilitychange", onHidden);
      a.pause();
    };
  }, [live]);

  useEffect(() => {
    const root = document.documentElement;
    if (playing) root.dataset.dhak = "on";
    else delete root.dataset.dhak;
    return () => {
      delete root.dataset.dhak;
    };
  }, [playing]);

  if (!live) return null;

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (!a.paused) {
      a.pause();
      try {
        localStorage.setItem(DHAK_OFF, "1");
      } catch {}
      return;
    }
    a.loop = true;
    a.play().catch(() => {});
    try {
      localStorage.removeItem(DHAK_OFF);
    } catch {}
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex items-center gap-3 sm:right-6 sm:bottom-6">
      <p
        aria-live="polite"
        className={cn(
          "rounded-full border border-[#e8c36a]/50 bg-[#2a0b0d]/92 px-3.5 py-2 font-mono text-[0.58rem] tracking-[0.16em] text-[#f6d77e] uppercase shadow-lg backdrop-blur transition-[opacity,transform] duration-500",
          waiting || playing
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-2 opacity-0",
        )}
      >
        {playing ? "Dhak · tap to stop" : "Tap anywhere for the dhak"}
      </p>
      <button
        ref={button}
        type="button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Stop the dhak" : "Play the dhak"}
        className="relative grid size-16 shrink-0 place-items-center rounded-full bg-[#3a0d10] shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] ring-2 ring-[#e8c36a] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8c36a]"
      >
        {playing ? (
          <>
            <span
              aria-hidden
              className="dhak-ring absolute inset-0 rounded-full border-2 border-[#f6d77e]"
            />
            <span
              aria-hidden
              className="dhak-ring absolute inset-0 rounded-full border-2 border-[#f6d77e]"
              style={{ animationDelay: "0.7s" }}
            />
          </>
        ) : null}
        <Image
          src={dhak}
          alt=""
          sizes="48px"
          className={cn(
            "h-12 w-auto translate-x-px -translate-y-px",
            playing && "dhak-beat",
          )}
        />
        {!playing ? (
          <span
            aria-hidden
            className="absolute -right-0.5 -bottom-0.5 grid size-5 place-items-center rounded-full bg-[#b3261e] text-[0.6rem] text-cream ring-2 ring-[#3a0d10]"
          >
            ▶
          </span>
        ) : null}
      </button>
      <audio
        ref={audio}
        src="/sound/Durga-puja-dhak.mp3"
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
