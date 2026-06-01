import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/private/", "/api/search", "/_next/"],
        crawlDelay: 0.5,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
      {
        userAgent: "Slurp",
        allow: "/",
        disallow: ["/private/", "/api/"],
      },
    ],
    sitemap: "https://xypriss.nehonix.com/sitemap.xml",
    host: "https://xypriss.nehonix.com",
  };
}
