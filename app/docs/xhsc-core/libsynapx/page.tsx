import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { SynapxFlow } from "@/components/ui/SynapxFlow";
import {
  Cpu,
  Zap,
  Shield,
  Activity,
  GitBranch,
  Layers,
  Server,
  Lock,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function LibSynapxPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Cpu size={14} />
          Core Architecture
        </div>
        <SectionHeading level={1}>
          libSynapx: High-Throughput IPC &amp; Dispatcher Engine
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A low-latency, persistent Inter-Process Communication (IPC) and request
          dispatching engine establishing a bidirectional, memory-pooled bridge
          between the native <strong>XHSC</strong> core (Go) and TypeScript,
          Bun, or Node.js worker runtimes.
        </p>
      </div>

      <Callout type="info" title="Generation 5 (G5) Foundation">
        <strong>libSynapx</strong> is a core pillar of the{" "}
        <strong>XHSC G5 (Zero-Trust Synapx)</strong> architecture, eliminating
        subprocess spawning latency, command-line <code>argv</code> leakage, and
        multi-worker port collisions.
      </Callout>

      <SectionHeading level={2} id="motivation">
        Architectural Motivation
      </SectionHeading>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Hybrid backend architectures combining compiled network listeners with
        interpreted worker runtimes face four major bottlenecks under legacy IPC
        models:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            1. Subprocess Spawning Latency
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Spawning discrete child processes via <code>fork()</code> and{" "}
            <code>exec()</code> incurs 15ms–80ms per invocation due to kernel
            scheduling and runtime bootstrap overhead.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            2. Command-Line Argument (argv) Exposure
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Passing metadata or tokens as CLI flags exposes sensitive data in{" "}
            <code>/proc/[pid]/cmdline</code>, <code>ps aux</code>, and system
            process tables.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Server size={16} className="text-primary" />
            3. Multi-Worker Port Collisions
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Traditional clustering relies on separate internal TCP ports or
            unmanaged OS socket sharing, causing uneven balancing and port
            contention.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <h4 className="font-bold text-white text-sm flex items-center gap-2">
            <Layers size={16} className="text-primary" />
            4. Buffer Thrashing &amp; GC Stalls
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unstructured streaming and continuous raw-socket JSON serialization
            fragment memory and trigger frequent Garbage Collector pauses.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="architecture">
        System Architecture
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-2 leading-relaxed">
        <code>libSynapx</code> maintains a persistent, multiplexed binary
        communication channel backed by pre-allocated multi-tier buffer pools:
      </p>

      <SynapxFlow />

      <SectionHeading level={2} id="pillars">
        Core Architectural Pillars
      </SectionHeading>

      <div className="space-y-4 my-2">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
            <GitBranch size={16} className="text-primary" />
            Persistent Duplex IPC Bridge
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Establishes long-lived bidirectional IPC channels at startup.
            Transactions are multiplexed over a single transport stream with
            sub-millisecond turnaround.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
            <Cpu size={16} className="text-primary" />
            Multi-Core Request Dispatching (<code>synapx-dispatcher</code>)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The master XHSC process binds the host network interface as the sole
            external HTTP listener and distributes traffic across worker
            processes via <code>libSynapx</code>. Child workers never open
            redundant TCP sockets.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
            <Layers size={16} className="text-primary" />
            Multi-Tier Buffer Pooling
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Uses tiered memory pools (Small, Medium, and Large buffers) with
            reusable byte slices to eliminate heap fragmentation and GC spikes
            during sustained high-throughput bursts.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
            <Activity size={16} className="text-primary" />
            Dynamic Route Table Synchronization
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Routing tables are automatically published to the dispatcher on
            worker startup. Static assets are served directly from native memory
            while dynamic handlers route immediately to available workers.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
            <RefreshCw size={16} className="text-primary" />
            Integrated Circuit Breaking &amp; Failover
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tracks worker response times and error rates. If a worker fails or
            becomes unresponsive, traffic is rerouted immediately to healthy
            peers while the supervisor initiates automatic process recovery.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="metrics">
        Technical Specifications &amp; Metrics
      </SectionHeading>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">
                Architectural Dimension
              </th>
              <th className="p-3 font-bold text-white">
                Traditional Multi-Process Models
              </th>
              <th className="p-3 font-bold text-white">
                XyPriss with libSynapx
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-3 font-semibold text-white">
                Transaction Turnaround
              </td>
              <td className="p-3 text-slate-400">
                15ms – 80ms (subprocess spawn)
              </td>
              <td className="p-3 text-primary font-bold">
                &lt; 0.5ms (persistent IPC)
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-semibold text-white">Port Management</td>
              <td className="p-3 text-slate-400">
                Multiple internal ports / Proxy layers
              </td>
              <td className="p-3 text-primary font-bold">
                Single master port + zero-conflict IPC
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">
                Process Inspection Security
              </td>
              <td className="p-3 text-slate-400">
                Arguments visible in <code>/proc</code> and <code>ps</code>
              </td>
              <td className="p-3 text-primary font-bold">
                Zero CLI argument leakage
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-semibold text-white">
                Memory Allocation Profile
              </td>
              <td className="p-3 text-slate-400">
                Continuous per-request heap allocation
              </td>
              <td className="p-3 text-primary font-bold">
                Pre-allocated multi-tier buffer pools
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-white">Failure Recovery</td>
              <td className="p-3 text-slate-400">
                Manual process restart / Proxy timeouts
              </td>
              <td className="p-3 text-primary font-bold">
                Autonomous circuit-breaker failover
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="configuration">
        Configuration &amp; Implementation
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The <code>libSynapx</code> native engine is configured directly inside{" "}
        <code>createServer()</code> via the top-level{" "}
        <code>synapx</code> option (<code>SynapxOptions</code>). It manages
        zero-copy bidirectional communication buffers, throughput constraints,
        and high-speed synchronization with the native Go core (XHSC).
      </p>

      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    server: {
        port: 3000,
    },
    synapx: {
        autoTune: true, // Dynamically tunes limits from maxPayloadSize & fileUpload
        maxPayloadSize: "1GB", // Max frame size: "512MB", "1GB", "2GB", or bytes
        timeout: "60s", // Execution timeout: ms, "60s", "120s", or "auto"
        batchSize: 10000, // Batch buffer queue depth for coalescing writes
    },
    cluster: {
        enabled: true,
        workers: "auto", // 1 worker per logical CPU core
        strategy: "round-robin", // "round-robin" | "least-connections" | "ip-hash"
        autoRespawn: true, // Autonomous worker recovery on abnormal exit
    },
});

