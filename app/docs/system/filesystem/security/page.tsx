import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Lock, Shield, Trash2, Cpu, Scissors, Key, List, Search } from "lucide-react";

export default function FsSecurityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Lock size={14} />
          Filesystem Module
        </div>
        <SectionHeading level={1}>Security & Advanced Ops</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Enterprise-grade security primitives and advanced data manipulation.
        </p>
      </div>

      <SectionHeading level={2} id="encryption">File Encryption (AES-256-GCM)</SectionHeading>
      <p className="mb-4">Encrypt and decrypt files in-place using the native <code className="text-primary">xypriss-security</code> engine.</p>
      <div className="space-y-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            .encryptFile / .decryptFile
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Both operations are performed in-place. The source file is overwritten with the encrypted/decrypted output.
          </p>
          <CodeBlock 
            language="typescript"
            code={`await __sys__.fs.encryptFile("secrets.json", MASTER_KEY);
await __sys__.fs.decryptFile("secrets.json", MASTER_KEY);`}
          />
        </div>
        <Callout type="danger" title="Key Management">
          Losing the encryption key renders files permanently unrecoverable. Always store keys in a dedicated secrets manager.
        </Callout>
      </div>

      <SectionHeading level={2} id="hardware-linking">Hardware-Linked Encryption</SectionHeading>
      <p className="mb-6">Cryptographically binds file content to the host machine's unique <code className="text-primary">HostID</code>.</p>
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 my-6">
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
          <Cpu size={18} className="text-primary" />
          .hardwareEncryptFile(path, key)
        </h4>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Incorporates the machine's hardware identity into the key derivation. Files **cannot** be decrypted on any other physical server.
        </p>
        <CodeBlock 
          language="typescript"
          code={`await __sys__.fs.hardwareEncryptFile("system.vault", "secret-key");`}
        />
      </div>

      <SectionHeading level={2} id="destruction">Secure Destruction</SectionHeading>
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 my-6">
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
          <Trash2 size={18} className="text-primary" />
          .shred(path, passes?)
        </h4>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Secure deletion — overwrites file content with random data N times before removing it from the filesystem.
        </p>
        <CodeBlock 
          language="typescript"
          code={`__sys__.fs.shred("private-key.pem", 7);`}
        />
      </div>

      <SectionHeading level={2} id="manipulation">Advanced Manipulation</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h5 className="font-bold text-white mb-2 flex items-center gap-2">
            <Scissors size={16} className="text-primary" />
            .split / .merge
          </h5>
          <p className="text-xs text-muted-foreground mb-4">Binary file chunking and reassembly for large data handling.</p>
          <CodeBlock language="typescript" code={`const chunks = __sys__.fs.split("video.mp4", 10_000_000);`} />
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <h5 className="font-bold text-white mb-2 flex items-center gap-2">
            <Key size={16} className="text-primary" />
            .lock / .unlock
          </h5>
          <p className="text-xs text-muted-foreground mb-4">Advisory file locking to prevent concurrent write conflicts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {[
          { n: ".patch(p, search, replace)", d: "In-place content replacement." },
          { n: ".tail(p, lines?)", d: "Read the last N lines (logs)." },
          { n: ".diffFiles(a, b)", d: "Compare two files line-by-line." },
          { n: ".writeSecure(p, data, mode)", d: "Atomic write with permissions." },
          { n: ".topBigFiles(dir)", d: "Identify largest files in tree." },
        ].map((u, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="font-mono text-primary text-xs mb-1">{u.n}</div>
            <p className="text-[10px] text-muted-foreground leading-tight uppercase">{u.d}</p>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Path Module"
        description="Master cross-platform path resolution and security boundaries."
        buttonText="Next: Path"
        href="/docs/system/path"
        iconName="Navigation"
      />
    </div>
  );
}
