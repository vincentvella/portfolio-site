import { absoluteUrl } from "@/lib/utils";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const description =
  "I'm Vince, a senior full-stack engineer with a passion for building functional, performant, and accessible web and mobile apps.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vincevella.com"),
  title: {
    default: "Vince Vella",
    template: "%s | Vince Vella",
  },
  description,
  openGraph: {
    title: "Vince Vella",
    description,
    url: absoluteUrl("/"),
    siteName: "Portfolio",
    images: [
      {
        url: absoluteUrl("/images/avatar-3x.jpeg"),
        width: 1800,
        height: 1600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png" },
      { url: "/favicon/favicon-32x32.png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  robots: "index, follow",
  manifest: "/favicon/site.webmanifest",
  creator: "Vince Vella",
  applicationName: "Portfolio Site",
  keywords: ["nextjs", "typescript", "react", "portfolio"],
  formatDetection: {
    telephone: true,
    email: true,
    url: true,
  },
  themeColor: "#000",
  twitter: {
    creator: "@vellapps",
    site: "@vellapps",
    card: "summary",
    description,
    images: [
      {
        url: absoluteUrl("/images/avatar-3x.jpeg"),
        width: 1800,
        height: 1600,
      },
    ],
    title: "Vince Vella - Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        {children}
      </body>
    </html>
  );
}
