import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Search, Hash, RefreshCw, Clock, Filter } from "lucide-react";

export default function FsSearchPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Search size={14} />
          Filesystem Module
        </div>
        <SectionHeading level={1}>Search & Pattern Matching</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Blazing-fast discovery engine powered by native Go routines.
        </p>
      </div>

      <SectionHeading level={2} id="full-text">Full-Text Search</SectionHeading>
      <p className="mb-4">Query the contents of entire directory trees using highly optimized regex patterns.</p>
      <div className="space-y-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Search size={18} className="text-primary" />
            .searchInFiles(dir, pattern)
          </h4>
          <p className="text-sm text-muted-foreground mb-4">Returns an array of <code className="text-primary">SearchMatch</code> objects including filename, line number, and content snippet.</p>
          <CodeBlock 
            language="typescript"
            code={`const results = __sys__.fs.searchInFiles("./src", "TODO");
results.forEach(m => console.log(\`\${m.file}:\${m.line} -> \${m.content}\`));`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="discovery">File Discovery</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-3 text-primary font-bold uppercase tracking-widest text-[10px]">
            <Hash size={16} /> Glob Matching
          </div>
          <div className="font-mono text-sm text-white mb-2">.findByPattern(dir, glob)</div>
          <p className="text-xs text-muted-foreground mb-4">Recursive discovery using standard glob patterns.</p>
          <CodeBlock language="typescript" code={`const ts = __sys__.fs.findByPattern("./src", "*.ts");`} />
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-3 text-primary font-bold uppercase tracking-widest text-[10px]">
            <Filter size={16} /> Ext Filtering
          </div>
          <div className="font-mono text-sm text-white mb-2">.findByExt(dir, extension)</div>
          <p className="text-xs text-muted-foreground mb-4">Fast discovery of specific file extensions.</p>
          <CodeBlock language="typescript" code={`const pngs = __sys__.fs.findByExt("./assets", "png");`} />
        </div>
      </div>

      <SectionHeading level={2} id="advanced">Advanced Pattern Ops</SectionHeading>
      
      <div className="space-y-6 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <RefreshCw size={18} className="text-primary" />
            .batchRename(path, pattern, replacement, dryRun?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4">Mass rename files matching a regex. Use <code className="text-primary">dryRun: true</code> to preview changes.</p>
          <CodeBlock 
            language="typescript"
            code={`// Preview rename of .js to .mjs
const preview = __sys__.fs.batchRename("./dist", "\\\\.js$", ".mjs", true);`}
          />
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            .findModifiedSince(dir, hours)
          </h4>
          <p className="text-sm text-muted-foreground mb-4">Finds files changed within the specified temporal window.</p>
          <CodeBlock 
            language="typescript"
            code={`const recent = __sys__.fs.findModifiedSince("./src", 24); // Last 24 hours`}
          />
        </div>
      </div>

      <DocsFooter 
        title="Archive & Compression"
        description="Learn how to handle TAR and GZIP archives with zero-copy performance."
        buttonText="Next: Archive"
        href="/docs/system/filesystem/archive"
        iconName="Archive"
      />
    </div>
  );
}
