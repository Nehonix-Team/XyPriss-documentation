import { Callout } from "@/components/ui/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Zap,
  Activity,
  GitBranch,
  Gauge,
  AlertTriangle,
} from "lucide-react";

export default function XInSPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Activity size={14} />
          XHSC Engine
        </div>
        <SectionHeading level={1}>
          XInS: XyPriss Intelligent Scaling
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Native dynamic scalability and overload protection powered by
          TCP-inspired AIMD congestion control.
        </p>
        <p>
          XInS solves one of Node.js&apos;s fundamental limitations —{" "}
          <strong>Event Loop saturation under extreme load</strong> — by treating
          the flow between the native Go engine (XHSC) and the Node.js worker as
          a congestion-controlled channel. The result is absolute stability even
          during traffic spikes exceeding 5,000 concurrent connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Gauge className="text-primary mb-3" size={24} />
          <h4 className="font-bold text-white mb-2 text-sm">AIMD Algorithm</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Additive Increase / Multiplicative Decrease dynamically regulates
            concurrency based on real-time latency measurements.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Zap className="text-primary mb-3" size={24} />
          <h4 className="font-bold text-white mb-2 text-sm">Kernel-Side Queuing</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Excess requests are held in lightweight Go goroutines instead of
            being rejected, ensuring zero dropped connections under load.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Activity className="text-primary mb-3" size={24} />
          <h4 className="font-bold text-white mb-2 text-sm">Transparent Scaling</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Adjustments happen without application code changes. Monitor health
            via internal metrics when intelligence mode is enabled.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="problem">
        The Event Loop Problem
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        In a classic Node.js server, a large number of simultaneous requests
        overwhelms the event loop:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground mb-6">
        <li>
          <strong>GC Pressure</strong>: Massive memory allocation triggers
          frequent garbage collection cycles.
        </li>
        <li>
          <strong>Event Loop Starvation</strong>: Business logic cannot execute
          because the loop is saturated with I/O callbacks.
        </li>
        <li>
          <strong>Latency Spikes</strong>: Timeouts and silent 503 errors
          cascade to clients before the server can recover.
        </li>
      </ul>

      <SectionHeading level={2} id="how-it-works">
        How XInS Works
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        The native Go engine (XHSC) acts as a shield in front of the Node.js
        worker. When{" "}
        <code className="text-primary font-mono text-xs">
          maxConcurrentTasks
        </code>{" "}
        is set to <code className="text-primary font-mono text-xs">"auto"</code>
        , XInS activates the AIMD algorithm:
      </p>

      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-1">
            1. Real-Time Monitoring
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            XHSC measures the pure processing time of each request handled by
            the TypeScript worker.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <Zap size={14} className="text-primary" /> 2. Additive Increase
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            If processing latency is excellent (e.g. &lt; 50ms), XInS allows
            more simultaneous requests (+50 concurrent requests per evaluation
            cycle).
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <AlertTriangle size={14} className="text-orange-400" /> 3.
            Multiplicative Decrease
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            If latency exceeds the safety threshold (e.g. &gt; 500ms), XInS
            instantly reduces allowed concurrency by 25% (multiplied by 0.75).
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <GitBranch size={14} className="text-primary" /> 4. Kernel-Side
            Queuing
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Rather than rejecting excess requests, XHSC holds them in Go
            goroutines until the worker has digested the previous wave.
          </p>
        </div>
      </div>

      <Callout type="info" title="Result: Optimized Throughput & Stability">
        XInS delivers optimized throughput (up to ~6,800 requests/second on a
        single CPU) and absolute stability (0 timeouts) regardless of traffic
        intensity. The XHSC goroutine queue absorbs spikes without ever
        overwhelming the Node.js event loop.
      </Callout>

      <SectionHeading level={2} id="configuration">
        Configuration
      </SectionHeading>

      <SectionHeading level={3}>
        Auto Mode (Recommended Production Default)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyPriss is pre-configured to use XInS transparently when the WorkerPool
        is enabled. You can enable it manually in your server options:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    server: {
        workerPool: {
            enabled: true,
            config: {
                maxConcurrentTasks: "auto",
                io: { min: "auto", max: "auto" },
                cpu: { min: "auto", max: "auto" }
            }
        }
    }
});

app.start();`}
      />

      <SectionHeading level={3}>Static Mode (Manual Tuning)</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        If you have full control over infrastructure resources, you can replace{" "}
        <code className="text-primary font-mono text-xs">"auto"</code> with a
        strict numeric value to disable the AIMD algorithm:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    server: {
        workerPool: {
            enabled: true,
            config: {
                maxConcurrentTasks: 1500
            }
        }
    }
});

app.start();`}
      />

      <Callout type="warning" title="Production Warning">
        Setting a static value or a value too high exposes your server to
        timeouts and Event Loop crashes if traffic exceeds your estimates. The{" "}
        <code className="text-primary font-mono text-xs">"auto"</code> mode is
        strongly recommended for production deployments.
      </Callout>

      <SectionHeading level={2} id="monitoring">
        Monitoring &amp; Telemetry
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Dynamic adjustments made by XInS are transparent to the TypeScript
        application. However, when{" "}
        <code className="text-primary font-mono text-xs">intelligence</code>{" "}
        mode is enabled, you can monitor cluster health through internal metrics
        (e.g.{" "}
        <code className="text-primary font-mono text-xs">/metrics</code> or via
        the monitoring plugin).
      </p>

      <DocsFooter
        title="XHSC Architecture"
        description="Deep dive into the native Go core that powers XInS and the entire XyPriss engine."
        buttonText="Explore XHSC"
        href="/docs/xhsc-core"
        iconName="Cpu"
      />
    </div>
  );
}
