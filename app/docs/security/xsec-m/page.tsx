import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { ShieldCheck, Zap, Globe, Lock, Cpu, Terminal, Key, Database } from "lucide-react";

export default function XSecMLandingPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XyPriss Security - Module (XSec-M)</SectionHeading>
      
      <p>XSec-M is an enterprise-grade cryptographic framework for TypeScript / JavaScript environments. It utilizes a high-performance Go-based core engine compiled as a static, dependency-free CLI binary to provide military-grade security with absolute cross-platform reliability.</p>

      <SectionHeading level={2}>Core Principles</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Cpu className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Performance</h5>
          <p className="text-[10px] text-slate-400 m-0">Optimized execution using lightweight process spawning, bypassing the overhead of standard JavaScript cryptographic implementations.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Globe className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Universal Portability</h5>
          <p className="text-[10px] text-slate-400 m-0">Zero native compilation required. Statically linked pure Go binaries run flawlessly on Linux, Windows, and macOS.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Modern Standards</h5>
          <p className="text-[10px] text-slate-400 m-0">Native support for Ed25519, AES-256-GCM, Argon2id, PBKDF2, HKDF, RSA-OAEP, and Post-Quantum algorithms.</p>
        </div>
      </div>

      <SectionHeading level={2}>Documentation Structure</SectionHeading>
      <p>XSec-M is divided into specialized modules for different cryptographic needs:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          { title: "Core Primitives", desc: "Foundational primitives: Hash, Random, Password manager.", href: "/docs/security/xsec-m/core" },
          { title: "Ed25519", desc: "High-performance EdDSA signature verification.", href: "/docs/security/xsec-m/ed25519" },
          { title: "RSA & Byte Utils", desc: "RSA-PSS signing, RSA-OAEP encryption, and byte validation.", href: "/docs/security/xsec-m/rsa-utils" },
          { title: "Secure Cache", desc: "Ultra-fast secure in-memory cache system (UFSIMC).", href: "/docs/security/xsec-m/cache" },
          { title: "Encryption", desc: "High-level data protection services.", href: "/docs/security/xsec-m/encryption" },
          { title: "Utilities", desc: "Encoding and general cryptographic helpers.", href: "/docs/security/xsec-m/utils" }
        ].map((mod, idx) => (
          <a key={idx} href={mod.href} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-colors no-underline group">
            <h5 className="text-white font-semibold mb-1 text-sm group-hover:text-blue-400 transition-colors">{mod.title}</h5>
            <p className="text-[10px] text-slate-400 m-0">{mod.desc}</p>
          </a>
        ))}
      </div>

      <SectionHeading level={2}>Quick Start</SectionHeading>
      <p>Install the security toolkit via XFPM:</p>
      <CodeBlock language="bash" code="xfpm add xypriss-security" />

      <SectionHeading level={2}>The Unified Cipher API</SectionHeading>
      <p>For maximum convenience, use the <code>Cipher</code> class to access core hashing and random generation primitives.</p>
      <CodeBlock language="typescript" code={`import { Cipher } from "xypriss-security";

// Generate 32 secure random bytes
const bytes = Cipher.random.getRandomBytes(32);

// Create a standard SHA-256 hash
const digest = Cipher.hash.create("sensitive-payload");

// Generate a PKCE Code Challenge for OAuth2
const challenge = Cipher.hash.pkce("verifier-string-123");`} />

      <DocsFooter 
        title="Core Primitives"
        description="Learn about foundational primitives: Hash, Random, and Password management."
        buttonText="Next: Core Primitives"
        href="/docs/security/xsec-m/core"
        iconName="Shield"
      />
    </div>
  );
}
