import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Database, Settings, Info, Tag, Wrench, RefreshCw } from "lucide-react";

export default function VarsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Database size={14} />
          System Module
        </div>
        <SectionHeading level={1}>Dynamic Variables (vars)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Structured key-value store for global parameters, build configuration, and software metadata.
        </p>
      </div>

      <p className="leading-relaxed">
        The <code className="text-primary">vars</code> module provides a centralized memory store for application-wide settings. 
        It supports both built-in system properties (like version and root path) and user-defined dynamic variables with full IntelliSense support.
      </p>

      <SectionHeading level={2} id="builtin-properties">
        Built-in Global Properties
      </SectionHeading>
      <p className="mb-6">
        These formal properties are initialized by the framework and reflect the core identity of the executing instance.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[
          { name: "__version__", desc: "Software version" },
          { name: "__author__", desc: "Project creator" },
          { name: "__name__", desc: "Project identifier" },
          { name: "__root__", desc: "Absolute project root" },
          { name: "__port__", desc: "Execution port" },
          { name: "__alias__", desc: "Short name/shortcut" },
          { name: "__description__", desc: "Application summary" },
          { name: "__app_urls__", desc: "Endpoint dictionary" },
        ].map((prop, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <div className="text-primary font-mono text-xs font-bold mb-1 group-hover:text-white transition-colors">{prop.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{prop.desc}</div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="management-methods">
        Variable Management
      </SectionHeading>
      
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Tag size={18} className="text-primary" />
            .get(key, defaultValue?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Securely retrieves a value. It automatically checks explicit global properties before searching the dynamic map.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const theme = __sys__.vars.get("theme", "standard-dark");
const root = __sys__.vars.get("__root__");`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Settings size={18} className="text-primary" />
            .set(key, value)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Instantiates or overwrites a dynamic variable in application memory.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.vars.set("max_retries", 5);`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <RefreshCw size={18} className="text-primary" />
            .update(data)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Iteratively merges a complex data block into the store.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.vars.update({
    cache_ttl: 3600,
    allow_guests: false
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="utility-methods">
        Extraction & Utilities
      </SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h5 className="font-bold text-white mb-2 flex items-center gap-2">
            <Wrench size={16} className="text-primary" />
            .all() / .toJSON()
          </h5>
          <p className="text-xs text-muted-foreground mb-4">Generates a consolidated representation of the entire current store.</p>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h5 className="font-bold text-white mb-2 flex items-center gap-2">
            <RefreshCw size={16} className="text-primary" />
            .clone()
          </h5>
          <p className="text-xs text-muted-foreground mb-4">Creates a robust, unlinked memory copy to prevent collateral mutation.</p>
        </div>
      </div>

      <Callout type="info" title="Persistency Note">
        The <code className="text-primary">vars</code> store is volatile and resides in memory. 
        For persistent configuration across restarts, use the <code className="text-primary">fs</code> module to write to a JSON file or the <code className="text-primary">__env__</code> module for environment-level settings.
      </Callout>

      <DocsFooter 
        title="Start Here"
        description="Go back to the introduction or jump to the installation guide."
        buttonText="Getting Started"
        href="/docs"
        iconName="ArrowRight"
      />
    </div>
  );
}
