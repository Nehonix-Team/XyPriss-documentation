import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Shield,
  Lock,
  Zap,
  User,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
  Key,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  FileCode,
} from "lucide-react";
import Link from "next/link";

export default function EnvironmentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Shield size={14} />
          System Module
        </div>
        <SectionHeading level={1}>Environment API (__sys__.__env__)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The <code className="text-primary font-mono font-bold">__sys__.__env__</code> API is the application's hardened Security Nervous System. Operating on a Zero-Trust architecture, it ensures strict project-level isolation, proxy-shielded secret protection, and deterministic environment management.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs">
        <div className="flex items-center gap-2 text-primary font-bold">
          <Sparkles size={16} /> Version Compatibility: XyPriss v9.12.67+
        </div>
        <span className="text-slate-500">•</span>
        <div className="text-slate-300 font-mono">
          Status: <span className="text-green-400 font-bold">Hardened Zero-Trust Sandbox</span>
        </div>
      </div>

      <Callout type="warning" title="Security Shield Active">
        Direct access to <code className="text-primary font-bold">process.env</code> is neutralized via a restrictive Proxy. Third-party enumeration or non-whitelisted reads will return <code className="text-primary font-mono">undefined</code> and emit security warnings to <code className="text-slate-300 font-mono">stderr</code>.
      </Callout>

      <Callout type="info" title="Configurable Shield (XESS)">
        You can declaratively configure the <strong>Environment Security Shield (XESS)</strong> via <code className="text-primary font-mono">xypriss.config.jsonc</code> to whitelist custom keys. See the{" "}
        <Link href="/docs/security/environment-shield#declarative-configuration" className="text-primary font-bold underline">
          XESS Configuration Guide
        </Link>{" "}
        for details.
      </Callout>

      <SectionHeading level={2} id="security-layers">
        Zero-Trust Security Architecture (5-Layer Shield)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The environment subsystem enforces a Zero-Trust Sandboxing model built on five independent security layers:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <Lock size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              1. Map-Isolated Storage
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Variables reside in a global store keyed by an unexported module-scoped <code className="text-primary font-mono">Symbol</code> (<code className="text-slate-300 font-mono">XY_ENV_STORE_KEY</code>). Access is strictly tied to the caller's project root via stack inspection (<code className="text-primary font-mono">getCallerProjectRoot()</code>).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <Shield size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              2. Initialization Guard
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Any read or write attempt prior to formal initialization of <code className="text-primary font-mono">EnvApi</code> is immediately blocked, preventing startup race condition leaks.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <CheckCircle2 size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              3. Value Sanitization
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Automatic rejection of values containing carriage returns (<code className="text-slate-300 font-mono">\r</code>, <code className="text-slate-300 font-mono">\n</code>) or null bytes (<code className="text-slate-300 font-mono">\0</code>), preventing log corruption, CRLF injection, and HTTP header manipulation.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-primary mb-1">
            <FolderTree size={18} />
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              4. Deterministic Project Scoping
            </h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Modules and plugins can only access the <code className="text-primary font-mono">.env</code> of their own project folder (<code className="text-slate-300 font-mono">node_modules</code> + <code className="text-slate-300 font-mono">package.json</code>). Plugins running in separate workspaces cannot access host secrets.
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-2 my-2">
        <div className="flex items-center gap-3 text-primary mb-1">
          <Layers size={18} />
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">
            5. Restrictive Proxy Shield (process.env)
          </h4>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Standard <code className="text-primary font-mono">process.env</code> access is intercepted by a hardened Proxy. Non-whitelisted keys return <code className="text-primary font-mono">undefined</code>. Enumeration via <code className="text-slate-300 font-mono">Object.keys()</code>, <code className="text-slate-300 font-mono">JSON.stringify()</code>, or spread operators is restricted to a tight whitelist of system essentials.
        </p>
      </div>

      <SectionHeading level={2} id="read-methods">
        Read Methods
      </SectionHeading>

      <div className="space-y-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-mono">
            .get(key: string, defaultValue?: string): string | undefined
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Retrieves a variable safely. When a <code className="text-primary font-mono">defaultValue</code> is provided, TypeScript correctly infers the return type as <code className="text-primary font-mono">string</code>.
          </p>
          <CodeBlock
            language="typescript"
            code={`// Infers 'string'
const port = __sys__.__env__.get("PORT", "3000");

// Infers 'string | undefined'
const apiKey = __sys__.__env__.get("API_KEY");`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-mono">
            .getStrict(key: string, options?: &#123; rejectEmpty?: boolean &#125;): string
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            The gold standard for production entry points. Throws an <code className="text-primary font-mono">EnvAccessError</code> if the key is missing or empty, failing fast during boot.
          </p>
          <CodeBlock
            language="typescript"
            code={`// Throws if JWT_SECRET is missing
const secret = __sys__.__env__.getStrict("JWT_SECRET");

// Throws if DB_PASS is missing OR is an empty string ""
const pass = __sys__.__env__.getStrict("DB_PASS", { rejectEmpty: true });`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-mono">
            .has(key: string): boolean
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Returns <code className="text-primary font-mono">true</code> if the key exists in the store, regardless of its value (including empty strings).
          </p>
          <CodeBlock
            language="typescript"
            code={`if (__sys__.__env__.has("MAINTENANCE_MODE")) {
    handleMaintenance();
}`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-mono">
            .all(options?: &#123; keys?: string[] &#125;): EnvSnapshot
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Generates a frozen point-in-time snapshot of current variables. Use key filtering to avoid logging secrets.
          </p>
          <CodeBlock
            language="typescript"
            code={`const publicConfig = __sys__.__env__.all({
    keys: ["PUBLIC_API_URL", "FEATURE_FLAG_X"],
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="write-methods">
        Write Methods
      </SectionHeading>

      <div className="space-y-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-mono">
            .set(key: string, value: string): void
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Registers or modifies a variable. Automatically sanitizes values against CRLF and null characters.
          </p>
          <CodeBlock
            language="typescript"
            code={`__sys__.__env__.set("TEMPORARY_ACCESS_TOKEN", "xy-token-123");`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-mono">
            .delete(key: string): void
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Securely removes a variable from the in-memory store and from <code className="text-primary font-mono">process.env</code> if applicable.
          </p>
          <CodeBlock
            language="typescript"
            code={`__sys__.__env__.delete("TEMPORARY_ACCESS_TOKEN");`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="execution-modes">
        Execution Context (Readonly Modes)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The environment mode is set once during initialization and is <code className="text-primary font-mono font-bold">readonly</code> to prevent runtime tampering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {[
          { m: ".isProduction()", d: "True if mode is 'production'" },
          { m: ".isDevelopment()", d: "True if mode is 'development'" },
          { m: ".isStaging()", d: "True if mode is 'staging'" },
          { m: ".isTest()", d: "True if mode is 'test'" },
          { m: ".is(envName)", d: "Checks custom environment string" },
          { m: ".mode", d: "Returns raw mode string" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <code className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs font-bold">
              {item.m}
            </code>
            <span className="text-xs text-muted-foreground">{item.d}</span>
          </div>
        ))}
      </div>

      <CodeBlock
        language="typescript"
        code={`if (__sys__.__env__.isDevelopment()) {
    enableVerboseLogging();
}`}
      />

      <SectionHeading level={2} id="native-utilities">
        Native XHSC Utilities
      </SectionHeading>

      <div className="my-4">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2 font-mono">
          <User size={16} className="text-primary" /> .user(): string
        </h3>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          Synchronously queries the native Go XHSC process to retrieve the operating system username of the instance owner.
        </p>
        <CodeBlock
          language="typescript"
          code={`const actor = __sys__.__env__.user() || "anonymous";
auditLog.write({ actor, action: "initialization" });`}
        />
      </div>

      <Callout type="tip" title="Best Practice: Fail Fast at Startup">
        Use <code className="text-primary font-mono font-bold">getStrict()</code> in your main entry point. Catching a missing variable at boot is infinitely better than encountering a <code className="text-primary font-mono">null</code> error in a background worker hours later.
      </Callout>

      <DocsFooter
        title="Filesystem Module"
        description="Explore the high-performance filesystem API powered by the XHSC engine."
        buttonText="Explore Filesystem API"
        href="/docs/system/filesystem"
        iconName="FolderTree"
      />
    </div>
  );
}
