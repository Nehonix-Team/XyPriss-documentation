"use client";

import React from "react";
import Link from "next/link";
import { Search, Github, Moon, ChevronDown } from "lucide-react";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-xp-border/30 bg-xp-bg/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <img 
                src="https://dll.nehonix.com/assets/xypriss/file_0000000083bc71f4998cbc2f4f0c9629.png" 
                alt="XyPriss" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-black text-xp-text tracking-tighter">
              XyPriss <span className="text-xp-muted font-normal text-sm ml-1 opacity-50 tracking-normal">Docs</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded-md bg-xp-surface/50 border border-xp-border text-[10px] font-bold text-xp-muted">
            v1.0.0
            <ChevronDown size={12} />
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-8 hidden lg:block">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-xp-muted group-focus-within:text-xp-primary transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Rechercher dans la documentation..." 
              className="h-10 w-full rounded-xl border border-xp-border bg-xp-surface/30 pl-10 pr-4 text-sm text-xp-text focus:outline-none focus:ring-2 focus:ring-xp-primary/20 focus:border-xp-primary/50 transition-all placeholder:text-xp-muted/50"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 h-5 flex items-center gap-1 rounded border border-xp-border bg-xp-bg px-1.5 font-mono text-[10px] text-xp-muted pointer-events-none">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/nehonix/xypriss" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-xp-muted hover:text-xp-text transition-all hidden sm:block"
          >
            GitHub
          </a>
          
          <button className="p-2 text-xp-muted hover:text-xp-text hover:bg-xp-surface/50 rounded-lg transition-all border border-transparent hover:border-xp-border">
            <Moon size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
