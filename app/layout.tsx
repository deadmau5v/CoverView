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

export const metadata: Metadata = {
  title: "CoverView - Create beautiful blog cover images",
  description:
    "A simple tool to create beautiful blog cover images for your dev.to and hashnode articles.",
  keywords: ["cover image", "blog", "dev.to", "hashnode", "thumbnail generator"],
  authors: [{ name: "Rutik Wankhade" }],
  openGraph: {
    title: "CoverView - Create beautiful blog cover images",
    description: "Create beautiful cover images for your blog posts",
    type: "website",
    url: "https://coverview.vercel.app",
  },
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
