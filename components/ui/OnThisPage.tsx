"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { List, PanelRightClose, PanelRightOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export const OnThisPage = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2[id], h3[id]"));
    const items = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName.substring(1)),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "-100px 0px -66%" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  if (headings.length === 0) return null;

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center py-8 h-full border-l border-border/50">
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          title="Expand Table of Contents"
        >
          <PanelRightOpen size={20} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-8 pl-4 border-l border-border h-full overflow-y-auto custom-scrollbar relative group">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground/60">
          <List size={14} />
          On this page
        </div>
        <button 
          onClick={onToggle}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-muted text-muted-foreground transition-all"
          title="Collapse TOC"
        >
          <PanelRightClose size={14} />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "px-3 py-1.5 text-sm transition-all rounded-lg border-l-2 border-transparent",
              heading.level === 3 && "pl-6 text-xs",
              activeId === heading.id
                ? "text-primary font-bold bg-primary/5 border-primary shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.03)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
