import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  AlertOctagon,
  ShieldAlert,
  Terminal,
  RefreshCw,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function LibxessSecurityViolationPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldAlert size={14} />
          Troubleshooting Guide
        </div>
        <SectionHeading level={1}>
          Troubleshooting: XyPriss Security Violation (libXESS Environment
          Confinement)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          How to diagnose and resolve the critical{" "}
          <code className="text-red-400 font-mono">
            XessShieldRequiredError
          </code>{" "}
          when launching a XyPriss server instance outside of the supervised
          confinement boundary.
        </p>
      </div>

      {/* Status Warning Banner */}
      <div className="p-4 rounded-2xl border border-red-500/25 bg-red-500/[0.05] flex items-start gap-3">
        <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-red-300 uppercase tracking-wider text-[11px]">
            Security Emergency / Immediate Exit
          </div>
          <p className="text-muted-foreground leading-relaxed">
            This exception is intentionally fatal. The native XHSC engine and{" "}
            <code>guardsRunner()</code> intentionally crash the process before
            network sockets bind or secrets decrypt when <code>libXESS</code>{" "}
            confinement is absent.
          </p>
        </div>
      </div>

      {/* Error Summary */}
      <SectionHeading level={2} id="error-summary">
        Error Summary
      </SectionHeading>
      <p className="text-sm text-muted-foreground leading-relaxed">
        When attempting to execute a XyPriss server instance directly using raw
        runtime runners (such as <code>node</code>, <code>bun</code>,{" "}
        <code>ts-node</code>, or standard unsandboxed package runners), the
        application halts immediately with a{" "}
        <strong>Critical Security Violation / Emergency</strong> exception
        payload.
      </p>

      {/* Visual Terminal Screenshot */}
      <div className="my-3 rounded-2xl border border-white/10 bg-[#0d1117] p-2 overflow-hidden shadow-2xl">
        <div className="px-3 py-2 flex items-center justify-between text-xs text-muted-foreground border-b border-white/5 mb-2">
          <span className="font-semibold text-white flex items-center gap-2 text-xs">
            <Terminal size={14} className="text-red-400" />
            Crash Trace Illustration
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Direct Node / Bun Runner Failure
          </span>
        </div>
        <div className="rounded-xl overflow-hidden border border-white/5 bg-black/50">
          <img
            src="/images/troubleshooting/libxess-violation.png"
            alt="XyPriss Security Violation - libXESS environment confinement is mandatory terminal output screenshot"
            className="w-full h-auto object-contain rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Log Output Mock Terminal */}
      <div className="my-2 rounded-2xl border border-red-500/30 bg-[#0b0d13] overflow-hidden shadow-2xl">
        <div className="px-4 py-2.5 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[11px] font-mono text-slate-400 ml-2">
              terminal — crash dump
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
            Exit Code 1
          </span>
        </div>

        <div className="p-5 font-mono text-xs leading-relaxed space-y-3 select-text">
          <div className="text-red-400 flex items-start gap-2">
            <span className="text-red-500 font-bold shrink-0">ERROR [XHSC]</span>
            <span>
              ❌ [XyPriss Security Violation] XyPriss Security Violation:
              libXESS environment confinement is mandatory.
            </span>
          </div>
          <div className="text-slate-400 pl-4 border-l-2 border-red-500/40 space-y-1">
            <p>
              Applications must be launched through the official XFPM CLI (e.g.
              &apos;xfpm run&apos;, &apos;xfpm dev&apos;, &apos;xfpm start&apos;).
            </p>
            <p className="text-slate-500">
              Unconfined direct runtime execution exposes secrets to host disk
              leaks and is strictly prohibited.
            </p>
          </div>
          <div className="pt-2 text-slate-500 text-[11px]">
            <span className="text-red-400 font-semibold">[EMERGENCY:SERVER]</span>{" "}
            Uncaught Exception XyPriss Security Violation: libXESS environment
            confinement is mandatory.
            <br />
            <span className="text-red-300 font-bold">
              XessShieldRequiredError:
            </span>{" "}
            XyPriss Security Violation: libXESS environment confinement is
            mandatory.
          </div>
        </div>
      </div>

      {/* Cause of the Error */}
      <SectionHeading level={2} id="cause">
        Cause of the Error
      </SectionHeading>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This error occurs because{" "}
        <strong>
          XyPriss enforces mandatory security isolation via <code>libXESS</code>{" "}
          at boot time
        </strong>
        . When your entrypoint executes, the <code>guardsRunner()</code> sequence
        and native XHSC engine verify active cryptographic confinement:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Cpu size={16} /> 1. Native Confinement Interlock
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            If the boot sequence detects that the process was invoked outside of
            the official <strong>XFPM CLI</strong> environment, it immediately
            aborts execution to prevent environmental secrets from leaking to
            unshielded host memory or plaintext storage.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <Layers size={16} /> 2. Honeypot &amp; Secret Isolation
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Without <code>libXESS</code> active, third-party packages in{" "}
            <code>node_modules</code> could harvest <code>process.env</code> or
            read plaintext configuration files on disk. The confinement shield
            must be established before user code runs.
          </p>
        </div>
      </div>

      {/* Solutions */}
      <SectionHeading level={2} id="solutions">
        Solutions
      </SectionHeading>

      {/* Solution 1 */}
      <div className="p-6 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.05] via-white/[0.02] to-transparent my-2 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            Recommended
          </span>
          <h3 className="text-base font-bold text-white">
            Solution 1: Use the Official XFPM CLI Commands
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          Do not invoke runtime engine files directly with naked runtime
          commands (<code>node</code>, <code>bun</code>, <code>ts-node</code>, or{" "}
          <code>tsx</code>). You must spin up the server environment
          exclusively through <strong>XFPM</strong>:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-xl border border-white/5 bg-[#0b0f17] flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-white mb-1">
                Development (Hot-Reload)
              </div>
              <p className="text-[10px] text-muted-foreground mb-3">
                Starts dev server with Fileonix watcher and libXESS shield.
              </p>
            </div>
            <CodeBlock language="bash" code="xfpm dev" />
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-[#0b0f17] flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-white mb-1">
                Testing / Single Run
              </div>
              <p className="text-[10px] text-muted-foreground mb-3">
                Executes the target in an isolated, one-shot shielded process.
              </p>
            </div>
            <CodeBlock language="bash" code="xfpm run" />
          </div>

          <div className="p-4 rounded-xl border border-white/5 bg-[#0b0f17] flex flex-col justify-between">
            <div>
              <div className="text-[11px] font-bold text-white mb-1">
                Production Daemon
              </div>
              <p className="text-[10px] text-muted-foreground mb-3">
                Launches clustered or standalone production daemon.
              </p>
            </div>
            <CodeBlock language="bash" code="xfpm start" />
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5">
          <h4 className="text-xs font-bold text-white mb-2">
            Update your <code>package.json</code> scripts:
          </h4>
          <CodeBlock
            language="json"
            code={`// package.json
{
  "scripts": {
    // ❌ UNSUPPORTED (triggers XessShieldRequiredError):
    // "dev": "node src/server.ts",
    // "start": "bun dist/server.js",

    // ✅ OFFICIAL CONFINED WORKFLOW:
    "dev": "xfpm dev",
    "start": "xfpm start",
    "build": "xfpm run build"
  }
}`}
          />
        </div>
      </div>

      {/* Solution 2 */}
      <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] my-2 space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-bold uppercase tracking-widest border border-amber-500/25">
            Tooling Fix
          </span>
          <h3 className="text-base font-bold text-white">
            Solution 2: Fix Outdated or Unsupported XFPM Tooling
          </h3>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          If you are already running <code>xfpm</code> commands but still
          encounter this restriction, your local engine framework or CLI
          version is likely outdated or incompatible with the codebase
          configuration. Choose one of the following upgrade paths:
        </p>

        {/* Option A */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <RefreshCw size={14} className="text-primary" />
              Option A: Forced CLI Engine Upgrade (Fastest Local Fix)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Cross-Platform
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Forces a clean local pipeline synchronization and updates the
            installed CLI binary:
          </p>
          <CodeBlock language="bash" code="xfpm upgrade -f" />
        </div>

        {/* Option B */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Terminal size={14} className="text-primary" />
              Option B: Clean Core Reinstallation (Linux / macOS)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              Bash / Zsh
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Downloads and executes the latest automated distribution installer
            directly from the network node:
          </p>
          <CodeBlock
            language="bash"
            code="curl -sL https://xypriss.nehonix.com/install.js | node"
          />
        </div>

        {/* Option C */}
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <Terminal size={14} className="text-primary" />
              Option C: Clean Core Reinstallation (Windows PowerShell)
            </h4>
            <span className="text-[10px] font-mono text-muted-foreground">
              PowerShell
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Fetches and initializes the official environment framework scripts
            in PowerShell:
          </p>
          <CodeBlock
            language="powershell"
            code="invoke-restmethod https://xypriss.nehonix.com/install.js | node"
          />
          <p className="text-[11px] text-muted-foreground pt-1">
            <em>
              Alternatively, download <code>install.js</code> manually from the URL
              and run <code>node install.js</code> inside your terminal.
            </em>
          </p>
        </div>
      </div>

      {/* Related Resources */}
      <SectionHeading level={2} id="related-resources">
        Related Documentation
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
        <Link
          href="/docs/security/environment-shield"
          className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">
              libXESS Environment Shield
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Deep dive into secret vaulting, honeypots, and memory retention.
            </p>
          </div>
          <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
        </Link>

        <Link
          href="/docs/installation"
          className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all flex items-center justify-between group"
        >
          <div>
            <div className="text-xs font-bold text-white group-hover:text-primary transition-colors">
              Installation Guide
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              System prerequisites, platform binaries, and global setup.
            </p>
          </div>
          <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary shrink-0 ml-2" />
        </Link>
      </div>

      <DocsFooter
        title="Environment Security Shield (libXESS)"
        description="Learn how the Zero-Trust confinement engine isolates secrets and neutralizes supply-chain attacks."
        buttonText="View libXESS Shield"
        href="/docs/security/environment-shield"
        iconName="Shield"
      />
    </div>
  );
}

