"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Zap, Activity, Box, ShieldCheck, Key } from "lucide-react";

export default function LifecycleHooksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Zap size={14} />
          API Reference
        </div>
        <SectionHeading level={1}>Lifecycle Hooks</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss enforces a strict <strong>Zero-Trust</strong> policy for all lifecycle hooks. These hooks execute at critical server phases, from registration to shutdown.
        </p>
      </div>

      <TechGraph 
        title="Lifecycle Execution Order"
        badge="Deterministic Startup"
        nodes={[
          { iconName: "Key", title: "onRegister", subtitle: "Instantiation", color: "blue" },
          { iconName: "Zap", title: "onServerStart", subtitle: "Bootstrap", color: "primary", active: true },
          { iconName: "Activity", title: "onServerReady", subtitle: "Listening", color: "purple" },
          { iconName: "Box", title: "onServerStop", subtitle: "Shutdown", color: "orange" }
        ]}
        footer={[
          { label: "Sync/Async", description: "All hooks support both synchronous and asynchronous execution.", color: "blue" },
          { label: "Verification", description: "Restricted hooks require explicit permission authorization.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="overview">Overview</SectionHeading>
      <p>
        Lifecycle hooks are designed to provide high-performance integration points with minimal overhead. By default, hooks that can execute arbitrary logic during server bootstrap or shutdown are blocked unless explicitly authorized.
      </p>

      <SectionHeading level={2} id="onRegister">onRegister</SectionHeading>
      <div className="space-y-4">
        <p>
          Executed during plugin initialization. This hook should be used for internal state preparation and non-asynchronous configurations.
        </p>
        <CodeBlock language="typescript" code="onRegister(): void | Promise<void>" />
        <p className="text-xs text-muted-foreground italic">
          <strong>Permission ID:</strong> <code>XHS.HOOK.LIFECYCLE.REGISTER</code> (Implicitly granted to all plugins).
        </p>
      </div>

      <SectionHeading level={2} id="onServerStart">onServerStart</SectionHeading>
      <div className="space-y-4">
        <p>
          Executed during the initial phase of server startup, prior to engine activation. Useful for preparing global resources, database connections, or side-car processes.
        </p>
        <CodeBlock language="typescript" code="onServerStart(): void | Promise<void>" />
        <Callout type="warning" title="Restricted Hook">
          This is a restricted hook. Execution requires the <code>XHS.HOOK.LIFECYCLE.SERVER_START</code> permission.
        </Callout>
      </div>

      <SectionHeading level={2} id="onServerReady">onServerReady</SectionHeading>
      <div className="space-y-4">
        <p>
          Executed when the server starts listening on its primary port. Ideal for starting background workers or logging server availability.
        </p>
        <CodeBlock language="typescript" code="onServerReady(port: number): void | Promise<void>" />
        <Callout type="warning" title="Restricted Hook">
          This is a restricted hook. Execution requires the <code>XHS.HOOK.LIFECYCLE.SERVER_READY</code> permission.
        </Callout>
      </div>

      <SectionHeading level={2} id="onServerStop">onServerStop</SectionHeading>
      <div className="space-y-4">
        <p>
          Executed during the graceful shutdown sequence. Use this to flush logs, close connections, and release hardware resources.
        </p>
        <CodeBlock language="typescript" code="onServerStop(): void | Promise<void>" />
        <Callout type="warning" title="Restricted Hook">
          This is a restricted hook. Execution requires the <code>XHS.HOOK.LIFECYCLE.SERVER_STOP</code> permission.
        </Callout>
      </div>

      <SectionHeading level={2} id="security">Lifecycle Security</SectionHeading>
      <div className="space-y-4">
        <p>
          If a plugin defines a security policy (<code>allowedHooks</code>), it <strong>must</strong> explicitly include the lifecycle hook IDs to execute them.
        </p>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h5 className="font-bold text-white text-xs mb-3 uppercase tracking-widest">Global Policy Toggle</h5>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            For development environments, you can bypass explicit whitelisting using the <code>allowLifecycleByDefault</code> option.
          </p>
          <CodeBlock 
            language="typescript"
            code={`// xypriss.config.ts
{
    plugins: {
        allowLifecycleByDefault: true, // Restores legacy behavior (Default: false)
    },
}`}
          />
        </div>
      </div>

      <DocsFooter 
        title="HTTP Hooks Reference"
        description="Explore the request and response interception hooks for transaction processing."
        buttonText="View HTTP Hooks"
        href="/docs/plugins/api-reference/http"
        iconName="Activity"
      />
    </div>
  );
}
