import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { TechGraph } from "@/components/ui/TechGraph";
import { Shield, Lock, ShieldAlert, Cpu, Layers } from "lucide-react";

export default function SecurityOverviewPage() {
  const securityNodes = [
    { 
      iconName: "Shield", 
      title: "Entrance", 
      subtitle: "Honeypot & Tarpit", 
      active: true,
      color: "primary" as const
    },
    { 
      iconName: "Lock", 
      title: "Validation", 
      subtitle: "XSec Engine", 
      active: true,
      color: "blue" as const
    },
    { 
      iconName: "Layers", 
      title: "Runtime", 
      subtitle: "Isolated Env", 
      active: true,
      color: "purple" as const
    },
  ];

  const securityFooter = [
    {
      label: "Zero-Trust",
      description: "Every request is validated at the edge before hitting business logic.",
      color: "primary" as const
    },
    {
      label: "Hardware-Bound",
      description: "Encryption keys are tied to physical hardware identifiers.",
      color: "blue" as const
    }
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading className="flex justify-center items-center" level={1}>Security Architecture</SectionHeading>
      
      <p>XyPriss is built with a "Security-First" philosophy, integrating enterprise-grade protection directly into the core engine. Unlike traditional frameworks that rely on third-party middleware, XyPriss utilizes its native <strong>XHSC Bridge</strong> to perform security validations at the binary level.</p>

      <TechGraph 
        title="Security Pipeline"
        badge="Enterprise Grade"
        nodes={securityNodes}
        footer={securityFooter}
      />

      <SectionHeading level={2}>The Multi-Layered Shield</SectionHeading>
      <p>Your application is protected by several independent security layers that work in tandem to neutralize threats before they reach your code.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <ShieldAlert className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="text-white font-semibold mb-1">Environment Shield</h4>
          <p className="text-xs text-slate-400">Prevents sensitive file access (like <code>.env</code> or <code>.git</code>) and blocks path traversal attempts at the binary level.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Cpu className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="text-white font-semibold mb-1">XSec Engine</h4>
          <p className="text-xs text-slate-400">A dedicated Go-native cryptographic engine for ultra-fast password hashing (Argon2id) and signature validation.</p>
        </div>
      </div>

      <SectionHeading level={2}>Core Security Features</SectionHeading>
      <ul>
        <li><strong>Automatic Sanitization:</strong> Native protection against XSS, SQL Injection, and Command Injection.</li>
        <li><strong>Memory Isolation:</strong> Sensitive data is handled in isolated memory spaces to prevent heap inspection.</li>
        <li><strong>Hardware Binding:</strong> Encryption keys are cryptographically bound to the host's physical hardware.</li>
        <li><strong>Moving Target Defense:</strong> Automatic token rotation and honeypot traps for automated scanners.</li>
      </ul>

      <Callout type="info" title="Zero-Cost Security">
        Because these validations happen in the native XHSC bridge, they have near-zero impact on your Node.js event loop performance.
      </Callout>

      <DocsFooter 
        title="Security Guide"
        description="Learn how to configure the various security levels and modules for your application."
        buttonText="Next: Security Guide"
        href="/docs/security/guide"
        iconName="Shield"
      />
    </div>
  );
}
