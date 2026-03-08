import { create } from "zustand";
import type { BorderStyle, AspectRatio } from "@/lib/generators";
import {
  DEFAULT_CONFIG,
  PRESET_CONFIGS,
  ASPECT_RATIO_VALUES,
  computeCanvasSize,
} from "@/lib/generators";

export interface BorderState {
  style: BorderStyle;
  teethCount: number;
  depth: number;
  margin: number;
  borderColor: string;
  width: number;
  height: number;
  aspectRatio: AspectRatio;
  customRatioW: number;
  customRatioH: number;
  imageUrl: string | null;
}

export interface BorderActions {
  setStyle: (style: BorderStyle) => void;
  setTeethCount: (v: number) => void;
  setDepth: (v: number) => void;
  setMargin: (v: number) => void;
  setBorderColor: (v: string) => void;
  setAspectRatio: (r: AspectRatio) => void;
  setCustomRatio: (w: number, h: number) => void;
  setImageUrl: (url: string | null) => void;
  loadPreset: (style: BorderStyle) => void;
  removeImage: () => void;
}

function dimFromRatio(ratio: AspectRatio, cw: number, ch: number) {
  if (ratio === "custom") {
    const r = cw / (ch || 1);
    return computeCanvasSize(r);
  }
  return computeCanvasSize(ASPECT_RATIO_VALUES[ratio]);
}

export const useBorderStore = create<BorderState & BorderActions>(
  (set) => ({
    ...DEFAULT_CONFIG,
    aspectRatio: "1:1" as AspectRatio,
    customRatioW: 4,
    customRatioH: 3,
    imageUrl: null,

    setStyle: (style) =>
      set({ style, ...PRESET_CONFIGS[style] }),

    setTeethCount: (teethCount) => set({ teethCount: Math.round(teethCount) }),
    setDepth: (depth) => set({ depth }),
    setMargin: (margin) => set({ margin }),
    setBorderColor: (borderColor) => set({ borderColor }),

    setAspectRatio: (aspectRatio) =>
      set((s) => {
        const dims = dimFromRatio(aspectRatio, s.customRatioW, s.customRatioH);
        return { aspectRatio, ...dims };
      }),

    setCustomRatio: (w, h) =>
      set((s) => {
        if (s.aspectRatio !== "custom") return { customRatioW: w, customRatioH: h };
        const dims = computeCanvasSize(w / (h || 1));
        return { customRatioW: w, customRatioH: h, ...dims };
      }),

    setImageUrl: (imageUrl) => set({ imageUrl }),

    loadPreset: (style) =>
      set((s) => ({
        style,
        ...PRESET_CONFIGS[style],
        width: s.width,
        height: s.height,
      })),

    removeImage: () => set({ imageUrl: null }),
  })
);
