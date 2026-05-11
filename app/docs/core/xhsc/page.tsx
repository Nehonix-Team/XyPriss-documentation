import { DocLayout } from "@/components/docs/DocLayout";
import { Prose } from "@/components/docs/Prose";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { PropsTable } from "@/components/docs/PropsTable";
import { generateDocMeta } from "@/lib/docs-meta";
import type { Metadata } from "next";

export const metadata: Metadata = generateDocMeta({
  title: "XHSC Core",
  description: "Learn about the XyPriss Hyper-System Core, the native engine powering XyPriss.",
  slug: "core/xhsc",
});

const TOC = [
  { id: "responsibilities", label: "Key Responsibilities" },
  { id: "versioning", label: "Versioning Logic" },
  { id: "specs", label: "Technical Specifications" },
];

export default function XHSCPage() {
  return (
    <DocLayout
      title="XHSC: XyPriss Hyper-System Core"
      description="The high-performance cornerstone of the XyPriss framework."
      toc={TOC}
      editPath="app/docs/core/xhsc/page.tsx"
    >
      <Prose>
        <p>
          <strong>XHSC</strong> (codenamed <code>xhsc</code>) is the native cornerstone of the XyPriss framework. 
          Written in <strong>Go</strong>, it is designed to be a lean, ultra-fast, and secure networking engine 
          that powers the underlying infrastructure of XyPriss applications.
        </p>

        <SectionHeading id="responsibilities" level={2}>Key Responsibilities</SectionHeading>
        
        <SectionHeading id="routing" level={3}>1. High-Performance Routing</SectionHeading>
        <p>
          Unlike traditional middleware-based routers, XHSC uses a specialized <strong>Radix Tree (Trie)</strong> 
          implementation for route matching.
        </p>
        <ul>
          <li><strong>Latency</strong>: Microsecond-level lookup times.</li>
          <li><strong>Concurrency</strong>: Thousands of parallel requests without blocking.</li>
          <li><strong>Support</strong>: Dynamic parameters (<code>:id</code>) and wildcards (<code>*</code>).</li>
        </ul>

        <SectionHeading id="ipc" level={3}>2. XHSC IPC Bridge</SectionHeading>
        <p>
          The high-performance link between the native core and the Node.js application layer.
        </p>
        <ul>
          <li><strong>Zero-Copy Intent</strong>: Minimized memory cloning.</li>
          <li><strong>Isolation</strong>: Crashes in Node.js do not affect the native gateway.</li>
        </ul>

        <SectionHeading id="versioning" level={2}>Versioning and Generation Logic</SectionHeading>
        <p>
          XHSC follows a deterministic, 12-character versioning system: <code>XHSC[MMDD][YY][GX]</code>.
        </p>

        <PropsTable 
          rows={[
            { prop: "XHSC", type: "Identifier", description: "XyPriss Hyper-System Core Identifier" },
            { prop: "MMDD", type: "Build Timestamp", description: "Month and Day of the build." },
            { prop: "YY", type: "Year", description: "Year of deployment (e.g., 26 for 2026)." },
            { prop: "GX", type: "Generation", description: "Architectural generation (e.g., G3, G4)." },
          ]}
        />

        <SectionHeading id="specs" level={2}>Technical Specifications</SectionHeading>
        <ul>
          <li><strong>Language</strong>: Go (Native)</li>
          <li><strong>Concurrency</strong>: Goroutines (CSP Model)</li>
          <li><strong>Router</strong>: Native Radix Trie</li>
          <li><strong>Communication</strong>: Custom JSON-IPC over Unix Sockets</li>
        </ul>
      </Prose>
    </DocLayout>
  );
}
