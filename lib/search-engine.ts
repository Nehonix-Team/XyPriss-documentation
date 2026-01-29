import { getAllDocs, Doc } from "./doc-helper";
import Fuse from "fuse.js";

export interface SearchResult {
  title: string;
  slug: string;
  description: string;
  snippet: string;
  score: number;
}

export function searchDocs(query: string): SearchResult[] {
  const allDocs = getAllDocs();

  // De-duplicate docs by normalized slug
  const docsMap = new Map<string, Doc>();
  allDocs.forEach((doc) => {
    if (!docsMap.has(doc.slug)) {
      docsMap.set(doc.slug, doc);
    }
  });
  const docs = Array.from(docsMap.values());

  // Prepare data for Fuse
  const searchData = docs.map((doc) => {
    // Extract title from frontmatter or slug
    const title =
      doc.frontmatter.title || doc.slug.split("/").pop() || doc.slug;

    // Create a clean version of content without tags and markdown
    const cleanContent = doc.content
      .replace(/\[![#^].*?::.*?\]/g, "") // Remove our internal tags
      .replace(/<[\s\S]*?>/g, "") // Remove HTML
      .replace(/[#*`]/g, ""); // Basic markdown clean

    return {
      title,
      slug: doc.slug,
      content: cleanContent,
      description: doc.frontmatter.description || "",
    };
  });

  const fuse = new Fuse(searchData, {
    keys: [
      { name: "title", weight: 0.7 },
      { name: "content", weight: 0.3 },
    ],
    includeMatches: true,
    threshold: 0.4,
    ignoreLocation: true,
  });

  const results = fuse.search(query);

  return results.map((res: any) => {
    // Generate a snippet from the content match
    const content = res.item.content;
    let snippet = "";

    // 1. Try to get snippet from Fuse matches
    if (res.matches && res.matches.length > 0) {
      const match = res.matches.find((m: any) => m.key === "content");
      if (match && match.indices.length > 0) {
        const [start, end] = match.indices[0];
        const snippetStart = Math.max(0, start - 60);
        const snippetEnd = Math.min(content.length, end + 100);
        snippet =
          "..." + content.substring(snippetStart, snippetEnd).trim() + "...";
      }
    }

    // 2. Fallback: Manual search in content if no snippet yet or if it's just the start
    if (!snippet || snippet.length < 20) {
      const index = content.toLowerCase().indexOf(query.toLowerCase());
      if (index !== -1) {
        const snippetStart = Math.max(0, index - 60);
        const snippetEnd = Math.min(content.length, index + 100);
        snippet =
          "..." + content.substring(snippetStart, snippetEnd).trim() + "...";
      }
    }

    // 3. Last fallback: Start of content
    if (!snippet) {
      snippet = content.substring(0, 140).trim() + "...";
    }

    return {
      title: res.item.title,
      slug: res.item.slug,
      description: res.item.description,
      snippet,
      score: res.score || 0,
    };
  });
}
