"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, Copy, X, Zap, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import ts from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import "highlight.js/styles/tokyo-night-dark.css";

// Register languages for the light highlighter
SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("typescript", ts);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("html", xml);

// --- Types ---

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  isMarkdown?: boolean;
}

/**
 * Parses <link to="...">label</link> inside comment strings
 */
function parseCommentContent(content: string) {
  if (!content) return "";
  const parts = content.split(/(<link to="[^"]+">.*?<\/link>)/g);
  return parts.map((part, i) => {
    const match = part.match(/<link to="([^"]+)">([\s\S]*?)<\/link>/);
    if (match) {
      const url = match[1];
      const label = match[2];
      const isExternal = url.startsWith("http");
      if (isExternal) {
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener"
            className="text-amber-400 font-bold underline decoration-amber-400/30 hover:decoration-amber-400 transition-all mx-1"
          >
            {label}
          </a>
        );
      }
      return (
        <Link
          key={i}
          href={url}
          className="text-amber-400 font-bold underline decoration-amber-400/30 hover:decoration-amber-400 transition-all mx-1"
        >
          {label}
        </Link>
      );
    }
    return part;
  });
}

/**
 * Portal Overlay Component for Internal Comments
 */
const CommentOverlay = ({
  id,
  content,
  isOpen,
  onClose,
  triggerRects,
}: {
  id: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
  triggerRects: DOMRect[];
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || triggerRects.length === 0) return null;

  const primaryRect = triggerRects[0];
  const overlayX = Math.min(window.innerWidth - 340, primaryRect.right + 120);
  const overlayY = primaryRect.top - 80;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-transparent pointer-events-auto"
          />

          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {triggerRects.map((rect, idx) => (
              <motion.path
                key={`${id}-${idx}`}
                initial={{ pathLength: 0, opacity: 0, strokeDashoffset: 0 }}
                animate={{
                  pathLength: 1,
                  opacity: 1,
                  strokeDashoffset: [0, -30],
                }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{
                  pathLength: { duration: 0.8, ease: "easeInOut" },
                  opacity: { duration: 0.4 },
                  strokeDashoffset: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                d={`M ${rect.left + rect.width / 2} ${rect.top + rect.height / 2} 
                   C ${rect.left + rect.width / 2 + 80} ${rect.top + rect.height / 2}, 
                     ${overlayX} ${overlayY + 120}, 
                     ${overlayX} ${overlayY + 40}`}
                fill="none"
                stroke="url(#amber-grad)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
            ))}
            <defs>
              <linearGradient
                id="amber-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              x: primaryRect.left,
              y: primaryRect.top,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: overlayX,
              y: overlayY,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              x: primaryRect.left,
              y: primaryRect.top,
              filter: "blur(10px)",
            }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="absolute pointer-events-auto w-80"
          >
            <div className="relative p-6 rounded-2xl bg-[#0d1117]/95 backdrop-blur-3xl border border-amber-500/40 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.2)] ring-1 ring-white/10">
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-amber-500/20 shadow-inner">
                      <Zap className="w-4 h-4 text-amber-500" />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-500/90 shadow-current">
                      Internal Details
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-all hover:rotate-90"
                  >
                    <X className="w-4 h-4 text-zinc-500 hover:text-white" />
                  </button>
                </div>
                <div className="text-sm font-semibold leading-relaxed text-zinc-100/90 whitespace-pre-line">
                  {parseCommentContent(content)}
                </div>
              </div>
              <div className="absolute -left-1.5 bottom-12 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_15px_#f59e0b,inset_0_0_5px_white]" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

// --- Store for coordination ---

class CommentStore {
  subscribers: Set<() => void> = new Set();
  isOpen: { [id: string]: boolean } = {};
  contents: { [id: string]: string } = {};
  triggers: { [id: string]: Map<string, DOMRect> } = {};

  subscribe(fn: () => void) {
    this.subscribers.add(fn);
    return () => {
      this.subscribers.delete(fn);
    };
  }

  notify() {
    this.subscribers.forEach((fn) => {
      fn();
    });
  }

  registerTrigger(id: string, triggerId: string, rect: DOMRect) {
    if (!this.triggers[id]) this.triggers[id] = new Map();
    const existing = this.triggers[id].get(triggerId);
    if (
      !existing ||
      Math.abs(existing.top - rect.top) > 1 ||
      Math.abs(existing.left - rect.left) > 1
    ) {
      this.triggers[id].set(triggerId, rect);
      if (this.isOpen[id]) this.notify();
    }
  }

  unregisterTrigger(id: string, triggerId: string) {
    if (this.triggers[id]) {
      this.triggers[id].delete(triggerId);
    }
  }

  registerContent(id: string, content: string) {
    if (content && !this.contents[id]) {
      this.contents[id] = content;
      this.notify();
    }
  }

  toggle(id: string, content?: string) {
    this.isOpen[id] = !this.isOpen[id];
    if (content) this.contents[id] = content;
    this.notify();
  }
}

const CommentStoreContext = React.createContext<CommentStore | null>(null);

/**
 * Interactive Trigger Badge
 */
function CommentTrigger({
  id,
  content,
  isSecondary = false,
}: {
  id: string;
  content?: string;
  isSecondary?: boolean;
}) {
  const store = React.useContext(CommentStoreContext);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const triggerId = React.useMemo(
    () => Math.random().toString(36).substr(2, 9),
    [],
  );
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    if (!store) return;
    const unsub = store.subscribe(() => {
      forceUpdate();
    });
    if (!isSecondary && content) {
      store.registerContent(id, content);
    }
    return () => {
      unsub();
    };
  }, [store, id, content, isSecondary]);

  const updateRect = React.useCallback(() => {
    if (triggerRef.current && store) {
      store.registerTrigger(
        id,
        triggerId,
        triggerRef.current.getBoundingClientRect(),
      );
    }
  }, [id, triggerId, store]);

  React.useEffect(() => {
    updateRect();
    const handleScroll = () => {
      updateRect();
      if (store?.isOpen[id]) forceUpdate();
    };
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);
    return () => {
      store?.unregisterTrigger(id, triggerId);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [updateRect, id, triggerId, store]);

  const isOpen = store?.isOpen[id] || false;

  return (
    <span className="inline-flex items-center relative mx-1.5 align-middle">
      <motion.button
        ref={triggerRef}
        whileHover={{ scale: 1.3, rotate: 20 }}
        whileTap={{ scale: 0.9, rotate: -20 }}
        onClick={() => store?.toggle(id, content)}
        className={cn(
          "w-4.5 h-4.5 rounded-full flex items-center justify-center transition-all shadow-xl pointer-events-auto cursor-pointer border-2",
          isOpen
            ? "bg-amber-500 border-amber-300 text-black shadow-amber-500/60"
            : cn(
                "bg-[#1a1b26] border-white/10 text-teal-400 hover:text-amber-400 hover:border-amber-500/50",
                isSecondary &&
                  "bg-[#1a1b26]/50 border-dotted border-amber-500/40 text-amber-500/70",
              ),
        )}
      >
        {isSecondary ? (
          <GitBranch
            className={cn("w-2.5 h-2.5", isOpen ? "text-black" : "")}
          />
        ) : (
          <Zap
            className={cn(
              "w-2.5 h-2.5",
              isOpen ? "fill-current" : "animate-pulse",
            )}
          />
        )}
      </motion.button>
    </span>
  );
}

// --- Internal Parsing Logic ---

const TAG_REGEX =
  /(\[!#[\w-]+::[\s\S]*?\/!\]|\[!#[\w-]+::.*?\]|\[!\^[\w-]+::\])/g;

function splitByTags(text: string) {
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = TAG_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "code",
        content: text.substring(lastIndex, match.index),
      });
    }
    const fullTag = match[0];
    if (fullTag.startsWith("[!#") && fullTag.endsWith("/!]")) {
      const g = fullTag.match(/\[!#([\w-]+)::([\s\S]*?)\/!\]/);
      if (g) parts.push({ type: "master", id: g[1], content: g[2].trim() });
    } else if (fullTag.startsWith("[!#")) {
      const g = fullTag.match(/\[!#([\w-]+)::(.*?)\]/);
      if (g) parts.push({ type: "master", id: g[1], content: g[2].trim() });
    } else if (fullTag.startsWith("[!^")) {
      const g = fullTag.match(/\[!\^([\w-]+)::\]/);
      if (g) parts.push({ type: "secondary", id: g[1] });
    }
    lastIndex = TAG_REGEX.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "code", content: text.substring(lastIndex) });
  }

  return parts;
}

/**
 * Custom Code Highlighting with Annotations
 */
function AnnotatedCode({ code, language }: { code: string; language: string }) {
  const parts = React.useMemo(() => splitByTags(code), [code]);

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "code") {
          return (
            <SyntaxHighlighter
              key={i}
              language={language === "html" ? "xml" : language}
              PreTag="span"
              CodeTag="span"
              useInlineStyles={false}
              style={{}} // We use CSS classes
            >
              {part.content || ""}
            </SyntaxHighlighter>
          );
        }
        if (part.type === "master") {
          return (
            <CommentTrigger key={i} id={part.id!} content={part.content} />
          );
        }
        if (part.type === "secondary") {
          return <CommentTrigger key={i} id={part.id!} isSecondary />;
        }
        return null;
      })}
    </>
  );
}

