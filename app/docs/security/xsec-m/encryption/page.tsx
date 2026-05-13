import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { ShieldCheck, Zap, Key, Lock, Cpu, Database, Binary } from "lucide-react";

export default function EncryptionPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Encryption Services</SectionHeading>
      
      <p>The <code>EncryptionService</code> provides high-level data protection utilities for persistent storage. It handles complex cryptographic workflows like salt management, key derivation, and binary sanitization automatically.</p>

      <SectionHeading level={2}>Core Encryption</SectionHeading>
      <p>Encrypt any serializable data into a versioned, secure JSON package. By default, XyPriss uses <strong>AES-256-GCM</strong> with 100,000 PBKDF2 iterations for key derivation.</p>
      
      <CodeBlock language="typescript" title="Encryption Workflow" code={`import { EncryptionService } from "xypriss-security";

// Encrypt an object
const secretPackage = await EncryptionService.encrypt(
    { pin: 1234, token: "active" }, 
    "master-passphrase"
);

// Decrypt back to object
const originalData = await EncryptionService.decrypt(secretPackage, "master-passphrase");`} />

      <SectionHeading level={2}>Advanced Options</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm flex items-center gap-2"><Zap className="w-4 h-4" /> Quantum-Safe Mode</h5>
          <p className="text-[10px] text-slate-400 mb-2">Enabling <code>quantumSafe</code> forces the use of ChaCha20-Poly1305, which offers better resistance to certain theoretical quantum cryptanalysis vectors.</p>
          <CodeBlock language="typescript" code={`await EncryptionService.encrypt(data, key, { quantumSafe: true });`} />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm flex items-center gap-2"><Binary className="w-4 h-4" /> Integrity Checks</h5>
          <p className="text-[10px] text-slate-400 mb-2">Verify the format and version of an encrypted package without needing the master key.</p>
          <CodeBlock language="typescript" code={`const info = EncryptionService.getMetadata(secretPackage);
console.log(info.algorithm); // aes-256-gcm`} />
        </div>
      </div>

      <SectionHeading level={2}>API Reference</SectionHeading>
      <ul className="list-none p-0 space-y-3 my-6">
        <li className="flex items-start gap-3">
          <div className="mt-1 shrink-0"><Key className="w-4 h-4 text-blue-400" /></div>
          <div>
            <p className="text-xs font-bold text-white m-0">generateSessionKey()</p>
            <p className="text-[10px] text-slate-400">Generates a secure 256-bit session key in hexadecimal format.</p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <div className="mt-1 shrink-0"><ShieldCheck className="w-4 h-4 text-blue-400" /></div>
          <div>
            <p className="text-xs font-bold text-white m-0">verifyIntegrity(package)</p>
            <p className="text-[10px] text-slate-400">Checks if the package format is valid and readable by XyPriss.</p>
          </div>
        </li>
      </ul>

      <Callout type="info" title="Performance">
        All heavy cryptographic computations are offloaded to the Go binary core, ensuring that encryption operations do not block the Node.js event loop even when using high PBKDF2 iteration counts.
      </Callout>

      <DocsFooter 
        title="Utilities"
        description="Encoding and general cryptographic helpers."
        buttonText="Next: Utilities"
        href="/docs/security/xsec-m/utils"
        iconName="Layers"
      />
    </div>
  );
}
