import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Globe, Shield, Search, Info } from "lucide-react";

export default function GetIpPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>Client IP Resolution</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Highly robust API designed to identify the real client IP address across proxies, load balancers, and VPNs.
        </p>
      </div>

      <div className="space-y-12 my-6">
        <div>
          <SectionHeading level={2} id="resolution-order">Resolution Order</SectionHeading>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            To ensure maximum accuracy, <code className="text-primary font-bold">getIp</code> checks headers in a specific order of trustworthiness, supporting Cloudflare, Akamai, Nginx, and more.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "CF-Connecting-IP (Cloudflare)",
              "True-Client-IP (Akamai)",
              "X-Real-IP (Nginx)",
              "X-Forwarded-For (Standard)",
              "Forwarded (RFC 7239)",
              "Socket Remote Address",
            ].map((header, i) => (
              <div key={i} className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-muted-foreground flex items-center gap-2">
                <span className="text-primary opacity-50">{i + 1}.</span> {header}
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeading level={2} id="usage">Usage Examples</SectionHeading>
          <div className="space-y-8">
            <div>
              <h4 className="text-md font-bold text-white mb-2 flex items-center gap-2">
                <Globe size={18} className="text-primary" />
                Basic Resolution
              </h4>
              <CodeBlock 
                language="typescript"
                code={`import { getIp } from "xypriss";

app.get("/api/whoami", (req, res) => {
    const ip = getIp(req);
    res.json({ yourIp: ip });
});`}
              />
            </div>

            <div>
              <h4 className="text-md font-bold text-white mb-2 flex items-center gap-2">
                <Search size={18} className="text-primary" />
                Enriched Metadata
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Retrieve the resolved IP along with the source header that provided it.
              </p>
              <CodeBlock 
                language="typescript"
                code={`app.get("/api/debug-ip", (req, res) => {
    const { ip, source } = getIp(req, true);
    res.json({ ip, source });
});`}
              />
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            <Shield size={16} className="text-primary" />
            Security Protections
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary">1</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-white">Public IP Filtering</strong>: Prioritizes public ranges over private (RFC 1918) to prevent header spoofing.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold text-primary">2</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong className="text-white">Normalization</strong>: Automatically strips port numbers and sanitizes IPv6-mapped IPv4 prefixes.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <DocsFooter 
        title="File Streaming"
        description="Learn about zero-copy native asset delivery via XHSC."
        buttonText="View API"
        href="/docs/server/send-file"
        iconName="Download"
      />
    </div>
  );
}
