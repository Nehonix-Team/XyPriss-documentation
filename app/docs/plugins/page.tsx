import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Puzzle, Shield, Zap, Box, Lock, Code, Terminal, Rocket } from "lucide-react";

export default function PluginsOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Puzzle size={14} />
          Extension Ecosystem
        </div>
        <SectionHeading level={1}>
          XyPriss Plugin Ecosystem
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Plugins in XyPriss are fully integrated, secure modules that hook deep into the framework's lifecycle, enabling modular extensions without compromising performance.
        </p>
      </div>

      <TechGraph 
        title="Execution Lifecycle Phases"
        badge="Performance-First Architecture"
        nodes={[
          { iconName: "Zap", title: "Network", subtitle: "Phase 1: Ingress", color: "blue" },
          { iconName: "Shield", title: "Security", subtitle: "Phase 2: Shielding", color: "primary", active: true },
          { iconName: "Box", title: "Cache", subtitle: "Phase 3: Storage", color: "purple" },
          { iconName: "Terminal", title: "Logic", subtitle: "Phase 4: Handler", color: "purple" }
        ]}
        footer={[
          { label: "Predictable Latency", description: "Plugins execute in deterministic phases to ensure microsecond overhead.", color: "blue" },
          { label: "Isolated Context", description: "Every plugin runs in a restricted proxy to prevent global state mutation.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="why-plugins">Why XyPriss Plugins?</SectionHeading>
      <p>
        If you are wondering why you should build a plugin instead of just writing standard middleware, the answer lies in the <strong>Capability-Based Security</strong> and <strong>Deep Integration</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
            <Zap size={24} />
          </div>
          <h4 className="font-bold text-white">Full Lifecycle Access</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Plugins can initialize database connections on server start, monitor real-time traffic, and handle graceful resource shutdowns.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Shield size={24} />
          </div>
          <h4 className="font-bold text-white">Zero-Trust Sandbox</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Each plugin runs in a sandboxed <code>PluginServer</code> proxy. They cannot read sensitive environment variables or configs without explicit permission.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Lock size={24} />
          </div>
          <h4 className="font-bold text-white">Permission Control</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Plugins must declare their intentions. You hold the final keys to their permissions via the Capability-Based security model.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
            <Rocket size={24} />
          </div>
          <h4 className="font-bold text-white">XFPM Distribution</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Official plugins can be published to the NPM/XFPM ecosystem and instantly integrated by the community.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="philosophy">Secure by Default</SectionHeading>
      <Callout type="info" title="Zero Compromise Policy">
        XyPriss philosophy insists that extending your application should never mean compromising it. Plugins are <strong>prohibited</strong> from overwriting core server properties or reading hardware-local secrets silently.
      </Callout>

      <SectionHeading level={2} id="getting-started">Next Steps</SectionHeading>
      <p>
        Explore our structured guides to integrate third-party plugins or build your own high-performance extensions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Code size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Development Guide</p>
              <p className="text-[10px] text-muted-foreground">Create and publish your first plugin.</p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
             <Zap size={14} className="text-primary" />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Lock size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Security & Permissions</p>
              <p className="text-[10px] text-muted-foreground">Manage plugin capabilities and trust.</p>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
             <Zap size={14} className="text-purple-400" />
          </div>
        </div>
      </div>

      <DocsFooter 
        title="Plugin System Guide"
        description="Deep dive into the modular core (Registries, Interceptors, and Restricted Proxies)."
        buttonText="Read System Guide"
        href="/docs/plugins/system-guide"
        iconName="Box"
      />
    </div>
  );
}
