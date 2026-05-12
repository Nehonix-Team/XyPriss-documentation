"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Terminal, ShieldCheck, Zap, Activity, Layers, Lock, Search } from "lucide-react";

export default function UnifiedHookRegistryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Search size={14} />
          Technical Reference
        </div>
        <SectionHeading level={1}>Unified Hook Registry</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The definitive index of all hooks, properties, and capability-based permissions available within the XyPriss G3 ecosystem.
        </p>
      </div>

      <TechGraph 
        title="Registry Categorization"
        badge="Zero-Trust Permission Mapping"
        nodes={[
          { iconName: "Zap", title: "Lifecycle", subtitle: "Boot Sequence", color: "blue" },
          { iconName: "Activity", title: "HTTP", subtitle: "Transaction", color: "purple" },
          { iconName: "Layers", title: "Routing", subtitle: "Sandboxing", color: "primary", active: true },
          { iconName: "Lock", title: "Security", subtitle: "Access Control", color: "orange" }
        ]}
        footer={[
          { label: "Privileged", description: "Hooks requiring explicit security declaration are marked in orange.", color: "orange" },
          { label: "Standard", description: "Core lifecycle and metrics hooks are marked in blue/purple.", color: "blue" }
        ]}
      />

      <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em]">
            <tr>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Hook / Property</th>
              <th className="px-6 py-4">Permission ID</th>
              <th className="px-6 py-4">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[10px]">
            {/* Lifecycle */}
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td rowSpan={4} className="px-6 py-4 font-bold text-primary border-r border-white/5 uppercase tracking-tighter">Lifecycle</td>
              <td className="px-6 py-4 font-mono text-white">onRegister</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.REGISTER</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Executed during initial plugin instantiation.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">onServerStart</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.SERVER_START</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Executed during server bootstrap.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">onServerReady</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.SERVER_READY</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Executed once the server is listening.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">onServerStop</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.SERVER_STOP</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Executed during graceful shutdown.</td>
            </tr>

            {/* HTTP */}
            <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <td rowSpan={4} className="px-6 py-4 font-bold text-purple-400 border-r border-white/5 uppercase tracking-tighter">HTTP</td>
              <td className="px-6 py-4 font-mono text-white">onRequest</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.HTTP.REQUEST</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Executed for every incoming request.</td>
            </tr>
            <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <td className="px-6 py-4 font-mono text-white">onResponse</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.HTTP.RESPONSE</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Executed prior to transmission.</td>
            </tr>
            <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <td className="px-6 py-4 font-mono text-white">onError</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.HTTP.ERROR</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Triggered during request exceptions.</td>
            </tr>
            <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <td className="px-6 py-4 font-mono text-white">onRouteError</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.HOOK.METRICS.ROUTE_ERROR</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Triggered when route execution fails.</td>
            </tr>

            {/* Routing */}
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td rowSpan={5} className="px-6 py-4 font-bold text-blue-400 border-r border-white/5 uppercase tracking-tighter">Routing</td>
              <td className="px-6 py-4 font-mono text-white">registerRoutes</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.PERM.ROUTING.REGISTER_ROUTES</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Programmatic route registration.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">bypassNamespace</td>
              <td className="px-6 py-4 font-mono text-red-400/80">XHS.PERM.ROUTING.BYPASS_NAMESPACE</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Register routes on global paths.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">overwriteProtected</td>
              <td className="px-6 py-4 font-mono text-red-400/80">XHS.PERM.ROUTING.OVERWRITE_PROTECTED</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Replace existing system routes.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">middleware</td>
              <td className="px-6 py-4 font-mono text-muted-foreground">XHS.PERM.HTTP.MIDDLEWARE</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Injection for scoped middleware.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">globalMiddleware</td>
              <td className="px-6 py-4 font-mono text-orange-400/80">XHS.PERM.HTTP.GLOBAL_MIDDLEWARE</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Inject global middleware stack.</td>
            </tr>

            {/* Ops & Logs */}
            <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <td rowSpan={2} className="px-6 py-4 font-bold text-orange-400 border-r border-white/5 uppercase tracking-tighter text-[9px]">Ops & Logs</td>
              <td className="px-6 py-4 font-mono text-white">onAuxiliaryServerDeploy</td>
              <td className="px-6 py-4 font-mono text-orange-400/80">XHS.PERM.OPS.AUXILIARY_SERVER</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Authorized auxiliary server deployment.</td>
            </tr>
            <tr className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <td className="px-6 py-4 font-mono text-white">onConsoleIntercept</td>
              <td className="px-6 py-4 font-mono text-orange-400/80">XHS.PERM.LOGGING.CONSOLE_INTERCEPT</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Capture native console activity.</td>
            </tr>

            {/* Security */}
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td rowSpan={2} className="px-6 py-4 font-bold text-green-400 border-r border-white/5 uppercase tracking-tighter">Security</td>
              <td className="px-6 py-4 font-mono text-white">configs</td>
              <td className="px-6 py-4 font-mono text-orange-400/80">XHS.PERM.SECURITY.CONFIGS</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Read server configuration telemetry.</td>
            </tr>
            <tr className="bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
              <td className="px-6 py-4 font-mono text-white">sensitiveData</td>
              <td className="px-6 py-4 font-mono text-orange-400/80">XHS.PERM.SECURITY.SENSITIVE_DATA</td>
              <td className="px-6 py-4 text-muted-foreground/60 italic">Access to unmasked request payloads.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsFooter 
        title="Technical Reference"
        description="Return to the main Plugin API interface and priority specifications."
        buttonText="Back to Reference"
        href="/docs/plugins/api-reference"
        iconName="Terminal"
      />
    </div>
  );
}
