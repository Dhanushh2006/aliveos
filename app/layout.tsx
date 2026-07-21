import type { Metadata } from "next";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/lib/constants/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "AliveOS",
    "CodeStorm 2026",
    "interactive websites",
    "Next.js",
    "living interfaces",
  ],
  authors: [{ name: "AliveOS" }],
  creator: "AliveOS",
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
