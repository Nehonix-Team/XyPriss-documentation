import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Navigation,
  ShieldCheck,
  Search,
  Layout,
  Settings,
  Info,
  Box,
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
          Robust, platform-independent path utilities with integrated security
          boundaries.
        </p>
        <p className="leading-relaxed">
          The <code className="text-primary">path</code> module provides a
          comprehensive suite of utilities for working with file and directory
          paths. By bridging operations directly to the native XHSC engine, it
          eliminates cross-platform separator issues and provides extreme
          security against directory traversal attacks.
        </p>
      </div>

      <Callout type="info" title="Native Normalization">
        XHSC handles path resolution natively. It aggressively resolves{" "}
        <code className="text-primary">..</code> and{" "}
        <code className="text-primary">.</code> references, ensuring rigorous
        adherence to filesystem capabilities across Windows, macOS, and Linux.
      </Callout>

      <SectionHeading level={2} id="assembly">
        Core Assembly & Slicing
      </SectionHeading>

      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Layout size={18} className="text-primary" />
            .resolve(...paths)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Resolves a sequence of segments into an absolute path, natively
            resolving all parent (<code className="text-primary">..</code>)
            references.
          </p>
          <CodeBlock
            language="typescript"
            code={`const configPath = __sys__.path.resolve("config", "settings.json");
// Output (Linux): "/home/user/project/config/settings.json"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Box size={18} className="text-primary" />
            .join(...paths)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Safely joins segments using platform-specific separators and
            normalizes the result.
          </p>
          <CodeBlock
            language="typescript"
            code={`const logPath = __sys__.path.join("var", "logs", "app.log");`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { n: ".dirname(p)", d: "Parent folder path." },
            {
              n: ".basename(p, ext?)",
              d: "Filename with optional ext stripping.",
            },
            { n: ".extname(p)", d: "File extension (including dot)." },
          ].map((fn, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
            >
              <div className="font-mono text-primary text-xs mb-1">{fn.n}</div>
              <p className="text-[10px] text-muted-foreground uppercase">
                {fn.d}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SectionHeading level={2} id="security">
        Operations & Security Enforcement
      </SectionHeading>

      <div className="space-y-6 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <ShieldCheck size={18} className="text-primary" />
            .secureJoin(base, ...segments)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Enterprise defense against traversal attacks. Rejects or clamps
            segments if they attempt to escape the{" "}
            <code className="text-primary">base</code> directory.
          </p>
          <CodeBlock
            language="typescript"
            code={`const safe = __sys__.path.secureJoin("/var/www/uploads", "../../etc/passwd");
// Native Go Core rejects the traversal instantly!`}
          />
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Settings size={18} className="text-primary" />
            .correct(path, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Eliminates structural redundancies (e.g., prefix doubling).{" "}
            <code className="text-primary">verify: true</code> ensures each step
            yields an existing path.
          </p>
          <CodeBlock
            language="typescript"
            code={`const fixed = __sys__.path.correct("/tmp/app/tmp/app/user", { verify: true });`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        {[
          { n: ".normalize(p)", d: "Collapses separators and resolves dots." },
          {
            n: ".relative(from, to)",
            d: "Calculates relative trajectory between paths.",
          },
          {
            n: ".isChild(parent, child)",
            d: "Verifies strict containment boundaries.",
          },
        ].map((u, i) => (
          <div
            key={i}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
          >
            <div className="font-mono text-primary text-xs mb-1">{u.n}</div>
            <p className="text-[10px] text-muted-foreground uppercase">{u.d}</p>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="status">
        Path Status Checkers
      </SectionHeading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        {[
          { n: ".exists(p)", d: "Check if path exists." },
          { n: ".isDir(p)", d: "Verify directory type." },
          { n: ".isFile(p)", d: "Verify file type." },
          { n: ".isSymlink(p)", d: "Verify symbolic link." },
          { n: ".isEmpty(p)", d: "Check if empty (0 bytes/entries)." },
          { n: ".isAbsolute(p)", d: "Check for absolute path." },
          { n: ".metadata(p)", d: "High-speed anatomy snapshot." },
          { n: ".tempDir()", d: "Get OS temp directory." },
        ].map((s, i) => (
          <div
            key={i}
            className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center"
          >
            <div className="font-mono text-primary text-[10px] font-bold mb-1">
              {s.n}
            </div>
            <div className="text-[9px] text-muted-foreground uppercase">
              {s.d}
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="advanced">
        Advanced Utilities
      </SectionHeading>
      <div className="space-y-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h5 className="font-bold text-white mb-2">.commonBase(...paths)</h5>
          <p className="text-sm text-muted-foreground mb-4">
            Finds the deepest shared parent directory across a set of paths.
          </p>
          <CodeBlock
            language="typescript"
            code={`__sys__.path.commonBase("/src/models/a.ts", "/src/routes/b.ts"); // -> "/src"`}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="font-mono text-primary text-xs mb-1">
              .toNamespacedPath(p)
            </div>
            <p className="text-[10px] text-muted-foreground uppercase">
              Handles UNC and long paths on Windows.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="font-mono text-primary text-xs mb-1">
              .normalizeSeparators(p)
            </div>
            <p className="text-[10px] text-muted-foreground uppercase">
              Standardizes separators to OS-native format.
            </p>
          </div>
        </div>
      </div>

      <DocsFooter
        title="Operating System"
        description="Monitor hardware telemetry, processes, and network sockets natively."
        buttonText="Explore OS API"
        href="/docs/system/os"
        iconName="Cpu"
      />
    </div>
  );
}
