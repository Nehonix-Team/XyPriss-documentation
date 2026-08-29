import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { ShieldCheck, Zap, Lock, Cpu, Database, Activity, Sparkles, CheckCircle2, Layers, Key } from "lucide-react";

export default function XEMSConfigurationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Security Module (XEMS)
        </div>
        <SectionHeading level={1}>XEMS Configuration Reference</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Hardware-bound, cryptographically encrypted persistent session vault for XyPriss applications.
        </p>
      </div>

      <Callout type="info" title="Field Revision Notice — XyPriss 9.12.60 (XEMS Core 1.1.22)">
        <p className="leading-relaxed">
          This major architectural revision reflects extensive real-world testing and production feedback. 
          Available starting from <strong>XyPriss 9.12.60</strong> (powered by <strong>XEMS Core v1.1.22</strong>).
        </p>
      </Callout>

      <SectionHeading level={2} id="unified-config">
        Unified Configuration (server.xems)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XEMS operates as a unified, hardware-bound vault store. All configuration options are specified directly under the <code className="text-primary font-mono">server.xems</code> object in your server definition or <code className="text-primary font-mono">xypriss.config.ts</code>.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";
import path from "path";

const app = createServer({
    server: {
        xems: {
            enable: true,
            path: path.resolve(process.cwd(), "vault.xems"), // Mandatory (.xems extension)
            secret: process.env.XEMS_SECRET!,               // Mandatory (min 32 bytes)
            ttl: "7d",                                      // Max 7 days retention
            autoRotation: "1m",                             // "1m", "5m", "10s", or false
            gracePeriod: 15000,                             // 15 seconds grace window
            cookieName: "xems_token",
            cookieOptions: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
            },
        },
    },
});`}
      />

      <SectionHeading level={2} id="parameters">
        Configuration Parameters
      </SectionHeading>
      
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">Parameter</th>
              <th className="p-3 font-bold text-white">Type</th>
              <th className="p-3 font-bold text-white">Required</th>
              <th className="p-3 font-bold text-white">Default</th>
              <th className="p-3 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-3 font-mono text-primary font-bold">enable</td>
              <td className="p-3 font-mono text-slate-300">boolean</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">true</td>
              <td className="p-3 text-slate-400">Enables or disables the native XEMS sidecar and session middleware.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">path</td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 text-red-400 font-bold">Yes</td>
              <td className="p-3 font-mono text-slate-500">—</td>
              <td className="p-3 text-slate-400">Absolute path to the encrypted vault file (must end with <code className="text-primary font-mono">.xems</code>).</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">secret</td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 text-red-400 font-bold">Yes</td>
              <td className="p-3 font-mono text-slate-500">—</td>
              <td className="p-3 text-slate-400">32-byte (256-bit) master encryption secret.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">sandbox</td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">"xypriss.internal.session.xems"</td>
              <td className="p-3 text-slate-400">Default namespace partition for isolated session storage.</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">ttl</td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">"7d"</td>
              <td className="p-3 text-slate-400">Default Time-To-Live duration (e.g. <code className="text-slate-300 font-mono">"15m"</code>, <code className="text-slate-300 font-mono">"1h"</code>, <code className="text-slate-300 font-mono">"7d"</code>). Max 7 days.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">autoRotation</td>
              <td className="p-3 font-mono text-slate-300">boolean | string</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">false</td>
              <td className="p-3 text-slate-400">Session token sliding rotation window (<code className="text-slate-300 font-mono">false</code>, <code className="text-slate-300 font-mono">"1m"</code>, <code className="text-slate-300 font-mono">"5m"</code>, <code className="text-slate-300 font-mono">"10s"</code>).</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">gracePeriod</td>
              <td className="p-3 font-mono text-slate-300">number</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">15000</td>
              <td className="p-3 text-slate-400">Milliseconds (ms) previous token remains valid for concurrent read access during rotation. Max 55000ms.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">cookieName</td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">"xems_token"</td>
              <td className="p-3 text-slate-400">Name of the <code className="text-slate-300 font-mono">HttpOnly</code> cookie issued to the browser.</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">headerName</td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">"x-xypriss-token"</td>
              <td className="p-3 text-slate-400">Name of the HTTP request/response header for API clients.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">attachTo</td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">"session"</td>
              <td className="p-3 text-slate-400">Property on <code className="text-slate-300 font-mono">req</code> where decrypted session payload is stored (accessible via <code className="text-slate-300 font-mono">req.session</code>).</td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">cookieOptions</td>
              <td className="p-3 font-mono text-slate-300">CookieOptions</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">Strict HttpOnly</td>
              <td className="p-3 text-slate-400">Standard RFC 6265 cookie attributes (<code className="text-slate-300 font-mono">httpOnly</code>, <code className="text-slate-300 font-mono">secure</code>, <code className="text-slate-300 font-mono">sameSite</code>).</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">resources</td>
              <td className="p-3 font-mono text-slate-300">&#123; cacheSize?: number &#125;</td>
              <td className="p-3 text-slate-400">No</td>
              <td className="p-3 font-mono text-slate-300">&#123; cacheSize: 64 &#125;</td>
              <td className="p-3 text-slate-400">RAM buffer allocation in megabytes (MB) for fast in-memory vault indexing.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="crypto-architecture">
        Cryptographic Security Architecture
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The native Go sidecar enforces <strong>Dual Hardware + Filesystem Path Binding</strong>. The master encryption key is computed at runtime via:
      </p>

      <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-center font-mono text-sm text-primary my-2">
        {"MasterKey = SHA-256(HWID ∥ Secret ∥ AbsoluteVaultPath)"}
      </div>

      <Callout type="warning" title="Hardware & Path Binding Notice">
        The <code className="text-primary font-mono">.xems</code> vault is mathematically tied to <strong>both</strong> the physical machine hardware (CPU/Motherboard UUID) and its <strong>exact absolute path</strong>. Copying the file to another server or renaming/moving its parent directory renders the vault permanently unreadable.
      </Callout>

      <SectionHeading level={2} id="spa-protection">
        High-Concurrency Rotation (SPA Protection)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        In Single-Page Applications (React, Vue, Svelte), page refreshes trigger multiple simultaneous API requests carrying the same session cookie.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Lock size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">1. Sliding Window Rotation</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Set <code className="text-primary font-mono">autoRotation: "1m"</code> or <code className="text-primary font-mono">"5m"</code> to rotate session tokens safely across sliding intervals.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">2. Grace Period Overlap</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              With <code className="text-primary font-mono">gracePeriod: 15000</code> (15 seconds), incoming parallel requests using the previous token remain valid and automatically receive the newly rotated session token.
            </p>
          </div>
        </div>
      </div>

      <DocsFooter 
        title="XEMS Tutorial"
        description="Learn how to implement high-security authentication flows with XEMS."
        buttonText="View Tutorial"
        href="/docs/security/xems/tutorial"
        iconName="Lock"
      />
    </div>
  );
}