/**
 * Main CodeBlock Component
 */
export function CodeBlock({
  code,
  language = "bash",
  className,
  isMarkdown = false,
}: CodeBlockProps) {
  const storeRef = React.useRef(new CommentStore());
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    return storeRef.current.subscribe(() => {
      forceUpdate();
    });
  }, []);

  if (isMarkdown) {
    return (
      <CommentStoreContext.Provider value={storeRef.current}>
        <div className={cn("documentation-article relative", className)}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ href, children }) => {
                const isExternal = href?.startsWith("http");
                if (isExternal)
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener"
                      className="text-primary hover:underline"
                    >
                      {children}
                    </a>
                  );
                return (
                  <Link
                    href={href || "#"}
                    className="text-primary hover:underline"
                  >
                    {children}
                  </Link>
                );
              },
              pre: ({ children, ...props }) => {
                let rawText = "";
                const extract = (node: any) => {
                  if (typeof node === "string") rawText += node;
                  else if (Array.isArray(node)) node.forEach(extract);
                  else if (node?.props?.children) extract(node.props.children);
                };
                extract(children);
                return (
                  <CodeBlockWrapper code={rawText.replace(/\n$/, "")}>
                    <pre {...props} className="relative z-10">
                      {children}
                    </pre>
                  </CodeBlockWrapper>
                );
              },
              code: ({ children, className, ...props }) => {
                const lang = className?.replace("language-", "") || "bash";
                if (typeof children === "string") {
                  return (
                    <code {...props} className={className}>
                      <AnnotatedCode code={children} language={lang} />
                    </code>
                  );
                }
                return (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {code}
          </ReactMarkdown>

          {Object.entries(storeRef.current.isOpen).map(([id, isOpen]) => {
            if (!isOpen) return null;
            const triggers = storeRef.current.triggers[id];
            if (!triggers) return null;
            return (
              <CommentOverlay
                key={id}
                id={id}
                isOpen={isOpen}
                content={storeRef.current.contents[id]}
                onClose={() => storeRef.current.toggle(id)}
                triggerRects={Array.from(triggers.values())}
              />
            );
          })}
        </div>
      </CommentStoreContext.Provider>
    );
  }

  return <CodeBlock code={`\`\`\`${language}\n${code}\n\`\`\``} isMarkdown />;
}

