import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Activity, Clock, RotateCcw, Timer, Zap, CheckCircle2, ShieldCheck, Mail, Globe } from "lucide-react";

export default function LogicUtilsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Activity size={14} />
          Utilities Module
        </div>
        <SectionHeading level={1}>Logic & Validation (async & is)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Resilient asynchronous control flow primitives and rigorous type/value validation guards.
        </p>
      </div>

      <SectionHeading level={2} id="async-utilities">
        Async Utilities (async)
      </SectionHeading>
      
      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <RotateCcw size={18} className="text-primary" />
            .retry(fn, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Executes an async function with automatic retry logic, exponential backoff, and error filtering.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const status = await __sys__.utils.async.retry(
    async () => {
        const res = await fetch("http://api.internal/");
        if (res.status !== 200) throw new Error("Retryable error");
        return res.status;
    },
    { maxAttempts: 5, delay: 100, backoffFactor: 2 }
);`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            .pool(items, fn, concurrency?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Processes an array of items in parallel with a limited number of active promises (concurrency control).
          </p>
          <CodeBlock 
            language="typescript"
            code={`await __sys__.utils.async.pool(imageUrls, downloadImage, 5); // Max 5 parallel downloads`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Timer size={18} className="text-primary" />
            .timeout(fn, ms)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Wraps a promise with a maximum execution time. Throws an error if the timeout is reached.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const result = await __sys__.utils.async.timeout(() => heavyTask(), 2000);`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            .sleep(ms, signal?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Suspends execution for a specific duration. Supports <code className="text-primary">AbortSignal</code> for clean cancellation.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="validation-utilities">
        Validation Utilities (is)
      </SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
          <Mail size={20} className="text-primary" />
          <div>
            <div className="text-sm font-bold text-white">.email(string)</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">RFC 5322 Validation</div>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
          <Globe size={20} className="text-primary" />
          <div>
            <div className="text-sm font-bold text-white">.url(string)</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Strict URI Check</div>
          </div>
        </div>
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-4">
          <ShieldCheck size={20} className="text-primary" />
          <div>
            <div className="text-sm font-bold text-white">.nullish(value)</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Type Guard</div>
          </div>
        </div>
      </div>

      <SectionHeading level={2} id="advanced-flow">
        Advanced Flow Control
      </SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {[
          { name: ".memoize(fn, ttl?)", desc: "Request collapsing & caching" },
          { name: ".attempt(fn)", desc: "Error-as-value { ok, value } pattern" },
          { name: ".repeat(fn, ms, signal?)", desc: "Drift-corrected intervals" },
          { name: ".queue()", desc: "Sequential task execution" },
          { name: ".debounce(fn, wait)", desc: "Burst prevention" },
          { name: ".poll(fn, predicate)", desc: "Repeated condition checking" },
        ].map((util, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <div className="text-primary font-mono text-xs font-bold mb-1 group-hover:text-white transition-colors">{util.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{util.desc}</div>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Primitives Utilities"
        description="Learn about core identity and functional helpers."
        buttonText="Explore API"
        href="/docs/system/utils/primitives"
        iconName="Fingerprint"
      />
    </div>
  );
}
