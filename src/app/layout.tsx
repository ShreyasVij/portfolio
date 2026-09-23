import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shreyas Vij — Full-Stack Developer & AI/ML Enthusiast",
  description:
    "Portfolio of Shreyas Vij — B.Tech ECE student at Punjab Engineering College specializing in full-stack development, AI/ML systems, and data science.",
  keywords: [
    "Shreyas Vij",
    "Full-Stack Developer",
    "AI/ML",
    "Portfolio",
    "Next.js",
    "React",
    "Python",
    "Punjab Engineering College",
  ],
  authors: [{ name: "Shreyas Vij" }],
  openGraph: {
    title: "Shreyas Vij — Full-Stack Developer & AI/ML Enthusiast",
    description:
      "Portfolio of Shreyas Vij — B.Tech ECE student at Punjab Engineering College specializing in full-stack development, AI/ML systems, and data science.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyas Vij — Full-Stack Developer & AI/ML Enthusiast",
    description:
      "Portfolio of Shreyas Vij — B.Tech ECE student at Punjab Engineering College specializing in full-stack development, AI/ML systems, and data science.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="noise min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
