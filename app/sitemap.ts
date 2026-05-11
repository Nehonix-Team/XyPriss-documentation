import { flatDocs } from "@/lib/docs-config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xypriss.nehonix.com";

  const docEntries = flatDocs.map((doc) => ({
    url: `${baseUrl}${doc.href}`,
    lastModified: new Date(),
    changeFrequency: "hourly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...docEntries,
  ];
}
