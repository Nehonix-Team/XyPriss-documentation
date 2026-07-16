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
} from "lucide-react";

export default function SecurityGuardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Routing
        </div>
        <SectionHeading level={1}>Security Guards (XyGuard)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyGuard is the global declarative guard registry of the XyPriss
          framework. It lets you secure routes and route groups in a centralized
          way, without imposing any specific underlying implementation (JWT,
          sessions, RBAC, etc.).
        </p>
      </div>

      <SectionHeading level={2}>Architecture and Core Concepts</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyGuard relies on a static registry and a compiled middleware that
        intercepts requests before the main handler runs.
      </p>

      {/* Architecture Diagram */}
      <div className="my-10 flex flex-col items-center font-sans">
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
                  guards is an{" "}
                  <span className="text-green-400 font-semibold">array</span>
                </span>
                <div className="text-slate-400 mt-1 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> executes
                  each inline function
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
              <div className="mt-0.5 p-1.5 rounded-lg border border-blue-500/30 bg-blue-500/20 text-blue-400">
                <Key className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-slate-300">
                  guards is an{" "}
                  <span className="text-blue-400 font-semibold">object</span>
                </span>
                <div className="text-slate-400 mt-1 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> calls{" "}
                  <span className="text-blue-400 px-1">XyGuard.get(key)</span>{" "}
                  for each active key
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
                addRichRoute() / handleGroup()
              </h3>
            </div>
            <span className="px-2 py-1 rounded text-xs font-mono border border-orange-500/30 bg-orange-500/20 text-orange-300">
              registry.ts / groups.ts
            </span>
          </div>
          <div className="ml-11 flex items-start gap-2 text-sm text-slate-300">
            <ArrowRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              injects the guard middleware <br />
              <strong className="text-orange-400">BEFORE</strong> all other
              route middlewares
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6 space-y-2 leading-relaxed">
        <p>
          <strong>How it works:</strong>
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            At application startup, resolvers are registered via{" "}
            <code>XyGuard.define(name, resolver)</code>.
          </li>
          <li>
            On each route (or group), required guards are declared using the{" "}
            <code>guards</code> property.
          </li>
          <li>
            The framework compiles a guard middleware that runs before the route
            handler.
          </li>
          <li>
            If any guard fails, the request is immediately rejected with the
            appropriate HTTP status code (401 or 403). The main handler is never
            called.
          </li>
        </ol>
      </div>

      <SectionHeading level={2}>
        XyGuard.define() — Registering a Resolver
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The <code>XyGuard.define()</code> method registers guard logic. Guards
        should be defined at the server entry point, before any routes are
        mounted.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { XyGuard } from "xypriss";

// Authentication guard
XyGuard.define("authenticated", (req) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return "Missing token";
    try {
        (req as any).user = verifyToken(token);
        return true;
    } catch {
        return "Invalid or expired token";
    }
});

