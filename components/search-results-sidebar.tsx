"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  ChevronRight,
  Hash,
  ArrowUpRight,
  Loader2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  slug: string;
  description: string;
  snippet: string;
  score: number;
}

export function SearchResultsSidebar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || searchParams.get("query");

  const [results, setResults] = React.useState<SearchResult[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Search failed", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchResults, 300);
    return () => clearTimeout(timer);
  }, [query]);

  if (!query) return null;

  const content = (
    <div className="flex flex-col h-full bg-[#0d1117]/80 backdrop-blur-3xl rounded-3xl border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/10">
      {/* Header with animated gradient border */}
      <div className="p-6 border-b border-white/5 bg-zinc-900/40 relative group">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/10 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              Cross-Document Flux
            </h2>
            <div className="h-0.5 w-6 bg-amber-500/50 rounded-full mt-1" />
          </div>
        </div>
        <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin text-amber-500" />
              Analyzing multidimensional data...
            </span>
          ) : (
            <>
              Synthesized{" "}
              <span className="text-zinc-200 font-bold">{results.length}</span>{" "}
              nodes for{" "}
              <span className="text-amber-500 font-bold italic">"{query}"</span>
            </>
          )}
        </p>
      </div>

      {/* Results List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-none">
        <AnimatePresence mode="popLayout">
          {results.map((result, idx) => (
            <motion.div
              key={result.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, type: "spring", damping: 20 }}
            >
              <Link
                href={`/docs/${result.slug}?q=${encodeURIComponent(query!)}&kw=${encodeURIComponent(query!)}`}
                className="group block space-y-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-sm font-bold text-zinc-100 group-hover:text-amber-400 transition-all leading-tight tracking-tight">
                    {result.title}
                  </h3>
                  <div className="p-1 rounded bg-white/5 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0 border border-white/10">
                    <ArrowUpRight className="w-3 h-3 text-amber-500" />
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-zinc-400 line-clamp-3 font-medium selection:bg-amber-500/30">
                  {result.snippet}
                </p>

                <div className="flex items-center gap-3">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-white/5 to-transparent" />
                  <span className="text-[8px] text-zinc-600 font-mono tracking-tighter uppercase whitespace-nowrap bg-zinc-950/50 px-2 py-0.5 rounded-full border border-white/5">
                    {result.slug.replace(/\//g, " → ")}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {!loading && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center rotate-45 group hover:rotate-90 transition-transform duration-500">
              <Search className="w-5 h-5 -rotate-45" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Void Detected
              </p>
              <p className="text-[10px] max-w-[160px] leading-relaxed text-zinc-600">
                No matching frequency across the documentation spectrum.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-5 bg-zinc-950/90 border-t border-white/5 backdrop-blur-xl">
        <Link
          href="/docs"
          className="group flex items-center justify-between text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-amber-500 transition-all"
        >
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20 group-hover:bg-amber-500 group-hover:shadow-[0_0_8px_#f59e0b] transition-all" />
            Cosmos Home
          </span>
          <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="sticky top-24 hidden h-[calc(100vh-10rem)] xl:block w-[320px]">
        {content}
      </div>

      {/* Mobile/Tablet View (Appears at the bottom of the article) */}
      <div className="xl:hidden mt-20 mb-12">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-12" />
        <h2 className="text-xl font-black uppercase tracking-tighter mb-8 bg-gradient-to-r from-zinc-100 to-zinc-500 bg-clip-text text-transparent">
          Found in other docs
        </h2>
        <div className="space-y-6">{content}</div>
      </div>
    </>
  );
}
