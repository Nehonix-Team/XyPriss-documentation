import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { 
  Navigation, 
  Map, 
  ShieldCheck, 
  Search, 
  Info,
  Terminal,
  Cpu,
  Layers,
  Lock
} from "lucide-react";

export default function PathPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Navigation size={14} />
          System Module
        </div>
        <SectionHeading level={1}>Path Manipulation (path)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Robust, platform-independent path utilities with integrated security boundaries.
        </p>
      </div>

      <p className="leading-relaxed">
        The <code className="text-primary">path</code> module provides a comprehensive suite of utilities for working with file and directory paths. 
        By bridging operations directly to the native XHSC engine, it eliminates cross-platform separator issues and provides extreme security against directory traversal attacks.
      </p>

      <Callout type="info" title="Native Normalization">
        XHSC handles path resolution natively. It aggressively resolves <code className="text-primary">..</code> and <code className="text-primary">.</code> references, ensuring rigorous adherence to filesystem capabilities across Windows, macOS, and Linux.
      </Callout>

      <SectionHeading level={2} id="core-assembly">
        Core Assembly & Slicing
      </SectionHeading>
      
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Map size={18} className="text-primary" />
            .resolve(...paths)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Resolves a sequence of segments into a normalized absolute path based on the project root.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const configPath = __sys__.path.resolve("config", "settings.json");
// Linux: "/home/user/project/config/settings.json"
// Windows: "C:\\Users\\user\\project\\config\\settings.json"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            Slicing: dirname, basename, extname
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Standard utilities for isolating path components. <code className="text-primary">basename</code> supports an optional suffix to strip extensions.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const p = "/src/models/user.ts";

__sys__.path.dirname(p);          // -> "/src/models"
__sys__.path.basename(p);         // -> "user.ts"
__sys__.path.basename(p, ".ts");  // -> "user"
__sys__.path.extname(p);          // -> ".ts"`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="security-defense">
        Enterprise Defense Mechanisms
      </SectionHeading>
      <p className="mb-6">
        Protect your application from malicious input with built-in boundary enforcement.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <ShieldCheck size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">isChild</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Verifies that a child path is strictly contained within a parent boundary.
          </p>
          <CodeBlock language="typescript" code={`__sys__.path.isChild("/var/www", path);`} />
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Lock size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">secureJoin</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Explicitly throws a security error if segments try to escape the base directory via <code className="text-primary">../</code>.
          </p>
          <CodeBlock language="typescript" code={`__sys__.path.secureJoin("/uploads", input);`} />
        </div>
      </div>

      <SectionHeading level={2} id="status-checkers">
        Path Status Checkers
      </SectionHeading>
      <p className="mb-6">
        Fast structural queries performed against the filesystem.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {[
          { name: ".exists(p)", desc: "Checks path existence" },
          { name: ".isDir(p)", desc: "Verifies directory type" },
          { name: ".isFile(p)", desc: "Verifies file type" },
          { name: ".isAbsolute(p)", desc: "Checks for root anchors" },
          { name: ".isEmpty(p)", desc: "Zero bytes or zero entries" },
          { name: ".tempDir()", desc: "Native OS temp path" },
        ].map((checker, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <div className="text-primary font-mono text-xs font-bold mb-1 group-hover:text-white transition-colors">{checker.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{checker.desc}</div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="advanced-utils">
        Advanced Utilities
      </SectionHeading>
      
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2">.correct(path, options?)</h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Identifies and eliminates redundant structural segments that standard normalization might miss (e.g., prefix doubling).
          </p>
          <CodeBlock 
            language="typescript"
            code={`// Fixes "/tmp/data/tmp/data/user" -> "/tmp/data/user"
const fixed = __sys__.path.correct(badPath, { verify: true });`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2">.metadata(path)</h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Returns a full breakdown of the path anatomy in a single native call, maximizing performance.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const { dir, base, ext, name, isAbsolute } = __sys__.path.metadata(p);`}
          />
        </div>
      </div>

      <DocsFooter 
        title="Operating System"
        description="Access hardware telemetry and system monitoring directly from the XyPriss engine."
        buttonText="Explore API"
        href="/docs/system/os"
        iconName="Cpu"
      />
    </div>
  );
}
