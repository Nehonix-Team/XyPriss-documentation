import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Layers, Activity, Search, Globe } from "lucide-react";
import Link from "next/link";

export default function OfficialPluginsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Official Plugins</SectionHeading>

      <p>
        The XyPriss team maintains a set of high-performance, security-hardened official plugins 
        designed to extend the core engine with production-critical features.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <Link 
          href="/docs/plugins/official/swagger"
          className="group block p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-primary/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:scale-110 transition-transform">
              <Search size={24} />
            </div>
            <h3 className="text-xl font-bold text-white m-0">XyPriss Swagger</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Auto-generate OpenAPI 3.0 documentation directly from your route registry 
            with zero configuration.
          </p>
        </Link>

        <Link 
          href="/docs/plugins/official/xyphra"
          className="group block p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-primary/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <h3 className="text-xl font-bold text-white m-0">Xyphra Logger</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            A native, high-performance logging engine with GDPR compliance 
            and automatic security redaction.
          </p>
        </Link>

        <Link 
          href="/docs/plugins/official/xynginc"
          className="group block p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-primary/20 transition-all"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400 group-hover:scale-110 transition-transform">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold text-white m-0">XyNginC</h3>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Automate Nginx reverse proxy and SSL certificate management with 
            production-ready security templates.
          </p>
        </Link>
      </div>

      <DocsFooter 
        title="Plugin Permissions"
        description="Learn how to secure your official and community plugins."
        buttonText="Next: Plugin Permissions"
        href="/docs/plugins/permissions"
        iconName="ShieldCheck"
      />
    </div>
  );
}
