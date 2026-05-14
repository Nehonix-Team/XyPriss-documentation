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
  Terminal,
  Layers,
  Lock,
  Shield,
  Settings,
  Activity,
} from "lucide-react";

export default function SecurityGuidePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Security Guide</SectionHeading>

      <p>
        XyPriss includes comprehensive security features to protect your
        application from common vulnerabilities. This guide covers basic
        configuration, security levels, and best practices.
      </p>

      <SectionHeading level={2}>Basic Security Configuration</SectionHeading>
      <p>Enable core security features globally in your server options:</p>
      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const server = createServer({
    security: {
        enabled: true,
        csrf: true,
        rateLimit: {
            max: 100,
            windowMs: 15 * 60 * 1000, // 100 requests per 15 minutes
        },
    },
});`}
      />

      <SectionHeading level={2}>Security Levels</SectionHeading>
      <p>
        XyPriss offers three pre-defined security levels to quickly configure
        your application's defensive posture.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h4 className="text-white font-semibold mb-1 flex items-center gap-2">
            <Shield size={16} /> Basic
          </h4>
          <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
            <li>Essential security headers</li>
            <li>Basic CORS protection</li>
            <li>Request logging</li>
          </ul>
        </div>
        <div className="p-4 bg-white/[0.02] border border-blue-500/30 bg-blue-500/5 rounded-xl shadow-lg shadow-blue-500/5">
          <h4 className="text-blue-400 font-semibold mb-1 flex items-center gap-2">
            <ShieldCheck size={16} /> Enhanced
          </h4>
          <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
            <li>All basic features</li>
            <li>CSRF protection</li>
            <li>Rate limiting</li>
            <li>Input sanitization</li>
            <li>XSS protection</li>
          </ul>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h4 className="text-purple-400 font-semibold mb-1 flex items-center gap-2">
            <Zap size={16} /> Maximum
          </h4>
          <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
            <li>All enhanced features</li>
            <li>Strict CSP policies</li>
            <li>Advanced rate limiting</li>
            <li>IP whitelisting/blacklisting</li>
            <li>Request signature validation</li>
          </ul>
        </div>
      </div>

      <CodeBlock
        language="typescript"
        code={`const server = createServer({
    security: {
        enabled: true,
        level: "enhanced", // "basic" | "enhanced" | "maximum"
    },
});`}
      />

      <SectionHeading level={2}>Security Headers</SectionHeading>
      <p>
        XyPriss automatically sets secure HTTP headers using Helmet. You can
        customize these directives in your configuration:
      </p>
      <CodeBlock
        language="typescript"
        code={`const server = createServer({
    security: {
        helmet: {
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                },
            },
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            },
        },
    },
});`}
      />

      <SectionHeading level={2}>Security Best Practices</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-6">
        {[
          "Always enable HTTPS in production",
          "Use environment variables for sensitive data",
          "Implement rate limiting on auth endpoints",
          "Validate and sanitize all user inputs",
          "Keep dependencies updated regularly",
          "Use CSRF protection for state-changing ops",
          "Implement proper authentication",
          "Log security events for monitoring",
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-400"
          >
            <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
            {item}
          </div>
        ))}
      </div>

      <SectionHeading level={2}>Monitoring & Logging</SectionHeading>
      <p>Enable security event logging to monitor for suspicious activity:</p>
      <CodeBlock
        language="typescript"
        code={`const server = createServer({
    logging: {
        enabled: true,
        level: "info",
        components: {
            security: true,
        },
    },
    security: {
        enabled: true,
        logSecurityEvents: true,
    },
});`}
      />

      <Callout type="info" title="XyPriss Security Shield">
        For projects requiring advanced protection, install the optional
        security shield:
        <CodeBlock
          language="bash"
          className="mt-4"
          code="xfpm install xypriss-security"
        />
      </Callout>

      <SectionHeading level={2}>Data Privacy & Disclosure</SectionHeading>
      <p>
        At Nehonix, we prioritize the privacy and security of your data. We are 
        committed to total transparency regarding data handling:
      </p>
      <Callout type="success" title="Zero External Data Collection">
        <p className="m-0 text-sm">
          XyPriss is designed as a self-contained framework. Nehonix <strong>does not collect, 
          store, or transmit</strong> any application data, user information, or server metrics 
          to external servers. All logic executed by the framework stays within your local 
          infrastructure, ensuring absolute data sovereignty.
        </p>
      </Callout>
      <p>
        The only external requests made by official components (such as XyNginC or XFPM) 
        are strictly for fetching necessary updates, security templates, or package metadata 
        from official GitHub repositories.
      </p>

      <DocsFooter
        title="Environment Shield"
        description="Secure your server by preventing unauthorized access to sensitive system files and directories."
        buttonText="Next: Env Shield"
        href="/docs/security/environment-shield"
        iconName="Lock"
      />
    </div>
  );
}

// Helper component for icons
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
