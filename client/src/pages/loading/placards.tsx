import type { ReactElement } from "react";
import { OUT } from "./art";

export const ANTON = "'Anton','Impact','Arial Narrow',sans-serif";
export const MARKER = "'Permanent Marker','Comic Sans MS',cursive";

export type PlacardKind =
  | "paper"
  | "black"
  | "pink"
  | "yellow"
  | "cyan"
  | "blue"
  | "lime"
  | "check"
  | "arrow"
  | "bubble";

export interface PlacardDef {
  kind: PlacardKind;
  lines: string[];
  w: number;
  h: number;
}

const THEME: Record<
  PlacardKind,
  { bg: string; fg: string; font: string; fw: number; stroke: string }
> = {
  paper: { bg: "#f4efe6", fg: "#1a0020", font: ANTON, fw: 0.46, stroke: OUT },
  black: { bg: "#0a0010", fg: "#ff2fb3", font: ANTON, fw: 0.46, stroke: "#ff2fb3" },
  pink: { bg: "#ff6fd8", fg: "#1a0020", font: ANTON, fw: 0.46, stroke: OUT },
  yellow: { bg: "#fff23a", fg: "#1a0020", font: ANTON, fw: 0.46, stroke: OUT },
  cyan: { bg: "#18d9ff", fg: "#08203a", font: MARKER, fw: 0.62, stroke: OUT },
  blue: { bg: "#10198f", fg: "#ffffff", font: ANTON, fw: 0.46, stroke: "#e9e9ff" },
  lime: { bg: "#b9ff2a", fg: "#1a0020", font: ANTON, fw: 0.46, stroke: OUT },
  check: { bg: "#f4efe6", fg: "#1a0020", font: ANTON, fw: 0.46, stroke: OUT },
  arrow: { bg: "#0a0010", fg: "#ffffff", font: ANTON, fw: 0.46, stroke: "#ffffff" },
  bubble: { bg: "#ff9ae0", fg: "#a8006e", font: MARKER, fw: 0.62, stroke: "#ff2fb3" },
};

export const PLACARDS: PlacardDef[] = [
  { kind: "paper", lines: ["IS THIS", "REAL LIFE?"], w: 230, h: 110 },
  { kind: "black", lines: ["ERROR 404", "REFUND", "NOT FOUND"], w: 230, h: 120 },
  { kind: "pink", lines: ["NO THOUGHTS", "JUST CART"], w: 250, h: 84 },
  { kind: "yellow", lines: ["CHICKEN NUGGET", "SUPREMACY"], w: 230, h: 76 },
  { kind: "pink", lines: ["MENTALLY IN", "THE CHECKOUT"], w: 270, h: 84 },
  { kind: "bubble", lines: ["Slay", "Anyway"], w: 210, h: 130 },
  { kind: "check", lines: ["SLEEP", "EAT", "SHOP", "REPEAT"], w: 190, h: 150 },
  { kind: "blue", lines: ["LIFE IS", "BETTER", "IN PAJAMAS"], w: 210, h: 130 },
  { kind: "lime", lines: ["SAME CART", "DIFFERENT DAY"], w: 240, h: 92 },
  { kind: "yellow", lines: ["GOOD DEALS", "BAD MOOD"], w: 180, h: 110 },
  { kind: "cyan", lines: ["too cheap", "for this", "world"], w: 170, h: 130 },
  { kind: "paper", lines: ["WHO", "CARES", "ANYWAY?"], w: 170, h: 130 },
  { kind: "arrow", lines: ["HOT DEALS", "USE", "DARK MODE"], w: 230, h: 150 },
  { kind: "bubble", lines: ["refunds", "are a myth"], w: 250, h: 150 },
  { kind: "yellow", lines: ["Feeling", "overpriced"], w: 190, h: 90 },
  { kind: "pink", lines: ["it is what", "it is :)"], w: 170, h: 90 },
  { kind: "paper", lines: ["ALL SALES", "FINAL (LOL)"], w: 220, h: 100 },
  { kind: "cyan", lines: ["I'm just a", "shopper"], w: 190, h: 90 },
];

function Tape({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <rect x={x - 26} y={y - 8} width="52" height="16" fill="#fff" opacity=".55" transform={`rotate(${r} ${x} ${y})`} />
  );
}