/**
 * Copy Wrapper
 */
function CodeBlockWrapper({
  code,
  children,
}: {
  code: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);

  const cleanCode = React.useMemo(() => {
    let result = code.replace(
      /(?:\/\/|#|--|\/\*)\s*\[!#[\w-]+::[\s\S]*?\/!\](?:\n|$)/g,
      "",
    );
    result = result.replace(/\[!#[\w-]+::[\s\S]*?\/!\](?:\n|$)/g, "");
    result = result.replace(
      /(?:\/\/|#|--|\/\*)\s*\[![#^].*?::.*?\](?:\n|$)/g,
      (match) => (match.endsWith("\n") ? "\n" : ""),
    );
    result = result.replace(/\[![#^].*?::.*?\](?:\n|$)/g, (match) =>
      match.endsWith("\n") ? "\n" : "",
    );
    return result.trim();
  }, [code]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="relative group my-8">
      <div className="absolute right-6 top-6 z-50 opacity-0 group-hover:opacity-100 transition-all duration-200">
        <Button
          size="sm"
          variant="secondary"
          onClick={copyToClipboard}
          className={cn(
            "cursor-pointer h-8 px-2 flex items-center gap-1.5 bg-background/50 backdrop-blur-md border border-white/10 shadow-lg hover:bg-background/80 transition-all",
            copied && "border-green-500/50 text-green-500",
          )}
        >
          {copied ? (
            <>
              <Check className="size-3.5" />
              <span className="text-[10px] font-bold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
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
