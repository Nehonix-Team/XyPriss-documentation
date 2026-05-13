import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { GitBranch, ShieldCheck, Zap, AlertTriangle, Terminal, Layers, Lock, Route } from "lucide-react";

export default function RouteSecurityPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Route-Based Security</SectionHeading>
      
      <p>XyPriss supports fine-grained <strong>route-based security configuration</strong>, allowing developers to selectively apply security modules to specific routes. This prevents false positives on legitimate data while maintaining a strong defensive posture.</p>

      <SectionHeading level={2}>Core Configuration</SectionHeading>
      <p>Use the <code>routeConfig</code> option to define <code>includeRoutes</code> (whitelist) or <code>excludeRoutes</code> (blacklist) for individual security modules.</p>

      <CodeBlock language="typescript" code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        enabled: true,
        pathTraversal: true,
        sqlInjection: true,
        
        // Route-based configuration
        routeConfig: {
            pathTraversal: {
                // Exclude template routes from path traversal detection
                excludeRoutes: [
                    "/api/templates/*",
                    "/api/content/*"
                ]
            },
            sqlInjection: {
                // Only apply SQL injection detection to database routes
                includeRoutes: [
                    "/api/db/*",
                    "/api/query/*"
                ]
            }
        }
    }
});`} />

      <SectionHeading level={2}>Route Pattern Formats</SectionHeading>
      <p>XyPriss supports three flexible formats for specifying routes:</p>
      
      <div className="space-y-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm flex items-center gap-2"><Terminal className="w-4 h-4" /> Wildcards</h5>
          <p className="text-[10px] text-slate-400 mb-2">Use <code>*</code> to match sub-paths or exact strings for specific endpoints.</p>
          <CodeBlock language="typescript" code={`excludeRoutes: ["/api/templates/*", "/exact/path"]`} />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm flex items-center gap-2"><Zap className="w-4 h-4" /> Regular Expressions</h5>
          <p className="text-[10px] text-slate-400 mb-2">Use standard JS regex for complex matching logic.</p>
          <CodeBlock language="typescript" code={`excludeRoutes: [/^\/api\/templates\/.+$/]`} />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm flex items-center gap-2"><Route className="w-4 h-4" /> RoutePattern Objects</h5>
          <p className="text-[10px] text-slate-400 mb-2">Filter exclusions by specific HTTP methods.</p>
          <CodeBlock language="typescript" code={`excludeRoutes: [{ path: "/api/templates/*", methods: ["POST", "PUT"] }]`} />
        </div>
      </div>

      <SectionHeading level={2}>Available Modules</SectionHeading>
      <p>The following modules can be configured with route-specific rules:</p>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-none p-0 my-6">
        {["xss", "sqlInjection", "pathTraversal", "commandInjection", "xxe", "ldapInjection"].map(mod => (
          <li key={mod} className="text-[10px] text-slate-300 bg-white/[0.02] p-2 rounded border border-white/5 font-mono text-center">
            {mod}
          </li>
        ))}
      </ul>

      <SectionHeading level={2}>Priority & Logic</SectionHeading>
      <div className="space-y-3 my-6">
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold shrink-0 mt-1">01</div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Whitelist Priority</p>
            <p className="text-xs text-muted-foreground">If both <code>includeRoutes</code> and <code>excludeRoutes</code> are specified, the whitelist takes priority.</p>
          </div>
        </div>
        <div className="flex gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-bold shrink-0 mt-1">02</div>
          <div>
            <p className="text-sm font-bold text-white mb-1">Early Blocking</p>
            <p className="text-xs text-muted-foreground">Route matching is performed early in the request lifecycle using optimized regex patterns.</p>
          </div>
        </div>
      </div>

      <Callout type="tip">
        <strong>Best Practice:</strong> Use <code>includeRoutes</code> for highly sensitive modules like SQL injection to ensure it only runs on routes interacting with databases.
      </Callout>

      <DocsFooter 
        title="Trust Proxy"
        description="Configure trusted proxy headers for load balancers and container environments."
        buttonText="Next: Trust Proxy"
        href="/docs/security/trust-proxy"
        iconName="Layers"
      />
    </div>
  );
}
