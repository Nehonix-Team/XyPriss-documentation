import React from "react";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocSidebar } from "@/components/docs/DocSidebar";
import { OnThisPage } from "@/components/docs/OnThisPage";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20">
      <DocsHeader />
      <div className="container mx-auto flex-1 px-4 lg:px-8">
        <div className="flex flex-1 gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0 border-r border-border pr-4 sticky top-16 h-[calc(100vh-4rem)]">
            <DocSidebar />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0 py-12 lg:py-16">
            <div className="mx-auto max-w-4xl">
              <div className="prose max-w-none">{children}</div>
            </div>
          </main>

          {/* On This Page (TOC) */}
          <aside className="hidden xl:block w-64 shrink-0 sticky top-16 h-[calc(100vh-4rem)]">
            <OnThisPage />
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
