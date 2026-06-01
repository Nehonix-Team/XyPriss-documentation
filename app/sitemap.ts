import { docsConfig } from "@/lib/docs-config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xypriss.nehonix.com";
  
  const docEntries = docsConfig.flatMap(section => 
    section.items.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))
  );

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
 