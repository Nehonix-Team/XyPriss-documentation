import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { TechGraph } from "@/components/ui/TechGraph";
import { Server, ShieldCheck, Zap, Lock, Cpu, Activity, Globe, Layers } from "lucide-react";

export default function ClusterOverviewPage() {
  const clusterNodes = [
    { 
      iconName: "Globe", 
      title: "Internet", 
      subtitle: "Client Traffic",
      color: "primary" as const
    },
    { 
      iconName: "ShieldCheck", 
      title: "XHSC Master", 
      subtitle: "Load Balancer & Filter",
      color: "blue" as const
    },
    { 
      iconName: "Cpu", 
      title: "Worker 1", 
      subtitle: "Node.js / Bun",
      color: "purple" as const
    },
    { 
      iconName: "Cpu", 
      title: "Worker N", 
      subtitle: "Node.js / Bun",
      color: "purple" as const
    },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XHSC Clustering System</SectionHeading>

      <p>
        The <strong>XyPriss Hyper-System Core (XHSC)</strong> introduces a modern,
        high-performance approach to process management. Unlike traditional Node.js
        clustering, XyPriss utilizes a dedicated <strong>XHSC Master Core</strong>
        to handle networking, load balancing, and worker lifecycle management.
      </p>

      <SectionHeading level={2}>Core Components</SectionHeading>
      <p>
        The architecture is split between a native high-speed master engine and
        standardized worker processes.
      </p>

      <TechGraph
        title="Clustering Architecture"
        badge="Native Load Balancing"
        nodes={clusterNodes}
        footer={[
          {
            label: "Isolation",
            description: "Workers run in separate memory spaces.",
            color: "primary",
          },
          {
            label: "Performance",
            description: "Binary IPC over Unix Domain Sockets.",
            color: "blue",
          },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Zap className="w-5 h-5" /> XHSC Master
          </div>
          <p className="text-xs text-slate-400">
            A native Go-based process that manages network listeners, filters
            incoming requests, and distributes traffic with sub-millisecond overhead.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Layers className="w-5 h-5" /> Worker Nodes
          </div>
          <p className="text-xs text-slate-400">
            Node.js or Bun processes that receive pre-filtered requests via
            high-speed IPC, focusing purely on application logic execution.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Performance Advantages</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Concurrency</p>
            <p className="text-xs text-slate-400">
              XHSC efficiently manages thousands of persistent connections,
              offloading the network stack from the JS event loop.
            </p>
          </div>
        </div>
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Stability</p>
            <p className="text-xs text-slate-400">
              Worker crashes are isolated. XHSC automatically detects failures
              and recycles processes without dropping active master connections.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2}>Security Policy</SectionHeading>
      <p>
        Security is baked into the clustering logic, ensuring data isolation and
        resource protection.
      </p>
      <ul>
        <li>
          <strong>Process Isolation:</strong> Each worker operates in its own
          memory heap, preventing cross-request memory leaks.
        </li>
        <li>
          <strong>Native Guardrails:</strong> CPU and memory limits are enforced at the
          native level. Workers are gracefully recycled if thresholds are exceeded.
        </li>
        {/* <li>
          <strong>Binary IPC:</strong> Communication between Master and Workers
          uses a private, high-speed binary protocol.
        </li> */}
      </ul>

      <Callout type="info" title="Legacy Note">
        Documentation referring to <code>cluster.config</code> is legacy. XHSC
        uses the flat configuration structure described in the following guides.
      </Callout>

      <DocsFooter
        title="Cluster Configuration"
        description="Learn how to configure workers, distribution strategies, and resource limits."
        buttonText="Next: Configuration"
        href="/docs/cluster/configuration"
        iconName="Settings"
      />
    </div>
  );
}
