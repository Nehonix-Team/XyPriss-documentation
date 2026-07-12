import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  EyeOff,
  ShieldCheck,
  AlertTriangle,
  Terminal,
  Layers,
  Lock,
  Cpu,
} from "lucide-react";

export default function ResponseManipulationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <EyeOff size={14} />
          Security
        </div>
        <SectionHeading level={1}>
          Response Manipulation Middleware (XHSC)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Dynamically modify JSON response bodies before they are transmitted to
          the client. Used for security masking and data transformation in
          multi-tenant environments.
        </p>
      </div>

      <Callout type="info" title="Note">
        As of version <strong>XHSC71226G4</strong>, this middleware is natively
        executed in Go (XHSC) instead of Node.js. It operates on the raw JSON
        payload before any compression algorithm (zstd, gzip) is applied.
      </Callout>

      <SectionHeading level={2} id="features">Features</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-2">
            <Layers size={14} className="text-primary" /> Dot Notation Paths
          </h4>
          <p className="text-[10px] text-muted-foreground">
            Target specific fields in nested objects using standard dot notation
            (e.g., <code>database.credentials.password</code>). Dot notation
            rules have the highest priority and overwrite generic rules.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-2">
            <Terminal size={14} className="text-primary" /> RegExp Support
          </h4>
          <p className="text-[10px] text-muted-foreground">
            Use literal Regular Expression objects to match and manipulate
            multiple keys across the entire response structure.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-2">
            <AlertTriangle size={14} className="text-primary" /> Automatic
            Object Masking
          </h4>
          <p className="text-[10px] text-muted-foreground">
            If a generic regex rule matches the key of a deeply nested object or
            array, the entire structural node is safely nuked and replaced with{" "}
            <code>[HIDDEN OBJECT]</code>.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-2">
            <Cpu size={14} className="text-primary" /> Go-Native Parsing
          </h4>
          <p className="text-[10px] text-muted-foreground">
            High-performance JSON traversal and regex compilation using{" "}
            <code>sonic</code> and <code>re2</code>, bypassing the Node.js
            event loop completely.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="configuration">Configuration</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The middleware is configured within the{" "}
        <code className="text-primary">responseManipulation</code> block of the
        server configuration.
      </p>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              {
                p: "enabled",
                t: "boolean",
                d: "Global toggle for the manipulation middleware.",
              },
              {
                p: "rules",
                t: "ResponseManipulationRule[]",
                d: "An array of rules defining target fields and their replacement logic.",
              },
              {
                p: "maxDepth",
                t: "number",
                d: "Maximum recursion depth for nested objects. Default: 10.",
              },
            ].map((opt, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-primary text-xs">
                  {opt.p}
                </td>
                <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">
                  {opt.t}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {opt.d}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading level={3}>ResponseManipulationRule</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Each rule in the <code className="text-primary">rules</code> array
        follows this structure:
      </p>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              {
                p: "field",
                t: "string | RegExp",
                d: "(Optional) Target field path (dot notation) or a RegExp object to match keys.",
              },
              {
                p: "valuePattern",
                t: "RegExp",
                d: "(Optional) RegExp pattern to match against the field's value. Only masks if the value matches. If field is omitted, it acts as a global rule on all string values.",
              },
              {
                p: "replacement",
                t: "any",
                d: "Value to replace the target field with.",
              },
              {
                p: "preserve",
                t: "number",
                d: "If the value is a string, specifies the number of characters to preserve at the beginning while masking the rest.",
              },
            ].map((opt, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-primary text-xs">
                  {opt.p}
                </td>
                <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">
                  {opt.t}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {opt.d}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="execution-order">
        Execution Order &amp; Precedence
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        To avoid conflicting rules and ensure predictable masking, XHSC enforces
        a strict execution hierarchy during tree traversal:
      </p>
      <ol className="list-decimal pl-6 space-y-3 text-sm text-muted-foreground mb-6">
        <li>
          <strong>Recursive Bottom-Up Traversal</strong>: The middleware
          traverses the JSON tree and applies generic string rules (
          <code className="text-primary">field</code> or{" "}
          <code className="text-primary">valuePattern</code>) at every nested
          level.
        </li>
        <li>
          <strong>Object/Array Nuke Policy</strong>: If a{" "}
          <code className="text-primary">field</code> regex rule matches a key
          that contains an array or object instead of a primitive string, the
          engine replaces the entire collection with{" "}
          <code className="text-primary">[HIDDEN OBJECT]</code> to prevent
          unintended leakage of inner values.
        </li>
        <li>
          <strong>Dot-Path Precedence</strong>:{" "}
          <code className="text-primary">applyDotPath</code> rules (e.g.{" "}
          <code>database.credentials.password</code>) are evaluated{" "}
          <strong>last</strong>, and strictly from the root level. This ensures
          that explicit structural overrides will systematically overwrite any
          generic masking applied by regex rules during the recursive phase.
        </li>
      </ol>

      <SectionHeading level={2} id="examples">Usage Examples</SectionHeading>

      <SectionHeading level={3}>
        1. Basic Field Masking (Dot Notation)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Mask a specific sensitive field inside a nested object. Because it uses
        dot-notation, it will overwrite any generic rule that might have applied
        to the same key.
      </p>
      <CodeBlock
        language="typescript"
        code={`responseManipulation: {
  enabled: true,
  rules: [
    { field: "database.credentials.password", replacement: "[DB_PASSWORD_HIDDEN]" }
  ]
}`}
      />

      <SectionHeading level={3}>
        2. RegExp-Based Multiple Field Masking
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Mask all fields containing{" "}
        <code className="text-primary">password</code>,{" "}
        <code className="text-primary">token</code>, or{" "}
        <code className="text-primary">apikey</code>. Note: use standard JS
        Regex modifiers (e.g., <code>/pattern/i</code>). Do not use inline
        modifiers like <code>/(?i)pattern/</code>.
      </p>
      <CodeBlock
        language="typescript"
        code={`responseManipulation: {
  enabled: true,
  rules: [
    { field: /password|token|secret|api_?key/i, preserve: 0 }
  ]
}`}
      />
      <Callout type="warning" title="Warning">
        If your regex is too broad (e.g., <code>/apikey/i</code>) and matches a
        key containing an array (e.g., <code>apiKeys: [...]</code>), the entire
        array will be replaced by <code>[HIDDEN OBJECT]</code>.
      </Callout>

      <SectionHeading level={3}>
        3. Surgical Content Masking (Global valuePattern)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Mask any string value matching a specific pattern across the entire JSON
        tree, regardless of the key name (e.g., hiding database stack traces or
        JWT tokens).
      </p>
      <CodeBlock
        language="typescript"
        code={`responseManipulation: {
  enabled: true,
  rules: [
    {
      valuePattern: /database error:[\\s\\S]*?failed at line/gis,
      preserve: 15
    },
    {
      valuePattern: /^eyJ[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+\\.[A-Za-z0-9_-]+$/,
      preserve: 10
    }
  ]
}`}
      />

      <SectionHeading level={2} id="internals">
        Internal Implementation Details
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The middleware works seamlessly with compression:
      </p>
      <ol className="list-decimal pl-6 space-y-3 text-sm text-muted-foreground mb-6">
        <li>
          <strong>Raw Interception</strong>:{" "}
          <code className="text-primary">ResponseManipulationMiddleware</code>{" "}
          sits inside <code className="text-primary">CompressionMiddleware</code>
          . It intercepts the raw JSON directly from the upstream router.
        </li>
        <li>
          <strong>Deserialization</strong>: It leverages{" "}
          <code className="text-primary">sonic</code> to unmarshal the payload
          into memory.
        </li>
        <li>
          <strong>Traversal</strong>: It applies the security masks via
          recursive mapping.
        </li>
        <li>
          <strong>Reserialization &amp; Compression</strong>: It serializes the
          sanitized object back to JSON bytes and forwards them to{" "}
          <code className="text-primary">CompressionMiddleware</code> to be
          compressed (if the payload exceeds the compression threshold, typically
          1024 bytes).
        </li>
      </ol>

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
