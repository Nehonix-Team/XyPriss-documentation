"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Zap, ShieldCheck, Lock, Layers, ShieldAlert } from "lucide-react";

export default function RoutingMiddlewarePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Layers size={14} />
          API Reference
        </div>
        <SectionHeading level={1}>Routing & Middleware</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss G3 enforces a strict <strong>Zero-Trust Routing</strong> policy. Plugins are restricted via the <code>PluginServer</code> proxy to ensure they cannot interfere with global state without explicit authorization.
        </p>
      </div>

      <TechGraph 
        title="Routing Security Layers"
        badge="Namespace Sandboxing"
        nodes={[
          { iconName: "Layers", title: "Namespace", subtitle: "/{id}/* Enforcement", color: "blue", active: true },
          { iconName: "Lock", title: "Protected", subtitle: "Overwrite Protection", color: "primary" },
          { iconName: "Zap", title: "Middleware", subtitle: "Scoped vs Global", color: "purple" },
          { iconName: "ShieldCheck", title: "Execution", subtitle: "Authorized Access", color: "orange" }
        ]}
        footer={[
          { label: "Bypass", description: "Bypassing the namespace requires high-privilege authorization.", color: "blue" },
          { label: "Conflict", description: "The engine blocks duplicate route registrations by default.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="register-routes">registerRoutes</SectionHeading>
      <div className="space-y-4">
        <p>
          Allows programmatic registration of application routes. By default, all routes registered here are automatically checked for <strong>Namespace Compliance</strong>.
        </p>
        <CodeBlock 
          language="typescript" 
          code={`registerRoutes(app: XyPrissApp): void {
    // Registered under /{pluginId}/v1/status
    app.get("/v1/status", (req, res) => res.send({ ok: true }));
}`} 
        />
        <p className="text-xs text-muted-foreground italic">
          <strong>Permission ID:</strong> <code>XHS.PERM.ROUTING.REGISTER_ROUTES</code>
        </p>
      </div>

      <SectionHeading level={2} id="sandboxing">Namespace Sandboxing</SectionHeading>
      <div className="space-y-4">
        <p>
          To maintain isolation, plugins are restricted to their unique ID namespace. Accessing paths outside this boundary requires explicit permission.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h5 className="font-bold text-white text-xs mb-2">Namespace Bypass</h5>
            <p className="text-[10px] text-muted-foreground mb-3">Allows registering routes on any global path (e.g., <code>/api</code> or <code>/auth</code>).</p>
            <code className="text-[9px] text-orange-400 bg-orange-400/10 px-2 py-1 rounded">XHS.PERM.ROUTING.BYPASS_NAMESPACE</code>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h5 className="font-bold text-white text-xs mb-2">Overwrite Protection</h5>
            <p className="text-[10px] text-muted-foreground mb-3">Allows replacing existing system or plugin routes. High-risk operation.</p>
            <code className="text-[9px] text-red-400 bg-red-400/10 px-2 py-1 rounded">XHS.PERM.ROUTING.OVERWRITE_PROTECTED</code>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="middleware">Middleware Protocols</SectionHeading>
      <div className="space-y-4">
        <p>
          Middlewares are categorized by their execution scope. XyPriss distinguishes between scoped and global injection.
        </p>
        <ul className="space-y-4 my-4">
          <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-1">S</div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Scoped Middleware</p>
              <p className="text-xs text-muted-foreground mb-2">Injected via <code>app.use("/path", mw)</code>. Standard permission required.</p>
              <code className="text-[9px] text-primary">XHS.PERM.HTTP.MIDDLEWARE</code>
            </div>
          </li>
          <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
            <div className="w-6 h-6 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 text-[10px] font-bold shrink-0 mt-1">G</div>
            <div>
              <p className="text-sm font-bold text-white mb-1">Global Middleware</p>
              <p className="text-xs text-muted-foreground mb-2">Injected via <code>app.use(mw)</code>. Affects the entire server transaction pipeline.</p>
              <code className="text-[9px] text-orange-400">XHS.PERM.HTTP.GLOBAL_MIDDLEWARE</code>
            </div>
          </li>
        </ul>
      </div>

      <SectionHeading level={2} id="priority">Execution Priority</SectionHeading>
      <div className="space-y-4">
        <p>
          The <code>middlewarePriority</code> property allows developers to position their middleware within the stack relative to other plugins.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] text-center">
            <code className="text-[10px] text-primary font-bold">"first"</code>
            <p className="text-[9px] text-muted-foreground mt-1">Top of stack.</p>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] text-center">
            <code className="text-[10px] text-primary font-bold">"normal"</code>
            <p className="text-[9px] text-muted-foreground mt-1">Registry order.</p>
          </div>
          <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] text-center">
            <code className="text-[10px] text-primary font-bold">"last"</code>
            <p className="text-[9px] text-muted-foreground mt-1">Bottom of stack.</p>
          </div>
        </div>
      </div>

      <DocsFooter 
        title="Logging & Operations"
        description="Learn how to intercept console activity and deploy auxiliary server instances."
        buttonText="View Ops Guide"
        href="/docs/plugins/api-reference/logging-ops"
        iconName="Activity"
      />
    </div>
  );
}