// Role-based guard
XyGuard.define("roles", (req, required) => {
    const user = (req as any).user;
    if (!user) return false;
    return required.includes(user.role)
        ? true
        : \`Role '\${user.role}' is insufficient. Required: \${required.join(", ")}\`;
});

// Permission-based guard
XyGuard.define("permissions", (req, required) => {
    const user = (req as any).user;
    if (!user) return false;
    const missing = required.filter((p) => !user.permissions?.includes(p));
    return missing.length === 0 ? true : \`Missing permissions: \${missing.join(", ")}\`;
});

// Custom guard — IP whitelist
XyGuard.define("ipWhitelist", (req) => {
    const allowedIps = ["127.0.0.1", "192.168.1.100"];
    return allowedIps.includes(req.ip ?? "") ? true : \`IP \${req.ip} is not allowed\`;
});`}
      />

      <SectionHeading level={2}>Usage on a Route</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The <code>guards</code> property is passed in the route options object.
        The declarative object syntax is the recommended approach.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { router } from "./router";

// Authentication only
router.get("/profile", { guards: { authenticated: true } }, async (req, res) => {
    res.json({ user: (req as any).user });
});

// Roles
router.post(
    "/admin/users",
    { guards: { authenticated: true, roles: ["admin", "super-admin"] } },
    async (req, res) => {
        res.status(201).json({ message: "User created" });
    },
);

// Permissions
router.delete(
    "/posts/:id",
    { guards: { authenticated: true, permissions: ["posts:delete"] } },
    async (req, res) => {
        res.json({ deleted: true });
    },
);

// Combining multiple guards
router.put(
    "/admin/settings",
    {
        guards: {
            authenticated: true,
            roles: ["admin"],
            permissions: ["settings:write"],
            ipWhitelist: true,
        },
    },
    handler,
);`}
      />

      <Callout type="info" title="Evaluation Order">
        Declarative guards (object form) are evaluated in the iteration order of{" "}
        <code>Object.entries()</code>. The first guard that fails immediately
        short-circuits the chain and sends the error response. Subsequent guards
        are not evaluated.
      </Callout>

      <SectionHeading level={2}>Usage on a Group</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Guards can be applied to an entire route group via{" "}
        <code>router.group()</code>. They are injected before every route in the
        group. Individual routes within the group can define additional guards on
        top.
      </p>
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
        adminRouter.get("/dashboard", dashboardHandler);

        // This route additionally requires the "reports:export" permission
        adminRouter.get(
            "/reports/export",
            { guards: { permissions: ["reports:export"] } },
            exportHandler,
        );
    },
);`}
      />

      <Callout type="warning" title="Enforcement">
        There is no way to bypass a group or router guard from within a child
        route. Guards ensure that your security policy is strictly enforced
        top-down.
      </Callout>

      <SectionHeading level={2}>Return Values and HTTP Behavior</SectionHeading>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">
                Returned Value
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Guard Type
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                HTTP Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 text-green-400 font-mono">
                true
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                All
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                None — access granted
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-red-400 font-mono">
                false
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                <code>authenticated</code>
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                401 Unauthorized
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 text-red-400 font-mono">
                false
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                <code>roles</code> / <code>permissions</code> / custom
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                403 Forbidden
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-yellow-400 font-mono">
                "message"
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                All
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                401 / 403 with that message as the error body
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info" title="Design Recommendation">
        For precise, user-facing error messages, prefer returning a descriptive{" "}
        <code>string</code> over <code>false</code>. The string is forwarded
        directly as the <code>error</code> field in the JSON response body.
      </Callout>

      <SectionHeading level={2}>
        TypeScript Auto-completion via Declaration Merging
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyPriss exposes the <code>CustomGuards</code> interface that you can
        augment in your project to get auto-completion and type validation for
        your custom guards.
      </p>

      <CodeBlock
        language="typescript"
        code={`// src/types/xypriss.d.ts  (or any .d.ts file included in tsconfig)
declare module "xypriss" {
    interface CustomGuards {
        ipWhitelist?: boolean;
        plan?: "free" | "starter" | "premium" | "enterprise";
        apiKey?: boolean;
    }
}

// TypeScript will now validate your guard keys and values at usage sites:
router.get(
    "/premium-feature",
    {
        guards: {
            authenticated: true,
            plan: "premium", // auto-completed and type-safe
        },
    },
    handler,
);`}
      />

      <SectionHeading level={2}>Guards vs Middleware</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        While both can intercept requests, guards and middleware serve different
        purposes:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white" />
              <th className="p-3 border border-white/10 font-bold text-white">
                Middleware
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Guards
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Declaration
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Imperative (<code>app.use</code>)
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Declarative (inline on route/group)
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Visible in inspection
              </td>
              <td className="p-3 border border-white/10 text-slate-400">No</td>
              <td className="p-3 border border-white/10 text-slate-400">Yes</td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Standard failure protocol
              </td>
              <td className="p-3 border border-white/10 text-slate-400">No</td>
              <td className="p-3 border border-white/10 text-slate-400">
                Yes (<code>true / false / string</code>)
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Execution timing
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                During request chain
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Before handler initializes
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info" title="When to use which?">
        Prefer <strong>guards</strong> for authentication and authorization
        checks. Reserve <strong>middleware</strong> for cross-cutting concerns
        like logging, body parsing, or CORS.
      </Callout>

      <DocsFooter
        title="Advanced Features"
        description="Optimize your routes with per-route rate limiting, response caching, and lifecycle hooks."
        buttonText="Next: Advanced Features"
        href="/docs/routing/advanced"
        iconName={"Zap"}
      />
    </div>
  );
}
