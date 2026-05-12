import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Cpu, ShieldCheck, Activity, Layers, Lock, Key, CheckCircle, Zap } from "lucide-react";

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
              Orchestrates the execution of lifecycle and functional hooks across registered plugins.
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-4">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-1">Plugin Interceptor</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Powers the custom middleware and request/response interception logic within the pipeline.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="contract-verification">
        Contract Security Verification
      </SectionHeading>
      <p>
        Every plugin is subject to automated contract verification. XyPriss detects the origin of every loading request to prevent unauthorized or hidden module activation.
      </p>

      <SectionHeading level={2} id="optimization">
        Performance Optimization
      </SectionHeading>
      <p>
        The system uses <strong>Phase-Based Execution</strong> to categorize plugins by their functional intent (e.g., <code>SECURITY</code>, <code>NETWORK</code>, <code>CACHE</code>), ensuring microsecond-level overhead.
      </p>

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
          <p className="text-sm text-muted-foreground">
            <strong>Identity Attribution</strong>: Signed by authorized
            Developer IDs (Ed25519).
          </p>
        </li>
        <li className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong>Portable Integrity</strong>: SHA-256 validation via{" "}
            <code>xypriss.plugin.xsig</code> manifest.
          </p>
        </li>
      </ul>

      <SectionHeading level={2} id="lifecycle">
        Plugin Lifecycle
      </SectionHeading>
      <p>
        Plugins follow a strict, deterministic sequence of events managed by the{" "}
        <code>PluginHookRunner</code>.
      </p>

      <div className="flex flex-col gap-2 my-4">
        {["onRegister", "onServerStart", "onServerReady", "onServerStop"].map(
          (hook, i) => (
            <div
              key={hook}
              className="flex items-center gap-4 p-3 rounded-lg border border-white/5 bg-white/[0.02]"
            >
              <span className="text-[10px] font-bold text-muted-foreground w-4 text-center">
                {i + 1}
              </span>
              <code className="text-primary font-bold text-sm">{hook}</code>
              <div className="h-px flex-1 bg-white/5" />
            </div>
          ),
        )}
      </div>

      <DocsFooter
        title="Plugin Permissions Guide"
        description="Learn how to configure security capabilities and grant explicit access to protected APIs."
        buttonText="Read Permissions Guide"
        href="/docs/plugins/permissions"
        iconName="ShieldCheck"
      />
    </div>
  );
}
