import type { BorderConfig } from "./types";
import { cornerFills } from "./corners";

const fmt = (n: number) => Math.round(n * 100) / 100;

/**
 * Scallop border: smooth wave-like curves protruding outward
 * using quadratic bezier curves for an elegant wavy edge.
 */
export function generateScallopBorder(config: BorderConfig): string {
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
    const x1 = bl + (i + 1) * stepH;
    const cx = (x0 + x1) / 2;
    p.push(`Q ${fmt(cx)} ${fmt(bt - d)} ${fmt(x1)} ${fmt(bt)}`);
  }

  for (let i = 0; i < nV; i++) {
    const y0 = bt + i * stepV;
    const y1 = bt + (i + 1) * stepV;
    const cy = (y0 + y1) / 2;
    p.push(`Q ${fmt(br + d)} ${fmt(cy)} ${fmt(br)} ${fmt(y1)}`);
  }

  for (let i = 0; i < nH; i++) {
    const x0 = br - i * stepH;
    const x1 = br - (i + 1) * stepH;
    const cx = (x0 + x1) / 2;
    p.push(`Q ${fmt(cx)} ${fmt(bb + d)} ${fmt(x1)} ${fmt(bb)}`);
  }

  for (let i = 0; i < nV; i++) {
    const y0 = bb - i * stepV;
    const y1 = bb - (i + 1) * stepV;
    const cy = (y0 + y1) / 2;
    p.push(`Q ${fmt(bl - d)} ${fmt(cy)} ${fmt(bl)} ${fmt(y1)}`);
  }

  p.push("Z");
  return p.join(" ") + " " + cornerFills(d, w, h);
}
