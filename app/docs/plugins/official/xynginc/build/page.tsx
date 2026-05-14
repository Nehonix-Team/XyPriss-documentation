import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Cpu, Terminal, Hammer, Box, Github } from "lucide-react";

export default function XyngincBuildPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Build XyNginC from Source</SectionHeading>

      <p>
        If your server uses an architecture not covered by our pre-compiled binaries 
        (like RISC-V), or if you wish to audit the code, you can build XyNginC from source.
      </p>

      <SectionHeading level={2}>Prerequisites</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {[
          { icon: <Box className="text-blue-400" />, title: "Go", value: "Version 1.20 or newer" },
          { icon: <Terminal className="text-green-400" />, title: "Node.js", value: "Version 16.x or newer" },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center gap-4">
            <div className="p-2 bg-white/[0.05] rounded-lg">{item.icon}</div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase font-mono">{item.title}</div>
              <div className="text-white font-bold text-sm">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2}>Build Process</SectionHeading>
      <Steps>
        <Step title="Clone the Repository">
          <CodeBlock 
            language="bash" 
            code="git clone https://github.com/Nehonix-Team/xynginc.git\ncd xynginc" 
          />
        </Step>

        <Step title="Build the CLI (Go)">
          <p>The core logic is written in Go for system-level performance:</p>
          <CodeBlock 
            language="bash" 
            code="go build -o bin/xynginc cmd/main.go" 
          />
        </Step>

        <Step title="Build the Plugin (TypeScript)">
          <p>Install dependencies and compile the TypeScript wrapper:</p>
          <CodeBlock 
            language="bash" 
            code="xfpm install\nxfpm run build" 
          />
        </Step>
      </Steps>

      <SectionHeading level={2}>Manual Binary Placement</SectionHeading>
      <p>After building, place the binary in your system path:</p>
      <CodeBlock 
        language="bash" 
        code="sudo cp bin/xynginc /usr/local/bin/\nsudo chmod +x /usr/local/bin/xynginc" 
      />

      <Callout type="info" title="Devo Architecture">
        The Go CLI binary is designed to be statically linked, making it highly 
        portable across different Linux distributions once compiled.
      </Callout>

      <DocsFooter 
        title="Official Plugins"
        description="Return to the official plugins overview."
        buttonText="Back to Official Plugins"
        href="/docs/plugins/official"
        iconName="Layers"
      />
    </div>
  );
}
