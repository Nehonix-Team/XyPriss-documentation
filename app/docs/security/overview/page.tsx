import { DocLayout } from "@/components/docs/DocLayout";
import { Prose } from "@/components/docs/Prose";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { generateDocMeta } from "@/lib/docs-meta";
import type { Metadata } from "next";

export const metadata: Metadata = generateDocMeta({
  title: "Security Overview",
  description: "Learn about the security-first architecture of XyPriss and its built-in protection mechanisms.",
  slug: "security/overview",
});

const TOC = [
  { id: "middleware", label: "Built-in Security Middleware" },
  { id: "config", label: "Configuration" },
  { id: "cors", label: "CORS with Wildcard" },
  { id: "levels", label: "Security Levels" },
];

export default function SecurityOverviewPage() {
  return (
    <DocLayout
      title="Security Overview"
      description="Protect your application with XyPriss's security-first architecture."
      toc={TOC}
      editPath="app/docs/security/overview/page.tsx"
    >
      <Prose>
        <p>
          XyPriss enforces a &quot;Secure by Default&quot; philosophy. It includes a comprehensive suite of security features 
          to protect your application from common vulnerabilities out of the box.
        </p>

        <SectionHeading id="middleware" level={2}>Built-in Security Middleware</SectionHeading>
        <p>XyPriss includes 12+ built-in security modules:</p>
        <ul>
          <li><strong>CSRF Protection</strong> — Built-in protection against cross-site request forgery.</li>
          <li><strong>Security Headers</strong> — Powered by Helmet for secure HTTP headers.</li>
          <li><strong>CORS</strong> — Advanced cross-origin resource sharing with wildcard support.</li>
          <li><strong>Rate Limiting</strong> — Native protection against brute force and DDoS attacks.</li>
          <li><strong>Input Sanitization</strong> — Automatic input cleaning to prevent XSS and injection.</li>
        </ul>

        <SectionHeading id="config" level={2}>Configuration</SectionHeading>
        <p>Enabling security features is straightforward in your server options:</p>
        
        <CodeBlock 
          lang="ts"
          code={`import { createServer } from "xypriss";

const server = createServer({
  security: {
    enabled: true,
    level: "enhanced", // options: "basic", "enhanced", "maximum"
    csrf: { enabled: true },
    rateLimit: {
      max: 100,
      windowMs: 15 * 60 * 1000,
    },
  },
});`}
          filename="app.ts"
        />

        <SectionHeading id="cors" level={2}>CORS with Wildcard Support</SectionHeading>
        <p>XyPriss supports flexible CORS configuration with high-performance wildcard matching:</p>
        
        <CodeBlock 
          lang="ts"
          code={`const server = createServer({
  security: {
    cors: {
      origin: [
        "localhost:*",   // Any localhost port
        "*.myapp.com",   // Any subdomain
        "https://app.com" // Exact URL
      ],
      credentials: true,
    },
  },
});`}
          filename="cors-config.ts"
        />

        <SectionHeading id="levels" level={2}>Security Levels</SectionHeading>
        <p>
          Choose a security level that fits your application&apos;s needs:
        </p>
        <ul>
          <li><strong>Basic</strong>: Essential headers and basic CORS protection.</li>
          <li><strong>Enhanced</strong>: (Recommended) Includes CSRF, rate limiting, and sanitization.</li>
          <li><strong>Maximum</strong>: Strict CSP policies, advanced rate limiting, and IP whitelisting.</li>
        </ul>

        <Callout type="tip" title="Security Best Practice">
          Always use <code>enhanced</code> or <code>maximum</code> levels for production environments to ensure full protection.
        </Callout>
      </Prose>
    </DocLayout>
  );
}
