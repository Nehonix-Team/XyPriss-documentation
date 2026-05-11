"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export const DocSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full py-8 pr-4 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-8">
        {docsConfig.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 px-2">
              {section.title}
            </h4>
            <div className="flex flex-col gap-1">
              {section.items.map((item, itemIdx) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all relative overflow-hidden",
                      isActive 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_var(--color-primary)]" />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight 
                      size={14} 
                      className={cn(
                        "transition-transform",
                        isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0"
                      )} 
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
