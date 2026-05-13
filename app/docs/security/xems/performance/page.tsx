import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Activity, ShieldCheck, Zap, Lock, Cpu, Database, BarChart3, Users } from "lucide-react";

export default function XEMSPerformancePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Performance & Benchmarks</SectionHeading>
      
      <p>XEMS is designed for high-concurrency environments where session stability and low latency are critical. By utilizing a native sidecar process, XEMS eliminates standard Node.js garbage collection spikes and network overhead associated with external stores like Redis.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
          <Zap className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">{"< 1ms"}</div>
          <div className="text-[10px] text-slate-400">Operation Latency</div>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
          <Activity className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">100%</div>
          <div className="text-[10px] text-slate-400">Availability</div>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-center">
          <Users className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <div className="text-xl font-bold text-white">Linear</div>
          <div className="text-[10px] text-slate-400">Scaling Factor</div>
        </div>
      </div>

      <SectionHeading level={2}>Concurrency Audit Results</SectionHeading>
      <p>The following metrics were captured during a mission-critical stress test designed to simulate a high-load production environment with 255 simultaneous users and active token rotation.</p>
      
      <div className="my-6 overflow-hidden rounded-xl border border-white/5">
        <table className="min-w-full text-sm text-slate-400 border-collapse">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 text-left text-white text-xs font-semibold">Metric</th>
              <th className="p-3 text-left text-white text-xs font-semibold">Audit Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-3 font-medium text-slate-200">Transactions</td>
              <td className="p-3 font-mono text-blue-400">255 hits</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-200">Availability</td>
              <td className="p-3 font-mono text-blue-400">100.00 %</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-200">Concurrent Users</td>
              <td className="p-3 font-mono text-blue-400">255</td>
            </tr>
            <tr>
              <td className="p-3 font-medium text-slate-200">Success Rate</td>
              <td className="p-3 font-mono text-green-400">1:1 (Decrypted & Rotated)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Process Reliability</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-1" />
          <div>
            <p className="text-sm font-bold text-white mb-1">Singleton Enforcement</p>
            <p className="text-xs text-muted-foreground">Verified that only one XEMS sidecar process is maintained regardless of the number of server instances sharing a storage path.</p>
          </div>
        </div>
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <ShieldCheck className="w-5 h-5 text-green-400 shrink-0 mt-1" />
          <div>
            <p className="text-sm font-bold text-white mb-1">Collision Protection</p>
            <p className="text-xs text-muted-foreground">Zero file-lock errors or IPC timeouts were recorded throughout surge testing with 1,000+ sessions.</p>
          </div>
        </div>
      </div>

      <Callout type="info" title="Zero GC Latency">
        Because XEMS data is stored in a native Go memory space, it is not subject to the Node.js Garbage Collector. This ensures consistent latency even as the session count grows into the tens of thousands.
      </Callout>

      <DocsFooter 
        title="Usage Guide"
        description="Implementation patterns for session management and manual storage."
        buttonText="Next: Usage Guide"
        href="/docs/security/xems/usage"
        iconName="Layers"
      />
    </div>
  );
}
