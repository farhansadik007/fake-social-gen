"use client";

import { useRef, useState } from "react";

/**
 * Shared PNG export for the chat editors.
 *
 * `background` is the colour behind the card frame — passing it explicitly
 * stops the exported PNG from having transparent corners.
 */
export function usePngExport({ background, filename }) {
  const cardRef = useRef(null);
  const [exporting, setExporting] = useState(false);

  async function download() {
    if (!cardRef.current) return;
    setExporting(true);

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: background,
      });

      const link = document.createElement("a");
      link.download = `${filename}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);
      alert(
        "Could not export the image. If you used an image URL, try uploading the file instead — external hosts often block export.",
      );
    } finally {
      setExporting(false);
    }
  }

  return { cardRef, exporting, download };
}
