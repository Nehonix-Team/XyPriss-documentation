import React from "react";
import {
  ShieldCheck,
  Cpu,
  Code2,
  GitBranch,
  Workflow,
  AlertTriangle,
  Terminal,
  FileText,
  Lock,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const Section = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) => (
  <section className="mb-16">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight m-0">{title}</h2>
    </div>
    <div className="space-y-6">{children}</div>
  </section>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-all duration-300 ${className}`}
  >
    {children}
  </div>
);

import { CodeBlock } from "@/components/docs/CodeBlock";

export default function ContributingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] uppercase font-bold tracking-widest text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />{" "}
          Community
        </div>
        <h1 className="text-5xl font-extrabold tracking-tighter mb-6">
          Contributing to <span className="text-primary">XyPriss</span>
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
          Thank you for your interest in contributing to the XyPriss framework.
          We welcome contributions that align with our mission of providing
          high-performance, secure, and developer-friendly infrastructure.
        </p>
      </header>

      <Section title="License Compliance" icon={ShieldCheck}>
        <p className="text-slate-300 leading-relaxed">
          XyPriss is licensed under the{" "}
          <a
            href="https://dll.nehonix.com/licenses/NOSL/v2"
            target="_blank"
            className="text-white hover:text-primary transition-colors font-bold underline underline-offset-4 decoration-white/20 hover:decoration-primary"
          >
            Nehonix Open Source License (NOSL) v2.0
          </a>
          . By contributing to this project, you agree that:
        </p>
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <div className="flex gap-4">
              <span className="text-primary font-bold text-lg">01</span>
              <div>
                <h4 className="font-bold text-white mb-2">Work for Hire</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  All contributions, including code, documentation, and assets,
                  are considered "works made for hire" for Nehonix.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-4">
              <span className="text-primary font-bold text-lg">02</span>
              <div>
                <h4 className="font-bold text-white mb-2">IP Protection</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Nehonix retains all intellectual property rights. You grant
                  Nehonix a non-exclusive, perpetual, irrevocable, worldwide,
                  royalty-free license to use, modify, and distribute your
                  contributions.
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex gap-4">
              <span className="text-primary font-bold text-lg">03</span>
              <div>
                <h4 className="font-bold text-white mb-2">
                  No Unauthorized Distribution
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  You may not distribute derivative works of XyPriss outside the
                  terms specified in the NOSL without explicit written
                  authorization from Nehonix Legal Department.
                </p>
              </div>
            </div>
          </Card>
        </div>
        <p className="text-sm text-slate-500 mt-4 italic">
          For the full legal text, please refer to the{" "}
          <a
            href="https://dll.nehonix.com/licenses/NOSL/v2"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            LICENSE <ExternalLink className="w-3 h-3" />
          </a>{" "}
          or visit the Nehonix Legal portal.
        </p>
      </Section>

      <Section title="Technical Standards" icon={Cpu}>
        <p className="text-slate-300 leading-relaxed">
          To maintain the integrity and performance of XyPriss, all
          contributions must adhere to these standards:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-white">Language</h4>
            </div>
            <p className="text-sm text-slate-400">
              Use TypeScript for all application-layer logic and Go for core
              engine (XHSC) updates.
            </p>
          </Card>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <Workflow className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-white">Modularity</h4>
            </div>
            <p className="text-sm text-slate-400">
              Code must be modular and maintainable. Avoid monolithic functions
              or classes.
            </p>
          </Card>
          <Card className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h4 className="font-bold text-white">Style & Professionalism</h4>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2 text-sm text-slate-400">
              <li className="flex gap-2">
                {" "}
                Maintain a professional and serious tone.
              </li>
              <li className="flex gap-2 text-red-400">
                <strong>No emojis</strong> permitted in code or docs.
              </li>
              <li className="flex gap-2">
                {" "}
                Use{" "}
                <code className="text-primary px-1 bg-white/5 rounded">
                  lucide-react
                </code>{" "}
                for frontend icons.
              </li>
              <li className="flex gap-2 font-bold">
                {" "}
                Use{" "}
                <code className="text-primary px-1 bg-white/5 rounded">
                  xfpm
                </code>{" "}
                for all tasks.
              </li>
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="Contribution Workflow" icon={GitBranch}>
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-primary">
                1
              </span>
              Environment Setup
            </h3>
            <p className="text-slate-400 mb-6 text-sm">
              To maintain consistency with the XyPriss security and performance
              model, contributors must adhere to the following setup:
            </p>
            <ul className="space-y-4 text-sm text-slate-300">
              <li>
                1. <strong className="text-white">Fork</strong> the repository
                and create a feature branch from{" "}
                <code className="bg-white/5 px-1 rounded text-primary">
                  master
                </code>
                .
              </li>
              <li>
                2. <strong className="text-white">Tooling</strong>: Ensure{" "}
                <code className="bg-white/5 px-1 rounded text-primary">
                  xfpm
                </code>{" "}
                is installed.{" "}
                <strong>npm, yarn, or pnpm are strictly prohibited</strong>.
              </li>
              <li>
                3. <strong className="text-white">Native Engine (XHSC)</strong>:
                You must install the XHSC core in a{" "}
                <code className="bg-white/5 px-1 rounded text-primary">
                  bin/
                </code>{" "}
                directory at the project root.
              </li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <CodeBlock
                language="bash"
                title="Linux / macOS"
                code="curl -sL https://dll.nehonix.com/repo/xypriss/install-xhsc.sh | bash"
                className="my-0"
              />
              <CodeBlock
                language="powershell"
                title="Windows (PowerShell)"
                code="iwr -useb https://dll.nehonix.com/repo/xypriss/install-xhsc.ps1 | iex"
                className="my-0"
              />
            </div>
            <p className="text-xs text-slate-500 mt-4 italic">
              Manual download available at{" "}
              <a
                href="http://dll.nehonix.com/repo/xypriss/xhsc/bin"
                className="text-primary hover:underline underline-offset-4"
              >
                dll.nehonix.com
              </a>
              .
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-primary">
                2
              </span>
              Implementation & Validation
            </h3>
            <div className="space-y-4">
              <Card>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      Mandatory Simulation
                    </h4>
                    <p className="text-sm text-slate-400">
                      Every contribution must be accompanied by a simulation
                      project located in the{" "}
                      <code className="text-primary">simulations/</code>{" "}
                      directory.
                    </p>
                  </div>
                </div>
              </Card>
              <CodeBlock
                language="json"
                title="tsconfig.json Mapping"
                code={`"paths": { "xypriss": ["../../src/index.ts"] }`}
                className="my-0"
              />
              <p className="mt-4 text-red-400 opacity-80 uppercase tracking-tighter font-bold text-xs">
                Important: Do not include xypriss in dependencies.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-sm font-bold text-primary">
                3
              </span>
              Submission
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />{" "}
                Ensure branch is up-to-date with upstream{" "}
                <code className="text-primary">master</code>.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />{" "}
                Submit PR with a concise, technical description and simulation
                link.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-1 shrink-0" />{" "}
                Link PR using{" "}
                <code className="text-primary">"Closes #issue-number"</code>.
              </li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Security Disclosures" icon={Lock}>
        <div
          id="disclosure-policy"
          className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center text-center md:text-left"
        >
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-2">
              Responsible Disclosure Policy
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              To protect the XyPriss ecosystem, we strictly enforce a
              responsible disclosure policy. Please do not report security
              vulnerabilities through public issues. To report a security
              concern, contact our dedicated security team at:
            </p>
            <a
              href="mailto:support@team.nehonix.com"
              className="text-red-400 font-mono mt-2 block hover:underline"
            >
              support@team.nehonix.com
            </a>
          </div>
        </div>
      </Section>

      <footer className="mt-32 pt-12 border-t border-white/5 text-center text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">
        © 2026 NEHONIX. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

const Activity = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);
