import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import {
  ShieldCheck,
  Key,
  Cookie,
  AlertTriangle,
  Lock,
  Globe,
} from "lucide-react";

export default function CSRFPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Security
        </div>
        <SectionHeading level={1}>CSRF Protection</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Built-in Cross-Site Request Forgery protection using the Double-Submit
          Cookie pattern, integrated directly into the security middleware
          pipeline.
        </p>
      </div>

      <Callout type="info" title="How It Works">
        CSRF protection is based on the <strong>Double-Submit Cookie</strong>{" "}
        strategy. On the first request, the server generates a cryptographically
        signed CSRF token and sets it as a cookie (
        <code className="text-primary">__Host-csrf-token</code> by default). For
        every state-mutating request (<code className="text-primary">POST</code>
        , <code className="text-primary">PUT</code>,{" "}
        <code className="text-primary">PATCH</code>,{" "}
        <code className="text-primary">DELETE</code>), the client must include
        the token in one of the following locations:
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-2">
            <Key size={14} className="text-primary" /> Header (Recommended)
          </h4>
          <p className="text-[10px] text-muted-foreground">
            <code className="text-primary">x-csrf-token</code> HTTP header for
            SPAs and API clients.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-2">
            <Cookie size={14} className="text-primary" /> Body Field
          </h4>
          <p className="text-[10px] text-muted-foreground">
            <code className="text-primary">_csrf</code> field in the request
            body.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-1 flex items-center gap-2">
            <Globe size={14} className="text-primary" /> Query Param
          </h4>
          <p className="text-[10px] text-muted-foreground">
            <code className="text-primary">_csrf</code> query parameter (less
            recommended).
          </p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        <code className="text-primary">GET</code>,{" "}
        <code className="text-primary">HEAD</code>, and{" "}
        <code className="text-primary">OPTIONS</code> requests are ignored by
        default, as they are considered safe methods.
      </p>

      <SectionHeading level={2} id="configuration">
        Configuration
      </SectionHeading>

      <SectionHeading level={3}>Basic Setup</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    security: {
        csrf: {
            secret: __sys__.__env__.get("CSRF_SECRET"),
        }
    }
});`}
      />

      <SectionHeading level={3}>
        Using XyPriss Environment Shield (`__sys__`)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        The recommended approach is to use the built-in environment shield to
        securely load the secret:
      </p>
      <CodeBlock
        language="typescript"
        code={`import { createServer, __sys__ } from "xypriss";

const app = createServer({
    security: {
        csrf: {
            secret: __sys__.__env__.get("CSRF_SECRET", "fallback-dev-secret"),
            cookieOptions: {
                httpOnly: true,
                sameSite: "strict",
            }
        }
    }
});`}
      />

      <SectionHeading level={3}>Disabling CSRF Protection</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`const app = createServer({
    security: {
        csrf: false,
    }
});`}
      />

      <SectionHeading level={2} id="reference">
        Configuration Reference
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        CSRF protection is configured under{" "}
        <code className="text-primary">security.csrf</code>.
      </p>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Default</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              {
                p: "secret",
                t: "string",
                d: "Required. Secret key used to sign and verify CSRF tokens.",
                def: "—",
              },
              {
                p: "enabled",
                t: "boolean",
                d: "Toggle CSRF protection.",
                def: "true",
              },
              {
                p: "cookieName",
                t: "string",
                d: "Name of the CSRF cookie set on the client.",
                def: '"__Host-csrf-token"',
              },
              {
                p: "cookieOptions.httpOnly",
                t: "boolean",
                d: "Prevents client-side JavaScript from accessing the cookie.",
                def: "true",
              },
              {
                p: "cookieOptions.sameSite",
                t: '"strict" | "lax" | "none" | boolean',
                d: "Controls cookie cross-site behavior.",
                def: '"strict"',
              },
              {
                p: "cookieOptions.secure",
                t: "boolean",
                d: "Restricts the cookie to HTTPS. Automatically set based on environment.",
                def: "true in production",
              },
            ].map((opt, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-primary text-xs">
                  {opt.p}
                </td>
                <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">
                  {opt.t}
                </td>
                <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">
                  {opt.def}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">
                  {opt.d}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="server-side">
        Reading the Token (Server-Side)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        The CSRF token is attached to the request object and can be read
        directly from <code className="text-primary">req.csrfToken()</code>. Use
        this to send the token to the client (e.g., in an HTML form or as part
        of an initial API response).
      </p>
      <CodeBlock
        language="typescript"
        code={`app.get("/csrf-token", (req, res) => {
    const token = req.csrfToken?.();
    res.json({ csrfToken: token });
});`}
      />

      <SectionHeading level={2} id="client-side">
        Client-Side Integration
      </SectionHeading>

      <SectionHeading level={3}>HTML Forms</SectionHeading>
      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
        Embed the token in a hidden field:
      </p>
      <CodeBlock
        language="html"
        code={`<form method="POST" action="/api/submit">
    <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
    <!-- form fields -->
    <button type="submit">Submit</button>
</form>`}
      />

      <SectionHeading level={3}>Fetch / Axios (SPA)</SectionHeading>
      <Steps>
        <Step title="Fetch the token">
          <p>Get the token from the server first:</p>
          <CodeBlock
            language="typescript"
            code={`const { csrfToken } = await fetch("/csrf-token").then(r => r.json());`}
          />
        </Step>
        <Step title="Include in subsequent requests">
          <p>
            Include it in mutating requests via the{" "}
            <code className="text-primary">x-csrf-token</code> header:
          </p>
          <CodeBlock
            language="typescript"
            code={`await fetch("/api/data", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
    },
    body: JSON.stringify({ name: "example" }),
});`}
          />
        </Step>
      </Steps>

      <SectionHeading level={2} id="pipeline">
        Pipeline Position
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        CSRF middleware runs <strong>last</strong> in the security pipeline,
        after body parsing and all other protections. This is intentional, as
        CSRF validation requires the request body and session data to be fully
        available.
      </p>

      <Callout type="warning" title="Error Behavior">
        If the CSRF token is missing or invalid, the middleware returns{" "}
        <code className="text-primary">403 Forbidden</code>. No further request
        processing occurs.
      </Callout>

      <DocsFooter
        title="Malicious URL Scanner"
        description="Protect your application at the URL level with the StruLink-powered scanner."
        buttonText="URL Scanner"
        href="/docs/security/malicious-url-scanner"
        iconName="Globe"
      />
    </div>
  );
}
