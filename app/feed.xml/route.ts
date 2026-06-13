import { docsConfig } from "@/lib/docs-config";

export async function GET() {
  const baseUrl = "https://xypriss.nehonix.com";
  const now = new Date().toUTCString();

  // Extract all pages from docsConfig
  const docEntries = docsConfig.flatMap((section) => {
    const items: any[] = [];
    const extractItems = (itemList: any[]) => {
      itemList.forEach((item) => {
        items.push({
          title: item.title,
          url: `${baseUrl}${item.href}`,
        });
        if (item.items) {
          extractItems(item.items);
        }
      });
    };
    extractItems(section.items);
    return items;
  });

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>XyPriss Documentation</title>
      <link>${baseUrl}</link>
      <description>Enterprise-Grade Hybrid Web Framework</description>
      <language>en</language>
      <lastBuildDate>${now}</lastBuildDate>
      <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
      ${docEntries
        .map(
          (entry) => `
        <item>
          <title><![CDATA[${entry.title}]]></title>
          <link>${entry.url}</link>
          <guid>${entry.url}</guid>
          <pubDate>${now}</pubDate>
        </item>`
        )
        .join("")}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
