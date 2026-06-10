"use client";

import React, { useState, Suspense, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { DocSidebar } from "@/components/ui/DocSidebar";
import { OnThisPage } from "@/components/ui/OnThisPage";
import { SearchHighlighter } from "@/components/ui/SearchHighlighter";
import { SiteMeta } from "@/components/ui/SiteMeta";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/lib/docs-config";

import { useFlow } from "fractostate";
import { NavigationFlow } from "@/store/navigation";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [
    { isLeftSidebarCollapsed, isRightSidebarCollapsed },
    { actions }
  ] = useFlow(NavigationFlow);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <DocsHeader
        isMobileSidebarOpen={isMobileSidebarOpen}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />
      <SiteMeta />
      <div className="flex flex-1">
        {/* Mobile sidebar overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        {isMobileSidebarOpen && (
          <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-background lg:hidden">
            <DocSidebar
              isCollapsed={false}
              onToggle={() => setIsMobileSidebarOpen(false)}
              onCloseMobile={() => setIsMobileSidebarOpen(false)}
            />
          </aside>
        )}

        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:flex flex-col fixed left-0 top-16 z-30 border-r border-border bg-background transition-all duration-300 h-[calc(100vh-4rem)] overflow-y-auto",
            isLeftSidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          <DocSidebar
            isCollapsed={isLeftSidebarCollapsed}
            onToggle={() => actions.toggleLeftSidebar()}
          />
        </aside>

        <main className="flex-1 min-w-0 py-12 lg:pl-64 lg:pr-64">
          <div className="mx-auto max-w-4xl px-4 lg:px-8">
            <div className="prose max-w-none">
              <Suspense fallback={null}>
                <SearchHighlighter />
              </Suspense>
              {children}
            </div>
          </div>
        </main>

        {/* On This Page (TOC) */}
        <aside
          className={cn(
            "hidden xl:flex flex-col fixed right-0 top-16 z-30 border-l border-border bg-background transition-all duration-300 h-[calc(100vh-4rem)] overflow-y-auto",
            isRightSidebarCollapsed ? "w-16" : "w-64",
          )}
        >
          <OnThisPage
            isCollapsed={isRightSidebarCollapsed}
            onToggle={() => actions.toggleRightSidebar()}
          />
        </aside>
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>
    </div>
  );
}
