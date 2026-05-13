import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import {
  EyeOff,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Terminal,
  Layers,
  Lock,
  Cpu,
} from "lucide-react";

export default function ResponseManipulationPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Response Manipulation</SectionHeading>

      <p>
        The Response Manipulation Middleware allows for the dynamic modification
        of JSON response bodies before they are transmitted to the client. This
        is primarily used for security purposes, such as masking sensitive data,
        or for data transformation in multi-tenant environments.
      </p>

      <SectionHeading level={2}>Core Features</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Layers className="w-4 h-4" /> Dot Notation
          </div>
          <p className="text-[10px] text-slate-400 m-0">
            Target specific fields in nested objects using standard dot notation
            (e.g., <code>user.auth.token</code>).
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Cpu className="w-4 h-4" /> Circular Safety
          </div>
          <p className="text-[10px] text-slate-400 m-0">
            Built-in support for circular references using XyPriss's
            high-performance <code>XStringify</code> engine.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Configuration</SectionHeading>
      <p>
        Configure manipulation rules globally in your server options. You can
        specify fields to mask, values to replace, and even use Regular
        Expressions for broad pattern matching.
      </p>

      <CodeBlock
        language="typescript"
        code={`const server = createServer({
        responseManipulation: {
            enabled: true,
            maxDepth: 10,
            rules: [
                { field: "api_key", preserve: 4 }, // ak-test-xyz -> ak-t***********
                { field: /.*(_id|Secret)$/, replacement: "[MASKED]" },
                { 
                    valuePattern: /prisma\\./i, 
                    replacement: "Internal error occurred." 
                }
            ]
        },
});`}
      />

      <SectionHeading level={2}>Usage Scenarios</SectionHeading>

      <SectionHeading level={3}>1. Surgical Content Masking</SectionHeading>
      <p>
        Hide database internals or sensitive error messages that might leak
        architectural details:
      </p>
      <CodeBlock
        language="json"
        title="Output Masking Example"
        code={`// Input
{ "message": "PrismaClientKnownRequestError: Invalid prisma.user.findUnique()..." }

// Output
{ "message": "Internal error occurred." }`}
      />

      <SectionHeading level={3}>2. Deep Object Protection</SectionHeading>
      <p>
        Ensure performance on large objects by limiting the depth of
        manipulation while still protecting deeply nested sensitive data.
      </p>
      <CodeBlock
        language="typescript"
        code={`responseManipulation: {
    enabled: true,
    maxDepth: 5,
    rules: [
        { field: "user.private_data", replacement: "[HIDDEN]" }
    ]
}`}
      />

      <SectionHeading level={2}>Internal Mechanism</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold shrink-0 mt-1">
            01
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Cloning</p>
            <p className="text-xs text-muted-foreground">
              The body is cloned using <code>XStringify</code>, allowing safe
              mutation without affecting the internal state of the request
              cycle.
            </p>
          </div>
        </div>
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold shrink-0 mt-1">
            02
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-1">
              Recursive Traversal
            </p>
            <p className="text-xs text-muted-foreground">
              The middleware performs a depth-limited traversal, applying rules
              in the order they are defined.
            </p>
          </div>
        </div>
      </div>

      <Callout type="info" title="Object Processing Only">
        The middleware only processes objects where{" "}
        <code>typeof data === 'object'</code>. Non-object responses (strings,
        numbers, buffers) are passed through without modification.
      </Callout>

      <DocsFooter
        title="XSec Security"
        description="Explore the high-performance Go-based cryptographic framework for enterprise security."
        buttonText="Next: XSec Engine"
        href="/docs/security/xsec-m"
        iconName="Lock"
      />
    </div>
  );
}
