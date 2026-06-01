import { docsConfig } from "@/lib/docs-config";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://xypriss.nehonix.com";
  const now = new Date();

  const priorityBySection: Record<string, number> = {
    "Start Here": 1.0,
    "Core Concepts": 0.9,
    "Server": 0.8,
    "Configuration": 0.7,
    "Security": 0.8,
    "Plugins": 0.6,
    "Deployment": 0.7,
    "API Reference": 0.7,
    "System": 0.5,
    "Community": 0.4,
  };

  const docEntries = docsConfig.flatMap((section) =>
    section.items.map((item) => {
      const pathParts = item.href.replace(/^\//, "").split("/");
      const sectionName = pathParts[0] ? pathParts[0].charAt(0).toUpperCase() + pathParts[0].slice(1) : "";
      const isHomepage = item.href === "/docs";
      const priority = isHomepage ? 0.95 : (priorityBySection[section.title] ?? 0.7);
      return {
        url: `${baseUrl}${item.href}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority,
      };
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...docEntries,
  ];
}

 