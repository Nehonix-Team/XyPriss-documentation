import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  ShieldCheck,
  Zap,
  Shield,
  Database,
  Code,
  List,
  Key,
  Package,
  ArrowDown,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

export default function SecurityGuardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Routing & Security
        </div>
        <SectionHeading level={1}>Security Guards (XyGuard)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyGuard is the high-performance declarative guard registry of XyPriss. It enables centralized, standardized security enforcement for routes and route groups with native TypeScript type-safety.
        </p>
      </div>

      <SectionHeading level={2} id="architecture">
        Architecture and Core Concepts
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Unlike traditional middleware, guards rely on a static global registry (<code className="text-primary font-mono">XyGuard</code>) and a standardized return-type protocol. They run <strong>before handler initialization</strong> and are fully inspectable in the route registry.
      </p>

      {/* Architecture Diagram */}
      <div className="my-8 flex flex-col items-center font-sans">
        {/* XyGuard Block */}
        <div className="w-full max-w-2xl rounded-xl border border-blue-500/50 bg-blue-500/10 p-5 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-wide">
              XyGuard{" "}
              <span className="text-blue-400/70 text-sm font-normal tracking-normal">
                (static registry)
              </span>
            </h3>
          </div>
          <div className="ml-11 flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
            <Database className="w-5 h-5 text-blue-400" />
            <code className="text-sm text-slate-300">
              resolvers:{" "}
              <span className="text-teal-300">
                Map&lt;string, GuardResolver&gt;
              </span>
            </code>
          </div>
        </div>

        {/* Arrow */}
        <div className="h-10 w-0.5 bg-blue-500 relative shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          <ArrowDown
            className="absolute -bottom-3 -left-[7px] text-blue-500 w-4 h-4"
            strokeWidth={3}
          />
        </div>

        {/* Middleware Block */}
        <div className="w-full max-w-2xl rounded-xl border border-purple-500/50 bg-purple-500/10 p-5 mt-3 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide">
                createGuardMiddleware()
              </h3>
            </div>
            <span className="px-2 py-1 rounded text-xs font-mono border border-purple-500/30 bg-purple-500/20 text-purple-300">
              helpers.ts
            </span>
          </div>
          <div className="ml-11 flex flex-col gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
              <div className="mt-0.5 p-1.5 rounded-lg border border-green-500/30 bg-green-500/20 text-green-400">
                <List className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-slate-300">
                  <code className="text-green-400 font-mono font-semibold">guards: RouteGuard[]</code> (Array syntax)
                </span>
                <div className="text-slate-400 mt-1 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Executes inline guard functions sequentially
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
              <div className="mt-0.5 p-1.5 rounded-lg border border-blue-500/30 bg-blue-500/20 text-blue-400">
                <Key className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-slate-300">
                  <code className="text-blue-400 font-mono font-semibold">guards: BuiltInGuards</code> (Object syntax)
                </span>
                <div className="text-slate-400 mt-1 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Invokes <span className="text-blue-400 font-mono px-1">XyGuard.get(key)</span> resolvers with parameters
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="h-10 w-0.5 bg-purple-500 relative shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          <ArrowDown
            className="absolute -bottom-3 -left-[7px] text-purple-500 w-4 h-4"
            strokeWidth={3}
          />
        </div>

        {/* Route Block */}
        <div className="w-full max-w-2xl rounded-xl border border-orange-500/50 bg-orange-500/10 p-5 mt-3 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide">
                Route Execution Handler
              </h3>
            </div>
            <span className="px-2 py-1 rounded text-xs font-mono border border-orange-500/30 bg-orange-500/20 text-orange-300">
              registry.ts
            </span>
          </div>
          <div className="ml-11 flex items-start gap-2 text-sm text-slate-300">
            <ArrowRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              Executes the main handler <strong>ONLY</strong> if all guard checks return <code className="text-green-400 font-mono">true</code>.
            </div>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="signatures">
        Guard Signatures
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyGuard resolvers support two distinct signature patterns based on whether they accept configuration options.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
            <Lock size={16} className="text-primary" />
            1. Direct / Boolean Guard Signature
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Used for simple guards (e.g. <code className="text-primary font-mono">authenticated: true</code> or inline functions). Receives <code className="text-primary font-mono">(req, res)</code> or <code className="text-primary font-mono">(req, ctx)</code>.
          </p>
          <CodeBlock
            language="typescript"
            code={`import { XyPrisRequest, XyPrisResponse } from "xypriss";

export const authGuard = async (req: XyPrisRequest, res: XyPrisResponse) => {
    if (!req.session?.userId) {
        return "Unauthorized: Bearer token or session missing";
    }
    return true;
};`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
            <Layers size={16} className="text-primary" />
            2. Configurable Guard Signature (with Options)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Used when parameters are passed (e.g. <code className="text-primary font-mono">roles: ["admin"]</code>). Receives <code className="text-primary font-mono">(req, options, ctx)</code>.
          </p>
          <CodeBlock
            language="typescript"
            code={`import { XyPrisRequest, XyGuardContext } from "xypriss";

export const rolesGuard = async (
    req: XyPrisRequest,
    requiredRoles: string[],
    ctx: XyGuardContext
) => {
    const userRole = req.user?.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
        return "Forbidden: Insufficient roles";
    }
    return true;
};`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="define">
        XyGuard.define() — Registering Resolvers
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Register your guard logic globally using <code className="text-primary font-mono">XyGuard.define()</code> during application startup before defining routes.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { XyGuard, XyPrisRequest, XyPrisResponse, XyGuardContext } from "xypriss";

// 1. Authentication guard
XyGuard.define("authenticated", async (req: XyPrisRequest, res: XyPrisResponse) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return "Missing authorization header";
    try {
        (req as any).user = await verifyJwt(token);
        return true;
    } catch {
        return "Invalid or expired token";
    }
});

// 2. Role-based guard (receives options parameter)
XyGuard.define("roles", (req: XyPrisRequest, requiredRoles: string[], ctx: XyGuardContext) => {
    const userRole = (req as any).user?.role;
    if (!userRole || !requiredRoles.includes(userRole)) {
        return \`Role '\${userRole}' is insufficient. Required: \${requiredRoles.join(", ")}\`;
    }
    return true;
});

// 3. Permission guard
XyGuard.define("permissions", (req: XyPrisRequest, required: string[]) => {
    const userPerms = (req as any).user?.permissions || [];
    const missing = required.filter((p) => !userPerms.includes(p));
    return missing.length === 0 ? true : \`Missing permissions: \${missing.join(", ")}\`;
});

// 4. Custom guard — IP Whitelist
XyGuard.define("ipWhitelist", (req: XyPrisRequest) => {
    const allowedIps = ["127.0.0.1", "192.168.1.100"];
    return allowedIps.includes(req.ip ?? "") ? true : \`IP \${req.ip} is not allowed\`;
});`}
      />

      <SectionHeading level={2} id="applying-guards">
        Applying Guards
      </SectionHeading>

      <div className="flex flex-col gap-4 my-2">
        <h3 className="text-lg font-bold text-white">Declarative Object Syntax (Recommended)</h3>
        <p className="text-sm text-muted-foreground">
          Pass guard configurations in the <code className="text-primary font-mono">guards</code> object of route options.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { router } from "./router";

// Single guard
router.get("/profile", { guards: { authenticated: true } }, async (req, res) => {
    res.json({ user: (req as any).user });
});

// Multi-guard combination
router.post(
    "/admin/users",
    {
        guards: {
            authenticated: true,
            roles: ["admin", "super-admin"],
            ipWhitelist: true,
        },
    },
    async (req, res) => {
        res.status(201).json({ message: "User created successfully" });
    },
);`}
        />
      </div>

      <div className="flex flex-col gap-4 my-4">
        <h3 className="text-lg font-bold text-white">Inline Array Syntax</h3>
        <p className="text-sm text-muted-foreground">
          Alternatively, pass an array of inline guard functions:
        </p>
        <CodeBlock
          language="typescript"
          code={`router.get("/dashboard", { guards: [authGuard, checkSubscriptionGuard] }, (req, res) => {
    res.json({ status: "active" });
});`}
        />
      </div>

      <SectionHeading level={2} id="group-guards">
        Group-Level Guards &amp; Inheritance
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Guards applied to a route group via <code className="text-primary font-mono">router.group()</code> automatically apply to all child routes inside that group. Guards cascade in hierarchical order:
      </p>

      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center gap-3 text-xs font-mono text-center my-2">
        <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">Router Level</span>
        <ArrowRight size={14} className="text-muted-foreground" />
        <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">Group Level</span>
        <ArrowRight size={14} className="text-muted-foreground" />
        <span className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/30">Route Level</span>
      </div>

      <CodeBlock
        language="typescript"
        code={`router.group(
    {
        prefix: "/admin",
        guards: {
            authenticated: true,
            roles: ["admin"],
        },
    },
    (adminRouter) => {
        // Inherits 'authenticated' and 'roles: ["admin"]'
        adminRouter.get("/dashboard", dashboardHandler);

        // Inherits parent group guards AND adds 'permissions: ["reports:export"]'
        adminRouter.get(
            "/reports/export",
            { guards: { permissions: ["reports:export"] } },
            exportHandler,
        );
    },
);`}
      />

      <Callout type="warning" title="Strict Inheritance Policy">
        Child routes cannot bypass or disable parent group guards. Security policies are strictly enforced top-down.
      </Callout>

      <SectionHeading level={2} id="return-protocol">
        Return Protocol &amp; HTTP Behavior
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The table below details how return values from resolvers translate directly into HTTP responses:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">Return Value</th>
              <th className="p-3 font-bold text-white">Guard Type / Context</th>
              <th className="p-3 font-bold text-white">HTTP Status</th>
              <th className="p-3 font-bold text-white">JSON Response Body</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            <tr>
              <td className="p-3 text-green-400 font-bold">true / void</td>
              <td className="p-3 text-slate-300 font-sans">All</td>
              <td className="p-3 text-slate-300 font-sans">Access Granted</td>
              <td className="p-3 text-slate-400 font-sans">Request continues to handler</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-red-400">false</td>
              <td className="p-3 text-slate-300 font-sans"><code>authenticated</code></td>
              <td className="p-3 text-red-300">401 Unauthorized</td>
              <td className="p-3 text-slate-400"><code>&#123; success: false, error: "Unauthorized: Authentication required" &#125;</code></td>
            </tr>
            <tr>
              <td className="p-3 text-red-400">false</td>
              <td className="p-3 text-slate-300 font-sans"><code>roles</code></td>
              <td className="p-3 text-red-300">403 Forbidden</td>
              <td className="p-3 text-slate-400"><code>&#123; success: false, error: "Forbidden: Insufficient roles" &#125;</code></td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-red-400">false</td>
              <td className="p-3 text-slate-300 font-sans"><code>permissions</code> / Custom / Array</td>
              <td className="p-3 text-red-300">403 Forbidden</td>
              <td className="p-3 text-slate-400"><code>&#123; success: false, error: "Forbidden: Access denied" &#125;</code></td>
            </tr>
            <tr>
              <td className="p-3 text-yellow-400">"custom error"</td>
              <td className="p-3 text-slate-300 font-sans"><code>authenticated</code> / Custom / Array</td>
              <td className="p-3 text-yellow-300">401 Unauthorized</td>
              <td className="p-3 text-slate-400"><code>&#123; success: false, error: "custom error" &#125;</code></td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-yellow-400">"custom error"</td>
              <td className="p-3 text-slate-300 font-sans"><code>roles</code> / <code>permissions</code></td>
              <td className="p-3 text-yellow-300">403 Forbidden</td>
              <td className="p-3 text-slate-400"><code>&#123; success: false, error: "custom error" &#125;</code></td>
            </tr>
            <tr>
              <td className="p-3 text-red-500 font-bold">throw Error</td>
              <td className="p-3 text-slate-300 font-sans">All</td>
              <td className="p-3 text-red-400">500 Server Error</td>
              <td className="p-3 text-slate-400"><code>&#123; success: false, error: "Internal Server Error during guard check" &#125;</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info" title="Recommendation">
        Prefer returning a custom error <code className="text-primary font-mono">string</code> over <code className="text-primary font-mono">false</code> to provide clear, actionable feedback to API clients.
      </Callout>

      <SectionHeading level={2} id="migration">
        v1 → v2 Migration (Removal of `custom`)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        In XyPriss v2, the legacy <code className="text-red-400 font-mono">custom</code> property inside the <code className="text-primary font-mono">guards</code> object has been <strong>removed</strong> and is now typed as <code className="text-red-400 font-mono">never</code>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
          <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2 text-xs uppercase tracking-widest">
            Legacy Syntax (v1 — Deprecated / Removed)
          </h4>
          <CodeBlock
            language="typescript"
            code={`// NO LONGER WORKS IN V2
router.get("/data", {
    guards: {
        authenticated: true,
        custom: [myInlineGuard], // Type error: 'custom' is typed as 'never'
    },
}, handler);`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10">
          <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2 text-xs uppercase tracking-widest">
            V2 Recommended Migration Options
          </h4>
          <CodeBlock
            language="typescript"
            code={`// Option A: Use array for inline guards
router.get("/data", { guards: [myInlineGuard] }, handler);

// Option B: Register named guard via XyGuard.define
XyGuard.define("myGuard", myInlineGuard);
router.get("/data", {
    guards: { authenticated: true, myGuard: true },
}, handler);`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="typescript">
        TypeScript Auto-completion via Declaration Merging
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Augment the <code className="text-primary font-mono">CustomGuards</code> interface in your project to enable native IDE autocompletion for custom guard keys:
      </p>

      <CodeBlock
        language="typescript"
        code={`// src/types/xypriss.d.ts
declare module "xypriss" {
    interface CustomGuards {
        ipWhitelist?: boolean;
        plan?: "free" | "starter" | "premium" | "enterprise";
        apiKey?: boolean;
    }
}

// IDE now validates custom keys and values:
router.get(
    "/premium-feature",
    {
        guards: {
            authenticated: true,
            plan: "premium", // Auto-completed & type-checked!
        },
    },
    handler,
);`}
      />

      <SectionHeading level={2} id="advanced-patterns">
        Advanced Practical Patterns
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> 1. Async Database Verification Guard
          </h4>
          <CodeBlock
            language="typescript"
            code={`XyGuard.define("subscriptionActive", async (req) => {
    const user = (req as any).user;
    if (!user) return false;

    const sub = await db.subscriptions.findOne({
        userId: user.id,
        status: "active",
    });

    if (!sub) return "Subscription expired or invalid";
    (req as any).subscription = sub;
    return true;
});`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> 2. Daily User Quota Guard
          </h4>
          <CodeBlock
            language="typescript"
            code={`XyGuard.define("dailyExportQuota", async (req) => {
    const user = (req as any).user;
    const key = \`quota:\${user.id}:\${new Date().toISOString().slice(0, 10)}\`;
    
    const count = await redis.incr(key);
    const limit = user.plan === "premium" ? 1000 : 50;

    if (count > limit) {
        return \`Daily quota reached (\${limit} exports/day)\`;
    }
    return true;
});`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> 3. Feature Flag / Beta Guard
          </h4>
          <CodeBlock
            language="typescript"
            code={`XyGuard.define("betaTesterOnly", (req) => {
    const user = (req as any).user;
    if (user?.isBetaTester) return true;
    return "This feature is restricted to beta testers";
});`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-primary" /> 4. Pre-Handler Request Validation
          </h4>
          <CodeBlock
            language="typescript"
            code={`XyGuard.define("requireJsonBody", (req) => {
    const ct = req.headers["content-type"] ?? "";
    if (!ct.includes("application/json")) {
        return "Content-Type: application/json is required";
    }
    if (!req.body) return "Request body cannot be empty";
    return true;
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="comparison">
        Guards vs Middleware
      </SectionHeading>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white" />
              <th className="p-3 border border-white/10 font-bold text-white">
                Middleware
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Guards (XyGuard)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Declaration
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Imperative (<code className="text-primary font-mono">app.use</code>)
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Declarative (inline or via <code className="text-primary font-mono">XyGuard.define</code>)
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Inspection Visibility
              </td>
              <td className="p-3 border border-white/10 text-slate-400">No</td>
              <td className="p-3 border border-white/10 text-teal-300 font-bold">Yes (visible in route inspection)</td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Return Protocol
              </td>
              <td className="p-3 border border-white/10 text-slate-400">Manually call <code className="text-slate-300 font-mono">next()</code></td>
              <td className="p-3 border border-white/10 text-teal-300 font-bold">Standardized (<code className="font-mono">true / false / "string"</code>)</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Execution Timing
              </td>
              <td className="p-3 border border-white/10 text-slate-400">During request processing chain</td>
              <td className="p-3 border border-white/10 text-teal-300 font-bold">Before main handler initializes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsFooter
        title="Advanced Route Features"
        description="Explore Go-native rate limiting, multi-window XTRS shields, response caching, and lifecycle hooks."
        buttonText="Next: Advanced Features"
        href="/docs/routing/advanced"
        iconName="Zap"
      />
    </div>
  );
}
