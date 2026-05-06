import { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

import "../styles/globals.css";
import { CursorShadowTracker } from "@/components/CursorShadowTracker";
import { WebVitalsReporter } from "@/components/WebVitalsReporter";
import { Providers } from "./providers";
import { load } from "outstatic/server";
import { LanguageLoader } from "@/lib/data-loaders/language-loader";
import { ResumeSectionLoader } from "@/lib/data-loaders/resume-section-loader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const description =
  "Lead Software Engineer skilled in TypeScript, React, React Native, Java, and Golang, passionate about crafting high-quality web and mobile applications.";

const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://vincevella.com",
  ),
  title: {
    default:
      "Lead Software Engineer & Web/Mobile App Developer - Vince Vella",
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
        url: "/images/avatar-illustration.jpeg",
        width: 1200,
        height: 1200,
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
    card: "summary_large_image",
    description,
    images: [
      {
        url: "/images/avatar-illustration.jpeg",
        width: 1200,
        height: 1200,
      },
    ],
    title: "Vince Vella - Portfolio",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f1" },
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
  ],
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
      <head>
        <script
          defer
          src="/_/u.js"
          data-website-id="b78a678b-8758-4370-8690-078104b4fcc8"
          data-host-url="/_/u"
        ></script>
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}
      >
        <CursorShadowTracker />
        <WebVitalsReporter />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
