import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { stableVersion } from "@/lib/stableVersion";
import { Rocket, Shield, Zap, Server, Cpu, Lock, Globe, Package, Layers, ChevronRight, AlertCircle, Terminal, Settings } from "lucide-react";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Rocket size={14} />
          Enterprise-Grade Framework
        </div>
        <SectionHeading level={1}>Introduction to XyPriss</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss is an <strong>Enterprise-Grade Hybrid Web Framework</strong> that combines the raw performance of compiled native binaries with the productivity and flexibility of <strong>TypeScript</strong>.
        </p>
      </div>

      <Callout type="info" title="Stability Note">
        XyPriss has officially left its beta phase. This documentation is up-to-date for the stable <strong>v{stableVersion}</strong> release.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Zap className="text-primary mb-4 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-lg font-bold mb-2 text-white">Hybrid Performance</h3>
          <p className="text-sm text-muted-foreground">
            Bridge compiled speed with developer velocity. Features XHSC Go-engine and XEMS encrypted storage.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Shield className="text-primary mb-4 group-hover:scale-110 transition-transform" size={32} />
          <h3 className="text-lg font-bold mb-2 text-white">Secure by Default</h3>
          <p className="text-sm text-muted-foreground">
            Native Environment Security Shield blocks direct `process.env` access to prevent sensitive data leakage.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="architecture">System Architecture</SectionHeading>
      <p>
        At the center of XyPriss lies <strong>XHSC (XyPriss Hyper-System Core)</strong> — the native engine responsible for low-level HTTP networking, high-speed radix routing, and real-time telemetry.
      </p>

      <div className="space-y-4 my-8">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-bold text-white flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">1</span>
            XHSC (Native Engine)
          </h4>
          <p className="text-sm text-muted-foreground">Handles HTTP/S stack, advanced radix routing, filesystem I/O, and hardware monitoring.</p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-bold text-white flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">2</span>
            Node.js Application Layer
          </h4>
          <p className="text-sm text-muted-foreground">The enterprise application layer for defining business logic, middleware, and processing pipelines.</p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-bold text-white flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs">3</span>
            XFPM Package Manager
          </h4>
          <p className="text-sm text-muted-foreground">High-performance manager for ultra-fast dependency resolution and native core linking.</p>
        </div>
      </div>

      <SectionHeading level={2} id="requirements">Mandatory Requirements</SectionHeading>
      <p>
        Using alternative package managers (npm, yarn, pnpm) or runtimes (node) to execute XyPriss projects may cause unexpected behavior and is not supported.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="py-4 pr-6 font-bold text-white">Requirement</th>
              <th className="py-4 pr-6 font-bold text-white">Purpose</th>
              <th className="py-4 font-bold text-white">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="py-4 pr-6 text-primary font-bold">XFPM</td>
              <td className="py-4 pr-6 text-muted-foreground">Exclusively supported manager for installation and project execution.</td>
              <td className="py-4 font-mono text-[10px] text-green-500">MANDATORY</td>
            </tr>
            <tr>
              <td className="py-4 pr-6 text-primary font-bold">Bun</td>
              <td className="py-4 pr-6 text-muted-foreground">The JavaScript runtime required to execute the application layer.</td>
              <td className="py-4 font-mono text-[10px] text-green-500">MANDATORY</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="quick-install">Quick System Setup</SectionHeading>
      <div className="space-y-6">
        <CodeBlock 
          language="bash" 
          title="Install XFPM & Requirements"
          code="curl -sL https://xypriss.nehonix.com/install.js | node" 
        />
        
        <Callout type="danger" title="XFPM Exclusivity">
          All XyPriss projects MUST use <code>xfpm</code> for dependency management. npm/yarn/pnpm are not supported.
        </Callout>
      </div>

      <div className="mt-12 p-8 rounded-2xl border border-primary/10 bg-primary/5 flex items-center justify-between gap-6">
         <div className="flex-1">
           <div className="flex items-center gap-2 text-primary mb-2">
             <AlertCircle size={20} />
             <span className="font-bold">Next Steps</span>
           </div>
           <p className="text-sm text-muted-foreground">
             Proceed to the full installation guide to configure your development environment.
           </p>
         </div>
         <Link 
           href="/docs/installation" 
           className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-3 shrink-0 relative z-10 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
         >
           <span className="tracking-tight">Installation Guide</span>
           <ChevronRight size={20} />
         </Link>
      </div>
    </div>
  );
}
