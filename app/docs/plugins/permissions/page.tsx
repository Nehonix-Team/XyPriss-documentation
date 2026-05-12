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

      <SectionHeading level={2} id="data-masking">Request Data Masking</SectionHeading>
      <p>
        To protect PII (Personally Identifiable Information), XyPriss automatically masks sensitive request fields before passing them to plugin hooks.
      </p>

      <div className="my-6 p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
        <div className="flex flex-wrap gap-2">
          {["req.body", "req.query", "req.cookies", "req.headers", "req.params"].map(field => (
            <code key={field} className="text-[10px] bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">{field}</code>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic">
          Unauthorized access returns: "Access to sensitive request data is restricted... Requires XHS.PERM.SECURITY.SENSITIVE_DATA"
        </p>
      </div>

      <SectionHeading level={2} id="signatures">Zero-Trust Signatures (G3)</SectionHeading>
      <p>
        The G3 architecture ensures plugin integrity via the <code>xypriss.plugin.xsig</code> manifest. This Ed25519-signed block prevents post-installation tampering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
          <Key size={18} className="text-primary shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-xs mb-1">Author Pinning (TOFU)</h5>
            <p className="text-[10px] text-muted-foreground">The author's public key is pinned upon first installation. Updates must be signed by the same key.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
          <ShieldCheck size={18} className="text-green-400 shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-xs mb-1">Deep Audit</h5>
            <p className="text-[10px] text-muted-foreground">The XHSC engine re-calculates the SHA-256 fingerprint of every plugin file during server startup.</p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="data-masking">Request Data Masking</SectionHeading>
      <p>
        To protect PII (Personally Identifiable Information), XyPriss automatically masks sensitive request fields before passing them to plugin hooks.
      </p>

      <div className="my-6 p-6 rounded-2xl border border-white/5 bg-white/[0.02] space-y-4">
        <div className="flex flex-wrap gap-2">
          {["req.body", "req.query", "req.cookies", "req.headers", "req.params"].map(field => (
            <code key={field} className="text-[10px] bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20">{field}</code>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          When restricted, these fields return a standard security warning. Access requires the <code>XHS.PERM.SECURITY.SENSITIVE_DATA</code> permission.
        </p>
      </div>

      <SectionHeading level={2} id="signatures">Zero-Trust Signatures (G3)</SectionHeading>
      <p>
        The G3 architecture ensures plugin integrity via the <code>xypriss.plugin.xsig</code> manifest. This Ed25519-signed block prevents post-installation tampering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
          <Key size={18} className="text-primary shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-xs mb-1">Author Pinning (TOFU)</h5>
            <p className="text-[10px] text-muted-foreground">The author's public key is pinned upon first installation. Updates must be signed by the same key.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex gap-3">
          <ShieldCheck size={18} className="text-green-400 shrink-0 mt-1" />
          <div>
            <h5 className="font-bold text-white text-xs mb-1">Deep Audit</h5>
            <p className="text-[10px] text-muted-foreground">The XHSC engine re-calculates the SHA-256 fingerprint of every plugin file during server startup.</p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="denials">Sticky Denials</SectionHeading>
      <p>
        XyPriss supports immutable "Sticky Denials" via the <code>deniedHooks</code> array. These always take precedence over the <code>allowedHooks</code> whitelist, including the <code>*</code> wildcard.
      </p>
      
      <div className="my-6 p-4 rounded-xl border border-red-500/20 bg-red-500/5">
        <p className="text-xs text-red-400 font-bold mb-2 flex items-center gap-2">
          <ShieldAlert size={14} />
          Enforcement Logic
        </p>
        <p className="text-[10px] text-red-300/70 leading-relaxed">
          Once a hook is denied in the static configuration, it cannot be overridden at runtime by any plugin management logic or dynamic permission updates.
        </p>
      </div>

      <SectionHeading level={2} id="high-privilege">High-Privilege Restrictions</SectionHeading>
      <p>
        Certain capabilities are classified as <strong>High-Privilege</strong>. To prevent accidental elevation, these are <u>never</u> granted via the <code>*</code> wildcard and must be explicitly declared.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          "XHS.PERM.SECURITY.CONFIGS",
          "XHS.PERM.SECURITY.SENSITIVE_DATA",
          "XHS.PERM.ROUTING.BYPASS_NAMESPACE",
          "XHS.PERM.ROUTING.OVERWRITE_PROTECTED",
          "XHS.PERM.HTTP.GLOBAL_MIDDLEWARE",
          "XHS.PERM.OPS.AUXILIARY_SERVER"
        ].map(perm => (
          <div key={perm} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-[9px] text-orange-400">
            {perm}
          </div>
        ))}
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
