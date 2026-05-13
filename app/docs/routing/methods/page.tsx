import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { List, Globe, Zap, Shield, Database } from "lucide-react";

export default function HttpMethodsPage() {
  const methods = [
    { 
      name: "GET", 
      desc: "Retrieve resources. Supports query parameter parsing.",
      color: "text-blue-400"
    },
    { 
      name: "POST", 
      desc: "Submit entities. Automatically parses JSON/URL-encoded bodies.",
      color: "text-green-400"
    },
    { 
      name: "PUT", 
      desc: "Replace target resource with the request payload.",
      color: "text-yellow-400"
    },
    { 
      name: "PATCH", 
      desc: "Apply partial modifications to a resource.",
      color: "text-purple-400"
    },
    { 
      name: "DELETE", 
      desc: "Delete resource. Supports body parsing for complex criteria.",
      color: "text-red-400"
    },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>HTTP Methods Reference</SectionHeading>

      <p>
        XyPriss provides a comprehensive set of methods to handle standard HTTP 
        verbs. These map directly to the underlying XHSC engine, ensuring 
        high-performance and full compliance with web standards.
      </p>

      <SectionHeading level={2}>Core Methods</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        {methods.map((m) => (
          <div key={m.name} className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
            <h5 className={`font-mono font-bold mb-1 ${m.color}`}>{m.name}</h5>
            <p className="text-xs text-slate-400 m-0">{m.desc}</p>
          </div>
        ))}
      </div>

      <SectionHeading level={2}>Advanced & Utility Methods</SectionHeading>
      
      <SectionHeading level={3}>OPTIONS</SectionHeading>
      <p>
        Used to describe communication options. In most setups, 
        preflight OPTIONS requests are handled automatically by the CORS security 
        middleware.
      </p>

      <SectionHeading level={3}>HEAD</SectionHeading>
      <p>
        Identical to GET but without the response body. XyPriss executes the 
        routing logic but discards the body before transmission, sending only 
        headers.
      </p>

      <SectionHeading level={3}>CONNECT, TRACE</SectionHeading>
      <p>
        XyPriss fully supports CONNECT (for proxy tunneling) and TRACE (for 
        diagnostic loop-backs).
      </p>

      <SectionHeading level={2}>The Catch-All: <code>app.all()</code></SectionHeading>
      <p>
        Matches <strong>all</strong> HTTP methods for a specific path. Useful 
        for global logic or section-specific middleware.
      </p>
      <CodeBlock
        language="typescript"
        code={`app.all("/api/*", (req, res, next) => {
    console.log("API request:", req.method, req.url);
    next();
});`}
      />

      <SectionHeading level={2}>Body Parsing Intelligence</SectionHeading>
      <p>
        XyPriss employs smart body parsing logic. The <code>req.body</code> is 
        populated automatically if:
      </p>
      <ul className="space-y-2">
        <li className="flex items-start gap-3 text-xs text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          The method is POST, PUT, PATCH, or DELETE.
        </li>
        <li className="flex items-start gap-3 text-xs text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          The <code>Content-Length</code> header is present and greater than 0.
        </li>
        <li className="flex items-start gap-3 text-xs text-slate-400">
          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
          The <code>Transfer-Encoding</code> header is present (chunked transfer).
        </li>
      </ul>

      <Callout type="info" title="Performance Tip">
        Because XyPriss offloads initial HTTP parsing to the native Go core, 
        headers and method identification happen with sub-microsecond latency.
      </Callout>

      <DocsFooter
        title="Configuration Guide"
        description="Learn how to configure your XyPriss server for production workloads."
        buttonText="Next: Configuration"
        href="/docs/config/guide"
        iconName="Settings"
      />
    </div>
  );
}
