import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Shield, Lock, EyeOff, AlertTriangle, Terminal, Zap } from "lucide-react";

export default function EnvironmentShieldPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Shield size={14} />
          Security Core
        </div>
        <SectionHeading level={1}>
          Environment Security Shield
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss features a military-grade <strong>Environment Security Shield</strong> designed to eliminate secret leakage and enforce a zero-trust architecture for application variables.
        </p>
      </div>

      <TechGraph 
        title="Security Shield Interception"
        badge="Zero-Leak Protection"
        nodes={[
          { iconName: "Terminal", title: "Access Request", subtitle: "process.env.KEY", color: "blue" },
          { iconName: "Shield", title: "Env Shield", subtitle: "Proxy Validation", color: "primary", active: true },
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
          <h4 className="font-bold text-white text-sm">Implicit State</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Code becomes fragile and hard to test when it depends on global, mutable environment state.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="how-it-works">Mechanism of Action</SectionHeading>
      <p>
        XyPriss uses a native <strong>System Proxy</strong> to intercept all access to <code>process.env</code>, implementing two primary security layers.
      </p>

      <SectionHeading level={3} id="isolation">1. Project-Root Isolation</SectionHeading>
      <p>
        The framework includes a built-in, ultra-fast <code>.env</code> loader that operates on strictly defined <strong>Project Boundaries</strong>.
      </p>
      <ul className="space-y-4 my-4">
        <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-1">01</div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Project Discovery</p>
            <p className="text-xs text-muted-foreground">A directory is considered a project boundary if it contains <code>node_modules</code> and <code>package.json</code>.</p>
          </div>
        </li>
        <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold shrink-0 mt-1">02</div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Strict Isolation</p>
            <p className="text-xs text-muted-foreground">Sub-projects (plugins, mods) are isolated from parents. They only access their local <code>.env</code> file, ensuring deterministic config.</p>
          </div>
        </li>
      </ul>

      <SectionHeading level={3} id="masking">2. Variable Masking</SectionHeading>
      <p>
        When code attempts to read from <code>process.env</code>, the shield performs a real-time security check against the official whitelist:
      </p>

      <div className="my-6 overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-bold">Category</th>
              <th className="px-4 py-3 font-bold">Variable Pattern</th>
              <th className="px-4 py-3 font-bold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono text-primary">System Core</td>
              <td className="px-4 py-3 text-muted-foreground"><code>NODE_ENV</code>, <code>PATH</code>, <code>PORT</code></td>
              <td className="px-4 py-3 text-xs text-green-400 font-bold uppercase">Pass Through</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">Framework</td>
              <td className="px-4 py-3 text-muted-foreground"><code>XYPRISS_*</code>, <code>XY_*</code></td>
              <td className="px-4 py-3 text-xs text-green-400 font-bold uppercase">Pass Through</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">Security</td>
              <td className="px-4 py-3 text-muted-foreground"><code>ENC_*</code>, <code>DOTENV_*</code></td>
              <td className="px-4 py-3 text-xs text-green-400 font-bold uppercase">Pass Through</td>
            </tr>
            <tr className="bg-orange-500/5">
              <td className="px-4 py-3 font-mono text-orange-400">Third Party</td>
              <td className="px-4 py-3 text-muted-foreground">All others (DB_URL, API_KEY, etc.)</td>
              <td className="px-4 py-3 text-xs text-orange-400 font-bold uppercase">Mask (undefined)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="official-api">The Official API</SectionHeading>
      <p>
        To access your application secrets safely, use the system-managed environment manager. This ensures the access is logged and verified by the security layer.
      </p>

      <div className="my-6">
        <CodeBlock 
          language="typescript" 
          code={`// ❌ Discouraged: Will return undefined for custom secrets
const apiKey = process.env.MY_API_KEY;

// ✅ Recommended: Official and secure access
const apiKey = __sys__.__env__.get("MY_API_KEY");`}
        />
      </div>

      <Callout type="warning" title="Security Warning">
        Variables not in the whitelist will return <code>undefined</code> via <code>process.env</code> and will trigger a security warning in the console. This is intended behavior to prevent silent leaks.
      </Callout>

      <SectionHeading level={2} id="best-practices">Best Practices</SectionHeading>
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Zap size={18} className="text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">Use <code>XYPRISS_</code> prefix for variables that MUST be accessed by legacy libraries.</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Zap size={18} className="text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">Standardize on <code>__sys__.__env__.get()</code> for all business logic.</p>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Zap size={18} className="text-primary shrink-0" />
          <p className="text-sm text-muted-foreground">Never commit <code>.env</code> files to version control; they are hardware-local.</p>
        </div>
      </div>

      <DocsFooter 
        title="Explore Core Concepts"
        description="Return to the core architectural concepts of the XyPriss ecosystem."
        buttonText="View Core Concepts"
        href="/docs/xhsc-core"
        iconName="Layers"
      />
    </div>
  );
}
