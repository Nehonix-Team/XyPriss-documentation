import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Shield, Box, Lock, HardDrive, AlertCircle } from "lucide-react";

export default function WorkspaceSystemPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Shield size={14} />
          Plugin Framework
        </div>
        <SectionHeading level={1}>Workspace System</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Tightly control filesystem access and logic execution for plugins through enterprise-grade sandboxing.
        </p>
      </div>

      <div className="space-y-12 my-6">
        <div>
          <SectionHeading level={2} id="authorization">Authorization via Config</SectionHeading>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Plugin permissions are explicitly authorized in <code className="text-primary">xypriss.config.jsonc</code> under the <code className="text-primary">$internal</code> key.
          </p>
          <CodeBlock 
            language="json"
            code={`{
    "$internal": {
        "@my-org/my-plugin": {
            "__xfs__": {
                "path": "ROOT://.private/plugin-data",
            }
        }
    }
}`}
          />
        </div>

        <div>
          <SectionHeading level={2} id="anchors">Path Resolution Anchors</SectionHeading>
          <p className="text-sm text-muted-foreground mb-6">
            The path resolver enforces explicit semantic anchors to prevent unauthorized traversal.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="text-primary font-mono text-xs font-bold mb-2">ROOT://</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Resolves relative to the <strong>Global Project Root</strong>. Shifts to <strong>Plugin Root</strong> when called within a plugin.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 border-yellow-500/10">
              <div className="text-yellow-500 font-mono text-xs font-bold mb-2">CWD://</div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Resolves relative to the active execution directory. Use with extreme caution as it grants host-level access.
              </p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading level={2} id="usage">Accessing Workspaces</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">
            Plugins retrieve their authorized filesystem instance from the global <code className="text-primary">__sys__</code> API.
          </p>
          <CodeBlock 
            language="typescript"
            code={`export function initMyPlugin() {
    const workspaceFS = __sys__.plugins.get("@my-org/my-plugin");
    
    if (!workspaceFS) {
        throw new Error("Plugin not authorized");
    }

    // Trapped within the assigned sandbox
    const files = workspaceFS.fs.lsDirs(".");
}`}
          />
        </div>

        <Callout type="warning" title="Void Sandbox (Bac à sable Éphémère)">
          If a plugin is not explicitly authorized, XyPriss provisions a <strong>Void Sandbox</strong>—an ephemeral, empty temporary directory. 
          The plugin continues to run without crashing, but its filesystem operations natively return empty results, protecting real project data.
        </Callout>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            Multi-Tenant Isolation
          </h4>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Lock size={18} className="text-primary shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-white">Caller-Aware Resolution</strong>: Anchors like <code className="text-primary">ROOT://</code> adapt automatically based on whether the caller is the host app or a specific plugin.
              </p>
            </div>
            <div className="flex gap-4">
              <HardDrive size={18} className="text-primary shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-white">Env Sandboxing</strong>: Plugins can only "see" environment variables defined in their own <code className="text-primary">.env</code> files.
              </p>
            </div>
          </div>
        </div>
      </div>

      <DocsFooter 
        title="Plugin Development"
        description="Master the art of building scalable and secure plugins for XyPriss."
        buttonText="Development Guide"
        href="/docs/plugins/development-guide"
        iconName="Code"
      />
    </div>
  );
}
