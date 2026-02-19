import type { Metadata } from "next";
import IconGenerator from "@/components/IconGenerator";

export const metadata: Metadata = {
  title: "ICO Icon Generator - Multi-Size and Cropping",
  description:
    "Generate ICO files directly in your browser. Crop an image and export multiple icon sizes in single or separate .ico files.",
  openGraph: {
    title: "ICO Icon Generator | CoverView",
    description: "Pure frontend icon generator with crop controls and multi-size ICO export.",
  },
};

export default function IconGeneratorPage() {
  return <IconGenerator />;
}
