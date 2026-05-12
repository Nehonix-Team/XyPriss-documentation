import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Sliders, Zap, FileCode, Play, Terminal, Shield } from "lucide-react";

export default function MetaConfigPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Sliders size={14} />
          Configuration
        </div>
        <SectionHeading level={1}>Meta Configuration System</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Programmatic initialization via <code className="text-primary">+xypriss.meta.ts</code> for advanced setup tasks before standard configuration is applied.
        </p>
      </div>

      <p className="leading-relaxed">
        The Meta Configuration system allows executing arbitrary code during the earliest phase of server initialization. This is critical for tasks like global state adjustment, environment patching, or pre-flight security checks.
      </p>

      <SectionHeading level={2} id="discovery">File Discovery</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        The system searches for a meta file in the project root or hidden directories. Only the first one found is executed.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4 font-mono text-[11px] text-muted-foreground">
        {[
          "+xypriss.meta.ts (Root)",
          "+xypriss.meta.js (Root)",
          ".meta/+xypriss.meta.ts",
          ".xypriss/+xypriss.meta.ts",
        ].map((file, i) => (
          <div key={i} className="px-3 py-2 rounded bg-white/[0.02] border border-white/5 flex items-center gap-2">
            <FileCode size={14} className="text-primary/50" /> {file}
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="execution">Execution Methods</SectionHeading>
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Play size={16} className="text-primary" />
            Immediate Execution (IIFE)
          </h4>
          <p className="text-xs text-muted-foreground mb-3">Any code at the top level of the file executes as soon as the file is imported.</p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Terminal size={16} className="text-primary" />
            The "run" Function
          </h4>
          <p className="text-xs text-muted-foreground mb-3">The recommended way to structure logic. The system invokes this automatically after import.</p>
        </div>
      </div>

      <SectionHeading level={3} id="example">Implementation Example</SectionHeading>
      <CodeBlock 
        language="typescript"
        code={`// +xypriss.meta.ts

// 1. Executes immediately
console.log("Meta layer active.");
__sys__.__env__.set("BOOT_TIME", Date.now().toString());

/**
 * 2. Structured initialization logic
 * Called automatically by ConfigLoader
 */
export function run() {
    if (globalThis.__sys__) {
        // Perform advanced pre-flight checks
    }
}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
        {[
          { t: "Pre-Config", d: "Runs before xypriss.config.jsonc is loaded.", i: Zap },
          { t: "Singleton", d: "Guaranteed to run exactly once per process lifetime.", i: Shield },
          { t: "Fail-Safe", d: "Errors are logged as warnings to prevent startup crashes.", i: Terminal },
        ].map((feat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <feat.i size={16} />
            </div>
            <h4 className="font-bold text-white text-xs">{feat.t}</h4>
            <p className="text-[10px] text-muted-foreground leading-relaxed">{feat.d}</p>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="System Overview"
        description="Return to the Hyper-System API documentation to explore native capabilities."
        buttonText="Back to System"
        href="/docs/system"
        iconName="Cpu"
      />
    </div>
  );
}
