import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Braces, Zap, Shield, Activity, Layers, ArrowRight, CheckCircle2, Globe } from "lucide-react";

export default function XJsonPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>XyPriss JSON (XJson) API</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Robust JSON serialization engine designed to handle BigInt, circular
          references, and massive datasets without memory limitations.
        </p>
        <p className="leading-relaxed">
          The XJson API is an advanced response handler that solves the
          fundamental limitations of standard{" "}
          <code className="text-primary">JSON.stringify()</code>. By leveraging
          native Go serialization routines and streaming logic, it provides a
          fail-safe mechanism for complex data structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {[
          {
            t: "BigInt Support",
            d: "Automatically serializes BigInt values to strings without throwing errors.",
            i: Activity,
          },
          {
            t: "Circular Safe",
            d: "Detects and handles cyclic object structures to prevent infinite recursion.",
            i: Shield,
          },
          {
            t: "Streaming I/O",
            d: "Streams responses in chunks for large datasets to avoid memory pressure.",
            i: Zap,
          },
          {
            t: "Depth Control",
            d: "Configurable recursion limits to protect server resources.",
            i: Layers,
          },
        ].map((feat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
              <feat.i size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">{feat.t}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feat.d}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="usage">
        Basic Usage
      </SectionHeading>
      <p className="mb-4">
        Switch from <code className="text-primary">res.json()</code> to{" "}
        <code className="text-primary">res.xJson()</code> to benefit from
        enhanced serialization.
      </p>
      <CodeBlock
        language="typescript"
        code={`app.get("/api/stats", (req, res) => {
    const data = {
        id: "cmj17...",
        size: 18n, // BigInt - normally fails in JSON.stringify
        metadata: { author: "John" }
    };

    // Use XJson for safe delivery
    res.xJson(data);
});`}
      />

      <SectionHeading level={2} id="streaming">
        Streaming Large Data
      </SectionHeading>
      <p className="leading-relaxed">
        XJson automatically enables streaming for payloads exceeding **64KB**.
        This prevents the server from buffering the entire response in memory,
        ensuring stability under heavy load.
      </p>
      <div className="my-6">
        <CodeBlock
          language="typescript"
          code={`res.xJson(massiveDataset, {
    enableStreaming: true,
    chunkSize: 1024 * 128 // Custom 128KB chunks
});`}
        />
      </div>

      <SectionHeading level={2} id="configuration">
        API Reference
      </SectionHeading>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Option</th>
              <th className="px-4 py-3">Default</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              {
                o: "maxDepth",
                v: "20",
                d: "Maximum recursion level for object graphs.",
              },
              {
                o: "truncateStrings",
                v: "10000",
                d: "Character limit before string truncation.",
              },
              {
                o: "enableStreaming",
                v: "true",
                d: "Enable chunk-based response delivery.",
              },
              {
                o: "chunkSize",
                v: "64KB",
                d: "Size of each stream chunk in bytes.",
              },
              {
                o: "includeNonEnumerable",
                v: "false",
                d: "Whether to serialize hidden properties.",
              },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-primary">{row.o}</td>
                <td className="px-4 py-3 text-white">{row.v}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="comparison">
        Comparison Table
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
          <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            Standard JSON
          </h4>
          <ul className="space-y-3">
            {[
              "Fails on BigInt",
              "Crashes on Circular Refs",
              "Buffers entire data in RAM",
              "Strict Depth Limit (No Config)",
            ].map((item, i) => (
              <li
                key={i}
                className="text-xs text-muted-foreground flex items-start gap-2 italic"
              >
                <span className="text-red-500 mt-0.5">✕</span> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/10">
          <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            XyPriss XJson
          </h4>
          <ul className="space-y-3">
            {[
              "Native BigInt conversion",
              "Cyclic detection & handling",
              "Smart Streaming (>64KB)",
              "Developer-defined depth",
            ].map((item, i) => (
              <li
                key={i}
                className="text-xs text-white flex items-start gap-2 font-medium"
              >
                <CheckCircle2
                  size={14}
                  className="text-green-500 mt-0.5 shrink-0"
                />{" "}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <DocsFooter
        title="Client IP Detection"
        description="Learn about robust real-client IP resolution across proxies and VPNs."
        buttonText="View API"
        href="/docs/server/get-ip"
        iconName="Shield"
      />
    </div>
  );
}
