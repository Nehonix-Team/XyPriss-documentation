import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Zap, Activity, ShieldAlert, Cpu, Layers, Terminal } from "lucide-react";

export default function ClusterPerformancePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Performance Tuning</SectionHeading>

      <p>
        Optimizing a high-performance cluster requires understanding the synergy
        between the native XHSC engine and your worker processes. Use these
        guidelines to find the "sweet spot" for your application.
      </p>

      <SectionHeading level={2}>
        1. Finding the Worker Sweet Spot
      </SectionHeading>
      <p>
        The <code>workers</code> setting is the most critical lever for scaling.
        Avoid over-provisioning, which can lead to excessive context switching.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">
                Workload
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Recommended Count
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Logic
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 font-semibold text-blue-400">
                I/O Heavy
              </td>
              <td className="p-3 border border-white/10">
                <code>Math.max(4, CPU_CORES * 1.5)</code>
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                DB/API waits allow more workers to fill the gaps.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 font-semibold text-purple-400">
                CPU Heavy
              </td>
              <td className="p-3 border border-white/10">
                <code>CPU_CORES - 1</code>
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Leave one core free for XHSC network handling.
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 font-semibold text-green-400">
                General
              </td>
              <td className="p-3 border border-white/10">
                <code>"auto"</code>
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Maps 1 worker to 1 physical thread automatically.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>2. Distribution Tuning</SectionHeading>
      <p>Strategy selection significantly impacts throughput consistency:</p>
      <ul>
        <li>
          <strong>least-connections:</strong> Use this if your routes have
          varying latencies (e.g., 10ms vs 500ms). It prevents "clumping" on
          busy workers.
        </li>
        <li>
          <strong>round-robin:</strong> Ideal for extremely uniform,
          high-frequency tasks where tracking connections adds unnecessary
          overhead.
        </li>
      </ul>

      <SectionHeading level={2}>3. Resilience & Guardrails</SectionHeading>
      <p>
        Safety settings protect your cluster from "cascading failures" during
        heavy load or partial worker instability.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Zap className="w-5 h-5" /> Retries
          </div>
          <p className="text-xs text-slate-400 mb-4">
            If a worker crashes during a request, XHSC can transparently retry
            it on a different healthy worker.
          </p>
          <CodeBlock
            language="typescript"
            code={`requestManagement.resilience: {
    retryEnabled: true,
    maxRetries: 2,
}`}
          />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
            <ShieldAlert className="w-5 h-5" /> Circuit Breaker
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Stops sending traffic to failing workers, returning 503 quickly to
            prevent client timeouts.
          </p>
          <CodeBlock
            language="typescript"
            code={`requestManagement.resilience: {
    circuitBreaker: {
        enabled: true,
        failureThreshold: 5,
    },
}`}
          />
        </div>
      </div>

      <SectionHeading level={2}>The Intelligence Engine</SectionHeading>
      <p>
        While XyPriss does not yet support dynamic auto-scaling of worker
        <em>counts</em>, it actively manages the{" "}
        <strong>internal resources</strong>
        of existing workers.
      </p>
      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl my-6">
        <p className="text-sm text-slate-300 m-0 italic">
          "The engine proactively signals Garbage Collection (GC) and
          pre-allocates memory buffers based on historical traffic patterns to
          maintain stable throughput during spikes."
        </p>
      </div>

      <Callout type="danger" title="Large Payloads">
        XHSC uses efficient binary IPC, but massive JSON payloads (&#62;10MB)
        still incur serialization costs. For large file transfers, use{" "}
        <code>res.sendFile()</code>
        to bypass IPC bottlenecks.
      </Callout>

      <DocsFooter
        title="Security Overview"
        description="Learn how XyPriss secures your application at the core level."
        buttonText="Next: Security"
        href="/docs/security/overview"
        iconName="Lock"
      />
    </div>
  );
}
