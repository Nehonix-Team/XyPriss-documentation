import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { TechGraph } from "@/components/ui/TechGraph";
import { Server, ShieldCheck, Zap, Lock, Cpu, Database, Activity } from "lucide-react";

export default function XEMSArchitecturePage() {
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

  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XEMS Architecture</SectionHeading>
      
      <p>The XyPriss Encrypted Memory Store (XEMS) is built on a "Moving Target Defense" philosophy, prioritizing isolation, automation, and cryptographic binding to secure sensitive session data.</p>

      <SectionHeading level={2}>Sidecar Process Model</SectionHeading>
      <p>XEMS operates as a standalone sidecar binary. This ensures a strict boundary between the application logic and the storage engine, protecting data from Node.js-level vulnerabilities.</p>
      
      <TechGraph 
        title="XEMS Architecture"
        badge="Native Sidecar"
        nodes={xemsNodes}
        footer={[
          { label: "Isolation", description: "Data never touches the Node.js memory heap.", color: "primary" },
          { label: "Security", description: "Encryption is tied to physical machine HWID.", color: "blue" }
        ]}
      />

      <SectionHeading level={2}>Security & Encryption</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Lock className="w-5 h-5" /> AES-256-GCM
          </div>
          <p className="text-xs text-slate-400">All persistent data is encrypted with AEAD support, ensuring both confidentiality and authenticity of the stored vault.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <ShieldCheck className="w-5 h-5" /> Hardware-Bound Entropy
          </div>
          <p className="text-xs text-slate-400">Encryption keys are derived using physical HWID, preventing vault decryption if files are moved to another machine.</p>
        </div>
      </div>

      <SectionHeading level={2}>Advanced Mechanisms</SectionHeading>
      
      <SectionHeading level={3}>Atomic Token Rotation</SectionHeading>
      <p>Supports per-request session rotation. Upon successful retrieval, the current token is invalidated and a new one is issued, narrowing the hijacking window.</p>
      
      <SectionHeading level={3}>Multi-Server Singleton</SectionHeading>
      <p>If multiple server instances target the same persistence path, they automatically share a single background XEMS process to eliminate file system locks and race conditions.</p>

      <Callout type="info" title="Automatic Retention">
        XEMS is strictly for transient data. All entries are subject to a hard 5-day retention limit to ensure the engine remains lean and secure.
      </Callout>

      <DocsFooter 
        title="Configuration"
        description="Learn how to tune performance, storage, and security limits for XEMS."
        buttonText="Next: Configuration"
        href="/docs/security/xems/configuration"
        iconName="Layers"
      />
    </div>
  );
}
