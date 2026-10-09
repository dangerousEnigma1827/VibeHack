import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * Isometric loading bar: a flat ribbon that folds through square-wave steps
 * (profile in x/z, extruded along y). Green = loaded, white outline = remaining.
 */

const S = 40;
const KX = Math.cos(Math.PI / 6);
const KY = 0.5;
const proj = (x: number, y: number, z: number): [number, number] => [
  (x + y) * KX * S,
  ((x - y) * KY - z) * S,
];

interface Seg {
  a: [number, number]; // x, z
  b: [number, number];
  y0: number;
  w: number;
  len: number;
  start: number;
  wall: boolean;
}

const PROFILE: [number, number][] = [
  [0, 6],
  [3.4, 6],
  [3.4, 3],
  [4.4, 3],
  [4.4, 6.6],
  [5.8, 6.6],
  [5.8, 1.4],
  [7.2, 1.4],
  [7.2, 3.6],
  [8.2, 3.6],
  [8.2, 0],
  [10.8, 0],
];
const RIBBON_W = 1.25;

function build(profile: [number, number][], y0: number, w: number): Seg[] {
  let acc = 0;
  const segs: Seg[] = [];
  for (let i = 0; i < profile.length - 1; i++) {
    const a = profile[i];
    const b = profile[i + 1];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    segs.push({ a, b, y0, w, len, start: acc, wall: a[0] === b[0] });
    acc += len;
  }
  return segs;
}

const RIBBON = build(PROFILE, 0, RIBBON_W);
const RIBBON_LEN = RIBBON.reduce((s, g) => s + g.len, 0);

const f = (n: number) => n.toFixed(2);
function quad(g: Seg, t: number) {
  const bx = g.a[0] + (g.b[0] - g.a[0]) * t;
  const bz = g.a[1] + (g.b[1] - g.a[1]) * t;
  return [
    proj(g.a[0], g.y0, g.a[1]),
    proj(bx, g.y0, bz),
    proj(bx, g.y0 + g.w, bz),
    proj(g.a[0], g.y0 + g.w, g.a[1]),
  ]
    .map(([x, y]) => `${f(x)},${f(y)}`)
    .join(" ");
}

// view box from every full corner + label
const pts = RIBBON.flatMap((g) => quad(g, 1).split(" ").map((p) => p.split(",").map(Number)));
const LABEL_ORIGIN = proj(0.2, RIBBON_W + 0.2, 6);
pts.push([LABEL_ORIGIN[0], LABEL_ORIGIN[1] - 40]);
const PAD = 16;
const minX = Math.min(...pts.map((p) => p[0])) - PAD;
const minY = Math.min(...pts.map((p) => p[1])) - PAD;
const maxX = Math.max(...pts.map((p) => p[0])) + PAD;
const maxY = Math.max(...pts.map((p) => p[1])) + PAD;

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function Piece({
  seg,
  tOf,
  progress,
}: {
  seg: Seg;
  tOf: (p: number) => number;
  progress: MotionValue<number>;
}) {
  const ref = useRef<SVGPolygonElement>(null);
  const apply = (p: number) => {
    const el = ref.current;
    if (!el) return;
    const t = tOf(p);
    if (t <= 0.0005) {
      el.setAttribute("display", "none");
      return;
    }
    el.removeAttribute("display");
    el.setAttribute("points", quad(seg, t));
  };
  useMotionValueEvent(progress, "change", apply);
  useEffect(() => {
    apply(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <g strokeLinejoin="round">
      <polygon points={quad(seg, 1)} fill="#ffffff" stroke="#4d4d4d" strokeWidth="1" />
      <polygon
        ref={ref}
        display="none"
        fill={seg.wall ? "#13a800" : "#1cbf00"}
        stroke="#0a3d00"
        strokeWidth="1"
      />
    </g>
  );
}

export default function IsoLoadingBar({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) {
  return (
    <svg
      role="img"
      aria-label="Loading progress"
      className={className}
      viewBox={`${f(minX)} ${f(minY)} ${f(maxX - minX)} ${f(maxY - minY)}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* folded ribbon: later pieces paint over earlier ones */}
      {RIBBON.map((g, i) => (
        <Piece
          key={`r${i}`}
          seg={g}
          progress={progress}
          tOf={(p) => clamp01((p * RIBBON_LEN - g.start) / g.len)}
        />
      ))}

      {/* "Loading" lies on the ground plane beyond the ribbon's back edge */}
      <text
        transform={`matrix(${f(KX * S)} ${f(KY * S)} ${f(-KX * S)} ${f(KY * S)} ${f(LABEL_ORIGIN[0])} ${f(LABEL_ORIGIN[1])})`}
        fontFamily="'Anton','Impact',sans-serif"
        fontSize="0.78"
        fontStyle="italic"
        fill="#0f7a00"
        letterSpacing="0.03"
      >
        Loading
      </text>
    </svg>
  );
}