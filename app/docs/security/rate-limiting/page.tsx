import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Zap, ShieldCheck, Clock, AlertTriangle, Terminal, Layers, Lock, Shield } from "lucide-react";

export default function RateLimitingPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Rate Limiting</SectionHeading>
      
      <p>Protect your application against brute force and DDoS (Distributed Denial of Service) attacks by limiting the number of requests a single IP can make within a specific time window.</p>

      <SectionHeading level={2}>Global Configuration</SectionHeading>
      <p>Enable rate limiting globally in your server options. This applies the limit to all routes by default.</p>
      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const server = createServer({
    security: {
        rateLimit: {
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // Limit each IP to 100 requests per windowMs
            message: "Too many requests from this IP",
            standardHeaders: true, // Return rate limit info in the \`RateLimit-*\` headers
            legacyHeaders: false, // Disable the \`X-RateLimit-*\` headers
        },
    },
});`} />

      <SectionHeading level={2}>Per-Route Rate Limiting</SectionHeading>
      <p>
        In XyPriss, per-route rate limiting is enforced natively within the routing definition for maximum efficiency. 
        Please refer to the <Link href="/docs/routing/advanced#rate-limiting" className="text-primary hover:underline font-bold">Advanced Routing Features</Link> documentation 
        for the correct implementation details and examples.
      </p>

      <SectionHeading level={2}>Configuration Options</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Clock className="w-4 h-4" /> windowMs
          </div>
          <p className="text-[10px] text-slate-400 m-0">The time frame for which requests are checked/remembered. Specified in milliseconds.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Shield className="w-4 h-4" /> max
          </div>
          <p className="text-[10px] text-slate-400 m-0">The maximum number of connections to allow during the <code>windowMs</code> before returning a 429 response.</p>
        </div>
      </div>

      <SectionHeading level={2}>Security Best Practices</SectionHeading>
      <div className="space-y-4 my-8">
        <Callout type="tip">
          <strong>Authentication Endpoints:</strong> Always implement stricter rate limits on authentication endpoints (login, password reset) to mitigate brute-force attacks.
        </Callout>
        
        <ul className="list-none p-0 space-y-2">
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 text-green-400 mt-1 shrink-0" />
            <span><strong>Standard Headers:</strong> Enable <code>standardHeaders</code> to let clients know their current rate limit status via response headers.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 text-green-400 mt-1 shrink-0" />
            <span><strong>Custom Messages:</strong> Use clear, descriptive error messages to inform users when they've been rate limited.</span>
          </li>
        </ul>
      </div>

      <DocsFooter 
        title="Request Signatures"
        description="Verify the authenticity and integrity of incoming requests using cryptographic signatures."
        buttonText="Next: Request Signatures"
        href="/docs/security/signatures"
        iconName="Lock"
      />
    </div>
  );
}
