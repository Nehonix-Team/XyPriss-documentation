import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Download, Zap, ShieldCheck, Database, Layers, Globe } from "lucide-react";

export default function SendFilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>Native File Streaming (sendFile)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Enterprise-standard utility for serving physical assets using XHSC Zero-Copy architecture.
        </p>
      </div>

      <Callout type="info" title="Zero-Copy Architecture">
        Unlike conventional frameworks that buffer file content into the V8 heap, XyPriss streams data directly from the filesystem to the network socket, ensuring minimal memory footprint even for multi-gigabyte files.
      </Callout>

      <div className="space-y-12 my-6">
        <div>
          <SectionHeading level={2} id="capabilities">Core Capabilities</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group">
              <ShieldCheck className="text-primary mb-3" size={24} />
              <h4 className="font-bold text-white mb-2">Native Resolution</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Rigorously validated via <code className="text-primary">__sys__.fs</code>, protecting against directory traversal attacks.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group">
              <Layers className="text-primary mb-3" size={24} />
              <h4 className="font-bold text-white mb-2">MIME Intelligence</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automatic header calculation based on internal <code className="text-primary">MIME_MAP</code> for all major asset classes.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group">
              <Zap className="text-primary mb-3" size={24} />
              <h4 className="font-bold text-white mb-2">Ranged Delivery</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Native support for HTTP <code className="text-primary">Range</code> headers, essential for video seek operations.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 group">
              <Database className="text-primary mb-3" size={24} />
              <h4 className="font-bold text-white mb-2">Memory Stability</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Stable process RSS as data flows through a dedicated native IPC bridge.
              </p>
            </div>
          </div>
        </div>

        <div>
          <SectionHeading level={2} id="usage">Implementation Examples</SectionHeading>
          <div className="space-y-8">
            <div>
              <h4 className="text-md font-bold text-white mb-2">Standard Asset Delivery</h4>
              <CodeBlock 
                language="typescript"
                code={`app.get("/reports/:id", (req, res) => {
    const reportPath = __sys__.path.resolve("./storage/reports/annual.pdf");
    res.sendFile(reportPath); // Content-Type: application/pdf
});`}
              />
            </div>

            <div>
              <h4 className="text-md font-bold text-white mb-2">Advanced Download Logic</h4>
              <CodeBlock 
                language="typescript"
                code={`res.sendFile("report.pdf", {
    root: "./storage/vault",
    disposition: "attachment",
    headers: { "X-Custom-Header": "Value" },
    maxAge: 3600000 // 1 hour cache
});`}
              />
            </div>
          </div>
        </div>

        <div>
          <SectionHeading level={2} id="options">Configuration Options</SectionHeading>
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 mt-4">
            <table className="w-full text-xs text-left">
              <thead className="bg-white/10 uppercase font-bold text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Property</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { p: "root", d: "Base directory for relative path resolution." },
                  { p: "maxAge", d: "Cache-Control max-age in milliseconds." },
                  { p: "headers", d: "Custom HTTP headers to serve with the file." },
                  { p: "disposition", d: "Sets Content-Disposition (inline, attachment)." },
                  { p: "mimeOverrides", d: "Map of extensions to custom MIME types." },
                ].map((opt, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3 font-mono text-primary">{opt.p}</td>
                    <td className="px-4 py-3 text-muted-foreground">{opt.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <DocsFooter 
        title="Quick Start"
        description="Ready to build? Get up and running with XyPriss in minutes."
        buttonText="Get Started"
        href="/docs/quick-start"
        iconName="Rocket"
      />
    </div>
  );
}
