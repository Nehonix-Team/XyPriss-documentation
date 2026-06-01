import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Sliders,
  Layers,
  Server,
  Shield,
  Share2,
  Box,
  Zap,
  Lock,
  GitBranch,
} from "lucide-react";

export default function MultiServerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Sliders size={14} />
          Configuration
        </div>
        <SectionHeading level={1}>
          XMS: XyPriss Multi-Server Orchestration
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Run multiple isolated server instances within a single Node.js process,
          each with independent ports, security policies, caching strategies, and
          route scopes while sharing the same underlying system resources.
        </p>
      </div>

      <SectionHeading level={2} id="why-xms">Why XMS?</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Share2 size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">Process Efficiency</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Shared memory and system overhead compared to running multiple
              independent Node.js processes.
            </p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Shield size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">
              Network Isolation
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Different security levels for Admin vs Public APIs on distinct
              ports within the same process.
            </p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Server size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">
              Unified Lifecycle
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Start, stop, and monitor all services from a single entry point.
              One <code className="text-primary">app.start()</code> boots all
              configured instances.
            </p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Box size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1 text-sm">Route Scoping</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Granular control over which routes are served by which instance
              via <code className="text-primary">allowedRoutes</code> and
              prefix strategies.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="configuration">
        Server Configuration
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XMS is configured programmatically via the <code>ServerOptions</code>{" "}
        passed to <code>createServer</code>. Each entry in the{" "}
        <code>servers</code> array supports the following properties:
      </p>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-xs text-left">
          <thead className="bg-white/10 uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { p: "id", t: "string", d: "Required. Unique identifier for the server instance (used in logs)." },
              { p: "port", t: "number", d: "Required. The port the instance will listen on." },
              { p: "host", t: "string", d: "Host address (default: 127.0.0.1)." },
              { p: "routePrefix", t: "string", d: "A prefix to filter or inject into routes handled by this instance." },
              { p: "routePrefixStrategy", t: "string", d: "Prefix handling: auto-inject (default), strict-match, or both." },
              { p: "allowedRoutes", t: "string[]", d: "Patterns of routes this instance is allowed to serve (e.g., [\"/api/*\", \"/login\"])." },
              { p: "responseControl", t: "object", d: "Custom behaviour for unhandled routes on this instance." },
              { p: "...ServerOptions", t: "any", d: "Any other ServerOptions (security, cache, fileUpload, etc.) to override per instance." },
            ].map((opt, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-primary">{opt.p}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono">{opt.t}</td>
                <td className="px-4 py-3 text-muted-foreground">{opt.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
  multiServer: {
    enabled: true,
    servers: [
      {
        id: "public-api",
        port: 8080,
        routePrefix: "/api/v1",
        routePrefixStrategy: "auto-inject",
        allowedRoutes: ["/api/*"],
        host: "0.0.0.0"
      },
      {
        id: "admin-panel",
        port: 8081,
        routePrefix: "/admin",
        security: { csrf: true, helmet: true }
      }
    ]
  }
});`}
      />

      <SectionHeading level={2} id="inheritance">
        Global Configuration Merging
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        XyPriss implements a <strong>Global Merge Rule</strong> to reduce
        configuration redundancy. Options defined at the root of the{" "}
        <code>ServerOptions</code> object are treated as global defaults for all
        server instances.
      </p>
      <p className="text-sm text-muted-foreground mb-3">
        The merge strategy is <strong>deep</strong>: nested objects like{" "}
        <code>security.helmet</code> or <code>logger.format</code> are
        intelligently combined. Server-level options always take precedence over
        root-level globals.
      </p>
      <CodeBlock
        language="typescript"
        code={`const app = createServer({
  // --- GLOBAL SETTINGS ---
  // All servers will use 'debug' level and have CSRF enabled
  logger: { level: "debug" },
  security: { csrf: true },

  multiServer: {
    enabled: true,
    servers: [
      {
        id: "public",
        port: 8080
        // Inherits: logger { level: "debug" }, security { csrf: true }
      },
      {
        id: "internal",
        port: 8081,
        logger: { level: "info" } // Overrides global logger level
        // Inherits: security { csrf: true }
      }
    ]
  }
});`}
      />

      <Callout type="info" title="Deep Merge Precedence">
        Root-level global options are merged <em>first</em>, then per-server
        overrides are applied. For objects, only the explicitly provided keys
        override — sibling keys remain inherited from the global config.
      </Callout>

      <SectionHeading level={2} id="orchestration">Route Orchestration</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Control how routes are distributed across instances using the{" "}
        <code className="text-primary">routePrefixStrategy</code> and{" "}
        <code className="text-primary">allowedRoutes</code> properties.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
        {[
          { s: "auto-inject", d: "If a route is /login and the server has a prefix /auth, it will be served at /auth/login on that instance." },
          { s: "strict-match", d: "Only routes explicitly registered with the prefix (e.g., app.get(\"/auth/login\")) are served." },
          { s: "both", d: "The route is served at both its original path and the prefixed path." },
        ].map((strategy, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="text-xs font-bold font-mono text-primary mb-2">
              {strategy.s}
            </div>
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              {strategy.d}
            </p>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="response-control">
        Instance-Level Response Control
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        You can define what happens when a request hits a server port but
        doesn&apos;t match any allowed routes. This feature uses the global{" "}
        <code>responseControl</code> system, but can be applied per server
        instance for strong isolation.
      </p>
      <CodeBlock
        language="typescript"
        code={`{
  "responseControl": {
    "enabled": true,
    "statusCode": 403,
    "content": { "error": "Access Denied to this Server Instance" },
    "contentType": "application/json",
    "headers": { "X-XMS-Status": "Filtered" }
  }
}`}
      />
      <p className="text-xs text-muted-foreground mt-2">
        See the{" "}
        <a href="/docs/server/notfound-vs-responsecontrol" className="text-primary underline">
          NotFound vs Response Control
        </a>{" "}
        guide for a detailed comparison of visual 404 handlers vs functional
        response interception.
      </p>

      <SectionHeading level={2} id="security">Security &amp; Isolation</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Shield className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">
            Independent Security
          </h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            One port can have strict CSRF and Helmet, while another is open for
            public Webhooks.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Lock className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Isolated XEMS</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            If enabled, each instance can have its own Encrypted Memory Store
            for session isolation.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <GitBranch className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Custom Logging</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Logs are prefixed with the server id for easy debugging in
            multi-instance environments.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="programmatic">Programmatic Usage</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
  multiServer: {
    enabled: true,
    servers: [
      { id: "web", port: 3000 },
      { id: "api", port: 4000, routePrefix: "/api" }
    ]
  }
});

// Routes are distributed based on the XMS config
app.get("/", (req, res) => res.send("Web Home"));
app.get("/api/data", (req, res) => res.json({ data: [] }));

app.start();`}
      />

      <Callout type="warning" title="Lifecycle Warning">
        When <code>multiServer</code> is enabled,<code> app.start()</code> will
        boot all configured instances concurrently. Ensure your system has
        permissions to bind to the requested ports before starting.
      </Callout>

      <DocsFooter
        title="404 vs Response Control"
        description="Understand the difference between visual 404 templates and functional response interception."
        buttonText="View Guide"
        href="/docs/server/notfound-vs-responsecontrol"
        iconName="Layers"
      />
    </div>
  );
}