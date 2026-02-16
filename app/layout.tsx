import type { Metadata } from "next";
import { Inter, Poppins, Nunito } from "next/font/google";
import "./globals.css";
import "./patterns.css";
import ClientProviders from "./ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-nunito",
});

const baseUrl = "https://coverview.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CoverView - Create beautiful blog cover images",
    template: "%s | CoverView",
  },
  description:
    "A free tool to create beautiful blog cover images for dev.to, Hashnode, Medium and more. Customize with themes, fonts, icons and Unsplash backgrounds.",
  keywords: [
    "cover image generator",
    "blog cover",
    "thumbnail maker",
    "dev.to cover",
    "hashnode cover",
    "blog graphics",
    "open graph image",
    "social media image",
    "article thumbnail",
  ],
  authors: [{ name: "Rutik Wankhade", url: "https://github.com/rutikwankhade" }],
  creator: "Rutik Wankhade",
  publisher: "CoverView",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CoverView - Create beautiful blog cover images",
    description:
      "Create stunning cover images for your blog posts in seconds. Free, open-source, and easy to use.",
    type: "website",
    url: baseUrl,
    siteName: "CoverView",
    locale: "en_US",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CoverView - Blog Cover Image Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoverView - Create beautiful blog cover images",
    description:
      "Create stunning cover images for your blog posts in seconds. Free and open-source.",
    images: [`${baseUrl}/og-image.png`],
    creator: "@rutikwankhade_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      "en-US": `${baseUrl}/en`,
      "zh-CN": `${baseUrl}/zh`,
      "ja-JP": `${baseUrl}/ja`,
      "ko-KR": `${baseUrl}/ko`,
      "ru-RU": `${baseUrl}/ru`,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "CoverView",
      description:
        "A free tool to create beautiful blog cover images for dev.to, Hashnode, Medium and more.",
      url: baseUrl,
      applicationCategory: "DesignApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Multiple themes",
        "Custom fonts",
        "Dev icons",
        "Unsplash integration",
        "Custom sizes",
        "PNG/WEBP/JPG export",
      ],
    },
    {
      "@type": "Organization",
      name: "CoverView",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      sameAs: ["https://github.com/rutikwankhade/CoverView"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/konpa/devicon@master/devicon.min.css"
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${nunito.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
