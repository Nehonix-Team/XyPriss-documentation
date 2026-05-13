import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Target, ShieldCheck, Zap, AlertTriangle, Code, Filter } from "lucide-react";

export default function ResponseManipulationPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Response Manipulation Middleware</SectionHeading>
      
      <p>The Response Manipulation Middleware allows for the dynamic modification of JSON response bodies before they are transmitted to the client. This is primarily used for security purposes, such as masking sensitive data or hiding internal system details.</p>

      <SectionHeading level={2}>Core Features</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Code className="w-4 h-4" /> Dot Notation
          </div>
          <p className="text-xs text-slate-400">Target specific fields in nested objects (e.g., <code>user.auth.token</code>).</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Filter className="w-4 h-4" /> RegExp Support
          </div>
          <p className="text-xs text-slate-400">Use regular expressions to match and manipulate multiple keys across the response structure.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <ShieldCheck className="w-4 h-4" /> Circular Safety
          </div>
          <p className="text-xs text-slate-400">Built-in support for circular references using the high-performance <code>XStringify</code> engine.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Zap className="w-4 h-4" /> Depth Control
          </div>
          <p className="text-xs text-slate-400">Configurable recursion depth limits to ensure stability with large data structures.</p>
        </div>
      </div>

      <SectionHeading level={2}>Configuration</SectionHeading>
      <p>Configure the middleware within the <code>responseManipulation</code> block:</p>
      <CodeBlock language="typescript" code={`const server = createServer({
    security: {
        responseManipulation: {
            enabled: true,
            maxDepth: 10,
            rules: [
                { 
                    field: "api_key", 
                    preserve: 4 // Result: ak-t***********
                },
                { 
                    field: /.*(_id|Secret)$/, 
                    replacement: "[MASKED]" 
                },
                {
                    valuePattern: /prisma\\./i,
                    replacement: "Internal system error. Contact support."
                }
            ],
        },
    },
});`} />

      <SectionHeading level={3}>Rule Definition</SectionHeading>
      <table className="min-w-full text-sm text-slate-400 border-collapse border border-white/5 my-6">
        <thead>
          <tr className="bg-white/[0.05]">
            <th className="p-2 border border-white/5 text-left text-white">Property</th>
            <th className="p-2 border border-white/5 text-left text-white">Type</th>
            <th className="p-2 border border-white/5 text-left text-white">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400">field</td>
            <td className="p-2 border border-white/5 text-xs italic">string | RegExp</td>
            <td className="p-2 border border-white/5">Target field path or RegExp for keys.</td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400">valuePattern</td>
            <td className="p-2 border border-white/5 text-xs italic">RegExp</td>
            <td className="p-2 border border-white/5">Only mask if the value matches this pattern.</td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400">replacement</td>
            <td className="p-2 border border-white/5 text-xs italic">any</td>
            <td className="p-2 border border-white/5">Value to replace the target field with.</td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400">preserve</td>
            <td className="p-2 border border-white/5 text-xs italic">number</td>
            <td className="p-2 border border-white/5">Number of characters to keep at the start.</td>
          </tr>
        </tbody>
      </table>

      <SectionHeading level={2}>Implementation Details</SectionHeading>
      <p>The middleware uses a two-phase process to ensure data integrity and performance:</p>
      <Steps>
        <Step title="Immutable Cloning">
          The response body is cloned using <code>XStringify</code>, allowing for safe mutation without affecting the internal state of the request cycle.
        </Step>
        <Step title="Recursive Traversal">
          XyPriss performs a depth-limited traversal of the object tree, applying rules in the order they are defined.
        </Step>
      </Steps>

      <Callout type="info">
        <strong>Object Support:</strong> The middleware only processes JSON objects. Non-object responses (strings, buffers, etc.) are passed through without modification.
      </Callout>

      <DocsFooter 
        title="XSec Engine"
        description="Explore the high-performance security engine powering XyPriss."
        buttonText="Next: XSec Engine"
        href="/docs/security/xsec"
        iconName="Zap"
      />
    </div>
  );
}
