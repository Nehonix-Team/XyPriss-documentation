import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Activity, ShieldCheck, Zap, Lock, Terminal, ShieldAlert, Cpu } from "lucide-react";

export default function XyphraPluginPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Xyphra Logger</SectionHeading>

      <p>
        <strong>Xyphra</strong> is the official, native replacement for <code>morgan</code> in the XyPriss G3 ecosystem. Designed for high performance and Zero-Trust security, it offers features that standard JS loggers lack, such as native JSON support, automatic security redaction, and GDPR-compliant IP anonymization.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Zap className="w-5 h-5 text-yellow-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Fast</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Native TypeScript implementation with zero overhead.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">GDPR Compliant</h5>
          <p className="text-[10px] text-slate-400 m-0">
            One-click IP anonymization for privacy.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Lock className="w-5 h-5 text-green-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Auto-Redaction</h5>
          <h5 className="text-white font-semibold mb-1 text-sm">Security-First</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Redact sensitive headers (Authorized, Cookies) automatically.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Installation</SectionHeading>
      <CodeBlock language="bash" code="xfpm install xyphra" />

      <SectionHeading level={2}>Quick Start</SectionHeading>
      <Steps>
        <Step title="Configure Permissions">
          <p>Grant the necessary privileges in your <code>xypriss.config.jsonc</code>:</p>
          <CodeBlock 
            language="jsonc" 
            code={`{
  "$internal": {
    "xyphra": {
      "permissions": {
        "allowedHooks": [
          "XHS.HOOK.HTTP.REQUEST",
          "XHS.HOOK.HTTP.RESPONSE",
          "XHS.PERM.SECURITY.SENSITIVE_DATA",
        ],
        "policy": "allow",
      },
    },
  },
}`} 
          />
        </Step>

        <Step title="Register as a Plugin">
          <p>Register the <code>XyphraPlugin</code> using ServerOptions:</p>
          <CodeBlock 
            language="typescript" 
            code={`import { createServer } from "xypriss";
import { XyphraPlugin } from "xyphra";

const server = createServer({
  plugins: {
    register: [
            XyphraPlugin({
                anonymizeIp: true,
                immediate: false,
                stream: {
                    write(str: string) {
                        console.log(str);
                    },
                },
            }),
        ],
  }
});`} 
          />
        </Step>
      </Steps>

      <SectionHeading level={2}>Configuration</SectionHeading>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">Option</th>
              <th className="p-3 border border-white/10 font-bold text-white">Type</th>
              <th className="p-3 border border-white/10 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 font-mono text-blue-400">format</td>
              <td className="p-3 border border-white/10 font-mono italic">string</td>
              <td className="p-3 border border-white/10 text-slate-400">'json', 'dev', 'combined', etc.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 font-mono text-blue-400">anonymizeIp</td>
              <td className="p-3 border border-white/10 font-mono italic">boolean</td>
              <td className="p-3 border border-white/10 text-slate-400">Mask the last octet of IP addresses.</td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 font-mono text-blue-400">redactHeaders</td>
              <td className="p-3 border border-white/10 font-mono italic">string[]</td>
              <td className="p-3 border border-white/10 text-slate-400">List of headers to mask as [REDACTED].</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Developer Identity</SectionHeading>
      <Callout type="warning" title="Security Verified">
        Developer ID: <code>ed25519:a58b17a3e46302dd3ae5538bc9b8b991c57f4c5fe2e7d8ac41803de818d947f4</code>
        <br />
        This plugin is cryptographically signed. Always verify the signature during installation.
      </Callout>

      <DocsFooter 
        title="Plugin Permissions"
        description="Understand how to manage fine-grained permissions for your plugins."
        buttonText="Next: Plugin Permissions"
        href="/docs/plugins/permissions"
        iconName="ShieldCheck"
      />
    </div>
  );
}
