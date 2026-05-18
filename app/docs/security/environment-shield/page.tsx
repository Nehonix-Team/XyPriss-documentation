import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Shield, Lock, EyeOff, AlertTriangle, Terminal, Zap, Settings, Key } from "lucide-react";

export default function EnvironmentShieldPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Shield size={14} />
          Security Core
        </div>
        <SectionHeading level={1}>
          Environment Security Shield (XESS)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss features a military-grade <strong>Environment Security Shield (XESS)</strong> designed to eliminate secret leakage and enforce a robust application architecture.
        </p>
      </div>

      <TechGraph 
        title="Security Shield Interception"
        badge="Zero-Leak Protection"
        nodes={[
          { iconName: "Terminal", title: "Access Request", subtitle: "process.env.KEY", color: "blue" },
          { iconName: "Shield", title: "Env Shield", subtitle: "Proxy Interception", color: "primary", active: true },
          { iconName: "EyeOff", title: "Masking", subtitle: "Undefined (Safe)", color: "orange" },
          { iconName: "Lock", title: "Secured", subtitle: "Access Blocked", color: "purple" }
        ]}
        footer={[
          { label: "Prevention", description: "Blocks third-party libraries from reading sensitive credentials.", color: "blue" },
          { label: "Privacy", description: "Eliminates accidental logging of production secrets.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="why-shield">Why the Shield?</SectionHeading>
      <p>
        Traditional Node.js applications rely heavily on <code>process.env</code>. While convenient, this approach introduces critical security vulnerabilities that XyPriss aims to resolve:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
            <EyeOff size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Global Exposure</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Any dependency can read your entire environment, potentially leaking database keys to malicious telemetry services.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <AlertTriangle size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Accidental Logging</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Logging <code>process.env</code> during debugging often prints sensitive secrets to plaintext cloud logs.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
            <Lock size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Implicit Dependencies</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Code becomes hard to test and maintain when it depends on global, mutable environment state.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="how-it-works">How it Works</SectionHeading>
      <p>
        XyPriss uses a native <strong>System Proxy</strong> to intercept all access to <code>process.env</code>.
      </p>

      <SectionHeading level={3} id="project-isolation">1. Project-Root Isolation</SectionHeading>
      <p>
        XyPriss includes a built-in, ultra-fast <code>.env</code> loader that operates on <strong>Project Boundaries</strong>.
      </p>
      <ul className="space-y-4 my-4">
        <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-1">01</div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Project Discovery</p>
            <p className="text-xs text-muted-foreground">A directory is considered a project if it contains <code>node_modules</code> and <code>package.json</code>.</p>
          </div>
        </li>
        <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-1">02</div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Scoped Loading</p>
            <p className="text-xs text-muted-foreground">The system automatically loads the <code>.env</code> file belonging to the project root.</p>
          </div>
        </li>
        <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-1">03</div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Strict Isolation</p>
            <p className="text-xs text-muted-foreground">Sub-projects (plugins, mods) are isolated from their parents. They only access their own local <code>.env</code>, ensuring configuration management is deterministic and scoped.</p>
          </div>
        </li>
      </ul>

      <SectionHeading level={3} id="variable-masking">2. Variable Masking</SectionHeading>
      <p>
        When code attempts to read from <code>process.env</code>, the shield performs a security check:
      </p>
      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm pl-4 my-2">
        <li><strong>Whitelisted core variables</strong> (e.g., <code>NODE_ENV</code>, <code>PATH</code>, <code>PORT</code>, <code>TERM</code>) are returned normally.</li>
        <li><strong>Project-prefixed variables</strong> (starting with <code>XYPRISS_</code>, <code>XY_</code>, <code>ENC_</code>, or <code>DOTENV_</code>) are returned normally.</li>
        <li><strong>All other variables</strong> return <code>undefined</code> and trigger a security warning in the console.</li>
      </ul>

      <SectionHeading level={3} id="official-api">3. The Official API</SectionHeading>
      <p>
        To access your application variables, use the system-managed environment manager:
      </p>
      <div className="my-6">
        <CodeBlock 
          language="typescript" 
          code={`// ❌ Discouraged
const apiKey = process.env.MY_API_KEY;

// ✅ Recommended
const apiKey = __sys__.__env__.get("MY_API_KEY");`}
        />
      </div>

      <SectionHeading level={2} id="configuration-whitelist">Configuration Whitelist</SectionHeading>
      <p>
        The following variables are always accessible directly via <code>process.env</code> to ensure system and runtime stability:
      </p>
      <div className="my-6 overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-bold">Variable</th>
              <th className="px-4 py-3 font-bold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>NODE_ENV</code></td>
              <td className="px-4 py-3 text-muted-foreground">Current runtime environment</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>PORT</code></td>
              <td className="px-4 py-3 text-muted-foreground">Standard listening port</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>PATH</code></td>
              <td className="px-4 py-3 text-muted-foreground">System execution paths</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>USER</code></td>
              <td className="px-4 py-3 text-muted-foreground">Current system user</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>HOME</code></td>
              <td className="px-4 py-3 text-muted-foreground">User home directory</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>LANG</code></td>
              <td className="px-4 py-3 text-muted-foreground">System language/locale</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>COLORTERM</code></td>
              <td className="px-4 py-3 text-muted-foreground">Terminal color support</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>XYPRISS_*</code></td>
              <td className="px-4 py-3 text-muted-foreground">All official framework configurations</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>ENC_*</code></td>
              <td className="px-4 py-3 text-muted-foreground">Encryption keys and seeds</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="best-practices">Best Practices</SectionHeading>
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Zap size={18} className="text-primary shrink-0" />
          <p className="text-sm text-muted-foreground"><strong>Use Prefixes</strong>: For environment variables that MUST be accessed by legacy libraries, prefix them with <code>XYPRISS_</code>.</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Zap size={18} className="text-primary shrink-0" />
          <p className="text-sm text-muted-foreground"><strong>Standardize Access</strong>: Use <code>__sys__.__env__.get()</code> everywhere in your business logic.</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Zap size={18} className="text-primary shrink-0" />
          <p className="text-sm text-muted-foreground"><strong>Use .env</strong>: This file is automatically loaded and is the ideal place for hardware-local secrets that should never be committed to version control.</p>
        </div>
      </div>

      <SectionHeading level={2} id="dynamic-configuration">Dynamic Configuration</SectionHeading>
      <p>
        Starting from version 9.10.18, you can dynamically configure the <strong>XyPriss Environment Security Shield (XESS)</strong> under the <code>security</code> property of <code>ServerOptions</code>. 
      </p>
      <p>
        This enables you to whitelist custom environment variables that third-party, legacy libraries must access directly from <code>process.env</code>.
      </p>

      <Callout type="warning" title="Active Protection Enforced">
        The security shield is a core principle of the XyPriss framework. For maximum security, <strong>the shield remains active at all times</strong> and cannot be disabled.
      </Callout>

      <SectionHeading level={3} id="extending-whitelist">Extending the Default Whitelist</SectionHeading>
      <p>
        By default, any key specified in the <code>whitelist</code> option will be <em>appended</em> to the built-in system whitelist:
      </p>
      <div className="my-6">
        <CodeBlock 
          language="typescript" 
          code={`import { createServer } from "xypriss";

const app = createServer({
  security: {
    xess: {
      whitelist: ["MY_CUSTOM_SECRET", "ANOTHER_LEGACY_VAR"]
    }
  }
});`}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Now, <code>process.env.MY_CUSTOM_SECRET</code> will return its actual value without triggering any warning, while other non-whitelisted keys remain securely masked.
      </p>

      <SectionHeading level={3} id="replacing-whitelist">Replacing the Default Whitelist</SectionHeading>
      <p>
        If you need absolute control and want to restrict the environment strictly to your custom keys (excluding default variables like <code>PATH</code> or <code>LANG</code>), set <code>replaceDefaultWhitelist: true</code>:
      </p>
      <div className="my-6">
        <CodeBlock 
          language="typescript" 
          code={`const app = createServer({
  security: {
    xess: {
      whitelist: ["PORT", "MY_CUSTOM_SECRET"],
      replaceDefaultWhitelist: true
    }
  }
});`}
        />
      </div>

      <SectionHeading level={3} id="configuration-options">Configuration Options</SectionHeading>
      <div className="my-6 overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-bold">Option</th>
              <th className="px-4 py-3 font-bold">Type</th>
              <th className="px-4 py-3 font-bold">Default</th>
              <th className="px-4 py-3 font-bold">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>xess</code> (or <code>envShield</code>)</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">XessConfig</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
              <td className="px-4 py-3 text-muted-foreground">Security shield configuration block.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>xess.whitelist</code></td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">string[]</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">[]</td>
              <td className="px-4 py-3 text-muted-foreground">List of custom environment variable keys to whitelist.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary"><code>xess.replaceDefaultWhitelist</code></td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">boolean</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">false</td>
              <td className="px-4 py-3 text-muted-foreground">If <code>true</code>, completely discards the default system whitelist in favor of <code>whitelist</code>.</td>
            </tr>
          </tbody>
        </table>
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
