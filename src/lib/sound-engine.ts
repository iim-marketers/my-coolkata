/**
 * Every sound on this site is synthesised in the browser with the Web
 * Audio API. There are no recordings, nothing is downloaded, and nothing
 * is sent anywhere.
 *
 * Each recipe schedules nodes on a shared context and returns a stop
 * function. Recipes that repeat use a timer rather than a loop buffer so
 * the pattern can vary.
 */
import type { SoundId } from "@/lib/kolkata/sounds";

type Stop = () => void;
type Recipe = (ctx: AudioContext, out: GainNode) => Stop;

function noiseSource(ctx: AudioContext, seconds: number, loop = false) {
  const frames = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = loop;
  return src;
}

/** Brown noise reads as water and crowds far better than white does. */
function brownNoise(ctx: AudioContext, seconds: number, loop = true) {
  const frames = Math.max(1, Math.floor(ctx.sampleRate * seconds));
  const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < frames; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = loop;
  return src;
}

function repeat(fn: () => void, ms: () => number) {
  let stopped = false;
  let timer: ReturnType<typeof setTimeout>;
  const run = () => {
    if (stopped) return;
    fn();
    timer = setTimeout(run, ms());
  };
  run();
  return () => {
    stopped = true;
    clearTimeout(timer);
  };
}

/** Inharmonic partials with a fast decay: a small struck bell. */
function strike(
  ctx: AudioContext,
  out: GainNode,
  at: number,
  base: number,
  partials: number[],
  decay: number,
  level: number,
) {
  partials.forEach((ratio, i) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = base * ratio;
    const peak = level / (i + 1.5);
    g.gain.setValueAtTime(0, at);
    g.gain.linearRampToValueAtTime(peak, at + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, at + decay / (1 + i * 0.5));
    osc.connect(g).connect(out);
    osc.start(at);
    osc.stop(at + decay + 0.3);
  });
}

const BELL = [1, 2.02, 2.98, 4.16, 5.43, 6.79];

