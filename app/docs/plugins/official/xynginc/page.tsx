import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import {
  Globe,
  ShieldCheck,
  Zap,
  Lock,
  Terminal,
  Activity,
  Server,
  Cpu,
  RefreshCw,
  HardDrive,
  FileCheck,
  ShieldAlert,
} from "lucide-react";

export default function XyngincPluginPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Server size={14} />
          Official Plugin
        </div>
        <SectionHeading level={1}>XyNginC (Nginx Controller &amp; Service Supervisor)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyNginC (XyPriss Nginx Controller) is an official plugin and system CLI (<code className="text-primary font-mono">xynginc</code> / <code className="text-primary font-mono">xncp</code>) that automates Nginx reverse proxying, Let's Encrypt SSL provision, and production systemd process supervision.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          <h5 className="text-white font-semibold text-xs">Reverse Proxy</h5>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Automated domain-to-port mapping with zero manual Nginx editing.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-2">
          <ShieldCheck className="w-5 h-5 text-green-400" />
          <h5 className="text-white font-semibold text-xs">Automated SSL</h5>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Native Let's Encrypt and ACME Certbot integration for automatic HTTPS.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h5 className="text-white font-semibold text-xs">Go-Powered CLI</h5>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            High-speed native binary for low-latency system-level operations.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col gap-2">
          <RefreshCw className="w-5 h-5 text-purple-400" />
          <h5 className="text-white font-semibold text-xs">Systemd Supervisor</h5>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Zero-config process supervision, auto-restart, and resource limits.
          </p>
        </div>
      </div>

      <Callout type="warning" title="Linux Production Only">
        XyNginC is designed <strong>exclusively for Linux production server environments</strong> (Ubuntu 22.04+, Debian 11+). Windows and macOS are not supported for production deployments.
      </Callout>

      <SectionHeading level={2} id="installation">
        Installation
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3">
        Install the plugin into your project workspace using XFPM:
      </p>
      <CodeBlock language="bash" code="xfpm install xynginc" />
      <p className="text-xs text-muted-foreground">
        Registers CLI aliases <code className="text-primary font-mono">xynginc</code> and <code className="text-primary font-mono">xncp</code> in your workspace environment.
      </p>

      <SectionHeading level={2} id="integration">
        Server Integration
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        Register XyNginC within your server initialization pipeline:
      </p>
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
            port: 8088,
            ssl: true,
            email: "ops@example.com",
            maxBodySize: "25M",
          },
          {
            domain: "auth.example.com",
            port: 8089,
            ssl: true,
            email: "ops@example.com",
          },
        ],
        installRequirements: true,
        autoReload: true,
        autoFixFirewall: true,
        sudoPassword: process.env.SUDO_PASSWORD,
      }),
    ],
  },
});

app.start();`}
      />

      <SectionHeading level={2} id="process-supervision">
        Process Supervision &amp; Service Management
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyNginC includes dedicated systemd management commands to ensure persistent execution, crash resilience, and automatic startup upon system boot.
      </p>

      <h3 className="text-base font-bold text-white mb-2">Service Provisioning &amp; Deployment</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Deploy your application as a managed systemd background service from your project root:
      </p>
      <CodeBlock language="bash" code="sudo xfpmx xncp service deploy   # Alias: sudo xfpmx xncp deploy" />

      <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] my-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Automated Systemd Provisioning Steps</h4>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Runtime Detection</strong>: Auto-detects runtime binary (<code className="text-slate-300 font-mono">bun v1.2+</code> or <code className="text-slate-300 font-mono">node v18+</code>).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Entrypoint Discovery</strong>: Finds project bootstrap file (<code className="text-slate-300 font-mono">src/server.ts</code>, <code className="text-slate-300 font-mono">server.ts</code>, or <code className="text-slate-300 font-mono">dist/index.js</code>).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Environment Binding</strong>: Auto-discovers and binds local <code className="text-slate-300 font-mono">.env</code> configuration file.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Non-Root Execution</strong>: Runs under non-root system owner (<code className="text-slate-300 font-mono">SUDO_USER</code>).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Resource Hardening</strong>: Enforces file and process limits (<code className="text-slate-300 font-mono">LimitNOFILE=65535</code>, <code className="text-slate-300 font-mono">LimitNPROC=4096</code>).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span><strong>Auto-Restart Policies</strong>: Configures instant recovery (<code className="text-slate-300 font-mono">Restart=always</code>, <code className="text-slate-300 font-mono">RestartSec=5s</code>).</span>
          </li>
        </ul>
      </div>

      <h3 className="text-base font-bold text-white mb-2">Service Operation Commands</h3>
      <CodeBlock
        language="bash"
        code={`# List all managed services
xfpmx xncp service list               # Alias: xfpmx xncp services

# Inspect service status & Nginx health
xfpmx xncp service status [service-name]

# Follow live application log output
xfpmx xncp logs -f

# Start, stop, or restart service
sudo xfpmx xncp service start [service-name]
sudo xfpmx xncp service stop [service-name]
sudo xfpmx xncp service restart [service-name]

