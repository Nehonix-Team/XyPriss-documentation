import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Zap, ShieldAlert, CheckCircle, AlertTriangle, Bug, Target } from "lucide-react";

export default function HoneypotPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Honeypot Tarpit Architecture</SectionHeading>
      
      <p>The Honeypot Tarpit is a built-in security layer designed to instantly neutralize connections from malicious botnets, reconnaissance scanners, and automated exploit frameworks.</p>

      <SectionHeading level={2}>Overview</SectionHeading>
      <p>This module operates at the earliest phase of the request handling lifecycle, dropping malicious probes with an instant <code>HTTP 403 Forbidden</code> response before expensive operations like routing or session management occur.</p>

      <div className="flex gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl my-6">
        <Zap className="w-6 h-6 text-blue-400 shrink-0" />
        <div className="text-sm text-slate-400">
          <p className="font-semibold text-white mb-1">Enabled by Default</p>
          Honeypot Tarpit is active by default in all XyPriss instances to save CPU cycles and event-loop time that would otherwise be wasted on illegitimate traffic.
        </div>
      </div>

      <SectionHeading level={2}>Configuration</SectionHeading>
      <p>The Honeypot Tarpit is enabled by default. You can customize or extend its behavior via <code>ServerOptions</code>:</p>
      
      <SectionHeading level={3}>1. Basic Toggle</SectionHeading>
      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        honeypotTarpit: false, // Disables the automatic tarpit bypass
    },
});`} />

      <SectionHeading level={3}>2. Custom Trap Signatures</SectionHeading>
      <p>Extend the built-in database with application-specific patterns:</p>
      <CodeBlock language="typescript" code={`const app = createServer({
    security: {
        honeypotTarpit: {
            enabled: true,
            // Trap specific files
            exact: ["/my-internal-api-doc.pdf", "/debug-log.txt"],
            
            // Trap entire directory patterns
            prefixes: ["/internal-tools/", "/legacy-admin/"],
            
            // Trap specific segments anywhere in the URL
            segments: ["test-credentials", "root-access"]
        }
    }
});`} />

      <SectionHeading level={2}>The 6-Stage Pipeline</SectionHeading>
      <p>The tarpit uses a zero-false-positive strategy structured in a multi-stage validation pipeline:</p>
      
      <div className="space-y-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">1</span>
            Input Sanitization
          </h4>
          <p className="text-xs text-slate-400 m-0">Rejects malformed or oversized paths to stop buffer-probing payloads.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">2</span>
            URI Normalization
          </h4>
          <p className="text-xs text-slate-400 m-0">Resolves percent-encoding and path traversal (<code>../</code>) to defeat evasion vectors.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs">3</span>
            Exact Trap Match
          </h4>
          <p className="text-xs text-slate-400 m-0">Deterministic list of sensitive targets like <code>/.env</code>, <code>/.git</code>, and <code>/.aws/credentials</code>.</p>
        </div>
      </div>

      <SectionHeading level={2}>Why 403 over Socket Destroy?</SectionHeading>
      <p>XyPriss uses <code>403 Forbidden</code> instead of destroying the TCP socket because tearing down a shared Keep-Alive socket (common in proxies like Nginx) can penalize legitimate requests multiplexed over the same connection.</p>

      <Callout type="info">
        <strong>Zero Payload:</strong> Tarpit responses contain no HTTP body and no additional framework headers, minimizing the bandwidth used during neutralization.
      </Callout>

      <DocsFooter 
        title="Response Manipulation"
        description="Filter and mask sensitive data in outgoing responses automatically."
        buttonText="Next: Response Filter"
        href="/docs/security/response-manipulation"
        iconName="Target"
      />
    </div>
  );
}
