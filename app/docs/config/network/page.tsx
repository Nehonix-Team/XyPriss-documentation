import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Sliders, Zap, Shield, Activity, Globe, ArrowRightLeft } from "lucide-react";

export default function NetworkConfigPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Sliders size={14} />
          Configuration
        </div>
        <SectionHeading level={1}>Network Engine Plugins</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Advanced networking suite providing Connection Management, Compression, Rate Limiting, and Reverse Proxy capabilities.
        </p>
      </div>

      <div className="space-y-12 my-6">
        {/* Connection */}
        <div>
          <SectionHeading level={2} id="connection">Connection Management</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">Handles HTTP/2 server push, keep-alive, and intelligent connection pooling.</p>
          <CodeBlock 
            language="typescript"
            code={`network: {
    connection: {
        enabled: true,
        http2: { enabled: true, maxConcurrentStreams: 200, serverPush: true },
        keepAlive: { enabled: true, timeout: 60000, maxRequests: 200 },
        connectionPool: { maxConnections: 2000, idleTimeout: 120000 }
    }
}`}
          />
        </div>

        {/* Compression */}
        <div>
          <SectionHeading level={2} id="compression">Intelligent Compression</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">Response compression with threshold detection and multi-algorithm support (Brotli, Gzip).</p>
          <CodeBlock 
            language="typescript"
            code={`network: {
    compression: {
        enabled: true,
        algorithms: ["br", "gzip"],
        level: 6, // Balanced CPU vs size
        threshold: 1024, // Min size to compress
        contentTypes: ["text/html", "application/json", "text/css"]
    }
}`}
          />
        </div>

        {/* Rate Limiting */}
        <div>
          <SectionHeading level={2} id="rate-limiting">Rate Limiting</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">Distributed limiting using XyPriss cache with sliding-window and token-bucket strategies.</p>
          <CodeBlock 
            language="typescript"
            code={`network: {
    rateLimit: {
        enabled: true,
        strategy: "sliding-window",
        perIP: { requests: 100, window: "1m" },
        headers: { enabled: true, prefix: "X-RateLimit" }
    }
}`}
          />
        </div>

        {/* Proxy */}
        <div>
          <SectionHeading level={2} id="proxy">Reverse Proxy & Load Balancing</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">Enterprise-grade proxy with health checks, failover, and weighted round-robin balancing.</p>
          <CodeBlock 
            language="typescript"
            code={`network: {
    proxy: {
        enabled: true,
        upstreams: [
            { host: "b1.internal", port: 8080, weight: 2 },
            { host: "b2.internal", port: 8080, weight: 1 }
        ],
        loadBalancing: "weighted-round-robin",
        healthCheck: { enabled: true, interval: 30000, path: "/health" }
    }
}`}
          />
        </div>
      </div>

      <DocsFooter 
        title="Configs API"
        description="Access and manage your server configuration programmatically via the singleton API."
        buttonText="API Specs"
        href="/docs/config/api"
        iconName="Code"
      />
    </div>
  );
}
