"use client";

import React, { useEffect, useState } from "react";

interface TOCEntry {
  id: string;
  label: string;
  level?: 2 | 3;
}

interface OnThisPageProps {
  toc: TOCEntry[];
}

export function OnThisPage({ toc }: OnThisPageProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0% -80% 0%" }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (toc.length === 0) return null;

  return (
    <div className="hidden xl:block w-64 flex-shrink-0 sticky top-24 self-start pl-8 border-l border-xp-border/30">
      <h4 className="text-sm font-bold text-xp-text uppercase tracking-wider mb-4">
        On This Page
      </h4>
      <nav className="flex flex-col gap-3">
        {toc.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`text-sm transition-colors hover:text-xp-primary ${
              activeId === item.id 
                ? "text-xp-primary font-medium" 
                : "text-xp-muted"
            } ${item.level === 3 ? "pl-4" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </nav>
      
      <div className="mt-8 pt-8 border-t border-xp-border/30">
        <h4 className="text-xs font-bold text-xp-text uppercase tracking-wider mb-4">
          Besoin d&apos;aide ?
        </h4>
        <p className="text-xs text-xp-muted leading-relaxed mb-4">
          Rejoignez notre communauté ou posez vos questions sur GitHub Discussions.
        </p>
        <a 
          href="https://github.com/nehonix/xypriss/discussions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-xp-primary hover:underline flex items-center gap-1"
        >
          Nous rejoindre →
        </a>
      </div>
    </div>
  );
}
