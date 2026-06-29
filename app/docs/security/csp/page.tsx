import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  Code,
  Layers,
  Lock,
  Globe,
} from "lucide-react";

export default function CSPPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Content Security Policy (CSP)</SectionHeading>

      <p>
        XyPriss provides advanced <strong>Content Security Policy</strong>{" "}
        configuration with flexible directive support through the Helmet
        middleware. This allows developers to create comprehensive security
        policies to prevent XSS and data injection attacks.
      </p>

      <SectionHeading level={2}>Basic Configuration</SectionHeading>
      <p>
        Configure CSP directives globally in your server options. XyPriss
        supports strings, arrays, and boolean directives.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        helmet: {
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:", "https:"],
                },
            },
        },
    },
});`}
      />

      <SectionHeading level={2}>Advanced Multi-Source Policy</SectionHeading>
      <p>
        For complex applications, you can define granular sources for different
        resource types:
      </p>

      <CodeBlock
        language="typescript"
        code={`const app = createServer({
    security: {
        helmet: {
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: [
                        "'self'",
                        "'unsafe-inline'",
                        "https://cdn.example.com",
                        "https://dll.nehonix.com"
                    ],
                    fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
                    connectSrc: ["'self'", "https://dll.nehonix.com"],
                    frameSrc: ["'none'"],
                    objectSrc: ["'none'"],
                    upgradeInsecureRequests: [] // Boolean directive
                }
            }
        }
    }
});`}
      />

      <SectionHeading level={2}>Nonces and Hashes</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Lock size={16} /> Nonce Support
          </h4>
          <p className="text-xs text-slate-400 m-0">
            Generate per-request nonces to allow specific inline scripts while
            maintaining a strict policy.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
            <Code size={16} /> Hash Support
          </h4>
          <p className="text-xs text-slate-400 m-0">
            Whiltelist specific inline script contents using their SHA-256
            cryptographic hashes.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Report-Only Mode</SectionHeading>
      <p>
        Test new policies without blocking resources by enabling{" "}
        <code>reportOnly</code> mode. Violations will be logged to the specified
        URI.
      </p>

      <CodeBlock
        language="typescript"
        code={`const app = createServer({
    security: {
        helmet: {
            contentSecurityPolicy: {
                reportOnly: true, 
                directives: { /* directives */ },
                reportUri: "/api/security/csp-report",
            },
        },
    },
});`}
      />

      <SectionHeading level={2}>Development Security Profile (Automatic)</SectionHeading>
      <p>
        XyPriss includes a security profile specifically designed for local
        development. It automatically relaxes headers (CSP, COEP, CORP, HSTS)
        to allow development tools to function correctly (Hot Reloading, local
        WebSockets, CDNs).
      </p>
      <p>
        This profile activates automatically if <strong>both</strong> of the
        following conditions are met:
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground mb-6">
        <li>
          The environment is in development mode (
          <code className="text-primary">NODE_ENV=development</code>).
        </li>
        <li>
          The <code className="text-primary">XSEC_TRUST</code> environment
          variable is not set to <code className="text-primary">"false"</code>{" "}
          (it defaults to <code className="text-primary">"true"</code> in dev).
        </li>
      </ol>
      <CodeBlock
        language="bash"
        title=".env"
        code={`NODE_ENV=development

# Optional: disable the dev profile to test strict production config
# XSEC_TRUST=false`}
      />
      <Callout type="info" title="What the development profile does">
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>
            <strong>CSP</strong>: Allows requests to <code>localhost:*</code>{" "}
            and <code>127.0.0.1:*</code> (HTTP and WS), plus trusted CDNs
            (cdnjs, jsdelivr, Google Fonts).
          </li>
          <li>
            <strong>COEP/CORP</strong>: Relaxes Cross-Origin isolation to allow
            loading external resources during development.
          </li>
          <li>
            <strong>HSTS</strong>: Disables strict HSTS caching (
            <code>max-age=0</code>) to avoid locking your browser on localhost.
          </li>
        </ul>
      </Callout>
      <Callout type="warning">
        A security reminder is printed in the console at each startup in dev
        mode. In production (<code>NODE_ENV=production</code>), XyPriss
        automatically switches back to the <strong>Zero Trust</strong> profile
        (strict CSP, HSTS enabled, COEP isolation).
      </Callout>

      <SectionHeading level={2}>Security Best Practices</SectionHeading>
      <div className="space-y-4 my-8">
        <Callout type="warning">
          <strong>Avoid unsafe-inline:</strong> Whenever possible, avoid using{" "}
          <code>'unsafe-inline'</code>. Use Nonces or Hashes instead to maintain
          a strong security posture.
        </Callout>

        <ul className="list-none p-0 space-y-2">
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 text-green-400 mt-1 shrink-0" />
            <span>
              <strong>Principle of Least Privilege:</strong> Only allow
              necessary sources and start with restrictive defaults.
            </span>
          </li>
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <ShieldCheck className="w-4 h-4 text-green-400 mt-1 shrink-0" />
            <span>
              <strong>Use HTTPS:</strong> Always prefer and enforce HTTPS
              sources for all directives.
            </span>
          </li>
        </ul>
      </div>

      <DocsFooter
        title="CORS Policy"
        description="Configure cross-origin resource sharing for your API with wildcard and pattern support."
        buttonText="Next: CORS Policy"
        href="/docs/security/cors"
        iconName="Globe"
      />
    </div>
  );
}
