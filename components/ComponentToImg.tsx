"use client";

import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { useImgContext } from "@/hooks/useImgContext";
import "./CoverImage.css";

interface ComponentToImgProps {
  children: React.ReactNode;
  downloadAs?: string;
}

type ExportFormat = "PNG" | "WEBP" | "JPG";

export default function ComponentToImg({ children, downloadAs = "WEBP" }: ComponentToImgProps) {
  const [loading, setLoading] = useState(false);
  const { unsplashImage } = useImgContext();
  const componentRef = useRef<HTMLDivElement>(null);

  const saveImage = async (data: string, filename: string) => {
    const anchor = document.createElement("a");
    anchor.href = data;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const normalizeExportFormat = (format: string): ExportFormat => {
    const normalized = format.toUpperCase();
    if (normalized === "WEBP" || normalized === "JPG" || normalized === "PNG") {
      return normalized;
    }
    return "PNG";
  };

  const convertImageFormat = async (
    data: string,
    mimeType: "image/webp" | "image/jpeg",
    quality = 0.85,
  ): Promise<string> => {
    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = data;
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");

      if (!context) {
        return data;
      }

      context.drawImage(image, 0, 0);
      const convertedData = canvas.toDataURL(mimeType, quality);
      if (convertedData && convertedData.startsWith(`data:${mimeType}`)) {
        return convertedData;
      }

      return data;
    } catch (error) {
      console.error(`Unable to convert image to ${mimeType}`, error);
      return data;
    }
  };

  const trackDownload = async () => {
    if (!unsplashImage) return;

    const source = unsplashImage.source || "unsplash";
    const apiUrl = source === "pexels" ? "/api/pexels/download" : "/api/unsplash/download";

    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ downloadLocation: unsplashImage.downloadLink }),
      });
    } catch (error) {
      console.error("Failed to track download:", error);
    }
  };

  const downloadImage = async () => {
    setLoading(true);
    try {
      const element = componentRef.current;
      if (!element) {
        throw new Error("Missing component reference for export");
      }

      const devicePixelRatio = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const scale = devicePixelRatio > 1 ? 1.6 : 1;

      const pngData = await toPng(element, {
        quality: 1,
        pixelRatio: scale,
      });

      const selectedFormat = normalizeExportFormat(downloadAs);
      let processedData = pngData;

      if (selectedFormat === "WEBP") {
        processedData = await convertImageFormat(pngData, "image/webp", 0.85);
      } else if (selectedFormat === "JPG") {
        processedData = await convertImageFormat(pngData, "image/jpeg", 0.9);
      }

      const filename = processedData.startsWith("data:image/webp")
        ? "cover.webp"
        : processedData.startsWith("data:image/jpeg")
          ? "cover.jpg"
          : "cover.png";
      await saveImage(processedData, filename);

      await trackDownload();
    } catch (error) {
      console.error("Failed to export cover image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div ref={componentRef}>{children}</div>
      <button
        className="m-4 flex items-center rounded-lg border bg-gray-700 p-2 px-4 text-xl text-white hover:bg-gray-800"
        onClick={downloadImage}
      >
        <span>
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="animate h-6 w-6 animate-spin text-white"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path>
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          )}
        </span>

        <span className="mx-2">下载</span>
      </button>
    </>
  );
}
