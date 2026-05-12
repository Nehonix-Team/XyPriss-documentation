"use client"
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Steps, Step } from "@/components/ui/Steps";
import { BookOpen, ShieldCheck, Lock, Key, Zap, Activity, Terminal, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TutorialUsagePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <BookOpen size={14} />
          Step-by-Step Tutorial
        </div>
        <SectionHeading level={1}>Securing & Using Plugins</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learn how to install, verify, and authorize plugins using the XyPriss Zero-Trust capability model.
        </p>
      </div>

      <TechGraph 
        title="Trust Verification Flow"
        badge="Zero-Trust G3 Standard"
        nodes={[
          { iconName: "Terminal", title: "Install", subtitle: "xfpm install", color: "blue" },
          { iconName: "Key", title: "Trust", subtitle: "TOFU Verification", color: "primary", active: true },
          { iconName: "Lock", title: "Authorize", subtitle: "Capability Whitelist", color: "purple" },
          { iconName: "Activity", title: "Audit", subtitle: "Startup Integrity", color: "orange" }
        ]}
        footer={[
          { label: "TOFU", description: "Trust On First Use ensures you verify the author's public key.", color: "blue" },
          { label: "Sticky Denial", description: "Explicit denials always override allowed permissions.", color: "orange" }
        ]}
      />

      <SectionHeading level={2} id="installation">Step 1: Installation</SectionHeading>
      <p>
        Use XFPM to install plugins. This ensures native optimization and cryptographic verification.
      </p>
      <CodeBlock language="bash" code="xfpm install xypriss-plugin-rate-limiter" />

      <SectionHeading level={2} id="trust">Step 2: Author Verification (TOFU)</SectionHeading>
      <p>
        Upon first installation, XFPM triggers the <strong>Interactive Trust Flow</strong>. You must verify the author's Developer ID.
      </p>
      <div className="my-6 p-4 rounded-xl border border-white/10 bg-black/50 font-mono text-[10px] leading-relaxed">
        <p className="text-primary">[SECURITY] New plugin author detected: xypriss-plugin-rate-limiter</p>
        <p className="text-white/60">[SECURITY] Declared Author ID: ed25519:b2bd9a...cfd</p>
        <p className="mt-4 text-orange-400">⚠ ACTION REQUIRED:</p>
        <p className="text-white/40 italic">Paste the Developer ID here to confirm trust, or press Enter to cancel:</p>
      </div>
      <Callout type="warning" title="Prompt not appearing?">
        If the interactive prompt does not display in your terminal environment, you can use the interactive web dashboard to verify and authorize pending plugins automatically:
        <div className="mt-2">
          <CodeBlock language="bash" code="xfpm plugin verify -w" />
          <p className="mt-2 text-[10px] text-muted-foreground italic">
            Note: <code>-w</code> is a shortcut for <code>--html</code> which opens the premium verification UI.
          </p>
        </div>
      </Callout>

      <Callout type="info" title="Verification Tip">
        Cross-check the Developer ID against the author's official GitHub repository or homepage before pasting it into the prompt. Explore the <a href="/docs/xfpm#plugins" className="text-primary hover:underline font-bold">XFPM Plugin Management</a> section for advanced auditing and revocation tools.
      </Callout>

      <SectionHeading level={2} id="configuration">Step 3: Security Configuration</SectionHeading>
      <p>
        Authorize plugins explicitly in the <code>$internal</code> block of your <code>xypriss.config.jsonc</code>. For a technical breakdown of how routing namespaces are enforced, see the <button onClick={() => router.push("/docs/plugins/api-reference/routing")} className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline-flex items-center gap-1">Routing API Reference <ChevronRight size={12} /></button>.
      </p>
      <Callout type="tip" title="Automatic Configuration">
        If you used the interactive <strong>Interactive Trust Flow</strong> or the <code>xfpm plugin verify</code> command, XFPM has already automatically populated your configuration with the correct author signatures and default permissions. Manual editing is only required for granular permission tuning.
      </Callout>
      <div className="my-6">
        <CodeBlock 
          language="json"
          code={`{
    "$internal": {
        "xypriss-plugin-rate-limiter": {
            "signature": {
                "author_key": "ed25519:AuthorKeyFingerprint",
            },
            "permissions": {
                "allowedHooks": [
                    "XHS.HOOK.HTTP.REQUEST",
                    "XHS.PERM.SECURITY.SENSITIVE_DATA",
                ],
                "policy": "allow",
            },
        },
    },
}`}
        />
      </div>

      <SectionHeading level={2} id="registration">Step 4: Registration</SectionHeading>
      <p>Register the plugin in your main server initialization code.</p>
      <div className="my-6">
        <CodeBlock 
          language="typescript"
          code={`import { createServer } from "xypriss";
import { rateLimiter } from "xypriss-plugin-rate-limiter";

const app = await createServer({
    server: { port: 3000 },
    plugins: {
        register: [rateLimiter({ maxRequests: 100 })],
    },
});

app.start();`}
        />
      </div>

      <SectionHeading level={2} id="audit">Step 5: XHSC Startup Audit</SectionHeading>
      <p>
        Every time the engine starts, it performs a <strong>Deep Audit</strong> to re-verify file integrity and check for revocations.
      </p>
      
      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-green-500/10 bg-green-500/5">
          <h5 className="font-bold text-green-400 text-xs mb-2 flex items-center gap-2">
            <ShieldCheck size={14} />
            Integrity Check
          </h5>
          <p className="text-[10px] text-green-300/70">XyPriss re-calculates hashes for all plugin files to detect tampering.</p>
        </div>
        <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/5">
          <h5 className="font-bold text-red-400 text-xs mb-2 flex items-center gap-2">
            <Lock size={14} />
            Revocation Check
          </h5>
          <p className="text-[10px] text-red-300/70">The engine blocks startup if a revoked plugin version is detected.</p>
        </div>
      </div>

      <DocsFooter 
        title="Plugin Permissions"
        description="Deep dive into the granular capability model used by XyPriss."
        buttonText="View Permissions Guide"
        href="/docs/plugins/permissions"
        iconName="ShieldCheck"
      />
    </div>
  );
}
