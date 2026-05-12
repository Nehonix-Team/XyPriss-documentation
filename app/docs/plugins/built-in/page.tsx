import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Box, ShieldCheck, Zap, Activity, Lock, Settings } from "lucide-react";

export default function BuiltInPluginsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Box size={14} />
          Official Extensions
        </div>
        <SectionHeading level={1}>Built-in Official Plugins</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss ships with a suite of production-grade, high-performance plugins designed to handle critical security, routing, and maintenance tasks out of the box.
        </p>
      </div>

      <TechGraph 
        title="Official Plugin Stack"
        badge="Zero-Overhead Integration"
        nodes={[
          { iconName: "Lock", title: "XEMS", subtitle: "Session Security", color: "blue", active: true },
          { iconName: "Zap", title: "Radix", subtitle: "Route Optimizer", color: "primary" },
          { iconName: "Activity", title: "Maintenance", subtitle: "Health Watcher", color: "purple" },
          { iconName: "Settings", title: "Core", subtitle: "System Hooks", color: "orange" }
        ]}
        footer={[
          { label: "Native Go Core", description: "All official plugins leverage XHSC primitives for maximum throughput.", color: "blue" },
          { label: "Verified Signatures", description: "Built-in plugins are pre-signed and automatically trusted by G3.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="xems">1. XEMS (Encrypted Memory Store)</SectionHeading>
      <p>
        XEMS is the foundational security plugin for session management. It replaces traditional cookie-based JWTs with a server-side encrypted store, mitigating client-side tampering risks.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <li className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
          <ShieldCheck size={18} className="text-primary shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-xs mb-1">AES-256-GCM Encryption</h5>
            <p className="text-[10px] text-muted-foreground">All session data is encrypted at rest in a native XHSC sidecar process.</p>
          </div>
        </li>
        <li className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
          <Lock size={18} className="text-blue-400 shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-xs mb-1">Atomic Rotation</h5>
            <p className="text-[10px] text-muted-foreground">Opaque tokens are automatically rotated on every request to prevent replay attacks.</p>
          </div>
        </li>
      </ul>

      <CodeBlock 
        language="typescript"
        code={`// Configuration
server: {
    xems: {
        enable: true,
        ttl: "30m",
        autoRotation: true,
    }
}`}
      />

      <SectionHeading level={2} id="route-optimization">2. Route Optimization Plugin</SectionHeading>
      <p>
        This plugin analyzes real-time traffic patterns and dynamically optimizes the framework's internal radix routing tree for maximum throughput.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 text-center">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Hot-Route Analysis</p>
          <p className="text-[9px] text-muted-foreground leading-tight">Identifies most frequent endpoints.</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Radix Tuning</p>
          <p className="text-[9px] text-muted-foreground leading-tight">Reorganizes tree for hot routes.</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Hit Thresholds</p>
          <p className="text-[9px] text-muted-foreground leading-tight">Balances CPU vs throughput.</p>
        </div>
      </div>

      <CodeBlock 
        language="typescript"
        code={`plugins: {
    routeOptimization: {
        enabled: true,
        analysisInterval: 60000, // 1 minute
        optimizationThreshold: 50, // Hits
    }
}`}
      />

      <SectionHeading level={2} id="maintenance">3. Server Maintenance Plugin</SectionHeading>
      <p>
        Ensures the health and stability of the server through automated resource monitoring and graceful recovery protocols.
      </p>

      <Callout type="info" title="Stability Guard">
        The maintenance plugin can automatically trigger alerts or restarts if memory usage exceeds configured limits, preventing catastrophic process failure.
      </Callout>

      <CodeBlock 
        language="typescript"
        code={`plugins: {
    serverMaintenance: {
        enabled: true,
        memoryThreshold: 512, // MB
        autoRestart: true,
    }
}`}
      />

      <DocsFooter 
        title="API Reference"
        description="Explore the complete list of hook signatures and prioritized execution levels."
        buttonText="View API Reference"
        href="/docs/plugins/api-reference"
        iconName="Terminal"
      />
    </div>
  );
}
