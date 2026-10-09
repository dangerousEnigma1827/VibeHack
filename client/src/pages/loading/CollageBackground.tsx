import { memo, useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CHARS, NEON, OUT, SHAPES, type CharKey } from "./art";
import { PLACARDS, Placard, type PlacardDef } from "./placards";

const mulberry = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Aspect ratio of the viewport, clamped and quantised so we don't rebuild on every resize tick. */
function readAspect() {
  if (typeof window === "undefined") return 1.6;
  const a = window.innerWidth / Math.max(window.innerHeight, 1);
  return Math.round(Math.min(Math.max(a, 0.4), 2.6) * 20) / 20;
}

interface CharSpot {
  k: CharKey;
  l: [number, number];
  p: [number, number];
  s: number;
  ps?: number;
}

/** l = landscape fractions, p = portrait fractions. Everything sits around the centre card. */
const SPOTS: CharSpot[] = [
  { k: "disco", l: [0.4, 0.06], p: [0.3, 0.035], s: 0.8, ps: 1 },
  { k: "disco", l: [0.62, 0.05], p: [0.74, 0.03], s: 0.6, ps: 0.8 },
  { k: "cat", l: [0.5, 0.15], p: [0.5, 0.1], s: 0.9, ps: 1.35 },
  { k: "screamer", l: [0.09, 0.17], p: [0.17, 0.2], s: 1, ps: 1.1 },
  { k: "globe", l: [0.26, 0.11], p: [0.14, 0.07], s: 0.85, ps: 1 },
  { k: "sunflower", l: [0.73, 0.1], p: [0.9, 0.08], s: 0.85, ps: 1 },
  { k: "alien", l: [0.91, 0.2], p: [0.83, 0.2], s: 1, ps: 1.1 },
  { k: "banana", l: [0.84, 0.4], p: [0.5, 0.265], s: 0.8, ps: 0.9 },
  { k: "shades", l: [0.2, 0.34], p: [0.78, 0.29], s: 1, ps: 1.2 },
  { k: "goose", l: [0.1, 0.58], p: [0.2, 0.79], s: 1.15, ps: 1.3 },
  { k: "derpy", l: [0.91, 0.58], p: [0.82, 0.96], s: 1, ps: 1 },
  { k: "computer", l: [0.2, 0.74], p: [0.84, 0.74], s: 0.8, ps: 1 },
  { k: "nuggets", l: [0.09, 0.88], p: [0.18, 0.95], s: 0.85, ps: 1 },
  { k: "pizza", l: [0.87, 0.82], p: [0.5, 0.74], s: 0.95, ps: 1.1 },
  { k: "car", l: [0.5, 0.89], p: [0.5, 0.9], s: 1.1, ps: 1.5 },
  { k: "disco", l: [0.3, 0.89], p: [0.34, 0.97], s: 0.7, ps: 0.8 },
  { k: "smiley", l: [0.7, 0.9], p: [0.66, 0.965], s: 0.7, ps: 0.8 },
  { k: "rainbow", l: [0.72, 0.24], p: [0.2, 0.3], s: 1, ps: 1.1 },
];

/** Rectangle (fractions) covered by the centre card; decoration is skipped/avoided there. */
const ZONE_L = { x0: 0.22, x1: 0.78, y0: 0.2, y1: 0.8 };
const ZONE_P = { x0: 0.02, x1: 0.98, y0: 0.3, y1: 0.7 };

const css = `
@keyframes wb-tw{0%,100%{opacity:1}50%{opacity:.45}}
.wb-tw{animation:wb-tw 2.2s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.wb-tw{animation:none}}
`;

