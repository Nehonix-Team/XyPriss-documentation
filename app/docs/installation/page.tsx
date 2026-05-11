import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { Download, Terminal, Settings, AlertCircle, Shield, Package, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function InstallationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Download size={14} />
          Setup
        </div>
        <SectionHeading level={1}>Installation Guide</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Prepare your system for XyPriss development by installing the mandatory ecosystem tools.
        </p>
      </div>

      <SectionHeading level={2} id="requirements">System Requirements</SectionHeading>
      <p>
        Before running a XyPriss project, ensure the following tools are installed. They are <strong>mandatory</strong> — using alternative package managers (npm, yarn, pnpm) or runtimes will break the framework's security chain and native integration.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 pr-6 font-bold text-white">Requirement</th>
              <th className="py-4 pr-6 font-bold text-white">Purpose</th>
              <th className="py-4 font-bold text-white">Install Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-4 pr-6 text-primary font-bold">XFPM</td>
              <td className="py-4 pr-6 text-muted-foreground">The exclusive package manager for the XyPriss ecosystem. Handles native core linking.</td>
              <td className="py-4"><a href="#install-cli" className="text-primary hover:underline">See below</a></td>
            </tr>
            <tr>
              <td className="py-4 pr-6 text-primary font-bold">Bun</td>
              <td className="py-4 pr-6 text-muted-foreground">The primary JavaScript runtime used to execute XyPriss projects and high-speed scripts.</td>
              <td className="py-4"><a href="https://bun.sh" target="_blank" className="text-primary hover:underline">bun.sh</a></td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="install-cli">Installing the CLI</SectionHeading>
      <p>
        The unified installer automatically detects your OS and architecture to install the correct XFPM binary.
      </p>

      <div className="space-y-6 my-8">
        <div>
          <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Terminal size={16} className="text-primary" />
            Linux & macOS
          </h4>
          <CodeBlock 
            language="bash" 
            code="curl -sL https://xypriss.nehonix.com/install.js | node" 
          />
        </div>

        <div>
          <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
            <Settings size={16} className="text-primary" />
            Windows (PowerShell)
          </h4>
          <CodeBlock 
            language="powershell" 
            code="Invoke-WebRequest -Uri https://xypriss.nehonix.com/install.js -OutFile install.js; node install.js; Remove-Item install.js" 
          />
        </div>
      </div>

      <Callout type="warning" title="Runtime Restriction">
        Using <code>npm run</code>, <code>node</code>, or other runtimes to start a XyPriss server is not supported and will produce undefined behavior. Always use <code>xfpm run</code> or <code>bun</code> to execute scripts and entry points.
      </Callout>

      <SectionHeading level={2} id="install-xypriss">Installing XyPriss Core</SectionHeading>
      <p>
        After configuring the CLI environment, you can add the XyPriss core engine to any project directory:
      </p>
      
      <CodeBlock 
        language="bash" 
        code="# Install XyPriss core in your current project\nxfpm install xypriss" 
      />

      <Callout type="info" title="XyPriss Security Shield">
        For projects requiring advanced protection, install the optional security shield:
        <CodeBlock 
          language="bash" 
          className="mt-4"
          code="xfpm install xypriss-security" 
        />
      </Callout>

      <SectionHeading level={2} id="verification">Verification</SectionHeading>
      <p>
        Once installed, verify that the CLI is available in your PATH:
      </p>
      <CodeBlock language="bash" code="xfpm --version" />

      <SectionHeading level={2} id="troubleshooting">Troubleshooting</SectionHeading>
      
      <Callout type="warning" title="Permission Denied">
        If you encounter an `EACCES` error on Linux/macOS, the installer may need elevated privileges to create symlinks. You will be prompted for your password if necessary.
      </Callout>

      <Callout type="info" title="PowerShell Policy">
        On Windows, if the script is blocked, enable local script execution:
        <CodeBlock 
          language="powershell" 
          className="mt-4"
          code="Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" 
        />
      </Callout>

      <div className="mt-12 p-8 rounded-2xl border border-primary/10 bg-primary/5 flex items-center justify-between gap-6">
         <div className="flex-1">
           <div className="flex items-center gap-2 text-primary mb-2">
             <AlertCircle size={20} />
             <span className="font-bold">Ready to code?</span>
           </div>
           <p className="text-sm text-muted-foreground">
             Now that your environment is configured, you can initialize a new project from a template.
           </p>
         </div>
         <Link href="/docs/quick-start" className="bg-primary text-white px-6 py-3 rounded-lg font-bold hover:bg-primary/80 transition-all flex items-center gap-2 shrink-0">
           Quick Start <ChevronRight size={18} />
         </Link>
      </div>
    </div>
  );
}
