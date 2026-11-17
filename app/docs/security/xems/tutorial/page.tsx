import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { ShieldCheck, Zap, Lock, Cpu, Database, Activity, Key, LogIn, LogOut, Shield, Layers } from "lucide-react";

export default function XEMSTutorialPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Security Tutorial
        </div>
        <SectionHeading level={1}>XEMS Tutorial: High-Security Session Management</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learn how to implement enterprise-grade, hardware-bound authentication and session management using XEMS (XyPriss Entry Management System).
        </p>
      </div>

      <Callout type="info" title="Field Revision Notice — XyPriss 9.12.60 (XEMS Core 1.1.22)">
        <p className="leading-relaxed">
          This major architectural revision reflects extensive real-world testing and production feedback. 
          Available starting from <strong>XyPriss 9.12.60</strong> (powered by <strong>XEMS Core v1.1.22</strong>).
        </p>
      </Callout>

      <SectionHeading level={2} id="native-helpers">
        1. Native Session Helpers Overview
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyPriss abstracts the underlying Go sidecar and cryptographic vault behind three elegant, built-in response and request helpers:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
            <LogIn size={16} className="text-primary" />
            res.xLink(data, options?)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Initiates an authenticated session, encrypts the payload inside the hardware-bound <code className="text-primary font-mono">.xems</code> vault, and issues the <code className="text-primary font-mono">HttpOnly</code> cookie and tracking header.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
            <Key size={16} className="text-primary" />
            req.session
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Automatically resolves, decrypts, and attaches the active session payload for incoming requests carrying valid cookies or headers.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
            <LogOut size={16} className="text-primary" />
            res.xUnlink(options?)
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Instantly purges the session from the Go encrypted vault store and expires the client cookie.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="server-config">
        2. Server Configuration
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Declare your XEMS configuration in your server definition or <code className="text-primary font-mono">xypriss.config.ts</code>:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { createServer, __sys__ } from "xypriss";

export const app = createServer({
    server: {
        xems: {
            enable: true,
            path: __sys__.path.resolve("vault.xems"), // Native __sys__.path API recommended
            secret: process.env.XEMS_SECRET!,         // Min 32-byte master key
            ttl: "7d",                                // Expiration (max 7 days)
            autoRotation: "1m",                       // Sliding window rotation
            gracePeriod: 15000,                       // 15 seconds grace overlap
            cookieName: "xems_token",
            cookieOptions: {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
            },
        },
    },
});`}
      />

      <SectionHeading level={2} id="auth-flow">
        3. Real-World Authentication Flow
      </SectionHeading>

      <div className="flex flex-col gap-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <LogIn size={16} className="text-primary" />
            A. Login: Creating a Session (res.xLink)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            When credentials are verified, call <code className="text-primary font-mono">await res.xLink(sessionData)</code>. XEMS generates an opaque cryptographic token and transparently sends the <code className="text-primary font-mono">Set-Cookie</code> header:
          </p>
          <CodeBlock
            language="typescript"
            code={`import { Router } from "xypriss";

const authRouter = new Router();

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await authenticateUser(email, password);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    // 🔐 Initiate secure XEMS session
    await res.xLink({
        userId: user.id,
        tenantId: user.tenantId,
        role: user.role,
        email: user.email,
    });

    return res.status(200).json({
        success: true,
        message: "Login successful",
        user: { id: user.id, email: user.email, role: user.role },
    });
});`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Shield size={16} className="text-primary" />
            B. Route Protection &amp; Guards (req.session)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Incoming requests with valid session cookies automatically have their decrypted payload attached to <code className="text-primary font-mono">req.session</code>:
          </p>
          <CodeBlock
            language="typescript"
            code={`// authGuard.ts
export const authGuard = (req: any, res: any) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    return true; // Access granted
};

// Protected router
const apiRouter = new Router();

apiRouter.get("/profile", { guards: [authGuard] }, async (req, res) => {
    // req.session is decrypted and ready
    return res.json({
        userId: req.session.userId,
        role: req.session.role,
    });
});`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <LogOut size={16} className="text-primary" />
            C. Logout: Destroying the Session (res.xUnlink)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Call <code className="text-primary font-mono">await res.xUnlink()</code> to destroy the session. It purges the key from the Go encrypted memory store and expires the client cookie:
          </p>
          <CodeBlock
            language="typescript"
            code={`authRouter.post("/logout", async (req, res) => {
    // 🗑️ Terminate session in Go vault & expire client cookie
    await res.xUnlink();

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="sandboxes">
        4. Multi-Tenant &amp; Custom Sandboxes
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Partition sessions into separate isolated namespaces (sandboxes) at runtime for multi-tenant applications or elevated privilege modes:
      </p>

      <CodeBlock
        language="typescript"
        code={`// Link to a specific organization or admin sandbox
await res.xLink(adminData, {
    sandbox: \`org.\${user.tenantId}\`,
    ttl: "12h",
});

// Destroy session in a specific sandbox
await res.xUnlink({ sandbox: \`org.\${user.tenantId}\` });`}
      />

      <SectionHeading level={2} id="best-practices">
        5. Security Best Practices
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
          <h4 className="font-bold text-white text-xs flex items-center gap-2">
            <Zap size={14} className="text-primary" /> SPAs &amp; Concurrent Requests
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Always configure <code className="text-primary font-mono">autoRotation: "1m"</code> and a generous <code className="text-primary font-mono">gracePeriod</code> (15s) so parallel API calls do not trigger race conditions.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
          <h4 className="font-bold text-white text-xs flex items-center gap-2">
            <Key size={14} className="text-primary" /> Key Security
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Keep <code className="text-primary font-mono">XEMS_SECRET</code> (min 32 bytes) strictly in environment variables. Never hardcode master keys.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-2">
          <h4 className="font-bold text-white text-xs flex items-center gap-2">
            <Lock size={14} className="text-primary" /> Hardware Locking
          </h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            The generated <code className="text-primary font-mono">.xems</code> vault is cryptographically bound to the server HWID and file path, making stolen database files unreadable to attackers.
          </p>
        </div>
      </div>

      <DocsFooter
        title="XEMS Configuration"
        description="Review all XEMS configuration options, hardware binding, and transport settings."
        buttonText="View Configuration"
        href="/docs/security/xems/configuration"
        iconName="Settings"
      />
    </div>
  );
}
