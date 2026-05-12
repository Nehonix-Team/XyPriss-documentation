"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, FileText, CornerDownLeft, Command, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const Highlight = ({ text, query }: { text: string; query: string }) => {
  if (!query) return <span>{text}</span>;
  
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return (
    <span>
      {parts.map((part, i) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={i} className="text-amber-400 font-bold bg-amber-500/10 rounded-sm px-0.5">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/search");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error("Search fetch error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fuse = useMemo(() => new Fuse(data, {
    keys: [
      { name: "title", weight: 2 },
      { name: "content", weight: 1 },
      { name: "category", weight: 0.5 }
    ],
    threshold: 0.4,
    includeMatches: true,
    minMatchCharLength: 1,
    ignoreLocation: true,
    distance: 100,
    useExtendedSearch: true,
  }), [data]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
    } else {
      const searchResults = fuse.search(query);
      setResults(searchResults.slice(0, 6));
      setSelectedIndex(0);
    }
  }, [query, fuse]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex].item.href);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (href: string) => {
    // Append the search query to the URL for deep highlighting on the target page
    const searchParams = new URLSearchParams();
    searchParams.set("h", query.trim());
    const targetHref = `${href}?${searchParams.toString()}`;
    
    router.push(targetHref);
    onClose();
  };

  const getSnippet = (content: string, query: string) => {
    if (!query) return content.substring(0, 100) + "...";
    
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return content.substring(0, 100) + "...";
    
    const start = Math.max(0, index - 40);
    const end = Math.min(content.length, index + 60);
    let snippet = content.substring(start, end);
    
    if (start > 0) snippet = "..." + snippet;
    if (end < content.length) snippet = snippet + "...";
    
    return snippet;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-[#030712] border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] overflow-hidden"
          >
            <div className="flex items-center px-4 h-16 border-b border-white/10 relative">
              <Search className={cn("text-muted-foreground mr-3 transition-colors", query ? "text-primary" : "")} size={22} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation (Semantic search enabled)..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-lg"
              />
              {query && (
                <button 
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-white/5 rounded-md text-slate-500 mr-2"
                >
                  <X size={18} />
                </button>
              )}
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/10">
                <Command size={10} className="text-slate-500" />
                <span className="text-[10px] font-bold text-slate-500">K</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
              {query === "" ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Sparkles size={32} className="text-primary/40" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-medium">Intelligence Search</p>
                    <p className="text-xs">Find keywords, components, and architectural concepts.</p>
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="p-12 text-center text-slate-500 flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Search size={24} className="opacity-20" />
                  </div>
                  <p>No results found for "<span className="text-white font-bold">{query}</span>"</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((result, idx) => {
                    const item = result.item;
                    const snippet = getSnippet(item.content, query);
                    
                    return (
                      <button
                        key={item.href}
                        onClick={() => handleSelect(item.href)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 rounded-xl text-left transition-all group relative overflow-hidden",
                          idx === selectedIndex 
                            ? "bg-primary/10 border border-primary/20" 
                            : "border border-transparent hover:bg-white/[0.02]"
                        )}
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300",
                            idx === selectedIndex ? "bg-primary/20 border-primary/40 shadow-[0_0_15_rgba(59,130,246,0.3)]" : "bg-white/5 border-white/10"
                          )}>
                            <FileText className={cn(
                              "w-6 h-6",
                              idx === selectedIndex ? "text-primary" : "text-slate-400"
                            )} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-white tracking-tight">
                                <Highlight text={item.title} query={query} />
                              </span>
                              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-primary/60 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-[400px]">
                              <Highlight text={snippet} query={query} />
                            </p>
                          </div>
                        </div>
                        {idx === selectedIndex && (
                          <motion.div 
                            layoutId="search-active"
                            className="flex items-center gap-2 text-primary pr-2"
                          >
                            <span className="text-[10px] font-bold uppercase tracking-widest">Select</span>
                            <CornerDownLeft size={14} />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-6 h-12 bg-white/[0.02] border-t border-white/10 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <kbd className="px-1.5 py-1 rounded bg-white/5 border border-white/10 text-primary font-mono">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-2">
                  <kbd className="px-1.5 py-1 rounded bg-white/5 border border-white/10 text-primary font-mono">Enter</kbd>
                  Open
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <kbd className="px-1.5 py-1 rounded bg-white/5 border border-white/10 text-slate-400 font-mono">Esc</kbd>
                  Close
                </span>
                <div className="w-px h-4 bg-white/10" />
                <span className="text-primary/60 lowercase italic font-medium">xhsc search engine v2</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
