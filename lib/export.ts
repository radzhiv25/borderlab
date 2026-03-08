/**
 * Renders the stamp-bordered image to a canvas and exports as PNG blob.
 */
export async function exportAsPng(
  imageUrl: string,
  stampPath: string,
  canvasW: number,
  canvasH: number,
  borderColor: string,
  imageArea: { x: number; y: number; w: number; h: number },
  scale = 2
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvasW * scale;
    canvas.height = canvasH * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Canvas not supported"));
    ctx.scale(scale, scale);

    const clip = new Path2D(stampPath);

    const img = new Image();
    img.onload = () => {
      ctx.save();
      ctx.clip(clip);

      ctx.fillStyle = borderColor;
      ctx.fillRect(0, 0, canvasW, canvasH);

      drawImageCover(ctx, img, imageArea.x, imageArea.y, imageArea.w, imageArea.h);
      ctx.restore();

      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error("Blob failed"))),
        "image/png"
      );
    };
    img.onerror = () => reject(new Error("Image load failed"));
    img.src = imageUrl;
  });
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number
) {
  const imgR = img.naturalWidth / img.naturalHeight;
  const destR = dw / dh;
  let sx: number, sy: number, sw: number, sh: number;
  if (imgR > destR) {
    sh = img.naturalHeight;
    sw = sh * destR;
    sx = (img.naturalWidth - sw) / 2;
    sy = 0;
  } else {
    sw = img.naturalWidth;
    sh = sw / destR;
    sx = 0;
    sy = (img.naturalHeight - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}
