import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Globe, Zap, Shield, HardDrive, Cpu, Activity, Share2, Info } from "lucide-react";

export default function StaticFilesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>XStatic: High-Performance Delegation</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Zero-copy architecture that offloads static file delivery to the native Go engine for maximum throughput and minimal overhead.
        </p>
      </div>

      <SectionHeading level={2} id="overview">Overview</SectionHeading>
      <p className="leading-relaxed">
        In traditional Node.js web frameworks, serving static files involves reading data from the disk into memory buffers, processing them through the JavaScript event loop, and writing them to the network socket. This approach introduces critical bottlenecks:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { t: "Memory Overhead", d: "Every file read creates temporary buffers that increase garbage collection (GC) pressure.", i: HardDrive },
          { t: "Event Loop Blocking", d: "Large transfers or high concurrency can saturate the event loop, delaying business logic.", i: Cpu },
          { t: "Context Switching", d: "Movement between kernel space and user space incurs significant CPU overhead.", i: Activity },
        ].map((feat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <feat.i size={20} />
            </div>
            <h4 className="font-bold text-white text-sm">{feat.t}</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">{feat.d}</p>
          </div>
        ))}
      </div>

      <p className="leading-relaxed">
        <strong>XStatic</strong> solves these issues by implementing a <strong>Zero-Copy IPC Delegation</strong> architecture. Instead of serving files through Node.js, XyPriss validates the request in TypeScript and then "delegates" the actual data transfer to the native <strong>XHSC (Go)</strong> engine.
      </p>

      <SectionHeading level={2} id="usage">Basic Usage</SectionHeading>
      <p className="mb-4">
        To enable XStatic, instantiate the component and define your routes:
      </p>
      <CodeBlock 
        language="typescript"
        code={`import { XStatic, createServer } from "xypriss";

const app = createServer();
const xs = new XStatic(app, __sys__);

// Define a static route (URI path -> physical directory)
xs.define("/static", "public");

app.start();`}
      />

      <SectionHeading level={2} id="local-options">Configuration Examples</SectionHeading>
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-md font-bold text-white mb-2 flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            Case 1: Secure Sandbox (Default)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Ensures that even crafted URLs like <code className="text-primary">/static/../../.env</code> are blocked. Any path outside the root results in a <strong>403 Forbidden</strong>.
          </p>
          <CodeBlock 
            language="typescript"
            code={`xs.define("/assets", "./public", {
    allowOutsideRoot: false, // Default security boundary
    maxAge: "1d"             // Caching for 24 hours
});`}
          />
        </div>

        <div>
          <h4 className="text-md font-bold text-white mb-2 flex items-center gap-2">
            <Share2 size={18} className="text-primary" />
            Case 2: Shared Assets (Cross-Root)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Allows serving files from shared mounts or global folders outside the project root while maintaining normalization.
          </p>
          <CodeBlock 
            language="typescript"
            code={`xs.define("/global", "/mnt/shared/images", {
    allowOutsideRoot: true,
    maxAge: 3600 // 1 hour
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="global-config">Global Configuration</SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Settings in <code className="text-primary">createServer</code> define the default security and performance policy for all static instances.
      </p>
      
      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">lruCacheSize</span>
            <span className="text-xs text-muted-foreground italic">Sets the Meta-Cache size for negative lookups</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Stores the state of non-existent files. Subsequent requests for unknown files are served directly from RAM, saving disk I/O.
          </p>
          <CodeBlock language="typescript" code={`static: { lruCacheSize: 10000 }`} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">dotfiles</span>
            <span className="text-xs text-muted-foreground italic">Controls access to hidden files (.env, .git)</span>
          </div>
          <CodeBlock language="typescript" code={`static: {
    dotfiles: {
        mode: "deny",
        custom: ["config.json", "private.key"] // Block specific sensitive files
    }
}`} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">zeroCopy</span>
            <span className="text-xs text-muted-foreground italic">Native sendfile(2) optimization</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Data is transferred directly from disk to network without intermediate memory copies. Node.js memory stays flat even for multi-gigabyte transfers.
          </p>
          <CodeBlock language="typescript" code={`static: { zeroCopy: true }`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">concurrencyPool</h5>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Limits concurrent I/O goroutines in the native engine to prevent resource exhaustion (default: 2048).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">defaultMaxAge</h5>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Sets a default <code className="text-primary font-bold">Cache-Control</code> policy for all served assets.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="performance">Performance Benchmarks</SectionHeading>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Traditional Node.js</th>
              <th className="px-4 py-3 text-primary">XyPriss XStatic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { m: "Throughput", n: "~5,000 req/s", x: "~45,000+ req/s" },
              { m: "Memory Usage", n: "Grows with load", x: "Constant (Zero-Copy)" },
              { m: "CPU Overhead", n: "High (GC + Buffer Copy)", x: "Minimal (Kernel Handover)" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-medium text-white">{row.m}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.n}</td>
                <td className="px-4 py-3 text-primary font-bold">{row.x}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="info" title="File Delegation vs Streaming">
        XStatic represents a shift from "File Streaming" to <strong>File Delegation</strong>. By offloading data transfer to a compiled native engine, XyPriss provides an enterprise-grade solution for serving assets at scale.
      </Callout>

      <DocsFooter 
        title="File Uploads"
        description="Configure the native XHSC-powered file upload system for production."
        buttonText="Upload Guide"
        href="/docs/server/file-uploads"
        iconName="Upload"
      />
    </div>
  );
}
