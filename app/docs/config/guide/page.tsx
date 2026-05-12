import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Sliders, FileCode, Zap, Shield, Database, Layout } from "lucide-react";

export default function ConfigGuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Sliders size={14} />
          Configuration
        </div>
        <SectionHeading level={1}>Guide & Structure</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Centralized, deterministic configuration using <code className="text-primary">xypriss.config.jsonc</code> with support for dynamic variable injection.
        </p>
      </div>

      <Callout type="info" title="Strict Root Loading">
        XyPriss only loads configuration from the absolute project root. Nested configurations in subdirectories are ignored for security and determinism.
      </Callout>

      <SectionHeading level={2} id="structure">Primary Sections</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="text-primary font-mono text-xs font-bold mb-2 flex items-center gap-2">
            <Database size={14} /> $vars
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Project metadata and application-wide variables populated into the <code className="text-primary">__sys__.vars</code> namespace.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="text-primary font-mono text-xs font-bold mb-2 flex items-center gap-2">
            <Shield size={14} /> $internal
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Enterprise-grade plugin authorization and isolated filesystem workspace definitions.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="dynamic-injection">Dynamic Variable Injection</SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        XyPriss supports recursive dynamic property resolution using various providers, ensuring clean separation between code and environment.
      </p>

      <div className="space-y-6">
        {[
          { k: "&(env).KEY", d: "Injects environment variables with optional fallbacks.", c: '"port": "&(env).PORT || 8080"' },
          { k: "&(pkg).path", d: "Accesses properties from package.json (keys or values).", c: '"version": "&(pkg).version"' },
          { k: "&(this).KEY", d: "Self-reference other properties in the same config file.", c: '"baseUrl": "http://&(this).$vars.host"' },
          { k: "&(file).path", d: "Injects file contents (certificates, secrets) synchronously.", c: '"cert": "&(file)./certs/server.crt"' },
        ].map((item, i) => (
          <div key={i} className="group">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xs font-bold font-mono text-white bg-primary/20 px-2 py-1 rounded border border-primary/20">{item.k}</div>
              <p className="text-xs text-muted-foreground">{item.d}</p>
            </div>
            <CodeBlock language="json" code={item.c} />
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="typescript-access">Accessing in TypeScript</SectionHeading>
      <CodeBlock 
        language="typescript"
        code={`// Securely access resolved variables anywhere
const port = __sys__.vars.get("port") || 8080;
const projectName = __sys__.vars.get("__project_name__");

console.log(\`Starting \${projectName} on port \${port}...\`);`}
      />

      <DocsFooter 
        title="Network Engine"
        description="Configure HTTP/2, Compression, Rate Limiting, and Reverse Proxy plugins."
        buttonText="Network Specs"
        href="/docs/config/network"
        iconName="Activity"
      />
    </div>
  );
}
