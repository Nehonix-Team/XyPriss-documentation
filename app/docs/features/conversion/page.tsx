import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  ArrowRightLeft,
  Cpu,
  Zap,
  ShieldCheck,
  FileCode,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function ConversionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ArrowRightLeft size={14} />
          HTTP Server &amp; Native Transcoding
        </div>
        <SectionHeading level={1}>
          Automatic XML ↔ JSON Conversion
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          High-performance, bi-directional streaming transcoder built directly
          into the native <strong>XHSC</strong> networking stack—automatically
          converting incoming XML payloads to JSON (<code>xml2json</code>) and
          mirroring JSON responses back to XML (<code>json2xml</code>).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Cpu size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">
              Go-Native Transcoding
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              XML parsing and serialization run inside the XHSC Go core before
              the payload reaches Node.js or Bun, keeping the JS event loop
              unblocked.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <ArrowRightLeft size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">
              Bi-Directional Mirroring (<code>autoReply</code>)
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Write standard JSON handlers in TypeScript. If the client sent
              XML, XHSC automatically transcodes your JSON response back to{" "}
              <code>application/xml</code>.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">
              Virtual Body Proxy
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <code>ConversionProxyMiddleware</code> wraps <code>req.body</code>{" "}
              so XML attributes (e.g. <code>@id</code>) and{" "}
              <code>#text</code> nodes are accessed naturally as standard
              properties.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Content Sniffing</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Detects XML payloads starting with <code>&lt;</code> even when
              clients omit <code>Content-Type</code> or send generic{" "}
              <code>text/plain</code> headers.
            </p>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="configuration">
        Server Configuration
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Enable native conversion in <code>createServer</code> via the{" "}
        <code className="text-primary font-mono">conversion</code> option:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { createServer } from "xypriss";

const app = createServer({
    server: { port: 3000 },
    conversion: {
        enabled: true,
        xmlToJson: true,          // Convert incoming XML -> JSON (req.body)
        autoReply: true,          // Convert outgoing JSON -> XML for XML callers
        attributePrefix: "@",     // Prefix for XML attributes in JSON
        textContentKey: "#text",  // Key for mixed text + attribute nodes
        maxConversionSize: "10mb",
        strictParsing: true,      // Return 400 Bad Request on malformed XML
        contentSniffing: true,    // Auto-detect '<' payloads without XML header
    },
});

app.post("/api/orders", (req, res) => {
    // Even if the client sent application/xml, req.body is already JSON!
    const { order } = req.body;

    // Reply with standard JSON; XHSC converts it to XML if autoReply is true
    res.json({
        status: "accepted",
        orderId: order.id,
    });
});

app.start();`}
      />

      <SectionHeading level={2} id="how-it-works">
        How Bi-Directional Transcoding Works
      </SectionHeading>

      <div className="space-y-4 my-2">
        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-2">
            1. Incoming Request (<code>xml2json</code>)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            When a non-<code>GET</code> request arrives with{" "}
            <code>Content-Type: application/xml</code> or{" "}
            <code>text/xml</code> (or starts with <code>&lt;</code> when{" "}
            <code>contentSniffing</code> is enabled):
          </p>
          <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
            <li>
              XHSC parses the XML body natively and converts it into JSON.
            </li>
            <li>
              Sets <code>X-XHSC-Origin-Format: xml</code> and{" "}
              <code>X-XHSC-Origin-Content-Type</code> headers so downstream
              middleware knows the original format.
            </li>
            <li>
              Replaces the request <code>Content-Type</code> with{" "}
              <code>application/json</code> so your route handler receives a
              parsed <code>req.body</code> object.
            </li>
          </ul>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
          <h4 className="font-bold text-white text-sm mb-2">
            2. Outgoing Response (<code>json2xml</code>)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            When <code>autoReply: true</code> is enabled:
          </p>
          <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
            <li>
              XHSC checks if <code>X-XHSC-Origin-Format</code> is{" "}
              <code>xml</code> and the handler response{" "}
              <code>Content-Type</code> is <code>application/json</code>.
            </li>
            <li>
              Unless the client explicitly sent{" "}
              <code>Accept: application/json</code>, XHSC transcodes the JSON
              response body into XML and sets{" "}
              <code>Content-Type: application/xml</code>.
            </li>
          </ul>
        </div>
      </div>

      <Callout type="info" title="Accept Header Negotiation">
        If an XML client explicitly sets{" "}
        <code className="text-primary font-mono">Accept: application/json</code>
        , XHSC respects the client&apos;s preference and skips{" "}
        <code>json2xml</code> response transcoding, returning JSON directly.
      </Callout>

      <SectionHeading level={2} id="virtual-body-proxy">
        Virtual Body Proxy (Attributes &amp; Text Unwrapping)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        When XHSC converts XML attributes and text nodes to JSON using{" "}
        <code>attributePrefix</code> (default <code>&quot;@&quot;</code>) and{" "}
        <code>textContentKey</code> (default <code>&quot;#text&quot;</code>),
        XyPriss&apos;s <code>ConversionProxyMiddleware</code> wraps{" "}
        <code>req.body</code> in a recursive Proxy so you can access properties
        cleanly without bracket notation:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <CodeBlock
          language="xml"
          title="Incoming XML Payload"
          code={`<order id="ORD-9042" currency="USD">
  <customer>Jane Doe</customer>
  <total>149.99</total>
