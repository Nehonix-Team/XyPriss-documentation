import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Globe,
  Zap,
  Shield,
  HardDrive,
  Cpu,
  Activity,
  Share2,
  Info,
  Layers,
  GitBranch,
} from "lucide-react";

export default function StaticFilesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>
          XStatic: High-Performance Static Delegation
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Zero-copy architecture that offloads static file delivery to the native
          Go engine (XHSC) via a secure IPC bridge — bypassing Node.js entirely
          during request handling.
        </p>
        <p>
          In traditional Node.js web frameworks, serving static files involves
          reading data from disk into memory buffers, processing them through the
          JavaScript event loop, and writing to the network socket. XStatic
          eliminates these bottlenecks by synchronising routing tables and
          security policies to the native Go engine at startup, which then
          intercepts requests at the TCP level.
        </p>
      </div>

      <SectionHeading level={2} id="bottlenecks">
        Traditional Bottlenecks
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <HardDrive className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-1">Memory Overhead</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Every file read creates temporary buffers increasing GC pressure.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Cpu className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-1">Event Loop Blocking</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            High-concurrency static requests saturate the event loop, delaying
            business logic execution.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Activity className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-1">Context Switching</H4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Constant data movement between kernel and user space incurs
            significant CPU overhead.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="architecture">
        XHSC Fast Path Architecture
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        <strong>XStatic</strong> solves these issues through{" "}
        <strong>Native XHSC Fast Path Interception</strong>. Node.js is
        completely bypassed during the request lifecycle. Routes and security
        configurations are synced to the Go engine at startup, which then serves
        files natively via efficient OS-level primitives.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <GitBranch className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Startup Sync</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            All routes and security policies (allowOutsideRoot, dotfiles) are
            serialised and transmitted to the Go engine when the server starts.
            No runtime overhead from this sync.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Zap className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Zero-Copy Transfer</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Data moves from disk to TCP socket via kernel-level primitives
            (<code>sendfile</code>, <code>copy_file_range</code>). Node.js
            memory stays completely flat regardless of file size.
          </p>
        </div>
      </div>

      <Callout type="info" title="Design Principle: Single Source of Truth">
        Routing and security are defined once in TypeScript via <code>xs.define()</code>. 
        XyPriss validates the configuration and pushes it to Go. You never write Go configuration — 
        the TypeScript API is the single source of truth.
      </Callout>

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
            Enforces strict sandboxing. Node.js synchronously verifies the
            target directory at startup. Malicious URLs (
            <code className="text-primary">/static/../../.env</code>) are blocked
            instantly by Go&apos;s native path-cleaning before the filesystem is
            accessed.
          </p>
          <CodeBlock
            language="typescript"
            code={`xs.define("/assets", "./public", {
    allowOutsideRoot: false, // Default security boundary
    maxAge: "1d"             // Cache-Control: max-age=86400
});`}
          />
        </div>

        <div>
          <h4 className="text-md font-bold text-white mb-2 flex items-center gap-2">
            <Share2 size={18} className="text-primary" />
            Case 2: Shared Assets (Cross-Root)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Serve files from shared mounts or global folders outside the project
            root. Go still normalises the URI to prevent directory traversal
            relative to the target directory.
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
        Settings in <code className="text-primary">createServer</code> define
        the default security and performance policy for all static instances.
        These are passed to the Go engine as startup flags.
      </p>

      <div className="space-y-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
              dotfiles
            </span>
            <span className="text-xs text-muted-foreground italic">
              Controls access to hidden files (.env, .git)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Since Node.js is bypassed, this rule is strictly enforced by the Go
            engine. Go inspects the base filename and halts the request
            immediately if it matches the policy.
          </p>
          <CodeBlock
            language="typescript"
            code={`static: {
    dotfiles: {
        mode: "deny",               // "deny" | "ignore" | "allow"
        custom: ["config.json", "private.key"] // Block specific sensitive files
    }
}`}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <h5 className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">deny</h5>
              <p className="text-[10px] text-muted-foreground">
                Returns 403 Forbidden for any dotfile (recommended).
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <h5 className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">ignore</h5>
              <p className="text-[10px] text-muted-foreground">
                Returns 404 Not Found (stealth mode) for dotfiles.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <h5 className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">allow</h5>
              <p className="text-[10px] text-muted-foreground">
                Serves the file — not recommended for production.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
              zeroCopy
            </span>
            <span className="text-xs text-muted-foreground italic">
              Native sendfile(2) optimisation
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Data is transferred directly from disk to network without intermediate
            memory copies. Node.js memory stays flat even for multi-gigabyte
            files transferred concurrently.
          </p>
          <CodeBlock language="typescript" code={`static: { zeroCopy: true }`} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
              lruCacheSize
            </span>
            <span className="text-xs text-muted-foreground italic">
              Meta-Cache size for negative lookups
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Stores the state of non-existent files. Subsequent requests for
            unknown files are served directly from RAM, saving disk I/O.
          </p>
          <CodeBlock language="typescript" code={`static: { lruCacheSize: 10000 }`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
              concurrencyPool
            </h5>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Limits concurrent I/O goroutines in the native engine to prevent
              resource exhaustion (default: 2048).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
              defaultMaxAge
            </h5>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              Sets a default <code className="text-primary font-bold">Cache-Control</code>{" "}
              policy for all served assets.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="performance">Performance Benchmarks</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Benchmarks use <strong>autocannon</strong> testing static file delivery
        against Express, Fastify, and XyPriss XStatic on identical hardware.
      </p>
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
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Throughput</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">~5,000 req/s</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">~45,000+ req/s</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Memory Usage</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">Grows with concurrency</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">Constant (Zero-Copy)</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">CPU Overhead</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">High (GC + Buffer Copy)</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">Minimal (Kernel Handover)</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Node.js Event Loop</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">Heavily blocked</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">0% Blocked</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="success" title="Cluster Scaling">
        With <code>--cluster-workers 10</code>, XStatic throughput more than
        doubles (~13,000 req/s), confirming that the Go fast-path gains and
        horizontal scaling are cumulative.
      </Callout>

      <Callout type="info" title="File Delegation vs Streaming">
        XStatic represents a shift from &quot;File Streaming&quot; to{" "}
        <strong>File Delegation</strong>. By offloading data transfer to a
        compiled native engine, XyPriss provides an enterprise-grade solution for
        serving assets at scale.
      </Callout>

      <DocsFooter
        title="Send Response Utility"
        description="Standardise every API response with the structured Send utility and IResTemplate contract."
        buttonText="Explore Send"
        href="/docs/server/send"
        iconName="Layers"
      />
    </div>
  );
}
