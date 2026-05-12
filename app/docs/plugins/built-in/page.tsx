"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Box, ShieldCheck, Zap, Activity, Lock, Settings, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BuiltInPluginsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Box size={14} />
          Official Extensions
        </div>
        <SectionHeading level={1}>Built-in Official Plugins</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss ships with a suite of production-grade, high-performance plugins designed to handle critical security, routing, and maintenance tasks out of the box. For a technical breakdown of the hooks these plugins use, see the <button onClick={() => router.push("/docs/plugins/api-reference")} className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline-flex items-center gap-1">Plugin API Reference <ChevronRight size={12} /></button>.
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
      <div className="space-y-4">
        <p>
          XEMS is the foundational security plugin for session management. It replaces traditional cookie-based JWTs with a server-side encrypted store, mitigating client-side tampering risks.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
            <ShieldCheck size={18} className="text-primary shrink-0 mt-1" />
            <div>
              <h5 className="font-bold text-white text-xs mb-1">AES-256-GCM Encryption</h5>
              <p className="text-[10px] text-muted-foreground">All session data is encrypted at rest in a native XHSC sidecar process.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
            <Lock size={18} className="text-blue-400 shrink-0 mt-1" />
            <div>
              <h5 className="font-bold text-white text-xs mb-1">Atomic Rotation</h5>
              <p className="text-[10px] text-muted-foreground">Opaque tokens are automatically rotated on every request to prevent replay attacks.</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          XEMS configuration is handled within the <code>server.xems</code> block of your configuration file.
        </p>
      </div>

      <SectionHeading level={2} id="route-optimization">2. Route Optimization Plugin</SectionHeading>
      <div className="space-y-4">
        <p>
          This plugin analyzes real-time traffic patterns and dynamically optimizes the framework's internal radix routing tree for maximum throughput.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2 text-center">
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
        <p className="text-sm text-muted-foreground">
          Optimization thresholds and analysis intervals can be tuned in the <code>plugins.routeOptimization</code> block.
        </p>
      </div>

      <SectionHeading level={2} id="maintenance">3. Server Maintenance Plugin</SectionHeading>
      <div className="space-y-4">
        <p>
          Ensures the health and stability of the server through automated resource monitoring and graceful recovery protocols.
        </p>
        <Callout type="info" title="Stability Guard">
          The maintenance plugin can automatically trigger alerts or restarts if memory usage exceeds configured limits, preventing catastrophic process failure.
        </Callout>
        <p className="text-sm text-muted-foreground">
          Resource thresholds and recovery actions are configured via the <code>plugins.serverMaintenance</code> entry.
        </p>
      </div>

      <div className="mt-12 p-8 rounded-3xl border border-primary/20 bg-primary/5 flex flex-col gap-4">
        <div className="space-y-1">
          <h4 className="font-bold text-white text-base">Configuring Built-in Plugins</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For detailed examples and a step-by-step guide on how to activate and tune these plugins in your project, refer to the Usage Tutorial.
          </p>
        </div>
        <button 
          onClick={() => router.push("/docs/plugins/tutorials/usage")}
          className="w-fit px-6 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all flex items-center gap-2 cursor-pointer border-none shadow-lg shadow-primary/20"
        >
          View Usage Tutorial <ChevronRight size={14} />
        </button>
      </div>

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
