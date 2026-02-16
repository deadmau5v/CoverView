import CodeOfConduct from "@/components/CodeOfConduct";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Code of Conduct",
  description:
    "CoverView Code of Conduct - Guidelines for contributing to and using CoverView, the open-source blog cover image generator.",
  openGraph: {
    title: "Code of Conduct | CoverView",
    description: "Guidelines for contributing to and using CoverView.",
  },
};

export default function CodeOfConductPage() {
  return <CodeOfConduct />;
}
