import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Download, Server, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";

export default function XyngincInstallationPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XyNginC Installation</SectionHeading>

      <p>
        XyNginC is designed <strong>exclusively for XyPriss projects running in production on Linux</strong>. 
        It relies on system-level components like Nginx and Certbot that are native to Linux environments.
      </p>

      <SectionHeading level={2}>System Requirements</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {[
          { icon: <Server className="text-blue-400" />, title: "OS", value: "Ubuntu 20.04+, Debian 11+" },
          { icon: <Cpu className="text-yellow-400" />, title: "Arch", value: "x64, arm64, ia32" },
          { icon: <ShieldCheck className="text-green-400" />, title: "Access", value: "Root or sudo privileges" },
          { icon: <Terminal className="text-purple-400" />, title: "Manager", value: "XFPM installed" },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-4">
            <div className="p-2 bg-white/[0.05] rounded-lg">{item.icon}</div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">{item.title}</div>
              <div className="text-white font-bold text-sm">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2}>Step 0: Install XFPM</SectionHeading>
      <p>Ensure XFPM is installed, as it is required for the recommended installation method:</p>
      <CodeBlock language="bash" code="curl -sL https://xypriss.nehonix.com/install.js | node" />

      <SectionHeading level={2}>Installation Methods</SectionHeading>
      
      <div className="space-y-8 my-10">
        <div>
          <h3 className="text-white font-bold mb-3 flex items-center gap-2 italic">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Option 1: XFPM (Recommended)
          </h3>
          <p className="text-sm text-slate-400">
            Most streamlined approach for XyPriss projects. The post-install script automatically handles binary acquisition.
          </p>
          <CodeBlock language="bash" code="xfpm install xynginc" />
        </div>

        <div>
          <h3 className="text-white font-bold mb-3 flex items-center gap-2 italic">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Option 2: Manual Binary
          </h3>
          <p className="text-sm text-slate-400">
            For standalone usage or environments without XFPM.
          </p>
          <CodeBlock 
            language="bash" 
            code={`curl -L -o xynginc https://github.com/Nehonix-Team/xynginc/releases/latest/download/xynginc
chmod +x xynginc
sudo mv xynginc /usr/local/bin/`} 
          />
        </div>
      </div>

      <SectionHeading level={2}>System Dependencies (Optional)</SectionHeading>
      <p>
        XyNginC is designed to <strong>automatically detect and install</strong> missing requirements 
        (Nginx, Certbot) during its first execution. Manual installation is usually not required, 
        but you can verify them on your Ubuntu/Debian server if needed:
      </p>
      <CodeBlock 
        language="bash" 
        code={`# Manual installation (Optional)
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx`} 
      />

      <Callout type="tip">
        Run <code>sudo xynginc check</code> after installation to verify that all 
        system dependencies and permissions are correctly configured.
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

import { Cpu } from "lucide-react";
