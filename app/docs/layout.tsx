"use client";

import React, { useState, Suspense } from "react";
import { DocsHeader } from "@/components/ui/DocsHeader";
import { DocSidebar } from "@/components/ui/DocSidebar";
import { OnThisPage } from "@/components/ui/OnThisPage";
import { SearchHighlighter } from "@/components/ui/SearchHighlighter";
import { cn } from "@/lib/utils";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <DocsHeader />
      <div className="container mx-auto flex-1 px-4 lg:px-8">
        <div className="flex flex-1 gap-10">
          {/* Sidebar */}
          <aside
            className={cn(
              "hidden lg:block shrink-0 border-r border-border pr-4 sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300",
              leftSidebarCollapsed ? "w-16" : "w-64",
            )}
          >
            <DocSidebar
              isCollapsed={leftSidebarCollapsed}
              onToggle={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 py-12 lg:py-16">
            <div className="mx-auto max-w-4xl">
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
              "hidden xl:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] transition-all duration-300",
              rightSidebarCollapsed ? "w-16" : "w-64",
            )}
          >
            <OnThisPage
              isCollapsed={rightSidebarCollapsed}
              onToggle={() => setRightSidebarCollapsed(!rightSidebarCollapsed)}
            />
          </aside>
        </div>
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
