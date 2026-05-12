import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocsFooter } from "@/components/docs/DocsFooter";
import { SectionHeading } from "@/components/docs/SectionHeading";
import {
  Package,
  Zap,
  Shield,
  Terminal,
  Search,
  Lock,
  RefreshCw,
  Cpu,
  Layers,
  Key,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Settings,
  ArrowRight,
  Code,
  Database,
  Globe,
  Wrench,
  Eye,
  Trash2,
  Download,
  PenTool,
  List,
} from "lucide-react";
import Link from "next/link";

export default function XFPMPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* ─── Hero ─── */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Package size={14} />
          Package Manager
        </div>
        <SectionHeading className="flex justify-center items-center" level={1}>
          XFPM - XyPriss Fast Package Manager
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The official high-performance CLI tool for dependency resolution,
          security auditing, and full project orchestration across the XyPriss
          ecosystem. Built entirely in Go.
        </p>
        <p className="text-muted-foreground">
          <strong className="text-white">XFPM</strong> focuses on efficient
          dependency resolution, reproducible environments, and secure package
          isolation powered by a CAS-based architecture. It replaces traditional
          package managers with deep integration into the XHSC native engine,
          Zero-Trust G3 cryptographic signing, and a built-in intelligent
          security audit loop.
        </p>
      </div>

      {/* ─── Key Features ─── */}
      <SectionHeading level={2} id="features">
        Key Features
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          {
            icon: <Zap size={20} />,
            title: "Neural Dependency Resolution",
            desc: "Resolves even the most complex dependency trees via a Neural Dependency Graph — recalculating only the modified portions on updates.",
          },
          {
            icon: <Lock size={20} />,
            title: "Strict Isolation (CAS + Virtual Store)",
            desc: "Content-addressable storage and Ancestor Hoisting prevent ghost dependencies, ensuring environments remain pure across projects.",
          },
          {
            icon: <Shield size={20} />,
            title: "Zero-Trust G3 Security",
            desc: "Native Ed25519 cryptographic signing and a Trust On First Use (TOFU) verification layer protect every plugin in the ecosystem.",
          },
          {
            icon: <RefreshCw size={20} />,
            title: "Auto-Update Engine",
            desc: "Keeps the CLI current automatically. No manual intervention required to stay on the latest security patches.",
          },
          {
            icon: <Search size={20} />,
            title: "Intelligent Security Auditing",
            desc: "Multi-step SCA engine powered by the OSV database, with an automated repair loop, re-verification pass, and decentralized revocation enforcement.",
          },
          {
            icon: <Globe size={20} />,
            title: "Cross-Platform Single Binary",
            desc: "Native binaries for Windows, Linux, and macOS (amd64 & arm64). No runtime dependencies - one self-contained executable.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group"
          >
            <div className="text-primary mb-3">{f.icon}</div>
            <h4 className="font-bold mb-2">{f.title}</h4>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ─── Installation ─── */}
      <SectionHeading level={2} id="installation">
        Installation
      </SectionHeading>
      <p className="text-muted-foreground mb-4">
        XFPM is distributed through the official{" "}
        <strong className="text-white">Nehonix unified installer</strong>.
      </p>

      <div className="space-y-6 my-4">
        <div>
          <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
            <Terminal size={16} className="text-primary" /> Unix / macOS / WSL
          </h3>
          <CodeBlock
            language="bash"
            code={`curl -sL https://xypriss.nehonix.com/install.js | node`}
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
            <Terminal size={16} className="text-primary" /> Windows (PowerShell)
          </h3>
          <CodeBlock
            language="powershell"
            code={`Invoke-RestMethod -Uri "https://xypriss.nehonix.com/install.js" -UseBasicParsing | node`}
          />
        </div>

        <div>
          <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
            <Package size={16} className="text-primary" /> NPM
          </h3>
          <CodeBlock
            language="bash"
            code={`# Linux / macOS\nnpm install -g xypriss-cli\n\n# Windows \nnpm install -g xypriss-cli`}
          />
        </div>
      </div>

      {/* ─── Project Initialization ─── */}
      <SectionHeading level={2} id="init">
        Project Initialization
      </SectionHeading>
      <p className="text-muted-foreground mb-4">
        The <code>init</code> command bootstraps a new XyPriss project using the
        native{" "}
        <Link
          href="https://github.com/Nehonix-Team/xru"
          className="text-primary underline decoration-primary/30 underline-offset-4"
        >
          XRU (XyPriss Rule Unit){" "}
        </Link>{" "}
        orchestration engine to automate structure creation, metadata injection,
        and environment preparation.
      </p>

      <CodeBlock
        language="bash"
        code={`xfpm init [name] [KEY=VALUE...] [flags]

# Interactive wizard (guided setup)
xfpm init

# Quick start
xfpm init my-app

# Full configuration with pass-through variables
xfpm init my-app AUTHOR="Nehonix" VERSION=2.0.0 PORT=9000

# With orchestration flags
xfpm init my-app --mode xms --force`}
      />

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-white font-semibold">
                Option
              </th>
              <th className="text-left py-3 px-4 text-white font-semibold">
                Shorthand
              </th>
              <th className="text-left py-3 px-4 text-white font-semibold">
                Default
              </th>
              <th className="text-left py-3 px-4 text-muted-foreground">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {[
              [
                "--mode",
                "-m",
                "default",
                "Orchestration mode: default or xms (Multi-Server).",
              ],
              [
                "--author",
                "-a",
                "Nehonix-Team",
                "The name of the project author.",
              ],
              [
                "--desc",
                "-d",
                "(Generic)",
                "A short description of the project.",
              ],
              ["--version", "-v", "1.0.0", "Initial project version."],
              ["--port", "-p", "8080", "Default network port for the server."],
              [
                "--arg",
                "—",
                "—",
                "Pass custom orchestration variables in KEY=VALUE format.",
              ],
              [
                "--force",
                "-f",
                "false",
                "Overwrite the target directory if it already exists.",
              ],
            ].map(([opt, sh, def, desc]) => (
              <tr
                key={opt as string}
                className="border-b border-white/5 hover:bg-white/[0.02]"
              >
                <td className="py-3 px-4">
                  <code className="text-primary">{opt}</code>
                </td>
                <td className="py-3 px-4">
                  <code>{sh}</code>
                </td>
                <td className="py-3 px-4">
                  <code>{def}</code>
                </td>
                <td className="py-3 px-4">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        {[
          {
            title: "Guided Interactive Mode",
            body: "Running xfpm init without arguments launches an interactive wizard for Name, Version, Description, Author, and Port - with sane defaults to get you started in seconds.",
          },
          {
            title: "Dynamic Orchestration Variables",
            body: "Any positional argument containing an = (e.g. THEME=dark) is captured and injected into XRU orchestration rules, allowing template customization without modifying the binary.",
          },
          {
            title: "Native XRU Integration (vG0.1.200+)",
            body: "No external dependencies required. The XRU engine is natively embedded — ensuring atomic, cross-platform rule execution out of the box.",
          },
          {
            title: "Automated Environment Setup",
            body: "Fetches the latest templates, injects metadata, validates and installs the Bun runtime if missing, and performs a full dependency installation automatically.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="p-5 rounded-xl border border-white/5 bg-white/[0.02]"
          >
            <h4 className="font-semibold text-white mb-2">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>

      {/* ─── Dependency Management ─── */}
      <SectionHeading level={2} id="dependencies">
        Dependency Management
      </SectionHeading>
      <CodeBlock
        language="bash"
        code={`# Install all dependencies from package.json
xfpm install

# Add a production package
xfpm add <package>

# Add to devDependencies
xfpm add -D <package>

# Install from a local path
xfpm add -P ./path/to/my-plugin

# Remove a package
xfpm rm <package>

# Update all packages
xfpm update

# Update a specific package
xfpm update <package>`}
      />

      {/* ─── Security Auditing ─── */}
      <SectionHeading level={2} id="audit">
        Security Auditing
      </SectionHeading>
      <p className="text-muted-foreground mb-4">
        XFPM's standalone SCA engine audits dependencies against the{" "}
        <strong className="text-white">OSV database</strong> and executes an
        intelligent multi-step repair loop to automatically remediate
        vulnerabilities.
      </p>

      <CodeBlock
        language="bash"
        code={`# Standard interactive audit
xfpm audit

# Intelligent fix loop (auto-repair)
xfpm audit fix

# Terminal dependency tree view
xfpm audit --tree

# Open premium interactive XFPML dashboard
xfpm audit --html # or using the "-w" flag

# Fully automated mode for CI environments
xfpm audit fix --yes --force-remove`}
      />

      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] my-6">
        <h4 className="font-bold text-white mb-4 flex items-center gap-2">
          <Wrench size={18} className="text-primary" />
          Intelligent Fix Loop — <code>xfpm audit fix</code>
        </h4>
        <ol className="space-y-3 text-sm text-muted-foreground list-none">
          {[
            [
              "Registry Validation",
              "Compares local versions against the NPM registry latest field.",
            ],
            [
              "Automated Repair",
              "Updates package.json and performs a clean installation.",
            ],
            [
              "Re-Verification",
              "Automatically re-audits to confirm the fix is effective.",
            ],
            [
              "Fallback Uninstallation",
              "Offers to remove packages that remain vulnerable even at their latest version.",
            ],
          ].map(([step, desc], i) => (
            <li key={step as string} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <span>
                <strong className="text-white">{step}:</strong> {desc}
              </span>
            </li>
          ))}
        </ol>
        <p className="text-xs text-muted-foreground mt-4 border-t border-white/5 pt-4">
          Use <code>--yes</code> and <code>--force-remove</code> together for
          fully automated, non-interactive security enforcement in CI/CD
          pipelines.
        </p>
      </div>

      {/* ─── Plugin Management ─── */}
      <SectionHeading level={2} id="plugins">
        Plugin Management
      </SectionHeading>
      <p className="text-muted-foreground mb-4">
        XFPM provides a robust suite of tools for managing project plugins and
        their cryptographic trust status within the Zero-Trust G3 architecture.
      </p>

      <CodeBlock
        language="bash"
        code={`# List all plugins and their trust status
xfpm plugin list

# Offline check — only scan node_modules/vstore
xfpm plugin list --local

# Open web dashboard to review and update permissions
xfpm plugin list --review

# Verify and authorize pending plugins (interactive)
xfpm plugin verify

# Open the premium interactive web verification dashboard
xfpm plugin verify --html

# Get detailed Developer Identity and Metadata for a plugin
xfpm plugin get <package>
xfpm plugin id <package>
xfpm plugin info <package>

# Revoke trust and retire permissions
xfpm plugin revoke <package>

# Clean removal without re-queuing the plugin
xfpm plugin revoke <package> --no-pending`}
      />

      {/* ─── Zero-Trust G3 ─── */}
      <SectionHeading level={2} id="security">
        Zero-Trust G3 Architecture
      </SectionHeading>
      <p className="text-muted-foreground mb-6">
        XFPM enforces a cryptographically verified security model for the
        XyPriss ecosystem. All plugins must be signed by their author and
        authorized by the consuming project before accessing native system
        hooks.
      </p>

      {/* Step 1 */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
              1
            </span>
            Generate Developer Identity
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Authors must generate a unique Ed25519 developer identity before
            signing plugins. Publish your public key fingerprint in your
            plugin's README so users can verify your identity.
          </p>
          <CodeBlock language="bash" code={`xfpm gen-key`} />
        </div>

        {/* Step 2 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
              2
            </span>
            Declare Privileges (Optional)
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            If your plugin requires protected system hooks (e.g., HTTP
            interception, console logging), you must declare them in{" "}
            <code>package.json</code> <em>before</em> signing using the exact
            system Privilege IDs. Invalid IDs abort the signing process.
          </p>
          <CodeBlock
            language="json"
            code={`{
  "xfpm": {
    "permissions": [
      "XHS.HOOK.HTTP.REQUEST",
      "XHS.PERM.LOGGING.CONSOLE_INTERCEPT"
    ]
  }
}`}
          />
        </div>

        {/* Step 3 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
              3
            </span>
            Sign Plugin Assets
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Before publishing, generate a tamper-proof signature manifest. XFPM
            hashes all production files and embeds your validated{" "}
            <code>Privileges</code> into a <code>xypriss.plugin.xsig</code> file
            required for safe distribution.
          </p>
          <CodeBlock
            language="bash"
            code={`xfpm sign ./ --min-version 1.0.0`}
          />
        </div>

        {/* Step 4 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
              4
            </span>
            Authorization & Interactive Verification (TOFU)
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            On first install of a new plugin, XFPM defers validation to a
            batched interactive{" "}
            <strong className="text-white">Trust On First Use (TOFU)</strong>{" "}
            flow triggered via <code>xfpm plugin verify</code>.
          </p>
          <Callout type="info" title="Plugin Verification Dashboard">
            Run <code>xfpm plugin verify --html</code> to launch the premium
            web-based dashboard for confirming cryptographic Developer IDs,
            reviewing and selectively approving every requested system
            Privilege, and bulk-managing dozens of plugins simultaneously.
          </Callout>
        </div>

        {/* Step 5 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
              5
            </span>
            Manual Trust Pinning
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            For manual pinning or non-interactive environments, use the{" "}
            <code>trust</code> subcommand with the plugin name and its Developer
            ID fingerprint.
          </p>
          <CodeBlock
            language="bash"
            code={`xfpm plugin trust <package> <developer-id>

# Example
xfpm plugin trust my-plugin ed25519:adl*******`}
          />
        </div>

        {/* Step 6 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
              6
            </span>
            Non-Interactive Mode (CI/CD)
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Use the <code>--no-interact</code> (or <code>-n</code>) flag with{" "}
            <code>install</code>, <code>update</code>, or <code>verify</code>.
            In this mode, XFPM automatically trusts any plugin carrying a{" "}
            <strong className="text-white">
              cryptographically valid G3 signature
            </strong>
            , bypassing the manual Author ID confirmation prompt.
          </p>
          <CodeBlock
            language="bash"
            code={`# Automated installation with G3 verification
xfpm install -vn

# Automated verification of pending plugins
xfpm plugin verify --no-interact`}
          />
        </div>

        {/* Step 7 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">
              7
            </span>
            Configuration-Based Trust (<code>trustedPlugins</code>)
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            To bypass interactive prompts for well-known plugins without relying
            on the global <code>--no-interact</code> flag, declare them in your
            project's <code>package.json</code> under{" "}
            <code>xfpm.trustedPlugins</code>. Unknown third-party additions will
            still go through full verification.
          </p>
          <Callout type="info" title="JSONC Support">
            The XyPriss configuration parser automatically strips trailing
            commas from <code>xypriss.config.jsonc</code>, ensuring smooth
            parsing of security configuration files.
          </Callout>
          <CodeBlock
            language="json"
            code={`{
  "xfpm": {
    "trustedPlugins": ["my-plugin"]
  }
}`}
          />
        </div>
      </div>

      {/* ─── Revocation ─── */}
      <SectionHeading level={2} id="revocation">
        Decentralized Revocation Enforcement
      </SectionHeading>
      <p className="text-muted-foreground mb-4">
        XFPM tracks framework-level revocations via native package metadata. If
        a version is discovered to be compromised, two enforcement mechanisms
        activate automatically:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-400" /> Audit
            Flagging
          </h4>
          <p className="text-sm text-muted-foreground">
            <code>xfpm audit</code> marks the package as revoked in the audit
            report with a clear warning.
          </p>
        </div>
        <div className="p-5 rounded-xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
            <Shield size={16} className="text-red-400" /> Runtime Patching
          </h4>
          <p className="text-sm text-muted-foreground">
            XFPM injects an <code>xfpm.revoked</code> marker into the local{" "}
            <code>package.json</code>, which the XHSC Deep Audit engine catches
            to block execution.
          </p>
        </div>
      </div>

      {/* ─── Redirections ─── */}
      <SectionHeading level={2} id="redirections">
        Package Redirections & Deprecation
      </SectionHeading>
      <p className="text-muted-foreground mb-4">
        Library maintainers can natively manage package deprecations and
        redirect installations across the XyPriss ecosystem without breaking
        consuming workflows. Add an <code>xfpm</code> object to your distributed{" "}
        <code>package.json</code>:
      </p>
      <CodeBlock
        language="json"
        code={`{
  "name": "old-lib",
  "version": "1.0.0",
  "xfpm": {
    "redirect": {
      "target": "new-lib",
      "message": "old-lib is deprecated. Please refer to our new architecture."
    }
  }
}`}
      />
      <p className="text-sm text-muted-foreground mt-3">
        When users run <code>xfpm install old-lib</code>, XFPM intercepts the
        metadata, displays the custom message in the terminal, and shifts
        resolution downstream to <code>new-lib</code>. The consuming project's{" "}
        <code>package.json</code> is updated to reference the new target
        automatically.
      </p>

      {/* ─── Architecture ─── */}
      <SectionHeading level={2} id="architecture">
        Advanced Architecture
      </SectionHeading>

      <div className="space-y-6 my-4">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Database size={16} className="text-primary" />
            CAS — Content Addressable Storage
          </h4>
          <p className="text-sm text-muted-foreground">
            Every file is hashed and stored exactly once in{" "}
            <code>~/.xfpm/storage</code> (Linux/macOS) or{" "}
            <code>%USERPROFILE%\.xfpm\storage</code> (Windows), eliminating
            duplicates and ensuring fully deterministic, reproducible
            installations across all projects on the machine.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Layers size={16} className="text-primary" />
            The Virtual Store
          </h4>
          <p className="text-sm text-muted-foreground">
            Dependencies are stored by exact version under{" "}
            <code>node_modules/.xfpm/vstore</code> on all platforms and
            symlinked into the project root's <code>node_modules</code>. This
            "Ancestor Hoisting" architecture enforces strict isolation while
            eliminating ghost dependencies entirely.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Cpu size={16} className="text-primary" />
            Targeted Resolution & Lifecycle Execution
          </h4>
          <p className="text-sm text-muted-foreground">
            Only the modified portions of the Neural Dependency Graph are
            recalculated during updates, minimizing overhead. Lifecycle scripts
            (e.g., <code>postinstall</code>) are invoked exclusively for
            dependencies targeted in the current transaction, preventing
            unnecessary execution of ambient scripts and preserving environment
            stability.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <ArrowRight size={16} className="text-primary" />
            Redirections & Deprecation
          </h4>
          <p className="text-sm text-muted-foreground">
            Maintainers can natively manage package rename and migration
            pathways, ensuring users are seamlessly transitioned to new
            architectures without breaking builds.
          </p>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <DocsFooter
        title="Ready to scale?"
        description="Master project orchestration with XFPM multi-server (XMS) configurations and Zero-Trust plugin ecosystems."
        buttonText="Advanced Orchestration"
        href="/docs/quick-start#advanced"
        iconName="Zap"
      />
    </div>
  );
}
