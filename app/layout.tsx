import type { Metadata } from "next";
import "./globals.css";
import "./animations.scss";
import "./documentation-modern.scss";
import { ThemeProvider } from "next-themes";
import { keywords } from "@/lib/keywords";
import authors from "./authors";

export const metadata: Metadata = {
  title: "XyPriss - Hybrid Rust + TypeScript Web Framework",
  keywords: keywords,
  authors,
  publisher: "NEHONIX",
  description:
    "Hybrid Rust + TypeScript framework bridging the power of Rust with the flexibility of Node.js. Built for performance, security, and scale.",
  icons: {
    icon: "https://dll.nehonix.com/assets/xypriss/file_0000000083bc71f4998cbc2f4f0c9629.png",
    shortcut:
      "https://dll.nehonix.com/assets/xypriss/file_0000000083bc71f4998cbc2f4f0c9629.png",
    apple:
      "https://dll.nehonix.com/assets/xypriss/file_0000000083bc71f4998cbc2f4f0c9629.png",
  },
  openGraph: {
    title: "XyPriss Framework",
    description:
      "The Hybrid Rust + Node.js Framework for High-Performance Web Apps",
    url: "https://xypriss.nehonix.com",
    siteName: "XyPriss Documentation",
    images: [
      {
        url: "https://dll.nehonix.com/assets/xypriss/xypriss-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XyPriss Framework",
    description: "Enterprise-Grade Node.js Web Framework powered by Rust.",
    images: ["https://dll.nehonix.com/assets/xypriss/xypriss-og.png"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
