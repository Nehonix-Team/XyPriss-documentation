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
  Layers,
  Search
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

      <SectionHeading level={2} id="registry">Functional Domain Reference</SectionHeading>
      <p className="mb-4">
        The XyPriss hook ecosystem is categorized by functional domains. Explore the detailed technical documentation for each hook category below.
      </p>

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

      <SectionHeading level={2} id="unified-registry">Unified Registry</SectionHeading>
      <div className="p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-6 group my-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Search size={20} />
            <h4 className="text-lg">Unified Hook Registry</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-md">
            A single, searchable index of every hook, property, and capability ID available in XyPriss. Ideal for quick reference and scalable permission mapping.
          </p>
        </div>
        <button 
          onClick={() => router.push("/docs/plugins/api-reference/hooks")}
          className="px-6 py-3 rounded-xl bg-primary text-white !text-white text-sm font-bold hover:bg-primary/80 transition-all flex items-center gap-2 cursor-pointer border-none shadow-xl shadow-primary/20 shrink-0"
        >
          Open Registry <ChevronRight size={16} />
        </button>
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
