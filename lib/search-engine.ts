import { flatDocs } from "./docs-config";
import Fuse from "fuse.js";

export interface SearchResult {
  title: string;
  href: string;
  description: string;
  snippet: string;
  score: number;
}

export function searchDocs(query: string): SearchResult[] {
  // Use flatDocs for search
  const searchData = flatDocs.map((doc) => ({
    title: doc.title,
    href: doc.href,
    description: "", // We could add descriptions to docsConfig if needed
  }));

  const fuse = new Fuse(searchData, {
    keys: [
      { name: "title", weight: 1.0 },
    ],
    threshold: 0.4,
  });

  const results = fuse.search(query);

  return results.map((res: any) => ({
    title: res.item.title,
    href: res.item.href,
    description: res.item.description,
    snippet: res.item.title, // No content snippet available for React components yet
    score: res.score || 0,
  }));
}
