import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { 
  FolderTree, 
  Zap, 
  FileCode, 
  Search, 
  Archive, 
  Eye, 
  Lock,
  ArrowRight,
  Terminal,
  Cpu,
  Info,
  ShieldAlert
} from "lucide-react";

export default function FilesystemPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <FolderTree size={14} />
          System Module
        </div>
        <SectionHeading level={1}>Filesystem API (fs)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Ultra-performance filesystem abstraction powered by the native XHSC engine.
        </p>
      </div>

      <p className="leading-relaxed">
        The <code className="text-primary">fs</code> module provides a high-level, unified abstraction for all file and directory I/O operations. 
        Unlike standard Node.js <code className="text-primary">fs</code>, XyPriss delegates heavy lifting to the **XHSC Hyper-System Core**, 
        offering near-native performance and non-blocking multithreading.
      </p>

      <Callout type="info" title="Under the Hood Architecture">
        All methods on <code className="text-primary">__sys__.fs</code> interact with the underlying Go-based engine. 
        This guarantees that intensive operations like directory traversal, checksumming, or large-file streaming do not block the Node.js event loop.
      </Callout>

      <SectionHeading level={2} id="core-operations">
        Core Operations
      </SectionHeading>
      
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Terminal size={18} className="text-primary" />
            .ls(path, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Lists directory contents. Can return simple names or detailed technical metadata (stats).
          </p>
          <CodeBlock 
            language="typescript"
            code={`// Simple list
const files = __sys__.fs.ls("/var/log/app");

// Detailed list with native FileStats (size, perms, GID/UID)
const detailed = __sys__.fs.ls("/var/log/app", { stats: true });`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            .read() / .readSync()
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            High-speed file reading. The asynchronous version is recommended for non-blocking execution.
          </p>
          <CodeBlock 
            language="typescript"
            code={`// Asynchronous (Non-blocking)
const config = await __sys__.fs.read("CWD://config.json");

// Synchronous (Blocking)
const template = __sys__.fs.readSync("ROOT://template.html");`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <FileCode size={18} className="text-primary" />
            .writeFile() / .writeFileSync()
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Writes data to storage. Parent directories are created automatically by default (<code className="text-primary">ensureFile: true</code>).
          </p>
          <CodeBlock 
            language="typescript"
            code={`await __sys__.fs.writeFile("CWD://log.txt", "New entry", { append: true });`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="streaming">
        High-Performance Streaming
      </SectionHeading>
      <p>
        Ideal for processing massive files. XHSC natively handles buffering, returning standard Node-compatible streams.
      </p>
      <CodeBlock 
        language="typescript"
        code={`const stream = __sys__.fs.createReadStream("ROOT://big-data.csv");
stream.pipe(res); // Direct piping to HTTP response`}
      />

      <SectionHeading level={2} id="stateful-handles">
        Stateful File Handles
      </SectionHeading>
      <p className="mb-6">
        The <code className="text-primary">open</code> method provides a stateful toolbox for efficient multi-operation tasks on a single handle.
      </p>

      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
        <h4 className="font-bold text-white mb-4 uppercase tracking-widest text-xs flex items-center gap-2">
          <Info size={14} className="text-primary" />
          FileHandle Toolbox Methods
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div className="flex justify-between border-b border-white/5 pb-2">
            <code className="text-primary">.read(len)</code>
            <span className="text-muted-foreground">Read N bytes</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <code className="text-primary">.write(data)</code>
            <span className="text-muted-foreground">Write at pointer</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <code className="text-primary">.seek(off, whence)</code>
            <span className="text-muted-foreground">Move pointer</span>
          </div>
          <div className="flex justify-between border-b border-white/5 pb-2">
            <code className="text-primary">.stat()</code>
            <span className="text-muted-foreground">Get metadata</span>
          </div>
        </div>
      </div>

      <CodeBlock 
        language="typescript"
        code={`await __sys__.fs.open("data.bin", "r+", async (file) => {
    const header = await file.read(10);
    await file.seek(0, 2); // Jump to EOF
    await file.write(" [EOF SIGNATURE]");
}); // Handle is automatically closed`}
      />

      <SectionHeading level={2} id="search-patterns">
        Search & Pattern Matching
      </SectionHeading>
      <p>
        Leverage the native Go engine for blazing-fast full-text search across entire directory trees.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h5 className="font-bold text-white mb-2 flex items-center gap-2">
            <Search size={16} className="text-primary" />
            .searchInFiles
          </h5>
          <p className="text-xs text-muted-foreground mb-4">Regex-compliant full-text discovery across directory contents.</p>
          <CodeBlock language="typescript" code={`__sys__.fs.searchInFiles("./src", "TODO");`} />
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h5 className="font-bold text-white mb-2 flex items-center gap-2">
            <Archive size={16} className="text-primary" />
            .findByPattern
          </h5>
          <p className="text-xs text-muted-foreground mb-4">Glob-based file discovery (e.g., recursive *.ts discovery).</p>
          <CodeBlock language="typescript" code={`__sys__.fs.findByPattern("./src", "*.ts");`} />
        </div>
      </div>

      <SectionHeading level={2} id="security-ops">
        Security & Advanced Ops
      </SectionHeading>
      <p>
        XyPriss provides enterprise-grade security primitives handled at the kernel level.
      </p>

      <div className="space-y-4 my-6">
        <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <Lock size={20} className="text-primary mt-1" />
          <div>
            <h5 className="font-bold text-white">Encryption & Shredding</h5>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              In-place AES-256-GCM encryption and multi-pass secure deletion (shred).
            </p>
            <div className="flex gap-2">
              <code className="text-xs px-2 py-1 bg-white/5 rounded">.encryptFile()</code>
              <code className="text-xs px-2 py-1 bg-white/5 rounded">.shred()</code>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <ShieldAlert size={20} className="text-amber-500 mt-1" />
          <div>
            <h5 className="font-bold text-white">Hardware-Linked Encryption</h5>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Cryptographically binds files to the machine's HostID. Files cannot be read if moved to another physical server.
            </p>
            <CodeBlock language="typescript" code={`await __sys__.fs.hardwareEncryptFile("system.vault", "secret-key");`} />
          </div>
        </div>
      </div>

      <Callout type="danger" title="Key Responsibility">
        Losing an encryption key renders files permanently unrecoverable. 
        Always store keys in a dedicated vault and use <code className="text-primary">.lock()</code> to prevent write conflicts.
      </Callout>

      <DocsFooter 
        title="Path Module"
        description="Master cross-platform path resolution and security boundaries."
        buttonText="Explore API"
        href="/docs/system/path"
        iconName="Navigation"
      />
    </div>
  );
}
