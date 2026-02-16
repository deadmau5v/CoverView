import Faq from "@/components/Faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers to common questions about CoverView - the free blog cover image generator for dev.to, Hashnode, and Medium.",
  openGraph: {
    title: "FAQ - CoverView",
    description: "Find answers to common questions about CoverView blog cover image generator.",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I download the cover image?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Click the Download button to save the image as PNG, WEBP, or JPG format.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use custom images?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! You can search Unsplash images or upload your own custom icon for your cover.",
      },
    },
    {
      "@type": "Question",
      name: "Is CoverView free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, CoverView is completely free and open source. You can use it without any cost.",
      },
    },
  ],
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Faq />
    </>
  );
}
