import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Settings,
  FolderLock,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Laptop,
  Mail,
  Zap,
} from "lucide-react";

export default function WindowsNotesPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Laptop size={14} />
          Windows Setup Guide
        </div>
        <SectionHeading level={1}>
          Important Notes for Windows Users
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Ensuring smooth execution, preventing execution locks, and managing
          antivirus false positives on Windows.
        </p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        XyPriss is a hybrid web framework that pairs the developer
        productivity of <strong>TypeScript</strong> with high-performance
        native compiled engines (written in Go and C). To deliver this speed and
        cryptographic security, XyPriss includes pre-compiled native binaries.
      </p>

      {/* False Positives Explanation */}
      <SectionHeading level={2} id="antivirus-false-positives">
        1. Antivirus False Positives on Windows
      </SectionHeading>
      <p className="text-sm text-muted-foreground leading-relaxed">
        For internal integrity, tampering defense, and runtime protection, some
        of our native engine binaries are compiled with code hardening and
        obfuscation. As a result, generic heuristic scanners—such as{" "}
        <strong>Windows Defender</strong> or third-party antivirus suites—may
        occasionally flag newly downloaded engine binaries as unrecognized or
        suspicious.
      </p>

      <Callout type="info" title="100% False Positive Guarantee">
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground mt-1">
          <li>
            <strong className="text-white">Safe &amp; Verified:</strong>{" "}
            Official XyPriss and XFPM binaries are clean, safe, and contain zero
            malware or telemetry backdoors.
          </li>
          <li>
            <strong className="text-white">Strict Local Privacy:</strong>{" "}
            XyPriss and NEHONIX <strong>never</strong> collect, track, or transship
            any personal data. Everything runs strictly on your local machine.
          </li>
          <li>
            <strong className="text-white">Direct Enterprise Support:</strong>{" "}
            For security audits or enterprise verification, reach our engineers
            directly at{" "}
            <a
              href="mailto:support@team.nehonix.com"
              className="text-primary underline font-medium"
            >
              support@team.nehonix.com
            </a>
            .
          </li>
        </ul>
      </Callout>

      {/* Recommended Approaches */}
      <SectionHeading level={2} id="recommended-configuration">
        2. Recommended Configuration on Windows
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        To develop seamlessly with XyPriss on Windows without files being
        quarantined or execution blocked, you have two options:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        <div className="p-5 rounded-2xl border border-primary/30 bg-primary/[0.04] flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
              Option A (Quick Setup)
            </span>
            <h3 className="text-base font-bold text-white mt-2 mb-1">
              Temporarily Disable Real-Time Protection
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ideal for fast bootstrap. Temporarily toggle Real-time protection
              off while running <code>xfpm install</code> and your development
              server (<code>xfpm dev</code> / <code>xfpm run</code>).
            </p>
          </div>
          <a
            href="#option-a-walkthrough"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>Jump to walkthrough</span> &darr;
          </a>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
              Option B (Long-Term)
            </span>
            <h3 className="text-base font-bold text-white mt-2 mb-1">
              Add a Persistent Folder Exclusion
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Recommended for ongoing development. Adds persistent exclusions
              for <code>%USERPROFILE%\.xfpm</code> and your workspace project
              directory.
            </p>
          </div>
          <a
            href="#option-b-exclusions"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            <span>Jump to exclusion guide</span> &darr;
          </a>
        </div>
      </div>

      {/* Option A Walkthrough */}
      <SectionHeading level={2} id="option-a-walkthrough">
        Option A: Temporarily Disabling Real-Time Protection
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Follow the step-by-step walkthrough below to disable Real-time protection
        in Windows Defender.
      </p>

      {/* Step 1 */}
      <div className="space-y-4 my-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
            1
          </span>
          <h3 className="text-base font-bold text-white">
            Step 1: Open Windows Security
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Open Windows Security using either of the following methods:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
          <li>
            Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-mono text-slate-200">Win</kbd> +{" "}
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-mono text-slate-200">I</kbd> to open{" "}
            <strong>Settings</strong> &rarr; navigate to <strong>Privacy &amp; security</strong> &rarr;{" "}
            <strong>Windows Security</strong> &rarr; click <strong>Open Windows Security</strong>.
          </li>
          <li>
            Or open the Start menu, type <strong>Windows Security</strong>, and press{" "}
            <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-[11px] font-mono text-slate-200">Enter</kbd>.
          </li>
        </ul>
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2">
          <img
            src="/images/windows/wd-home.png"
            alt="Windows Security - Security at a glance"
            className="w-full h-auto object-contain rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-4 my-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
            2
          </span>
          <h3 className="text-base font-bold text-white">
            Step 2: Navigate to Virus &amp; Threat Protection Settings
          </h3>
        </div>
        <ol className="list-decimal pl-5 space-y-1 text-xs text-muted-foreground">
          <li>
            In the left navigation menu or the dashboard cards, click on{" "}
            <strong className="text-white">Virus &amp; threat protection</strong>.
          </li>
          <li>
            Scroll down to the{" "}
            <strong className="text-white">Virus &amp; threat protection settings</strong> section.
          </li>
          <li>
            Click on the <strong className="text-white">Manage settings</strong> hyperlink.
          </li>
        </ol>
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2">
          <img
            src="/images/windows/wd-step-2.png"
            alt="Windows Security - Virus & threat protection settings"
            className="w-full h-auto object-contain rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Step 3 */}
      <div className="space-y-4 my-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">
            3
          </span>
          <h3 className="text-base font-bold text-white">
            Step 3: Turn Off Real-Time Protection
          </h3>
        </div>
        <ol className="list-decimal pl-5 space-y-1 text-xs text-muted-foreground">
          <li>
            Locate the <strong className="text-white">Real-time protection</strong> toggle switch at the top.
          </li>
          <li>
            Click the toggle to switch it from <strong className="text-white">On</strong> to <strong className="text-white">Off</strong>.
          </li>
          <li>
            When the Windows User Account Control (UAC) prompt appears asking{" "}
            <em>&quot;Do you want to allow this app to make changes to your device?&quot;</em>, select{" "}
            <strong className="text-white">Yes</strong>.
          </li>
        </ol>
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2">
          <img
            src="/images/windows/wd-step-3.png"
            alt="Windows Security - Turn Off Real-time protection"
            className="w-full h-auto object-contain rounded-lg"
            loading="lazy"
          />
        </div>

        <Callout type="info" title="Automatic Re-Enablement">
          Windows Defender will notify you that Real-time protection is turned off.
          It will automatically re-enable itself after a system reboot or when you
          manually toggle it back on.
        </Callout>
      </div>

      {/* Option B Exclusions */}
      <SectionHeading level={2} id="option-b-exclusions">
        Option B: Adding a Persistent Folder Exclusion
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        If you prefer to keep Real-time protection enabled for the rest of your
        system, add persistent exclusions for the XyPriss package manager
        directory and your workspace projects.
      </p>

      <div className="space-y-4 my-2">
        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Settings size={15} className="text-primary" />
            Via Windows Security GUI
          </h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs text-muted-foreground">
            <li>
              In the <strong>Virus &amp; threat protection settings</strong> page
              (from Step 2 above), scroll down to the <strong>Exclusions</strong> section.
            </li>
            <li>
              Click on <strong>Add or remove exclusions</strong>.
            </li>
            <li>
              Click <strong>Add an exclusion</strong> &rarr; select <strong>Folder</strong>.
            </li>
            <li>
              Add the following paths:
              <ul className="list-disc pl-5 mt-1 space-y-1 font-mono text-slate-300">
                <li>
                  <code>%USERPROFILE%\.xfpm</code> (e.g.,{" "}
                  <code>C:\Users\&lt;YourUser&gt;\.xfpm</code>)
                </li>
                <li>
                  Your project workspace directory (e.g.,{" "}
                  <code>C:\Users\&lt;YourUser&gt;\Documents\projects\my-xypriss-app</code>)
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Terminal size={15} className="text-primary" />
            Via PowerShell (Run as Administrator)
          </h4>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Open an administrative PowerShell prompt and execute:
          </p>
          <CodeBlock
            language="powershell"
            code={`# Add global XFPM directory to Windows Defender exclusions
Add-MpPreference -ExclusionPath "$HOME\\.xfpm"

# Add your project workspace directory (replace with your actual project path)
Add-MpPreference -ExclusionPath "C:\\Path\\To\\Your\\XyPriss\\Projects"`}
          />
        </div>
      </div>

      {/* Third Party Antivirus */}
      <SectionHeading level={2} id="third-party-antivirus">
        3. Third-Party Antivirus Suites
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        If you are using third-party endpoint protection suites (such as{" "}
        <strong>Avast</strong>, <strong>AVG</strong>, <strong>Bitdefender</strong>,{" "}
        <strong>Kaspersky</strong>, or <strong>Norton</strong>):
      </p>

      <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-2 text-xs text-muted-foreground leading-relaxed">
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>Open your antivirus management console.</li>
          <li>
            Locate the <strong>Protection Shields / Real-Time Scan</strong> settings.
          </li>
          <li>
            Either temporarily pause the active shield while developing, or navigate to{" "}
            <strong>Exceptions / Whitelist</strong> and add:
            <ul className="list-disc pl-5 mt-1 space-y-1 font-mono text-slate-300">
              <li>The <code>%USERPROFILE%\.xfpm</code> directory</li>
              <li>Your project repository root folder</li>
            </ul>
          </li>
        </ol>
      </div>

      {/* Need Assistance */}
      <SectionHeading level={2} id="need-assistance">
        4. Need Assistance?
      </SectionHeading>
      <p className="text-sm text-muted-foreground leading-relaxed">
        If you encounter unexpected permission denials or binary lock errors on
        Windows, consult our{" "}
        <Link
          href="/docs/troubleshooting"
          className="text-primary underline font-medium"
        >
          Troubleshooting Guide
        </Link>{" "}
        or contact our security engineering team directly at{" "}
        <a
          href="mailto:support@team.nehonix.com"
          className="text-primary underline font-medium"
        >
          support@team.nehonix.com
        </a>
        .
      </p>

      <DocsFooter
        title="Installation Guide"
        description="Review global prerequisites, package manager installation, and initial project scaffolding."
        buttonText="Back to Installation"
        href="/docs/installation"
        iconName="Laptop"
      />
    </div>
  );
}

