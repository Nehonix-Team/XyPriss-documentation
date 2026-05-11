"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export const OnThisPage = () => {
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Find all h2 and h3 headings with IDs
    const elements = Array.from(document.querySelectorAll("h2[id], h3[id]"));
    const items = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: parseInt(el.tagName.substring(1)),
    }));
    setHeadings(items);

    // Intersection Observer to highlight active heading
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
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 py-8 pl-4 border-l border-border h-full overflow-y-auto custom-scrollbar">
      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 px-2">
        On this page
      </h4>
      <nav className="flex flex-col gap-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "px-3 py-1.5 text-sm transition-all rounded-lg",
              heading.level === 3 && "pl-6",
              activeId === heading.id
                ? "text-primary font-bold bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};
