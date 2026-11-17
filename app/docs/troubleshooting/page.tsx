import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  AlertTriangle,
  ShieldAlert,
  ChevronRight,
  Terminal,
  Cpu,
  RefreshCw,
  HelpCircle,
  FileQuestion,
  CheckCircle2,
} from "lucide-react";

export default function TroubleshootingHubPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <HelpCircle size={14} />
          Troubleshooting &amp; Diagnostics
        </div>
        <SectionHeading level={1}>Troubleshooting</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Diagnostic guides, common exception resolutions, and system recovery
          procedures for XyPriss and the <code>xfpm</code> runtime engine.
        </p>
      </div>

      <Callout type="info" title="Zero-Trust Error Model">
        XyPriss fails fast and loudly when execution invariants are violated.
        Most runtime startup crashes originate from unconfined process execution
        or missing <code>libXESS</code> supervision rather than application code
        bugs.
      </Callout>

      <SectionHeading level={2} id="common-issues">
        Common Issues &amp; Security Violations
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        <Link
          href="/docs/troubleshooting/libxess-security-violation"
          className="group p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.03] hover:border-red-500/40 hover:bg-red-500/[0.06] transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 text-red-400 text-[10px] font-bold uppercase tracking-wider border border-red-500/25">
                <ShieldAlert size={12} />
                Critical Security Violation
              </span>
              <ChevronRight
                size={16}
                className="text-red-400 transition-transform group-hover:translate-x-1"
              />
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
              libXESS Environment Confinement Violation
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <code>XessShieldRequiredError</code>: Triggered when invoking
              servers directly via raw <code>node</code>, <code>bun</code>, or{" "}
              <code>ts-node</code> instead of the official <code>xfpm</code> CLI.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] text-red-400 font-semibold">
            <span>View diagnosis &amp; fix</span>
            <ChevronRight size={12} />
          </div>
        </Link>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/25">
                <RefreshCw size={12} />
                Tooling Sync
              </span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">
              Outdated XFPM Tooling &amp; Binary Mismatch
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When XFPM CLI binaries fall out of sync with the project engine
              requirements, run <code>xfpm upgrade -f</code> or re-run the
              official installer.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-muted-foreground">
            Covered in the <strong>libXESS Violation Guide</strong> (Solution 2).
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="diagnostic-checklist">
        Diagnostic Checklist
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Terminal size={14} /> 1. Check Execution Wrapper
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Verify that your <code>package.json</code> scripts use{" "}
            <code>xfpm dev</code>, <code>xfpm run</code>, or{" "}
            <code>xfpm start</code> instead of naked runtime binaries.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Cpu size={14} /> 2. Verify Confinement State
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Ensure <code>libXESS</code> supervisor is actively wrapping the
            process before network sockets attempt to bind.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <CheckCircle2 size={14} /> 3. Sync Engine Dependencies
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Always install packages via <code>xfpm install</code> to maintain
            content-addressable dependency integrity and CAS signatures.
          </p>
        </div>
      </div>

      <DocsFooter
        title="libXESS Environment Confinement Violation"
        description="Resolve XessShieldRequiredError and unconfined direct runtime crashes."
        buttonText="Next: libXESS Guide"
        href="/docs/troubleshooting/libxess-security-violation"
        iconName="ShieldAlert"
      />
    </div>
  );
}

