import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Cpu,
  Database,
  HardDrive,
  Activity,
  Terminal,
  Network,
  Shield,
  Info,
  Battery,
  Thermometer,
  HeartPulse,
} from "lucide-react";

export default function OSPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Cpu size={14} />
          System Module
        </div>
        <SectionHeading level={1}>
          Operating System & Hardware (os)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Low-level telemetry and control over the host machine's hardware and
          process tree.
        </p>
        <p className="leading-relaxed">
          The <code className="text-primary">os</code> module provides deep
          insights into the physical and logical state of the server. Delegated
          to the **XHSC engine**, hardware queries execute outside the Node.js
          event loop for maximum accuracy and zero performance impact.
        </p>
      </div>

      <SectionHeading level={2} id="hardware">
        Hardware Telemetry
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Activity size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              CPU Load
            </h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Real-time telemetry for aggregated load or individual logical cores.
          </p>
          <CodeBlock
            language="typescript"
            code={`const load = __sys__.os.cpu(); // Aggregated
const cores = __sys__.os.cpu(true); // Per-core stats`}
          />
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Database size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Memory & Swap
            </h4>
          </div>
          <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
            Precise reporting of available, used, and total physical RAM.
          </p>
          <CodeBlock
            language="typescript"
            code={`const ram = __sys__.os.memory();`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
          <HardDrive size={24} className="text-primary" />
          <div>
            <div className="font-mono text-xs text-white">.disks(mount?)</div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Storage volume monitoring.
            </p>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
          <Info size={24} className="text-primary" />
          <div>
            <div className="font-mono text-xs text-white">
              .hardware (getter)
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Deep architectural snapshot.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="management">
        Process & Network Management
      </SectionHeading>

      <div className="space-y-6 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Terminal size={18} className="text-primary" />
            .processes(options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Natively queries the process tree. Internal XyPriss processes are
            automatically excluded from the results.
          </p>
          <CodeBlock
            language="typescript"
            code={`// Find top 3 memory-intensive processes
const topMem = __sys__.os.processes({ topMem: 3 });`}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <Network size={16} className="text-primary" />
              .ports()
            </h5>
            <p className="text-xs text-muted-foreground mb-4">
              Inspect active networking sockets and PIDs.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h5 className="font-bold text-white mb-2 flex items-center gap-2">
              <Shield size={16} className="text-primary" />
              .kill(target)
            </h5>
            <p className="text-xs text-muted-foreground mb-4">
              Terminate processes by PID or exact name.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="extended">
        Extended Features
      </SectionHeading>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {[
          { n: ".info()", d: "Comprehensive system/OS snapshot.", i: Info },
          {
            n: ".network()",
            d: "IO stats and interface throughput.",
            i: Network,
          },
          {
            n: ".monitorProcess()",
            d: "Temporal watch on specific PID.",
            i: Activity,
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-center group hover:border-primary/20 transition-colors"
          >
            <f.i
              size={24}
              className="text-primary mx-auto mb-3 group-hover:scale-110 transition-transform"
            />
            <div className="font-mono text-xs text-white mb-1">{f.n}</div>
            <p className="text-[9px] text-muted-foreground uppercase leading-tight">
              {f.d}
            </p>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="telemetry">
        Sensors & Environment
      </SectionHeading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[
          { n: ".temp()", i: Thermometer, d: "Thermal sensor data." },
          { n: ".battery()", i: Battery, d: "Power & charging state." },
          { n: ".health()", i: HeartPulse, d: "Aggregated health report." },
          { n: ".homeDir()", i: Terminal, d: "User home directory." },
        ].map((t, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center"
          >
            <t.i size={20} className="text-primary mb-2" />
            <div className="font-mono text-[10px] text-white font-bold mb-1">
              {t.n}
            </div>
            <p className="text-[9px] text-muted-foreground uppercase">{t.d}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-center">
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-xs text-primary">
          .platform()
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-xs text-primary">
          .arch()
        </div>
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 font-mono text-xs text-primary">
          .monitor()
        </div>
      </div>

      <DocsFooter
        title="Utilities"
        description="High-performance suite for string manipulation, data validation, and logic."
        buttonText="Explore Utils"
        href="/docs/system/utils"
        iconName="Zap"
      />
    </div>
  );
}
