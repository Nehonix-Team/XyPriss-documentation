import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Download, Server, ShieldCheck, Terminal, AlertTriangle, Cpu, Box } from "lucide-react";

export default function XyngincInstallationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Download size={14} />
          Official Plugin
        </div>
        <SectionHeading level={1}>XyNginC Installation &amp; Requirements</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          System requirements, package installation, and CLI setup for XyNginC on production Linux servers.
        </p>
      </div>

      <Callout type="warning" title="Linux Production Only">
        XyNginC is designed <strong>exclusively for Linux production servers</strong> (Ubuntu 22.04+, Debian 11+ recommended). Windows and macOS are not supported for production deployments.
      </Callout>

      <SectionHeading level={2} id="system-requirements">
        System Requirements
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        {[
          { icon: <Server className="text-blue-400" />, title: "Operating System", value: "Ubuntu 22.04+, Debian 11+" },
          { icon: <Cpu className="text-yellow-400" />, title: "Architectures", value: "x86_64 (amd64), ARM64, x86" },
          { icon: <Box className="text-green-400" />, title: "Runtimes", value: "Bun v1.2+ or Node.js v18.0+" },
          { icon: <Terminal className="text-purple-400" />, title: "Package Manager", value: "XFPM (XyPriss Manager)" },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-4">
            <div className="p-2 bg-white/[0.05] rounded-lg shrink-0">{item.icon}</div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">{item.title}</div>
              <div className="text-white font-bold text-xs">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="workspace-install">
        Workspace Installation (XFPM)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        XyNginC is distributed through the official XyPriss registry using XFPM:
      </p>
      <CodeBlock language="bash" code="xfpm install xynginc" />
      <p className="text-xs text-muted-foreground my-2">
        The installation registers two CLI aliases in your workspace environment: <code className="text-primary font-mono">xynginc</code> and <code className="text-primary font-mono">xncp</code>.
      </p>

      <SectionHeading level={2} id="standalone-install">
        Standalone CLI Installation
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        For standalone system-wide usage or environments without XFPM:
      </p>
      <CodeBlock
        language="bash"
        code={`curl -L -o xynginc https://github.com/Nehonix-Team/xynginc/releases/latest/download/xynginc
chmod +x xynginc
sudo mv xynginc /usr/local/bin/`}
      />

      <SectionHeading level={2} id="system-dependencies">
        System Dependencies (Nginx &amp; Certbot)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyNginC is designed to <strong>automatically detect and provision</strong> missing system dependencies (Nginx, Certbot) during execution when <code className="text-primary font-mono">installRequirements: true</code> is passed or via the CLI:
      </p>

      <CodeBlock
        language="bash"
        code={`# Infrastructure Diagnostics & Setup
sudo xynginc check                     # Verify system dependencies
sudo xynginc install                   # Install missing system requirements`}
      />

      <Callout type="tip" title="Verification Command">
        Run <code className="text-primary font-mono font-bold">sudo xynginc check</code> after installation to verify that all system dependencies and Nginx permissions are correctly configured.
      </Callout>

      <DocsFooter
        title="Build from Source"
        description="Need to run XyNginC on a custom architecture? Learn how to build it from source."
        buttonText="Next: Build from Source"
        href="/docs/plugins/official/xynginc/build"
        iconName="Cpu"
      />
    </div>
  );
}
