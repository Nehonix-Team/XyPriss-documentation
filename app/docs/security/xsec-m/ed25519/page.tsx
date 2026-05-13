import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { ShieldCheck, Zap, Key, Lock, Cpu, Database, Binary } from "lucide-react";

export default function Ed25519Page() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Ed25519 Signature Verification</SectionHeading>
      
      <p>The Ed25519 module provides high-performance asymmetric signature verification. Unlike standard RSA, Ed25519 uses Twisted Edwards curves, offering smaller signatures and faster computation with superior security.</p>

      <SectionHeading level={2}>Simplified API</SectionHeading>
      <p>XyPriss Security implements a simplified, Go-backed Ed25519 primitive that removes the complex boilerplate of DER encoding and SPKI conversion typically required in Node.js.</p>
      
      <CodeBlock language="typescript" title="Signature Verification" code={`import { Cipher } from "xypriss-security";

const authorPubKey = "7dc962b27af59bc7a9e0d0d2c155989e0ec5a80fed78ac1375ae95038a31afd5";
const data = "System Integrity Verified - G3 Protocol Active";
const signature = "gcV+Lm7C2y6sn0H3KH9yC741Al968YzuqvGkyp5G4oybekBeFavs0/LypaAGZrt7qLDTOL86nfRs5qE9DT8sAA==";

const isValid = Cipher.crypto.ed25519Verify(authorPubKey, data, signature);

if (isValid) {
  console.log("✅ Identity and data integrity confirmed.");
}`} />

      <SectionHeading level={2}>Large Payload Optimization</SectionHeading>
      <p>For large data payloads (multi-megabyte files), the framework transparently switches from CLI arguments to high-speed <strong>stdin piping</strong>.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Zap className="w-4 h-4" /> Bypasses OS Limits
          </div>
          <p className="text-[10px] text-slate-400 m-0">Handles data exceeding the <code>E2BIG</code> threshold (~128KB) by piping directly to the native process.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <ShieldCheck className="w-4 h-4" /> Constant-Time
          </div>
          <p className="text-[10px] text-slate-400 m-0">Uses the Go standard library's <code>crypto/ed25519</code>, which is resistant to timing attacks.</p>
        </div>
      </div>

      <Callout type="info" title="Hardware Acceleration">
        Ed25519 verification in XSec-M is approximately 4-6x faster than standard Node.js implementations due to the optimized Go assembly instructions used in the binary core.
      </Callout>

      <DocsFooter 
        title="RSA & Byte Utils"
        description="Asymmetric encryption and byte-safe validation utilities."
        buttonText="Next: RSA Utils"
        href="/docs/security/xsec-m/rsa-utils"
        iconName="Lock"
      />
    </div>
  );
}
