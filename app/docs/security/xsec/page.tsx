import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { ShieldCheck, Zap, Globe, Lock, Cpu, Terminal } from "lucide-react";

export default function XSecPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XyPriss Security (XSec)</SectionHeading>
      
      <p>XSec is an enterprise-grade cryptographic framework for TypeScript / JavaScript environments. It utilizes a high-performance Go-based core engine to provide military-grade security with absolute cross-platform reliability.</p>

      <SectionHeading level={2}>Core Principles</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:-translate-y-0.5 transition-all">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Cpu className="w-5 h-5" /> High Performance
          </div>
          <p className="text-xs text-slate-400">Optimized execution using a multi-threaded Go core, bypassing standard JS crypto overhead.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:-translate-y-0.5 transition-all">
          <Globe className="w-5 h-5" /> Universal Portability
          <p className="text-xs text-slate-400 mt-2">Zero native compilation required. Statically linked binaries run on Linux, Windows, and macOS.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:-translate-y-0.5 transition-all">
          <ShieldCheck className="w-5 h-5" /> Modern Standards
          <p className="text-xs text-slate-400 mt-2">Native support for Ed25519, AES-256-GCM, Argon2id, and Post-Quantum algorithms.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:-translate-y-0.5 transition-all">
          <Lock className="w-5 h-5" /> Security by Default
          <p className="text-xs text-slate-400 mt-2">Automatic memory sanitization and secure key derivation patterns (Argon2id).</p>
        </div>
      </div>

      <SectionHeading level={2}>Quick Start</SectionHeading>
      <p>Install the security toolkit via XFPM:</p>
      <CodeBlock language="bash" code="xfpm add xypriss-security" />

      <SectionHeading level={2}>Unified Cipher API</SectionHeading>
      <p>The <code>Cipher</code> class provides a single entry point for common cryptographic operations:</p>
      <CodeBlock language="typescript" code={`import { Cipher } from "xypriss-security";

// RANDOM & TOKENS
const bytes = Cipher.random.getRandomBytes(32);
const pin = Cipher.random.Int(1000, 9999);
const apiKey = Cipher.XSec.generateAPIKey({ prefix: "sk_live" });

// HASHING & PKCE
const digest = Cipher.hash.create("sensitive-payload");
const challenge = Cipher.hash.pkce("verifier-string-123");

// KEY DERIVATION (PBKDF2)
const derivedKey = await Cipher.hash.create("my-password", {
  algorithm: "pbkdf2",
  iterations: 200000,
  salt: "unique-salt-string",
});`} />

      <SectionHeading level={2}>Professional Passwords (Argon2id)</SectionHeading>
      <p>XyPriss uses Argon2id by default, providing superior resistance to brute-force attacks compared to BCrypt or Scrypt.</p>
      <CodeBlock language="typescript" code={`import { pm } from "xypriss-security"; // 'pm' is an alias for PasswordManager

const passwords = new pm({
  memoryCost: 65536, // 64MiB
  parallelism: 4,
});

// Hashing and verification
const hash = await passwords.hash("user-password-123");
const isValid = await passwords.verify("user-password-123", hash);

// Check if a string is already hashed
const alreadyHashed = passwords.isHashed(hash); // true`} />

      <SectionHeading level={2}>Performance Benchmarks</SectionHeading>
      <p>Leveraging a multi-threaded Go core allows XSec to significantly outperform native Node.js crypto implementations:</p>
      <table className="min-w-full text-sm text-slate-400 border-collapse border border-white/5 my-6">
        <thead>
          <tr className="bg-white/[0.05]">
            <th className="p-2 border border-white/5 text-left text-white">Operation</th>
            <th className="p-2 border border-white/5 text-left text-white">Standard JS</th>
            <th className="p-2 border border-white/5 text-left text-white">XSec (Go Core)</th>
            <th className="p-2 border border-white/5 text-left text-white">Improvement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-white/5 font-semibold">Argon2id</td>
            <td className="p-2 border border-white/5">~450ms</td>
            <td className="p-2 border border-white/5 text-blue-400 font-mono">~85ms</td>
            <td className="p-2 border border-white/5 text-green-400">5.3x</td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-semibold">AES-GCM</td>
            <td className="p-2 border border-white/5">~12ms</td>
            <td className="p-2 border border-white/5 text-blue-400 font-mono">~2ms</td>
            <td className="p-2 border border-white/5 text-green-400">6.0x</td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-semibold">SHA-256</td>
            <td className="p-2 border border-white/5">~5ms</td>
            <td className="p-2 border border-white/5 text-blue-400 font-mono">~0.8ms</td>
            <td className="p-2 border border-white/5 text-green-400">6.2x</td>
          </tr>
        </tbody>
      </table>

      <SectionHeading level={2}>Byte-Safe Validation</SectionHeading>
      <p>Standard JS <code>.length</code> counts characters, not bytes. XSec provides utilities for accurate byte-length validation, critical for AES keys and multi-byte Unicode strings.</p>
      <CodeBlock language="typescript" code={`import { getByteLength, isValidByteLength } from "xypriss-security";

// "café" has 4 characters but 5 bytes in UTF-8
console.log(getByteLength("café")); // 5 (bytes)

// Validate AES-256 key material (must be exactly 32 bytes)
const keyCandidate = "exactly-32-bytes-long-passphrase";
if (!isValidByteLength(keyCandidate, 32)) {
  throw new Error("Invalid key length.");
}`} />

      <DocsFooter 
        title="Enterprise Suite (XEMS)"
        description="Documentation for the XyPriss Enterprise Middleware Suite."
        buttonText="Next: XEMS"
        href="/docs/security/xems"
        iconName="Package"
      />
    </div>
  );
}
