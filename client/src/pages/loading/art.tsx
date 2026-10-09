import type { ReactElement } from "react";

export const OUT = "#1a0020";

export const NEON = [
  "#ff2fb3",
  "#ff5ad1",
  "#39ff14",
  "#fff000",
  "#00e5ff",
  "#8a2bff",
  "#ff7a00",
  "#ff1744",
  "#2979ff",
  "#b6ff00",
];

const starPath = (n: number, r1: number, r2: number) => {
  let d = "";
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? r2 : r1;
    const a = (Math.PI * i) / n - Math.PI / 2;
    d += `${i ? "L" : "M"}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`;
  }
  return d + "Z";
};

/** Sticker silhouettes, all drawn in a -55..55 box. Fill is supplied by <use>. */
export const SHAPES: Record<string, string> = {
  star5: starPath(5, 50, 21),
  star8: starPath(8, 50, 28),
  burst: starPath(14, 50, 36),
  sparkle:
    "M0 -52 Q7 -9 52 0 Q7 9 0 52 Q-7 9 -52 0 Q-7 -9 0 -52Z",
  heart:
    "M0 42 C-62 2 -48 -46 -22 -42 C-9 -40 0 -30 0 -21 C0 -30 9 -40 22 -42 C48 -46 62 2 0 42Z",
  dot: "M-30 0a30 30 0 1 0 60 0a30 30 0 1 0 -60 0Z",
  bolt: "M12 -52 L-28 4 L-4 4 L-14 52 L30 -8 L6 -8Z",
};

type C = () => ReactElement;
const round = { strokeLinejoin: "round", strokeLinecap: "round" } as const;

const Cat: C = () => (
  <g {...round}>
    <path
      d="M-92 -20 L-104 -118 L-34 -74 Q0 -84 34 -74 L104 -118 L92 -20 Q100 70 0 92 Q-100 70 -92 -20Z"
      fill="#f6ddb8"
      stroke={OUT}
      strokeWidth="6"
    />
    <path d="M-88 -96 L-62 -78 L-86 -58Z" fill="#ff8fb8" />
    <path d="M88 -96 L62 -78 L86 -58Z" fill="#ff8fb8" />
    <path d="M-60 -70 Q-30 -40 -50 -10 Q-80 -20 -88 -50Z" fill="#e9a35b" opacity=".85" />
    <path d="M60 -72 Q40 -50 55 -20 Q80 -25 88 -55Z" fill="#e9a35b" opacity=".85" />
    <rect x="-84" y="-28" width="72" height="48" rx="21" fill="#16001f" stroke="#ff9ad5" strokeWidth="7" />
    <rect x="12" y="-28" width="72" height="48" rx="21" fill="#16001f" stroke="#ff9ad5" strokeWidth="7" />
    <path d="M-12 -10 H12" stroke="#ff9ad5" strokeWidth="7" />
    <path d="M-70 -16 L-52 -16 M58 -16 L76 -16" stroke="#fff" strokeWidth="4" opacity=".7" />
    <path d="M-10 30 H10 L0 42Z" fill="#ff7aa8" stroke={OUT} strokeWidth="3" />
    <path d="M0 42 Q-12 58 -26 48 M0 42 Q12 58 26 48" fill="none" stroke={OUT} strokeWidth="4" />
    <path d="M-60 36 L-108 28 M-60 48 L-106 54 M60 36 L108 28 M60 48 L106 54" stroke={OUT} strokeWidth="3" />
    <path d="M-46 -118 L-54 -170 L-26 -142 L0 -178 L26 -142 L54 -170 L46 -118Z" fill="#ffd21f" stroke={OUT} strokeWidth="5" />
    <circle cx="0" cy="-134" r="6" fill="#ff2fb3" stroke={OUT} strokeWidth="2" />
    <path d="M-72 72 Q0 136 72 72" fill="none" stroke={OUT} strokeWidth="17" />
    <path d="M-72 72 Q0 136 72 72" fill="none" stroke="#ffd21f" strokeWidth="11" strokeDasharray="13 5" />
  </g>
);

