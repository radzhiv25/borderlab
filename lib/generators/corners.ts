const fmt = (n: number) => Math.round(n * 100) / 100;

/**
 * Generates four corner-fill subpaths that smoothly round the gap
 * between adjacent edges. Each corner is a quadratic bezier curve
 * through the canvas corner, filling the depthPx × depthPx gap.
 */
export function cornerFills(d: number, w: number, h: number): string {
  const bl = d,
    bt = d,
    br = w - d,
    bb = h - d;
  return [
    `M 0 ${fmt(bt)} Q 0 0 ${fmt(bl)} 0 L ${fmt(bl)} ${fmt(bt)} Z`,
    `M ${fmt(br)} 0 Q ${fmt(w)} 0 ${fmt(w)} ${fmt(bt)} L ${fmt(br)} ${fmt(bt)} Z`,
    `M ${fmt(w)} ${fmt(bb)} Q ${fmt(w)} ${fmt(h)} ${fmt(br)} ${fmt(h)} L ${fmt(br)} ${fmt(bb)} Z`,
    `M ${fmt(bl)} ${fmt(h)} Q 0 ${fmt(h)} 0 ${fmt(bb)} L ${fmt(bl)} ${fmt(bb)} Z`,
  ].join(" ");
}
