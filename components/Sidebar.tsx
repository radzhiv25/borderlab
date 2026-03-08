"use client";

import { motion } from "framer-motion";
import { PresetList } from "@/components/presets/PresetList";
import { AspectRatioSelector } from "@/components/controls/AspectRatioSelector";
import { cn } from "@/lib/utils";

export function Sidebar({ className }: { className?: string }) {
  return (
    <motion.aside
      className={cn(
        "flex w-[200px] shrink-0 flex-col gap-6 border-r border-border bg-card/50 p-4",
        className
      )}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div>
        <h1 className="text-base font-semibold tracking-tight">Borderlab</h1>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Stamp border generator
        </p>
      </div>
      <PresetList />
      <AspectRatioSelector />
    </motion.aside>
  );
}
