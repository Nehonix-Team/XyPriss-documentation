import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { TechGraph } from "@/components/ui/TechGraph";
import { Server, ShieldCheck, Zap, Lock, Cpu, Database, Activity } from "lucide-react";

export default function XEMSPage() {
  const xemsNodes = [
    { 
      iconName: "Cpu", 
      title: "Node.js (App)", 
      subtitle: "Application Logic",
      color: "primary" as const
    },
    { 
      iconName: "Zap", 
      title: "XHSC Bridge", 
      subtitle: "IPC Communication",
      color: "blue" as const
    },
    { 
      iconName: "Lock", 
      title: "XEMS Sidecar", 
      subtitle: "Isolated Go Process",
      color: "purple" as const
    },
    { 
      iconName: "Database", 
      title: "Encrypted Vault", 
      subtitle: "AES-256-GCM Storage",
      color: "green" as const
    },
  ];

  const xemsFooter = [
    {
      label: "Process Isolation",
      description: "Data never touches the Node.js memory heap.",
      color: "primary" as const
    },
    {
      label: "Hardware-Bound",
      description: "Encryption is tied to physical machine HWID.",
      color: "blue" as const
    }
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XyPriss Encrypted Memory Store (XEMS)</SectionHeading>
      
      <p>XEMS is a high-performance, security-hardened session and temporary data storage engine. It provides military-grade session isolation and persistence with zero external dependencies.</p>

      <SectionHeading level={2}>Key Concepts</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Cpu className="w-5 h-5" /> Sidecar Model
          </div>
          <p className="text-xs text-slate-400">Operates as a dedicated native process managed by XHSC, keeping sensitive data out of the Node.js heap.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Lock className="w-5 h-5" /> Cryptographic Sandboxing
          </div>
          <p className="text-xs text-slate-400">Data is partitioned into isolated namespaces. Operations in one sandbox cannot access another.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Zap className="w-5 h-5" /> Atomic Rotation
          </div>
          <p className="text-xs text-slate-400">Implements per-request token rotation to minimize the window for session hijacking attacks.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <ShieldCheck className="w-5 h-5" /> Hardware Binding
          </div>
          <p className="text-xs text-slate-400">Persistence vaults are encrypted using AES-256-GCM and bound to the physical hardware's HWID.</p>
        </div>
      </div>

      <SectionHeading level={2}>Architecture</SectionHeading>
      <p>The XEMS sidecar model ensures a strict security boundary between application logic and sensitive storage:</p>
      
      <TechGraph 
        title="XEMS Architecture"
        badge="Native Sidecar"
        nodes={xemsNodes}
        footer={xemsFooter}
      />

      <SectionHeading level={3}>Communication Flow</SectionHeading>
      <Steps>
        <Step title="IPC Command">
          The TypeScript layer sends a command via high-speed IPC (Standard Input) to the sidecar.
        </Step>
        <Step title="Native Processing">
          The Go-native core processes the command entirely in compiled, isolated memory space.
        </Step>
        <Step title="Buffered Response">
          The result is returned via Standard Output, optimized for high-throughput concurrency.
        </Step>
      </Steps>

      <SectionHeading level={2}>Configuration</SectionHeading>
      <p>XEMS can be configured globally or per-server. High-churn data should use short TTLs to maintain optimal performance.</p>
      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const server = createServer({
    security: {
        xems: {
            enabled: true,
            persistence: true,
            vaultPath: "./.private/vault.xems",
            sandbox: "user.auth",
            tokenRotation: {
                enabled: true,
                gracePeriod: 1000 // ms
            }
        },
    },
});`} />

      <SectionHeading level={2}>Security & Persistence</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
          <h5 className="text-white font-semibold mb-1 flex items-center gap-2">
            <Database className="w-4 h-4 text-blue-400" /> AES-256-GCM Vaults
          </h5>
          <p className="text-sm text-slate-400 m-0">All persistent data is stored in AEAD-encrypted vaults, ensuring both confidentiality and authenticity of the session data.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
          <h5 className="text-white font-semibold mb-1 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Automatic Retention
          </h5>
          <p className="text-sm text-slate-400 m-0">Entries are subject to a hard 5-day retention limit to prevent the accumulation of stale sensitive data and maintain engine performance.</p>
        </div>
      </div>

      <Callout type="danger" title="Storage Strategy">
        XEMS is an internal framework component designed for high-performance session storage. It is not a replacement for a general-purpose database like PostgreSQL or MongoDB.
      </Callout>

      <DocsFooter 
        title="Start Over"
        description="Return to the introduction and explore other XyPriss features."
        buttonText="Back to Intro"
        href="/docs"
        iconName="Navigation"
      />
    </div>
  );
}
