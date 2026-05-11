import { DocLayout } from "@/components/docs/DocLayout";
import { Prose } from "@/components/docs/Prose";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { PropsTable } from "@/components/docs/PropsTable";
import { generateDocMeta } from "@/lib/docs-meta";
import type { Metadata } from "next";

export const metadata: Metadata = generateDocMeta({
  title: "Introduction",
  description: "XyPriss is an Enterprise-Grade Hybrid Web Framework for Node.js.",
  slug: "introduction",
});

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "features", label: "Core Features" },
  { id: "installation", label: "Quick Install" },
];

export default function IntroductionPage() {
  return (
    <DocLayout
      title="Introduction"
      description="Stop Coding Backends. Start Deploying Fortresses."
      toc={TOC}
      editPath="app/docs/introduction/page.tsx"
    >
      <Prose>
        <SectionHeading id="overview" level={2}>Overview</SectionHeading>
        <p>
          XyPriss is an <strong>Enterprise-Grade Hybrid Web Framework</strong> that combines the raw performance 
          of compiled native binaries with the productivity and flexibility of <strong>TypeScript</strong>. 
          It is designed for teams that require both operational speed and developer velocity, without compromise.
        </p>

        <Callout type="warning" title="Beta Software">
          This project is in active development. APIs, configurations, and behaviors may change at any time without notice. Use in production at your own risk.
        </Callout>

        <Callout type="note" title="Security Briefing">
          XyPriss enforces a &quot;Secure by Default&quot; architecture. Core variables are protected by a native 
          <strong> Environment Security Shield</strong> that blocks direct <code>process.env</code> access to prevent leakage.
        </Callout>

        <SectionHeading id="architecture" level={2}>Architecture</SectionHeading>
        <p>
          At the center of XyPriss lies <strong>XHSC (XyPriss Hyper-System Core)</strong> — the native engine 
          responsible for low-level HTTP networking, high-speed radix routing, and real-time system telemetry. 
          XHSC is written in Go for maximum portability.
        </p>
        
        <PropsTable 
          caption="Supported Platforms"
          rows={[
            { prop: "Linux", type: "x86_64 / aarch64", default: "Supported", description: "Native performance on Linux servers." },
            { prop: "Windows", type: "x86_64 / aarch64", default: "Supported", description: "Full Windows support with native binaries." },
            { prop: "macOS", type: "Intel / Apple Silicon", default: "Supported", description: "Optimized for both architectures." },
          ]}
        />

        <SectionHeading id="features" level={2}>Core Features</SectionHeading>
        <ul>
          <li><strong>XHSC Native Engine</strong> — Statically-linked system core with multi-core clustering.</li>
          <li><strong>XEMS Session Security</strong> — AES-256-GCM encrypted in-memory session store.</li>
          <li><strong>XStatic Engine</strong> — High-performance static serving via Zero-Copy IPC Delegation.</li>
          <li><strong>Environment Security Shield</strong> — Masked <code>process.env</code> access via native Proxy.</li>
        </ul>

        <SectionHeading id="installation" level={2}>Quick Install (Unix)</SectionHeading>
        <p>
          We strongly recommend using the <strong>XyPriss CLI (xfpm)</strong> for the fastest and most reliable developer experience.
        </p>
        
        <CodeBlock 
          lang="bash"
          code="curl -sL https://xypriss.nehonix.com/install.js | node"
          filename="Terminal"
        />

        <Callout type="caution" title="XFPM Exclusivity">
          All XyPriss projects MUST use <code>xfpm</code> for dependency management. Other package managers are not supported.
        </Callout>
      </Prose>
    </DocLayout>
  );
}
