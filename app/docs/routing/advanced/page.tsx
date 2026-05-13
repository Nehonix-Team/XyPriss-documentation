import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Zap, Activity, Clock, ShieldAlert, Cpu, Terminal } from "lucide-react";

export default function AdvancedRoutingPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Advanced Route Features</SectionHeading>

      <p>
        Router V2 exposes three production-critical features directly on the route 
        definition object: <strong>Rate Limiting</strong>, <strong>Response Caching</strong>, 
        and <strong>Lifecycle Hooks</strong>.
      </p>

      <SectionHeading level={2}>Rate Limiting</SectionHeading>
      <p>
        Per-route rate limiting is enforced natively, offloading the tracking 
        logic to the XHSC core for maximum efficiency.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.get(
    "/api/export",
    {
        rateLimit: {
            max: 10,
            window: "1m", // 10 requests per minute
            message: "Rate limit exceeded. Please retry in 1 minute.",
            keyBy: "ip", // or "user", or a custom (req) => string
        },
    },
    (req, res) => {
        res.json({ data: "Sensitive export data" });
    },
);`}
      />

      <SectionHeading level={2}>Response Caching</SectionHeading>
      <p>
        Cache the response of <code>GET</code> routes in-memory to eliminate 
        redundant handler invocations and database lookups.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.get("/api/products", { cache: "5m" }, (req, res) => {
    // This handler runs once per 5 minutes; 
    // subsequent hits are served from the native cache.
    const products = db.getAll();
    res.json({ products });
});`}
      />
      <Callout type="info" title="Mutation Safety">
        Caching applies exclusively to <code>GET</code> routes. Mutation 
        endpoints (POST, PUT, PATCH, DELETE) are never cached.
      </Callout>

      <SectionHeading level={2}>Lifecycle Hooks</SectionHeading>
      <p>
        Hooks intercept the request at precisely defined stages without 
        interfering with the normal handler chain.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
        {[
          { 
            name: "beforeEnter", 
            desc: "Runs before the main handler. Use for validation.",
            icon: <Terminal className="w-4 h-4 text-blue-400" />
          },
          { 
            name: "afterLeave", 
            desc: "Runs after the response is sent. Use for metrics.",
            icon: <Activity className="w-4 h-4 text-green-400" />
          },
          { 
            name: "onError", 
            desc: "Fires if a hook or handler throws. For structured errors.",
            icon: <ShieldAlert className="w-4 h-4 text-red-400" />
          },
        ].map((hook) => (
          <div key={hook.name} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="flex items-center gap-2 font-bold text-white mb-1 text-xs">
              {hook.icon} {hook.name}
            </div>
            <p className="text-[10px] text-slate-400 m-0">{hook.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock
        language="typescript"
        title="Hook Implementation"
        code={`router.get(
  "/api/users/:id",
  {
    lifecycle: {
      beforeEnter(req, res, next) {
        if (!req.params.id.match(/^\\d+$/)) {
          return res.status(400).json({ error: "Invalid ID" });
        }
        next();
      },
      afterLeave(req, res) {
        // Fires after response is sent—safe for async analytics
        analytics.track("user.viewed", { id: req.params.id });
      },
    },
  },
  (req, res) => {
    res.json({ userId: req.params.id });
  },
);`}
      />

      <Callout type="danger" title="onError Protocol">
        Inside an <code>onError</code> hook, you <strong>must</strong> terminate 
        the request by responding to the client or throwing the error. Calling 
        <code>next()</code> will cause the request to hang indefinitely.
      </Callout>

      <DocsFooter
        title="Live Inspection"
        description="Learn how to inspect your routing tree and debug your API routes in real-time."
        buttonText="Next: Inspection"
        href="/docs/routing/inspection"
        iconName="Search"
      />
    </div>
  );
}
