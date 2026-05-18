import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Shield,
  Lock,
  Zap,
  User,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
} from "lucide-react";
import Link from "next/link";

export default function EnvironmentPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Shield size={14} />
          System Module
        </div>
        <SectionHeading level={1}>Environment & Security Shield</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The{" "}
          <Link
            href="/docs/security/environment-shield?h=Environment%20Security%20Shield"
            className="text-primary"
          >
            XyPriss Environment API (
            <code className="text-primary">__sys__.__env__</code>)
          </Link>{" "}
          is the application's hardened Security Nervous System.
        </p>
      </div>

      <Callout type="warning" title="Security Restriction">
        Direct access to{" "}
        <code className="text-primary font-bold">process.env</code> is
        neutralized via a proxy. Third-party enumeration or unauthorized reads
        will return <code className="text-primary">undefined</code> and emit
        security warnings.
      </Callout>

      <Callout type="info" title="Configurable Shield">
        Starting from version 9.10.21, you can declaratively configure the <strong>Environment Security Shield (XESS)</strong> via your <code className="text-primary">xypriss.config.jsonc</code> to whitelist custom variables. See the{" "}
        <Link href="/docs/security/environment-shield#declarative-configuration" className="text-primary font-bold underline">
          XESS Configuration Guide
        </Link>{" "}
        for details.
      </Callout>

      <SectionHeading level={2} id="security-mechanisms">
        Security Mechanisms
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Lock size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Map-Isolated Storage
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Variables are stored in a global Map identified by an unexported
            Symbol. Access is strictly tied to the caller's project root,
            preventing cross-plugin leakage.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Shield size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Restrictive Proxy
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Standard <code className="text-xs">process.env</code> access is
            intercepted. Only whitelisted system-essential keys (PATH, PORT, USER, HOME, LANG) and
            internal prefixes (XYPRISS_, ENC_) are allowed by default.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <CheckCircle2 size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Value Sanitization
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Automatic rejection of values containing carriage returns (\r, \n)
            or null characters (\0), preventing log corruption and injection
            attacks.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <FolderTree size={20} />
            <h4 className="font-bold text-white uppercase tracking-wider text-sm">
              Deterministic Scoping
            </h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Modules can only access the .env of their closest parent project
            (detected via package.json + node_modules).
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="read-methods">
        Read Methods
      </SectionHeading>

      <div className="space-y-8 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2">
            .get(key, defaultValue?)
          </h4>
          <p className="text-muted-foreground mb-4">
            Retrieves a variable safely. If a{" "}
            <code className="text-primary">defaultValue</code> is provided,
            TypeScript correctly infers the return type as{" "}
            <code className="text-primary">string</code>.
          </p>
          <CodeBlock
            language="typescript"
            code={`const port = __sys__.__env__.get("PORT", "3000"); // Infers 'string'
const apiKey = __sys__.__env__.get("API_KEY");       // Infers 'string | undefined'`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2">
            .getStrict(key, options?)
          </h4>
          <p className="text-muted-foreground mb-4">
            The gold standard for production. Throws an{" "}
            <code className="text-primary">EnvAccessError</code> if the key is
            missing or empty, ensuring application integrity at startup.
          </p>
          <CodeBlock
            language="typescript"
            code={`// Throws if JWT_SECRET is missing
const secret = __sys__.__env__.getStrict("JWT_SECRET");

// Throws if DB_PASS is missing OR is an empty string ""
const pass = __sys__.__env__.getStrict("DB_PASS", { rejectEmpty: true });`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="execution-modes">
        Execution Context (Modes)
      </SectionHeading>
      <p className="mb-6">
        The environment mode is set once during initialization and is{" "}
        <code className="text-primary font-bold">readonly</code> to prevent
        runtime tampering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs">
            .isProduction()
          </div>
          <span className="text-sm text-muted-foreground">
            True if mode is "production"
          </span>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs">
            .isDevelopment()
          </div>
          <span className="text-sm text-muted-foreground">
            True if mode is "development"
          </span>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs">
            .isStaging()
          </div>
          <span className="text-sm text-muted-foreground">
            True if mode is "staging"
          </span>
        </div>
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="px-3 py-1 rounded bg-primary/10 text-primary font-mono text-xs">
            .isTest()
          </div>
          <span className="text-sm text-muted-foreground">
            True if mode is "test"
          </span>
        </div>
      </div>

      <SectionHeading level={2} id="native-utilities">
        Native Utilities
      </SectionHeading>

      <div className="my-6">
        <h4 className="text-sm font-bold mb-3 flex items-center gap-2">
          <User size={16} className="text-primary" />
          .user(): string
        </h4>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Synchronously queries the native XHSC process to retrieve the
          operating system username of the instance owner.
        </p>
        <CodeBlock
          language="typescript"
          code={`const actor = __sys__.__env__.user() || "anonymous";
auditLog.write({ actor, action: "initialization" });`}
        />
      </div>

      <Callout type="tip" title="Best Practice: Fail Fast">
        Use <code className="text-primary font-bold">getStrict()</code> in your
        main entry point. Catching a missing variable at boot is infinitely
        better than encountering a <code className="text-primary">null</code>{" "}
        error in a background worker 3 hours later.
      </Callout>

      <DocsFooter
        title="Filesystem Module"
        description="Explore the high-performance filesystem API powered by the XHSC engine."
        buttonText="Explore API"
        href="/docs/system/filesystem"
        iconName="FolderTree"
      />
    </div>
  );
}
