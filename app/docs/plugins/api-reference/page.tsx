import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Terminal, Cpu, Zap, Activity, ShieldCheck, Box, List, ShieldAlert, Lock } from "lucide-react";

export default function PluginAPIReferencePage() {
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

      <SectionHeading level={2} id="interface">XyPriss Plugin Interface Specification</SectionHeading>
      <p>
        The <code>XyPriss Plugin</code> interface defines the contract between the core engine and external modules. Plugins must adhere to this structure for pipeline compatibility.
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

      <SectionHeading level={2} id="registry">Unified Hook Registry</SectionHeading>
      <p>
        The following hooks and permissions are available for XyPriss plugins, categorized by their functional domain.
      </p>

      <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-[10px] text-left">
          <thead className="bg-white/10 uppercase font-bold text-muted-foreground tracking-widest">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Hook/Property</th>
              <th className="px-4 py-3">Permission ID</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { cat: "Lifecycle", hook: "onRegister", id: "XHS.HOOK.LIFECYCLE.REGISTER", desc: "Executed during initial instantiation." },
              { cat: "Lifecycle", hook: "onServerStart", id: "XHS.HOOK.LIFECYCLE.SERVER_START", desc: "Restricted: Server bootstrap phase." },
              { cat: "Lifecycle", hook: "onServerReady", id: "XHS.HOOK.LIFECYCLE.SERVER_READY", desc: "Restricted: Server is listening." },
              { cat: "Lifecycle", hook: "onServerStop", id: "XHS.HOOK.LIFECYCLE.SERVER_STOP", desc: "Restricted: Graceful shutdown sequence." },
              { cat: "HTTP", hook: "onRequest", id: "XHS.HOOK.HTTP.REQUEST", desc: "Executed for every incoming request." },
              { cat: "HTTP", hook: "onResponse", id: "XHS.HOOK.HTTP.RESPONSE", desc: "Executed prior to response transmission." },
              { cat: "HTTP", hook: "onError", id: "XHS.HOOK.HTTP.ERROR", desc: "Triggered during unhandled exceptions." },
              { cat: "Routing", hook: "registerRoutes", id: "XHS.PERM.ROUTING.REGISTER_ROUTES", desc: "Programmatic registration of routes." },
              { cat: "Logging", hook: "onConsoleIntercept", id: "XHS.PERM.LOGGING.CONSOLE_INTERCEPT", desc: "Privileged: Capture native console activity." },
              { cat: "Management", hook: "managePlugins", id: "PLG.MANAGEMENT.MANAGE_PLUGINS", desc: "Restricted: Runtime plugin auditing and control." },
              { cat: "Security", hook: "sensitiveData", id: "XHS.PERM.SECURITY.SENSITIVE_DATA", desc: "Privileged: Access unmasked payloads." }
            ].map((item, i) => (
              <tr key={i}>
                <td className="px-4 py-3 font-bold text-white/40">{item.cat}</td>
                <td className="px-4 py-3 font-mono text-primary">{item.hook}</td>
                <td className="px-4 py-3 font-mono text-muted-foreground">{item.id}</td>
                <td className="px-4 py-3 text-muted-foreground italic">{item.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="protocols">Hook Protocols</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            <h5 className="font-bold text-white text-sm">onRegister</h5>
          </div>
          <p className="text-xs text-muted-foreground">Invoked immediately upon registration. Used for synchronous preparation and early state allocation.</p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-purple-400" />
            <h5 className="font-bold text-white text-sm">onRequest/onResponse</h5>
          </div>
          <p className="text-xs text-muted-foreground">Must execute in sub-millisecond durations. Used for validation, transformation, and header injection.</p>
        </div>
      </div>

      <SectionHeading level={2} id="stability">Error Handling & Stability</SectionHeading>
      <p>
        XyPriss implements a "Fail-Safe" execution model. Errors in plugin hooks are isolated to prevent cascading failures that could destabilize the core engine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
          <div className="flex items-center gap-2 text-red-400">
            <ShieldAlert size={18} />
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

      <Callout type="info" title="IPC Instrumentation">
        Hooks like <code>onConsoleIntercept</code> are powered by the XHSC Go core via a secure IPC bridge, ensuring zero-latency log auditing even under extreme load.
      </Callout>

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
