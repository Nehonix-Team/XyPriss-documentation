import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { ShieldCheck, Lock, Key, Zap } from "lucide-react";

export default function SecurityGuardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Routing
        </div>
        <SectionHeading level={1}>Security Guards</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Guards are the recommended mechanism for enforcing authorization rules
          in XyPriss Router. Unlike traditional middleware, guards use a{" "}
          <strong>standardized return-type protocol</strong> and are visible in
          the route inspection registry.
        </p>
      </div>

      <SectionHeading level={2}>Guard Signature</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        A guard is a function that receives <code>req</code> and{" "}
        <code>res</code> and returns a specific value to determine the
        request&apos;s fate:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">
                Return value
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                HTTP Effect
              </th>
              <th className="p-3 border border-white/10 font-bold text-white">
                Behavior
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 text-green-400 font-mono">
                true
              </td>
              <td className="p-3 border border-white/10">200 OK</td>
              <td className="p-3 border border-white/10 text-slate-400">
                Passes — the next guard or handler runs.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-red-400 font-mono">
                false
              </td>
              <td className="p-3 border border-white/10">403 Forbidden</td>
              <td className="p-3 border border-white/10 text-slate-400">
                Blocks the request immediately.
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 text-yellow-400 font-mono">
                string
              </td>
              <td className="p-3 border border-white/10">401 Unauthorized</td>
              <td className="p-3 border border-white/10 text-slate-400">
                Blocks — returns the string as the response message.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Applying Guards</SectionHeading>

      <SectionHeading level={3}>Per Route</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        You can apply guards using the declarative object syntax or an array of
        inline functions.
      </p>

      <SectionHeading level={4}>
        Declarative Object Syntax (Recommended)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        By registering guards globally via <code>XyGuard.define()</code>, you
        can use a strictly-typed object syntax. The <code>guards</code> object
        provides auto-completion for built-ins while supporting arbitrary custom
        names seamlessly.
      </p>
      <CodeBlock
        language="typescript"
        code={`// Define a custom guard globally
XyGuard.define("ipWhitelist", (req) => {
    return req.ip === "127.0.0.1" ? true : "Forbidden IP";
});

router.get(
    "/admin/settings",
    {
        guards: {
            authenticated: true,
            roles: ["admin"],
            ipWhitelist: true // Custom declarative guard
        },
    },
    (req, res) => {
        res.success("Welcome, Admin");
    },
);`}
      />

      <Callout type="info" title="TypeScript Auto-Completion for Custom Guards">
        To get native autocomplete for your custom declarative guards alongside{" "}
        <code>authenticated</code> and <code>roles</code>, use Declaration
        Merging. Add this to any <code>.d.ts</code> or <code>.ts</code> file in
        your project:
        <CodeBlock
          language="typescript"
          code={`declare module "xypriss" {
    interface CustomGuards {
        ipWhitelist?: boolean;
    }
}`}
        />
      </Callout>

      <SectionHeading level={4}>Array Syntax (Inline)</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`router.get("/profile", { guards: [authGuard] }, (req, res) => {
    res.success("Protected profile");
});`}
      />

      <SectionHeading level={3}>Per Group</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Applied to every route within the group:
      </p>
      <CodeBlock
        language="typescript"
        code={`router.group(
    { prefix: "/admin", guards: [authGuard, adminRoleGuard] },
    (admin) => {
        admin.get("/dashboard", (req, res) => res.success("Admin dashboard"));
    },
);`}
      />

      <SectionHeading level={2}>Guard Inheritance</SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        Guards cascade from the outermost scope inward. Every layer must pass
        independently to reach the handler.
      </p>

      <div className="flex flex-col items-center gap-2 my-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-slate-300">
          <ShieldCheck className="w-4 h-4 text-blue-400" /> Router-level Guards
        </div>
        <div className="w-0.5 h-4 bg-white/10" />
        <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-slate-300">
          <Lock className="w-4 h-4 text-purple-400" /> Group-level Guards
        </div>
        <div className="w-0.5 h-4 bg-white/10" />
        <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-xs font-mono text-primary font-bold">
          <Key className="w-4 h-4" /> Route-level Guards
        </div>
      </div>

      <Callout type="warning" title="Enforcement">
        There is no way to bypass a group or router guard from within a child
        route. Guards ensure that your security policy is strictly enforced
        top-down.
      </Callout>

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
                Declarative (inline on route)
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Visible in inspection
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                No
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Yes
              </td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 text-slate-300 font-semibold">
                Standard failure protocol
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                No
              </td>
              <td className="p-3 border border-white/10 text-slate-400">
                Yes (<code>true/false/string</code>)
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
        description="Optimize your routes with per-route rate limiting, response caching, and hooks."
        buttonText="Next: Advanced Features"
        href="/docs/routing/advanced"
        iconName={Zap as any}
      />
    </div>
  );
}