const recipes: Record<SoundId, Recipe> = {
  "tram-bell": (ctx, out) =>
    repeat(
      () => {
        const t = ctx.currentTime;
        strike(ctx, out, t, 660, BELL, 1.9, 0.22);
        strike(ctx, out, t + 0.34, 660, BELL, 1.9, 0.19);
      },
      () => 2600,
    ),

  /** An Ambassador horn: two detuned square waves, beating against each other. */
  "taxi-horn": (ctx, out) =>
    repeat(
      () => {
        const t = ctx.currentTime;
        const dur = 0.28 + Math.random() * 0.4;
        const g = ctx.createGain();
        const shaper = ctx.createBiquadFilter();
        shaper.type = "lowpass";
        shaper.frequency.value = 2600;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.16, t + 0.02);
        g.gain.setValueAtTime(0.16, t + dur - 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        [392, 404, 786].forEach((f, i) => {
          const osc = ctx.createOscillator();
          osc.type = i === 2 ? "sawtooth" : "square";
          osc.frequency.value = f;
          const og = ctx.createGain();
          og.gain.value = i === 2 ? 0.25 : 1;
          osc.connect(og).connect(shaper);
          osc.start(t);
          osc.stop(t + dur + 0.05);
        });
        shaper.connect(g).connect(out);
      },
      () => 500 + Math.random() * 1600,
    ),

  dhaak: (ctx, out) => {
    const hit = (at: number, low: boolean, level: number) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(low ? 128 : 240, at);
      osc.frequency.exponentialRampToValueAtTime(low ? 52 : 130, at + 0.18);
      g.gain.setValueAtTime(level, at);
      g.gain.exponentialRampToValueAtTime(0.0001, at + (low ? 0.42 : 0.2));
      osc.connect(g).connect(out);
      osc.start(at);
      osc.stop(at + 0.5);

      const n = noiseSource(ctx, 0.16);
      const nf = ctx.createBiquadFilter();
      nf.type = low ? "lowpass" : "highpass";
      nf.frequency.value = low ? 900 : 2200;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(level * 0.5, at);
      ng.gain.exponentialRampToValueAtTime(0.0001, at + 0.13);
      n.connect(nf).connect(ng).connect(out);
      n.start(at);
    };
    const pattern: [number, boolean, number][] = [
      [0, true, 0.3],
      [0.26, false, 0.16],
      [0.5, true, 0.26],
      [0.76, false, 0.2],
      [0.9, false, 0.12],
      [1.14, true, 0.3],
      [1.4, false, 0.15],
    ];
    return repeat(
      () => {
        const now = ctx.currentTime + 0.05;
        pattern.forEach(([off, low, lvl]) => hit(now + off, low, lvl));
      },
      () => 1650,
    );
  },

  /** The four-note station chime, then a filtered babble standing in for speech. */
  "train-announcement": (ctx, out) =>
    repeat(
      () => {
        const t = ctx.currentTime;
        [659.25, 587.33, 493.88, 587.33].forEach((f, i) => {
          const at = t + i * 0.42;
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = f;
          g.gain.setValueAtTime(0, at);
          g.gain.linearRampToValueAtTime(0.14, at + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, at + 1.1);
          osc.connect(g).connect(out);
          osc.start(at);
          osc.stop(at + 1.3);
          const h = ctx.createOscillator();
          const hg = ctx.createGain();
          h.type = "sine";
          h.frequency.value = f * 2;
          hg.gain.setValueAtTime(0.04, at);
          hg.gain.exponentialRampToValueAtTime(0.0001, at + 0.7);
          h.connect(hg).connect(out);
          h.start(at);
          h.stop(at + 0.9);
        });
        // Tannoy speech: band-limited noise, gated in syllables.
        const start = t + 2.1;
        const n = noiseSource(ctx, 4.2);
        const bp = ctx.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.value = 1100;
        bp.Q.value = 1.4;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, start);
        for (let i = 0; i < 22; i++) {
          const at = start + i * 0.17;
          g.gain.setTargetAtTime(0.05 + Math.random() * 0.05, at, 0.02);
          g.gain.setTargetAtTime(0.004, at + 0.09, 0.03);
        }
        g.gain.setTargetAtTime(0, start + 4, 0.2);
        n.connect(bp).connect(g).connect(out);
        n.start(start);
      },
      () => 9000,
    ),

  hooghly: (ctx, out) => {
    const stops: Stop[] = [];
    // Water: brown noise with a slow swell.
    const water = brownNoise(ctx, 8);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 900;
    const wg = ctx.createGain();
    wg.gain.setValueAtTime(0, ctx.currentTime);
    wg.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.5);
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.13;
    lfoGain.gain.value = 0.06;
    lfo.connect(lfoGain).connect(wg.gain);
    water.connect(lp).connect(wg).connect(out);
    water.start();
    lfo.start();
    stops.push(() => {
      try {
        water.stop();
        lfo.stop();
      } catch {}
    });
    // A launch horn, occasionally, a long way off.
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.value = 138;
          osc2.type = "sawtooth";
          osc2.frequency.value = 104;
          const f = ctx.createBiquadFilter();
          f.type = "lowpass";
          f.frequency.value = 600;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.09, t + 0.25);
          g.gain.setValueAtTime(0.09, t + 1.5);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
          osc.connect(f);
          osc2.connect(f);
          f.connect(g).connect(out);
          osc.start(t);
          osc2.start(t);
          osc.stop(t + 2.5);
          osc2.stop(t + 2.5);
        },
        () => 7000 + Math.random() * 6000,
      ),
    );
    return () => stops.forEach((s) => s());
  },

  /** A hawker's call: a swept formant, pitched to reach a third-floor verandah. */
  "street-vendor": (ctx, out) =>
    repeat(
      () => {
        const t = ctx.currentTime;
        const dur = 1.5;
        const osc = ctx.createOscillator();
        osc.type = "sawtooth";
        const base = 190 + Math.random() * 40;
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.linearRampToValueAtTime(base * 1.5, t + 0.35);
        osc.frequency.linearRampToValueAtTime(base * 1.35, t + 0.8);
        osc.frequency.linearRampToValueAtTime(base * 0.82, t + dur);
        const f1 = ctx.createBiquadFilter();
        f1.type = "bandpass";
        f1.Q.value = 6;
        f1.frequency.setValueAtTime(700, t);
        f1.frequency.linearRampToValueAtTime(1150, t + 0.4);
        f1.frequency.linearRampToValueAtTime(620, t + dur);
        const f2 = ctx.createBiquadFilter();
        f2.type = "bandpass";
        f2.Q.value = 8;
        f2.frequency.value = 2400;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.16, t + 0.08);
        g.gain.setValueAtTime(0.15, t + dur - 0.4);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(f1).connect(g);
        osc.connect(f2).connect(g);
        g.connect(out);
        osc.start(t);
        osc.stop(t + dur + 0.1);
      },
      () => 3200 + Math.random() * 2600,
    ),

  "college-street": (ctx, out) => {
    const stops: Stop[] = [];
    stops.push(babble(ctx, out, 0.1, 1500));
    // Paper: short bright rustles.
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          const n = noiseSource(ctx, 0.3);
          const hp = ctx.createBiquadFilter();
          hp.type = "highpass";
          hp.frequency.value = 3200;
          const g = ctx.createGain();
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.05, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
          n.connect(hp).connect(g).connect(out);
          n.start(t);
        },
        () => 700 + Math.random() * 1400,
      ),
    );
    return () => stops.forEach((s) => s());
  },

  "coffee-house": (ctx, out) => {
    const stops: Stop[] = [];
    // Denser babble, and a longer tail: a very high ceiling.
    stops.push(babble(ctx, out, 0.13, 900));
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          strike(ctx, out, t, 2400 + Math.random() * 900, [1, 2.7, 4.1], 0.35, 0.05);
        },
        () => 1800 + Math.random() * 3200,
      ),
    );
    return () => stops.forEach((s) => s());
  },

  rain: (ctx, out) => {
    const stops: Stop[] = [];
    const bed = noiseSource(ctx, 8, true);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 5200;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 420;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.13, ctx.currentTime + 1.2);
    bed.connect(hp).connect(lp).connect(g).connect(out);
    bed.start();
    stops.push(() => {
      try {
        bed.stop();
      } catch {}
    });
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          const osc = ctx.createOscillator();
          const dg = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(1800 + Math.random() * 2600, t);
          dg.gain.setValueAtTime(0.025 + Math.random() * 0.02, t);
          dg.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
          osc.connect(dg).connect(out);
          osc.start(t);
          osc.stop(t + 0.07);
        },
        () => 60 + Math.random() * 190,
      ),
    );
    return () => stops.forEach((s) => s());
  },

  /** A crowd roar: brown noise swelling, with a drum under it. */
  stadium: (ctx, out) => {
    const stops: Stop[] = [];
    const crowd = brownNoise(ctx, 8);
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 700;
    bp.Q.value = 0.7;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 1.5);
    crowd.connect(bp).connect(g).connect(out);
    crowd.start();
    stops.push(() => {
      try {
        crowd.stop();
      } catch {}
    });
    // Surges.
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          g.gain.setTargetAtTime(0.34, t, 0.6);
          g.gain.setTargetAtTime(0.18, t + 2.6, 1.2);
        },
        () => 6000 + Math.random() * 5000,
      ),
    );
    // Terrace drum.
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          [0, 0.3, 0.6, 0.75].forEach((off) => {
            const osc = ctx.createOscillator();
            const dg = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(150, t + off);
            osc.frequency.exponentialRampToValueAtTime(58, t + off + 0.2);
            dg.gain.setValueAtTime(0.16, t + off);
            dg.gain.exponentialRampToValueAtTime(0.0001, t + off + 0.35);
            osc.connect(dg).connect(out);
            osc.start(t + off);
            osc.stop(t + off + 0.4);
          });
        },
        () => 1500,
      ),
    );
    return () => stops.forEach((s) => s());
  },

  /** Kanshor ghanta struck fast, with a conch under it. */
  "puja-bells": (ctx, out) => {
    const stops: Stop[] = [];
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          for (let i = 0; i < 8; i++) {
            strike(
              ctx,
              out,
              t + i * 0.16,
              1180,
              [1, 2.4, 3.7, 5.1, 6.6],
              0.7,
              0.11,
            );
          }
        },
        () => 1700,
      ),
    );
    stops.push(
      repeat(
        () => {
          const t = ctx.currentTime;
          const dur = 3.2;
          const osc = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const f = ctx.createBiquadFilter();
          f.type = "bandpass";
          f.frequency.value = 620;
          f.Q.value = 3.2;
          const g = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(228, t);
          osc.frequency.linearRampToValueAtTime(242, t + 0.5);
          osc2.type = "sine";
          osc2.frequency.value = 116;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.17, t + 0.45);
          g.gain.setValueAtTime(0.17, t + dur - 0.7);
          g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
          osc.connect(f);
          osc2.connect(f);
          f.connect(g).connect(out);
          osc.start(t);
          osc2.start(t);
          osc.stop(t + dur);
          osc2.stop(t + dur);
        },
        () => 8000,
      ),
    );
    return () => stops.forEach((s) => s());
  },
};

/** Overlapping band-limited noise bursts. Reads as a room full of people. */
function babble(ctx: AudioContext, out: GainNode, level: number, gap: number) {
  return repeat(
    () => {
      const t = ctx.currentTime;
      const n = noiseSource(ctx, 1.4);
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = 400 + Math.random() * 1400;
      bp.Q.value = 2 + Math.random() * 3;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      const syllables = 3 + Math.floor(Math.random() * 5);
      for (let i = 0; i < syllables; i++) {
        const at = t + i * (0.12 + Math.random() * 0.1);
        g.gain.setTargetAtTime(level * (0.5 + Math.random()), at, 0.03);
        g.gain.setTargetAtTime(level * 0.08, at + 0.08, 0.05);
      }
      g.gain.setTargetAtTime(0, t + 1.1, 0.15);
      n.connect(bp).connect(g).connect(out);
      n.start(t);
    },
    () => gap * (0.4 + Math.random()),
  );
}

export function playSound(
  id: SoundId,
  ctx: AudioContext,
  out: GainNode,
): Stop {
  return recipes[id](ctx, out);
}
