import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Terminal, ShieldCheck, Zap, Lock, Search, ExternalLink, Globe, Layers } from "lucide-react";

export default function SwaggerPluginPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XyPriss Swagger Plugin</SectionHeading>

      <p>
        The <strong>XyPriss Swagger Plugin</strong> is a high-performance auto-documentation tool for the XyPriss ecosystem. It automatically generates OpenAPI 3.0 specifications by introspecting the XyPriss route registry and serves a beautiful Swagger UI through an isolated auxiliary server.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Zap className="w-5 h-5 text-yellow-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Auto-Generation</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Automatically extracts routes, methods, and parameters.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <Globe className="w-5 h-5 text-blue-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Isolated Serving</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Hosted on an auxiliary server for maximum security.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-green-400 mb-2" />
          <h5 className="text-white font-semibold mb-1 text-sm">Zero-Trust Ready</h5>
          <p className="text-[10px] text-slate-400 m-0">
            Respects all XyPriss security layers and guards.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Installation</SectionHeading>
      <p>Install the plugin via XFPM:</p>
      <CodeBlock language="bash" code="xfpm add xypriss-swagger --verify" />

      <SectionHeading level={2}>Usage</SectionHeading>
      <Steps>
        <Step title="Register the Plugin">
          <p>Import and register the <code>SwaggerPlugin</code> in your server options:</p>
          <CodeBlock 
            language="typescript" 
            code={`import { SwaggerPlugin } from "xypriss-swagger";
import { createServer } from "xypriss";

const server = createServer({
    plugins: {
        register: [
            SwaggerPlugin({
                port: 7070, // Port for the documentation server
                path: "/docs", // Path to access the Swagger UI
                title: "My API", // Documentation title
                version: "1.0.0", // API Version
            }),
        ],
    },
});

server.start();`} 
          />
        </Step>

        <Step title="Configure Plugin Access">
          <p>Ensure the plugin is authorized in your <code>xypriss.config.jsonc</code>:</p>
          <CodeBlock 
            language="jsonc" 
            code={`{
    "$internal": {
        "xypriss-swagger": {
            "__meta__": {
                "path": "ROOT://",
            },
            "__xfs__": {
                "path": "CWD://",
            },
            "permissions": {
                "allowedHooks": [
                    "XHS.HOOK.HTTP.REQUEST",
                    "XHS.PERM.SECURITY.SENSITIVE_DATA",
                    "XHS.HOOK.LIFECYCLE.REGISTER",
                    "XHS.HOOK.LIFECYCLE.SERVER_START",
                    "XHS.PERM.OPS.AUXILIARY_SERVER",
                    "XHS.PERM.SECURITY.CONFIGS",
                ],
                "policy": "allow",
            },
        },
    },
}`} 
          />
        </Step>
      </Steps>

      <SectionHeading level={2}>Configuration Options</SectionHeading>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">Option</th>
              <th className="p-3 border border-white/10 font-bold text-white">Type</th>
              <th className="p-3 border border-white/10 font-bold text-white">Default</th>
              <th className="p-3 border border-white/10 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 font-mono text-blue-400">port</td>
              <td className="p-3 border border-white/10 font-mono">number</td>
              <td className="p-3 border border-white/10 font-mono text-slate-500">7070</td>
              <td className="p-3 border border-white/10 text-slate-400">The port for the auxiliary Swagger server.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 font-mono text-blue-400">path</td>
              <td className="p-3 border border-white/10 font-mono">string</td>
              <td className="p-3 border border-white/10 font-mono text-slate-500">"/docs"</td>
              <td className="p-3 border border-white/10 text-slate-400">The base path for documentation UI.</td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 font-mono text-blue-400">title</td>
              <td className="p-3 border border-white/10 font-mono">string</td>
              <td className="p-3 border border-white/10 font-mono text-slate-500">"API Documentation"</td>
              <td className="p-3 border border-white/10 text-slate-400">Title displayed in Swagger UI.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Security & Identity</SectionHeading>
      <Callout type="warning" title="Developer Identity">
        Developer ID: <code>ed25519:a58b17a3e46302dd3ae5538bc9b8b991c57f4c5fe2e7d8ac41803de818d947f4</code>
        <br />
        This plugin is cryptographically signed. Always verify the signature during installation.
      </Callout>

      <SectionHeading level={2}>Route Metadata</SectionHeading>
      <p>Customize documentation for individual routes by adding metadata:</p>
      <CodeBlock 
        language="typescript" 
        code={`server.get(
    "/users/:id",
    (req, res) => { /* ... */ },
    {
        meta: {
            summary: "Get user by ID",
            tags: ["Users"],
            openapi: {
                responses: {
                    "200": { description: "User found" },
                },
            },
        },
    },
);`} 
      />

      <DocsFooter 
        title="Xyphra Logger"
        description="Next: High-performance logging with Xyphra."
        buttonText="Next: Xyphra Plugin"
        href="/docs/plugins/official/xyphra"
        iconName="Activity"
      />
    </div>
  );
}
