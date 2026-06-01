import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { BenchBarChart, BenchLineChart, BenchStatCard } from "@/components/ui/BenchGraphs";
import {
  Download,
  Zap,
  ShieldCheck,
  Database,
  Layers,
  Globe,
  Play,
  FileCode2,
  Gauge,
  Activity,
} from "lucide-react";

export default function SendFilePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>
          Native Binary Streaming (sendFile)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Enterprise-standard utility for serving physical assets using XHSC
          Zero-Copy architecture with full HTTP Range support.
        </p>
        <p>
          <code>res.sendFile(filePath)</code> leverages the{" "}
          <strong>XHSC (Hyper-System Core)</strong> native engine to stream
          binary data directly from the filesystem to the network socket,
          bypassing the Node.js/V8 heap to ensure minimal memory footprint and
          maximum throughput.
        </p>
      </div>

      <SectionHeading level={2} id="architecture">
        Advanced Architecture
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Unlike conventional frameworks that buffer file content into the
        JavaScript heap — leading to latency and GC pressure — XyPriss
        implements a <strong>Zero-Copy Ranged Streaming</strong> architecture:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <ShieldCheck className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Native Resolution</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            The path is rigorously validated using <code className="text-primary">__sys__.fs</code>, protecting against directory traversal attacks.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Layers className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">MIME-Type Intelligence</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Headers are automatically calculated based on the internal <code className="text-primary">MIME_MAP</code>, ensuring browser-compliant delivery.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Play className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Ranged Delivery</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Full support for HTTP Range headers via native <code>lseek(2)</code> and <code>copy_file_range(2)</code>. Essential for video seek and large asset delivery.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Database className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Low Memory Impact</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Even with multi-gigabyte files, the Node.js process RSS remains stable as data flows through a dedicated native IPC bridge.
          </p>
        </div>
      </div>

      <Callout type="info" title="Zero-Copy Guarantee">
        Data never touches the Node.js heap. The XHSC engine reads from disk and writes to the TCP socket directly, keeping your application memory footprint flat regardless of file size.
      </Callout>

      <SectionHeading level={2} id="usage">Implementation Examples</SectionHeading>
      <div className="space-y-8">
        <div>
          <h4 className="text-md font-bold text-white mb-2">Standard Asset Delivery</h4>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Serve documents or images with automatic MIME-type resolution and caching headers. Conditional requests (ETags/Last-Modified) are handled automatically.
          </p>
          <CodeBlock
            language="typescript"
            code={`import { XyPrisRequest, XyPrisResponse } from "xypriss";

export const getReport = (req: XyPrisRequest, res: XyPrisResponse) => {
    const storageRoot = __sys__.vars.get("__root__");
    const reportPath = __sys__.path.join(
        storageRoot,
        "storage",
        "reports",
        "annual.pdf",
    );

    // Serve with Content-Type: application/pdf
    // Handles conditional requests (ETags/Last-Modified) automatically
    res.sendFile(reportPath);
};`}
          />
        </div>

        <div>
          <h4 className="text-md font-bold text-white mb-2">Media Streaming with Seek Support</h4>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Because <code className="text-primary">res.sendFile</code> supports Range requests natively, it is the ideal choice for streaming video content to modern browsers.
          </p>
          <CodeBlock
            language="typescript"
            code={`app.get("/media/video/:id", (req, res) => {
    const videoPath = __sys__.path.resolve("./assets/media/demo.mp4");

    // Automatically handles byte-range requests
    // (e.g., Range: bytes=1024-2048)
    // allowing users to seek without downloading the whole file.
    res.sendFile(videoPath);
});`}
          />
        </div>

        <div>
          <h4 className="text-md font-bold text-white mb-2">Advanced Download Logic</h4>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Secure download route with custom headers, MIME enforcement, and forced attachment disposition.
          </p>
          <CodeBlock
            language="typescript"
            code={`app.get("/download/report/:id", async (req, res) => {
    const reportName = \`report-\${req.params.id}.pdf\`;

    await res.sendFile(reportName, {
        // Base directory for resolution
        root: __sys__.path.join(__sys__.__root__, "storage/vault"),

        // Force browser to download instead of rendering
        disposition: "attachment",

        // Custom security headers
        headers: {
            "X-Report-Id": req.params.id,
            "Cache-Control": "private, no-store, must-revalidate"
        },

        // Ensure the browser treats it as PDF
        mimeOverrides: {
            ".pdf": "application/pdf"
        },

        // Cache for 1 hour unless overridden by headers
        maxAge: 3600000
    });
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="options">Configuration Options</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The <code>sendFile</code> method accepts an optional second argument to
        fine-tune delivery behaviour:
      </p>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { p: "root", t: "string", d: "Base directory for relative file path resolution." },
              { p: "maxAge", t: "number", d: "Cache-Control max-age in milliseconds." },
              { p: "headers", t: "Record<string, string>", d: "Custom HTTP headers to serve with the file." },
              { p: "disposition", t: "string", d: "Content-Disposition value. Use 'inline', 'attachment', or a custom filename." },
              { p: "mimeOverrides", t: "Record<string, string>", d: "Map of file extensions to MIME types to override system defaults." },
            ].map((opt, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-primary text-xs">{opt.p}</td>
                <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">{opt.t}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{opt.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="security">Security &amp; Reliability</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <ShieldCheck className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Path Sanitization</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            <code className="text-primary">res.sendFile</code> automatically normalises paths to prevent <code>../</code> traversal exploits.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <FileCode2 className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">Error Resilience</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            If the file is inaccessible or corrupted, the framework dispatches a 404 or 500 before headers are flushed, ensuring client-side consistency.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
          <Layers className="text-primary mb-3" size={20} />
          <h4 className="font-bold text-white text-sm mb-2">MIME Coverage</h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Natively handles 50+ extensions including <code>.webp</code>, <code>.mp4</code>, <code>.zip</code>, <code>.svg</code>, <code>.jsonc</code>.
          </p>
        </div>
      </div>

      <Callout type="warning" title="Always Use Absolute Paths">
        Provide an <strong>absolute path</strong> to <code>res.sendFile</code>. Use <code>__sys__.path.resolve</code> or <code>__sys__.path.join</code> to ensure platform-independent path construction and avoid security issues.
      </Callout>

      <SectionHeading level={2} id="benchmarks">
        Benchmarks: Mixed Workload (Auth + 500 KB File)
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        This benchmark validates <code>res.sendFile()</code> on a realistic
        production workload: authentication middleware (2 ms overhead) followed
        by a <strong>500 KB binary file transfer</strong>. The fixed IPC bridge
        cost (~15 ms) is fully amortised by the transfer, so XyPriss leads on
        latency at every load level.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <BenchStatCard
          label="Mixed Avg Latency (50 conn)"
          value="837.5 ms"
          sub="Lowest among Express, Fastify, and XyPriss — auth + 500 KB file."
          icon={Activity}
          accent="#3b82f6"
        />
        <BenchStatCard
          label="Total Data (10s window)"
          value="~328 MB"
          sub="Highest data transferred at 10 connections — Zero-Copy advantage."
          icon={Gauge}
          accent="#10b981"
        />
        <BenchStatCard
          label="p99 Tail Latency (100 conn)"
          value="4 182 ms"
          sub="Lowest tail latency at 100 connections — Fastify reaches 8 411 ms."
          icon={Zap}
          accent="#f59e0b"
        />
      </div>

      <BenchBarChart
        title="Average Latency — Auth + 500 KB File"
        unit="Lower is better (ms)"
        xLabel="Concurrent connections"
        data={[
          { label: "10", express: 233.6, fastify: 189.8, xypriss: 165.2 },
          { label: "50", express: 976.6, fastify: 1370.0, xypriss: 837.5 },
          { label: "100", express: 2068.6, fastify: 2191.2, xypriss: 1615.0 },
        ]}
      />

      <BenchLineChart
        title="Tail Latency p99 — Auth + 500 KB File"
        unit="Lower is better (ms)"
        data={[
          { x: 10, express: 797, fastify: 462, xypriss: 351 },
          { x: 50, express: 1835, fastify: 3113, xypriss: 2167 },
          { x: 100, express: 5379, fastify: 8411, xypriss: 4182 },
        ]}
      />

      <div className="flex items-center gap-2 mt-2 mb-6">
        <FileCode2 size={12} className="text-primary" />
        <a
          href="/docs/performance/benchmarks"
          className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          Full Benchmarks: routing, static delivery, synthesis table and takeaways
        </a>
      </div>

      <DocsFooter
        title="Structured Responses"
        description="Standardise every API response with the structured Send utility and IResTemplate contract."
        buttonText="Explore Send"
        href="/docs/server/send"
        iconName="FileCode2"
      />
    </div>
  );
}
