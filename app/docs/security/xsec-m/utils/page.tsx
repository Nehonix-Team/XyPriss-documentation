import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Zap, ShieldCheck, Layers, Cpu, Database, Binary, Hash } from "lucide-react";

export default function SecurityUtilsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Security Utilities</SectionHeading>
      
      <p>The Utilities module provides foundational helpers for encoding, decoding, byte manipulation, and key derivation. These functions ensure consistency and performance across all cryptographic operations.</p>

      <SectionHeading level={2}>Encoding Utilities</SectionHeading>
      <p>Convert data between binary buffers and various string formats with zero-allocation efficiency.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm">Buffer to String</h5>
          <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
            <li><code>bufferToHex(buffer)</code></li>
            <li><code>bufferToBase64(buffer, urlSafe?)</code></li>
            <li><code>bufferToString(buffer)</code> (UTF-8)</li>
          </ul>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm">String to Buffer</h5>
          <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
            <li><code>hexToBuffer(hexString)</code></li>
            <li><code>base64ToBuffer(base64String, urlSafe?)</code></li>
            <li><code>stringToBuffer(utf8String)</code></li>
          </ul>
        </div>
      </div>

      <SectionHeading level={2}>Unified Utils Interface</SectionHeading>
      <p>The <code>Utils</code> object provides a consolidated entry point for the most commonly used operations.</p>
      <CodeBlock language="typescript" code={`import { Utils } from "xypriss-security";

// Quick Hash
const hex = Utils.hash("sensitive-data");

// Secure Random Bytes
const bytes = Utils.getRandomBytes(16);

// Fast string-to-string encryption (native bridge)
const encrypted = await Utils.encrypt("message", "passphrase");`} />

      <SectionHeading level={2}>Key Derivation (KDF)</SectionHeading>
      <p>Derive cryptographically strong keys from weak secrets using Argon2id, PBKDF2, or HKDF.</p>
      <CodeBlock language="typescript" code={`import { deriveKey } from "xypriss-security";

const key = await deriveKey("my-secret", {
  algorithm: "pbkdf2",
  iterations: 310000,
  keyLength: 32,
  salt: "unique-salt-string",
});`} />

      <SectionHeading level={2}>Byte Precision</SectionHeading>
      <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01] my-6">
        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold shrink-0 mt-1">UTF-8</div>
        <div>
          <p className="text-sm font-bold text-white mb-1">Handling Multi-byte Characters</p>
          <p className="text-xs text-muted-foreground">Standard <code>.length</code> counts characters. XyPriss utilities count <strong>actual bytes</strong>, which is critical for AES-256 (32 bytes) or Ed25519 (32 bytes) key material validation.</p>
          <CodeBlock language="typescript" code={`getByteLength("you好"); // 8 bytes (好 = 3 bytes)`} />
        </div>
      </div>

      <DocsFooter 
        title="Enterprise Suite (XEMS)"
        description="Proceed to the high-performance encrypted memory store documentation."
        buttonText="Next: XEMS Suite"
        href="/docs/security/xems"
        iconName="Layers"
      />
    </div>
  );
}
