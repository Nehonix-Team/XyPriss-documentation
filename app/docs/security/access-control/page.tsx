import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Smartphone, Terminal, ShieldCheck, Zap, AlertTriangle, Monitor, Cpu, Activity } from "lucide-react";

export default function AccessControlPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Access Control Middleware</SectionHeading>
      
      <p>XyPriss provides advanced access control middleware to restrict API access based on client type. Two complementary modules allow you to create secure, client-specific endpoints by distinguishing between browser and terminal environments.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Monitor className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="text-white font-semibold mb-1">BrowserOnly</h4>
          <p className="text-xs text-slate-400">Blocks non-browser requests (cURL, Postman, scripts) while allowing legitimate browser access.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Terminal className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="text-white font-semibold mb-1">TerminalOnly</h4>
          <p className="text-xs text-slate-400">Blocks browser requests while allowing terminal/API tools with optional whitelisting.</p>
        </div>
      </div>

      <SectionHeading level={2}>BrowserOnly Configuration</SectionHeading>
      <p>Perfect for web applications that should only be accessed through browsers. It uses multiple detection methods including Sec-Fetch headers and browser engine signatures.</p>
      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        browserOnly: {
            enable: true, // Enable/disable the middleware
            debug: false, // Enable debug logging
            requireSecFetch: true, // Require Sec-Fetch headers
            blockAutomationTools: true, // Block curl/wget user agents
            requireComplexAccept: false, // Require complex Accept headers
            allowOriginRequests: true, // Allow CORS requests
            errorMessage: "Browser access required",
            statusCode: 403,
        },
    },
});`} />

      <SectionHeading level={2}>TerminalOnly Configuration</SectionHeading>
      <p>Ideal for API-only endpoints or development tools. It blocks browser access while allowing terminal tools like cURL, Postman, and other API clients.</p>
      <CodeBlock language="typescript" code={`const app = createServer({
    security: {
        terminalOnly: {
            enable: true, // Enable/disable the middleware
            debug: true, // Enable debug logging
            allowedTools: ["postman", "curl"], // Whitelist specific tools
            blockSecFetch: true, // Block requests with Sec-Fetch headers
            blockBrowserIndicators: true, // Block browser-specific headers
            errorMessage: "Terminal/API access required",
            statusCode: 403,
        },
    },
});`} />

      <SectionHeading level={2}>Whitelisting & Tools</SectionHeading>
      <p>When <code>allowedTools</code> is specified, only listed tools can access the endpoint. Supported tools include:</p>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 list-none p-0 my-6">
        {["curl", "wget", "postman", "insomnia", "httpie", "axios", "fetch", "got"].map(tool => (
          <li key={tool} className="text-[10px] text-slate-300 bg-white/[0.02] p-2 rounded border border-white/5 font-mono text-center">
            {tool}
          </li>
        ))}
      </ul>

      <SectionHeading level={2}>Strictness Levels</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
          <h5 className="text-white font-semibold mb-1 text-sm">Normal (Default)</h5>
          <p className="text-xs text-slate-400 m-0">Standard detection with 70% confidence threshold.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
          <h5 className="text-white font-semibold mb-1 text-sm">High</h5>
          <p className="text-xs text-slate-400 m-0">More aggressive detection with 50% confidence threshold.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg">
          <h5 className="text-white font-semibold mb-1 text-sm">Paranoid</h5>
          <p className="text-xs text-slate-400 m-0">Maximum security with 30% confidence threshold.</p>
        </div>
      </div>

      <Callout type="danger" title="Mutual Exclusivity">
        You cannot enable both <code>browserOnly</code> and <code>terminalOnly</code> simultaneously. This will throw a configuration error during server initialization.
      </Callout>

      <SectionHeading level={2}>Performance & Metrics</SectionHeading>
      <div className="flex gap-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
        <Activity className="w-6 h-6 text-blue-400 shrink-0" />
        <div className="text-sm text-slate-400">
          <p className="font-semibold text-white mb-1">Low Latency Detection</p>
          Access control detection runs in O(1) time with less than 1MB additional memory and typically adds less than 5ms of processing time per request.
        </div>
      </div>

      <DocsFooter 
        title="Content Security Policy"
        description="Learn how to implement a robust CSP to prevent XSS and data injection attacks."
        buttonText="Next: CSP Guide"
        href="/docs/security/csp"
        iconName="Shield"
      />
    </div>
  );
}
