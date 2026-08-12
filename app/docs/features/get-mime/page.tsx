import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Globe, FileText, Shield, Zap, CheckCircle2, Layers, Filter, FileCheck } from "lucide-react";

export default function GetMimePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server & Utilities
        </div>
        <SectionHeading level={1}>MIME Utilities (getMime & getMimes)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          High-performance, zero-dependency MIME type resolution built natively into core XyPriss.
        </p>
        <p className="leading-relaxed">
          XyPriss provides built-in utilities (<code className="text-primary font-mono">getMime</code> and <code className="text-primary font-mono">getMimes</code>) exported directly from the core package. These helpers eliminate external packages (like <code className="text-muted-foreground">mime-types</code>) and streamline server security setup—especially for configuring allowed formats in native XHSC file uploads.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {[
          {
            t: "Leading Dot Normalization",
            d: "Handles '.png', 'png', or '.PNG' seamlessly with case-insensitive resolution.",
            i: Filter,
          },
          {
            t: "Automatic Deduplication",
            d: "Resolves '.jpg' and '.jpeg' to a single deduplicated 'image/jpeg' MIME string.",
            i: Layers,
          },
          {
            t: "XHSC Engine Bridge",
            d: "Directly populates allowedMimeTypes for high-performance native Go binary uploads.",
            i: Zap,
          },
          {
            t: "Framework Fallback",
            d: "Reads global Configs allowedExtensions when called without parameters.",
            i: FileCheck,
          },
        ].map((feat, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shrink-0">
              <feat.i size={20} />
            </div>
            <div>
              <h4 className="font-bold text-white mb-1">{feat.t}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feat.d}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="api-reference">
        API Reference
      </SectionHeading>

      <div className="flex flex-col gap-4 my-2">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <code className="text-primary font-mono font-normal text-base">getMime(ext: string): string</code>
        </h3>
        <p className="text-sm text-muted-foreground">
          Resolves a single MIME type string from a given extension. Returns <code className="text-primary">'application/octet-stream'</code> as a safe fallback if unknown.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { getMime } from "xypriss";

console.log(getMime(".png"));     // "image/png"
console.log(getMime("jpg"));      // "image/jpeg"
console.log(getMime(".WEBP"));    // "image/webp"
console.log(getMime(".pdf"));     // "application/pdf"
console.log(getMime(".unknown")); // "application/octet-stream"`}
        />
      </div>

      <div className="flex flex-col gap-4 my-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <code className="text-primary font-mono font-normal text-base">getMimes(extensions?: string | string[]): string[]</code>
        </h3>
        <p className="text-sm text-muted-foreground">
          Resolves a list or single extension into a deduplicated array of valid MIME strings.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { getMimes } from "xypriss";

// 1. Array of extensions (auto-deduplicated)
const mimes = getMimes([".jpg", ".jpeg", ".png", ".svg"]);
// Returns: ["image/jpeg", "image/png", "image/svg+xml"]

// 2. Single extension string
const pdfMime = getMimes(".pdf");
// Returns: ["application/pdf"]

// 3. Fallback mode (reads global Configs.fileUpload.allowedExtensions)
const configMimes = getMimes();`}
        />
      </div>

      <SectionHeading level={2} id="upload-integration">
        File Upload Integration
      </SectionHeading>
      <p className="text-muted-foreground text-sm mb-4">
        The primary use case for <code className="text-primary font-mono">getMimes</code> is mapping simplified extension lists to native XHSC file upload security parameters.
      </p>

      <div className="flex flex-col gap-6 my-2">
        <h4 className="text-md font-semibold text-white">Single Server Configuration</h4>
        <CodeBlock
          language="typescript"
          code={`import { createServer, getMimes } from "xypriss";

const app = createServer({
    fileUpload: {
        enabled: true,
        destination: "./public/cdn",
        maxFileSize: 15 * 1024 * 1024, // 15MB
        // Automatically converts extensions to verified MIME array
        allowedMimeTypes: getMimes([".png", ".jpg", ".jpeg", ".webp", ".svg"]),
        useSubDir: true,
    },
});`}
        />
      </div>

      <div className="flex flex-col gap-6 my-4">
        <h4 className="text-md font-semibold text-white">Controller & Route Validation</h4>
        <CodeBlock
          language="typescript"
          code={`import { Router, Upload, getMimes } from "xypriss";

const router = Router();
const ALLOWED_MIMES = getMimes([".png", ".jpg", ".webp"]);

router.post("/api/avatar", Upload.single("file"), (req, res) => {
    const file = (req as any).file;
    
    if (!file || !ALLOWED_MIMES.includes(file.mimetype)) {
        return res.status(400).json({ error: "Invalid file type uploaded" });
    }

    res.success({ filename: file.filename, size: file.size });
});`}
        />
      </div>

      <SectionHeading level={2} id="supported-extensions">
        Supported MIME Types
      </SectionHeading>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-4">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Extensions</th>
              <th className="px-4 py-3">Resolved MIME Types</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs">
            {[
              {
                c: "Images",
                e: ".png, .jpg, .jpeg, .webp, .gif, .svg, .ico, .avif",
                m: "image/png, image/jpeg, image/webp, image/gif, image/svg+xml...",
              },
              {
                c: "Documents",
                e: ".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .txt, .csv",
                m: "application/pdf, application/msword, text/plain, text/csv...",
              },
              {
                c: "Media",
                e: ".mp3, .wav, .ogg, .mp4, .webm, .mkv",
                m: "audio/mpeg, audio/wav, video/mp4, video/webm...",
              },
              {
                c: "Archives & Code",
                e: ".zip, .tar, .gz, .json, .xml, .html, .css, .js",
                m: "application/zip, application/json, text/html...",
              },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-semibold text-primary">{row.c}</td>
                <td className="px-4 py-3 text-white font-mono">{row.e}</td>
                <td className="px-4 py-3 text-muted-foreground font-mono">{row.m}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Callout type="info" title="Zero External Dependency">
        <code className="text-primary font-mono">getMime</code> and <code className="text-primary font-mono">getMimes</code> run in pure TypeScript with zero external Node modules, ensuring minimal memory overhead and blazingly fast execution.
      </Callout>

      <DocsFooter
        title="File Uploads API"
        description="Learn how to handle high-performance file uploads with native XHSC acceleration."
        buttonText="View Upload Docs"
        href="/docs/server/file-uploads"
        iconName="Upload"
      />
    </div>
  );
}
