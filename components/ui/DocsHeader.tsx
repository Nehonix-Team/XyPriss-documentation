"use client";

import React from "react";
import Link from "next/link";
import { Github, Search, Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { SearchDialog } from "./SearchDialog";

export const DocsHeader = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "/" && !isSearchOpen) {
        // Only if not typing in another input
        if (
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA"
        ) {
          e.preventDefault();
          setIsSearchOpen(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/60 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="https://dll.nehonix.com/assets/XyPriss/XLanding-decor-xhead.png"
              alt="Logo"
              className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
            />
            <span className="hidden font-bold text-2xl tracking-tighter sm:inline-block">
              <span className="text-primary">Xy</span>Priss
              {/* <span className="text-primary font-medium">Docs</span> */}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/docs" className="hover:text-primary transition-colors">
              Documentation
            </Link>
            <Link
              href="/docs/api-reference"
              className="hover:text-primary transition-colors"
            >
              API Reference
            </Link>
            <Link
              href="https://github.com/Nehonix-Team/XyPriss"
              target="_blank"
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              GitHub
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="relative hidden md:flex items-center group"
          >
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-primary transition-colors"
              size={16}
            />
            <div className="h-9 w-64 rounded-full bg-white/5 border border-white/10 pl-10 pr-4 text-sm text-muted-foreground flex items-center justify-between group-hover:border-primary/30 transition-all">
              <span>Search docs...</span>
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px]">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            title="Changer le thème"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )
            ) : (
              <div className="w-5 h-5" />
            )}
          </button>

          <Link
            href="https://github.com/Nehonix-Team/XyPriss-documentation"
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
              <Link href="/docs" className="text-lg font-medium">
                Documentation
              </Link>
              <Link href="/docs/api-reference" className="text-lg font-medium">
                API Reference
              </Link>
              <Link
                href="https://github.com/Nehonix-Team/XyPriss"
                target="_blank"
                className="text-lg font-medium"
              >
                GitHub
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="relative mt-2 w-full"
              >
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <div className="h-12 w-full rounded-xl bg-white/5 border border-white/10 pl-11 pr-4 text-base text-muted-foreground flex items-center">
                  Search documentation...
                </div>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};
