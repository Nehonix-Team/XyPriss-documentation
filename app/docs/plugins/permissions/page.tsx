"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { ShieldCheck, ShieldAlert, Key, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PluginPermissionsPage() {
  const router = useRouter();

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
      <div className="space-y-4">
        <p>
          Permissions are defined in the <code>xypriss.config.jsonc</code> file. This allows for granular control over what each plugin can and cannot do within your server instance.
        </p>
        <p className="text-sm text-muted-foreground">
          You must define an explicit whitelist of hooks for each plugin within the <code>$internal</code> block. For a detailed guide on how to structure this configuration, see our tutorial.
        </p>
        <button 
          onClick={() => router.push("/docs/plugins/tutorials/usage#configuration")}
          className="mt-4 px-4 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all w-fit cursor-pointer border-none shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          View Configuration Tutorial <ChevronRight size={14} />
        </button>
      </div>

      <SectionHeading level={2} id="constants">Permission Constants</SectionHeading>
      <p>
        XyPriss provides semantic constants to define capabilities. Certain hooks are marked as <strong>Privileged</strong> and require extra caution. For a complete technical breakdown of each permission, see the <button onClick={() => router.push("/docs/plugins/api-reference/security")} className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline-flex items-center gap-1">Security API Reference <ChevronRight size={12} /></button>.
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

      <SectionHeading level={2} id="data-masking">Request Data Masking</SectionHeading>
      <div className="space-y-4">
        <p>
          To protect PII (Personally Identifiable Information), XyPriss automatically masks sensitive request fields before passing them to plugin hooks.
        </p>
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
      <div className="space-y-4">
        <p>
          The G3 architecture ensures plugin integrity via the <code>xypriss.plugin.xsig</code> manifest. This Ed25519-signed block prevents post-installation tampering.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
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
        <button 
          onClick={() => router.push("/docs/plugins/tutorials/usage#trust")}
          className="mt-4 px-4 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all w-fit cursor-pointer border-none shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          Learn about the Trust Flow <ChevronRight size={14} />
        </button>
      </div>

      <SectionHeading level={2} id="denials">Sticky Denials</SectionHeading>
      <div className="space-y-4">
        <p>
          XyPriss supports immutable "Sticky Denials" via the <code>deniedHooks</code> array. These always take precedence over the <code>allowedHooks</code> whitelist, including the <code>*</code> wildcard.
        </p>
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
          <p className="text-xs text-red-400 font-bold mb-2 flex items-center gap-2">
            <ShieldAlert size={14} />
            Enforcement Logic
          </p>
          <p className="text-[10px] text-red-300/70 leading-relaxed">
            Once a hook is denied in the static configuration, it cannot be overridden at runtime by any plugin management logic or dynamic permission updates.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="high-privilege">High-Privilege Restrictions</SectionHeading>
      <div className="space-y-4">
        <p>
          Certain capabilities are classified as <strong>High-Privilege</strong>. To prevent accidental elevation, these are <u>never</u> granted via the <code>*</code> wildcard and must be explicitly declared.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
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
