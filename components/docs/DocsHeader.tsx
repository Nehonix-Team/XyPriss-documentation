"use client";

import React from "react";
import Link from "next/link";
import { Github, Search, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const DocsHeader = () => {
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://dll.nehonix.com/assets/XyPriss/XLanding-decor-xhead.png"
              alt="Logo"
              className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="hidden font-bold text-2xl tracking-tighter sm:inline-block">
              XyPriss <span className="text-primary font-medium">Docs</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
             <Link href="/docs" className="hover:text-primary transition-colors">Documentation</Link>
             <Link href="/docs/api-reference" className="hover:text-primary transition-colors">API Reference</Link>
             <Link href="https://github.com/Nehonix-Team/XyPriss" target="_blank" className="hover:text-primary transition-colors flex items-center gap-1.5">
               GitHub
             </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <input 
              type="text" 
            placeholder="Search docs..." 
              className="h-9 w-64 rounded-full bg-white/5 border border-white/10 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-muted-foreground">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              title="Changer le thème"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <Link 
              href="https://github.com/Nehonix-Team/XyPriss" 
              target="_blank"
              className="hidden sm:flex p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <Github size={20} />
            </Link>

            <button 
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-black"
          >
            <nav className="flex flex-col p-4 gap-4">
               <Link href="/docs" className="text-lg font-medium">Documentation</Link>
               <Link href="/docs/api-reference" className="text-lg font-medium">API Reference</Link>
               <Link href="https://github.com/Nehonix-Team/XyPriss" target="_blank" className="text-lg font-medium">GitHub</Link>
               <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="h-12 w-full rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
