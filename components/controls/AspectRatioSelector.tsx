"use client";

import { motion } from "framer-motion";
import { useBorderStore } from "@/store/useBorderStore";
import type { AspectRatio } from "@/lib/generators";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const RATIOS: { value: AspectRatio; label: string; w: number; h: number }[] = [
  { value: "1:1", label: "1:1", w: 1, h: 1 },
  { value: "4:3", label: "4:3", w: 4, h: 3 },
  { value: "3:2", label: "3:2", w: 3, h: 2 },
  { value: "16:9", label: "16:9", w: 16, h: 9 },
  { value: "2:3", label: "2:3", w: 2, h: 3 },
  { value: "3:4", label: "3:4", w: 3, h: 4 },
  { value: "9:16", label: "9:16", w: 9, h: 16 },
];

export function AspectRatioSelector() {
  const aspectRatio = useBorderStore((s) => s.aspectRatio);
  const setAspectRatio = useBorderStore((s) => s.setAspectRatio);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <Label className="text-xs text-muted-foreground uppercase tracking-wider">
        Aspect ratio
      </Label>
      <div className="grid grid-cols-4 gap-1.5">
        {RATIOS.map((r) => {
          const size = 22;
          const scale = size / Math.max(r.w, r.h);
          const rw = Math.round(r.w * scale);
          const rh = Math.round(r.h * scale);
          return (
            <button
              key={r.value}
              onClick={() => setAspectRatio(r.value)}
              className={cn(
                "flex flex-col items-center gap-1 rounded-lg p-1.5 text-[10px] transition-colors",
                aspectRatio === r.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted"
              )}
            >
              <div
                className={cn(
                  "rounded-sm border",
                  aspectRatio === r.value
                    ? "border-primary-foreground/40"
                    : "border-muted-foreground/30"
                )}
                style={{ width: rw, height: rh }}
              />
              <span className="font-medium">{r.label}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
