import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Zap, List, FileJson, Binary, RefreshCw, Database, Hash } from "lucide-react";

export default function FsHelpersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Zap size={14} />
          Filesystem Module
        </div>
        <SectionHeading level={1}>Helpers & Utils</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          High-level convenience methods for common development patterns.
        </p>
      </div>

      <SectionHeading level={2} id="filtered-listing">Filtered & Recursive Listing</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <List size={16} className="text-primary" />
            .lsRecursive(path, filter?)
          </h4>
          <p className="text-xs text-muted-foreground mb-4">Deep traversal with optional callback filtering.</p>
          <CodeBlock language="typescript" code={`const tsFiles = __sys__.fs.lsRecursive("ROOT://src", f => f.endsWith(".ts"));`} />
        </div>
        <div className="space-y-2">
          {[
            { n: ".lsDirs(p)", d: "Returns only subdirectory names." },
            { n: ".lsFiles(p)", d: "Returns only file names." },
            { n: ".lsFullPath(p)", d: "Returns fully resolved absolute paths." },
          ].map((u, i) => (
            <div key={i} className="p-3 rounded-lg bg-white/[0.01] border border-white/5 flex justify-between items-center">
              <span className="font-mono text-xs text-primary">{u.n}</span>
              <span className="text-[10px] text-muted-foreground uppercase">{u.d}</span>
            </div>
          ))}
        </div>
      </div>

      <SectionHeading level={2} id="json-handling">JSON Automation</SectionHeading>
      <p className="mb-4 text-muted-foreground">Native JSON serialization using <code className="text-primary">XStringify</code> with safe fallback options.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 border-l-primary/30">
          <div className="text-primary font-mono text-sm mb-2">.readJsonSafe(path, default)</div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Returns <code className="text-primary">default</code> instead of throwing if the file is missing or malformed.
          </p>
        </div>
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-white/[0.01] border border-white/5 font-mono text-xs text-white">.readJson(path)</div>
          <div className="p-3 rounded-lg bg-white/[0.01] border border-white/5 font-mono text-xs text-white">.writeJson(path, data)</div>
        </div>
      </div>

      <SectionHeading level={2} id="binary-io">Binary & Raw I/O</SectionHeading>
      <div className="flex flex-col gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
          <Binary className="text-primary mt-1" size={24} />
          <div>
            <h4 className="font-bold text-white mb-1">.readBytes() / .writeBytes()</h4>
            <p className="text-sm text-muted-foreground">Bypass text encoding entirely. Works with raw Node <code className="text-primary">Buffer</code> objects.</p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-4">
          <List className="text-primary mt-1" size={24} />
          <div>
            <h4 className="font-bold text-white mb-1">.readLines() / .readNonEmptyLines()</h4>
            <p className="text-sm text-muted-foreground">Synchronous or asynchronous line-by-line reading.</p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="stats-utilities">Native Stats & Utilities</SectionHeading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[
          { n: ".hash(p)", i: Hash, d: "Natively compute checksum." },
          { n: ".size(p)", i: Database, d: "Bytes or human-readable size." },
          { n: ".du(p)", i: RefreshCw, d: "Full directory tree usage." },
          { n: ".sync(s, d)", i: RefreshCw, d: "One-way directory mirror." },
        ].map((u, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <u.i size={20} className="text-primary mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-mono text-xs text-white mb-1">{u.n}</div>
            <p className="text-[10px] text-muted-foreground leading-tight">{u.d}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {[
          { n: ".ensureDir(path)", d: "Never-throw directory creation." },
          { n: ".writeIfNotExists(path, data)", d: "Conditional write operation." },
          { n: ".dedupe(path)", d: "Identify duplicates via hash." },
          { n: ".check(path)", d: "Verify existence and status." },
        ].map((u, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="font-mono text-primary text-xs mb-1">{u.n}</div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{u.d}</p>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Search & Patterns"
        description="Master full-text search and glob discovery across your project structure."
        buttonText="Explore Search"
        href="/docs/system/filesystem/search"
        iconName="Search"
      />
    </div>
  );
}
