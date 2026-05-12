import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { ShieldCheck, Lock, Eye, AlertCircle, ShieldAlert, Key } from "lucide-react";

export default function PluginPermissionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Security Governance
        </div>
        <SectionHeading level={1}>
          Plugin Permission System
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss uses a <strong>Capability-Based Security Model</strong> to strictly control plugin actions, enforcing a zero-trust environment by default.
        </p>
      </div>

      <TechGraph 
        title="Permission Resolution Engine"
        badge="Deny-by-Default Policy"
        nodes={[
          { iconName: "Lock", title: "Sandbox", subtitle: "Isolated Proxy", color: "blue" },
          { iconName: "Key", title: "Whitelist", subtitle: "Explicit Allowed", color: "primary", active: true },
          { iconName: "ShieldAlert", title: "Sticky Denial", subtitle: "Immutable Block", color: "orange" },
          { iconName: "ShieldCheck", title: "Execution", subtitle: "Verified Code", color: "purple" }
        ]}
        footer={[
          { label: "Sticky Denial", description: "Denied hooks always override allow-lists, even with wildcards.", color: "orange" },
          { label: "Privileged Access", description: "High-privilege hooks must be explicitly declared as strings.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="config">Configuring Permissions</SectionHeading>
      <p>
        Permissions are defined in the <code>xypriss.config.jsonc</code> file. This allows for granular control over what each plugin can and cannot do within your server instance.
      </p>

      <div className="my-6">
        <CodeBlock 
          language="json" 
          code={`{
  "$internal": {
    "monitoring-plugin": {
      "permissions": {
        "allowedHooks": [
          "XHS.PERM.LOGGING.CONSOLE_INTERCEPT",
          "XHS.PERM.SECURITY.CONFIGS"
        ],
        "policy": "allow" // Whitelist mode
      }
    },
    "external-untrusted": {
      "permissions": {
        "allowedHooks": ["*"],
        "deniedHooks": ["XHS.PERM.LOGGING.CONSOLE_INTERCEPT"], // Sticky Denial
        "policy": "allow"
      }
    }
  }
}`}
        />
      </div>

      <SectionHeading level={2} id="constants">Permission Constants</SectionHeading>
      <p>
        XyPriss provides semantic constants to define capabilities. Certain hooks are marked as <strong>Privileged</strong> and require extra caution.
      </p>

      <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground tracking-widest">
            <tr>
              <th className="px-4 py-3">Permission ID</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Capability</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.HOOK.HTTP.REQUEST</td>
              <td className="px-4 py-3"><span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">PRIVILEGED</span></td>
              <td className="px-4 py-3 text-muted-foreground">Intercept every incoming HTTP request.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.PERM.SECURITY.CONFIGS</td>
              <td className="px-4 py-3"><span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold">PRIVILEGED</span></td>
              <td className="px-4 py-3 text-muted-foreground">Read full server configuration and secrets.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.PERM.ROUTING.BYPASS</td>
              <td className="px-4 py-3"><span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-bold">CRITICAL</span></td>
              <td className="px-4 py-3 text-muted-foreground">Register routes outside the plugin namespace.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.HOOK.METRICS.*</td>
              <td className="px-4 py-3"><span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-bold">STANDARD</span></td>
              <td className="px-4 py-3 text-muted-foreground">Monitor performance and error metrics.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="sticky-denials">Sticky Denials</SectionHeading>
      <p>
        Sticky Denials via the <code>deniedHooks</code> array are the strongest form of protection in XyPriss.
      </p>
      <ul className="space-y-4 my-6">
        <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <ShieldAlert size={20} className="text-orange-400 shrink-0" />
          <p className="text-sm text-muted-foreground"><strong>Absolute Priority</strong>: Denied hooks always override allowed hooks, even if the <code>*</code> wildcard is used.</p>
        </li>
        <li className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <Lock size={20} className="text-primary shrink-0" />
          <p className="text-sm text-muted-foreground"><strong>Static Enforcement</strong>: Denials are enforced at the engine level and cannot be bypassed at runtime by any plugin logic.</p>
        </li>
      </ul>

      <Callout type="warning" title="High-Privilege Restriction">
        Certain hooks (e.g., <code>SECURITY.CONFIGS</code>, <code>SENSITIVE_DATA</code>) are <strong>never</strong> granted via wildcards. They must be explicitly declared as strings for intentional authorization.
      </Callout>

      <SectionHeading level={2} id="violations">Security Violations</SectionHeading>
      <p>
        XyPriss handles unauthorized attempts gracefully. If a plugin attempts to use a restricted hook without permission:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <p className="text-xs font-bold text-white mb-1 uppercase tracking-widest">1. Block</p>
          <p className="text-[10px] text-muted-foreground">Operation is blocked by proxy.</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <p className="text-xs font-bold text-white mb-1 uppercase tracking-widest">2. Log</p>
          <p className="text-[10px] text-muted-foreground">Security warning is recorded.</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
          <p className="text-xs font-bold text-white mb-1 uppercase tracking-widest">3. Skip</p>
          <p className="text-[10px] text-muted-foreground">Process continues without crash.</p>
        </div>
      </div>

      <DocsFooter 
        title="Plugin Development Guide"
        description="Learn how to build and publish high-performance plugins for the XyPriss ecosystem."
        buttonText="Read Development Guide"
        href="/docs/plugins/development-guide"
        iconName="Code"
      />
    </div>
  );
}
