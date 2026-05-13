import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { ShieldCheck, Zap, Lock, Cpu, Database, Activity, Terminal, Key } from "lucide-react";

export default function XEMSTutorialPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Tutorial: Secure Auth with XEMS</SectionHeading>
      
      <p>This tutorial details the implementation of advanced authentication systems using the <strong>XyPriss Encrypted Memory Store (XEMS)</strong>. Learn how to leverage native isolation and atomic rotation for enterprise-grade security.</p>

      <SectionHeading level={2}>1. Session API Fundamentals</SectionHeading>
      <p>Unlike simple key/value storage, the XEMS session layer manages opaque tokens and their entire lifecycle, including automatic encryption and resolution.</p>
      
      <div className="space-y-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm">Creating a Session</h5>
          <CodeBlock language="typescript" code={`const runner = xems.forApp(app);
const token = await runner.createSession(
    "auth-pending",
    { email: "user@example.com", mfa_verified: false },
    { ttl: "15m" }
);`} />
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-1 text-sm">Resolution & Rotation</h5>
          <CodeBlock language="typescript" code={`const session = await runner.resolveSession(token, {
    sandbox: "auth-pending",
    rotate: true,       // Generate a new token atomically
    gracePeriod: 2000,  // 2s overlap for concurrent requests
});`} />
        </div>
      </div>

      <SectionHeading level={2}>2. Implementing MFA Workflow</SectionHeading>
      <p>A secure multi-factor authentication flow involves migrating data between sandboxes as verification steps are completed.</p>

      <Steps>
        <Step title="Initial Authentication">
          Verify password and create a temporary session in the <code>otp-pending</code> sandbox.
        </Step>
        <Step title="OTP Verification">
          When the OTP is valid, migrate the user data to a permanent active session using <code>xLink</code>.
        </Step>
      </Steps>

      <CodeBlock language="typescript" title="MFA Verification Handler" code={`router.post("/mfa/verify", async (req, res) => {
    const runner = xems.forApp(req.app);
    const tempSession = await runner.from("otp-pending").get(req.body.tempToken);

    if (isOtpValid(req.body.code)) {
        // High-level API handles cookie injection and final session linking
        await res.xLink({ userId: tempSession.userId, role: "admin" });
        
        // Cleanup the temporary sandbox
        await runner.from("otp-pending").del(req.body.tempToken);
    }
});`} />

      <SectionHeading level={2}>3. Security Best Practices</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Lock className="w-4 h-4" /> Persistence Secret
          </div>
          <p className="text-[10px] text-slate-400 m-0">The secret must be exactly <strong>32 bytes</strong>. Use environment variables and rotate them periodically for maximum security.</p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
            <Database className="w-4 h-4" /> Frontend Isolation
          </div>
          <p className="text-[10px] text-slate-400 m-0">Let XyPriss manage tokens via <code>HttpOnly</code> cookies. Never expose session tokens to client-side JavaScript.</p>
        </div>
      </div>

      <Callout type="warning" title="Concurrency Note">
        Always set a <code>gracePeriod</code> when using token rotation. This prevents race conditions where one of several concurrent requests invalidates the token before others finish.
      </Callout>

      <DocsFooter 
        title="Plugins Overview"
        description="Extend XyPriss with custom functionality using the modular plugin system."
        buttonText="Next: Plugins"
        href="/docs/plugins"
        iconName="Zap"
      />
    </div>
  );
}