const Goose: C = () => (
  <g {...round}>
    <path
      d="M-62 112 Q-96 42 -42 12 Q-20 -8 -30 -50 Q-36 -104 10 -104 Q52 -104 46 -62 L46 -34 Q38 -10 56 20 Q98 62 70 112Z"
      fill="#fff"
      stroke={OUT}
      strokeWidth="6"
    />
    <path d="M44 -66 L100 -54 L46 -38Z" fill="#ff9a1a" stroke={OUT} strokeWidth="5" />
    <path d="M-20 -92 H36 Q40 -66 14 -64 Q-14 -64 -20 -92Z" fill="#0a0010" stroke={OUT} strokeWidth="3" />
    <path d="M-12 -86 H8" stroke="#fff" strokeWidth="3" opacity=".6" />
    <path d="M-50 60 Q-30 40 -10 70" fill="none" stroke="#d9d9ee" strokeWidth="5" />
  </g>
);

const Alien: C = () => (
  <g {...round}>
    <path d="M0 -112 Q86 -100 80 -10 Q70 70 0 102 Q-70 70 -80 -10 Q-86 -100 0 -112Z" fill="#5cff2a" stroke={OUT} strokeWidth="6" />
    <path d="M-78 -34 Q-40 -54 -4 -32 Q-8 6 -44 6 Q-76 0 -78 -34Z" fill="#0a0010" stroke={OUT} strokeWidth="3" />
    <path d="M78 -34 Q40 -54 4 -32 Q8 6 44 6 Q76 0 78 -34Z" fill="#0a0010" stroke={OUT} strokeWidth="3" />
    <path d="M-62 -34 L-40 -42 M18 -34 L40 -42" stroke="#fff" strokeWidth="4" opacity=".6" />
    <path d="M-24 52 Q0 70 24 52" fill="none" stroke={OUT} strokeWidth="5" />
  </g>
);

const Screamer: C = () => (
  <g {...round}>
    <path d="M0 -104 Q72 -104 82 -30 Q94 52 42 98 Q0 114 -42 98 Q-94 52 -82 -30 Q-72 -104 0 -104Z" fill="#ff5fd0" stroke={OUT} strokeWidth="6" />
    <circle cx="-30" cy="-44" r="20" fill="#fff" stroke={OUT} strokeWidth="4" />
    <circle cx="30" cy="-44" r="20" fill="#fff" stroke={OUT} strokeWidth="4" />
    <circle cx="-26" cy="-40" r="7" fill={OUT} />
    <circle cx="34" cy="-40" r="7" fill={OUT} />
    <ellipse cx="0" cy="36" rx="34" ry="42" fill="#3b0030" stroke={OUT} strokeWidth="5" />
    <ellipse cx="0" cy="58" rx="22" ry="16" fill="#ff3d6e" />
  </g>
);

const Banana: C = () => (
  <g {...round}>
    <path d="M-104 -34 Q-34 108 104 -56 L94 -74 Q12 34 -94 -66Z" fill="#ffe62b" stroke={OUT} strokeWidth="6" />
    <path d="M-104 -34 L-94 -66 L-108 -76 L-116 -44Z" fill="#6b3d1a" stroke={OUT} strokeWidth="4" />
    <path d="M-60 -14 Q-10 52 70 -22" fill="none" stroke="#e0b800" strokeWidth="4" />
  </g>
);

const Pizza: C = () => (
  <g {...round}>
    <path d="M-86 -72 Q0 -106 86 -72 L0 108Z" fill="#ffc247" stroke={OUT} strokeWidth="6" />
    <path d="M-86 -72 Q0 -106 86 -72" fill="none" stroke="#e0832b" strokeWidth="18" />
    <circle cx="-26" cy="-40" r="15" fill="#e0242f" stroke={OUT} strokeWidth="3" />
    <circle cx="26" cy="-32" r="14" fill="#e0242f" stroke={OUT} strokeWidth="3" />
    <circle cx="0" cy="8" r="15" fill="#e0242f" stroke={OUT} strokeWidth="3" />
    <circle cx="-4" cy="58" r="10" fill="#e0242f" stroke={OUT} strokeWidth="3" />
  </g>
);

