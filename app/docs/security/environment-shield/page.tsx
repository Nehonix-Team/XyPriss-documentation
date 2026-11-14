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
          <Shield size={16} /> Version Compatibility: XyPriss v9.14.35+
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
        Built as a low-level Go core embedded directly into the XHSC network engine, <strong>libXESS</strong> operates at the process supervision and runtime boundary layer before application code evaluation begins. It acts as a hardened runtime shield and filesystem honeypot — not a substitute for OS-level MAC policies or hardware HSM enclaves.
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
            By default, global <code className="text-primary font-mono">process.env</code> is shielded. System variables essential for OS stability pass through, while unwhitelisted access attempts return <code className="text-primary font-mono">undefined</code> (or trigger security audit logging in development profiles) and unauthorized file reads receive honeypot decoys.
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
const secretKey = __sys__.__env__.getStrict("JWT_SECRET");

// Ephemeral buffer retrieval with deterministic zeroization (no JS string materialized)
const signatureValid = __sys__.__env__.withSecret("WEBHOOK_HMAC_KEY", (keyBytes) => {
    return verifyHmac(payload, keyBytes);
});`}
          />

          <h4 className="text-sm font-bold text-white mt-6 mb-2">
            Declarative Configuration References (<code>&amp;(env).KEY</code>)
          </h4>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Configuration files (<code>xypriss.config.jsonc</code>) support declarative environment variable interpolation via the <code>&amp;(env).KEY</code> syntax:
          </p>
          <CodeBlock
            language="jsonc"
            code={`{
    "server": {
        "port": "&(env).PORT || 3000",
        "host": "&(env).HOST || '127.0.0.1'"
    },
    "security": {
        "csrf": {
            "secret": "&(env).CSRF_SECRET"
        }
    },
    "$vars": {
        "__port__": "&(env).PORT || 3000",
        "__db_url__": "&(env).DATABASE_URL"
    }
}`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="memory-boundaries">
        Memory &amp; Heap Retention Boundaries
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Understanding what <code>libXESS</code> guarantees in memory is essential for designing secure production services:
      </p>
      <div className="space-y-3 my-2">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-xs mb-1">At Rest (Before Retrieval)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Secrets are held exclusively in the <code>libXESS</code> supervisor vault. Before <code>get()</code>, <code>getStrict()</code>, or <code>withSecret()</code> is called, <strong>0 secret bytes</strong> appear in <code>process.env</code>, <code>/proc/&lt;PID&gt;/environ</code>, or the V8/JavaScriptCore heap.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white text-xs mb-1">After <code>get()</code> / <code>getStrict()</code></h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            JavaScript strings are immutable and managed by the runtime garbage collector (V8 / JSC). Once retrieved via <code>get()</code> or <code>getStrict()</code>, the value exists as a standard JS <code>string</code> in the heap until reclaimed by GC. <code>libXESS</code> cannot retroactively zeroize an immutable JS string.
          </p>
        </div>
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5">
          <h4 className="font-bold text-primary text-xs mb-1">Zeroizable Ephemeral Buffers (<code>withSecret</code>)</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            For cryptographic operations, signing, or native calls that do not require a JS <code>string</code>, use <code>__sys__.__env__.withSecret(key, (buf) =&gt; ...)</code>. It transfers the secret as raw bytes into a mutable <code>Uint8Array</code> and deterministically wipes it (<code>buf.fill(0)</code>) in a <code>finally</code> block as soon as the callback finishes (sync or async). Avoid decoding <code>buf</code> into a JS <code>string</code> inside the callback. Note that while <code>withSecret</code> wipes the application <code>Uint8Array</code> and avoids JS heap strings, it cannot retroactively wipe internal native buffers allocated by third-party primitives (such as OpenSSL contexts during <code>crypto.createHmac</code>).
          </p>
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

        <div>
          <h3 className="text-base font-bold text-white mb-2" id="scoped-packages">
            Scoped Package Environment Sandboxing (<code className="text-primary font-mono">$env.packages</code>)
          </h3>
          <Callout type="warning" title="Advisory ID: XSA-XESS-028">
            By default, <code className="text-primary font-mono">$env.whitelist</code> grants global access to whitelisted variables for both the host application and any unconfigured dependency in <code className="text-slate-300 font-mono">node_modules</code>. To prevent sensitive secrets from being accessible across the entire dependency graph, configure <strong>Scoped Package Sandboxes</strong> using <code className="text-primary font-mono">$env.packages</code>.
          </Callout>
          <p className="text-sm text-muted-foreground my-3 leading-relaxed">
            When a package is declared under <code className="text-primary font-mono">$env.packages</code>, its access to <code className="text-primary font-mono">process.env</code> is restricted to its own scoped <code className="text-primary font-mono">whitelist</code>. It <strong>cannot</strong> see the global <code className="text-primary font-mono">$env.whitelist</code> or default system keys unless <code className="text-primary font-mono">inheritGlobal: true</code> is explicitly enabled.
          </p>
          <CodeBlock
            language="jsonc"
            code={`{
  "$env": {
    // Global whitelist: accessible by host app and packages without a dedicated sandbox
    "whitelist": ["APP_PUBLIC_URL"],

    "packages": {
      // Dedicated sandbox for xypriss-security:
      // Only 'xypriss-security' can read these secrets from process.env.
      // Other packages (e.g. lodash, express) will receive undefined + [SECURITY] warning.
      "xypriss-security": {
        "whitelist": ["ENC_SECRET_KEY", "ENC_SECRET_SEED", "XYPRISS_SEC_WARNINGS"],
        "inheritGlobal": false // Default: does NOT inherit global whitelist
      },

      // Scoped access with global inheritance:
      "@stripe/stripe-node": {
        "whitelist": ["STRIPE_API_KEY"],
        "inheritGlobal": true // Can access STRIPE_API_KEY + global whitelist (APP_PUBLIC_URL, PORT, etc.)
      }
    }
  }
}`}
          />
          <div className="mt-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2 text-xs text-muted-foreground">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-2">
              Package Sandboxing Rules
            </h4>
            <p>
              <strong className="text-white">1. Scoped Isolation:</strong> A variable defined solely in <code className="text-slate-300 font-mono">packages[pkg].whitelist</code> can <strong>only</strong> be read by that specific package. All other callers (including other dependencies and undeclared packages) receive <code className="text-slate-300 font-mono">undefined</code>.
            </p>
            <p>
              <strong className="text-white">2. Selective Inheritance (<code className="text-primary font-mono">inheritGlobal</code>):</strong>{" "}
              <code className="text-slate-300 font-mono">false</code> (default) restricts the package exclusively to its explicit <code className="text-slate-300 font-mono">whitelist</code>;{" "}
              <code className="text-slate-300 font-mono">true</code> grants access to its scoped <code className="text-slate-300 font-mono">whitelist</code> <strong>plus</strong> all global whitelist and default system keys.
            </p>
            <p>
              <strong className="text-white">3. Undeclared Packages:</strong> Packages not listed in <code className="text-slate-300 font-mono">packages</code> retain standard access to the global <code className="text-slate-300 font-mono">$env.whitelist</code> and default system keys.
            </p>
          </div>
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
              <td className="p-3 text-slate-400 font-sans">Explicit list of variable keys permitted for direct <code className="text-slate-300 font-mono">process.env</code> access globally.</td>
            </tr>
            <tr>
              <td className="p-3 text-primary font-bold">$env.replaceDefaultWhitelist</td>
              <td className="p-3 text-slate-300">boolean</td>
              <td className="p-3 text-slate-300">false</td>
              <td className="p-3 text-slate-400 font-sans">When <code className="text-slate-300 font-mono">true</code>, discards all default system keys and enforces only the custom whitelist.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-primary font-bold">$env.packages</td>
              <td className="p-3 text-slate-300">Record&lt;string, PackageCfg&gt;</td>
              <td className="p-3 text-slate-500">undefined</td>
              <td className="p-3 text-slate-400 font-sans">Per-package scoped sandbox configurations (<code className="text-slate-300 font-mono">XSA-XESS-028</code>).</td>
            </tr>
            <tr>
              <td className="p-3 text-primary font-bold">$env.packages.&lt;pkg&gt;.whitelist</td>
              <td className="p-3 text-slate-300">string[]</td>
              <td className="p-3 text-slate-300">[]</td>
              <td className="p-3 text-slate-400 font-sans">Variables whitelisted strictly for the named package.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-primary font-bold">$env.packages.&lt;pkg&gt;.inheritGlobal</td>
              <td className="p-3 text-slate-300">boolean</td>
              <td className="p-3 text-slate-300">false</td>
              <td className="p-3 text-slate-400 font-sans">When <code className="text-slate-300 font-mono">true</code>, merges the global whitelist and default keys into this package&apos;s scope.</td>
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
              Use <code className="text-slate-300 font-mono">xfpm run</code>, <code className="text-slate-300 font-mono">xfpm dev</code>, <code className="text-slate-300 font-mono">xfpm start</code>, or <code className="text-slate-300 font-mono">xfpm exec</code> to engage libXESS confinement. Direct execution outside <code>xfpm</code> triggers <code className="text-slate-300 font-mono">XessShieldRequiredError</code>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Minimize JS Heap Retention</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Prefer <code>__sys__.__env__.withSecret()</code> for binary/crypto secrets. When a <code>string</code> is required by a third-party SDK, call <code>get()</code> / <code>getStrict()</code> at the latest possible moment in a short local scope rather than storing secrets in long-lived globals.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Verify Production Profile</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Setting <code>NODE_ENV=production</code> alone does not switch <code>__sys__.__env__.mode</code>. Explicitly configure the production profile and verify <code className="text-slate-300 font-mono">__sys__.__env__.mode === &quot;production&quot;</code> at startup.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Disable Heap Introspection</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Strictly disable <code>--inspect</code>, <code>v8.writeHeapSnapshot()</code>, and profiling endpoints in production so attackers cannot inspect JS strings already retrieved into the heap.
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
