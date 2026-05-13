import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { ShieldCheck, Lock, UserCheck, Key, ShieldAlert, Cpu } from "lucide-react";

export default function SecurityGuardsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Security Guards & XyGuard</SectionHeading>

      <p>
        Guards are the primary mechanism for enforcing authorization in XyPriss 
        Router V2. Unlike traditional middleware, guards use a 
        <strong> standardized return-type protocol</strong> and are fully 
        visible in the route inspection registry.
      </p>

      <SectionHeading level={2}>The Guard Protocol</SectionHeading>
      <p>
        A guard is a function that receives <code>(req, res)</code> and returns 
        a specific value to determine the request's fate:
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">Return Value</th>
              <th className="p-3 border border-white/10 font-bold text-white">HTTP Effect</th>
              <th className="p-3 border border-white/10 font-bold text-white">Behavior</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 text-green-400 font-mono">true</td>
              <td className="p-3 border border-white/10">200 OK</td>
              <td className="p-3 border border-white/10 text-slate-400">Passes—the next guard or handler runs.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-red-400 font-mono">false</td>
              <td className="p-3 border border-white/10">403 Forbidden</td>
              <td className="p-3 border border-white/10 text-slate-400">Blocks the request immediately.</td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 text-yellow-400 font-mono">string</td>
              <td className="p-3 border border-white/10">401 Unauthorized</td>
              <td className="p-3 border border-white/10 text-slate-400">Blocks and returns the string as the error message.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>XyGuard API</SectionHeading>
      <p>
        The XyGuard API provides a non-opinionated security layer for implementing 
        <strong>built-in declarative guards</strong>. It allows you to keep your 
        route definitions clean while defining logic globally.
      </p>

      <SectionHeading level={3}>Defining Resolvers</SectionHeading>
      <p>
        Register your logic for the standard guard types (<code>authenticated</code>, 
        <code>roles</code>, <code>permissions</code>).
      </p>
      <CodeBlock
        language="typescript"
        code={`import { XyGuard } from "xypriss";

// Define global auth logic
XyGuard.define("authenticated", (req) => {
    return !!req.session?.get("user_id") || "Login required";
});

// Define role-based access
XyGuard.define("roles", (req, requiredRoles) => {
    const userRole = req.locals.user?.role;
    return requiredRoles.includes(userRole);
});`}
      />

      <SectionHeading level={3}>Usage in Routes</SectionHeading>
      <p>Apply these defined guards directly in the route options object.</p>
      <CodeBlock
        language="typescript"
        code={`app.get(
    "/admin/settings",
    {
        guards: {
            authenticated: true,
            roles: ["admin"],
        },
    },
    (req, res) => {
        res.success("Welcome, Admin");
    },
);`}
      />

      <SectionHeading level={2}>Guard Inheritance</SectionHeading>
      <p>
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

      <DocsFooter
        title="Advanced Features"
        description="Optimize your routes with per-route rate limiting, response caching, and hooks."
        buttonText="Next: Advanced Features"
        href="/docs/routing/advanced"
        iconName="Zap"
      />
    </div>
  );
}
