import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { BenchBarChart, BenchLineChart, BenchStatCard } from "@/components/ui/BenchGraphs";
import {
  Network,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  Search,
  Activity,
  Layers,
  Gauge,
  Route as RouteIcon,
  Info,
  AlertTriangle,
} from "lucide-react";

export default function RoutingOverviewPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XyPriss XyPriss Router</SectionHeading>

      <p>
        The <strong>XyPriss routing engine</strong> is built on a
        high-performance <strong>radix-tree </strong>
        lookup algorithm backed by the XHSC core. It is designed for
        sub-millisecond route resolution, native security, and developer
        clarity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Zap className="w-5 h-5 text-yellow-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Radix-Tree</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Sub-millisecond resolution regardless of total route count.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">
            Declarative Guards
          </h5>
          <p className="text-[10px] text-slate-400 m-0">
            Typed, inheritable security chains applied directly to definitions.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Activity className="w-5 h-5 text-green-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">
            Native Throttling
          </h5>
          <p className="text-[10px] text-slate-400 m-0">
            Per-route rate limiting and caching enforced at the native level.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Quick Start</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`import { createServer, Router } from "xypriss";

const app = createServer();
const router = Router();

router.get("/hello", (req, res) => {
    res.success("Hello from XyPriss Router!");
});

app.use(router);
app.start();`}
      />

      <SectionHeading level={2}>Performance Benchmarks</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        This benchmark measures raw routing throughput on a minimal JSON
        payload. It intentionally isolates the routing engine from business
        logic, which makes the IPC bridge overhead visible. That said, it still
        reflects real-world capability under concurrent connections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <BenchStatCard
          label="Routing Throughput (5k)"
          value="~4 569 req/s"
          sub="XyPriss at 5 000 concurrent connections — zero errors."
          icon={RouteIcon}
          accent="#3b82f6"
        />
        <BenchStatCard
          label="Stability"
          sub="XyPriss achieves zero errors at 1 000 and 5 000 connections."
          icon={ShieldCheck}
          accent="#10b981"
        />
        <BenchStatCard
          label="vs Express"
          value="×2.1 – ×4.3"
          sub="Higher throughput than Express at every load level."
          icon={Zap}
          accent="#f59e0b"
        />
      </div>

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
        title="Average Latency — Routing"
        unit="Lower is better (ms)"
        data={[
          { x: 100, express: 108, fastify: 10.8, xypriss: 25.1 },
          { x: 1000, express: 586, fastify: 113, xypriss: 230 },
          { x: 5000, express: 2184, fastify: 712, xypriss: 1117 },
        ]}
      />

      <Callout type="info" title="Context: Fastify leads on raw routing speed">
        Fastify is purpose-built for in-process routing (llhttp parser, compiled
        schemas), which is why it tops this benchmark. XyPriss pays an IPC
        bridge cost on trivial payloads because the request crosses Go → Node.js
        → Go. On real workloads (auth + file transfer), that fixed cost is
        amortised and XyPriss becomes the latency leader. Use the routing metric
        as a lower bound; real applications will see a smaller gap thanks to
        middleware, I/O, and XInS smoothing.
      </Callout>

      <Callout type="warning" title="Error Rate at 1 000 &amp; 5 000 connections">
        Express drops <strong>61 requests</strong> at 1,000 connections — its
        event loop saturates. XyPriss and Fastify both achieve{" "}
        <strong className="text-green-400">zero errors</strong> at 1,000 and
        5,000 connections, thanks to the XHSC goroutine buffer absorbing spikes
        before they reach Node.js.
      </Callout>

      <div className="flex items-center gap-2 mb-2">
        <Gauge size={12} className="text-primary" />
        <a
          href="/docs/performance/benchmarks"
          className="text-xs text-primary hover:text-primary/80 transition-colors"
        >
          Full benchmarks: static delivery, mixed workload, synthesis table and takeaways
        </a>
      </div>

      <SectionHeading level={2}>HTTP Server Modularity</SectionHeading>
      <p>
        The XHSC HTTP server core is modularized into specialized components to
        handle high-concurrency traffic with minimal overhead.
      </p>

      <Steps>
        <Step title="RouteManager">
          <p>
            Handles high-speed registration, parameter extraction, and
            radix-based route matching.
          </p>
        </Step>
        <Step title="BodyParser">
          <p>
            A high-efficiency utility for parsing JSON and URL-encoded request
            bodies.
          </p>
        </Step>
        <Step title="RequestForwarder">
          <p>
            Manages server-side request forwarding (<code>req.forward</code>)
            for seamless internal communication.
          </p>
        </Step>
        <Step title="HttpErrorHandler">
          <p>
            Centralizes 404 management and internal server error handling across
            the framework.
          </p>
        </Step>
      </Steps>

      <SectionHeading level={2}>Core Concepts</SectionHeading>

      <SectionHeading level={3}>Declarative Route Options</SectionHeading>
      <p>
        Unlike traditional middleware stacks, XyPriss Router lets you declare
        security, throttling, and caching{" "}
        <strong>directly on the route definition</strong>.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.get(
    "/api/data",
    {
        guards: ["authenticated"],
        rateLimit: { max: 100, windowMs: 60_000 },
        cache: "1h",
    },
    (req, res) => {
        res.json({ data: "protected and cached" });
    },
);`}
      />

      <SectionHeading level={3}>Guard Inheritance Chain</SectionHeading>
      <p>
        Guards cascade from the broadest to most specific scope, ensuring a
        robust security hierarchy:
      </p>
      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl font-mono text-[11px] text-center">
        Router Guards → Group Guards → Route Guards
      </div>

      <Callout type="info" title="XyGuard API">
        XyGuard allows you to define the logic for these declarative guards
        globally, keeping your route definitions clean and expressive.
      </Callout>

      <DocsFooter
        title="Groups and Versioning"
        description="Learn how to organize your API with prefixes, nested groups, and versioning."
        buttonText="Next: Groups & Versioning"
        href="/docs/routing/groups-versioning"
        iconName="Layers"
      />
    </div>
  );
}
