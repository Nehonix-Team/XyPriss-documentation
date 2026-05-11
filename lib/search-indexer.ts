import fs from "fs";
import path from "path";

export interface SearchResult {
  title: string;
  href: string;
  category: string;
  content: string;
}

export async function getDynamicSearchIndex(): Promise<SearchResult[]> {
  const docsDir = path.join(process.cwd(), "app/docs");
  const results: SearchResult[] = [];

  function walk(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (file === "page.tsx") {
        const content = fs.readFileSync(fullPath, "utf-8");
        const relativePath = path.relative(docsDir, dir);
        const href = relativePath === "" ? "/docs" : `/docs/${relativePath}`;
        
        // Extract Title
        // Look for <SectionHeading level={1}>...</SectionHeading> or <h1>...</h1>
        const titleMatch = content.match(/<SectionHeading\s+level=\{1\}>\s*([\s\S]*?)\s*<\/SectionHeading>/) || 
                          content.match(/<h1>\s*([\s\S]*?)\s*<\/h1>/);
        
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>?/gm, "").trim() : relativePath || "Documentation";

        // Extract Category (parent folder name or "General")
        const category = relativePath ? relativePath.split("/")[0].replace(/-/g, " ") : "Introduction";

        // Extract some content/keywords (simple text extraction)
        // We'll strip tags and just take a chunk of text
        const textContent = content
          .replace(/<[^>]*>?/gm, " ") // strip tags
          .replace(/\{`[\s\S]*?`\}/g, "") // strip code template literals
          .replace(/\s+/g, " ")
          .trim()
          .substring(0, 500);

        results.push({
          title,
          href,
          category: category.charAt(0).toUpperCase() + category.slice(1),
          content: textContent,
        });
      }
    }
  }

  if (fs.existsSync(docsDir)) {
    walk(docsDir);
  }

  return results;
}
