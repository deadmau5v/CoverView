import type { Metadata } from "next";
import ImageConverter from "@/components/ImageConverter";

export const metadata: Metadata = {
  title: "Image Converter - Clipboard and Drag Upload",
  description:
    "Convert images directly in your browser. Paste from clipboard or drag and drop, then export as PNG, JPG or WEBP with quality control.",
  openGraph: {
    title: "Image Converter | CoverView",
    description:
      "Pure frontend image conversion tool with clipboard paste, drag upload, format selection and compression control.",
  },
};

export default function ImageConverterPage() {
  return <ImageConverter />;
}
