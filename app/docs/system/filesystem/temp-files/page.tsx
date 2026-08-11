import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Trash2, Clock, Cpu, ShieldCheck } from "lucide-react";

export default function DisposableTempFilesPage() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeading level={1}>Disposable Temporary Files</SectionHeading>

      <p className="text-lg text-muted-foreground leading-relaxed">
        Built-in, native disposable temporary file manager integrated into <code>__sys__.fs</code> for creating short-lived scratch files with zero-config automatic cleanup.
      </p>

      <p className="leading-relaxed">
        XyPriss allows developers to generate temporary scratch files (such as PDF exports, image conversions, session tokens, or upload buffers) 
        stored within an isolated user directory (<code>__sys__.fs.tmpUserDir</code>). All temporary files are safely tracked and automatically unlinked when TTL expires, when the server reloads or exits, or on demand.
      </p>

      <Callout type="info" title="Zero Node.js Dependency">
        Under the hood, the temporary file manager relies 100% on the native XyPriss system API via the <strong>XHSC (XyPriss Hyper-System Core)</strong> binary. Path resolution, directory creation, file writing, statistics, and deletion are executed off the Node.js event loop.
      </Callout>

      <SectionHeading level={2}>Automatic Cleanup Triggers</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Clock size={16} /> TTL Timeout
          </div>
          <p className="text-xs text-muted-foreground m-0">
            Pass a duration string (e.g. <code>"30s"</code>, <code>"5m"</code>, <code>"1h"</code>). Background timers automatically unlink expired files.
          </p>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Cpu size={16} /> Process Exit / Reload
          </div>
          <p className="text-xs text-muted-foreground m-0">
            Process termination hooks (<code>exit</code>, <code>SIGINT</code>, <code>SIGTERM</code>) or live reloads purge session scratch files automatically.
          </p>
        </div>

        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Trash2 size={16} /> Manual On-Demand
          </div>
          <p className="text-xs text-muted-foreground m-0">
            Invoke <code>.cleanup()</code> or <code>.remove()</code> on the returned file handle to delete the file immediately in a <code>finally</code> block.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>API Reference</SectionHeading>

      <SectionHeading level={3}>1. Sub-API Namespace (<code>__sys__.fs.tmp</code>)</SectionHeading>
      <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
        <li><code>__sys__.fs.tmp.write(content, options?): Promise&lt;TempFileResult&gt;</code> — Write temporary file (async).</li>
        <li><code>__sys__.fs.tmp.writeSync(content, options?): TempFileResult</code> — Write temporary file (sync).</li>
        <li><code>__sys__.fs.tmp.read(path): Promise&lt;string&gt;</code> — Read temporary file (async).</li>
        <li><code>__sys__.fs.tmp.readSync(path): string</code> — Read temporary file (sync).</li>
        <li><code>__sys__.fs.tmp.remove(path): boolean</code> — Remove a specific temporary file on disk.</li>
        <li><code>__sys__.fs.tmp.dir: string</code> — Access the isolated user temporary directory (<code>tmpUserDir</code>).</li>
        <li><code>__sys__.fs.tmp.cleanup(): number</code> / <code>purge(): number</code> — Purge all active temporary files in current session.</li>
      </ul>

      <SectionHeading level={3}>2. Direct Shorthand Methods (<code>__sys__.fs</code>)</SectionHeading>
      <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
        <li><code>__sys__.fs.writeTempFile(content, options?): Promise&lt;TempFileResult&gt;</code></li>
        <li><code>__sys__.fs.writeTempFileSync(content, options?): TempFileResult</code></li>
        <li><strong>Aliases</strong>: <code>createTempFile</code>, <code>createTempFileSync</code>, <code>writeTmpFile</code>, <code>writeTmpFileSync</code></li>
        <li><code>__sys__.fs.cleanupTempFiles(): number</code></li>
      </ul>

      <SectionHeading level={2}>Configuration Options (<code>TempFileOptions</code>)</SectionHeading>
      <div className="overflow-x-auto my-4">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-slate-300">
              <th className="py-2 px-3 font-semibold">Option</th>
              <th className="py-2 px-3 font-semibold">Type</th>
              <th className="py-2 px-3 font-semibold">Default</th>
              <th className="py-2 px-3 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-white/5">
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">prefix</td>
              <td className="py-2 px-3 font-mono text-slate-300">string</td>
              <td className="py-2 px-3 font-mono text-slate-400">"tmp_"</td>
              <td className="py-2 px-3">Optional filename prefix.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">extension</td>
              <td className="py-2 px-3 font-mono text-slate-300">string</td>
              <td className="py-2 px-3 font-mono text-slate-400">".xtmp"</td>
              <td className="py-2 px-3">File extension or suffix (e.g. <code>".json"</code>, <code>".pdf"</code>, <code>".txt"</code>).</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">suffix</td>
              <td className="py-2 px-3 font-mono text-slate-300">string</td>
              <td className="py-2 px-3 font-mono text-slate-400">—</td>
              <td className="py-2 px-3">Alias for <code>extension</code>.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">filename</td>
              <td className="py-2 px-3 font-mono text-slate-300">string</td>
              <td className="py-2 px-3 font-mono text-slate-400">—</td>
              <td className="py-2 px-3">Custom exact filename. Overrides automatic prefix/suffix generation.</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">ttl</td>
              <td className="py-2 px-3 font-mono text-slate-300">number | string</td>
              <td className="py-2 px-3 font-mono text-slate-400">0</td>
              <td className="py-2 px-3">Expiration duration in ms or human string (e.g. <code>"30s"</code>, <code>"5m"</code>, <code>"1h"</code>).</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-mono text-cyan-400">autoCleanupOnExit</td>
              <td className="py-2 px-3 font-mono text-slate-300">boolean</td>
              <td className="py-2 px-3 font-mono text-slate-400">true</td>
              <td className="py-2 px-3">If <code>true</code>, automatically unlinks the file when process exits.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={2}>Return Handle (<code>TempFileResult</code>)</SectionHeading>
      <CodeBlock
        language="typescript"
        title="TempFileResult Interface"
        code={`interface TempFileResult {
    /** Absolute path to the created temporary file inside tmpUserDir */
    path: string;
    /** Filename of the temporary file */
    filename: string;
    /** Size of the temporary file in bytes */
    size: number;
    /** Timestamp when the file was created (in ms) */
    createdAt: number;
    /** Expiration timestamp in ms (or null if no TTL) */
    expiresAt: number | null;
    /** Manually deletes the temporary file immediately. Returns true if deleted. */
    remove: () => boolean;
    /** Alias for remove() */
    cleanup: () => boolean;
}`}
      />

      <SectionHeading level={2}>Code Examples</SectionHeading>

      <SectionHeading level={3}>1. Temporary PDF Export with 5-Minute TTL</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`import { __sys__ } from "xypriss";

// Create a disposable PDF report expiring in 5 minutes
const report = await __sys__.fs.writeTempFile(pdfBuffer, {
    prefix: "financial_report_",
    extension: ".pdf",
    ttl: "5m",
});

console.log(\`Temporary PDF generated at: \${report.path}\`);
// Deliver to client or pipeline...
// Will be automatically unlinked after 5 minutes or on server restart.`}
      />

      <SectionHeading level={3}>2. Immediate On-Demand Cleanup</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`import { __sys__ } from "xypriss";

const tmp = __sys__.fs.writeTmpFileSync(JSON.stringify(payload), {
    prefix: "cache_",
    extension: ".json",
});

try {
    // Process payload...
} finally {
    // Ensure immediate deletion as soon as processing completes
    tmp.cleanup();
}`}
      />

      <SectionHeading level={3}>3. Session Scratch Space with Shorthand Alias</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`import { __sys__ } from "xypriss";

const scratch = await __sys__.fs.createTempFile("temporary log data", {
    prefix: "user_session_",
    extension: ".log",
    ttl: "1h",
});`}
      />

      <Callout type="warning" title="Best Practices">
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li><strong>Human-Readable TTLs:</strong> Use intuitive strings like <code>"30s"</code>, <code>"10m"</code>, <code>"2h"</code>.</li>
          <li><strong>Automatic Exit Cleanup:</strong> Keep <code>autoCleanupOnExit: true</code> (default) so process restarts sweep orphan scratch files.</li>
          <li><strong>Finally Blocks:</strong> Call <code>tmp.cleanup()</code> inside <code>finally</code> blocks when generating large files to release disk space immediately.</li>
        </ul>
      </Callout>

      <DocsFooter
        title="Security & Advanced Filesystem"
        description="Learn about AES-256 encryption, file shredding, and advisory locking."
        buttonText="Explore Security API"
        href="/docs/system/filesystem/security"
        iconName="Lock"
      />
    </div>
  );
}
