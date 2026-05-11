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
        <SectionHeading level={1}>XHSC: XyPriss Hyper-System Core</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The high-performance cornerstone of XyPriss. A lean, ultra-fast networking engine written in Go.
        </p>
      </div>

      <p>
        <strong>XHSC</strong> is responsible for the heavy lifting in XyPriss. By offloading performance-critical tasks to a native Go engine, XyPriss avoids the common bottlenecks associated with the Node.js event loop.
      </p>

      <SectionHeading level={2} id="responsibilities">Key Responsibilities</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
           <Zap className="text-primary mb-4" size={24} />
           <h4 className="font-bold mb-2">High-Performance Routing</h4>
           <p className="text-sm text-muted-foreground">Uses a native **Radix Tree (Trie)** implementation for microsecond-level route matching, regardless of the number of routes.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
           <GitBranch className="text-primary mb-4" size={24} />
           <h4 className="font-bold mb-2">IPC Bridge</h4>
           <p className="text-sm text-muted-foreground">A zero-copy optimized link between the native core and Node.js, offloading I/O and parsing tasks.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
           <Shield className="text-primary mb-4" size={24} />
           <h4 className="font-bold mb-2">Traffic Guardrails</h4>
           <p className="text-sm text-muted-foreground">Regex-based rate limiting and header sanitization performed at the networking level before reaching the app.</p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
           <Activity className="text-primary mb-4" size={24} />
           <h4 className="font-bold mb-2">System Intelligence</h4>
           <p className="text-sm text-muted-foreground">Proactive health monitoring and resource management, including automatic GC triggers and rescue mode.</p>
        </div>
      </div>

      <SectionHeading level={2} id="conversion">Native Data Conversion</SectionHeading>
      <p>
        XHSC includes a high-performance streaming transcoder built directly into the networking stack:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li><strong>XML to JSON</strong>: Automatically transcodes incoming payloads.</li>
        <li><strong>Bi-Directional</strong>: Mirrors outgoing responses based on origin format.</li>
        <li><strong>Content Sniffing</strong>: Identifies formats for non-compliant requests.</li>
      </ul>

      <SectionHeading level={2} id="versioning">Versioning Logic</SectionHeading>
      <p>
        XHSC uses a deterministic 12-character versioning system: `XHSC[MMDD][YY][GX]`.
      </p>
      
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Segment</th>
              <th className="px-4 py-3">Meaning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHSC</td>
              <td className="px-4 py-3">Core Identifier</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">MMDD</td>
              <td className="px-4 py-3">Build Timestamp (Month/Day)</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">YY</td>
              <td className="px-4 py-3">Year of Deployment</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">GX</td>
              <td className="px-4 py-3">Architectural Generation (e.g., G4)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info">
        Example: `XHSC4626G3` decodes to **April 6, 2026 | Generation 3**.
      </Callout>

      <SectionHeading level={2} id="specs">Technical Specifications</SectionHeading>
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-white/5">
          <span className="text-muted-foreground">Core Language</span>
          <span className="font-mono text-sm bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">Go (Native)</span>
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
