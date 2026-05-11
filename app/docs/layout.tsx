import { DocsSidebar } from "@/components/layout/DocsSidebar";
import { DocsHeader } from "@/components/layout/DocsHeader";
import { Suspense } from "react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-xp-bg text-xp-text selection:bg-xp-primary/30 selection:text-xp-primary">
      <DocsHeader />
      
      <div className="container flex items-start max-w-screen-2xl mx-auto">
        <DocsSidebar />
        
        <main className="flex-1 min-w-0">
          <Suspense fallback={<div className="p-10 animate-pulse text-xp-muted">Chargement...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-xp-primary/5 blur-[120px] rounded-full -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-xp-accent/5 blur-[100px] rounded-full -ml-48 -mb-48" />
      </div>
    </div>
  );
}
