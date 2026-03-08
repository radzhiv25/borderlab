"use client";

import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { useBorderStore } from "@/store/useBorderStore";
import { generateBorderPath, computeLayout } from "@/lib/generators";
import { ImagePlus, Replace } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ImagePreview() {
  const imageUrl = useBorderStore((s) => s.imageUrl);
  const setImageUrl = useBorderStore((s) => s.setImageUrl);
  const removeImage = useBorderStore((s) => s.removeImage);
  const style = useBorderStore((s) => s.style);
  const teethCount = useBorderStore((s) => s.teethCount);
  const depth = useBorderStore((s) => s.depth);
  const margin = useBorderStore((s) => s.margin);
  const borderColor = useBorderStore((s) => s.borderColor);
  const width = useBorderStore((s) => s.width);
  const height = useBorderStore((s) => s.height);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const config = { style, teethCount, depth, margin, borderColor, width, height };
  const path = generateBorderPath(config);
  const layout = computeLayout(config);
  const { imageArea } = layout;

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0];
      if (!file) return;
      setImageUrl(URL.createObjectURL(file));
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
    maxFiles: 1,
    noClick: !!imageUrl,
    noKeyboard: !!imageUrl,
  });

  const maxDisplayW = 520;
  const scale = Math.min(1, maxDisplayW / width);
  const displayW = width * scale;
  const displayH = height * scale;

  return (
    <motion.div
      className="relative flex w-full items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      <div
        {...getRootProps()}
        className={cn(
          "relative flex items-center justify-center rounded-2xl transition-colors",
          !imageUrl && "cursor-pointer",
          isDragActive && "ring-2 ring-primary ring-offset-4"
        )}
      >
        <input {...getInputProps()} />

        {/* checkerboard bg */}
        <div
          className="absolute rounded-2xl checkerboard"
          style={{ width: displayW + 32, height: displayH + 32 }}
        />

        {/* stamp svg */}
        <div className="relative z-10 stamp-shadow" style={{ width: displayW, height: displayH }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            width={displayW}
            height={displayH}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="stamp-clip">
                <path d={path} />
              </clipPath>
            </defs>
            <g clipPath="url(#stamp-clip)">
              <rect width={width} height={height} fill={borderColor} />
              {imageUrl ? (
                <image
                  href={imageUrl}
                  x={imageArea.x}
                  y={imageArea.y}
                  width={imageArea.w}
                  height={imageArea.h}
                  preserveAspectRatio="xMidYMid slice"
                />
              ) : (
                <rect
                  x={imageArea.x}
                  y={imageArea.y}
                  width={imageArea.w}
                  height={imageArea.h}
                  fill="#e8e4de"
                />
              )}
            </g>
          </svg>
        </div>

        {/* empty state overlay */}
        <AnimatePresence>
          {!imageUrl && (
            <motion.div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImagePlus className="h-10 w-10" />
              <p className="text-sm font-medium">
                {isDragActive ? "Drop image here" : "Drop an image or click to upload"}
              </p>
              <p className="text-xs opacity-60">PNG, JPG, GIF, WebP</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* replace / remove controls */}
      {imageUrl && (
        <motion.div
          className="absolute bottom-3 right-3 z-30 flex gap-1.5"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setImageUrl(URL.createObjectURL(f));
            }}
          />
          <Button
            size="sm"
            variant="secondary"
            className="h-7 text-xs shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            <Replace className="h-3 w-3 mr-1" />
            Replace
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-7 text-xs shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
          >
            Remove
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
