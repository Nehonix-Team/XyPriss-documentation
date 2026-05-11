// lib/docs-meta.ts
import type { Metadata } from "next";

const BASE_URL = "https://xypriss.nehonix.com";
const OG_IMAGE = "https://dll.nehonix.com/assets/xypriss/xypriss-og.png";

export function generateDocMeta({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  const url = `${BASE_URL}/docs/${slug}`;
  const fullTitle = `XyPriss — ${title}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: "article",
      siteName: "XyPriss",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE],
    },
  };
}
