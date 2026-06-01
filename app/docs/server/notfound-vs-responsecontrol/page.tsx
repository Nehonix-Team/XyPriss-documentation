import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Layers, Globe, ShieldAlert } from "lucide-react";

export default function NotFoundVsResponseControlPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>
          NotFound vs Response Control
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Two mechanisms for handling requests that don&apos;t match any
          registered route: <strong>visual presentation</strong> vs{" "}
          <strong>functional control</strong>.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Feature</th>
              <th className="px-4 py-3 text-primary">notFound (Visual)</th>
              <th className="px-4 py-3">responseControl (Functional)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Primary Goal</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">Render a branded 404 page for humans.</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">Control HTTP behaviour (JSON, status, logic).</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Default Status</td>
              <td className="px-4 py-3 text-xs font-mono text-primary">404 Not Found</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">Customizable (403, 410, 500, etc.)</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Content Type</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">text/html (Fixed)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">application/json, text/plain, etc.</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Mode Support</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">XS-M (Global)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">XS-M &amp; XM-M (Per Instance)</td>
            </tr>
            <tr className="hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white">Priority</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">Low (Last Resort)</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">High (Hijacks the response)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="info" title="Priority Rule">
        If both systems are enabled, <strong>responseControl takes precedence</strong>. XyPriss first checks if a custom response is defined. If it handles the request, the process stops. Otherwise, it falls back to notFound.
      </Callout>

      <SectionHeading level={2} id="notfound">notFound: Visual Template</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The <code>notFound</code> configuration is designed for web applications
        that need a branded error page. It uses a built-in template engine to
        inject titles, messages, and themes.
      </p>
      <CodeBlock
        language="typescript"
        code={`notFound: {
  enabled: true,
  title: "Oops! Lost in space",
  themeClass: "dark",
  redirectTo: "/home"
}`}
      />
      <p className="text-xs text-muted-foreground mt-2">
        <strong>Use this when:</strong> you want a themed 404 page, a &quot;Go
        back home&quot; button with countdown, or custom CSS injection into the
        error page.
      </p>

      <SectionHeading level={2} id="response-control">
        responseControl: Behavioural Control
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The <code>responseControl</code> system is a powerful, low-level
        interceptor. It is designed for APIs or security-conscious applications
        that need to control the actual HTTP response payload and status.
      </p>
      <CodeBlock
        language="typescript"
        code={`responseControl: {
  enabled: true,
  statusCode: 403,
  content: { status: "denied", message: "Unauthorized path access" },
  contentType: "application/json"
}`}
      />
      <p className="text-xs text-muted-foreground mt-2">
        <strong>Use this when:</strong> you are building a JSON API, want to
        return 403 for unknown routes (security by obscurity), or need to
        execute a server-side function (log the event, block an IP).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Layers className="text-primary mb-3" size={24} />
          <h4 className="font-bold text-white text-sm mb-2">
            Dynamic vs Static
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <code>notFound</code> is largely static (configured at startup).{" "}
            <code>responseControl</code> is dynamic — use{" "}
            <code>app.setResponseControl()</code> to hot-swap error handling
            logic in real-time (e.g. trigger maintenance mode or security
            lockdown).
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <ShieldAlert className="text-primary mb-3" size={24} />
          <h4 className="font-bold text-white text-sm mb-2">
            XM-M (Multi-Server) Usage
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            In Multi-Server mode, each instance should use{" "}
            <code>responseControl</code> for isolation, while{" "}
            <code>notFound</code> typically serves as the global system fallback.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="live-update">
        Dynamic Hot-Swapping
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        You can update <code>responseControl</code> at runtime without
        restarting the server:
      </p>
      <CodeBlock
        language="typescript"
        code={`// Emergency maintenance switch
app.setResponseControl({
  enabled: true,
  statusCode: 503,
  content: "System is undergoing scheduled updates."
});`}
      />

      <DocsFooter
        title="Multi-Server Setup"
        description="Configure per-instance response control and route isolation with XMS."
        buttonText="Multi-Server Docs"
        href="/docs/config/multi-server"
        iconName="Layers"
      />
    </div>
  );
}
