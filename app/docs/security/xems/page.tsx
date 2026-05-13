import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { ShieldCheck, Zap, Lock, Cpu, Database, Activity, Terminal, Layers } from "lucide-react";

export default function XEMSLandingPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XEMS: Encrypted Memory Store</SectionHeading>

      <p>
        The <strong>XyPriss Encrypted Memory Store (XEMS)</strong> is a
        high-performance, security-hardened session and temporary data storage
        engine. It is designed to provide military-grade session isolation and
        persistence with zero external dependencies.
      </p>

      <SectionHeading level={2}>Core Concepts</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Cpu className="w-4 h-4" /> Sidecar Model
          </div>
          <p className="text-[10px] text-slate-400 m-0">
            Operates as a dedicated native process managed by XHSC, ensuring
            sensitive session data is never stored within the Node.js memory
            space.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Lock className="w-4 h-4" /> Sandboxing
          </div>
          <p className="text-[10px] text-slate-400 m-0">
            Data is partitioned into logical Sandboxes, providing
            cryptographically isolated namespaces for different parts of your
            application.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Zap className="w-4 h-4" /> Atomic Rotation
          </div>
          <p className="text-[10px] text-slate-400 m-0">
            Implements per-request token rotation to significantly narrow the
            window for session hijacking attacks.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Database className="w-4 h-4" /> Hardware Binding
          </div>
          <p className="text-[10px] text-slate-400 m-0">
            Encrypted "Vaults" are bound to the physical hardware's HWID,
            ensuring storage files cannot be decrypted on other machines.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Technical Documentation</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          {
            title: "Architecture",
            desc: "Deep dive into the sidecar model, IPC protocols, and encryption standards.",
            href: "/docs/security/xems/architecture",
          },
          {
            title: "Configuration",
            desc: "Reference for tuning performance, storage, and security limits.",
            href: "/docs/security/xems/configuration",
          },
          {
            title: "Performance",
            desc: "Verified benchmarks and high-concurrency results.",
            href: "/docs/security/xems/performance",
          },
          {
            title: "Usage Guide",
            desc: "Implementation patterns for sessions and manual storage.",
            href: "/docs/security/xems/usage",
          },
          {
            title: "Implementation Tutorial",
            desc: "Step-by-step guide to building secure auth systems.",
            href: "/docs/security/xems/tutorial",
          },
        ].map((mod, idx) => (
          <a
            key={idx}
            href={mod.href}
            className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors no-underline group"
          >
            <h5 className="text-white font-semibold mb-1 text-sm group-hover:text-blue-400 transition-colors">
              {mod.title}
            </h5>
            <p className="text-[10px] text-slate-400 m-0">{mod.desc}</p>
          </a>
        ))}
      </div>

      <Callout type="warning" title="Transient Data Only">
        XEMS is designed for security-sensitive, high-churn, or transient data.
        While it provides high-performance storage, it is not a replacement for
        a general-purpose database.
      </Callout>

      <DocsFooter
        title="Architecture"
        description="Explore the moving target defense philosophy behind XEMS."
        buttonText="Next: Architecture"
        href="/docs/security/xems/architecture"
        iconName="Shield"
      />
    </div>
  );
}
