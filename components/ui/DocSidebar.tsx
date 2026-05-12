"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, PanelLeftClose, PanelLeftOpen, Layers } from "lucide-react";

export const DocSidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSection = (title: string) => {
    setCollapsedSections(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const toggleItem = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title) 
        : [...prev, title]
    );
  };

  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-expand active items on mount and pathname change
  React.useEffect(() => {
    if (!isMounted) return;

    const itemsToExpand: string[] = [];
    const sectionsToExpand: string[] = [];
    
    docsConfig.forEach(section => {
      let sectionHasActive = false;
      
      section.items.forEach((item: any) => {
        const hasSubItems = item.items && item.items.length > 0;
        const isExactActive = pathname === item.href;
        const isChildActive = hasSubItems && item.items?.some((sub: any) => pathname === sub.href);
        
        if (isExactActive || isChildActive) {
          sectionHasActive = true;
        }
        
        if (isChildActive && !expandedItems.includes(item.title)) {
          itemsToExpand.push(item.title);
        }
      });
      
      if (sectionHasActive && collapsedSections.includes(section.title)) {
        sectionsToExpand.push(section.title);
      }
    });
    
    if (itemsToExpand.length > 0) {
      setExpandedItems(prev => Array.from(new Set([...prev, ...itemsToExpand])));
    }
    
    if (sectionsToExpand.length > 0) {
      setCollapsedSections(prev => prev.filter(t => !sectionsToExpand.includes(t)));
    }
  }, [pathname, isMounted]);

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
          const isSectionCollapsed = collapsedSections.includes(section.title);
          return (
            <div key={idx} className="flex flex-col gap-3">
              <button 
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-widest text-muted-foreground/60 px-2 hover:text-foreground transition-colors group/header"
              >
                {section.title}
                {isSectionCollapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
              </button>
              
              {!isSectionCollapsed && (
                <div className="flex flex-col gap-1">
                  {section.items.map((item: any, itemIdx: number) => {
                    const hasSubItems = item.items && item.items.length > 0;
                    const isExpanded = expandedItems.includes(item.title);
                    const isActive = pathname === item.href || (hasSubItems && item.items?.some((sub: any) => pathname === sub.href));
                    
                    return (
                      <div key={itemIdx} className="flex flex-col gap-1">
                        <div className="relative group/item">
                          <Link
                            href={item.href}
                            className={cn(
                              "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all relative overflow-hidden",
                              isActive 
                                ? "bg-primary/10 text-primary font-bold shadow-[inset_0_0_12px_rgba(var(--color-primary-rgb),0.05)]" 
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            {isActive && pathname === item.href && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_var(--color-primary)]" />
                            )}
                            <div className="flex items-center gap-2">
                              {hasSubItems && <Layers size={12} className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground/40")} />}
                              <span>{item.title}</span>
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {hasSubItems ? (
                                <button 
                                  onClick={(e) => toggleItem(item.title, e)}
                                  className={cn(
                                    "p-1 rounded-md transition-all border shadow-sm",
                                    isExpanded 
                                      ? "bg-primary/20 text-primary border-primary/30" 
                                      : "bg-white/5 text-muted-foreground/60 border-white/5 hover:border-white/20"
                                  )}
                                >
                                  {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                </button>
                              ) : (
                                <ChevronRight 
                                  size={14} 
                                  className={cn(
                                    "transition-transform",
                                    pathname === item.href ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover/item:opacity-40 group-hover/item:translate-x-0"
                                  )} 
                                />
                              )}
                            </div>
                          </Link>
                        </div>

                        {hasSubItems && isExpanded && (
                          <div className="flex flex-col gap-1 ml-4 pl-3 border-l border-white/5 mt-1 mb-2">
                            {item.items?.map((subItem: any, subIdx: number) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subIdx}
                                  href={subItem.href}
                                  className={cn(
                                    "group/sub flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-all",
                                    isSubActive
                                      ? "text-primary font-medium bg-primary/5"
                                      : "text-muted-foreground/60 hover:text-foreground hover:bg-white/5"
                                  )}
                                >
                                  <span>{subItem.title}</span>
                                  {isSubActive && <ChevronRight size={10} className="text-primary" />}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
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
