import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Settings, Cpu, Layers, Activity, Shield, Zap } from "lucide-react";

export default function ClusterConfigurationPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Cluster Configuration</SectionHeading>

      <p>
        <strong>XyPriss clustering</strong> is managed by the high-performance
        Go core (XHSC). All settings reside under the <code>cluster</code> key
        in your server options.
      </p>

      <CodeBlock
        language="typescript"
        title="Basic Cluster Setup"
        code={`import { createServer } from "xypriss";

const app = createServer({
    cluster: {
        enabled: true,
        workers: "auto", // Spawns 1 worker per physical CPU core
        strategy: "least-connections",
        resources: {
            maxMemory: "1GB",
            maxCpu: 80,
        },
    },
});`}
      />

      <SectionHeading level={2}>Core Options</SectionHeading>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">
                Property
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Type
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Default
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10">
                <code>enabled</code>
              </td>
              <td className="p-3 border border-white/10 text-blue-400">
                boolean
              </td>
              <td className="p-3 border border-white/10">
                <code>false</code>
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Enables XHSC-managed process clustering.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10">
                <code>workers</code>
              </td>
              <td className="p-3 border border-white/10 text-blue-400">
                number | "auto"
              </td>
              <td className="p-3 border border-white/10">
                <code>"auto"</code>
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Number of worker nodes to provision.
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10">
                <code>strategy</code>
              </td>
              <td className="p-3 border border-white/10 text-blue-400">
                string
              </td>
              <td className="p-3 border border-white/10">
                <code>"least-connections"</code>
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Distribution algorithm to use.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Distribution Strategies</SectionHeading>
      <p>
        The XHSC engine supports multiple distribution algorithms to suit
        different workload profiles:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          {
            name: "round-robin",
            desc: "Simple sequential distribution of requests.",
            icon: <Activity className="w-4 h-4" />,
          },
          {
            name: "least-connections",
            desc: "Sends traffic to the worker with the fewest active requests.",
            icon: <Zap className="w-4 h-4 text-yellow-400" />,
          },
          {
            name: "ip-hash",
            desc: "Ensures a client (by IP) always hits the same worker (Sticky Sessions).",
            icon: <Shield className="w-4 h-4 text-blue-400" />,
          },
          {
            name: "latency",
            desc: "Favors workers with the lowest historical response times.",
            icon: <Activity className="w-4 h-4 text-green-400" />,
          },
        ].map((strat) => (
          <div
            key={strat.name}
            className="p-4 bg-white/[0.02] border border-white/5 rounded-xl"
          >
            <div className="flex items-center gap-2 font-bold text-white mb-1">
              {strat.icon} {strat.name}
            </div>
            <p className="text-[10px] text-slate-400 m-0">{strat.desc}</p>
          </div>
        ))}
      </div>

      <SectionHeading level={2}>Worker Guardrails</SectionHeading>
      <p>
        Manage worker health and prevent resource exhaustion with native
        enforcement:
      </p>
      <ul>
        <li>
          <strong>maxMemory:</strong> Gracefully recycles workers if memory
          usage exceeds limits (e.g., <code>"512MB"</code>, <code>"2GB"</code>).
        </li>
        <li>
          <strong>maxRequests:</strong> Limits the number of requests a worker
          handles before recycling, mitigating potential memory leaks.
        </li>
      </ul>

      <SectionHeading level={2}>Network Quality Rejection</SectionHeading>
      <p>
        Protect your cluster from "poison pill" requests or slow clients that
        might degrade performance for others.
      </p>
      <CodeBlock
        language="typescript"
        code={`requestManagement: {
    networkQuality: {
        enabled: true,
        rejectOnPoorConnection: true,
        maxLatency: 500, // Reject if avg latency > 500ms
        minBandwidth: 1024, // Min 1KB/s requirement
    },
}`}
      />

      <Callout type="warning" title="Worker Runtimes">
        If you start the master process with <strong>Bun</strong>, XyPriss
        automatically spawns Bun workers. The engine remains agnostic to the
        underlying runtime while maintaining performance parity.
      </Callout>

      <DocsFooter
        title="Performance Tuning"
        description="Find the worker sweet spot and optimize your cluster for I/O or CPU-heavy workloads."
        buttonText="Next: Performance Tuning"
        href="/docs/cluster/performance"
        iconName="Zap"
      />
    </div>
  );
}
