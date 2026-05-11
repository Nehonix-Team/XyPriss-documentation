import { docsConfig } from "./docs-config";
import Fuse from "fuse.js";

export interface SearchResult {
  title: string;
  slug: string;
  description: string;
  snippet: string;
  score: number;
}

export function searchDocs(query: string): SearchResult[] {
  // Flatten docs from config
  const searchData = docsConfig.flatMap(section => 
    section.items.map(item => ({
      title: item.title,
      slug: item.href.replace("/docs", ""),
      description: `Documentation for ${item.title}`,
      content: item.title // Placeholder: in the future, index the actual page content
    }))
  );

  const fuse = new Fuse(searchData, {
    keys: [
      { name: "title", weight: 0.7 },
      { name: "content", weight: 0.3 },
    ],
    threshold: 0.4,
  });

  const results = fuse.search(query);

  return results.map((res: any) => ({
    title: res.item.title,
    slug: res.item.slug,
    description: res.item.description,
    snippet: `Learn more about ${res.item.title} in the XyPriss documentation.`,
    score: res.score || 0,
  }));
}
