"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, FileText, ArrowRight, CornerDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

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

  const fuse = new Fuse(data, {
    keys: ["title", "content", "category"],
    threshold: 0.3,
  });

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
      const searchResults = fuse.search(query).map((r) => r.item);
      setResults(searchResults.slice(0, 5));
      setSelectedIndex(0);
    }
  }, [query]);

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
          handleSelect(results[selectedIndex].href);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-[#0f172a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 h-14 border-b border-white/10">
              <Search className="text-muted-foreground mr-3" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation, components, keywords..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-base"
              />
              <button 
                onClick={onClose}
                className="p-1 hover:bg-white/5 rounded-md text-slate-500"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
              {query === "" ? (
                <div className="p-8 text-center text-slate-500 flex flex-col items-center gap-3">
                  <Search size={40} className="opacity-20" />
                  <p>Type something to start searching...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  No results found for "<span className="text-white">{query}</span>"
                </div>
              ) : (
                <div className="p-2">
                  {results.map((item, idx) => (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl text-left transition-all group",
                        idx === selectedIndex 
                          ? "bg-primary/10 border-primary/20 ring-1 ring-primary/20" 
                          : "hover:bg-white/[0.02]"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center border transition-colors",
                          idx === selectedIndex ? "bg-primary/20 border-primary/30" : "bg-white/5 border-white/10"
                        )}>
                          <FileText className={cn(
                            "w-5 h-5",
                            idx === selectedIndex ? "text-primary" : "text-slate-400"
                          )} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white tracking-tight">{item.title}</span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-500 bg-white/5 px-1.5 py-0.5 rounded">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 line-clamp-1">{item.description}</p>
                        </div>
                      </div>
                      {idx === selectedIndex && (
                        <div className="flex items-center gap-2 text-primary">
                          <span className="text-[10px] font-bold uppercase tracking-widest">Select</span>
                          <CornerDownLeft size={14} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 h-10 bg-black/40 border-t border-white/10 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">Enter</kbd>
                  Open
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400">Esc</kbd>
                Close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