</order>`}
        />
        <CodeBlock
          language="typescript"
          title="TypeScript Handler Access"
          code={`app.post("/api/orders", (req, res) => {
    const { order } = req.body;

    // Attribute '@id' is accessible directly as 'order.id'
    console.log(order.id);       // "ORD-9042"
    console.log(order["@id"]);   // "ORD-9042" (also works)
    console.log(order.currency); // "USD"

    // Text-only nodes unwrap automatically
    console.log(order.customer); // "Jane Doe"
    console.log(order.total);    // "149.99"

    res.json({ received: order.id });
});`}
        />
      </div>

      <SectionHeading level={2} id="options-reference">
        Configuration Options Reference
      </SectionHeading>

      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse border border-white/10 text-xs">
          <thead>
            <tr className="bg-white/[0.05] border-b border-white/10">
              <th className="p-3 font-bold text-white">Option</th>
              <th className="p-3 font-bold text-white">Type</th>
              <th className="p-3 font-bold text-white">Default</th>
              <th className="p-3 font-bold text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="p-3 font-mono text-primary font-bold">enabled</td>
              <td className="p-3 font-mono text-slate-300">boolean</td>
              <td className="p-3 font-mono text-slate-400">false</td>
              <td className="p-3 text-slate-400">
                Enables the native XHSC data conversion pipeline.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">
                xmlToJson
              </td>
              <td className="p-3 font-mono text-slate-300">boolean</td>
              <td className="p-3 font-mono text-slate-400">false</td>
              <td className="p-3 text-slate-400">
                Automatically converts incoming XML payloads to JSON on{" "}
                <code>req.body</code>.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">
                autoReply
              </td>
              <td className="p-3 font-mono text-slate-300">boolean</td>
              <td className="p-3 font-mono text-slate-400">false</td>
              <td className="p-3 text-slate-400">
                Automatically converts outgoing JSON responses back to XML when
                the request originated as XML.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">
                attributePrefix
              </td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 font-mono text-slate-400">&quot;@&quot;</td>
              <td className="p-3 text-slate-400">
                Prefix used for XML attributes when converted to JSON keys.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">
                textContentKey
              </td>
              <td className="p-3 font-mono text-slate-300">string</td>
              <td className="p-3 font-mono text-slate-400">
                &quot;#text&quot;
              </td>
              <td className="p-3 text-slate-400">
                Key name for XML text content when a node contains both
                attributes and text.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">
                maxConversionSize
              </td>
              <td className="p-3 font-mono text-slate-300">number | string</td>
              <td className="p-3 font-mono text-slate-400">—</td>
              <td className="p-3 text-slate-400">
                Maximum payload size allowed for conversion (bytes or string,
                e.g. <code>&quot;10mb&quot;</code>).
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono text-primary font-bold">
                strictParsing
              </td>
              <td className="p-3 font-mono text-slate-300">boolean</td>
              <td className="p-3 font-mono text-slate-400">false</td>
              <td className="p-3 text-slate-400">
                If <code>true</code>, malformed XML returns{" "}
                <code>400 Bad Request</code>. If <code>false</code>, the
                original body is forwarded with{" "}
                <code>X-XHSC-Conversion-Error</code>.
              </td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 font-mono text-primary font-bold">
                contentSniffing
              </td>
              <td className="p-3 font-mono text-slate-300">boolean</td>
              <td className="p-3 font-mono text-slate-400">false</td>
              <td className="p-3 text-slate-400">
                Peeks the first byte of missing or generic{" "}
                <code>Content-Type</code> payloads; if it starts with{" "}
                <code>&lt;</code>, treats it as <code>application/xml</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsFooter
        title="XJSON API"
        description="Explore XyPriss's high-performance BigInt-safe, streaming JSON serializer."
        buttonText="Next: XJSON API"
        href="/docs/features/xjson"
        iconName="Zap"
      />
    </div>
  );
}

