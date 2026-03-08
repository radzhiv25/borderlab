import type { BorderConfig } from "./types";
import { cornerFills } from "./corners";

const fmt = (n: number) => Math.round(n * 100) / 100;

/**
 * Zigzag border: sharp triangular teeth protruding outward
 * from a rectangular baseline.
 */
export function generateZigzagBorder(config: BorderConfig): string {
  const { teethCount, depth, width: w, height: h } = config;
  const minDim = Math.min(w, h);
  const d = Math.max(1, depth * minDim);

  const bl = d,
    bt = d,
    br = w - d,
    bb = h - d;
  const bw = br - bl;
  const bh = bb - bt;

  const nH = Math.max(2, Math.round(teethCount));
  const stepH = bw / nH;
  const nV = Math.max(2, Math.round(bh / stepH));
  const stepV = bh / nV;

  const p: string[] = [`M ${fmt(bl)} ${fmt(bt)}`];

  for (let i = 0; i < nH; i++) {
    const x0 = bl + i * stepH;
    const mid = x0 + stepH / 2;
    const x1 = bl + (i + 1) * stepH;
    p.push(`L ${fmt(mid)} ${fmt(bt - d)} L ${fmt(x1)} ${fmt(bt)}`);
  }

  for (let i = 0; i < nV; i++) {
    const y0 = bt + i * stepV;
    const mid = y0 + stepV / 2;
    const y1 = bt + (i + 1) * stepV;
    p.push(`L ${fmt(br + d)} ${fmt(mid)} L ${fmt(br)} ${fmt(y1)}`);
  }

  for (let i = 0; i < nH; i++) {
    const x0 = br - i * stepH;
    const mid = x0 - stepH / 2;
    const x1 = br - (i + 1) * stepH;
    p.push(`L ${fmt(mid)} ${fmt(bb + d)} L ${fmt(x1)} ${fmt(bb)}`);
  }

  for (let i = 0; i < nV; i++) {
    const y0 = bb - i * stepV;
    const mid = y0 - stepV / 2;
    const y1 = bb - (i + 1) * stepV;
    p.push(`L ${fmt(bl - d)} ${fmt(mid)} L ${fmt(bl)} ${fmt(y1)}`);
  }

  p.push("Z");
  return p.join(" ") + " " + cornerFills(d, w, h);
}
