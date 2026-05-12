"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { BookOpen, Rocket, Zap, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PluginTutorialsIndexPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <BookOpen size={14} />
          Learning Path
        </div>
        <SectionHeading level={1}>Plugin Tutorials</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Step-by-step guides to mastering the XyPriss plugin ecosystem. Choose your path below to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <button 
          onClick={() => router.push("/docs/plugins/tutorials/usage")}
          className="p-8 rounded-3xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all flex flex-col gap-6 h-full relative overflow-hidden text-left cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <Rocket size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xl">Using Plugins</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Learn how to find, install, and authorize plugins using XFPM and the Zero-Trust G3 model.
            </p>
          </div>
          <div className="mt-auto px-4 py-2 rounded-lg bg-primary text-white !text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-between group-hover:bg-primary/80 transition-all">
            Start Tutorial <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 blur-3xl rounded-full" />
        </button>

        <button 
          onClick={() => router.push("/docs/plugins/tutorials/authoring")}
          className="p-8 rounded-3xl border border-purple-500/20 bg-purple-500/5 hover:bg-purple-500/10 transition-all flex flex-col gap-6 h-full relative overflow-hidden text-left cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Zap size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xl">Authoring Plugins</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Build your own extensions from scratch. Covers project setup, hooks, and Ed25519 signing.
            </p>
          </div>
          <div className="mt-auto px-4 py-2 rounded-lg bg-purple-500 text-white !text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-between group-hover:bg-purple-600 transition-all">
            Start Building <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 blur-3xl rounded-full" />
        </button>
      </div>

      <Callout type="info" title="Prerequisites">
        Before starting these tutorials, we recommend familiarizing yourself with the Plugin System Guide to understand the underlying architecture and security boundaries.
      </Callout>

      <DocsFooter 
        title="Plugin Overview"
        description="Return to the general overview of the XyPriss plugin ecosystem."
        buttonText="View Overview"
        href="/docs/plugins"
        iconName="Puzzle"
      />
    </div>
  );
}
