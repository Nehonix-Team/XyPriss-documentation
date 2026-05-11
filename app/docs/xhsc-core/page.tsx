"use client";

import React from "react";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { Steps, Step } from "@/components/docs/Steps";
import { 
  Cpu, 
  Zap, 
  Shield, 
  Activity, 
  GitBranch, 
  MessageSquare,
  Server
} from "lucide-react";

export default function XHSCPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Cpu size={14} />
          Core Engine
        </div>
        <SectionHeading level={1}>
          XHSC: XyPriss Hyper-System Core
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The high-performance cornerstone of XyPriss. A lean, ultra-fast
          networking engine written in Go.
        </p>
        <p>
          <strong>XHSC</strong> is responsible for the heavy lifting in XyPriss.
          By offloading performance-critical tasks to a native Go engine,
          XyPriss avoids the common bottlenecks associated with the Node.js
          event loop.
        </p>
      </div>

      <SectionHeading level={2} id="responsibilities">
        Key Responsibilities
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <Zap className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">High-Performance Routing</h4>
          <p className="text-sm text-muted-foreground">
            Uses a native <strong>Radix Tree (Trie)</strong> implementation for
            microsecond-level route matching, regardless of the number of
            routes.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <GitBranch className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">IPC Bridge</h4>
          <p className="text-sm text-muted-foreground">
            A zero-copy optimized link between the native core and Node.js,
            offloading I/O and parsing tasks.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <Shield className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">Traffic Guardrails</h4>
          <p className="text-sm text-muted-foreground">
            Regex-based rate limiting and header sanitization performed at the
            networking level before reaching the app.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <Activity className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">System Intelligence</h4>
          <p className="text-sm text-muted-foreground">
            Proactive health monitoring and resource management, including
            automatic GC triggers and rescue mode.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="conversion">
        Native Data Conversion
      </SectionHeading>
      <p>
        XHSC includes a high-performance streaming transcoder built directly
        into the networking stack:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li>
          <strong>XML to JSON</strong>: Automatically transcodes incoming
          payloads.
        </li>
        <li>
          <strong>Bi-Directional</strong>: Mirrors outgoing responses based on
          origin format.
        </li>
        <li>
          <strong>Content Sniffing</strong>: Identifies formats for
          non-compliant requests.
        </li>
      </ul>

      <SectionHeading level={2} id="versioning">
        Versioning & Naming Architecture
      </SectionHeading>
      <p>
        The XHSC versioning system is built on a <strong>12-character deterministic architecture</strong>, combining a core identifier with a high-density logical payload.
      </p>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Segment</th>
              <th className="px-4 py-3">Length</th>
              <th className="px-4 py-3">Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono text-primary font-bold">XHSC</td>
              <td className="px-4 py-3 text-muted-foreground">4</td>
              <td className="px-4 py-3 font-semibold">XyPriss Hyper-System Core Identifier</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">MMDD</td>
              <td className="px-4 py-3 text-muted-foreground">4</td>
              <td className="px-4 py-3">Build Timestamp (Month and Day)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">YY</td>
              <td className="px-4 py-3 text-muted-foreground">2</td>
              <td className="px-4 py-3">Year of Deployment (e.g., 2026 → 26)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">GX</td>
              <td className="px-4 py-3 text-muted-foreground">2</td>
              <td className="px-4 py-3 font-semibold text-white">Architectural Generation (e.g., G4)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={3} id="zero-suppression">Zero-Suppression Logic</SectionHeading>
      <p>
        To optimize visual density while maintaining logical integrity, <strong>leading zeros in the MMDD segment are suppressed during written representation</strong>.
      </p>
      
      <Callout type="info" title="Decoding Example: XHSC4626G3">
        <div className="space-y-2 text-sm">
          <p>To decode, the payload is expanded back to its 8-character logical state:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li><strong>Written</strong>: <code>4626G3</code> (6 chars)</li>
            <li><strong>Expanded</strong>: <code>0406</code> (Date) + <code>26</code> (Year) + <code>G3</code> (Gen) = <code>040626G3</code></li>
            <li><strong>Result</strong>: <span className="text-primary font-bold">April 6, 2026 | Generation 3 Architecture</span></li>
          </ul>
        </div>
      </Callout>

      <SectionHeading level={3} id="generations">Architectural Generations (GX)</SectionHeading>
      <p>
        The <strong>G</strong> index represents the structural evolution of the XyPriss engine, marking significant technological shifts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">G1: Legacy</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-muted-foreground">Node.js</span>
          </div>
          <p className="text-xs text-muted-foreground">Initial monolithic JavaScript core focused on ease of adoption.</p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-white">G2: Bridge</span>
            <span className="text-[10px] bg-orange-500/10 px-2 py-0.5 rounded text-orange-400">Rust Native</span>
          </div>
          <p className="text-xs text-muted-foreground">Hybrid architecture introducing native utility binaries for core tasks.</p>
        </div>
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-primary">G3: Native-First</span>
            <span className="text-[10px] bg-primary/20 px-2 py-0.5 rounded text-primary">Go (XHSC)</span>
          </div>
          <p className="text-xs text-white/80 font-medium">Full native core delegation. The "Age of Rationality".</p>
        </div>
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-primary">G4: IPC-Hybrid</span>
            <span className="text-[10px] bg-primary/20 px-2 py-0.5 rounded text-primary">Go (XHSC)</span>
          </div>
          <p className="text-xs text-white/80 font-medium">Deep symbiosis between native streams and JS hooks.</p>
        </div>
      </div>

      <Callout type="warning" title="Precision Refinement (.R)">
        When multiple architectural refinements occur within a single solar cycle, we utilize the <strong>Refinement Index</strong> (e.g., <code>XHSC4626G3.R1</code>). This signifies architectural polishing and edge-case hardening without changing the baseline identity.
      </Callout>

      <SectionHeading level={2} id="specs">
        Technical Specifications
      </SectionHeading>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground">Core Language</span>
          <span className="font-mono text-sm bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">
            Go (Native)
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground">Concurrency Model</span>
          <span className="font-mono text-sm">Goroutines (CSP)</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground">Routing Engine</span>
          <span className="font-mono text-sm">Native Radix Trie</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground">IPC Mechanism</span>
          <span className="font-mono text-sm">JSON-IPC over Unix Sockets</span>
        </div>
      </div>
    </div>
  );
}
