import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Globe, Zap, Shield, HardDrive, Cpu, Activity } from "lucide-react";

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
          Zero-copy architecture that offloads static file delivery to the native Go engine for maximum throughput.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {[
          { t: "Zero Memory", d: "Data flows from disk to socket without V8 heap buffers.", i: HardDrive },
          { t: "Event Loop Safe", d: "Transfer is handled in native threads, keeping Node.js responsive.", i: Cpu },
          { t: "Meta-Cache", d: "LRU caching for negative lookups (404s) saves disk I/O.", i: Activity },
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

      <SectionHeading level={2} id="usage">Basic Usage</SectionHeading>
      <p className="mb-4 text-sm text-muted-foreground">
        Instantiate the <code className="text-primary font-bold">XStatic</code> component and delegate your routes.
      </p>
      <CodeBlock 
        language="typescript"
        code={`import { XStatic, createServer, __sys__ } from "xypriss";

const app = createServer();
const xs = new XStatic(app, __sys__);

// Define a static route (URI path -> physical directory)
xs.define("/static", "public");

app.start();`}
      />

      <SectionHeading level={2} id="security">Security & Sandboxing</SectionHeading>
      <p className="leading-relaxed mb-6">
        XStatic operates in a <strong>Strict Sandbox</strong> by default, preventing directory traversal attacks relative to the defined root.
      </p>
      
      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            Dotfiles Management
          </h4>
          <p className="text-xs text-muted-foreground mb-4">
            Block access to sensitive hidden files like <code className="text-primary">.env</code> or <code className="text-primary">.git</code> automatically.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const app = createServer({
    static: {
        dotfiles: "deny", // Returns 403 instantly
        custom: ["private.key", "config.json"] // Block specific files
    }
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="performance">Performance Benchmarks</SectionHeading>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Node.js (Standard)</th>
              <th className="px-4 py-3 text-primary">XyPriss XStatic</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { m: "Throughput", n: "~5,000 req/s", x: "~45,000+ req/s" },
              { m: "Memory Usage", n: "Grows with load", x: "Constant (Zero-Copy)" },
              { m: "CPU Overhead", n: "High (GC pressure)", x: "Minimal (Kernel Handover)" },
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
