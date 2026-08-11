import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Layers, Cpu, CheckCircle2 } from "lucide-react";

export default function XtrsRateLimitingPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XTRS (XyPriss Temporal Rate Shield)</SectionHeading>
      
      <p>
        <strong>XTRS</strong> (<em>XyPriss Temporal Rate Shield</em>) is an enterprise-grade security module integrated into the XyPriss web framework. 
        It provides multi-window rate limiting executed directly at the native <strong>XHSC</strong> (Hyper-System Core) Go engine layer.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2 text-sm">
            <Cpu className="w-4 h-4" /> Native Engine Delegation
          </div>
          <p className="text-[10px] text-slate-400 m-0">Evaluated at the compiled Go core level to eliminate runtime overhead on the Node.js event loop.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2 text-sm">
            <Layers className="w-4 h-4" /> Multi-Window Evaluation
          </div>
          <p className="text-[10px] text-slate-400 m-0">Apply concurrent window constraints simultaneously (e.g. short burst protection with long-term quota enforcement).</p>
        </div>
      </div>

      <SectionHeading level={2}>Key Features</SectionHeading>
      
      <div className="space-y-3 my-6">
        <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/5 rounded-lg text-sm text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
          <div>
            <strong className="text-white">Temporal Expressions:</strong> Configure rate limits using intuitive human-readable duration strings (<code>10/1s</code>, <code>300/1m</code>, <code>5000/1h</code>, <code>10000/1d</code>).
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/5 rounded-lg text-sm text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
          <div>
            <strong className="text-white">Configurable Lock Durations (<code>blockDuration</code> / <code>retryAfter</code>):</strong> Specify distinct penalty or cool-down windows when limits are breached (e.g., locking requests for <code>30s</code>, <code>5m</code>, or <code>1h</code>).
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-white/[0.01] border border-white/5 rounded-lg text-sm text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
          <div>
            <strong className="text-white">Granular Response Control:</strong> Define default global messages or per-rule custom response messages and HTTP status codes.
          </div>
        </div>
      </div>

      <SectionHeading level={2}>Technical Guide & Configuration</SectionHeading>

      <SectionHeading level={3}>1. Basic Multi-Window Setup</SectionHeading>
      <p>Configure multiple concurrent sliding windows globally on your server instance:</p>
      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const app = createServer({
    server: { port: 8085 },
    security: {
        enabled: true,
        rateLimit: {
            xtrs: {
                rules: [
                    "5/10s",    // Maximum 5 requests per 10 seconds (burst limit)
                    "300/1m",   // Maximum 300 requests per minute
                    "5000/1h",  // Maximum 5,000 requests per hour
                ],
            },
        },
    },
});`} />

      <SectionHeading level={3}>2. Per-Rule Custom Messages & Lock Duration</SectionHeading>
      <p>Each rule can specify custom error messages, status codes, and cool-down penalties:</p>
      <CodeBlock language="typescript" code={`const app = createServer({
    server: { port: 8085 },
    security: {
        enabled: true,
        rateLimit: {    
            xtrs: {
                rules: [
                    // Standard rule with default message
                    "5/10s",

                    // Custom rule with specific message and lock duration
                    {
                        rule: "20/1m",
                        message: "Minute request quota exceeded. Access temporarily blocked.",
                        blockDuration: "30s", // Lock duration of 30 seconds
                        statusCode: 429,
                    },
                ],

                // Global error message fallback
                message: "XTRS Alert: Rate limit exceeded. Please wait before retrying.",
            },
        },
    },
});`} />

      <Callout type="tip" title="Route-Level XTRS">
        XTRS rate limiting can also be attached directly to individual routes or route groups. Refer to the{" "}
        <Link href="/docs/routing/advanced#rate-limiting" className="text-primary hover:underline font-bold">
          Advanced Routing Documentation
        </Link>{" "}
        for route-level syntax.
      </Callout>

      <SectionHeading level={2}>API Reference</SectionHeading>

      <SectionHeading level={3}><code>XtrsOptions</code></SectionHeading>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="py-2 px-3 font-semibold">Property</th>
              <th className="py-2 px-3 font-semibold">Type</th>
              <th className="py-2 px-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-white/5">
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">rules</td>
              <td className="py-2 px-3 font-mono text-slate-300">XtrsRuleInput[]</td>
              <td className="py-2 px-3">Array of XTRS rate limit expressions (<code>"10/1s"</code>) or configuration objects.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">limit</td>
              <td className="py-2 px-3 font-mono text-slate-300">XtrsRuleInput | XtrsRuleInput[]</td>
              <td className="py-2 px-3">Single expression or array alias for XTRS rules.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">message</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | Record&lt;string, any&gt;</td>
              <td className="py-2 px-3">Global default error payload returned when limits are exceeded.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">statusCode</td>
              <td className="py-2 px-3 font-mono text-slate-300">number</td>
              <td className="py-2 px-3">Global default HTTP status code (Default: <code>429</code>).</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={3}><code>XtrsRuleConfig</code> (Per-Rule Configuration)</SectionHeading>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="py-2 px-3 font-semibold">Property</th>
              <th className="py-2 px-3 font-semibold">Type</th>
              <th className="py-2 px-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-white/5">
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">rule</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | &#123; max: number, windowMs: number &#125;</td>
              <td className="py-2 px-3">Expression string (e.g. <code>"20/1m"</code>) or explicit window object.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">message</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | Record&lt;string, any&gt;</td>
              <td className="py-2 px-3">Response payload specific to this rule.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">statusCode</td>
              <td className="py-2 px-3 font-mono text-slate-300">number</td>
              <td className="py-2 px-3">HTTP status code specific to this rule.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">blockDuration / retryAfter</td>
              <td className="py-2 px-3 font-mono text-slate-300">string | number</td>
              <td className="py-2 px-3">Lock or cool-down duration specific to this rule.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Supported Time Units</SectionHeading>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="py-2 px-3 font-semibold">Unit Category</th>
              <th className="py-2 px-3 font-semibold">Identifiers</th>
              <th className="py-2 px-3 font-semibold">Representation</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-white/5">
            <tr>
              <td className="py-2 px-3 font-bold text-white">Milliseconds</td>
              <td className="py-2 px-3 font-mono text-slate-300">ms, millisecond, milliseconds</td>
              <td className="py-2 px-3 font-mono text-cyan-400">"500ms"</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-bold text-white">Seconds</td>
              <td className="py-2 px-3 font-mono text-slate-300">s, sec, second, seconds</td>
              <td className="py-2 px-3 font-mono text-cyan-400">"10s"</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-bold text-white">Minutes</td>
              <td className="py-2 px-3 font-mono text-slate-300">m, min, minute, minutes</td>
              <td className="py-2 px-3 font-mono text-cyan-400">"1m"</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-bold text-white">Hours</td>
              <td className="py-2 px-3 font-mono text-slate-300">h, hr, hour, hours</td>
              <td className="py-2 px-3 font-mono text-cyan-400">"1h"</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-bold text-white">Days</td>
              <td className="py-2 px-3 font-mono text-slate-300">d, day, days</td>
              <td className="py-2 px-3 font-mono text-cyan-400">"1d"</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Parameter Resolution Hierarchy</SectionHeading>
      <p>When a rate limit evaluation triggers a violation, XTRS resolves parameters using the following priority order:</p>
      
      <ol className="list-decimal pl-5 space-y-2 text-slate-300 text-sm my-4">
        <li>
          <strong className="text-white">Rule Specific Configuration:</strong> Properties defined directly on the <code>XtrsRuleConfig</code> item.
        </li>
        <li>
          <strong className="text-white">Global XTRS Configuration:</strong> Properties defined on <code>security.rateLimit.xtrs</code>.
        </li>
        <li>
          <strong className="text-white">RateLimit Default Configuration:</strong> Properties defined on <code>security.rateLimit</code>.
        </li>
      </ol>

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
