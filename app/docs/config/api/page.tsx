import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Sliders, Code, Zap, Shield, HelpCircle, Activity } from "lucide-react";

export default function ConfigsApiPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Sliders size={14} />
          Configuration
        </div>
        <SectionHeading level={1}>Configs API (Singleton)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Type-safe, global configuration manager that solves initialization timing issues in modular structures.
        </p>
      </div>

      <Callout type="info" title="Thread Safety">
        The Configs API is isolated per process, ensuring stability in Cluster mode and worker-node environments.
      </Callout>

      <SectionHeading level={2} id="usage">Basic Usage</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Instead of accessing <code className="text-primary font-bold">app.configs</code> directly, use the <code className="text-primary font-bold">Configs</code> singleton for safe, modular access anywhere in your code.
      </p>
      <CodeBlock 
        language="typescript"
        code={`import { Configs } from "xypriss";

// Get configuration (type-safe)
const fileUpload = Configs.get("fileUpload");

// Get with default fallback
const serverPort = Configs.getOrDefault("server", { port: 8080 }).port;

// Check if a section exists
if (Configs.has("security")) {
    /* logic */
}`}
      />

      <SectionHeading level={2} id="modifying">Modifying Configuration</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        Update or merge settings dynamically during runtime.
      </p>
      <CodeBlock 
        language="typescript"
        code={`// Deep merge partial updates
Configs.merge({
    fileUpload: { maxFileSize: 50 * 1024 * 1024 }
});

// Update specific section
Configs.update("logging", { level: "debug" });`}
      />

      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 my-10">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
          Available Keys
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6">
          {[
            "env", "cache", "performance", "monitoring", "server", "multiServer",
            "requestManagement", "fileUpload", "security", "cluster", "logging", "middleware"
          ].map((key, i) => (
            <div key={i} className="text-[11px] font-mono text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/40" /> {key}
            </div>
          ))}
        </div>
      </div>

      <DocsFooter 
        title="Multi-Server Setup"
        description="Configure distributed architectures with dedicated worker nodes and primary controllers."
        buttonText="Scale Now"
        href="/docs/config/multi-server"
        iconName="Layers"
      />
    </div>
  );
}
