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
  Layers 
} from "lucide-react";

export default function XFPMPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Package size={14} />
          Package Manager
        </div>
        <SectionHeading level={1}>XFPM: XyPriss Fast Package Manager</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The official high-performance CLI tool for dependency resolution, 
          security auditing, and project orchestration within the XyPriss ecosystem.
        </p>
      </div>

      <p>
        <strong>XFPM</strong> is a cross-platform command-line tool written in Go, 
        designed to deliver microsecond-level dependency resolution and strict package 
        isolation. It replaces traditional package managers by providing deep 
        integration with the XHSC native engine.
      </p>

      <SectionHeading level={2} id="features">Key Features</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Zap className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">Neural Resolution</h4>
          <p className="text-sm text-muted-foreground">
            Uses a neural dependency graph to resolve even the most complex 
            dependency trees in record time.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Lock className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">Strict Isolation</h4>
          <p className="text-sm text-muted-foreground">
            Content-addressable storage (CAS) prevents "ghost dependencies" 
            and ensures project environments remain pure.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Shield className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">Zero-Trust G3</h4>
          <p className="text-sm text-muted-foreground">
            Native Ed25519 signing and verification layer for the secure 
            plugin ecosystem.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <RefreshCw className="text-primary mb-4" size={24} />
          <h4 className="font-bold mb-2">Auto-Update Engine</h4>
          <p className="text-sm text-muted-foreground">
            Keeps itself up-to-date automatically, ensuring you always have 
            the latest security patches.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="usage">Core Commands</SectionHeading>
      
      <div className="space-y-8 my-6">
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Terminal size={18} className="text-primary" />
            Project Initialization
          </h3>
          <p className="text-muted-foreground mb-4">
            Bootstrap a new project using the interactive wizard or full CLI flags.
          </p>
          <CodeBlock 
            language="bash" 
            code={`xfpm init [name] [KEY=VALUE...] [flags]\n\n# Example: Full configuration\nxfpm init my-app AUTHOR="Nehonix" PORT=9000 --mode xms`} 
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            Dependency Management
          </h3>
          <CodeBlock 
            language="bash" 
            code={`# Install from package.json\nxfpm install\n\n# Add a production package\nxfpm add xypriss-security\n\n# Add a dev dependency\nxfpm add -D types-package`} 
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Search size={18} className="text-primary" />
            Security Auditing
          </h3>
          <p className="text-muted-foreground mb-4">
            Audit your project for vulnerabilities using the OSV database with 
            an intelligent repair loop.
          </p>
          <CodeBlock 
            language="bash" 
            code={`xfpm audit fix --yes\nxfpm audit --html # Open premium interactive report`} 
          />
        </div>
      </div>

      <SectionHeading level={2} id="security">Zero-Trust G3 Architecture</SectionHeading>
      <p>
        XFPM enforces a cryptographically verified security model for the XyPriss 
        ecosystem. All plugins must be signed and authorized before accessing 
        native system hooks.
      </p>

      <Callout type="info" title="Plugin Verification Dashboard">
        Run <code>xfpm plugin verify --html</code> to launch a premium web-based 
        dashboard for reviewing Developer IDs and authorizing granular system 
        privileges.
      </Callout>

      <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 my-8">
        <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
          <Shield size={20} />
          Privilege Declaration
        </h4>
        <p className="text-sm text-white/80 mb-4">
          Plugins must declare their required system hooks in <code>package.json</code>:
        </p>
        <CodeBlock 
          language="json" 
          code={`{\n  "xfpm": {\n    "permissions": [\n      "XHS.HOOK.HTTP.REQUEST",\n      "XHS.PERM.LOGGING.CONSOLE_INTERCEPT"\n    ]\n  }\n}`} 
        />
      </div>

      <SectionHeading level={2} id="architecture">Advanced Architecture</SectionHeading>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-bold text-white mb-2">CAS (Content Addressable Storage)</h4>
          <p className="text-sm text-muted-foreground">
            Every file is hashed and stored once in <code>~/.xfpm/storage</code>, 
            eliminating duplicates and ensuring deterministic installations 
            across multiple projects.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-2">The Virtual Store</h4>
          <p className="text-sm text-muted-foreground">
            Dependencies are stored by exact version in <code>node_modules/.xfpm/vstore</code>. 
            This "Ancestor Hoisting" architecture prevents dependency leakage 
            and resolves ghost dependency issues.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-2">Redirections & Deprecation</h4>
          <p className="text-sm text-muted-foreground">
            Maintainers can natively management package rename and migration 
            pathways, ensuring users are seamlessly transitioned to new 
            architectures without breaking builds.
          </p>
        </div>
      </div>

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
