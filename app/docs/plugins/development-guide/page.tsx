"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Code, ShieldCheck, Box, ChevronRight, Terminal, Key } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PluginDevelopmentGuidePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Code size={14} />
          Authoring Guide
        </div>
        <SectionHeading level={1}>Plugin Development Guide</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learn the architectural principles and best practices for building
          professional XyPriss plugins. This guide focuses on theoretical
          concepts and design patterns.
        </p>
      </div>

      <TechGraph
        title="Plugin Lifecycle Flow"
        badge="Deterministic Execution"
        nodes={[
          {
            iconName: "Layers",
            title: "Register",
            subtitle: "onRegister",
            color: "blue",
          },
          {
            iconName: "Zap",
            title: "Initialize",
            subtitle: "onServerStart",
            color: "primary",
            active: true,
          },
          {
            iconName: "Activity",
            title: "Ready",
            subtitle: "onServerReady",
            color: "purple",
          },
          {
            iconName: "Box",
            title: "Shutdown",
            subtitle: "onServerStop",
            color: "orange",
          },
        ]}
        footer={[
          {
            label: "Blocking Init",
            description:
              "onServerStart blocks startup until database/resources are ready.",
            color: "blue",
          },
          {
            label: "Cleanup",
            description:
              "onServerStop ensures graceful resource disposal on shutdown.",
            color: "orange",
          },
        ]}
      />

      <SectionHeading level={2} id="architecture">
        Plugin Structure
      </SectionHeading>
      <div className="space-y-4">
        <p>
          A <strong>XyPriss plugin</strong> is a structured object implementing
          the <code>XyPrissPlugin</code> interface. It serves as a bridge
          between the core engine and external logic, combining metadata with
          lifecycle hooks and functional middleware.
        </p>
        <p className="text-sm text-muted-foreground">
          Plugins are strictly typed and isolated. They must declare their
          identity, version, and required permissions to be accepted by the XHSC
          core.
        </p>
        <button
          onClick={() => router.push("/docs/plugins/api-reference#interface")}
          className="mt-4 px-4 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all w-fit cursor-pointer border-none shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          View Interface Specification <ChevronRight size={14} />
        </button>
      </div>

      <SectionHeading level={2} id="getting-started">
        Getting Started
      </SectionHeading>
      <div className="flex flex-col gap-6">
        <p>
          To begin developing, you must initialize a project using XFPM and
          define a security contract. For a step-by-step implementation
          walkthrough, refer to the authoring tutorial.
        </p>
        <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex items-center justify-between gap-4 group">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-base">
              Complete Authoring Tutorial
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Step-by-step guide from bootstrapping with XFPM to Ed25519
              cryptographic signing.
            </p>
          </div>
          <button
            onClick={() => router.push("/docs/plugins/tutorials/authoring")}
            className="px-4 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all shrink-0 cursor-pointer border-none shadow-lg shadow-primary/20"
          >
            Read Tutorial
          </button>
        </div>
      </div>

      <SectionHeading level={2} id="patterns">
        Authoring Patterns
      </SectionHeading>
      <div className="space-y-4">
        <p>
          XyPriss encourages the <strong>Plugin Factory</strong> pattern. By
          exporting a function that returns the plugin object, you allow users
          to pass configuration options during registration.
        </p>
        <p className="text-sm text-muted-foreground">
          Factories should also leverage <code>Plugin.manifest()</code> to
          automatically synchronize metadata with the project's{" "}
          <code>package.json</code>, reducing maintenance overhead and
          preventing version drift.
        </p>
        <button
          onClick={() =>
            router.push("/docs/plugins/tutorials/authoring#authoring")
          }
          className="mt-4 px-4 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all w-fit cursor-pointer border-none shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          View Factory Pattern Implementation <ChevronRight size={14} />
        </button>
      </div>

      <SectionHeading level={2} id="permissions-discovery">
        Permission Discovery
      </SectionHeading>
      <div className="space-y-4">
        <p>
          The G3 architecture requires explicit permission declarations. Every
          hook implemented in your plugin must have a corresponding permission
          ID listed in your manifest.
        </p>
        <p className="text-sm text-muted-foreground">
          The <code>Plugin.inspect()</code> utility performs a deep-scan of your
          plugin to identify required capabilities, ensuring you never miss a
          mandatory declaration.
        </p>
        <button
          onClick={() =>
            router.push("/docs/plugins/tutorials/authoring#permissions")
          }
          className="mt-4 px-4 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all w-fit cursor-pointer border-none shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          How to run the Inspector <ChevronRight size={14} />
        </button>
      </div>

      <SectionHeading level={2} id="signing">
        Security Identity & Signing
      </SectionHeading>
      <div className="space-y-4">
        <p>
          Cryptographic signing is the cornerstone of plugin integrity. All G3
          plugins must include a <code>xypriss.plugin.xsig</code> manifest
          signed with an Ed25519 developer key.
        </p>
        <p className="text-sm text-muted-foreground">
          This process hashes every production file, ensuring that the code
          running in the end-user's environment is exactly what you published,
          free from tampering or accidental corruption.
        </p>
        <button
          onClick={() =>
            router.push("/docs/plugins/tutorials/authoring#signing")
          }
          className="mt-4 px-4 py-2 rounded-lg bg-primary text-white !text-white text-xs font-bold hover:bg-primary/80 transition-all w-fit cursor-pointer border-none shadow-lg shadow-primary/20 flex items-center gap-2"
        >
          Signing Walkthrough <ChevronRight size={14} />
        </button>
      </div>

      <SectionHeading level={2} id="best-practices">
        Best Practices
      </SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
            <ShieldCheck size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Error Handling</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Always handle errors in lifecycle hooks. Throwing an error in{" "}
            <code>onServerStart</code> will safely prevent the server from
            starting in a corrupted state.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
            <Box size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Resource Cleanup</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Use <code>onServerStop</code> to close database connections and
            flush logs. This prevents memory leaks and ensures clean process
            termination.
          </p>
        </div>
      </div>

      <Callout type="info" title="Performance Tip">
        Minimize heavy synchronous operations in <code>onRequest</code> and{" "}
        <code>onResponse</code> hooks. For high-throughput servers, offload
        complex processing to background workers or the{" "}
        <code>onServerReady</code> hook. Explore the technical details in the <button onClick={() => router.push("/docs/plugins/api-reference/http")} className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline-flex items-center gap-1">HTTP Hooks</button> and <button onClick={() => router.push("/docs/plugins/api-reference/lifecycle")} className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline-flex items-center gap-1">Lifecycle Reference <ChevronRight size={12} /></button>.
      </Callout>

      <DocsFooter
        title="Built-in Plugins"
        description="Explore the production-grade official plugins provided by the XyPriss core."
        buttonText="View Official Plugins"
        href="/docs/plugins/built-in"
        iconName="Box"
      />
    </div>
  );
}
