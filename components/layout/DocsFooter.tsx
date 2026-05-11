"use client";

import React from "react";
import { getPagerLinks } from "@/lib/docs-config";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DocsFooter() {
  const pathname = usePathname();
  const { prev, next } = getPagerLinks(pathname);

  if (!prev && !next) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col gap-2 p-4 rounded-xl border border-xp-border bg-xp-surface/30 hover:bg-xp-surface/50 transition-all hover:border-xp-primary/30"
        >
          <span className="text-xs text-xp-muted flex items-center gap-1">
            <ChevronLeft size={14} /> Previous
          </span>
          <span className="text-base font-bold text-xp-text group-hover:text-xp-primary transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-2 p-4 rounded-xl border border-xp-border bg-xp-surface/30 hover:bg-xp-surface/50 transition-all hover:border-xp-primary/30 text-right"
        >
          <span className="text-xs text-xp-muted flex items-center gap-1">
            Next <ChevronRight size={14} />
          </span>
          <span className="text-base font-bold text-xp-text group-hover:text-xp-primary transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
