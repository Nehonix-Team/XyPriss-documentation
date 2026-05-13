"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsConfig } from "@/lib/docs-config";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronDown, PanelLeftClose, PanelLeftOpen, Layers, Maximize2, Minimize2 } from "lucide-react";

import { useFlow } from "fractostate";
import { NavigationFlow } from "@/store/navigation";

export const DocSidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement>(null);

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

  const handleExpandAll = () => actions.expandAll();
  const handleCollapseAll = () => actions.collapseAll(docsConfig.map(s => s.title));

  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-expand active items and collapse others
  React.useEffect(() => {
    if (!isMounted) return;

    const itemsToExpand: string[] = [];
    let sectionToExpand = "";
    const allSectionTitles = docsConfig.map(s => s.title);
    
    docsConfig.forEach(section => {
      let sectionHasActive = false;
      
      section.items.forEach((item: any) => {
        const hasSubItems = item.items && item.items.length > 0;
        const isExactActive = pathname === item.href;
        const isChildActive = hasSubItems && item.items?.some((sub: any) => pathname === sub.href);
        
        if (isExactActive || isChildActive) {
          sectionHasActive = true;
          sectionToExpand = section.title;
        }
        
        if (isChildActive) {
          itemsToExpand.push(item.title);
        }
      });
    });
    
    if (sectionToExpand) {
      // Auto-collapse others: only the active section is not in the collapsed list
      const newCollapsed = allSectionTitles.filter(t => t !== sectionToExpand);
      actions.setCollapsedSections(newCollapsed);
    }

    if (itemsToExpand.length > 0) {
      actions.setExpandedItems(itemsToExpand);
    }

    // Scroll active item into view
    setTimeout(() => {
      if (activeItemRef.current) {
        activeItemRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 100);
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
    <aside 
      ref={sidebarRef}
      className="w-full h-full py-8 pr-4 overflow-y-auto custom-scrollbar transition-all duration-300 relative group"
    >
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono text-muted-foreground/40 uppercase tracking-[0.2em]">Navigation</span>
          <div className="flex items-center gap-2 mt-1">
            <button 
              onClick={handleExpandAll}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[9px] text-muted-foreground hover:text-white hover:bg-white/[0.08] transition-all"
              title="Expand All Sections"
            >
              <Maximize2 size={10} />
              EXPAND
            </button>
            <button 
              onClick={handleCollapseAll}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[9px] text-muted-foreground hover:text-white hover:bg-white/[0.08] transition-all"
              title="Collapse All Sections"
            >
              <Minimize2 size={10} />
              COLLAPSE
            </button>
          </div>
        </div>
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
                            {...(isActive && pathname === item.href ? { ref: activeItemRef } : {})}
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
                                    {...(isSubActive ? { ref: activeItemRef } : {})}
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