const Disco: C = () => (
  <g {...round}>
    <path d="M0 -150 V-72" stroke={OUT} strokeWidth="5" />
    <circle r="72" fill="url(#discoGrad)" stroke={OUT} strokeWidth="6" />
    <g fill="none" stroke="#3a3a55" strokeWidth="2" opacity=".7">
      <ellipse rx="72" ry="26" />
      <ellipse rx="72" ry="52" />
      <ellipse rx="26" ry="72" />
      <ellipse rx="52" ry="72" />
      <path d="M-72 0 H72 M0 -72 V72" />
    </g>
    <rect x="-40" y="-44" width="14" height="14" fill="#ff2fb3" opacity=".8" />
    <rect x="18" y="-14" width="14" height="14" fill="#00e5ff" opacity=".8" />
    <rect x="-10" y="26" width="14" height="14" fill="#fff000" opacity=".8" />
    <path d="M-44 -48 l8 -18 l8 18 l18 8 l-18 8 l-8 18 l-8 -18 l-18 -8Z" fill="#fff" opacity=".9" transform="scale(.5) translate(-30 -20)" />
  </g>
);

const Sunflower: C = () => (
  <g {...round}>
    {Array.from({ length: 14 }).map((_, i) => (
      <ellipse key={i} cx="0" cy="-66" rx="17" ry="40" fill="#ffd21f" stroke={OUT} strokeWidth="4" transform={`rotate(${(i * 360) / 14})`} />
    ))}
    <circle r="40" fill="#5a2e0e" stroke={OUT} strokeWidth="5" />
    {Array.from({ length: 12 }).map((_, i) => (
      <circle key={i} cx={Math.cos(i * 2.4) * (4 + i * 2.6)} cy={Math.sin(i * 2.4) * (4 + i * 2.6)} r="3" fill="#2a1204" />
    ))}
  </g>
);

const Globe: C = () => (
  <g {...round}>
    <clipPath id="globeClip">
      <circle r="80" />
    </clipPath>
    <circle r="80" fill="#2f7bff" />
    <g clipPath="url(#globeClip)" fill="#39d43a" stroke="#0b6b1a" strokeWidth="3">
      <path d="M-70 -30 Q-40 -64 -10 -40 Q10 -20 -14 4 Q-34 30 -58 8Z" />
      <path d="M20 -50 Q56 -62 74 -26 Q60 4 40 -4 Q18 -20 20 -50Z" />
      <path d="M0 30 Q30 20 44 50 Q28 80 4 66Z" />
    </g>
    <circle r="80" fill="none" stroke={OUT} strokeWidth="6" />
    <path d="M-50 -50 Q-20 -72 14 -66" fill="none" stroke="#fff" strokeWidth="6" opacity=".6" />
  </g>
);

const Car: C = () => (
  <g {...round}>
    <path d="M-134 34 L-124 2 L-62 -18 L-22 -48 L52 -48 L102 -12 L138 4 L142 36Z" fill="#ff2fb3" stroke={OUT} strokeWidth="6" />
    <path d="M-16 -38 L48 -38 L86 -10 L-36 -12Z" fill="#1b0030" stroke={OUT} strokeWidth="4" />
    <path d="M-120 14 L130 14" stroke="#ff9ae0" strokeWidth="4" />
    <rect x="108" y="10" width="26" height="9" fill="#fff000" stroke={OUT} strokeWidth="2" />
    <circle cx="-72" cy="38" r="28" fill="#150020" stroke={OUT} strokeWidth="5" />
    <circle cx="-72" cy="38" r="12" fill="#cfd3ff" />
    <circle cx="82" cy="38" r="28" fill="#150020" stroke={OUT} strokeWidth="5" />
    <circle cx="82" cy="38" r="12" fill="#cfd3ff" />
  </g>
);

const Nuggets: C = () => (
  <g {...round}>
    {[
      [-34, 18, 1, "#e8a24a"],
      [36, -4, 0.92, "#f0b25a"],
      [0, -50, 0.85, "#dc9438"],
    ].map(([x, y, s, c], i) => (
      <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
        <path d="M-70 20 Q-92 -30 -40 -40 Q10 -62 52 -30 Q82 0 60 40 Q10 62 -70 20Z" fill={c as string} stroke={OUT} strokeWidth="6" />
        <circle cx="-20" cy="-8" r="4" fill="#b8741e" />
        <circle cx="20" cy="10" r="4" fill="#b8741e" />
        <circle cx="0" cy="-20" r="3" fill="#b8741e" />
      </g>
    ))}
  </g>
);

