import type { BorderConfig } from "./types";
import { generateStampBorder } from "./stamp";
import { generateScallopBorder } from "./scallop";
import { generateZigzagBorder } from "./zigzag";

export type {
  BorderConfig,
  BorderStyle,
  AspectRatio,
  CanvasLayout,
} from "./types";
export {
  DEFAULT_CONFIG,
  PRESET_CONFIGS,
  ASPECT_RATIO_VALUES,
  BASE_SIZE,
  computeCanvasSize,
  computeLayout,
} from "./types";

export function generateBorderPath(config: BorderConfig): string {
  switch (config.style) {
    case "stamp":
      return generateStampBorder(config);
    case "scallop":
      return generateScallopBorder(config);
    case "zigzag":
      return generateZigzagBorder(config);
    default:
      return generateStampBorder(config);
  }
}
