import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { ShieldCheck, Zap, Key, Lock, Cpu, Database, Binary } from "lucide-react";

export default function RSAUtilsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>RSA Cryptography & Byte Utils</SectionHeading>
      
      <p>This module provides RSA asymmetric cryptography primitives and critical byte-length validation utilities. All operations are powered by the Go security core for maximum performance and security.</p>

      <SectionHeading level={2}>RSA Key Management</SectionHeading>
      <p>Generate 4096-bit RSA key pairs using a cryptographically secure random source. Keys are PEM-encoded and compatible with standard OpenSSL tools.</p>
      <CodeBlock language="typescript" code={`import { generateRSAKeyPair } from "xypriss-security";

const { publicKey, privateKey } = await generateRSAKeyPair();

console.log(publicKey);
// -----BEGIN PUBLIC KEY-----
// MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA...
// -----END PUBLIC KEY-----`} />

      <SectionHeading level={2}>RSA Signatures (RSA-PSS)</SectionHeading>
      <p>XyPriss uses <strong>RSA-PSS</strong> with SHA-256, the modern successor to PKCS#1 v1.5. It includes random salting, making each signature unique even for identical inputs.</p>
      <CodeBlock language="typescript" title="Signing & Verification" code={`import { rsaSign, rsaVerify } from "xypriss-security";

const signature = await rsaSign(privateKey, "payload-to-sign");
const isValid = await rsaVerify(publicKey, "payload-to-sign", signature);`} />

      <SectionHeading level={2}>RSA Encryption (RSA-OAEP)</SectionHeading>
      <p>XyPriss uses <strong>RSA-OAEP</strong> with SHA-256 for secure asymmetric encryption. Note that RSA is limited by payload size (max 446 bytes for 4096-bit keys with SHA-256).</p>
      <CodeBlock language="typescript" title="Encryption & Decryption" code={`import { rsaEncrypt, rsaDecrypt } from "xypriss-security";

const encrypted = await rsaEncrypt(publicKey, "secret-value");
const decrypted = await rsaDecrypt(privateKey, encrypted);`} />

      <SectionHeading level={2}>Byte Length Utilities</SectionHeading>
      <p>Standard JavaScript <code>.length</code> counts characters, not bytes. For security-sensitive operations like AES-256 key validation, you must use actual UTF-8 byte counts.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Binary className="w-4 h-4" /> getByteLength
          </div>
          <CodeBlock language="typescript" code={`import { getByteLength } from "xypriss-security";

getByteLength("café"); // 5
getByteLength("你好"); // 6`} />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <ShieldCheck className="w-4 h-4" /> isValidByteLength
          </div>
          <CodeBlock language="typescript" code={`import { isValidByteLength } from "xypriss-security";

// Exactly 32 bytes for AES-256
isValidByteLength(keyCandidate, 32);`} />
        </div>
      </div>

      <Callout type="warning" title="Hybrid Encryption">
        RSA encryption is not designed for large payloads. For encrypting arbitrary-length data, use hybrid encryption: encrypt the payload with AES, then encrypt the AES key with RSA.
      </Callout>

      <DocsFooter 
        title="Secure Cache"
        description="Ultra-fast secure in-memory cache system (UFSIMC)."
        buttonText="Next: Secure Cache"
        href="/docs/security/xsec-m/cache"
        iconName="Zap"
      />
    </div>
  );
}
