"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useBorderStore } from "@/store/useBorderStore";
import { generateBorderPath, computeLayout } from "@/lib/generators";
import { exportAsPng } from "@/lib/export";
import { Button } from "@/components/ui/button";
import { Download, Copy, Code, Check, Image as ImageIcon } from "lucide-react";

export function ExportActions() {
  const [copied, setCopied] = useState<"css" | "react" | null>(null);
  const [exporting, setExporting] = useState(false);

  const style = useBorderStore((s) => s.style);
  const teethCount = useBorderStore((s) => s.teethCount);
  const depth = useBorderStore((s) => s.depth);
  const margin = useBorderStore((s) => s.margin);
  const borderColor = useBorderStore((s) => s.borderColor);
  const width = useBorderStore((s) => s.width);
  const height = useBorderStore((s) => s.height);
  const imageUrl = useBorderStore((s) => s.imageUrl);

  const config = { style, teethCount, depth, margin, borderColor, width, height };
  const path = generateBorderPath(config);
  const layout = computeLayout(config);

  const download = useCallback(
    (blob: Blob, name: string) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      a.click();
      URL.revokeObjectURL(url);
    },
    []
  );

  const handleDownloadPng = useCallback(async () => {
    if (!imageUrl) return;
    setExporting(true);
    try {
      const blob = await exportAsPng(
        imageUrl,
        path,
        width,
        height,
        borderColor,
        layout.imageArea,
        3
      );
      download(blob, "borderlab.png");
    } catch {
      /* ignore */
    } finally {
      setExporting(false);
    }
  }, [imageUrl, path, width, height, borderColor, layout.imageArea, download]);

  const handleDownloadSvg = useCallback(() => {
    const { imageArea } = layout;
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <clipPath id="stamp-clip">
      <path d="${path}"/>
    </clipPath>
  </defs>
  <g clip-path="url(#stamp-clip)">
    <rect width="${width}" height="${height}" fill="${borderColor}"/>
    <rect x="${imageArea.x}" y="${imageArea.y}" width="${imageArea.w}" height="${imageArea.h}" fill="#ddd"/>
  </g>
</svg>`;
    download(
      new Blob([svg], { type: "image/svg+xml" }),
      "borderlab.svg"
    );
  }, [path, width, height, borderColor, layout, download]);

  const cssClipPath = `clip-path: path('${path}');`;

  const reactSnippet = `<svg viewBox="0 0 ${width} ${height}" className="w-full h-full">
  <defs>
    <clipPath id="stamp-clip">
      <path d="${path}" />
    </clipPath>
  </defs>
  <g clipPath="url(#stamp-clip)">
    <rect width={${width}} height={${height}} fill="${borderColor}" />
    <image
      href="/your-image.jpg"
      x={${layout.imageArea.x}} y={${layout.imageArea.y}}
      width={${layout.imageArea.w}} height={${layout.imageArea.h}}
      preserveAspectRatio="xMidYMid slice"
    />
  </g>
</svg>`;

  const copy = useCallback(async (text: string, type: "css" | "react") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Export
      </p>
      <div className="flex flex-col gap-1.5">
        <Button
          variant="default"
          size="sm"
          className="w-full justify-start text-xs"
          disabled={!imageUrl || exporting}
          onClick={handleDownloadPng}
        >
          <ImageIcon className="h-3.5 w-3.5 mr-1.5" />
          {exporting ? "Exporting..." : "Download PNG"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs"
          onClick={handleDownloadSvg}
        >
          <Download className="h-3.5 w-3.5 mr-1.5" />
          Download SVG
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs"
          onClick={() => copy(cssClipPath, "css")}
        >
          {copied === "css" ? (
            <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />
          ) : (
            <Copy className="h-3.5 w-3.5 mr-1.5" />
          )}
          Copy CSS clip-path
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-xs"
          onClick={() => copy(reactSnippet, "react")}
        >
          {copied === "react" ? (
            <Check className="h-3.5 w-3.5 mr-1.5 text-green-600" />
          ) : (
            <Code className="h-3.5 w-3.5 mr-1.5" />
          )}
          Copy React snippet
        </Button>
      </div>
    </motion.div>
  );
}
