"use client";

import { motion } from "framer-motion";
import { useBorderStore } from "@/store/useBorderStore";
import type { BorderStyle } from "@/lib/generators";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STYLE_OPTIONS: { value: BorderStyle; label: string }[] = [
  { value: "stamp", label: "Stamp" },
  { value: "scallop", label: "Scallop" },
  { value: "zigzag", label: "Zigzag" },
];

export function BorderControls() {
  const style = useBorderStore((s) => s.style);
  const teethCount = useBorderStore((s) => s.teethCount);
  const depth = useBorderStore((s) => s.depth);
  const margin = useBorderStore((s) => s.margin);
  const borderColor = useBorderStore((s) => s.borderColor);
  const setStyle = useBorderStore((s) => s.setStyle);
  const setTeethCount = useBorderStore((s) => s.setTeethCount);
  const setDepth = useBorderStore((s) => s.setDepth);
  const setMargin = useBorderStore((s) => s.setMargin);
  const setBorderColor = useBorderStore((s) => s.setBorderColor);

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Border
      </p>

      <div className="space-y-2">
        <Label className="text-xs">Style</Label>
        <Select value={style} onValueChange={(v) => setStyle(v as BorderStyle)}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STYLE_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">
          Teeth count <span className="text-muted-foreground ml-1">{teethCount}</span>
        </Label>
        <Slider
          value={[teethCount]}
          onValueChange={([v]) => setTeethCount(v)}
          min={4}
          max={40}
          step={1}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">
          Depth <span className="text-muted-foreground ml-1">{Math.round(depth * 100)}%</span>
        </Label>
        <Slider
          value={[depth]}
          onValueChange={([v]) => setDepth(v)}
          min={0.01}
          max={0.12}
          step={0.005}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">
          Margin <span className="text-muted-foreground ml-1">{Math.round(margin * 100)}%</span>
        </Label>
        <Slider
          value={[margin]}
          onValueChange={([v]) => setMargin(v)}
          min={0}
          max={0.2}
          step={0.005}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs">Border color</Label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="h-8 w-8 cursor-pointer rounded border border-input bg-transparent p-0.5"
          />
          <input
            type="text"
            value={borderColor}
            onChange={(e) => setBorderColor(e.target.value)}
            className="h-8 flex-1 rounded-md border border-input bg-transparent px-2 text-xs font-mono"
          />
        </div>
      </div>
    </motion.div>
  );
}
