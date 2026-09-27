import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import {
  Shield,
  Lock,
  EyeOff,
  AlertTriangle,
  Terminal,
  Zap,
  Settings,
  Key,
  Cpu,
  Bug,
  FolderTree,
  CheckCircle2,
  XCircle,
  Sparkles,
} from "lucide-react";

export default function EnvironmentShieldPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Shield size={14} />
          Security Core
        </div>
        <SectionHeading level={1}>
          Environment Security Shield (XESS / libXESS)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss features a military-grade <strong>Environment Security Shield (XESS)</strong> powered by a Go-native <strong>libXESS</strong> engine designed to eliminate secret leakage, honeypot unauthorized filesystem reads, and enforce Zero-Trust process confinement.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Shield size={16} /> Version Compatibility: XyPriss v9.13.6+
        </div>
        <span className="text-slate-500">•</span>
        <div className="text-slate-300 font-mono">
          Status: <span className="text-green-400 font-bold">Hardened Zero-Trust Sandbox (libXESS Active)</span>
        </div>
      </div>

      <TechGraph 
        title="Security Shield & Honeypot Interception"
        badge="Zero-Leak Protection"
        nodes={[
          { iconName: "Terminal", title: "Access Attempt", subtitle: "process.env or fs.read", color: "blue" },
          { iconName: "Shield", title: "libXESS Core", subtitle: "", color: "primary", active: true },
          { iconName: "EyeOff", title: "Honeypot / Masking", subtitle: "Decoys or Undefined", color: "orange" },
          { iconName: "Lock", title: "Process Sandbox", subtitle: "Secrets Secured", color: "purple" }
        ]}
        footer={[
          { label: "Prevention", description: "Blocks third-party packages from harvesting database credentials or private keys.", color: "blue" },
          { label: "Canary Decoys", description: "Injects deceptive fake values into unauthorized filesystem reads.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="libxess-core">
        The libXESS Engine Core
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Built as a low-level Go core embedded directly into the XHSC network engine, <strong>libXESS</strong> operates ahead of runtime bootstrap:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <Cpu size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Go-Native libXESS Core
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Operates directly inside the native XHSC engine prior to runtime initialization, placing process memory and environment state inside a cryptographically verified boundary.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <Bug size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Active Honeypot Canaries
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            If rogue dependencies or automated scanners attempt direct filesystem reads on configuration files (<code className="text-slate-300 font-mono">fs.readFileSync('.env')</code>), libXESS intercepts reads and serves dynamically generated decoys instead of actual secrets.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <FolderTree size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Deterministic Subproject Scoping
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            In monorepos or multi-service setups, libXESS enforces strict boundaries between plugins and parent projects, preventing cross-tenant secret leakage.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <Lock size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Native Dual-Interlock Enforcement
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Both the <code className="text-primary font-mono">xfpm</code> supervisor and native <code className="text-primary font-mono">XHSC</code> network core actively verify active libXESS confinement; unshielded processes are blocked before binding ports.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="comparison">
        Comparison: Traditional Backends vs. XyPriss (libXESS)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Consider a scenario where an untrusted third-party npm package executes unauthorized file reading or variable inspection:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10 flex flex-col gap-3">
          <h4 className="font-bold text-red-400 flex items-center gap-2 text-xs uppercase tracking-widest">
            <XCircle size={16} /> Traditional Node.js / Bun Backends
          </h4>
          <CodeBlock
            language="typescript"
            code={`import fs from "fs";

// 1. Secret harvesting via process.env
console.log(process.env.DATABASE_URL);
// Output: "postgresql://admin:super_secret@db.prod:5432/db"
// Status: CRITICAL LEAK (All secrets globally exposed)

// 2. Direct filesystem read of .env file
console.log(fs.readFileSync(".env", "utf-8"));
// Output: Real plaintext secrets from disk
// Status: CRITICAL LEAK (Disk contents stolen)`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-green-500/5 border border-green-500/10 flex flex-col gap-3">
          <h4 className="font-bold text-green-400 flex items-center gap-2 text-xs uppercase tracking-widest">
            <CheckCircle2 size={16} /> XyPriss (Powered by libXESS)
          </h4>
          <CodeBlock
            language="typescript"
            code={`import fs from "fs";

// 1. Secret harvesting attempt via process.env
console.log(process.env.DATABASE_URL);
// Output: undefined (ACCESS BLOCKED)

// 2. Direct filesystem read attempt on .env
console.log(fs.readFileSync(".env", "utf-8"));
// Output: DATABASE_URL="xy_decoy_database_url_5c940b28"
// Status: HONEYPOT ENGAGED (Deceptive decoy values)

// 3. Authorized application code via official API
console.log(__sys__.__env__.get("DATABASE_URL"));
// Output: "postgresql://admin:super_secret@db.prod:5432/db"
// Status: SECURE (Authentic credentials in memory)`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="architectural-principles">
        Architectural Principles
      </SectionHeading>

      <div className="space-y-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Terminal size={16} className="text-primary" />
            1. Mandatory Supervised Execution via XFPM
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            All XyPriss applications must be launched through the official <strong>XFPM CLI</strong> (<code className="text-primary font-mono">xfpm dev</code>, <code className="text-primary font-mono">xfpm run</code>, <code className="text-primary font-mono">xfpm start</code>), which initializes libXESS. Direct unconfined execution (<code className="text-slate-400 font-mono">node index.js</code> or <code className="text-slate-400 font-mono">bun index.js</code>) is blocked by design.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <EyeOff size={16} className="text-primary" />
            2. Variable Masking &amp; Access Control
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            By default, global <code className="text-primary font-mono">process.env</code> is shielded. System variables essential for OS stability pass through, while business secrets return <code className="text-primary font-mono">undefined</code> and unauthorized file reads receive honeypot decoys.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Key size={16} className="text-primary" />
            3. Unified Developer API
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            All application configurations must be retrieved through the native system accessor:
          </p>
          <CodeBlock
            language="typescript"
            code={`// Discouraged: returns undefined for shielded variables
const apiKey = process.env.DATABASE_URL;

// Recommended: secure, authenticated access via libXESS
const dbUrl = __sys__.__env__.get("DATABASE_URL");

// Enforces existence (throws if missing or empty)
const secretKey = __sys__.__env__.getStrict("JWT_SECRET");`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="whitelisted-variables">
        Standard Whitelisted Variables
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        The following system variables remain directly accessible via <code className="text-primary font-mono">process.env</code> to ensure operating system and runtime interoperability:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">Variable</th>
              <th className="p-3 font-bold text-white">Purpose</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            <tr>
              <td className="p-3 text-primary font-bold">NODE_ENV</td>
              <td className="p-3 text-slate-400 font-sans">Active execution environment mode</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-primary font-bold">PORT</td>
              <td className="p-3 text-slate-400 font-sans">Configured listening port</td>
            </tr>
            <tr>
              <td className="p-3 text-primary font-bold">PATH</td>
              <td className="p-3 text-slate-400 font-sans">Operating system binary search path</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-primary font-bold">USER</td>
              <td className="p-3 text-slate-400 font-sans">Active operating system user</td>
            </tr>
            <tr>
              <td className="p-3 text-primary font-bold">HOME</td>
              <td className="p-3 text-slate-400 font-sans">Current user home directory</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-primary font-bold">LANG</td>
              <td className="p-3 text-slate-400 font-sans">System localization and charset</td>
            </tr>
            <tr>
              <td className="p-3 text-primary font-bold">COLORTERM</td>
              <td className="p-3 text-slate-400 font-sans">Terminal color capabilities</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-primary font-bold">XYPRISS_*</td>
              <td className="p-3 text-slate-400 font-sans">Official framework runtime parameters</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="declarative-configuration">
        Declarative Configuration ($env)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        For third-party dependencies that strictly require access to specific environment variables via <code className="text-primary font-mono">process.env</code>, configure explicit exceptions using the declarative <code className="text-primary font-mono">$env</code> block in <code className="text-primary font-mono">xypriss.config.jsonc</code>.
      </p>

      <div className="flex flex-col gap-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2">Extending the Default Whitelist</h3>
          <CodeBlock
            language="jsonc"
            code={`{
  "$env": {
    "whitelist": ["STRIPE_PUBLIC_KEY", "LEGACY_CLIENT_ID"]
  }
}`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2">Strict Whitelist Replacement</h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            For zero-tolerance production deployments requiring complete exclusion of default system variables, set <code className="text-primary font-mono">replaceDefaultWhitelist: true</code>:
          </p>
          <CodeBlock
            language="jsonc"
            code={`{
  "$env": {
    "whitelist": ["PORT", "CUSTOM_ALLOWED_VAR"],
    "replaceDefaultWhitelist": true
  }
}`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="config-reference">
        Configuration Reference
      </SectionHeading>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">Option</th>
              <th className="p-3 font-bold text-white">Type</th>
              <th className="p-3 font-bold text-white">Default</th>
              <th className="p-3 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            <tr>
              <td className="p-3 text-primary font-bold">$env</td>
              <td className="p-3 text-slate-300">Object</td>
              <td className="p-3 text-slate-500">undefined</td>
              <td className="p-3 text-slate-400 font-sans">Root environment security configuration block in <code className="text-slate-300 font-mono">xypriss.config.jsonc</code>.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-primary font-bold">$env.whitelist</td>
              <td className="p-3 text-slate-300">string[]</td>
              <td className="p-3 text-slate-300">[]</td>
              <td className="p-3 text-slate-400 font-sans">Explicit list of variable keys permitted for direct <code className="text-slate-300 font-mono">process.env</code> access.</td>
            </tr>
            <tr>
              <td className="p-3 text-primary font-bold">$env.replaceDefaultWhitelist</td>
              <td className="p-3 text-slate-300">boolean</td>
              <td className="p-3 text-slate-300">false</td>
              <td className="p-3 text-slate-400 font-sans">When <code className="text-slate-300 font-mono">true</code>, discards all default system keys and enforces only the custom whitelist.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="best-practices">
        Best Practices
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Adopt __sys__.__env__</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Treat <code className="text-slate-300 font-mono">process.env</code> as obsolete for application business logic.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Use getStrict() for Critical Secrets</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Fail fast during startup if database connection strings, encryption keys, or external tokens are missing.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Avoid Broad Whitelists</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Keep <code className="text-slate-300 font-mono">$env.whitelist</code> minimal. Only expose keys strictly required by third-party packages.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Always Launch via XFPM</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Use <code className="text-slate-300 font-mono">xfpm dev</code> locally and <code className="text-slate-300 font-mono">xfpm start</code> in production to engage libXESS confinement automatically.
            </p>
          </div>
        </div>
      </div>

      <DocsFooter 
        title="Explore Core Concepts"
        description="Return to the core architectural concepts of the XyPriss ecosystem."
        buttonText="View Core Concepts"
        href="/docs/xhsc-core"
        iconName="Cpu"
      />
    </div>
  );
}
