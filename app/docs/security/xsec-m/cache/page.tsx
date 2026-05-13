import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Zap, ShieldCheck, Layers, Cpu, Database, Activity, Trash2, Lock } from "lucide-react";

export default function CachePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Secure Cache (UFSIMC)</SectionHeading>
      
      <p>The <strong>Ultra-Fast Secure In-Memory Cache (UFSIMC)</strong> is a high-performance, encrypted caching engine designed for low-latency operations and memory efficiency. It provides automated encryption and compression for all stored entries.</p>

      <SectionHeading level={2}>Core Mechanism</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Lock className="w-5 h-5" /> Automated Encryption
          </div>
          <p className="text-xs text-slate-400">Data is encrypted before storage using AES-256-GCM, preventing memory inspection from accessing sensitive cache entries.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Zap className="w-5 h-5" /> High Compression
          </div>
          <p className="text-xs text-slate-400">Transparently compresses large JSON objects to reduce memory footprint by up to 80% without impacting latency.</p>
        </div>
      </div>

      <SectionHeading level={2}>Basic Usage</SectionHeading>
      <CodeBlock language="typescript" title="Cache Operations" code={`import { Cache } from "xypriss-security";

// Set with TTL and Tags
await Cache.set(
  "user:123",
  { name: "John", role: "admin" },
  {
    ttl: 3600000, // 1 hour
    priority: 8,
    tags: ["users", "admin"],
  }
);

// Get and Decrypt
const user = await Cache.get("user:123");`} />

      <SectionHeading level={2}>Advanced Management</SectionHeading>
      <div className="space-y-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm flex items-center gap-2"><Trash2 className="w-4 h-4" /> Tag-Based Invalidation</h5>
          <p className="text-[10px] text-slate-400 mb-2">Invalidate multiple entries at once using logical tags. Perfect for clearing user-specific or category-specific caches.</p>
          <CodeBlock language="typescript" code={`Cache.invalidateByTags(["users"]);`} />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm flex items-center gap-2"><Activity className="w-4 h-4" /> Performance Metrics</h5>
          <p className="text-[10px] text-slate-400 mb-2">Monitor cache efficiency with real-time hit rates and memory usage statistics.</p>
          <CodeBlock language="typescript" code={`const stats = Cache.getUltraStats;
console.log(\`Hit Rate: \${stats.hitRate}%\`);`} />
        </div>
      </div>

      <Callout type="warning" title="Transient Data Only">
        Entries with higher <code>priority</code> values (1-10) are protected during memory pressure, ensuring critical data remains cached longer than transient items.
      </Callout>

      <DocsFooter 
        title="Encryption Services"
        description="High-level data protection and hybrid encryption services."
        buttonText="Next: Encryption"
        href="/docs/security/xsec-m/encryption"
        iconName="Shield"
      />
    </div>
  );
}
