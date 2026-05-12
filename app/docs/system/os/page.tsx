import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { 
  Cpu, 
  Activity, 
  HardDrive, 
  Network, 
  Zap, 
  Info,
  Terminal,
  Activity as ActivityIcon,
  Monitor,
  Wrench
} from "lucide-react";

export default function OSPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Cpu size={14} />
          System Module
        </div>
        <SectionHeading level={1}>Operating System & Hardware (os)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Low-level telemetry and control over the host machine's hardware and processes.
        </p>
      </div>

      <p className="leading-relaxed">
        The <code className="text-primary">os</code> module provides deep insights into the host system. 
        By delegating hardware queries to the **XHSC engine**, XyPriss ensures that gathering metrics like CPU load or process execution is extremely accurate and does not block the Node.js event loop.
      </p>

      <SectionHeading level={2} id="hardware-telemetry">
        Hardware Telemetry
      </SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Cpu size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Processor Stats</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Real-time CPU load and per-core telemetry.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const cpu = __sys__.os.cpu(); // Overall usage
const cores = __sys__.os.cpu(true); // Per-core metrics`}
          />
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Zap size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Memory & Swap</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Precise RAM and Swap usage information.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const ram = __sys__.os.memory();
console.log(ram.available_memory);`}
          />
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <HardDrive size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Disk Monitoring</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Status of mounted volumes and partition space.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const root = __sys__.os.disks("/");
console.log(root.used_percent);`}
          />
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Info size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Hardware Snapshot</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Deep architectural info and motherboard data.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const specs = __sys__.os.hardware;
console.log(specs.arch);`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="process-management">
        Process & Network Control
      </SectionHeading>
      
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Monitor size={18} className="text-primary" />
            .processes(options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Queries the process tree. You can target specific PIDs or retrieve the heaviest processes by CPU/Memory.
          </p>
          <CodeBlock 
            language="typescript"
            code={`// Top 3 heaviest apps
const heavy = __sys__.os.processes({ topCpu: 3 });`}
          />
          <Callout type="info">
            Internal XyPriss system processes are automatically excluded from the returned list to prevent monitoring pollution.
          </Callout>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Terminal size={18} className="text-primary" />
            .kill(target)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Safely terminates processes by PID or exact process name.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.os.kill(9923);      // By PID
__sys__.os.kill("nginx"); // By Name`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Network size={18} className="text-primary" />
            .ports()
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Returns a list of active network sockets, their states (<code className="text-primary">LISTEN</code>, <code className="text-primary">ESTABLISHED</code>), and the PIDs holding them.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="extended-telemetry">
        Extended Telemetry
      </SectionHeading>
      <p className="mb-6">
        Access specialized sensors and global system status reports.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {[
          { name: ".temp()", desc: "Thermal sensor data" },
          { name: ".battery()", desc: "Power states & charging" },
          { name: ".health()", desc: "Aggregated health report" },
          { name: ".uptime()", desc: "System boot duration" },
          { name: ".homeDir()", desc: "User profile path" },
          { name: ".platform()", desc: "OS platform string" },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <div className="text-primary font-mono text-xs font-bold mb-1 group-hover:text-white transition-colors">{item.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.desc}</div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="monitoring">
        Real-time Monitoring
      </SectionHeading>
      <p className="mb-4">
        XyPriss allows for targeted real-time monitoring of PIDs or global loads over a specific duration.
      </p>
      <CodeBlock 
        language="typescript"
        code={`// Monitor the heaviest process for 30 seconds
const { pid } = __sys__.os.processes({ topCpu: 1 })[0];
__sys__.os.monitorProcess(pid, 30);`}
      />

      <DocsFooter 
        title="Utilities Module"
        description="High-performance string, async, and validation suite."
        buttonText="Explore Utilities"
        href="/docs/system/utils"
        iconName="Wrench"
      />
    </div>
  );
}