app.get("/api/v1/metrics", (req, res) => {
    res.json({
        status: "ok",
        engine: "libSynapx",
        timestamp: Date.now(),
    });
});

app.start();`}
      />

      <SectionHeading level={3} id="synapx-options">
        SynapxOptions Reference
      </SectionHeading>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">Option</th>
              <th className="p-3 font-bold text-white">Type</th>
              <th className="p-3 font-bold text-white">Default</th>
              <th className="p-3 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-3 font-mono text-primary font-semibold">
                autoTune
              </td>
              <td className="p-3 font-mono text-slate-300">boolean</td>
              <td className="p-3 font-mono text-slate-400">true</td>
              <td className="p-3 text-muted-foreground leading-relaxed">
                Enables automatic calculation and adaptive tuning for{" "}
                <code>timeout</code>, payload limits, and buffer batch size.
                When enabled or omitted, XyPriss derives optimal engine
                parameters from <code>maxPayloadSize</code> and{" "}
                <code>fileUpload</code> constraints.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-semibold">
                maxPayloadSize
              </td>
              <td className="p-3 font-mono text-slate-300">
                number | string
              </td>
              <td className="p-3 font-mono text-slate-400">&quot;512MB&quot;</td>
              <td className="p-3 text-muted-foreground leading-relaxed">
                Maximum payload frame size allowed by the Synapx engine (e.g.,{" "}
                <code>&quot;512MB&quot;</code>, <code>&quot;1GB&quot;</code>,{" "}
                <code>&quot;2GB&quot;</code>, or bytes). Automatically scales to{" "}
                <code>max(512MB, fileUpload.maxFileSize * 2)</code> when{" "}
                <code>autoTune</code> is active.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-semibold">
                timeout
              </td>
              <td className="p-3 font-mono text-slate-300">
                number | string
              </td>
              <td className="p-3 font-mono text-slate-400">60000</td>
              <td className="p-3 text-muted-foreground leading-relaxed">
                Request execution timeout in milliseconds or human-readable
                duration (e.g., <code>60000</code>, <code>&quot;60s&quot;</code>,{" "}
                <code>&quot;120s&quot;</code>, <code>&quot;auto&quot;</code>)
                for Synapx operations before throwing a timeout error.
                Dynamically derived when <code>autoTune</code> is enabled.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-semibold">
                batchSize
              </td>
              <td className="p-3 font-mono text-slate-300">number</td>
              <td className="p-3 font-mono text-slate-400">10000</td>
              <td className="p-3 text-muted-foreground leading-relaxed">
                Batch buffer queue depth for coalescing write operations across
                the persistent IPC bridge.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="security">
        Security &amp; Process Verification
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
            <Lock size={14} /> Mutual Session Auth
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Validates peer credentials during connection establishment, blocking
            unauthorized external processes from attaching to the dispatch
            socket.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
            <Shield size={14} /> libXESS Interoperability
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Fully compatible with <code>libXESS</code> environment sandboxing so
            worker processes execute inside protected session boundaries.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 text-primary font-bold text-xs mb-2">
            <CheckCircle2 size={14} /> 0700 Transport Bounds
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Local transport endpoints are restricted with strict{" "}
            <code>0700</code> filesystem permissions inside session-scoped
            directories.
          </p>
        </div>
      </div>

      <DocsFooter
        title="Environment Security Shield (libXESS)"
        description="Explore Zero-Trust process confinement, ephemeral secret zeroization, and active honeypot defense."
        buttonText="Next: libXESS Shield"
        href="/docs/security/environment-shield"
        iconName="Shield"
      />
    </div>
  );
}

