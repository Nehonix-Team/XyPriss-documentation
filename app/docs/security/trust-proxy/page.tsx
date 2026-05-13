import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Network, ShieldCheck, Zap, AlertTriangle, Terminal, Layers, Lock, Server } from "lucide-react";

export default function TrustProxyPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Trust Proxy Configuration</SectionHeading>
      
      <p>XyPriss provides advanced trust proxy functionality for modern deployment scenarios including containers, load balancers, and cloud environments. This determines how the server handles <code>X-Forwarded-*</code> headers.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Network className="w-4 h-4" /> IP Detection
          </div>
          <p className="text-[10px] text-slate-400 m-0">Correctly identify the original client IP instead of the load balancer's IP address.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <ShieldCheck className="w-4 h-4" /> Protocol Accuracy
          </div>
          <p className="text-[10px] text-slate-400 m-0">Accurately detect if the request was made over HTTP or HTTPS through the proxy chain.</p>
        </div>
      </div>

      <SectionHeading level={2}>Supported Configuration Types</SectionHeading>
      <p>XyPriss supports several ways to define trusted proxies, from simple booleans to custom validation functions.</p>

      <SectionHeading level={3}>1. Boolean & Predefined Ranges</SectionHeading>
      <CodeBlock language="typescript" code={`// Trust all proxies (⚠️ Caution) / Don't trust any (Default)
trustProxy: true; 
trustProxy: false;

// Predefined Scenarios
trustProxy: "loopback"; // 127.0.0.0/8, ::1/128
trustProxy: "uniquelocal"; // 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16`} />

      <SectionHeading level={3}>2. CIDR and Exact IPs</SectionHeading>
      <CodeBlock language="typescript" code={`// Trust specific IP addresses or ranges
trustProxy: [
    "203.0.113.10",    // Exact IP
    "10.0.0.0/8",      // CIDR range
    "fc00::/7"         // IPv6 range
];`} />

      <SectionHeading level={2}>Deployment Examples</SectionHeading>
      
      <div className="space-y-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm">Kubernetes / Docker</h5>
          <CodeBlock language="typescript" code={`const app = createServer({
    server: {
        trustProxy: ["10.244.0.0/16", "10.96.0.0/12", "loopback"],
    },
});`} />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm">Production with Load Balancer</h5>
          <CodeBlock language="typescript" code={`const app = createServer({
    server: {
        trustProxy: ["203.0.113.10", "203.0.113.11", "loopback"],
    },
});`} />
        </div>
      </div>

      <SectionHeading level={2}>Request API</SectionHeading>
      <p>When trust proxy is enabled, the following request properties are automatically populated using the validated proxy chain:</p>
      <CodeBlock language="typescript" code={`app.get("/info", (req, res) => {
    res.json({
        ip: req.ip,             // Resolved Client IP
        ips: req.ips,           // Array of proxy hops
        protocol: req.protocol, // 'http' or 'https'
        secure: req.secure,     // true if connection is secure
    });
});`} />

      <Callout type="danger" title="IP Spoofing Risk">
        Only trust proxies that you explicitly control. Trusting untrusted proxies allows attackers to spoof their IP address by sending custom <code>X-Forwarded-For</code> headers.
      </Callout>

      <DocsFooter 
        title="Honeypot & Tarpit"
        description="Deflect and slow down automated attacks using deceptive security measures."
        buttonText="Next: Honeypot"
        href="/docs/security/honeypot"
        iconName="Zap"
      />
    </div>
  );
}
