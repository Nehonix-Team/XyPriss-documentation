"use client";

import React from "react";
import Link from "next/link";
import { Github, Search, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

import { SearchDialog } from "./SearchDialog";

export const DocsHeader = ({
  isMobileSidebarOpen,
  onToggleMobileSidebar,
}: {
  isMobileSidebarOpen: boolean;
  onToggleMobileSidebar: () => void;
}) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
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

        <div className="flex items-center gap-2">
          <button
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>

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
        </div>
      </div>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
};
