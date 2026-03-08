"use client";

import { motion } from "framer-motion";
import { ImagePreview } from "@/components/preview/ImagePreview";
import { BorderControls } from "@/components/controls/BorderControls";
import { ExportActions } from "@/components/controls/ExportActions";

export function MainContent() {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* center: preview */}
      <motion.main
        className="flex min-w-0 flex-1 items-center justify-center overflow-auto bg-muted/20 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
      >
        <ImagePreview />
      </motion.main>

      {/* right panel: controls + export */}
      <motion.aside
        className="flex w-[240px] shrink-0 flex-col gap-6 overflow-y-auto border-l border-border bg-card/50 p-4"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <BorderControls />
        <div className="h-px bg-border" />
        <ExportActions />
      </motion.aside>
    </div>
  );
}
