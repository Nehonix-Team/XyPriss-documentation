import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";

export const DocSidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  if (isCollapsed) {
    return (
      <div className="flex flex-col items-center py-8 h-full">
        <button 
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground transition-colors"
          title="Expand Sidebar"
        >
          <PanelLeftOpen size={20} />
        </button>
      </div>
    );
  }

  return (
    <aside className="w-full h-full py-8 pr-4 overflow-y-auto custom-scrollbar transition-all duration-300 relative group">
      <div className="flex items-center justify-between mb-8 px-2">
        <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">Navigation</span>
        <button 
          onClick={onToggle}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-muted text-muted-foreground transition-all"
          title="Collapse Sidebar"
        >
          <PanelLeftClose size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-8">
        {docsConfig.map((section, idx) => {
          const isCollapsed = collapsedSections.includes(section.title);
          return (
            <div key={idx} className="flex flex-col gap-3">
              <button 
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-widest text-muted-foreground/60 px-2 hover:text-foreground transition-colors group/header"
              >
                {section.title}
                {isCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
              </button>
              
              {!isCollapsed && (
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
                            ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_12px_rgba(var(--color-primary-rgb),0.05)]" 
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
