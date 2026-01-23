"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Link from "next/link";
import "highlight.js/styles/tokyo-night-dark.css";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  isMarkdown?: boolean;
}

/**
 * Helper to recursively extract text from React nodes
 */
function extractText(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node.props?.children) return extractText(node.props.children);
  return "";
}

/**
 * Helper to recursively find and style internal comments {# ... #}
 */
function processInternalComments(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (!child) return child;
    if (typeof child === "string" && child.includes("{#")) {
      const parts = child.split(/(\{#[\s\S]*?#\})/g);
      return parts.map((part, i) => {
        if (part.startsWith("{#") && part.endsWith("#}")) {
          return (
            <span key={i} className="internal-comment">
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      });
    }
    if (
      React.isValidElement(child) &&
      child.props &&
      (child.props as any).children
    ) {
      return React.cloneElement(child, {
        children: processInternalComments((child.props as any).children),
      } as any);
    }
    return child;
  });
}

/**
 * Main CodeBlock component
 */
export function CodeBlock({
  code,
  language = "bash",
  className,
  isMarkdown = false,
}: CodeBlockProps) {
  // If we are in Markdown mode
  if (isMarkdown) {
    return (
      <div className={cn("documentation-article", className)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
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
            // Handle pre to add Copy button
            pre: ({ children, ...props }) => {
              const raw = extractText(children).replace(/\n$/, "");
              return (
                <CodeBlockWrapper code={raw}>
                  <pre {...props}>{children}</pre>
                </CodeBlockWrapper>
              );
            },
            // Process internal comments in code
            code: ({ children, ...props }) => {
              const processed = processInternalComments(children);
              return <code {...props}>{processed}</code>;
            },
          }}
        >
          {code}
        </ReactMarkdown>
      </div>
    );
  }

  // Fallback for direct usage
  return <CodeBlock code={`\`\`\`${language}\n${code}\n\`\`\``} isMarkdown />;
}

/**
 * Wrapper for the Copy Button logic
 */
function CodeBlockWrapper({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);

  // Strip internal comments from the copy buffer
  const cleanCode = React.useMemo(() => {
    return code.replace(/\{#[\s\S]*?#\}/g, "").trim();
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute right-6 top-6 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <Button
          size="sm"
          variant="secondary"
          onClick={copyToClipboard}
          className={cn(
            "cursor-pointer h-8 px-2 flex items-center gap-1.5 bg-background/50 backdrop-blur-md border border-white/10 shadow-lg hover:bg-background/80",
            copied && "border-green-500/50 text-green-500",
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">
                Copy
              </span>
            </>
          )}
        </Button>
      </div>
      {children}
    </div>
  );
}
