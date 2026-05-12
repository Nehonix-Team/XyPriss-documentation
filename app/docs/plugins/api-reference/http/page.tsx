"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Activity, Zap, ShieldAlert, Terminal } from "lucide-react";

export default function HTTPHooksPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Activity size={14} />
          API Reference
        </div>
        <SectionHeading level={1}>HTTP Transaction Hooks</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          HTTP hooks allow plugins to intercept and transform network traffic at microsecond speeds, providing deep control over the request/response lifecycle.
        </p>
      </div>

      <TechGraph 
        title="Transaction Pipeline"
        badge="Zero-Copy Interception"
        nodes={[
          { iconName: "Terminal", title: "Ingress", subtitle: "onRequest", color: "blue", active: true },
          { iconName: "Zap", title: "Logic", subtitle: "Handler Execution", color: "primary" },
          { iconName: "Activity", title: "Egress", subtitle: "onResponse", color: "purple" },
          { iconName: "ShieldAlert", title: "Error", subtitle: "onError", color: "orange" }
        ]}
        footer={[
          { label: "Sub-ms Ingress", description: "Hooks are optimized to prevent request latency degradation.", color: "blue" },
          { label: "Atomic Context", description: "Request/Response objects are passed as isolated proxies.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="onRequest">onRequest</SectionHeading>
      <div className="space-y-4">
        <p>
          Intercepts incoming requests before routing logic is applied. This is the primary injection point for global security checks, custom headers, and payload validation.
        </p>
        <CodeBlock 
          language="typescript" 
          code="onRequest(req: XyPrisRequest, res: XyPrisResponse): void | Promise<void>" 
        />
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
            <Zap size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-1">Execution Guard</p>
            <p className="text-[10px] text-muted-foreground">Must execute in sub-millisecond durations for high-throughput stability.</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground italic">
          <strong>Permission ID:</strong> <code>XHS.HOOK.HTTP.REQUEST</code>
        </p>
      </div>

      <SectionHeading level={2} id="onResponse">onResponse</SectionHeading>
      <div className="space-y-4">
        <p>
          Intercepts outgoing responses immediately prior to transmission. This hook allows for final data transformation, header cleanup, or logging after the main handler has executed.
        </p>
        <CodeBlock 
          language="typescript" 
          code="onResponse(req: XyPrisRequest, res: XyPrisResponse, data: any): void | Promise<void>" 
        />
        <p className="text-xs text-muted-foreground italic">
          <strong>Permission ID:</strong> <code>XHS.HOOK.HTTP.RESPONSE</code>
        </p>
      </div>

      <SectionHeading level={2} id="onError">onError</SectionHeading>
      <div className="space-y-4">
        <p>
          Triggered during unhandled request-level exceptions. Plugins can use this to provide custom error formatting or to report failures to external observability platforms.
        </p>
        <CodeBlock 
          language="typescript" 
          code="onError(error: Error, req: XyPrisRequest, res: XyPrisResponse): void | Promise<void>" 
        />
        <p className="text-xs text-muted-foreground italic">
          <strong>Permission ID:</strong> <code>XHS.HOOK.HTTP.ERROR</code>
        </p>
      </div>

      <SectionHeading level={2} id="metrics">Metrics & Performance</SectionHeading>
      <p>
        For detailed performance monitoring, XyPriss provides secondary hooks specialized in telemetry data without blocking the main transaction flow.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h5 className="font-mono text-[10px] text-primary font-bold mb-1">onRouteError</h5>
          <p className="text-[10px] text-muted-foreground">Triggered when a specific route execution fails. ID: <code>XHS.HOOK.METRICS.ROUTE_ERROR</code></p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h5 className="font-mono text-[10px] text-purple-400 font-bold mb-1">onResponseTime</h5>
          <p className="text-[10px] text-muted-foreground">High-resolution latency data. ID: <code>XHS.HOOK.METRICS.LATENCY</code></p>
        </div>
      </div>

      <DocsFooter 
        title="Routing & Middleware"
        description="Learn how to register routes and inject scoped or global middleware."
        buttonText="View Routing Guide"
        href="/docs/plugins/api-reference/routing"
        iconName="Zap"
      />
    </div>
  );
}
