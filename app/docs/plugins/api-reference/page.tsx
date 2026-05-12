import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Terminal, Cpu, Zap, Activity, ShieldCheck, Box, List } from "lucide-react";

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

      <SectionHeading level={2} id="priority">Execution Priority Protocols</SectionHeading>
      <p>
        Priority levels dictate the relative execution order within the hook pipeline. Use lower levels for fundamental logic.
      </p>

      <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground tracking-widest">
            <tr>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Latency Target</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono">0</td>
              <td className="px-4 py-3 text-red-400 font-bold uppercase tracking-tighter text-xs">Critical</td>
              <td className="px-4 py-3 text-muted-foreground">{"< 0.1ms"}</td>
              <td className="px-4 py-3 text-muted-foreground italic text-xs">Fundamental system & security logic.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">1</td>
              <td className="px-4 py-3 text-orange-400 font-bold uppercase tracking-tighter text-xs">High</td>
              <td className="px-4 py-3 text-muted-foreground">{"< 0.5ms"}</td>
              <td className="px-4 py-3 text-muted-foreground italic text-xs">Security infra and primary routing.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">2</td>
              <td className="px-4 py-3 text-primary font-bold uppercase tracking-tighter text-xs">Normal</td>
              <td className="px-4 py-3 text-muted-foreground">{"< 2.0ms"}</td>
              <td className="px-4 py-3 text-muted-foreground italic text-xs">Standard feature implementations (Default).</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono">3</td>
              <td className="px-4 py-3 text-muted-foreground font-bold uppercase tracking-tighter text-xs">Background</td>
              <td className="px-4 py-3 text-muted-foreground">Async</td>
              <td className="px-4 py-3 text-muted-foreground italic text-xs">Non-critical telemetry and heavy tasks.</td>
            </tr>
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
