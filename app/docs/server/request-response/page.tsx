import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Globe, ArrowRightLeft, FileCode, ExternalLink, FastForward } from "lucide-react";

export default function RequestResponsePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>Request & Response</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Enhanced methods for handling HTTP interactions, redirections, and server-side forwarding.
        </p>
      </div>

      <div className="space-y-12 my-6">
        {/* res.html */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <FileCode size={18} className="text-primary" />
            res.html(htmlString)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            A convenience method for sending HTML responses. It automatically sets the <code className="text-primary">Content-Type</code> to <code className="text-primary">text/html; charset=utf-8</code>.
          </p>
          <CodeBlock 
            language="typescript"
            code={`app.get("/welcome", (req, res) => {
    res.html("<h1>Welcome to XyPriss</h1>");
});`}
          />
        </div>

        {/* app.redirect / req.redirect */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <ExternalLink size={18} className="text-primary" />
            Redirections
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            XyPriss supports both route-level and request-level redirections for maximum flexibility.
          </p>
          <div className="space-y-6">
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Route-Level (app.redirect)</div>
              <CodeBlock 
                language="typescript"
                code={`// Permanent redirect (301)
app.redirect("/old-path", "/new-path");

// Temporary redirect (302)
app.redirect("/promo", "https://external.com", 302);`}
              />
            </div>
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Request-Level (req.redirect)</div>
              <CodeBlock 
                language="typescript"
                code={`app.get("/secure", (req, res) => {
    if (!req.session.user) return req.redirect("/login");
    // ... logic
});`}
              />
            </div>
          </div>
        </div>

        {/* req.forward */}
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <ArrowRightLeft size={18} className="text-primary" />
            Server-Side Forwarding
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Asynchronously forwards the current request to another endpoint (internal or external). 
            It inherits the same method, body, and headers by default.
          </p>
          <CodeBlock 
            language="typescript"
            code={`app.post("/submit", async (req, res) => {
    // Delegate validation to an internal service
    const validation = await req.forward("/internal/validate");

    if (!validation.valid) return res.status(400).json(validation);
    res.success({ message: "Data accepted" });
});`}
          />
          <ul className="mt-4 space-y-2 text-xs text-muted-foreground list-disc pl-4">
            <li><strong>Internal Resolution</strong>: Automatically resolves relative paths to the current server's port.</li>
            <li><strong>Auto-Parsing</strong>: Automatically parses JSON responses from the forwarded target.</li>
          </ul>
        </div>
      </div>

      <DocsFooter 
        title="XJSON API"
        description="Learn about the advanced JSON serialization engine for complex data."
        buttonText="View API"
        href="/docs/features/xjson"
        iconName="Braces"
      />
    </div>
  );
}
