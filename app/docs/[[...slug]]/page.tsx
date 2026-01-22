import { notFound } from "next/navigation";
import { getAllDocs, getDocBySlug } from "@/lib/doc-helper";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/tokyo-night-dark.css";
import { Metadata } from "next";
import { Pager } from "@/components/pager";
import Link from "next/link";

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
    title: doc.frontmatter.title || doc.slug,
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
  // Robust Link Sanitization for Internal Links
  // This physically replaces text in the markdown before rendering
  const sanitizedContent = doc.content.replace(
    /\[(.*?)\]\((.*?)\)/g,
    (match: string, text: string, href: string) => {
      if (
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("#")
      ) {
        return match;
      }

      // 1. Remove .md or .mdx
      let cleanHref = href.replace(/\.mdx?$/, "");

      // 2. Remove relative symbols like ../ or ./
      cleanHref = cleanHref.replace(/^(\.\.?\/)+/, "");

      // 3. Ensure it starts with /docs/ and is flat
      cleanHref = `/docs/${cleanHref.replace(/^docs\//, "")}`;

      return `[${text}](${cleanHref})`;
    },
  );

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none pb-12 documentation-article">
      <div className="space-y-2 mb-6">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          {doc.frontmatter.title ||
            doc.slug.split("/").pop().replace(/_/g, " ")}
        </h1>
        {doc.frontmatter.description && (
          <p className="text-xl text-muted-foreground">
            {doc.frontmatter.description}
          </p>
        )}
        <hr className="my-6 border-zinc-800" />
      </div>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Simple link component mapping for Next.js routing
          a: ({ href, children }) => {
            const isExternal = href?.startsWith("http");
            if (isExternal)
              return (
                <a href={href} target="_blank" rel="noopener">
                  {children}
                </a>
              );
            return <Link href={href || "#"}>{children}</Link>;
          },
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>

      <Pager slug={slugPath} />
    </article>
  );
}
