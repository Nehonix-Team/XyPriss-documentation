import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Globe, Target, Zap, Shield, HelpCircle, Activity } from "lucide-react";

export default function ResponseControlPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>Response Control (404 Hijacking)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Global mechanism to intercept and customize unhandled routes with custom logic, status codes, and content.
        </p>
      </div>

      <Callout type="info" title="Disabled by Default">
        Response Control is inactive by default. When disabled, XyPriss utilizes the standard <code className="text-primary font-bold">notFound</code> template handler.
      </Callout>

      <SectionHeading level={2} id="configuration">Configuration</SectionHeading>
      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest text-[10px]">Basic Content Hijack</h4>
          <CodeBlock 
            language="typescript"
            code={`const app = createServer({
  responseControl: {
    enabled: true,
    statusCode: 404,
    content: { error: "Resource Not Found", code: "ERR_404" },
    contentType: "application/json"
  }
});`}
          />
        </div>

        <div>
          <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-widest text-[10px]">Custom Handler Logic</h4>
          <CodeBlock 
            language="typescript"
            code={`responseControl: {
  enabled: true,
  handler: (req, res) => {
    logger.warn(\`Intrusion attempt or 404 at \${req.path}\`);
    res.status(404).render("errors/404", { path: req.path });
  }
}`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="hot-swapping">Dynamic Hot-Swapping</SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        One of the most powerful features of Response Control is the ability to update it <strong>at runtime</strong> without restarting the server.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          { t: "Maintenance Mode", d: "Instantly point all unknown routes to a maintenance page during updates.", i: Activity },
          { t: "Security Lockdown", d: "Dynamically switch 404s to 403s or honeypots if an attack is detected.", i: Shield },
        ].map((item, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
              <item.i size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1 text-sm">{item.t}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.d}</p>
            </div>
          </div>
        ))}
      </div>

      <CodeBlock 
        language="typescript"
        code={`// Example: Emergency maintenance switch
app.setResponseControl({
  enabled: true,
  statusCode: 503,
  content: "System is undergoing scheduled updates."
});`}
      />

      <DocsFooter 
        title="Project Configuration"
        description="Master the xypriss.config.jsonc structure and dynamic variable injection."
        buttonText="Config Guide"
        href="/docs/config/guide"
        iconName="Settings"
      />
    </div>
  );
}
