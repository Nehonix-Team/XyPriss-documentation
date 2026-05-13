import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { ShieldCheck, Zap, Key, Lock, Cpu, Database, Binary } from "lucide-react";

export default function XSecMCorePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Core Primitives</SectionHeading>
      
      <p>The Core module provides the foundational cryptographic primitives and binary handling for the XyPriss Security framework. These operations are powered by a native Go engine for high performance and strict security standards.</p>

      <SectionHeading level={2}>Cipher (Compatibility)</SectionHeading>
      <p>A unified entry point that aggregates all core modules for convenience and backward compatibility.</p>
      <CodeBlock language="typescript" code={`import { Cipher } from "xypriss-security";

const bytes = Cipher.random.getRandomBytes(32);
const digest = Cipher.hash.create("data");
const apiKey = Cipher.XSec.generateAPIKey();`} />

      <SectionHeading level={2}>Hashing & Key Derivation</SectionHeading>
      <p>High-performance hashing, HMAC, and PBKDF2 operations via the <code>Hash</code> class.</p>
      <CodeBlock language="typescript" title="Hash API" code={`import { Hash } from "xypriss-security";

// Standard SHA-256 Hash
const hexHash = Hash.create("message");

// PBKDF2 Key Derivation
const key = Hash.create("password", {
  algorithm: "pbkdf2",
  iterations: 210000,
  outputFormat: "buffer",
});

// PKCE Challenge for OAuth2
const challenge = Hash.pkce("verifier-string-123");`} />

      <SectionHeading level={2}>Secure Random Generation</SectionHeading>
      <p>Cryptographically secure random generation for numbers and tokens.</p>
      <CodeBlock language="typescript" title="Random API" code={`import { Cipher } from "xypriss-security";

// Secure Integer [50, 150)
const secureInt = Cipher.random.Int(50, 150);

// High-Entropy Token
const token = Cipher.random.generateToken(32, { 
    includeSymbols: true,
    excludeSimilar: true 
});`} />

      <SectionHeading level={2}>Password Management (pm)</SectionHeading>
      <p>Configurable, instance-based secure password management using Argon2id by default.</p>
      <CodeBlock language="typescript" title="Password Manager" code={`import { pm } from "xypriss-security";

const passwords = new pm({
  algorithm: "argon2id",
  memoryCost: 65536,
  parallelism: 4,
  pepper: "app-secret-pepper",
});

const hash = await passwords.hash("user-password-123");
const isValid = await passwords.verify("user-password-123", hash);

// Evaluate password strength
const { score, suggestions } = passwords.strength("p@ssword!");`} />

      <SectionHeading level={2}>Secure Binary Handling</SectionHeading>
      <p>The <code>SecureBuffer</code> class extends standard <code>Uint8Array</code> with familiar encoding methods optimized for security contexts.</p>
      <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl my-6">
        <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
          <Binary className="w-4 h-4" /> SecureBuffer Methods
        </div>
        <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
          <li><code>toString("hex" | "base64" | "utf8" | "binary")</code></li>
          <li>Accurate UTF-8 byte length validation via <code>isValidByteLength</code></li>
          <li>Hardware-bound memory sanitization for sensitive data</li>
        </ul>
      </div>

      <DocsFooter 
        title="Ed25519 Signatures"
        description="High-performance EdDSA signature verification for digital integrity."
        buttonText="Next: Ed25519"
        href="/docs/security/xsec-m/ed25519"
        iconName="Key"
      />
    </div>
  );
}