const Computer: C = () => (
  <g {...round}>
    <rect x="-80" y="-86" width="160" height="124" rx="10" fill="#e4dfcf" stroke={OUT} strokeWidth="6" />
    <rect x="-64" y="-72" width="128" height="86" rx="6" fill="#0d6b3a" stroke={OUT} strokeWidth="4" />
    <text x="0" y="-36" textAnchor="middle" fontFamily="'Anton','Impact',sans-serif" fontSize="22" fill="#b6ffb0">WORST</text>
    <text x="0" y="-10" textAnchor="middle" fontFamily="'Anton','Impact',sans-serif" fontSize="22" fill="#b6ffb0">DEAL</text>
    <rect x="-36" y="38" width="72" height="16" fill="#cfc9b6" stroke={OUT} strokeWidth="4" />
    <rect x="-100" y="54" width="200" height="30" rx="6" fill="#e4dfcf" stroke={OUT} strokeWidth="5" />
    <path d="M-84 66 H84" stroke="#9a947f" strokeWidth="8" strokeDasharray="8 4" />
  </g>
);

const Smiley: C = () => (
  <g {...round}>
    <circle r="62" fill="#ffe62b" stroke={OUT} strokeWidth="6" />
    <circle cx="-20" cy="-14" r="8" fill={OUT} />
    <circle cx="20" cy="-14" r="8" fill={OUT} />
    <path d="M-34 14 Q0 56 34 14" fill="none" stroke={OUT} strokeWidth="6" />
  </g>
);

const Derpy: C = () => (
  <g {...round}>
    <path d="M-70 -34 L-62 -96 L-34 -66 L-10 -108 L14 -66 L42 -102 L52 -50 Q86 -8 62 46 Q40 92 0 92 Q-56 92 -72 40 Q-84 0 -70 -34Z" fill="#ffe62b" stroke={OUT} strokeWidth="6" />
    <circle cx="-26" cy="-14" r="22" fill="#fff" stroke={OUT} strokeWidth="4" />
    <circle cx="26" cy="-14" r="22" fill="#fff" stroke={OUT} strokeWidth="4" />
    <circle cx="-20" cy="-8" r="7" fill={OUT} />
    <circle cx="34" cy="-18" r="7" fill={OUT} />
    <path d="M-30 40 Q0 70 30 40 Z" fill="#7a0030" stroke={OUT} strokeWidth="5" />
  </g>
);

const Shades: C = () => {
  const px = 10;
  const lens = (ox: number) =>
    [
      [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
      [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
      [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
      [1, 3], [2, 3], [3, 3], [4, 3], [5, 3],
      [2, 4], [3, 4], [4, 4],
    ].map(([x, y], i) => (
      <rect key={`${ox}-${i}`} x={ox + x * px} y={y * px} width={px} height={px} fill="#0a0010" />
    ));
  const glint = (ox: number) =>
    [[1, 1], [3, 1], [2, 2], [4, 2], [1, 3]].map(([x, y], i) => (
      <rect key={`g${ox}-${i}`} x={ox + x * px} y={y * px} width={px} height={px} fill="#fff" />
    ));
  return (
    <g transform="translate(-85 -25)">
      {lens(0)}
      {lens(100)}
      <rect x={60} y={10} width={40} height={px} fill="#0a0010" />
      {glint(0)}
      {glint(100)}
    </g>
  );
};

const Rainbow: C = () => (
  <g {...round}>
    {["#ff1744", "#ff7a00", "#fff000", "#39ff14", "#00e5ff", "#8a2bff"].map((c, i) => (
      <path key={c} d={`M-110 ${-30 + i * 11} Q-55 ${-52 + i * 11} 0 ${-30 + i * 11} T110 ${-30 + i * 11}`} fill="none" stroke={c} strokeWidth="12" />
    ))}
  </g>
);

export const CHARS = {
  cat: Cat,
  goose: Goose,
  alien: Alien,
  screamer: Screamer,
  banana: Banana,
  pizza: Pizza,
  disco: Disco,
  sunflower: Sunflower,
  globe: Globe,
  car: Car,
  nuggets: Nuggets,
  computer: Computer,
  smiley: Smiley,
  derpy: Derpy,
  shades: Shades,
  rainbow: Rainbow,
} satisfies Record<string, C>;

export type CharKey = keyof typeof CHARS;