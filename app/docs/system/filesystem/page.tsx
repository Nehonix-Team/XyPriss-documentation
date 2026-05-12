import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { 
  FolderTree, 
  Zap, 
  FileCode, 
  Search, 
  Archive, 
  Eye, 
  Lock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const ModuleCard = ({ 
  title, 
  description, 
  href, 
  icon: Icon,
  badge 
}: { 
  title: string; 
  description: string; 
  href: string; 
  icon: any;
  badge: string;
}) => (
  <Link 
    href={href}
    className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">
        {badge}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
      View API <ArrowRight size={14} />
    </div>
  </Link>
);

export default function FilesystemOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <FolderTree size={14} />
          System Module
        </div>
        <SectionHeading level={1}>Filesystem API (fs)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          High-performance filesystem abstraction powered by the native XHSC engine.
        </p>
      </div>

      <p className="leading-relaxed">
        The <code className="text-primary">fs</code> module provides a high-level, unified abstraction for all file and directory I/O operations. 
        Unlike standard Node.js <code className="text-primary">fs</code>, XyPriss delegates heavy lifting to the **XHSC Hyper-System Core**, 
        offering near-native performance and non-blocking multithreading.
      </p>

      <Callout type="info" title="Under the Hood Architecture">
        All methods on <code className="text-primary">__sys__.fs</code> interact with the underlying Go-based engine. 
        This guarantees that intensive operations like directory traversal, checksumming, or large-file streaming do not block the Node.js event loop.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <ModuleCard 
          title="Core Operations"
          description="Read, write, copy, move, and directory management."
          href="/docs/system/filesystem/core"
          icon={FileCode}
          badge="core"
        />
        <ModuleCard 
          title="Helpers & Utils"
          description="JSON handling, binary I/O, and filtered listings."
          href="/docs/system/filesystem/helpers"
          icon={Zap}
          badge="helpers"
        />
        <ModuleCard 
          title="Search & Patterns"
          description="Full-text discovery and glob-based file matching."
          href="/docs/system/filesystem/search"
          icon={Search}
          badge="search"
        />
        <ModuleCard 
          title="Archive & Compression"
          description="TAR archiving and lossless GZIP compression."
          href="/docs/system/filesystem/archive"
          icon={Archive}
          badge="archive"
        />
        <ModuleCard 
          title="File Watching"
          description="Reactive filesystem monitoring and event handling."
          href="/docs/system/filesystem/watch"
          icon={Eye}
          badge="watch"
        />
        <ModuleCard 
          title="Security & Advanced"
          description="AES-256 encryption, shredding, and locking."
          href="/docs/system/filesystem/security"
          icon={Lock}
          badge="extended"
        />
      </div>

      <DocsFooter 
        title="Core Operations"
        description="Learn the fundamental filesystem methods for reading, writing, and listing."
        buttonText="Explore Core API"
        href="/docs/system/filesystem/core"
        iconName="FileCode"
      />
    </div>
  );
}
