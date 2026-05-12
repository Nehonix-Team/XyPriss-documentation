import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { 
  Wrench, 
  Type, 
  Hash, 
  Calendar, 
  Database, 
  Activity, 
  Fingerprint,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const UtilCard = ({ 
  title, 
  description, 
  href, 
  icon: Icon,
  badge 
}: { 
  title: string; 
  description: string; 
  href: string; 
  icon: any;
  badge: string;
}) => (
  <Link 
    href={href}
    className="group relative flex flex-col p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-primary/20 transition-all duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform duration-300">
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/5">
        {badge}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{description}</p>
    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
      View API <ArrowRight size={14} />
    </div>
  </Link>
);

export default function UtilsOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Wrench size={14} />
          System Module
        </div>
        <SectionHeading level={1}>System Utilities (utils)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          High-performance suite for string manipulation, async control, and
          data validation.
        </p>
        <p className="leading-relaxed">
          The <code className="text-primary">utils</code> module provides a
          comprehensive collection of optimized functions globally accessible
          via the <code className="text-primary">__sys__.utils</code> namespace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <UtilCard
          title="Strings"
          description="Normalization, slugs, random strings, and formatting."
          href="/docs/system/utils/strings"
          icon={Type}
          badge="str"
        />
        <UtilCard
          title="Numbers"
          description="Math operations, byte formatting, and clamping."
          href="/docs/system/utils/numbers"
          icon={Hash}
          badge="num"
        />
        <UtilCard
          title="Dates"
          description="Calendar arithmetic, relative time, and smart parsing."
          href="/docs/system/utils/dates"
          icon={Calendar}
          badge="date"
        />
        <UtilCard
          title="Data"
          description="Deep object cloning and advanced array management."
          href="/docs/system/utils/data"
          icon={Database}
          badge="obj / arr"
        />
        <UtilCard
          title="Logic"
          description="Asynchronous control flow and validation guards."
          href="/docs/system/utils/logic"
          icon={Activity}
          badge="async / is"
        />
        <UtilCard
          title="Primitives"
          description="Core identity (UUID) and functional helpers (Memoize)."
          href="/docs/system/utils/primitives"
          icon={Fingerprint}
          badge="id / fn"
        />
      </div>

      <SectionHeading level={2} id="global-access">
        Global Access
      </SectionHeading>
      <p className="mb-6">
        All utilities are organized into sub-namespaces for better
        discoverability and clean syntax:
      </p>

      <CodeBlock
        language="typescript"
        code={`const id = __sys__.utils.id.uuid();
const bytes = __sys__.utils.num.formatBytes(1234567);
const date = __sys__.utils.date.format(Date.now());`}
      />

      <DocsFooter
        title="String Utilities"
        description="Learn how to manipulate and format strings with the native str module."
        buttonText="Explore API"
        href="/docs/system/utils/strings"
        iconName="Type"
      />
    </div>
  );
}
