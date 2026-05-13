import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { ShieldAlert, ShieldCheck, Zap, AlertTriangle, Terminal, Layers, Lock, Activity } from "lucide-react";

export default function HoneypotPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Honeypot Tarpit</SectionHeading>
      
      <p>The <strong>Honeypot Tarpit</strong> is a built-in security layer designed to instantly neutralize connections from malicious botnets, reconnaissance scanners, and automated exploit frameworks. It operates at the earliest phase of the request handling lifecycle to save CPU cycles.</p>

      <SectionHeading level={2}>Enable / Disable</SectionHeading>
      <p>By default, the Honeypot Tarpit is <strong>enabled</strong>. You can explicitly disable it in your server configuration if you need to capture malicious requests in your application layer.</p>
      
      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        honeypotTarpit: false, // Set to false to disable the tarpit
    },
});`} />

      <SectionHeading level={2}>The 6-Stage Pipeline</SectionHeading>
      <p>The Tarpit applies a zero-false-positive strategy using a deterministic pipeline before any expensive routing or session management occurs:</p>
      
      <Steps>
        <Step title="Input Sanitization">
          Rejects malformed or oversized paths to stop buffer-probing payloads.
        </Step>
        <Step title="URI Normalization">
          Translates percent-encoding and resolves path traversal combinations (<code>../</code>).
        </Step>
        <Step title="Exact Trap Match">
          Intersects probes for sensitive targets like <code>/.env</code>, <code>/.git</code>, or <code>/.aws/credentials</code>.
        </Step>
        <Step title="Directory Prefix Match">
          Ensures resources extending from trapped base paths (e.g. <code>/.ssh/</code>) are blocked.
        </Step>
        <Step title="Extension Watcher">
          Sniffs for extensions linked to probing, such as <code>.tfstate</code>, <code>.pem</code>, or <code>.DS_Store</code>.
        </Step>
        <Step title="Isolated Path Segment Checks">
          Looks for specific folder markers like <code>wp-admin</code>, <code>phpmyadmin</code>, or <code>heapdump</code>.
        </Step>
      </Steps>

      <SectionHeading level={2}>Why 403 Forbidden?</SectionHeading>
      <p>XyPriss uses a lightweight <code>403 Forbidden</code> response instead of tearing down the TCP socket. This avoids penalizing legitimate requests that might be multiplexed over the same Keep-Alive connection in reverse proxy or XHSC bridge environments.</p>

      <div className="my-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl flex gap-4">
        <Activity className="w-6 h-6 text-blue-400 shrink-0" />
        <div className="text-sm text-slate-400">
          <p className="font-semibold text-white mb-1">Performance Neutralization</p>
          Drop malicious probes with minimal overhead. No HTTP body or framework-level headers are appended to the response, ensuring maximum efficiency.
        </div>
      </div>

      <Callout type="info" title="Deterministic Logic">
        The exact trap match uses O(1) logic via a pre-compiled <code>Set</code> of known malicious paths, ensuring that legitimate traffic is never delayed by complex pattern matching.
      </Callout>

      <DocsFooter 
        title="Response Manipulation"
        description="Cleanse and protect sensitive data in outgoing responses before they reach the client."
        buttonText="Next: Response Manipulation"
        href="/docs/security/response-manipulation"
        iconName="Shield"
      />
    </div>
  );
}
