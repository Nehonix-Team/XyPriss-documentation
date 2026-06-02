import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Shield, AlertTriangle, Eye, Lock } from "lucide-react";

export default function MaliciousUrlScannerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Shield size={14} />
          Security
        </div>
        <SectionHeading level={1}>Malicious URL Scanner</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Web Application Firewall at the URL level, powered by the{" "}
          <strong>StruLink</strong> analysis engine. Scans all incoming requests
          to detect malicious patterns before they reach your controllers or
          routers.
        </p>
      </div>

      <Callout type="info" title="What It Protects Against">
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>Cross-Site Scripting (XSS) via the URL</li>
          <li>Path Traversal (`../..`)</li>
          <li>SQL and NoSQL injections in query parameters</li>
          <li>Command Injections</li>
          <li>Template Injections (SSTI)</li>
        </ul>
      </Callout>

      <SectionHeading level={2} id="quick-setup">Quick Setup</SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Enable the scanner with default settings (actively block malicious URLs):
      </p>
      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        maliciousUrlScanner: true,
    }
});`}
      />

      <SectionHeading level={2} id="disabling">Disabling the Scanner</SectionHeading>
      <p className="text-xs text-muted-foreground mb-3">
        Not recommended in production, but possible for development or internal
        networks:
      </p>
      <CodeBlock
        language="typescript"
        code={`const app = createServer({
    security: {
        maliciousUrlScanner: false,
    }
});`}
      />
      <p className="text-xs text-muted-foreground mt-2">
        Or explicitly via the configuration object:
      </p>
      <CodeBlock
        language="typescript"
        code={`const app = createServer({
    security: {
        maliciousUrlScanner: {
            enabled: false
        }
    }
});`}
      />

      <SectionHeading level={2} id="modes">Operating Modes</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <Lock size={16} className="text-primary" /> block (Default)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Immediately blocks the request if a malicious pattern is detected.
            Returns <code className="text-primary">403 Forbidden</code> with
            internal error code <code className="text-primary">EMALICIOUSURL</code>.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
            <Eye size={16} className="text-primary" /> log
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Allows the request to pass but generates a security alert via the
            XyPriss logger (<code className="text-primary">logger.warn</code>).
            Ideal for an audit period to identify potential false positives before
            switching to blocking mode.
          </p>
        </div>
      </div>
      <CodeBlock
        language="typescript"
        code={`const app = createServer({
    security: {
        maliciousUrlScanner: {
            enabled: true,
            mode: "log", // observation mode
        }
    }
});`}
      />

      <SectionHeading level={2} id="advanced">Advanced StruLink Configuration</SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Fine-tune the analysis behavior by passing <code className="text-primary">options</code> directly to the StruLink engine:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { MaliciousPatternType } from "strulink";

const app = createServer({
    security: {
        maliciousUrlScanner: {
            enabled: true,
            mode: "block",
            options: {
                minScore: 40,
                sensitivity: 1.0,
                enabledPatternTypes: [
                    MaliciousPatternType.XSS,
                    MaliciousPatternType.PATH_TRAVERSAL,
                    MaliciousPatternType.COMMAND_INJECTION,
                    MaliciousPatternType.SQL_INJECTION
                ],
                advanced: {
                    maxEncodingLayers: 3,
                    entropyThreshold: 4.8
                }
            }
        }
    }
});`}
      />

      <SectionHeading level={2} id="defaults">Engine Defaults</SectionHeading>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        If no specific options are provided, the scanner applies the following strict settings:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
        {[
          { k: "minScore", v: "40" },
          { k: "sensitivity", v: "1.0" },
          { k: "advanced.maxEncodingLayers", v: "3" },
          { k: "advanced.entropyThreshold", v: "4.8" },
        ].map((item, i) => (
          <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-mono text-primary uppercase tracking-widest">{item.k}</span>
            <span className="text-[10px] text-muted-foreground font-mono">{item.v}</span>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="behavior">Error Behavior (Fail-Open)</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        If the StruLink engine encounters an unexpected error while processing a URL,
        the scanner adopts a <strong>Fail-Open</strong> behavior. The error is logged
        (<code className="text-primary">logger.error</code>), but the request is allowed
        to continue. This prevents a parsing error from bringing down the entire application.
      </p>

      <Callout type="warning" title="Production Recommendation">
        Keep <code className="text-primary">mode: "block"</code> in production.
        Use <code className="text-primary">mode: "log"</code> only during audit
        periods to tune <code className="text-primary">minScore</code> and{" "}
        <code className="text-primary">sensitivity</code> without disrupting
        traffic.
      </Callout>

      <DocsFooter
        title="CORS Policy"
        description="Control cross-origin access with pattern matching, wildcard, and regex origin support."
        buttonText="Read CORS Docs"
        href="/docs/security/cors"
        iconName="Globe"
      />
    </div>
  );
}
