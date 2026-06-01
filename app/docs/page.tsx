import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Rocket,
  Shield,
  Zap,
  Server,
  Cpu,
  Lock,
  Globe,
  Package,
  Layers,
  ChevronRight,
  AlertCircle,
  Terminal,
  Settings,
  Activity,
  Gauge,
  FileCode2,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { BenchBarChart, BenchStatCard } from "@/components/ui/BenchGraphs";

const COLORS = {
  xypriss: "#3b82f6",
};

export default function IntroductionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Rocket size={14} />
          Enterprise-Grade Framework
        </div>
        <SectionHeading level={1}>Introduction to XyPriss</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss is an <strong>Enterprise-Grade Hybrid Web Framework</strong>{" "}
          that combines the raw performance of compiled native binaries with the
          productivity and flexibility of <strong>TypeScript</strong>.
        </p>
      </div>

      <Callout type="info" title="Stability Note">
        XyPriss has officially left its beta phase. This documentation is
        up-to-date for the stable <strong>v{/* stableVersion */}1.0</strong>{" "}
        release.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Zap
            className="text-primary mb-4 group-hover:scale-110 transition-transform"
            size={32}
          />
          <h3 className="text-lg font-bold mb-2 text-white">
            Hybrid Performance
          </h3>
          <p className="text-sm text-muted-foreground">
            Bridge compiled speed with developer velocity. Features XHSC
            Go-engine and XEMS encrypted storage.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Shield
            className="text-primary mb-4 group-hover:scale-110 transition-transform"
            size={32}
          />
          <h3 className="text-lg font-bold mb-2 text-white">
            Secure by Default
          </h3>
          <p className="text-sm text-muted-foreground">
            Native Environment Security Shield blocks direct `process.env`
            access to prevent sensitive data leakage.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="performance-snapshot">
        Performance Snapshot
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        Real-world benchmarks show XyPriss leading on static delivery and
        maintaining stability under extreme load. Below is a quick look at the
        static file delivery pillar; the full suite includes routing and mixed
        workloads.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <BenchStatCard
          label="Static Delivery Peak"
          value="~13 100"
          sub="req/s with Cluster ×10 — throughput leader against Express & Fastify."
          icon={Gauge}
          accent={COLORS.xypriss}
        />
        <BenchStatCard
          label="0% Event Loop Blocked"
          sub="Node.js is fully bypassed during file delivery."
          icon={Activity}
          accent="#10b981"
        />
        <BenchStatCard
          label="Single-Worker Lead"
          value="×5 - ×8"
          sub="Throughput advantage over Express/Fastify without cluster scaling."
          icon={Zap}
          accent="#f59e0b"
        />
      </div>

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

      <div className="flex items-center gap-2 mt-2 mb-6">
        <LinkIcon size={12} className="text-primary" />
        <Link
          href="/docs/performance/benchmarks"
          className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          Full Benchmarks: routing, mixed workload, latency, p99 tail latency and error rates
        </Link>
      </div>

      <SectionHeading level={2} id="architecture">
        System Architecture
      </SectionHeading>
      <p>
        At the center of XyPriss lies{" "}
        <strong>XHSC (XyPriss Hyper-System Core)</strong> — the native engine
        responsible for low-level HTTP networking, high-speed radix routing, and
        real-time telemetry.
      </p>

      <div className="space-y-4 my-8">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-bold text-white flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">
              1
            </span>
            XHSC (Native Engine)
          </h4>
          <p className="text-sm text-muted-foreground">
            Handles HTTP/S stack, advanced radix routing, filesystem I/O, and
            hardware monitoring.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-bold text-white flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">
              2
            </span>
            Node.js Application Layer
          </h4>
          <p className="text-sm text-muted-foreground">
            The enterprise application layer for defining business logic,
            middleware, and processing pipelines.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-bold text-white flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">
              3
            </span>
            XFPM Package Manager
          </h4>
          <p className="text-sm text-muted-foreground">
            High-performance manager for ultra-fast dependency resolution and
            native core linking.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="requirements">
        Mandatory Requirements
      </SectionHeading>
      <p>
        Using alternative package managers (npm, yarn, pnpm) or runtimes (node)
        to execute XyPriss projects may cause unexpected behavior and is not
        supported.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 pr-6 font-bold text-white">Requirement</th>
              <th className="py-4 pr-6 font-bold text-white">Purpose</th>
              <th className="py-4 font-bold text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-4 pr-6 text-primary font-bold">XFPM</td>
              <td className="py-4 pr-6 text-muted-foreground">
                Exclusively supported manager for installation and project
                execution.
              </td>
              <td className="py-4 font-mono text-[10px] text-green-500">
                MANDATORY
              </td>
            </tr>
            <tr>
              <td className="py-4 pr-6 text-primary font-bold">Bun</td>
              <td className="py-4 pr-6 text-muted-foreground">
                The JavaScript runtime required to execute the application
                layer.
              </td>
              <td className="py-4 font-mono text-[10px] text-green-500">
                MANDATORY
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="quick-install">
        Quick System Setup
      </SectionHeading>
      <div className="space-y-6">
        <CodeBlock
          language="bash"
          title="Install XFPM & Requirements"
          code="curl -sL https://xypriss.nehonix.com/install.js | node"
        />

        <Callout type="danger" title="XFPM Exclusivity">
          All XyPriss projects MUST use <code>xfpm</code> for dependency
          management. npm/yarn/pnpm are not supported.
        </Callout>
      </div>

      <DocsFooter
        title="Next Steps"
        description="Proceed to the full installation guide to configure your development environment and deploy your first native binary."
        buttonText="Installation Guide"
        href="/docs/installation"
        iconName="Rocket"
      />
    </div>
  );
}
