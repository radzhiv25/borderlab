"use client";

import { motion } from "framer-motion";
import { Stamp, Waves, Activity } from "lucide-react";
import { useBorderStore } from "@/store/useBorderStore";
import type { BorderStyle } from "@/lib/generators";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PRESETS: { id: BorderStyle; label: string; icon: React.ReactNode }[] = [
  { id: "stamp", label: "Stamp", icon: <Stamp className="h-4 w-4" /> },
  { id: "scallop", label: "Scallop", icon: <Waves className="h-4 w-4" /> },
  { id: "zigzag", label: "Zigzag", icon: <Activity className="h-4 w-4" /> },
];

export function PresetList() {
  const style = useBorderStore((s) => s.style);
  const loadPreset = useBorderStore((s) => s.loadPreset);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">
        Presets
      </p>
      <ul className="space-y-0.5">
        {PRESETS.map((preset, i) => (
          <motion.li
            key={preset.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "w-full justify-start gap-2 font-normal text-xs h-8",
                style === preset.id && "bg-accent text-accent-foreground"
              )}
              onClick={() => loadPreset(preset.id)}
            >
              {preset.icon}
              {preset.label}
            </Button>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
