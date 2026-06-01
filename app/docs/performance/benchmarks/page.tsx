import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { BenchBarChart, BenchLineChart, BenchStatCard, COLORS } from "@/components/ui/BenchGraphs";
import { Cpu, Zap, Activity, Route, FileCode2, Server, ShieldAlert } from "lucide-react";

export default function BenchmarksPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Activity size={14} />
          Performance
        </div>
        <SectionHeading level={1}>Benchmarks</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Real-world performance data from three pillars: static file delivery,
          routing, and mixed workloads.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All benchmarks use <strong>autocannon</strong> on{" "}
          <strong>Kali GNU/Linux Rolling</strong> (localhost). XyPriss runs via
          Bun/XFPM with the XHSC native orchestrator. Baselines (Express,
          Fastify) run in Node.js single-process mode for fair comparison.
        </p>
      </div>

      {/* ─── CONTEXT CARDS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BenchStatCard
          label="Static Delivery"
          value="~13 100"
          sub="req/s with Cluster ×10 — throughput leader against Express & Fastify."
          icon={FileCode2}
          accent={COLORS.xypriss}
        />
        <BenchStatCard
          label="Routing Avg"
          value="~4 569"
          sub="req/s at 5 000 connections — zero errors, stable under extreme load."
          icon={Route}
          accent={COLORS.xypriss}
        />
        <BenchStatCard
          label="Mixed Workload"
          value="837 ms"
          sub="Average latency at 50 connections (auth + 500 KB file) — lowest among all frameworks."
          icon={Server}
          accent={COLORS.xypriss}
        />
      </div>

      {/* ─── PILLAR 1: STATIC FILE DELIVERY (XStatic) ─── */}
      <SectionHeading level={2} id="static">
        Pillar 1: Static File Delivery (XStatic)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        Comparing <strong>Express + serve-static</strong>,{" "}
        <strong>Fastify + @fastify/static</strong>, and <strong>XyPriss XStatic</strong>{" "}
        go fast path under two cluster configurations.
      </p>

      <BenchBarChart
        title="Throughput (req/s) — Static Files"
        unit="Higher is better"
        xLabel="Concurrent connections"
        data={[
          { label: "100", express: 1649, fastify: 1905, xypriss: 12724 },
          { label: "500", express: 1703, fastify: 2475, xypriss: 12778 },
          { label: "1 000", express: 1531, fastify: 1951, xypriss: 13115 },
        ]}
      />

      <BenchLineChart
        title="Latence médiane p50 — Static Files"
        unit="Lower is better (ms)"
        data={[
          { x: 100, express: 120, fastify: 54, xypriss: 13 },
          { x: 500, express: 634, fastify: 358, xypriss: 68 },
          { x: 1000, express: 750, fastify: 945, xypriss: 146 },
        ]}
      />

      <Callout type="success" title="Key Insight: XStatic dominates without cluster">
        In single-worker mode, XStatic delivers ~6,500–6,900 req/s — a ×5 to ×8
        advantage over Express and Fastify. This gain comes entirely from the Go
        fast path (sendfile at kernel level), not horizontal scaling.
      </Callout>

      {/* ─── PILLAR 2: ROUTING ─── */}
      <SectionHeading level={2} id="routing">
        Pillar 2: Routing (Hello World)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        Pure routing with a minimal JSON payload. This is the{" "}
        <strong>worst-case scenario</strong> for XyPriss — every request crosses
        the IPC bridge twice (Go → Node.js → Go), making IPC overhead the
        dominant factor.
      </p>

      <BenchBarChart
        title="Throughput (req/s) — Routing"
        unit="Higher is better (single worker)"
        xLabel="Concurrent connections"
        data={[
          { label: "100", express: 911, fastify: 8835, xypriss: 3913 },
          { label: "1 000", express: 1579, fastify: 8997, xypriss: 4359 },
          { label: "5 000", express: 2165, fastify: 9562, xypriss: 4569 },
        ]}
      />

      <BenchLineChart
        title="Latence moyenne — Routing"
        unit="Lower is better (ms)"
        data={[
          { x: 100, express: 108, fastify: 10.8, xypriss: 25.1 },
          { x: 1000, express: 586, fastify: 113, xypriss: 230 },
          { x: 5000, express: 2184, fastify: 712, xypriss: 1117 },
        ]}
      />

      <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/[0.04] my-4">
        <h4 className="font-bold text-red-400 text-xs mb-1">⚠ Error Rate at 1 000 &amp; 5 000 connections</h4>
        <p className="text-xs text-muted-foreground">
          Express drops <strong>61 requests</strong> at 1,000 connections — its
          event loop saturates. XyPriss and Fastify both achieve{" "}
          <strong className="text-green-400">zero errors</strong> at 1,000 and
          5,000 connections, thanks to the XHSC goroutine buffer absorbing spikes
          before they reach Node.js.
        </p>
      </div>

      {/* ─── PILLAR 3: MIXED WORKLOAD ─── */}
      <SectionHeading level={2} id="mixed">
        Pillar 3: Mixed Workload (Auth + 500 KB File)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        Realistic production scenario: authentication middleware (2 ms overhead)
        followed by a <strong>500 KB binary file transfer</strong>. This
        benchmark validates the architectural advantage of <code>res.sendFile()</code>{" "}
        via XHSC Zero-Copy IPC.
      </p>

      <BenchBarChart
        title="Average Latency — Auth + 500 KB File"
        unit="Lower is better (ms)"
        xLabel="Concurrent connections"
        data={[
          { label: "10", express: 233.6, fastify: 189.8, xypriss: 165.2 },
          { label: "50", express: 976.6, fastify: 1370.0, xypriss: 837.5 },
          { label: "100", express: 2068.6, fastify: 2191.2, xypriss: 1615.0 },
        ]}
      />

      <BenchLineChart
        title="Tail Latency p99 — Auth + 500 KB File"
        unit="Lower is better (ms)"
        data={[
          { x: 10, express: 797, fastify: 462, xypriss: 351 },
          { x: 50, express: 1835, fastify: 3113, xypriss: 2167 },
          { x: 100, express: 5379, fastify: 8411, xypriss: 4182 },
        ]}
      />

      <Callout type="info" title="IPC Overhead Is Fully Amortised">
        In the routing benchmark, XyPriss runs at ~0.48× Fastify due to IPC
        bridge overhead. In this mixed-workload scenario, the 2 ms auth delay
        and 500 KB transfer completely amortise the ~15 ms fixed IPC cost. The
        Zero-Copy path (sendfile at kernel level) then dominates, giving XyPriss
        the lowest average latency at every load level.
      </Callout>

      {/* ─── SYNTHESIS TABLE ─── */}
      <SectionHeading level={2} id="synthesis">
        Cross-Pillar Synthesis
      </SectionHeading>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Metric</th>
              <th className="px-4 py-3">Express</th>
              <th className="px-4 py-3">Fastify</th>
              <th className="px-4 py-3 text-primary">XyPriss</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Static Throughput (peak)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">~1,700 req/s</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">~2,500 req/s</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">~13,100 req/s</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Routing Throughput (5k conn)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">~2,165 req/s</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">~9,562 req/s</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">~4,569 req/s</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Routing Latency (5k conn)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">2 184 ms</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">712 ms</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">1 117 ms</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Routing Errors (1k–5k)</td>
              <td className="px-4 py-3 text-xs text-red-400">61+ dropped</td>
              <td className="px-4 py-3 text-xs text-green-400">0</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">0</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Mixed Avg Latency (50 conn)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">976.6 ms</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">1 370 ms</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">837.5 ms</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Mixed Tail p99 (100 conn)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">5 379 ms</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">8 411 ms</td>
              <td className="px-4 py-3 text-xs font-bold text-primary">4 182 ms</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ─── TAKEAWAYS ─── */}
      <SectionHeading level={2} id="takeaways">Takeaways</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <Zap size={16} className="text-primary" /> Zero-Copy Dominates I/O
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For static and file-heavy workloads, XHSC&apos;s{" "}
            <code>sendfile(2)</code> delegation eliminates Node.js from the data
            path entirely. Throughput gains of ×5–8 are structural, not
            accidental.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <Activity size={16} className="text-primary" /> IPC Cost Is Amortised
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            On real workloads (auth + file transfer), the ~15 ms fixed IPC
            bridge cost disappears. XyPriss retains its latency advantage
            because the Go kernel path is faster than Node.js buffer copies.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <ShieldAlert size={16} className="text-primary" /> Stability Under
            Pressure
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Even on pure routing (the worst case), XyPriss achieves zero errors
            at 5,000 connections where Express drops requests. The XHSC goroutine
            queue acts as a natural shock absorber.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <Cpu size={16} className="text-primary" /> Production Recommendations
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enable <code>maxConcurrentTasks: "auto"</code> (XInS) for routing
            workloads. Enable <code>cluster-workers</code> for throughput
            multiplication. Use XStatic for all static and file delivery to unlock
            Zero-Copy.
          </p>
        </div>
      </div>

      <DocsFooter
        title="XHSC Architecture"
        description="Understand the native Go engine behind the benchmarks: XHSC, XInS, and IPC bridge internals."
        buttonText="Explore XHSC"
        href="/docs/xhsc-core"
        iconName="Cpu"
      />
    </div>
  );
}
