"use client";

import React from "react";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { Steps, Step } from "@/components/docs/Steps";
import { Download, Terminal, Settings, AlertCircle } from "lucide-react";
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
          Get started with XyPriss by installing the command-line interface and setting up your environment.
        </p>
      </div>

      <p>
        XyPriss uses a specialized package manager called **XFPM** (XyPriss Fast Package Manager). It is designed to be ultra-fast and secure, providing a virtual store for your dependencies.
      </p>

      <SectionHeading level={2} id="requirements">Requirements</SectionHeading>
      <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
        <li><strong>Node.js</strong>: Version 18 or later is required.</li>
        <li><strong>Bun</strong>: The recommended JavaScript runtime for XyPriss.</li>
        <li><strong>Internet connection</strong>: Required for downloading the native engine binaries.</li>
      </ul>

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

      <div className="mt-12 p-6 rounded-2xl border border-primary/10 bg-primary/5">
         <div className="flex items-center gap-2 text-primary mb-2">
           <AlertCircle size={20} />
           <span className="font-bold">Next Steps</span>
         </div>
         <p className="text-sm text-muted-foreground mb-4">
           Now that you have the CLI installed, you can initialize your first project.
         </p>
         <Link href="/docs/quick-start" className="text-primary font-medium hover:underline">
           Go to Quick Start →
         </Link>
      </div>
    </div>
  );
}
