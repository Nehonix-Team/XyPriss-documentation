import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Eye, Activity, RefreshCw, Terminal, Layers } from "lucide-react";

export default function FsWatchPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Eye size={14} />
          Filesystem Module
        </div>
        <SectionHeading level={1}>File Watching</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Reactive filesystem monitoring powered by the native XHSC event system.
        </p>
      </div>

      <SectionHeading level={2} id="event-monitoring">Event Monitoring</SectionHeading>
      <p className="mb-6">Monitor one or multiple paths for any change event (create, write, delete, rename).</p>
      
      <div className="space-y-6 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            .watch(paths, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Standard event listener for path changes. The <code className="text-primary">duration</code> option (ms) defines the polling or debouncing window.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.fs.watch(["./src", "./config"], { duration: 300 });`}
          />
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            .watchContent(paths, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Monitors file content changes. If <code className="text-primary">diff: true</code> is passed, the system computes and returns delta information.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.fs.watchContent("./logs/app.log", { diff: true });`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="automated-processing">Automated Processing</SectionHeading>
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 my-6">
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
          <Terminal size={18} className="text-primary" />
          .watchAndProcess (wap)
        </h4>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Watches a path and triggers a callback on every detected change. Ideal for auto-builds or live-reloading.
        </p>
        <CodeBlock 
          language="typescript"
          code={`__sys__.fs.wap("./src", () => {
    console.log("Source changed — re-running build...");
});`}
        />
      </div>

      <SectionHeading level={2} id="aliases">Method Aliases</SectionHeading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[
          { a: "wap", f: "watchAndProcess" },
          { a: "wc", f: "watchContent" },
          { a: "wp", f: "watchParallel" },
          { a: "wcp", f: "watchContentParallel" },
        ].map((alias, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <div className="font-mono text-primary font-bold mb-1">{alias.a}</div>
            <div className="text-[10px] text-muted-foreground uppercase">{alias.f}</div>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Security & Advanced"
        description="Master encryption, secure deletion, and advisory file locking."
        buttonText="Explore Advanced"
        href="/docs/system/filesystem/security"
        iconName="Lock"
      />
    </div>
  );
}
