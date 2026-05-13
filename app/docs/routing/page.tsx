import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import {
  Network,
  ShieldCheck,
  Zap,
  Lock,
  Cpu,
  Search,
  Activity,
  Layers,
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