# Uninstall systemd service unit
sudo xfpmx xncp service uninstall [service-name]`}
      />

      <SectionHeading level={2} id="cli-reference">
        CLI Reference
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        The CLI can be invoked globally as <code className="text-primary font-mono">xynginc</code> / <code className="text-primary font-mono">xncp</code> or locally via <code className="text-primary font-mono">xfpmx xncp</code>:
      </p>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">Command Category</th>
              <th className="p-3 font-bold text-white">Command</th>
              <th className="p-3 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-mono">
            <tr>
              <td className="p-3 text-slate-300 font-sans font-semibold">Diagnostics</td>
              <td className="p-3 text-primary">sudo xynginc check / install</td>
              <td className="p-3 text-slate-400 font-sans">Verify system dependencies and auto-provision missing tools.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-slate-300 font-sans font-semibold">Supervision</td>
              <td className="p-3 text-primary">sudo xynginc deploy [name]</td>
              <td className="p-3 text-slate-400 font-sans">Provision and launch systemd service for current project workspace.</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-300 font-sans font-semibold">Virtual Hosts</td>
              <td className="p-3 text-primary">sudo xynginc add / remove / list</td>
              <td className="p-3 text-slate-400 font-sans">Dynamically add, remove, or list active Nginx reverse proxy virtual hosts.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 text-slate-300 font-sans font-semibold">Maintenance</td>
              <td className="p-3 text-primary">sudo xynginc test / reload / clean</td>
              <td className="p-3 text-slate-400 font-sans">Validate Nginx syntax, trigger safe reload, or purge broken virtual hosts.</td>
            </tr>
            <tr>
              <td className="p-3 text-slate-300 font-sans font-semibold">Backups</td>
              <td className="p-3 text-primary">sudo xynginc restore &lt;backup_id&gt;</td>
              <td className="p-3 text-slate-400 font-sans">Revert to a previous Nginx configuration backup snapshot.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="options-reference">
        TypeScript Options Reference
      </SectionHeading>

      <div className="flex flex-col gap-4 my-2">
        <h3 className="text-base font-bold text-white font-mono">XyNginCDomainConfig</h3>
        <CodeBlock
          language="typescript"
          code={`interface XyNginCDomainConfig {
  domain: string;       // Target host (e.g., "api.example.com")
  port: number;         // Local listener port (e.g., 8088)
  ssl?: boolean;        // Enable Let's Encrypt TLS (default: false)
  email?: string;       // ACME registration email
  maxBodySize?: string; // Client request limit (e.g., "25M", default: "10M")
}`}
        />
      </div>

      <div className="flex flex-col gap-4 my-4">
        <h3 className="text-base font-bold text-white font-mono">XyNginCPluginOptions</h3>
        <CodeBlock
          language="typescript"
          code={`interface XyNginCPluginOptions {
  domains: XyNginCDomainConfig[];
  installRequirements?: boolean; // Provision system dependencies if missing (default: false)
  autoReload?: boolean;          // Reload Nginx upon successful configuration (default: true)
  autoFixFirewall?: boolean;     // Provision UFW rules for ports 80/443 (default: false)
  sudoPassword?: string;         // Password for non-interactive privilege escalation
  binaryPath?: string;           // Custom path to xynginc Go binary
  autoDownload?: boolean;        // Retrieve binary if not present (default: true)
  version?: string;              // Specific Go core release tag (default: "latest")
}`}
        />
      </div>

      <SectionHeading level={2} id="programmatic-api">
        Programmatic Server API (server.xynginc)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        When registered, XyNginC attaches management methods directly to <code className="text-primary font-mono">server.xynginc</code>:
      </p>

      <CodeBlock
        language="typescript"
        code={`// Dynamically register a domain at runtime
await server.xynginc.addDomain("api.example.com", 8088, true, "ops@example.com", "25M");

// Unregister a domain and remove virtual host
await server.xynginc.removeDomain("api.example.com");

// Query configured domain inventory
const domains: string[] = await server.xynginc.listDomains();

// Execute Nginx configuration syntax test
const isValid: boolean = await server.xynginc.test();

// Trigger safe service reload
await server.xynginc.reload();

// Retrieve aggregate infrastructure status
const summary: string = await server.xynginc.status();`}
      />

      <SectionHeading level={2} id="security-compliance">
        Security &amp; Compliance Specifications
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Privilege Separation</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Application services execute strictly under unprivileged user accounts (<code className="text-slate-300 font-mono">SUDO_USER</code>). Sudo escalation is scoped exclusively to config files and service reloads.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-3">
          <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Transient Config Cleanup</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Configurations pass to the Go core via transient, restricted-permission files (<code className="text-slate-300 font-mono">/tmp/.xynginc-config-*.json</code>) that are deleted immediately after parsing.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Signature Integrity</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Distributed with an official cryptographic manifest (<code className="text-slate-300 font-mono">xypriss.plugin.xsig</code>) validated by the XyPriss runtime against tampering.
            </p>
          </div>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-start gap-3">
          <HardDrive className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h5 className="text-white font-bold text-xs mb-1">Loopback Network Isolation</h5>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Nginx reverse proxy templates restrict upstream listeners to loopback interfaces (<code className="text-slate-300 font-mono">127.0.0.1</code>) by default, blocking direct public access.
            </p>
          </div>
        </div>
      </div>

      <DocsFooter
        title="Installation Guide"
        description="Learn how to properly set up XyNginC and system requirements on your production Linux server."
        buttonText="Next: Installation"
        href="/docs/plugins/official/xynginc/installation"
        iconName="Download"
      />
    </div>
  );
}
