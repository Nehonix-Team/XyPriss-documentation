"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Lock, ShieldCheck, ShieldAlert, Key, EyeOff } from "lucide-react";

export default function SecurityPermissionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Lock size={14} />
          API Reference
        </div>
        <SectionHeading level={1}>Security Permissions</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss uses static permission IDs (Capabilities) to grant plugins access to sensitive core systems and high-privilege operations.
        </p>
      </div>

      <TechGraph 
        title="Capability Resolution"
        badge="Zero-Trust Enforcement"
        nodes={[
          { iconName: "Lock", title: "Sandbox", subtitle: "Restricted Default", color: "blue" },
          { iconName: "Key", title: "Manifest", subtitle: "Declared Intent", color: "primary", active: true },
          { iconName: "ShieldCheck", title: "Verify", subtitle: "Config Match", color: "purple" },
          { iconName: "ShieldAlert", title: "Access", subtitle: "Authorized Run", color: "orange" }
        ]}
        footer={[
          { label: "Granularity", description: "Permissions are mapped to specific hooks and system primitives.", color: "blue" },
          { label: "Immutability", description: "Once denied in config, capabilities cannot be elevated at runtime.", color: "purple" }
        ]}
      />

      <SectionHeading level={2} id="capabilities">Static Capability Registry</SectionHeading>
      <p>
        These permissions must be explicitly granted within the <code>xypriss.config.jsonc</code> security policy to enable access to sensitive core systems.
      </p>

      <div className="my-6 overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground tracking-widest">
            <tr>
              <th className="px-4 py-3">Permission ID</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[11px]">
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.PERM.SECURITY.CONFIGS</td>
              <td className="px-4 py-3 font-bold text-orange-400">PRIVILEGED</td>
              <td className="px-4 py-3 text-muted-foreground">Authorization to read the complete server configuration telemetry.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.PERM.SECURITY.SENSITIVE_DATA</td>
              <td className="px-4 py-3 font-bold text-orange-400">PRIVILEGED</td>
              <td className="px-4 py-3 text-muted-foreground">Authorization to access unmasked request data (PII/Enc).</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.PERM.ROUTING.BYPASS_NAMESPACE</td>
              <td className="px-4 py-3 font-bold text-red-400">CRITICAL</td>
              <td className="px-4 py-3 text-muted-foreground">Authorization to register routes on any global path.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.PERM.ROUTING.OVERWRITE_PROTECTED</td>
              <td className="px-4 py-3 font-bold text-red-400">CRITICAL</td>
              <td className="px-4 py-3 text-muted-foreground">Authorization to replace existing system or plugin routes.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">XHS.PERM.HTTP.GLOBAL_MIDDLEWARE</td>
              <td className="px-4 py-3 font-bold text-orange-400">PRIVILEGED</td>
              <td className="px-4 py-3 text-muted-foreground">Authorization to inject middleware affecting all routes.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="enforcement">Enforcement Logic</SectionHeading>
      <div className="space-y-4">
        <p>
          Permissions are enforced at the <strong>System Proxy</strong> layer. Any attempt to access a protected method or hook without the required ID will result in a <code>SecurityViolation</code> exception.
        </p>
        <Callout type="warning" title="Privileged vs Standard">
          Standard hooks can be granted via wildcards in some configurations, but <strong>Privileged</strong> and <strong>Critical</strong> permissions <u>must</u> be explicitly declared as strings.
        </Callout>
      </div>

      <DocsFooter 
        title="Technical Reference"
        description="Return to the main Plugin API interface and priority specifications."
        buttonText="Back to Reference"
        href="/docs/plugins/api-reference"
        iconName="Key"
      />
    </div>
  );
}
