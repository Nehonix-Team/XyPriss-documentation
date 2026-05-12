import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Cpu, ShieldCheck, Activity, Layers, Lock, Key, CheckCircle } from "lucide-react";

export default function PluginSystemGuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Cpu size={14} />
          Core Architecture
        </div>
        <SectionHeading level={1}>Plugin System Guide</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The <strong>XyPriss Plugin</strong> System is a modular,
          high-performance architecture designed to extend the framework's
          capabilities while maintaining strict security boundaries via the{" "}
          <strong>Capability-Based Security Model</strong>.
        </p>
      </div>

      <TechGraph
        title="Plugin Management Pipeline"
        badge="Security-First Orchestration"
        nodes={[
          {
            iconName: "Cpu",
            title: "Loader",
            subtitle: "Dynamic Loading",
            color: "blue",
          },
          {
            iconName: "Layers",
            title: "Registry",
            subtitle: "Dependency Map",
            color: "blue",
          },
          {
            iconName: "ShieldCheck",
            title: "Security",
            subtitle: "Restricted Proxy",
            color: "primary",
            active: true,
          },
          {
            iconName: "Activity",
            title: "Runner",
            subtitle: "Hook Lifecycle",
            color: "purple",
          },
        ]}
        footer={[
          {
            label: "Modularity",
            description:
              "Specialized sub-modules handle discovery, validation, and execution.",
            color: "blue",
          },
          {
            label: "Isolation",
            description:
              "Enforces contract verification and restricted server access for every plugin.",
            color: "purple",
          },
        ]}
      />

      <SectionHeading level={2} id="core-architecture">
        Core Architecture
      </SectionHeading>
      <p>
        Unlike monolithic plugin systems, XyPriss decomposes management into
        specialized sub-modules that work in harmony:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Cpu size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-1">Plugin Loader</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Handles dynamic discovery and initialization of plugins from
              configuration and files.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
            <Layers size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-1">
              Plugin Registry
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Manages global registration state and ensures unique naming and
              correct execution order.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-1">
              Plugin Security
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enforces contract verification and creates the Restricted Server
              Proxy for isolation.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
            <Activity size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-1">Hook Runner</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Orchestrates the execution of lifecycle and functional hooks
              across registered plugins.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="restricted-server">
        Security Model: The Restricted Server
      </SectionHeading>
      <p>
        To prevent plugins from accidentally or maliciously compromising the
        core framework, XyPriss does not provide direct access to the{" "}
        <code>app</code> instance. Instead, each plugin receives a{" "}
        <code>PluginServer</code> proxy.
      </p>

      <div className="my-6 space-y-4">
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-orange-500/5">
          <Lock size={20} className="text-orange-400 shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-sm mb-1">
              <code>app</code> Protection
            </h5>
            <p className="text-xs text-muted-foreground">
              The <code>app</code> object in the plugin context only exposes a
              subset of safe methods (<code>get</code>, <code>post</code>,{" "}
              <code>use</code>, etc.).
            </p>
          </div>
        </div>
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-orange-500/5">
          <Lock size={20} className="text-orange-400 shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-sm mb-1">
              Immutability Enforcement
            </h5>
            <p className="text-xs text-muted-foreground">
              Plugins cannot add, delete, or modify properties on the global
              application instance.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="zero-trust">
        Zero-Trust Integrity Layer
      </SectionHeading>
      <p>
        In the G3 architecture, the security model is extended with a mandatory
        Zero-Trust integrity layer that validates every byte of code.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <li className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <Key size={18} className="text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">Identity Attribution</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Signed by authorized Developer IDs (Ed25519) to ensure non-repudiation.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <ShieldCheck size={18} className="text-green-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">Author Key Pinning</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Strictly enforces trusted keys to prevent unauthorized execution or "Evil Upgrades".
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <CheckCircle size={18} className="text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">Portable Integrity</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              SHA-256 validation via <code>xypriss.plugin.xsig</code> manifest ensures code immutability.
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <Activity size={18} className="text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">Deep Audit</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              XHSC core performs an automated security audit at startup against all signatures.
            </p>
          </div>
        </li>
      </ul>

      <Callout type="warning" title="Contract Verification">
        Every plugin is subject to <strong>Contract Security Verification</strong>. XHSC automatically detects the origin of loading requests. Unauthorized or hidden loading attempts from untrusted locations will trigger an immediate security violation.
      </Callout>

      <SectionHeading level={2} id="performance">
        Performance Optimization
      </SectionHeading>
      <p>
        The system is designed for zero-overhead execution using specialized classification:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm">Phase-Based Execution</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Plugins are categorized by <code>PluginType</code> (e.g., <code>SECURITY</code>, <code>NETWORK</code>, <code>CACHE</code>) to minimize path latency.
          </p>
        </div>
        <div className="space-y-2">
          <h4 className="font-bold text-white text-sm">Priority Control</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Definitions from <code>CRITICAL</code> to <code>BACKGROUND</code> ensure that mission-critical hooks execute with absolute precedence.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="lifecycle">
        Plugin Lifecycle
      </SectionHeading>
      <p>
        Plugins follow a strict, deterministic sequence of events managed by the{" "}
        <code>PluginHookRunner</code>.
      </p>

      <div className="flex flex-col gap-2 my-4">
        {[
          { name: "onRegister", desc: "Discovery and metadata validation." },
          { name: "onServerStart", desc: "Execution starts when server structure is ready." },
          { name: "onServerReady", desc: "Triggered when server is fully active and listening." },
          { name: "onServerStop", desc: "Graceful cleanup before process termination." }
        ].map((hook, i) => (
          <div
            key={hook.name}
            className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <span className="text-xs font-bold text-muted-foreground w-6 text-center">
              0{i + 1}
            </span>
            <div className="flex flex-col">
              <code className="text-primary font-bold text-sm">{hook.name}</code>
              <span className="text-[10px] text-muted-foreground">{hook.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <DocsFooter
        title="Plugin Development Guide"
        description="Learn how to build, test, and publish professional XyPriss plugins with native safety."
        buttonText="Authoring Tutorial"
        href="/docs/plugins/development-guide"
        iconName="Code"
      />
    </div>
  );
}
