import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Globe, ShieldCheck, Zap, AlertTriangle, Terminal, Layers, Code, Globe2 } from "lucide-react";

export default function CORSPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Wildcard CORS Support</SectionHeading>

      <p>
        XyPriss supports flexible{" "}
        <strong>CORS (Cross-Origin Resource Sharing)</strong> configuration with
        powerful wildcard patterns, making it easier to handle multiple domains
        and ports during development and production.
      </p>

      <SectionHeading level={2}>Supported Patterns</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Terminal className="w-4 h-4" /> Port Wildcards
          </div>
          <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
            <li>
              <code>localhost:*</code> - Any port on localhost
            </li>
            <li>
              <code>127.0.0.1:*</code> - Any port on 127.0.0.1
            </li>
            <li>
              <code>::1:*</code> - Any port on IPv6 localhost
            </li>
          </ul>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Globe2 className="w-4 h-4" /> Subdomain Wildcards
          </div>
          <ul className="text-[10px] text-slate-400 m-0 list-disc pl-4 space-y-1">
            <li>
              <code>*.example.com</code> - Any subdomain of example.com
            </li>
            <li>
              <code>*.api.myapp.com</code> - Any subdomain of api.myapp.com
            </li>
          </ul>
        </div>
      </div>

      <SectionHeading level={2}>Basic Configuration</SectionHeading>
      <p>
        Specify flexible origin patterns in your server options. XyPriss
        automatically detects wildcard patterns and applies the appropriate
        validation logic.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        cors: {
            origin: [
                "localhost:*", // Allow any localhost port
                "127.0.0.1:*", // Allow any 127.0.0.1 port
                "*.myapp.com", // Allow any subdomain
                "https://app.prod.com", // Exact production URL
            ],
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE"],
            allowedHeaders: ["Content-Type", "Authorization"],
        },
    },
});`}
      />

      <SectionHeading level={2}>Pattern Matching Rules</SectionHeading>
      <table className="min-w-full text-sm text-slate-400 border-collapse border border-white/5 my-6">
        <thead>
          <tr className="bg-white/[0.05]">
            <th className="p-2 border border-white/5 text-left text-white">
              Pattern
            </th>
            <th className="p-2 border border-white/5 text-left text-white">
              Matches
            </th>
            <th className="p-2 border border-white/5 text-left text-white">
              Doesn't Match
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400 text-xs">
              localhost:*
            </td>
            <td className="p-2 border border-white/5 text-[10px]">
              http://localhost:3000
              <br />
              https://localhost:8080
            </td>
            <td className="p-2 border border-white/5 text-[10px]">
              http://example.com:3000
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400 text-xs">
              *.test.com
            </td>
            <td className="p-2 border border-white/5 text-[10px]">
              https://api.test.com
              <br />
              https://app.test.com
            </td>
            <td className="p-2 border border-white/5 text-[10px]">
              https://test.com
              <br />
              https://malicious.com
            </td>
          </tr>
          <tr>
            <td className="p-2 border border-white/5 font-mono text-blue-400 text-xs">
              127.0.0.1:*
            </td>
            <td className="p-2 border border-white/5 text-[10px]">
              http://127.0.0.1:3000
            </td>
            <td className="p-2 border border-white/5 text-[10px]">
              http://localhost:3000
            </td>
          </tr>
        </tbody>
      </table>

      <SectionHeading level={2}>Development vs Production</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`const isDevelopment = __sys__.__env__.isDevelopment();

const app = createServer({
    security: {
        cors: {
            origin: isDevelopment
                ? ["localhost:*", "127.0.0.1:*", "::1:*"]
                : ["https://app.mycompany.com", "https://admin.mycompany.com"],
        },
    },
});`}
      />

      <SectionHeading level={2}>Security Best Practices</SectionHeading>
      <div className="space-y-4 my-8">
        <Callout type="warning">
          <strong>Production Safety:</strong> Be specific. Use exact domains in
          production when possible. Avoid overly broad patterns like{" "}
          <code>*</code> which allows ALL origins.
        </Callout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <h5 className="text-white font-semibold mb-1 text-sm">
              Pattern Compilation
            </h5>
            <p className="text-[10px] text-slate-400 m-0">
              Patterns are compiled once during server initialization. XyPriss
              handles default ports (80/443) and IPv6 address formatting
              automatically.
            </p>
          </div>
          <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <h5 className="text-white font-semibold mb-1 text-sm">
              Compatibility
            </h5>
            <p className="text-[10px] text-slate-400 m-0">
              Exact-match origins continue to work unchanged. Mixed arrays
              containing both exact and wildcard patterns are fully supported.
            </p>
          </div>
        </div>
      </div>

      <DocsFooter
        title="Rate Limiting"
        description="Prevent abuse and DDoS attacks by limiting requests per IP."
        buttonText="Next: Rate Limiting"
        href="/docs/security/rate-limiting"
        iconName="Zap"
      />
    </div>
  );
}
