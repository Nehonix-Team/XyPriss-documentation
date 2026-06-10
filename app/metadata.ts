import { Metadata } from "next";
import { keywords } from "./keywords";

export function generateMetadata(): Metadata {
  return {
    title: "XyPriss - Enterprise-Grade Hybrid Web Framework",
    keywords,
    publisher: "NEHONIX",
    description:
      "Stop Coding Backends. Start Deploying Fortresses. XyPriss is a Hybrid Native (Go) + TypeScript framework built for extreme performance and zero-trust security.",
    icons: {
      icon: "/xypriss-logo.png",
      shortcut: "/xypriss-logo.png",
      apple: "/xypriss-logo.png",
    },
    openGraph: {
      title: "XyPriss - The Hybrid Native + TypeScript Framework",
      description:
        "Bridge compiled performance with developer velocity. Features XHSC Go-engine, XEMS encrypted sessions, and built-in security shield.",
      url: "https://xypriss.nehonix.com",
      siteName: "XyPriss Documentation",
      images: [
        {
          url: "https://dll.nehonix.com/assets/XyPriss/xypriss-og.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "XyPriss - Enterprise-Grade Web Framework",
      description: "Hybrid Node.js Web Framework powered by XHSC Native Engine.",
      images: ["https://dll.nehonix.com/assets/XyPriss/xypriss-og.png"],
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
}
