import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Cpu,
  Shield,
  FolderTree,
  Navigation,
  Wrench,
  Database,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ModuleCard = ({
  title,
  description,
  href,
  icon: Icon,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  icon: any;
  badge?: string;
}) => (
  <Link
    href={href}
    className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} />
      </div>
      {badge && (
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/10">
          {badge}
        </span>
      )}
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
      {description}
    </p>
    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
      Explore Module <ArrowRight size={14} />
    </div>
  </Link>
);

export default function SystemOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Cpu size={14} />
          Core Engine
        </div>
        <SectionHeading level={1}>Hyper-System API (__sys__)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The core logic aggregator for the global system interface within
          XyPriss applications.
        </p>
        <p className="leading-relaxed">
          The XyPriss Hyper-System API (
          <code className="text-primary">__sys__</code>) serves as the
          centralized, high-performance gateway for all native operations. It
          provides a modular architecture that inherits native capabilities to
          ensure optimal robustness and security, unifying all system operations
          under a single singleton.
        </p>
      </div>

      <Callout type="info" title="Flat API Architecture">
        XyPriss uses a "Flat API" structure where all system modules are
        globally accessible via the{" "}
        <code className="text-primary font-bold">__sys__</code> endpoint. This
        approach greatly enhances code readability and eliminates the need for
        redundant manual imports.
      </Callout>

      <SectionHeading level={2} id="modular-architecture">
        Modular Architecture
      </SectionHeading>

      <p className="mb-6">
        The API is divided into six specialized modules, each providing a
        high-performance bridge to the native XHSC engine:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <ModuleCard
          title="Environment"
          description="Secure environment variable manager and restrictive Environment Security Shield."
          href="/docs/system/environment"
          icon={Shield}
          badge="__env__"
        />
        <ModuleCard
          title="Filesystem"
          description="High-performance I/O operations, stream handling, archives, and file security."
          href="/docs/system/filesystem"
          icon={FolderTree}
          badge="fs"
        />
        <ModuleCard
          title="Path"
          description="Secure cross-platform path manipulation, resolution, and normalization."
          href="/docs/system/path"
          icon={Navigation}
          badge="path"
        />
        <ModuleCard
          title="Operating System"
          description="Hardware telemetry, system monitoring, and native process management."
          href="/docs/system/os"
          icon={Cpu}
          badge="os"
        />
        <ModuleCard
          title="Utilities"
          description="High-performance suite for string manipulation, async control, and validation."
          href="/docs/system/utils"
          icon={Wrench}
          badge="utils"
        />
        <ModuleCard
          title="Dynamic Variables"
          description="Standardized key-value store for application configuration and metadata."
          href="/docs/system/vars"
          icon={Database}
          badge="vars"
        />
      </div>

      <SectionHeading level={2} id="initialization">
        Initialization
      </SectionHeading>
      <p>
        The XyPriss framework automatically initializes{" "}
        <code className="text-primary">__sys__</code> before the execution of
        your application code. Manual intervention to instantiate system classes
        is neither required nor recommended.
      </p>

      <div className="my-6">
        <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
          <Wrench size={16} className="text-primary" />
          Direct Access Example
        </h4>
        <CodeBlock
          language="typescript"
          code={`// Direct access without instantiation
const version = __sys__.vars.get("__version__");
const isProd = __sys__.__env__.isProduction();

if (!isProd) {
    __sys__.fs.writeFileSync("./debug.log", \`Current version: \${version}\`);
}`}
        />
      </div>

      <DocsFooter
        title="Environment API"
        description="Learn how to manage environment variables safely using the Security Shield."
        buttonText="Explore Module"
        href="/docs/system/environment"
        iconName="Shield"
      />
    </div>
  );
}
