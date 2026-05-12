import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Sliders, Layers, Server, Shield, Share2, Box } from "lucide-react";

export default function MultiServerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Sliders size={14} />
          Configuration
        </div>
        <SectionHeading level={1}>XMS (Multi-Server Orchestration)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Run multiple isolated server instances within a single Node.js process, each with its own ports, security policies, and route scopes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          { t: "Process Efficiency", d: "Shared memory and system overhead compared to independent processes.", i: Share2 },
          { t: "Network Isolation", d: "Different security levels for Admin vs Public APIs on distinct ports.", i: Shield },
          { t: "Unified Lifecycle", d: "Start, stop, and monitor all services from a single entry point.", i: Server },
          { t: "Route Scoping", d: "Granular control over which routes are served by which instance.", i: Box },
        ].map((feat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
              <feat.i size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1 text-sm">{feat.t}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{feat.d}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="configuration">Basic Configuration</SectionHeading>
      <CodeBlock 
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
  multiServer: {
    enabled: true,
    servers: [
      { id: "public-api", port: 8080, routePrefix: "/api/v1" },
      { id: "admin-panel", port: 8081, routePrefix: "/admin" }
    ]
  }
});`}
      />

      <SectionHeading level={2} id="inheritance">Global Merge Rules</SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        XyPriss implements a <strong>Global Merge Rule</strong> to reduce redundancy. Root-level options are treated as defaults and deeply merged into each instance.
      </p>
      <CodeBlock 
        language="typescript"
        code={`const app = createServer({
  // Global settings for all instances
  logger: { level: 'debug' },
  security: { csrf: true },

  multiServer: {
    enabled: true,
    servers: [
      { id: "public", port: 80 }, // Inherits global logger & security
      { id: "internal", port: 81, logger: { level: 'info' } } // Overrides logger
    ]
  }
});`}
      />

      <SectionHeading level={2} id="orchestration">Route Orchestration</SectionHeading>
      <div className="space-y-4 my-6">
        <p className="text-sm text-muted-foreground">
          Control how routes are distributed across ports using the <code className="text-primary">routePrefixStrategy</code>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { s: "auto-inject", d: "Maps /login to /prefix/login on that port." },
            { s: "strict-match", d: "Only serves routes explicitly defined with prefix." },
            { s: "both", d: "Serves both prefixed and original paths." },
          ].map((strategy, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-xs font-bold font-mono text-primary mb-2">{strategy.s}</div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{strategy.d}</p>
            </div>
          ))}
        </div>
      </div>

      <Callout type="info" title="Lifecycle Management">
        When XMS is enabled, <code className="text-primary font-bold">app.start()</code> will concurrently boot all configured instances. Ensure your host system has permissions to bind to the requested ports.
      </Callout>

      <DocsFooter 
        title="Meta Config"
        description="Execute arbitrary TypeScript or JavaScript code during the server initialization phase."
        buttonText="View Specs"
        href="/docs/config/meta"
        iconName="Zap"
      />
    </div>
  );
}
