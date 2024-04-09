import { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";
import { Providers } from "./providers";
import { load } from "outstatic/server";
import { LanguageLoader } from "@/lib/data-loaders/language-loader";
import { ResumeSectionLoader } from "@/lib/data-loaders/resume-section-loader";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

const description =
  "Senior Software Engineer skilled in TypeScript, React, React Native, Java, and Golang, passionate about crafting high-quality web and mobile applications.";

const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://vincevella.com",
  ),
  title: {
    default:
      "Senior Software Engineer & Web/Mobile App Developer - Vince Vella",
    template: "%s | Vince Vella",
  },
  description,
  openGraph: {
    title: "Vince Vella",
    description,
    url: "/",
    siteName: "Portfolio",
    images: [
      {
        url: "/images/avatar-3x.jpeg",
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
  other: {
    darkreader: "vellapps",
    "darkreader-lock": "true",
  },
  twitter: {
    creator: "@vellapps",
    site: "@vellapps",
    card: "summary",
    description,
    images: [
      {
        url: "/images/avatar-3x.jpeg",
        width: 1800,
        height: 1600,
      },
    ],
    title: "Vince Vella - Portfolio",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const db = await load();

  const languages = await new LanguageLoader(db).load();
  const { frameworks_and_tools } = await new ResumeSectionLoader(db).load();
  const keywords: string[] = [];
  keywords.push(...languages.flatMap((language) => language.content));
  if (Array.isArray(frameworks_and_tools.content)) {
    frameworks_and_tools.content.forEach((tool) => {
      if (!keywords.includes(tool)) {
        keywords.push(tool);
      }
    });
  }

  metadata.keywords = keywords;

  return metadata;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
