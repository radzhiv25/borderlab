import type { BorderConfig } from "./types";
import { cornerFills } from "./corners";

const fmt = (n: number) => Math.round(n * 100) / 100;

/**
 * Classic postage-stamp border: semicircular teeth protruding outward
 * from a rectangular baseline. The path traces the outer silhouette.
 */
export function generateStampBorder(config: BorderConfig): string {
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

  const arcR = (step: number) =>
    d > 0.001 ? (d * d + (step / 2) ** 2) / (2 * d) : step * 100;
  const laf = (step: number) => (d > step / 2 ? 1 : 0);

  const rH = arcR(stepH);
  const rV = arcR(stepV);
  const lafH = laf(stepH);
  const lafV = laf(stepV);

  const p: string[] = [`M ${fmt(bl)} ${fmt(bt)}`];

  for (let i = 0; i < nH; i++)
    p.push(
      `A ${fmt(rH)} ${fmt(rH)} 0 ${lafH} 0 ${fmt(bl + (i + 1) * stepH)} ${fmt(bt)}`
    );

  for (let i = 0; i < nV; i++)
    p.push(
      `A ${fmt(rV)} ${fmt(rV)} 0 ${lafV} 0 ${fmt(br)} ${fmt(bt + (i + 1) * stepV)}`
    );

  for (let i = 0; i < nH; i++)
    p.push(
      `A ${fmt(rH)} ${fmt(rH)} 0 ${lafH} 0 ${fmt(br - (i + 1) * stepH)} ${fmt(bb)}`
    );

  for (let i = 0; i < nV; i++)
    p.push(
      `A ${fmt(rV)} ${fmt(rV)} 0 ${lafV} 0 ${fmt(bl)} ${fmt(bb - (i + 1) * stepV)}`
    );

  p.push("Z");
  return p.join(" ") + " " + cornerFills(d, w, h);
}
