import React from "react";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { DocsFooter } from "@/components/docs/DocsFooter";
import { TechGraph } from "@/components/docs/TechGraph";
import { ShieldCheck, Lock, AlertTriangle, ShieldAlert, CheckCircle, Zap } from "lucide-react";

export default function PluginPermissionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Security Framework
        </div>
        <SectionHeading level={1}>Plugin Permission System</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss uses a <strong>Capability-Based Security Model</strong> to strictly control plugin actions. By default, plugins operate in a zero-trust environment with no access to sensitive global state.
        </p>
      </div>

      <TechGraph 
        title="Permission Enforcement Engine"
        badge="Zero-Trust Proxy"
        nodes={[
          { iconName: "Lock", title: "Isolation", subtitle: "Proxy Sandbox", color: "blue" },
          { iconName: "ShieldAlert", title: "Enforcer", subtitle: "Hook Whitelist", color: "primary", active: true },
          { iconName: "Zap", title: "Execution", subtitle: "Authorized Logic", color: "purple" }
        ]}
        footer={[
          { label: "Sticky Denial", description: "Denied hooks cannot be overridden, even with wildcards.", color: "orange" },
          { label: "Masking", description: "Sensitive data is masked by default for all functional hooks.", color: "blue" }
        ]}
      />

      <SectionHeading level={2} id="default-policy">Default Security Policy</SectionHeading>
      <p>
        Every plugin starts with a "Deny-by-Default" stance. Unless explicitly granted, the following restrictions apply:
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <ShieldAlert size={18} className="text-orange-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">No Config Access</p>
            <p className="text-xs text-muted-foreground"><code>server.app.configs</code> returns <code>undefined</code> to protect environment secrets.</p>
          </div>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-start gap-3">
          <ShieldAlert size={18} className="text-orange-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">App Immutability</p>
            <p className="text-xs text-muted-foreground">Any attempt to modify the <code>app</code> instance triggers a <strong>Security Fatal Error</strong>.</p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="configuration">Configuring Permissions</SectionHeading>
      <p>
        Permissions are configured in <code>xypriss.config.jsonc</code> within the <code>$internal</code> block.
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
        "policy": "allow" // 'allowedHooks' acts as a whitelist
      }
    }
  }
}`}
        />
      </div>

      <SectionHeading level={2} id="constants">Permission Categories</SectionHeading>
      
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            HTTP & Routing (Privileged)
          </h4>
          <div className="space-y-2">
            {[
              { id: "XHS.HOOK.HTTP.REQUEST", desc: "Intercept every incoming request." },
              { id: "XHS.PERM.ROUTING.BYPASS_NAMESPACE", desc: "Allows registering routes outside the /{id}/ prefix." },
              { id: "XHS.PERM.HTTP.GLOBAL_MIDDLEWARE", desc: "Allows injecting middleware affecting all routes." }
            ].map(perm => (
              <div key={perm.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                <code className="text-xs text-primary font-bold">{perm.id}</code>
                <span className="text-[10px] text-muted-foreground">{perm.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
            Security & Sensitive Data
          </h4>
          <Callout type="danger">
            High-Privilege permissions (marked below) are <strong>NEVER</strong> granted via <code>*</code> wildcards. They must be explicitly declared.
          </Callout>
          <div className="space-y-2 mt-4">
            {[
              { id: "XHS.PERM.SECURITY.CONFIGS", desc: "Allows reading the full configs object." },
              { id: "XHS.PERM.SECURITY.SENSITIVE_DATA", desc: "Allows reading unmasked request bodies/headers." },
              { id: "XHS.PERM.LOGGING.CONSOLE_INTERCEPT", desc: "Intercept real-time console output." }
            ].map(perm => (
              <div key={perm.id} className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.01]">
                <code className="text-xs text-orange-400 font-bold">{perm.id}</code>
                <span className="text-[10px] text-muted-foreground">{perm.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="sticky-denials">Sticky Denials</SectionHeading>
      <p>
        The <code>deniedHooks</code> array provides an immutable override. Once a hook is denied in the config file, it cannot be granted at runtime.
      </p>
      
      <div className="my-4">
        <CodeBlock 
          language="json"
          code={`"deniedHooks": ["XHS.PERM.LOGGING.CONSOLE_INTERCEPT"]`}
        />
      </div>

      <DocsFooter 
        title="Plugin API Reference"
        description="Explore the complete documentation for every plugin hook and internal API."
        buttonText="View API Reference"
        href="/docs/plugins/api-reference"
        iconName="Terminal"
      />
    </div>
  );
}
