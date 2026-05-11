import React from "react";
import { OnThisPage } from "./OnThisPage";
import { DocsFooter } from "../layout/DocsFooter";
import { ChevronRight, Github } from "lucide-react";
import Link from "next/link";

interface DocLayoutProps {
  title: string;
  description?: string;
  toc?: { id: string; label: string; level?: 2 | 3 }[];
  editPath?: string;
  children: React.ReactNode;
}

export function DocLayout({ title, description, toc = [], editPath, children }: DocLayoutProps) {
  return (
    <div className="flex w-full gap-12 py-10 px-4 md:px-8">
      <div className="flex-1 min-w-0">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-xp-muted mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-xp-text transition-colors">Accueil</Link>
          <ChevronRight size={12} />
          <Link href="/docs/introduction" className="hover:text-xp-text transition-colors">Documentation</Link>
          <ChevronRight size={12} />
          <span className="text-xp-text font-medium">{title}</span>
        </nav>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-xp-text tracking-tight mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-xp-muted leading-relaxed">
              {description}
            </p>
          )}
        </header>

        <main>
          {children}
        </main>

        <div className="mt-16 pt-8 border-t border-xp-border">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            {editPath && (
              <a
                href={`https://github.com/nehonix/XyPriss-documentation/edit/main/${editPath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-xp-muted hover:text-xp-text transition-colors"
              >
                <Github size={16} />
                Modifier cette page sur GitHub
              </a>
            )}
            <span className="text-xs text-xp-muted">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>
          
          <DocsFooter />
        </div>
      </div>

      <OnThisPage toc={toc} />
    </div>
  );
}
