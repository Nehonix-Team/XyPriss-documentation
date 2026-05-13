import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Search, List, Activity, Terminal, ExternalLink } from "lucide-react";

export default function RoutingInspectionPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Router Inspection</SectionHeading>

      <p>
        Router V2 exposes a built-in inspection API that allows you to 
        programmatically read the entire routing state at runtime. This is 
        critical for building documentation generators, health dashboards, 
        and debugging tools.
      </p>

      <SectionHeading level={2}>Registry Export</SectionHeading>
      <p>
        Use <code>router.toRegistry()</code> to get a fully serializable 
        snapshot of the routing tree.
      </p>
      <CodeBlock
        language="typescript"
        code={`const registry = router.toRegistry();
console.log(JSON.stringify(registry, null, 2));`}
      />

      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">Field</th>
              <th className="p-3 border border-white/10 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 font-mono text-blue-400">method</td>
              <td className="p-3 border border-white/10 text-slate-400">HTTP verb (GET, POST, etc.).</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 font-mono text-blue-400">path</td>
              <td className="p-3 border border-white/10 text-slate-400">The full registered path string.</td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 font-mono text-blue-400">params</td>
              <td className="p-3 border border-white/10 text-slate-400">Extracted parameters and regex constraints.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 font-mono text-blue-400">hasGuards</td>
              <td className="p-3 border border-white/10 text-slate-400">True if declarative guards are present.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Router Statistics</SectionHeading>
      <p>
        <code>router.getStats()</code> returns high-level aggregated metrics 
        about the router instance.
      </p>
      <CodeBlock
        language="typescript"
        code={`const stats = router.getStats();

console.log(\`Total routes: \${stats.totalRoutes}\`);
console.log(\`GET routes: \${stats.byMethod.GET}\`);`}
      />

      <SectionHeading level={2}>OpenAPI & Swagger Integration</SectionHeading>
      <p>
        The <code>toRegistry()</code> output is the primary data source for the 
        official <code>xypriss-swagger</code> plugin, enabling zero-config API 
        documentation.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { SwaggerPlugin } from "xypriss-swagger";

createServer({
    plugins: {
        register: [
            SwaggerPlugin({
                path: "/api-docs",
                title: "My System API",
            }),
        ],
    },
});`}
      />

      <Callout type="tip" title="Custom Metadata">
        You can add custom fields to any route via <code>meta.openapi</code>. 
        These fields will be automatically merged into the generated OpenAPI 
        specification.
      </Callout>

      <DocsFooter
        title="HTTP Methods Reference"
        description="A complete reference guide for all supported HTTP methods in XyPriss."
        buttonText="Next: Methods Reference"
        href="/docs/routing/methods"
        iconName="List"
      />
    </div>
  );
}
