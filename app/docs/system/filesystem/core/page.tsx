import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { FileCode, List, FileText, Share2, Trash2, FolderPlus, Key, Info } from "lucide-react";

export default function FsCorePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <FileCode size={14} />
          Filesystem Module
        </div>
        <SectionHeading level={1}>Core Operations</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Fundamental filesystem methods for native I/O operations.
        </p>
      </div>

      <p className="leading-relaxed">
        These methods descend directly from the <code className="text-primary">FSCore</code> instance and interact natively with the underlying XHSC engine.
      </p>

      <SectionHeading level={2} id="ls">ls</SectionHeading>
      <p className="text-muted-foreground mb-4">Retrieves the contents of a directory.</p>
      <CodeBlock 
        language="typescript"
        code={`ls(p: string, options?: { stats?: boolean; recursive?: boolean }): string[] | [string, FileStats][]`}
      />
      <div className="my-6">
        <CodeBlock 
          language="typescript"
          code={`// Simple list
const files = __sys__.fs.ls("/var/log/app");

// Detailed list with native XHSC FileStats
const detailed = __sys__.fs.ls("/var/log/app", { stats: true });`}
        />
      </div>

      <SectionHeading level={2} id="read">read / readSync</SectionHeading>
      <p className="text-muted-foreground mb-4">Reads file contents asynchronously or synchronously.</p>
      <CodeBlock 
        language="typescript"
        code={`read(p: string, options?: { bytes?: boolean }): Promise<string>
readSync(p: string, options?: { bytes?: boolean }): string`}
      />
      <div className="my-6">
        <CodeBlock 
          language="typescript"
          code={`const data = await __sys__.fs.read("CWD://config.json");
const template = __sys__.fs.readSync("ROOT://index.html");`}
        />
      </div>

      <SectionHeading level={2} id="streams">Streams</SectionHeading>
      <p className="text-muted-foreground mb-4">High-performance streams processed entirely by the Go engine.</p>
      <CodeBlock 
        language="typescript"
        code={`createReadStream(p: string, options?: { start?: number; end?: number }): Readable
createWriteStream(p: string): Writable & { close(): void }`}
      />
      <div className="my-6">
        <CodeBlock 
          language="typescript"
          code={`const stream = __sys__.fs.createReadStream("ROOT://big-data.csv");
stream.pipe(res);`}
        />
      </div>

      <SectionHeading level={2} id="write">writeFile / writeFileSync</SectionHeading>
      <p className="text-muted-foreground mb-4">Writes data to storage. Parent directories are created automatically.</p>
      <CodeBlock 
        language="typescript"
        code={`writeFile(p: string, data: any, options?: { append?: boolean; ensureFile?: boolean }): Promise<void>`}
      />

      <SectionHeading level={2} id="move-copy">Copy & Move</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="font-mono text-primary text-sm mb-2">.copy(src, dest)</div>
          <p className="text-xs text-muted-foreground">Duplicate files or directories.</p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="font-mono text-primary text-sm mb-2">.move(src, dest)</div>
          <p className="text-xs text-muted-foreground">Relocate or rename entities.</p>
        </div>
      </div>

      <SectionHeading level={2} id="rm-mkdir">Deletion & Structure</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Trash2 size={16} className="text-primary" />
            rm(p, options?)
          </h4>
          <p className="text-sm text-muted-foreground">Deletes a file or directory. Use <code className="text-primary">force: true</code> for recursive deletion.</p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <FolderPlus size={16} className="text-primary" />
            mkdir(p, options?)
          </h4>
          <p className="text-sm text-muted-foreground">Creates directories. <code className="text-primary">parents: true</code> enables recursive creation (mkdir -p).</p>
        </div>
      </div>

      <SectionHeading level={2} id="open-close">Stateful Handles (open/close)</SectionHeading>
      <p className="leading-relaxed mb-6">
        The <code className="text-primary">open</code> method provides a stateful toolbox for efficient multi-operation tasks on a single handle.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/5">
          <thead>
            <tr className="bg-white/5">
              <th className="p-3 border border-white/5 text-sm font-bold uppercase tracking-wider">Flag</th>
              <th className="p-3 border border-white/5 text-sm font-bold uppercase tracking-wider">Mode</th>
              <th className="p-3 border border-white/5 text-sm font-bold uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody>
            {[
              { f: "'r'", m: "Read", d: "Open for reading (default). Fails if missing." },
              { f: "'r+'", m: "R/W", d: "Open for reading and writing. Fails if missing." },
              { f: "'w'", m: "Write", d: "Open for writing. Created if missing, truncated if exists." },
              { f: "'a'", m: "Append", d: "Open for appending. Created if missing." },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-3 border border-white/5 font-mono text-primary text-xs">{row.f}</td>
                <td className="p-3 border border-white/5 text-xs text-white">{row.m}</td>
                <td className="p-3 border border-white/5 text-xs text-muted-foreground">{row.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="tip" title="FileHandle Toolbox">
        Using the callback pattern in <code className="text-primary">open</code> gives you access to a toolbox with <code className="text-primary">read()</code>, <code className="text-primary">write()</code>, and <code className="text-primary">seek()</code> methods that communicate via optimized IPC sockets.
      </Callout>

      <CodeBlock 
        language="typescript"
        code={`await __sys__.fs.open("data.bin", "r+", async (file) => {
    const header = await file.read(10);
    await file.seek(0, 2); // Jump to EOF
    await file.write(" [EOF SIGNATURE]");
});`}
      />

      <SectionHeading level={2} id="more-core">Utility Primitives</SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {[
          { n: ".rmMany(paths[])", d: "Bulk deletion of multiple paths." },
          { n: ".touch(path)", d: "Create empty file or update timestamp." },
          { n: ".link(src, dest)", d: "Create symbolic links." },
          { n: ".chmod(path, mode)", d: "Change Unix permissions (e.g., '755')." },
        ].map((u, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="font-mono text-primary text-xs mb-1">{u.n}</div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{u.d}</p>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Helpers & Utils"
        description="Explore JSON handling, line-by-line reading, and automated directory ensures."
        buttonText="Next: Helpers"
        href="/docs/system/filesystem/helpers"
        iconName="Zap"
      />
    </div>
  );
}
