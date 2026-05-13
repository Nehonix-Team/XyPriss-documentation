import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Key, ShieldCheck, Zap, AlertTriangle, Terminal, Layers, Lock, Cpu } from "lucide-react";

export default function RequestSignaturesPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Request Signature Authentication</SectionHeading>
      
      <p>XyPriss provides a powerful request signature authentication system that allows you to secure your APIs using cryptographic signatures. This method ensures that only authorized clients can access your API, requests cannot be tampered with in transit, and replay attacks are prevented.</p>

      <SectionHeading level={2}>Quick Start</SectionHeading>
      <p>Enable request signature validation globally by providing a shared secret in your security configuration:</p>
      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const server = createServer({
    security: {
        requestSignature: {
            secret: "your-super-secret-api-key-12345",
            debug: true, // Enable debug logging in development
        },
    },
});`} />

      <SectionHeading level={2}>Client Implementation</SectionHeading>
      <p>Clients must include a cryptographic signature in the <code>XP-Request-Sig</code> header and a timestamp in the <code>X-Timestamp</code> header. The signature is an HMAC-SHA256 hash of the request method, URL, body, and timestamp.</p>
      
      <Steps>
        <Step title="Prepare Data String">
          Concatenate the components: <code>METHOD + URL + BODY + TIMESTAMP</code>.
        </Step>
        <Step title="Compute HMAC">
          Generate an HMAC-SHA256 hash of the string using your shared secret.
        </Step>
        <Step title="Send Request">
          Include the signature and timestamp in the request headers.
        </Step>
      </Steps>

      <CodeBlock language="javascript" title="Node.js Client Example" code={`const crypto = require("crypto");

function signRequest(url, method, body = "", secret, timestamp = Date.now()) {
    const data = \`\${method.toUpperCase()}\${url}\${body}\${timestamp}\`;
    const signature = crypto
        .createHmac("sha256", secret)
        .update(data)
        .digest("hex");
    return { signature, timestamp };
}

// Usage
const { signature, timestamp } = signRequest("/api/data", "POST", '{"key":"val"}', "my-secret");`} />

      <SectionHeading level={2}>Configuration Options</SectionHeading>
      <p>Customize the validation behavior to fit your security requirements:</p>
      <CodeBlock language="typescript" code={`requestSignature: {
    secret: "my-secret-key",
    algorithm: "sha512", // sha256 or sha512
    maxAge: 300000, // 5 minutes validity
    clockSkew: 30000, // 30 seconds tolerance
    headerName: "X-API-Signature", // Custom header
    timestampHeaderName: "X-API-Timestamp",
    includeBody: true,
    includeQuery: true,
}`} />

      <SectionHeading level={2}>Advanced Route Filtering</SectionHeading>
      <p>Apply signatures only to specific routes or exclude public endpoints:</p>
      <CodeBlock language="typescript" code={`security: {
    routeConfig: {
        requestSignature: {
            includeRoutes: ["/api/webhooks/*", "/api/admin/*"],
            excludeRoutes: ["/api/public/*"],
        },
    },
}`} />

      <SectionHeading level={2}>Security Best Practices</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Key className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Strong Secrets</h5>
          <p className="text-[10px] text-slate-400 m-0">Always use cryptographically secure random strings for your shared secrets. Never use weak passwords.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Lock className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Use HTTPS</h5>
          <p className="text-[10px] text-slate-400 m-0">Signatures prevent tampering but not interception. Always use HTTPS in production to encrypt the headers.</p>
        </div>
      </div>

      <Callout type="danger" title="Clock Synchronization">
        Ensure your server and client clocks are synchronized. Requests will fail with a "Signature expired" error if the time difference exceeds <code>maxAge + clockSkew</code>.
      </Callout>

      <DocsFooter 
        title="Route Security"
        description="Implement fine-grained access control using IP whitelists and blacklists."
        buttonText="Next: Route Security"
        href="/docs/security/route-security"
        iconName="Shield"
      />
    </div>
  );
}
