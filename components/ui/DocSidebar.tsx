"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, PanelLeftClose, PanelLeftOpen, Layers } from "lucide-react";

import { useFlow } from "fractostate";
import { NavigationFlow } from "@/store/navigation";

export const DocSidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
  const pathname = usePathname();
  const [
    { collapsedSections, expandedItems },
    { actions }
  ] = useFlow(NavigationFlow);

  const toggleSection = (title: string) => {
    actions.toggleSection(title);
  };

  const toggleItem = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    actions.toggleItem(title);
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
      actions.setExpandedItems(Array.from(new Set([...expandedItems, ...itemsToExpand])));
    }
    
    if (sectionsToExpand.length > 0) {
      actions.expandSections(sectionsToExpand);
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
                className={cn(
                  "flex items-center justify-between w-full text-[11px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-lg transition-all group/header",
                  isSectionCollapsed 
                    ? "text-muted-foreground/40 hover:text-muted-foreground/80 hover:bg-white/[0.02]" 
                    : "text-primary/80 bg-primary/5 mb-1"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-1 h-1 rounded-full transition-all",
                    isSectionCollapsed ? "bg-muted-foreground/20" : "bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]"
                  )} />
                  {section.title}
                </div>
                {isSectionCollapsed ? <ChevronRight size={12} className="opacity-40" /> : <ChevronDown size={12} className="text-primary" />}
              </button>
              
              {!isSectionCollapsed && (
                <div className="flex flex-col gap-1 ml-3.5 pl-4 border-l border-white/[0.05] relative">
                  {/* Tree line highlight for active section */}
                  {section.items.some((item: any) => pathname === item.href || (item.items && item.items.some((sub: any) => pathname === sub.href))) && (
                    <div className="absolute left-[-1px] top-0 w-[1px] h-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
                  )}
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
                              "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all relative overflow-hidden group/link",
                              isActive 
                                ? "bg-white/[0.03] text-foreground font-semibold border border-white/5" 
                                : "text-muted-foreground hover:bg-white/[0.02] hover:text-foreground"
                            )}
                          >
                            {isActive && pathname === item.href && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary rounded-r-full shadow-[0_0_8px_var(--color-primary)]" />
                            )}
                            <div className="flex items-center gap-2">
                              {hasSubItems ? (
                                <Layers size={12} className={cn("transition-colors", isActive ? "text-primary" : "text-muted-foreground/40")} />
                              ) : (
                                <div className={cn(
                                  "w-1 h-1 rounded-full transition-all",
                                  pathname === item.href ? "bg-primary shadow-[0_0_5px_var(--color-primary)]" : "bg-white/10 group-hover/link:bg-white/30"
                                )} />
                              )}
                              <span className={cn(
                                "transition-colors",
                                isActive ? "text-white" : "text-slate-400 group-hover/link:text-slate-200"
                              )}>{item.title}</span>
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
                                  {isExpanded ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
                                </button>
                              ) : (
                                <ChevronRight 
                                  size={12} 
                                  className={cn(
                                    "transition-all duration-300",
                                    pathname === item.href ? "opacity-100 translate-x-0 text-primary" : "opacity-0 -translate-x-2 group-hover/item:opacity-40 group-hover/item:translate-x-0"
                                  )} 
                                />
                              )}
                            </div>
                          </Link>
                        </div>

                        {hasSubItems && isExpanded && (
                          <div className="flex flex-col gap-0.5 ml-2.5 pl-4 border-l border-white/[0.05] mt-1 mb-2 relative">
                            {/* Inner tree line highlight */}
                            {item.items?.some((sub: any) => pathname === sub.href) && (
                              <div className="absolute left-[-1px] top-0 w-[1px] h-full bg-primary/30" />
                            )}
                            {item.items?.map((subItem: any, subIdx: number) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subIdx}
                                  href={subItem.href}
                                  className={cn(
                                    "group/sub flex items-center justify-between px-3 py-1.5 rounded-md text-[11px] transition-all relative",
                                    isSubActive
                                      ? "text-primary font-bold bg-primary/5"
                                      : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={cn(
                                      "w-1 h-[1px] bg-white/10 transition-all",
                                      isSubActive ? "w-2 bg-primary" : "group-hover/sub:w-1.5 group-hover/sub:bg-white/30"
                                    )} />
                                    <span>{subItem.title}</span>
                                  </div>
                                  {isSubActive && <ChevronRight size={10} className="text-primary animate-pulse" />}
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
