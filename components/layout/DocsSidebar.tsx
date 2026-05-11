"use client";

import React from "react";
import { docsConfig } from "@/lib/docs-config";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-64 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 pr-4 border-r border-xp-border/30">
      <nav className="flex flex-col gap-8">
        {docsConfig.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <h4 className="text-xs font-black text-xp-text uppercase tracking-[0.2em] mb-2 px-3">
              {group.title}
            </h4>
            <ul className="flex flex-col gap-1">
              {group.items.map((item, itemIdx) => {
                const isActive = pathname === item.href;
                return (
                  <li key={itemIdx}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all",
                        isActive 
                          ? "bg-xp-primary/10 text-xp-primary font-semibold shadow-[inset_0_0_10px_rgba(99,102,241,0.05)]" 
                          : "text-xp-muted hover:text-xp-text hover:bg-xp-surface/50"
                      )}
                    >
                      <span className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all",
                        isActive ? "bg-xp-primary scale-100" : "bg-xp-muted/30 scale-50 group-hover:scale-75"
                      )} />
                      {item.title}
                      {item.badge && (
                        <span className={cn(
                          "ml-auto text-[10px] uppercase font-bold px-1.5 py-0.5 rounded",
                          item.badge === "new" ? "bg-emerald-500/20 text-emerald-400" : "bg-xp-primary/20 text-xp-primary"
                        )}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