function CollageBackgroundInner() {
  const reduce = useReducedMotion();
  const [aspect, setAspect] = useState(readAspect);

  useEffect(() => {
    const on = () => setAspect(readAspect());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  const scene = useMemo(() => {
    const portrait = aspect < 1;
    const W = portrait ? 1000 : Math.round(1000 * aspect);
    const H = portrait ? Math.round(1000 / aspect) : 1000;
    const zone = portrait ? ZONE_P : ZONE_L;
    const inZone = (x: number, y: number, hw = 0, hh = 0) =>
      x + hw > zone.x0 * W && x - hw < zone.x1 * W && y + hh > zone.y0 * H && y - hh < zone.y1 * H;

    // --- scribbles: the messy marker layer under everything
    const rs = mulberry(7);
    const scribbles = Array.from({ length: Math.round((W * H) / 8500) }, (_, i) => {
      let x = rs() * W;
      let y = rs() * H;
      let d = `M${x.toFixed(0)} ${y.toFixed(0)}`;
      for (let k = 0; k < 7; k++) {
        const cx = x + (rs() - 0.5) * 240;
        const cy = y + (rs() - 0.5) * 240;
        x += (rs() - 0.5) * 170;
        y += (rs() - 0.5) * 170;
        d += ` Q${cx.toFixed(0)} ${cy.toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)}`;
      }
      return { id: i, d, c: NEON[Math.floor(rs() * NEON.length)], w: 3 + rs() * 7 };
    });

    // --- confetti stickers: stars / hearts / sparkles
    const kinds = Object.keys(SHAPES);
    const rc = mulberry(21);
    const stickers = Array.from({ length: Math.round((W * H) / 4300) }, (_, i) => {
      const size = 26 + Math.pow(rc(), 2.2) * 120;
      return {
        id: i,
        k: kinds[Math.floor(rc() * kinds.length)],
        x: rc() * W,
        y: rc() * H,
        size,
        r: rc() * 360,
        c: NEON[Math.floor(rc() * NEON.length)],
        tw: rc() < 0.18,
        delay: rc() * 2,
      };
    })
      .filter((s) => !inZone(s.x, s.y, s.size / 2, s.size / 2))
      .sort((a, b) => b.size - a.size);

    // --- placards, scattered with rejection sampling so they don't stack on each other
    const rp = mulberry(99);
    const sc = portrait ? 1.45 : 1;
    const placed: { x: number; y: number; w: number; h: number }[] = [];
    const placards: { def: PlacardDef; x: number; y: number; rot: number; wobble: boolean }[] = [];
    PLACARDS.forEach((def, i) => {
      const hw = (def.w * sc) / 2;
      const hh = (def.h * sc) / 2;
      for (let tries = 0; tries < 80; tries++) {
        const x = hw + 14 + rp() * (W - 2 * hw - 28);
        const y = hh + 14 + rp() * (H - 2 * hh - 28);
        if (inZone(x, y, hw, hh)) continue;
        const clash = placed.some((p) => Math.abs(p.x - x) < (p.w + hw) * 0.95 && Math.abs(p.y - y) < (p.h + hh) * 0.95);
        if (clash && tries < 79) continue;
        if (clash) break;
        placed.push({ x, y, w: hw, h: hh });
        placards.push({ def, x, y, rot: (rp() - 0.5) * 24, wobble: i % 3 === 0 });
        break;
      }
    });

    const chars = SPOTS.map((c, i) => {
      const [fx, fy] = portrait ? c.p : c.l;
      return { ...c, i, x: fx * W, y: fy * H, sc: portrait ? c.ps ?? c.s : c.s };
    });

    return { W, H, scribbles, stickers, placards, chars };
  }, [aspect]);

  const { W, H } = scene;
  const half = Math.ceil(scene.placards.length / 2);

  const renderPlacard = (p: (typeof scene.placards)[number], i: number) => {
    const portraitScale = aspect < 1 ? 1.45 : 1;
    const inner = (
      <g transform={`scale(${portraitScale})`}>
        <Placard def={p.def} />
      </g>
    );
    return (
      <g key={`pl${i}`} transform={`translate(${p.x.toFixed(0)} ${p.y.toFixed(0)}) rotate(${p.rot.toFixed(1)})`}>
        {p.wobble && !reduce ? (
          <motion.g
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            animate={{ rotate: [-2.5, 2.5, -2.5] }}
            transition={{ duration: 2.4 + (i % 4) * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {inner}
          </motion.g>
        ) : (
          inner
        )}
      </g>
    );
  };

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <style>{css}</style>
      <defs>
        <radialGradient id="discoGrad" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#b9bfe0" />
          <stop offset="1" stopColor="#6c6f9a" />
        </radialGradient>
        <pattern id="halftone" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="8" cy="8" r="2.4" fill="#000" opacity=".28" />
        </pattern>
        {Object.entries(SHAPES).map(([k, d]) => (
          <symbol key={k} id={`wb-${k}`} viewBox="-55 -55 110 110" overflow="visible">
            <path d={d} stroke={OUT} strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </symbol>
        ))}
      </defs>

      <rect width={W} height={H} fill="#16001f" />

      {/* marker scribbles */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" opacity=".95">
        {scene.scribbles.map((s) => (
          <path key={s.id} d={s.d} stroke={s.c} strokeWidth={s.w} />
        ))}
      </g>
      <rect width={W} height={H} fill="url(#halftone)" />

      {/* stars, hearts, sparkles */}
      {scene.stickers.map((s) => (
        <use
          key={s.id}
          href={`#wb-${s.k}`}
          x={s.x - s.size / 2}
          y={s.y - s.size / 2}
          width={s.size}
          height={s.size}
          fill={s.c}
          transform={`rotate(${s.r.toFixed(0)} ${s.x.toFixed(0)} ${s.y.toFixed(0)})`}
          className={s.tw && !reduce ? "wb-tw" : undefined}
          style={s.tw ? { animationDelay: `${s.delay}s` } : undefined}
        />
      ))}

      {scene.placards.slice(0, half).map(renderPlacard)}

      {/* characters */}
      {scene.chars.map((c) => {
        const Art = CHARS[c.k];
        const body = <Art />;
        return (
          <g key={c.i} transform={`translate(${c.x.toFixed(0)} ${c.y.toFixed(0)}) scale(${c.sc})`}>
            {reduce ? (
              body
            ) : (
              <motion.g
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={{ y: [0, -10, 0], rotate: c.k === "disco" ? [-4, 4, -4] : [-2.5, 2.5, -2.5] }}
                transition={{ duration: 2.6 + (c.i % 5) * 0.45, repeat: Infinity, ease: "easeInOut", delay: (c.i % 6) * 0.25 }}
              >
                {body}
              </motion.g>
            )}
          </g>
        );
      })}

      {scene.placards.slice(half).map((p, i) => renderPlacard(p, i + half))}
    </svg>
  );
}

const CollageBackground = memo(CollageBackgroundInner);
export default CollageBackground;