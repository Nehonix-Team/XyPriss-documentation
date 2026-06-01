import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Cpu, Zap, Activity, Route, FileCode2, Server, ShieldAlert } from "lucide-react";

/* ─────────────────────────────────────────────
   STYLED GRAPH COMPONENTS (no external images)
   ───────────────────────────────────────────── */

const COLORS = {
  express: "#64748b", // slate
  fastify: "#f59e0b", // amber
  xypriss: "#3b82f6", // primary blue
};

function BenchStatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
          style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }}
        >
          <Icon size={20} />
        </div>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
      </div>
      <div className="font-mono text-2xl font-bold text-white">{value}</div>
      <p className="text-[10px] text-muted-foreground leading-relaxed">{sub}</p>
    </div>
  );
}

function BenchBarChart({
  title,
  data,
  unit,
  xLabel,
  width = 600,
  height = 260,
}: {
  title: string;
  data: { label: string; express: number; fastify: number; xypriss: number }[];
  unit: string;
  xLabel?: string;
  width?: number;
  height?: number;
}) {
  const maxValue = Math.max(...data.flatMap((d) => [d.express, d.fastify, d.xypriss]));
  const barGroupWidth = (width - 80) / data.length;
  const barWidth = barGroupWidth * 0.6;
  const chartHeight = height - 60;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-[10px] text-muted-foreground mb-6">
        {xLabel}
      </p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id={`grad-express-${title.replace(/[^a-z]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.express} />
            <stop offset="100%" stopColor={COLORS.express} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`grad-fastify-${title.replace(/[^a-z]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.fastify} />
            <stop offset="100%" stopColor={COLORS.fastify} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`grad-xypriss-${title.replace(/[^a-z]/gi,"")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.xypriss} />
            <stop offset="100%" stopColor={COLORS.xypriss} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = 20 + chartHeight * (1 - tick);
          const val = Math.round(maxValue * tick);
          return (
            <g key={tick}>
              <line x1={50} y1={y} x2={width - 20} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={48} y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const cx = 70 + i * barGroupWidth + barGroupWidth / 2;
          const hE = (d.express / maxValue) * chartHeight;
          const hF = (d.fastify / maxValue) * chartHeight;
          const hX = (d.xypriss / maxValue) * chartHeight;
          const base = 20 + chartHeight;

          return (
            <g key={i}>
              <text x={cx} y={base + 14} fill="#94a3b8" fontSize="9" textAnchor="middle">
                {d.label}
              </text>

              {/* Express */}
              <rect
                x={cx - barWidth}
                y={base - hE}
                width={barWidth * 0.32}
                height={hE}
                rx="3"
                fill={`url(#grad-express-${title.replace(/[^a-z]/gi,"")})`}
                opacity="0.9"
              />
              {/* Fastify */}
              <rect
                x={cx - barWidth + barWidth * 0.34}
                y={base - hF}
                width={barWidth * 0.32}
                height={hF}
                rx="3"
                fill={`url(#grad-fastify-${title.replace(/[^a-z]/gi,"")})`}
                opacity="0.9"
              />
              {/* XyPriss */}
              <rect
                x={cx + barWidth * 0.34}
                y={base - hX}
                width={barWidth * 0.32}
                height={hX}
                rx="3"
                fill={`url(#grad-xypriss-${title.replace(/[^a-z]/gi,"")})`}
                opacity="0.95"
              />

              {/* values on top */}
              <text x={cx - barWidth + barWidth * 0.16} y={base - hX - 4} fill={COLORS.express} fontSize="8" textAnchor="middle">
                {d.express}
              </text>
              <text x={cx - barWidth + barWidth * 0.5} y={base - hF - 4} fill={COLORS.fastify} fontSize="8" textAnchor="middle">
                {d.fastify}
              </text>
              <text x={cx + barWidth * 0.5} y={base - hX - 4} fill={COLORS.xypriss} fontSize="8" fontWeight="bold" textAnchor="middle">
                {d.xypriss}
              </text>
            </g>
          );
        })}

        {/* legend */}
        <g transform={`translate(60, 0)`}>
          <rect x={0} y={6} width={10} height={10} rx="2" fill={COLORS.express} />
          <text x={14} y={15} fill="#94a3b8" fontSize="9">Express</text>
          <rect x={70} y={6} width={10} height={10} rx="2" fill={COLORS.fastify} />
          <text x={84} y={15} fill="#94a3b8" fontSize="9">Fastify</text>
          <rect x={130} y={6} width={10} height={10} rx="2" fill={COLORS.xypriss} />
          <text x={144} y={15} fill="#94a3b8" fontSize="9">XyPriss</text>
        </g>
      </svg>
      <p className="text-[10px] text-muted-foreground mt-2 text-right">{unit}</p>
    </div>
  );
}

function BenchLineChart({
  title,
  data,
  unit,
  width = 600,
  height = 260,
}: {
  title: string;
  data: { x: number; express: number; fastify: number; xypriss: number }[];
  unit: string;
  width?: number;
  height?: number;
}) {
  const maxY = Math.max(...data.flatMap((d) => [d.express, d.fastify, d.xypriss]));
  const minX = data[0].x;
  const maxX = data[data.length - 1].x;
  const padL = 55;
  const padR = 20;
  const padT = 30;
  const padB = 35;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const toX = (val: number) => padL + ((val - minX) / (maxX - minX)) * chartW;
  const toY = (val: number) => padT + chartH - (val / maxY) * chartH;
 
  const datasets = [
    { key: "express" as const, color: COLORS.express, label: "Express" },
    { key: "fastify" as const, color: COLORS.fastify, label: "Fastify" },
    { key: "xypriss" as const, color: COLORS.xypriss, label: "XyPriss" },
  ];

  const path = (vals: number[]) =>
    vals
      .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(data[i].x)} ${toY(v)}`)
      .join(" ");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-[10px] text-muted-foreground mb-4">{unit}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          {datasets.map((ds) => (
            <linearGradient key={ds.key} id={`area-${title.replace(/[^a-z]/gi,"")}-${ds.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ds.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ds.color} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>

        {/* grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = padT + chartH * (1 - tick);
          const val = Math.round(maxY * tick);
          return (
            <g key={tick}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={padL - 8} y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {/* x-axis labels */}
        {data.map((d) => (
          <text key={d.x} x={toX(d.x)} y={padT + chartH + 18} fill="#94a3b8" fontSize="9" textAnchor="middle">
            {d.x}
          </text>
        ))}

        {datasets.map((ds) => {
          const vals = data.map((d) => d[ds.key]);
          const linePath = path(vals);
          const areaPath = `${linePath} L ${toX(data[data.length - 1].x)} ${padT + chartH} L ${toX(data[0].x)} ${padT + chartH} Z`;

          return (
            <g key={ds.key}>
              <path d={areaPath} fill={`url(#area-${title.replace(/[^a-z]/gi,"")}-${ds.key})`} />
              <path d={linePath} fill="none" stroke={ds.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {vals.map((v, i) => (
                <circle key={i} cx={toX(data[i].x)} cy={toY(v)} r="3.5" fill={ds.color} stroke="#000" strokeWidth="1.5" />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

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
