import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Globe, ShieldCheck, Zap, Lock, Terminal, Activity, Server, Cpu } from "lucide-react";

export default function XyngincPluginPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XyNginC (Nginx Controller)</SectionHeading>

      <p>
        <strong>XyNginC</strong> (XyPriss Nginx Controller) is an official plugin that automates 
        Nginx reverse proxy configuration and SSL certificate management. It eliminates manual 
        Nginx editing, simplifying XyPriss deployment to just a few lines of TypeScript.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Globe className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Reverse Proxy</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Automated domain-to-port mapping with zero manual config.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-green-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">One-Command SSL</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Native Let's Encrypt and Certbot integration for HTTPS.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Zap className="w-5 h-5 text-yellow-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">High Performance</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Core logic executed via a high-speed Go-based CLI.
          </p>
        </div>
      </div>

      <Callout type="warning">
        XyNginC is designed <strong>exclusively for Linux production servers</strong> (VPS or Dedicated). 
        Windows and macOS are not supported.
      </Callout>

      <SectionHeading level={2}>Installation</SectionHeading>
      <p>Install the plugin via XFPM (recommended):</p>
      <CodeBlock language="bash" code="xfpm install xynginc" />
      <p className="text-xs text-slate-400 italic">
        For detailed requirements and manual installation, see the <a href="/docs/plugins/official/xynginc/installation" className="text-primary hover:underline">Installation Guide</a>.
      </p>

      <SectionHeading level={2}>Quick Start</SectionHeading>
      <Steps>
        <Step title="Basic Registration">
          <p>Integrate XyNginC into your XyPriss server options:</p>
          <CodeBlock 
            language="typescript" 
            code={`import { createServer } from "xypriss";
import XNCP from "xynginc";

const app = createServer({
  plugins: {
    register: [
      XNCP({
        domains: [
          {
            domain: "api.example.com",
            port: 3000,
            ssl: true,
            email: "admin@example.com",
          },
        ],
      }),
    ],
  },
});

app.start();`} 
          />
        </Step>

        <Step title="Multiple Domains">
          <p>Configure multiple environments or services simultaneously:</p>
          <CodeBlock 
            language="typescript" 
            code={`XNCP({
  domains: [
    { domain: "api.example.com", port: 3000, ssl: true, email: "admin@example.com" },
    { domain: "admin.example.com", port: 3001, ssl: true, email: "admin@example.com" },
    { domain: "dev.example.com", port: 3002, ssl: false },
  ],
  autoReload: true,
})`} 
          />
        </Step>
      </Steps>


      <SectionHeading level={2}>Architecture</SectionHeading>
      <p>
        XyNginC operates through a three-tier architecture ensuring high reliability:
      </p>
      <div className="flex flex-col gap-2 my-6">
        {[
          { 
            name: "TypeScript Plugin", 
            desc: "The high-level wrapper that interfaces with your XyPriss app."
          },
          { 
            name: "Go CLI Binary", 
            desc: "A high-performance tool performing system-level operations (Nginx, Certbot)."
          },
          { 
            name: "Cloud Templates", 
            desc: "Dynamically fetches optimized Nginx templates from GitHub."
          }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              {i + 1}
            </div>
            <div>
              <div className="text-white font-bold text-sm">{item.name}</div>
              <div className="text-[10px] text-slate-400">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2}>Security Considerations</SectionHeading>
      <Callout type="danger" title="Elevated Privileges">
        XyNginC requires <code>sudo</code> privileges to write Nginx configurations 
        and reload system services. Ensure your environment (e.g., PM2) is configured 
        to handle these permissions safely.
      </Callout>

      <DocsFooter 
        title="Installation Guide"
        description="Learn how to properly set up XyNginC on your production server."
        buttonText="Next: Installation"
        href="/docs/plugins/official/xynginc/installation"
        iconName="Download"
      />
    </div>
  );
}
