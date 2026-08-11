import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Zap, Activity, Clock, ShieldAlert, Cpu, Terminal, Shield, Layers, Code2 } from "lucide-react";

export default function AdvancedRoutingPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Advanced Route Features</SectionHeading>

      <p>
        Router V2 exposes production-critical features directly on route definitions and route groups:{" "}
        <strong>Go-Native Rate Limiting &amp; XTRS</strong>, <strong>Response Caching</strong>, and{" "}
        <strong>Lifecycle Hooks</strong>. Declaring these at the route or group level ensures explicit intent, co-located business logic, and full visibility in the routing registry.
      </p>

      <SectionHeading level={2}>Rate Limiting (Go-Native XHSC &amp; XTRS)</SectionHeading>
      <p>
        Rate limiting in XyPriss is executed <strong>100% natively in Go</strong> via the <strong>XHSC (XyPriss Hyper-System Core)</strong> engine. 
        It operates before JavaScript execution, ensuring ultra-low overhead and zero Node.js event-loop blocking.
      </p>
      <p>
        Rate limiting can be declared as a <strong>string shorthand</strong>, a <strong>standard configuration object</strong>, or an <strong>XTRS (Temporal Rate Shield)</strong> multi-window policy.
      </p>

      <SectionHeading level={3}>1. String Shorthand</SectionHeading>
      <p>Pass a quick duration string directly to <code>rateLimit</code>:</p>
      <CodeBlock
        language="typescript"
        code={`router.get("/api/search", { rateLimit: "10/1m" }, (req, res) => {
    res.json({ results: [] });
});`}
      />

      <SectionHeading level={3}>2. Standard Configuration Object</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`router.get(
    "/api/export",
    {
        rateLimit: {
            max: 10,
            window: "1m", // or windowMs: 60_000
            message: "Rate limit exceeded. Please retry in 1 minute.",
            statusCode: 429,
            keyBy: "ip", // "ip" | "user" | (req) => string
        },
    },
    (req, res) => {
        res.json({ data: "..." });
    },
);`}
      />

      <SectionHeading level={3}>3. XTRS (Temporal Rate Shield) &amp; Multi-Window Protection</SectionHeading>
      <p>XTRS allows defining multiple sliding-window rules with automatic temporary IP blocking:</p>
      <CodeBlock
        language="typescript"
        code={`router.post(
    "/api/auth/login",
    {
        rateLimit: {
            xtrs: {
                rules: [
                    {
                        rule: "5/1m",
                        message: "Too many login attempts. Account temporarily locked for 5 minutes.",
                        blockDuration: "5m",
                        statusCode: 429,
                    },
                ],
            },
        },
    },
    async (req, res) => {
        // Login logic
    },
);`}
      />

      <SectionHeading level={3}>4. Route Group Rate Limiting</SectionHeading>
      <p>
        Rate limiting can also be declared globally for an entire route group via <code>router.group(...)</code>. 
        Group rate limits apply natively in Go across all routes inside the group, including unhandled <code>404</code> requests matching the group prefix:
      </p>
      <CodeBlock
        language="typescript"
        code={`router.group(
    {
        prefix: "/stream",
        rateLimit: {
            rules: [
                {
                    rule: "3/1m",
                    message: "Stream group rate limit exceeded!",
                    blockDuration: "20s",
                },
            ],
        },
    },
    (stream) => {
        stream.get("/video", (req, res) => {
            res.send("Video stream");
        });
    },
);`}
      />

      <SectionHeading level={3}>Rate Limit Options Reference (<code>RoutRateLimit</code>)</SectionHeading>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="py-2 px-3 font-semibold">Option</th>
              <th className="py-2 px-3 font-semibold">Type</th>
              <th className="py-2 px-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-white/5">
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">max</td>
              <td className="py-2 px-3 font-mono text-slate-300">number</td>
              <td className="py-2 px-3">Maximum requests allowed per window.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">window</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | number</td>
              <td className="py-2 px-3">Duration string (<code>"10s"</code>, <code>"1m"</code>, <code>"1h"</code>) or window in milliseconds.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">windowMs</td>
              <td className="py-2 px-3 font-mono text-slate-300">number</td>
              <td className="py-2 px-3">Window duration in milliseconds (takes precedence over <code>window</code>).</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">message</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | any</td>
              <td className="py-2 px-3">Error message or JSON object returned when limit is exceeded.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">statusCode</td>
              <td className="py-2 px-3 font-mono text-slate-300">number</td>
              <td className="py-2 px-3">HTTP status code returned when blocked (defaults to <code>429</code>).</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">keyBy</td>
              <td className="py-2 px-3 font-mono text-slate-300">"ip" | "user" | (req) =&gt; string</td>
              <td className="py-2 px-3">Identification strategy for tracking requests (defaults to IP).</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">xtrs</td>
              <td className="py-2 px-3 font-mono text-slate-300">XtrsOptions</td>
              <td className="py-2 px-3">Advanced multi-window XTRS configuration.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">rules</td>
              <td className="py-2 px-3 font-mono text-slate-300">XtrsRuleInput[]</td>
              <td className="py-2 px-3">Array of shorthand XTRS rules (e.g. <code>[&#123; rule: "5/1m", blockDuration: "20s" &#125;]</code>).</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">blockDuration</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | number</td>
              <td className="py-2 px-3">Duration to temporarily block requests after threshold breach.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">blockDurationMs</td>
              <td className="py-2 px-3 font-mono text-slate-300">number</td>
              <td className="py-2 px-3">Block duration in milliseconds.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock
        language="typescript"
        title="Type Definition"
        code={`export type RoutRateLimitInput = string | RoutRateLimit;`}
      />

      <SectionHeading level={2}>Response Caching</SectionHeading>
      <p>
        Cache the response of <code>GET</code> routes in-memory to eliminate redundant handler invocations and database lookups.
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

      <SectionHeading level={3}>Options Reference</SectionHeading>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="py-2 px-3 font-semibold">Option</th>
              <th className="py-2 px-3 font-semibold">Type</th>
              <th className="py-2 px-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-white/5">
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">cache</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | number</td>
              <td className="py-2 px-3">TTL as a duration string (<code>"10s"</code>, <code>"1m"</code>, <code>"1h"</code>) or milliseconds.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">key</td>
              <td className="py-2 px-3 font-mono text-slate-300">(req) =&gt; string</td>
              <td className="py-2 px-3">Optional custom cache key generator (defaults to the request URL).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info" title="Mutation Safety">
        Caching applies exclusively to <code>GET</code> routes. Mutation endpoints (<code>POST</code>, <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>) are never cached.
      </Callout>

      <SectionHeading level={2}>Lifecycle Hooks</SectionHeading>
      <p>
        Lifecycle hooks intercept the request at precisely defined stages without interfering with the normal handler chain.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-6">
        {[
          {
            name: "beforeEnter",
            desc: "Runs before the main handler. Use for input validation & enriching req.",
            icon: <Terminal className="w-4 h-4 text-blue-400" />,
          },
          {
            name: "afterLeave",
            desc: "Runs after the response is sent. Safe for async logging & metrics.",
            icon: <Activity className="w-4 h-4 text-green-400" />,
          },
          {
            name: "onError",
            desc: "Fires if a hook or handler throws. For structured error responses.",
            icon: <ShieldAlert className="w-4 h-4 text-red-400" />,
          },
        ].map((hook) => (
          <div
            key={hook.name}
            className="p-4 bg-white/[0.02] border border-white/5 rounded-xl"
          >
            <div className="flex items-center gap-2 font-bold text-white mb-1 text-xs">
              {hook.icon} {hook.name}
            </div>
            <p className="text-[10px] text-slate-400 m-0">{hook.desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock
        language="typescript"
        title="Lifecycle Hooks Example"
        code={`router.get(
    "/api/users/:id",
    {
        beforeEnter(req, res, next) {
            if (!req.params.id.match(/^\\d+$/)) {
                return res.status(400).json({ error: "Invalid ID format" });
            }
            next();
        },
        afterLeave(req, res) {
            // Fires after the response is already sent — safe for async analytics
            analytics.track("user.viewed", { id: req.params.id });
        },
    },
    (req, res) => {
        res.json({ userId: req.params.id });
    },
);`}
      />

      <SectionHeading level={3}>Correct <code>onError</code> Patterns</SectionHeading>
      <Callout type="danger" title="onError Protocol">
        If you define an <code>onError</code> hook, you <strong>must</strong> terminate the request. Calling <code>next()</code> inside <code>onError</code> does not terminate the connection and will cause the request to hang indefinitely.
      </Callout>

      <CodeBlock
        language="typescript"
        title="onError Best Practices"
        code={`// WRONG — request hangs
onError(err, req, res, next) {
    console.error(err);
    next(); // Do not use next() here
}

// CORRECT — respond to the client
onError(err, req, res) {
    res.status(500).json({ error: "Internal Server Error" });
}

// CORRECT — bubble up to the global error handler
onError(err) {
    throw err;
} `}
      />

      <SectionHeading level={2}>Combining All Features</SectionHeading>
      <p>Combine security guards, rate limiting rules, lifecycle hooks, and error handling in a single robust endpoint definition:</p>
      <CodeBlock
        language="typescript"
        code={`router.post(
    "/api/orders",
    {
        guards: [authGuard, subscriptionGuard],
        rateLimit: {
            rules: [{ rule: "20/1m", blockDuration: "1m" }],
        },
        beforeEnter(req, res, next) {
            if (!req.body.items?.length) {
                return res
                    .status(400)
                    .json({ error: "Order must have at least one item" });
            }
            next();
        },
        onError(err, req, res) {
            res.status(500).json({ error: err.message });
        },
    },
    async (req, res) => {
        const order = await OrderService.create(req.body);
        res.status(201).json({ order });
    },
);`}
      />

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