export function Placard({ def }: { def: PlacardDef }): ReactElement {
  const { w, h, lines, kind } = def;
  const t = THEME[kind];
  const maxLen = Math.max(...lines.map((l) => l.length));
  const n = lines.length;

  if (kind === "arrow") {
    const lh = h / n;
    return (
      <g transform={`translate(${-w / 2} ${-h / 2})`} strokeLinejoin="round">
        {lines.map((l, i) => {
          const y = i * lh + 3;
          const hh = lh - 6;
          const flip = i % 2 === 1;
          const d = flip
            ? `M${w} ${y} L18 ${y} L0 ${y + hh / 2} L18 ${y + hh} L${w} ${y + hh}Z`
            : `M0 ${y} L${w - 18} ${y} L${w} ${y + hh / 2} L${w - 18} ${y + hh} L0 ${y + hh}Z`;
          return (
            <g key={l}>
              <path d={d} fill={t.bg} stroke={t.stroke} strokeWidth="3" />
              <text x={w / 2} y={y + hh / 2 + hh * 0.22} textAnchor="middle" fontFamily={t.font} fontSize={Math.min(hh * 0.62, (w * 0.7) / (l.length * t.fw))} fill={t.fg}>
                {l}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  if (kind === "bubble") {
    const fs = Math.min((h * 0.5) / n, (w * 0.56) / (maxLen * t.fw));
    return (
      <g transform={`translate(${-w / 2} ${-h / 2})`}>
        <g transform={`translate(${w / 2} ${h / 2}) scale(${w / 112} ${h / 100})`}>
          <path
            d="M0 42 C-62 2 -48 -46 -22 -42 C-9 -40 0 -30 0 -21 C0 -30 9 -40 22 -42 C48 -46 62 2 0 42Z"
            fill={t.bg}
            stroke={t.stroke}
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
        </g>
        {lines.map((l, i) => (
          <text key={l} x={w / 2} y={h * 0.42 + (i - (n - 1) / 2) * fs * 1.1 + fs * 0.35} textAnchor="middle" fontFamily={t.font} fontSize={fs} fill={t.fg}>
            {l}
          </text>
        ))}
      </g>
    );
  }

  if (kind === "check") {
    const fs = Math.min((h * 0.78) / n, (w * 0.8) / (maxLen * t.fw + 1.4));
    return (
      <g transform={`translate(${-w / 2} ${-h / 2})`} strokeLinejoin="round">
        <rect width={w} height={h} fill={t.bg} stroke={t.stroke} strokeWidth="3" />
        <Tape x={w / 2} y={0} r={-3} />
        {lines.map((l, i) => {
          const cy = h * 0.12 + ((i + 0.5) * (h * 0.78)) / n;
          const b = fs * 0.78;
          return (
            <g key={l}>
              <rect x={14} y={cy - b / 2} width={b} height={b} fill="#fff" stroke="#e0102f" strokeWidth="3" />
              <path d={`M${14 + b * 0.2} ${cy} L${14 + b * 0.45} ${cy + b * 0.28} L${14 + b * 0.95} ${cy - b * 0.5}`} fill="none" stroke="#e0102f" strokeWidth="4" strokeLinecap="round" />
              <text x={14 + b + 10} y={cy + fs * 0.34} fontFamily={t.font} fontSize={fs} fill={t.fg}>
                {l}
              </text>
            </g>
          );
        })}
      </g>
    );
  }

  const fs = Math.min((h * 0.74) / n, (w * 0.88) / (maxLen * t.fw));
  return (
    <g transform={`translate(${-w / 2} ${-h / 2})`} strokeLinejoin="round">
      <rect x="5" y="6" width={w} height={h} fill="#000" opacity=".35" />
      <rect width={w} height={h} fill={t.bg} stroke={t.stroke} strokeWidth="4" />
      {kind === "paper" && <Tape x={w * 0.5} y={0} r={-4} />}
      {kind === "yellow" && <Tape x={w * 0.15} y={2} r={-30} />}
      {kind === "black" && <rect x="6" y="6" width={w - 12} height={h - 12} fill="none" stroke="#ff2fb3" strokeWidth="1.5" strokeDasharray="6 4" opacity=".6" />}
      {lines.map((l, i) => (
        <text key={l} x={w / 2} y={h / 2 + (i - (n - 1) / 2) * fs * 1.08 + fs * 0.35} textAnchor="middle" fontFamily={t.font} fontSize={fs} fill={t.fg}>
          {l}
        </text>
      ))}
    </g>
  );
}