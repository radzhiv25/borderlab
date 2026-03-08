export type BorderStyle = "stamp" | "scallop" | "zigzag";

export type AspectRatio =
  | "1:1"
  | "4:3"
  | "3:2"
  | "16:9"
  | "2:3"
  | "3:4"
  | "9:16"
  | "custom";

export const ASPECT_RATIO_VALUES: Record<
  Exclude<AspectRatio, "custom">,
  number
> = {
  "1:1": 1,
  "4:3": 4 / 3,
  "3:2": 3 / 2,
  "16:9": 16 / 9,
  "2:3": 2 / 3,
  "3:4": 3 / 4,
  "9:16": 9 / 16,
};

export interface BorderConfig {
  style: BorderStyle;
  teethCount: number; // teeth on horizontal edge
  depth: number; // teeth protrusion, fraction of min dim (0.01–0.12)
  margin: number; // inner margin, fraction of min dim (0–0.2)
  borderColor: string;
  width: number;
  height: number;
}

export interface CanvasLayout {
  width: number;
  height: number;
  depthPx: number;
  marginPx: number;
  imageArea: { x: number; y: number; w: number; h: number };
}

export const BASE_SIZE = 500;

export function computeCanvasSize(
  ratio: number,
  base = BASE_SIZE
): { width: number; height: number } {
  if (ratio >= 1) return { width: base, height: Math.round(base / ratio) };
  return { width: Math.round(base * ratio), height: base };
}

export function computeLayout(config: BorderConfig): CanvasLayout {
  const { width, height, depth, margin } = config;
  const minDim = Math.min(width, height);
  const depthPx = depth * minDim;
  const marginPx = margin * minDim;
  const inset = depthPx + marginPx;
  return {
    width,
    height,
    depthPx,
    marginPx,
    imageArea: {
      x: inset,
      y: inset,
      w: Math.max(0, width - 2 * inset),
      h: Math.max(0, height - 2 * inset),
    },
  };
}

export const DEFAULT_CONFIG: BorderConfig = {
  style: "stamp",
  teethCount: 12,
  depth: 0.045,
  margin: 0.06,
  borderColor: "#f5f0eb",
  width: BASE_SIZE,
  height: BASE_SIZE,
};

export const PRESET_CONFIGS: Record<BorderStyle, Partial<BorderConfig>> = {
  stamp: {
    style: "stamp",
    teethCount: 12,
    depth: 0.045,
    margin: 0.06,
  },
  scallop: {
    style: "scallop",
    teethCount: 10,
    depth: 0.055,
    margin: 0.05,
  },
  zigzag: {
    style: "zigzag",
    teethCount: 18,
    depth: 0.035,
    margin: 0.05,
  },
};
