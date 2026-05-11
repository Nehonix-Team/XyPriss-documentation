"use client";

import React from "react";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { Steps, Step } from "@/components/docs/Steps";
import { 
  Rocket, 
  Shield, 
  Zap, 
  Server, 
  Cpu, 
  Lock, 
  Globe, 
  Package,
  Layers
} from "lucide-react";
import Link from "next/link";

export default function IntroductionPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Rocket size={14} />
          Welcome to XyPriss
        </div>
        <SectionHeading level={1}>Introduction to the Framework</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss is a next-generation hybrid web framework that combines raw
          native performance with the flexibility and productivity of
          TypeScript.
        </p>
      </div>

      <Callout type="info" title="Stability Note">
        XyPriss has officially left its beta phase. This documentation is
        up-to-date for the stable v9.10.15 release.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Zap
            className="text-primary mb-4 group-hover:scale-110 transition-transform"
            size={32}
          />
          <h3 className="text-lg font-bold mb-2">Native Performance</h3>
          <p className="text-sm text-muted-foreground">
            XHSC engine written in Go for ultra-fast Radix routing and efficient
            I/O management.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Shield
            className="text-primary mb-4 group-hover:scale-110 transition-transform"
            size={32}
          />
          <h3 className="text-lg font-bold mb-2">Built-in Security</h3>
          <p className="text-sm text-muted-foreground">
            Over 12 native security middlewares, including protection against
            ReDoS and injection attacks.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Layers
            className="text-primary mb-4 group-hover:scale-110 transition-transform"
            size={32}
          />
          <h3 className="text-lg font-bold mb-2">Hybrid Architecture</h3>
          <p className="text-sm text-muted-foreground">
            The best of both worlds: the power of compiled code and the
            development velocity of TypeScript.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-primary/20 transition-all group">
          <Globe
            className="text-primary mb-4 group-hover:scale-110 transition-transform"
            size={32}
          />
          <h3 className="text-lg font-bold mb-2">Cross-Platform</h3>
          <p className="text-sm text-muted-foreground">
            Full support for Linux, Windows, and macOS with pre-compiled
            binaries and no external dependencies.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="architecture">
        System Architecture
      </SectionHeading>
      <p>
        At the core of XyPriss lies the{" "}
        <strong>XHSC (XyPriss Hyper-System Core)</strong> — the native engine
        responsible for low-level HTTP networking, high-speed radix routing,
        filesystem operations, and real-time system telemetry.
      </p>

      <Steps>
        <Step title="XHSC (Native Engine)">
          Handles the HTTP/S stack, advanced radix routing, and file I/O. It
          acts as the high-performance gateway.
        </Step>
        <Step title="Node.js Runtime">
          Provides the application layer where developers define business logic
          and security middleware.
        </Step>
        <Step title="XFPM (Package Manager)">
          A high-performance package manager optimized for the XyPriss
          ecosystem.
        </Step>
      </Steps>

      <SectionHeading level={2} id="quick-install">
        Quick Install
      </SectionHeading>
      <p>
        We recommend using the **xfpm** CLI for the best development experience.
      </p>

      <CodeBlock
        language="bash"
        code="curl -sL https://xypriss.nehonix.com/install.js | node"
        title="CLI Installation"
      />

      <Callout type="warning" title="XFPM Exclusivity">
        All XyPriss projects MUST use `xfpm` for dependency management. Other
        managers like npm or yarn are not supported.
      </Callout>

      <SectionHeading level={2} id="next-steps">
        Next Steps
      </SectionHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Link
          href="/docs/getting-started"
          className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
        >
          <div className="flex flex-col">
            <span className="font-bold">Getting Started</span>
            <span className="text-xs text-muted-foreground">
              Set up your first project
            </span>
          </div>
          <Zap
            size={20}
            className="text-primary group-hover:translate-x-1 transition-transform"
          />
        </Link>
        <Link
          href="/docs/api-reference"
          className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center justify-between group"
        >
          <div className="flex flex-col">
            <span className="font-bold">API Reference</span>
            <span className="text-xs text-muted-foreground">
              Explore technical documentation
            </span>
          </div>
          <Package
            size={20}
            className="text-primary group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </div>
  );
}
