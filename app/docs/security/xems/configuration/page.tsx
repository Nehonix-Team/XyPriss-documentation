import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Settings, ShieldCheck, Zap, Lock, Cpu, Database, Activity, Terminal } from "lucide-react";

export default function XEMSConfigurationPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XEMS Configuration</SectionHeading>
      
      <p>XEMS is configured via the <code>server.xems</code> property in the <code>createServer</code> options. The configuration is strictly validated during server initialization to ensure maximum security.</p>

      <SectionHeading level={2}>Core Settings</SectionHeading>
      <table className="min-w-full text-sm text-slate-400 border-collapse border border-white/5 my-6">
        <thead>
          <tr className="bg-white/[0.05]">
            <th className="p-2 border border-white/5 text-left text-white text-xs">Parameter</th>
            <th className="p-2 border border-white/5 text-left text-white text-xs">Default</th>
            <th className="p-2 border border-white/5 text-left text-white text-xs">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400 text-[10px]">enable</td>
            <td className="p-2 border border-white/5 text-[10px]">true</td>
            <td className="p-2 border border-white/5 text-[10px]">Enables the XEMS engine and internal session middleware.</td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400 text-[10px]">ttl</td>
            <td className="p-2 border border-white/5 text-[10px]">"15m"</td>
            <td className="p-2 border border-white/5 text-[10px]">Session lifetime (e.g., "1h", "30m").</td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400 text-[10px]">autoRotation</td>
            <td className="p-2 border border-white/5 text-[10px]">true</td>
            <td className="p-2 border border-white/5 text-[10px]">Enables automatic token rotation on every request.</td>
          </tr>
        </tbody>
      </table>

      <SectionHeading level={2}>Persistence (The Vault)</SectionHeading>
      <p>Persistence allows XEMS to save sessions to an encrypted file, surviving server restarts.</p>
      
      <CodeBlock language="typescript" title="Vault Configuration" code={`const app = createServer({
    security: {
        xems: {
            persistence: {
                enabled: true,
                path: "./.private/vault.xems",
                secret: "your-32-byte-master-key-here-!!!"
            }
        },
    },
});`} />

      <Callout type="warning" title="32-Byte Requirement">
        The <code>secret</code> must be exactly 32 bytes (256 bits). If the secret is lost, all data in the vault becomes permanently unrecoverable.
      </Callout>

      <SectionHeading level={2}>Transport Settings</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Database className="w-4 h-4" /> Cookie Storage
          </div>
          <p className="text-[10px] text-slate-400 m-0">Default cookie: <code>xems_token</code>. Automatically configured as <code>HttpOnly</code> and <code>Secure</code> in production.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Terminal className="w-4 h-4" /> Header Transport
          </div>
          <p className="text-[10px] text-slate-400 m-0">Default header: <code>x-xypriss-token</code>. Used for session transport in non-browser or API-only contexts.</p>
        </div>
      </div>

      <DocsFooter 
        title="Performance"
        description="View verified benchmarks and high-concurrency results for XEMS."
        buttonText="Next: Performance"
        href="/docs/security/xems/performance"
        iconName="Zap"
      />
    </div>
  );
}
