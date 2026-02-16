import type { Metadata } from "next";
import Editor from "@/components/Editor";

export const metadata: Metadata = {
  title: "Editor - Create Cover Images",
  description:
    "Create stunning blog cover images with CoverView editor. Customize themes, fonts, icons, and download as PNG, WEBP, or JPG.",
  openGraph: {
    title: "Editor - Create Cover Images | CoverView",
    description: "Create stunning blog cover images with themes, fonts, and icons.",
  },
};

export default function EditorPage() {
  return <Editor />;
}
