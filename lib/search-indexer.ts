import fs from "fs";
import path from "path";

export interface SearchResult {
  title: string;
  href: string;
  category: string;
  content: string;
  description: string;
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
        const rawContent = fs.readFileSync(fullPath, "utf-8");
        const relativePath = path.relative(docsDir, dir);
        const href = relativePath === "" ? "/docs" : `/docs/${relativePath}`;
        
        // Extract Title
        const titleMatch = rawContent.match(/<SectionHeading\s+level=\{1\}>\s*([\s\S]*?)\s*<\/SectionHeading>/) || 
                          rawContent.match(/<h1>\s*([\s\S]*?)\s*<\/h1>/);
        
        const title = titleMatch ? titleMatch[1].replace(/<[^>]*>?/gm, "").trim() : relativePath || "Documentation";

        // Extract Category
        const categoryParts = relativePath.split("/");
        const categoryName = categoryParts[0] ? categoryParts[0].replace(/-/g, " ") : "Introduction";
        const category = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

        // Clean content for indexing
        let cleanContent = rawContent
          .replace(/import\s+[\s\S]*?from\s+['"].*?['"];/g, "") // remove imports
          .replace(/export\s+default\s+function\s+[\s\S]*?\{/g, "") // remove component declaration
          .replace(/<CodeBlock[\s\S]*?\/>/g, "") // remove large code blocks from index
          .replace(/<TechGraph[\s\S]*?\/>/g, "") // remove graph definitions
          .replace(/<[^>]*>?/gm, " ") // strip tags
          .replace(/\{`[\s\S]*?`\}/g, "") // strip code template literals
          .replace(/\{([\s\S]*?)\}/g, "$1") // remove curly braces around content
          .replace(/\s+/g, " ")
          .trim();

        const description = cleanContent.substring(0, 160) + "...";
        
        results.push({
          title,
          href,
          category,
          content: cleanContent, // Index more content for semantic matching
          description,
        });
      }
    }
  }

  if (fs.existsSync(docsDir)) {
    walk(docsDir);
  }

  return results;
}
