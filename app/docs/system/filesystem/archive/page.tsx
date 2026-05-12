import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Archive, Zap, FolderArchive, FileArchive } from "lucide-react";

export default function FsArchivePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Archive size={14} />
          Filesystem Module
        </div>
        <SectionHeading level={1}>Archive & Compression</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Enterprise-grade compression and archiving executing entirely within the XHSC core. These operations eliminate Node.js buffer overhead, providing zero-copy performance for massive data structures.
        </p>
      </div>

      <SectionHeading level={2} id="lossless">Lossless Compression (GZIP)</SectionHeading>
      <p className="mb-4">Efficient file compression and decompression using native Go implementations.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
          <FileArchive size={32} className="text-primary mb-4" />
          <div className="font-mono text-sm text-white mb-2">.compress(src, dest)</div>
          <p className="text-xs text-muted-foreground">Compresses a file to .gz format.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center">
          <FileArchive size={32} className="text-primary/50 mb-4" />
          <div className="font-mono text-sm text-white mb-2">.decompress(src, dest)</div>
          <p className="text-xs text-muted-foreground">Restores a compressed .gz file.</p>
        </div>
      </div>
      <CodeBlock 
        language="typescript"
        code={`__sys__.fs.compress("data.json", "data.json.gz");
__sys__.fs.decompress("data.json.gz", "data.restored.json");`}
      />

      <SectionHeading level={2} id="tar">TAR Archiving</SectionHeading>
      <p className="mb-4 text-muted-foreground">Bundle entire directory trees into a single archive or extract them with metadata preservation.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <FolderArchive size={20} />
            </div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Archiving</h4>
          </div>
          <div className="font-mono text-xs text-primary mb-2">.tar(dir, output)</div>
          <p className="text-xs text-muted-foreground">Recursively bundles a directory.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/20 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <FolderArchive size={20} />
            </div>
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">Extraction</h4>
          </div>
          <div className="font-mono text-xs text-primary mb-2">.untar(archive, dest)</div>
          <p className="text-xs text-muted-foreground">Extracts an archive to a destination.</p>
        </div>
      </div>
      <CodeBlock 
        language="typescript"
        code={`__sys__.fs.tar("./src", "src_backup.tar");
__sys__.fs.untar("src_backup.tar", "./restore");`}
      />

      <DocsFooter 
        title="File Watching"
        description="Monitor filesystem events reactively and trigger automated processes."
        buttonText="Explore Watching"
        href="/docs/system/filesystem/watch"
        iconName="Eye"
      />
    </div>
  );
}
