import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Globe, Upload, Shield, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function FileUploadsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>Professional File Uploads</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Production-grade configuration for XyPriss's native XHSC-powered file upload system.
        </p>
      </div>

      <SectionHeading level={2} id="configuration">Strategic Configuration</SectionHeading>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        For robustness, avoid relative paths in production. Define absolute storage outside the application source.
      </p>
      <CodeBlock 
        language="typescript"
        code={`const server = createServer({
    fileUpload: {
        enabled: true,
        maxFileSize: 1024 * 1024 * 500, // 500MB
        destination: "/var/lib/xypriss/uploads",
        allowedExtensions: [".pdf", ".docx", ".zip", ".jpg", ".png"],
        useSubDir: true, // Prevents directory clutter
    },
});`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            <Shield size={16} className="text-primary" />
            Perimeter Security
          </h4>
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
              <span><strong>Magic Number Validation</strong>: Verifies file headers to ensure types match extensions.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-primary mt-0.5 shrink-0" />
              <span><strong>Early Termination</strong>: Drops connection immediately if limits are exceeded.</span>
            </li>
          </ul>
        </div>
        <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/10">
          <h4 className="font-bold text-yellow-500 mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
            <AlertTriangle size={16} />
            Best Practices
          </h4>
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">•</span>
              <span><strong>Auth First</strong>: Always place authorization middleware before the upload handler.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-0.5">•</span>
              <span><strong>Cleanup</strong>: Implement a cron job to delete aborted/orphaned temporary files.</span>
            </li>
          </ul>
        </div>
      </div>

      <SectionHeading level={2} id="usage">Multi-Field Management</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4">
        Use <code className="text-primary font-bold">.fields()</code> for transactional requests containing different types of assets.
      </p>
      <CodeBlock 
        language="typescript"
        code={`const jobApplicationUpload = app.upload.fields([
    { name: "cv", maxCount: 1, allowedExtensions: [".pdf"] },
    { name: "photo", maxCount: 1, allowedExtensions: [".jpg", ".png"] },
]);

app.post("/apply", jobApplicationUpload, (req, res) => {
    const { cv, photo } = (req as any).files;
    res.success({ message: "Application received" });
});`}
      />

      <Callout type="info" title="Error Handling">
        XyPriss throws a <code className="text-primary font-bold">FileUploadError</code> when validation fails, allowing you to provide clean feedback to the client without exposing system internals.
      </Callout>

      <DocsFooter 
        title="Response Control"
        description="Learn how to hijack and customize default 404 behaviors."
        buttonText="View Specs"
        href="/docs/server/response-control"
        iconName="Target"
      />
    </div>
  );
}
