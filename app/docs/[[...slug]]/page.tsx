import { notFound } from "next/navigation";

export const revalidate = 14400; // 4 hours
import { getAllDocs, getDocBySlug } from "@/lib/doc-helper";
import { Metadata } from "next";
import { Pager } from "@/components/pager";
import { SearchHighlight } from "@/components/search-highlight";
import { CodeBlock } from "@/components/ui/code-block";

interface DocPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug ? slug.join("/") : "README";
  const doc = await getDocBySlug(slugPath);

  if (!doc) {
    return {
      title: "Document Not Found",
    };
  }

  return {
    title: "XyPriss - " + (doc.frontmatter.title || doc.slug),
    description: doc.frontmatter.description || "XYPriss Documentation",
  };
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const slugPath = slug ? slug.join("/") : "README";
  const doc = await getDocBySlug(slugPath);

  if (!doc) {
    if (!slug) {
      const readme = await getDocBySlug("README");
      if (readme) return renderDoc(readme, "README");
    }
    notFound();
  }

  return renderDoc(doc, slugPath);
}

function renderDoc(doc: any, slugPath: string) {
  // 0. Remove HTML comments
  let sanitizedContent = doc.content.replace(/<!--[\s\S]*?-->/g, "");

  // 1. Robust Link Sanitization for Internal Links
  sanitizedContent = sanitizedContent.replace(
    /\[(.*?)\]\((.*?)\)/g,
    (match: string, text: string, href: string) => {
      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#")
      ) {
        return match;
      }

      let target = href.replace(/\.mdx?$/, "");
      target = target.replace(/^(\.\.?\/)+/, "");
      target = target.replace(/^\/+/, "");
      const cleanHref = `/docs/${target.replace(/^docs\//, "")}`;

      return `[${text}](${cleanHref})`;
    },
  );

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none pb-12 documentation-article">
      <SearchHighlight />
      {/* 
          All documentation rendering (Markdown, Highlighting, Code Blocks) 
          is now encapsulated in the CodeBlock component. 
      */}
      <CodeBlock code={sanitizedContent} isMarkdown />

      <Pager slug={slugPath} />
    </article>
  );
}
