"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Activity, Terminal, Cpu, Box, ShieldAlert } from "lucide-react";

export default function LoggingOpsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Activity size={14} />
          API Reference
        </div>
        <SectionHeading level={1}>Logging & Operations</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Advanced hooks for system-level observability and infrastructure orchestration, powered by the high-performance XHSC Go core.
        </p>
      </div>

      <TechGraph 
        title="Operations Subsystem"
        badge="High-Resolution Observability"
        nodes={[
          { iconName: "Terminal", title: "Logging", subtitle: "onConsoleIntercept", color: "blue", active: true },
          { iconName: "Cpu", title: "Auxiliary", subtitle: "Child Servers", color: "primary" },
          { iconName: "Activity", title: "Metrics", subtitle: "Performance Sync", color: "purple" },
          { iconName: "Box", title: "Sandbox", subtitle: "Orchestration", color: "orange" }
        ]}
        footer={[
          { label: "Zero-Latency", description: "Logging interception uses a native IPC bridge for zero overhead.", color: "blue" },
          { label: "Isolation", description: "Auxiliary servers run in fully independent execution contexts.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="console-intercept">onConsoleIntercept</SectionHeading>
      <div className="space-y-4">
        <p>
          Powered by the native XHSC engine, this hook provides a performance-optimized stream of all console activity. It allows for advanced auditing, centralized logging, and secondary data sinks.
        </p>
        <Callout type="info" title="IPC Bridge">
          This hook is powered by the XHSC Go core via a secure IPC bridge, ensuring zero-latency log auditing even under extreme load.
        </Callout>
        <p className="text-xs text-muted-foreground italic">
          <strong>Permission ID:</strong> <code>XHS.PERM.LOGGING.CONSOLE_INTERCEPT</code> (Privileged).
        </p>
      </div>

      <SectionHeading level={2} id="auxiliary-server">onAuxiliaryServerDeploy</SectionHeading>
      <div className="space-y-4">
        <p>
          Enables the deployment of independent, isolated child server instances. This is the designated method for creating auxiliary services such as documentation engines (Swagger) or administrative interfaces.
        </p>
        <CodeBlock 
          language="typescript" 
          code={`onAuxiliaryServerDeploy(ops: OpsServerManager, server: XyPrissServer): void | Promise<void> {
    // Deploy a child server on port 4000
    ops.createAuxiliaryServer({ port: 4000 });
}`} 
        />
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h5 className="font-bold text-white text-xs mb-3 uppercase tracking-widest">OpsServerManager Methods</h5>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <code className="text-primary font-bold">createAuxiliaryServer(options)</code>
              <span>Deploys a new isolated XyPriss server on a specified port.</span>
            </li>
            <li className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <code className="text-primary font-bold">getRouteRegistry()</code>
              <span>Returns the full registry of routes from the primary application.</span>
            </li>
          </ul>
        </div>
        <p className="text-xs text-muted-foreground italic">
          <strong>Permission ID:</strong> <code>XHS.PERM.OPS.AUXILIARY_SERVER</code> (Privileged).
        </p>
      </div>

      <DocsFooter 
        title="Security Permissions"
        description="Explore the static capabilities and high-privilege access IDs."
        buttonText="View Security Guide"
        href="/docs/plugins/api-reference/security"
        iconName="Lock"
      />
    </div>
  );
}
