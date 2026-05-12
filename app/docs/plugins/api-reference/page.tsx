"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Activity, 
  ShieldCheck, 
  Box, 
  Lock, 
  ChevronRight, 
  Layers 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function PluginAPIReferencePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Terminal size={14} />
          Technical Reference
        </div>
        <SectionHeading level={1}>
          Plugin API Technical Reference
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Comprehensive technical specification for the XyPriss Plugin Architecture, including interface definitions, hook protocols, and execution prioritization.
        </p>
      </div>

      <TechGraph 
        title="Performance Categorization"
        badge="Execution Stack Optimization"
        nodes={[
          { iconName: "ShieldCheck", title: "Security", subtitle: "Access Control", color: "blue" },
          { iconName: "Zap", title: "Network", subtitle: "Payload Optimization", color: "primary", active: true },
          { iconName: "Box", title: "Cache", subtitle: "TTL Management", color: "purple" },
          { iconName: "Activity", title: "Metrics", subtitle: "Telemetry Ingestion", color: "orange" }
        ]}
        footer={[
          { label: "Phase-Based", description: "The engine uses PluginType metadata to optimize internal execution order.", color: "blue" },
          { label: "Sub-ms Ingress", description: "All transaction hooks are tuned for sub-millisecond execution.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="interface">XyPrissPlugin Interface Specification</SectionHeading>
      <p>
        The <code>XyPrissPlugin</code> interface defines the contract between the core engine and external modules. Plugins must adhere to this structure for pipeline compatibility.
      </p>

      <div className="my-6">
        <CodeBlock 
          language="typescript" 
          code={`export interface XyPrissPlugin {
  // Identity Metadata
  name: string;
  version: string;
  type?: PluginType; // SECURITY | NETWORK | CACHE | etc.

  // Lifecycle Hooks
  onRegister?(error?: Error | null): void | Promise<void>;
  onServerStart?(server: PluginServer): void | Promise<void>;
  onServerReady?(server: PluginServer): void | Promise<void>;
  onServerStop?(server: PluginServer): void | Promise<void>;

  // Transaction Interception
  onRequest?(req: Request, res: Response, next: NextFunction): void | Promise<void>;
  onResponse?(req: Request, res: Response): void | Promise<void>;
  onError?(error: Error, req: Request, res: Response, next?: NextFunction): void | Promise<void>;

  // Security & Metrics
  onSecurityAttack?(attackData: any, req: Request, res: Response): void | Promise<void>;
  onResponseTime?(time: number, req: Request, res: Response): void | Promise<void>;
  onRateLimit?(limitData: any, req: Request, res: Response): void | Promise<void>;

  // Subsystem Logic
  registerRoutes?(app: XyPrissApp): void;
  middlewarePriority?: "first" | "normal" | "last";
}`}
        />
      </div>

      <SectionHeading level={2} id="registry">Unified Hook Registry</SectionHeading>
      <p className="mb-4">
        A consolidated index of all available hooks, properties, and capabilities. For detailed technical specifications, click on a category in the navigation cards above or use the table below.
      </p>

      <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-[10px] uppercase font-bold text-muted-foreground tracking-[0.2em]">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Hook / Property</th>
              <th className="px-4 py-3">Permission ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[10px]">
            {/* Lifecycle */}
            <tr className="bg-white/[0.01]">
              <td rowSpan={4} className="px-4 py-3 font-bold text-primary border-r border-white/5">Lifecycle</td>
              <td className="px-4 py-3 font-mono text-white">onRegister</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.REGISTER</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">onServerStart</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.SERVER_START</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">onServerReady</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.SERVER_READY</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">onServerStop</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.LIFECYCLE.SERVER_STOP</td>
            </tr>

            {/* HTTP */}
            <tr className="bg-white/[0.02]">
              <td rowSpan={4} className="px-4 py-3 font-bold text-purple-400 border-r border-white/5">HTTP</td>
              <td className="px-4 py-3 font-mono text-white">onRequest</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.HTTP.REQUEST</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="px-4 py-3 font-mono text-white">onResponse</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.HTTP.RESPONSE</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="px-4 py-3 font-mono text-white">onError</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.HTTP.ERROR</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="px-4 py-3 font-mono text-white">onRouteError</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.HOOK.METRICS.ROUTE_ERROR</td>
            </tr>

            {/* Routing */}
            <tr className="bg-white/[0.01]">
              <td rowSpan={5} className="px-4 py-3 font-bold text-blue-400 border-r border-white/5">Routing</td>
              <td className="px-4 py-3 font-mono text-white">registerRoutes</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.PERM.ROUTING.REGISTER_ROUTES</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">bypassNamespace</td>
              <td className="px-4 py-3 font-mono text-red-400/80">XHS.PERM.ROUTING.BYPASS_NAMESPACE</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">overwriteProtected</td>
              <td className="px-4 py-3 font-mono text-red-400/80">XHS.PERM.ROUTING.OVERWRITE_PROTECTED</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">middleware</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">XHS.PERM.HTTP.MIDDLEWARE</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">globalMiddleware</td>
              <td className="px-4 py-3 font-mono text-orange-400/80">XHS.PERM.HTTP.GLOBAL_MIDDLEWARE</td>
            </tr>

            {/* Ops & Logs */}
            <tr className="bg-white/[0.02]">
              <td rowSpan={2} className="px-4 py-3 font-bold text-orange-400 border-r border-white/5">Ops & Logs</td>
              <td className="px-4 py-3 font-mono text-white">onAuxiliaryServerDeploy</td>
              <td className="px-4 py-3 font-mono text-orange-400/80">XHS.PERM.OPS.AUXILIARY_SERVER</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="px-4 py-3 font-mono text-white">onConsoleIntercept</td>
              <td className="px-4 py-3 font-mono text-orange-400/80">XHS.PERM.LOGGING.CONSOLE_INTERCEPT</td>
            </tr>

            {/* Security */}
            <tr className="bg-white/[0.01]">
              <td rowSpan={2} className="px-4 py-3 font-bold text-green-400 border-r border-white/5">Security</td>
              <td className="px-4 py-3 font-mono text-white">configs</td>
              <td className="px-4 py-3 font-mono text-orange-400/80">XHS.PERM.SECURITY.CONFIGS</td>
            </tr>
            <tr className="bg-white/[0.01]">
              <td className="px-4 py-3 font-mono text-white">sensitiveData</td>
              <td className="px-4 py-3 font-mono text-orange-400/80">XHS.PERM.SECURITY.SENSITIVE_DATA</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          { 
            title: "Lifecycle Hooks", 
            desc: "Bootstrap, startup, and shutdown sequence integration.", 
            path: "/docs/plugins/api-reference/lifecycle",
            icon: Zap,
            color: "text-primary"
          },
          { 
            title: "HTTP Hooks", 
            desc: "Request and response interception for transaction processing.", 
            path: "/docs/plugins/api-reference/http",
            icon: Activity,
            color: "text-purple-400"
          },
          { 
            title: "Routing & Middleware", 
            desc: "Namespace sandboxing and programmatic route registration.", 
            path: "/docs/plugins/api-reference/routing",
            icon: Layers,
            color: "text-blue-400"
          },
          { 
            title: "Security Permissions", 
            desc: "Static capability IDs and high-privilege access control.", 
            path: "/docs/plugins/api-reference/security",
            icon: Lock,
            color: "text-orange-400"
          },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group text-left cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                <item.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>

      <SectionHeading level={2} id="priority">Middleware Priority Protocols</SectionHeading>
      <p>
        Developers can control the relative execution order of their plugin middleware within the pipeline using the <code>middlewarePriority</code> property.
      </p>

      <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground tracking-widest">
            <tr>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            <tr>
              <td className="px-4 py-3 font-mono text-primary">First</td>
              <td className="px-4 py-3 font-mono">"first"</td>
              <td className="px-4 py-3 text-muted-foreground">Executes before all other registered plugin middleware.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">Normal</td>
              <td className="px-4 py-3 font-mono">"normal"</td>
              <td className="px-4 py-3 text-muted-foreground">Default priority. Executes in registration order.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">Last</td>
              <td className="px-4 py-3 font-mono">"last"</td>
              <td className="px-4 py-3 text-muted-foreground">Executes after all other registered plugin middleware.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="stability">Error Handling & Stability</SectionHeading>
      <p>
        XyPriss implements a "Fail-Safe" execution model. Errors in plugin hooks are isolated to prevent cascading failures that could destabilize the core engine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <ShieldCheck size={18} />
            <h4 className="font-bold text-sm">Hook Isolation</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Every hook execution is wrapped in a dedicated error boundary. Synchronous and asynchronous exceptions are caught, logged with the plugin ID, and bypassed to allow the pipeline to continue.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
          <div className="flex items-center gap-2 text-orange-400">
            <Lock size={18} />
            <h4 className="font-bold text-sm">Conflict Prevention</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The engine detects "Double-Finalization" (calling <code>next()</code> after <code>res.send()</code>). If detected, it halts the middleware chain for that request to prevent illegal write attempts.
          </p>
        </div>
      </div>

      <DocsFooter 
        title="Plugin System Guide"
        description="Return to the core architectural concepts of the XyPriss plugin engine."
        buttonText="View System Guide"
        href="/docs/plugins/system-guide"
        iconName="Layers"
      />
    </div>
  );
}
