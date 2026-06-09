"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Steps, Step } from "@/components/ui/Steps";
import { BookOpen, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TutorialAuthoringPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <BookOpen size={14} />
          Step-by-Step Tutorial
        </div>
        <SectionHeading level={1}>
          Creating & Publishing Plugins (A-Z)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The complete guide to building high-performance, cryptographically
          signed plugins for the XyPriss ecosystem.
        </p>
      </div>

      <TechGraph
        title="Authoring Lifecycle"
        badge="Zero-Trust G3 Standard"
        nodes={[
          {
            iconName: "Terminal",
            title: "Bootstrap",
            subtitle: "xfpm init",
            color: "blue",
          },
          {
            iconName: "Code",
            title: "Develop",
            subtitle: "Plugin Factory",
            color: "primary",
            active: true,
          },
          {
            iconName: "Key",
            title: "Sign",
            subtitle: "Ed25519 xsig",
            color: "purple",
          },
          {
            iconName: "Package",
            title: "Publish",
            subtitle: "xfpm publish",
            color: "orange",
          },
        ]}
        footer={[
          {
            label: "Deterministic",
            description: "Every production file is SHA-256 hashed and signed.",
            color: "blue",
          },
          {
            label: "Verified",
            description: "XFPM ensures minimum engine version compatibility.",
            color: "purple",
          },
        ]}
      />

      <Callout type="info" title="Shortcut: scaffold with XFPM">
        You can skip the manual bootstrapping steps below by using the built-in
        XFPM plugin initializer. It will generate the complete project structure
        (config, <code>src/index.ts</code>, tests, and signing metadata) for
        you:
        <CodeBlock
          language="bash"
          code="xfpm init PLUGIN_NAME PLUGIN=true"
        />
        After that, jump straight to Phase 3 (Permissions) or Phase 5
        (Signing/Publishing).
      </Callout>

      <SectionHeading level={2} id="bootstrap">
        Phase 1: Bootstrapping the Project
      </SectionHeading>
      <p>
        Create a new directory for your plugin. The community standard dictates
        prefixing your plugin name with <code>xypriss-plugin-</code>. Let{"'"}s
        build a simple {"Request ID"} injector.
      </p>

      <Steps>
        <Step title="Initialize Project">
          <CodeBlock
            language="bash"
            code='xfpm init --name "xypriss-plugin-request-id"'
          />
          <p className="text-xs text-muted-foreground mt-2 italic">
            Or use the shortcut:{" "}
            <code className="text-primary">
              xfpm init PLUGIN_NAME PLUGIN=true
            </code>
          </p>
        </Step>
        <Step title="Install Dependencies">
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground italic">
              Add XyPriss as a peer dependency (<code>-R</code>) as it will be
              supplied by the host project.
            </p>
            <CodeBlock
              language="bash"
              code="xfpm add -D typescript @types/node\nxfpm add -R xypriss\nxfpm add nehoid"
            />
          </div>
        </Step>
        <Step title="Initialize TypeScript">
          <CodeBlock language="bash" code="npx tsc --init" />
        </Step>
      </Steps>

      <Callout type="warning" title="Mandatory Configuration">
        For XyPriss to recognize your directory, you <strong>must</strong>{" "}
        include a <code>xypriss.config.jsonc</code> file with{" "}
        <code>{'"'}type{'"'}: {'"'}plugin{'"'}</code>. Use{" "}
        <code>{'&'}(pkg).name</code> to keep the ID synchronized with your{" "}
        <code>package.json</code>.
      </Callout>

      <SectionHeading level={2} id="authoring">
        Phase 2: Writing the Plugin Code
      </SectionHeading>
      <p>
        XyPriss highly encourages exporting a <strong>Plugin Factory</strong>.
        This allows users to pass configuration options during registration. For
        a deep dive into the available hooks (
        <code>onRequest</code>, <code>onResponse</code>, etc.), consult the{" "}
        <button
          onClick={() => router.push("/docs/plugins/api-reference")}
          className="text-primary hover:underline bg-transparent border-none p-0 cursor-pointer font-bold inline-flex items-center gap-1"
        >
          API Reference <ChevronRight size={12} />
        </button>
        .
      </p>

      <div className="my-6">
        <CodeBlock
          language="typescript"
          code={`import { Plugin, PluginServer, Request, Response, NextFunction } from "xypriss";
import { ID } from "nehoid";

export interface RequestIdOptions {
    headerName?: string;
    generateId?: () => string;
}

export function requestIdPlugin(options: RequestIdOptions = {}) {
    const pkg = Plugin.manifest<{
        name: string;
        version: string;
        description: string;
    }>(__sys__);

    const headerName = options.headerName || "X-Request-ID";
    const generateId = options.generateId || (() => ID.generate());

    return Plugin.create(
        {
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
            type: "NETWORK",

            onRequest(req: Request, res: Response, next: NextFunction) {
                const existingId = req.headers[headerName.toLowerCase()];
                const reqId = existingId || generateId();
                req.id = reqId;
                next();
            },

            onResponse(req: Request, res: Response) {
                if (req.id) {
                    res.setHeader(headerName, req.id);
                }
            },

            onServerStart(server: PluginServer) {
                console.log(
                    \`[Request-ID] Plugin initialized. Listening on header: \${headerName}\`,
                );
            },
        },
        __sys__.__root__,
    );
}`}
        />
      </div>

      <Callout type="warning" title="Important Authoring Rules">
        <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
          <li>
            <strong>Never mutate the app instance</strong>: If you try to do{" "}
            <code>server.app.myCustomProp = true</code> inside{" "}
            <code>onServerStart</code>, the XyPriss security proxy will throw a
            fatal mutation error.
          </li>
          <li>
            <strong>Handle Next</strong>: If you use <code>onRequest</code>,
            you <strong>must</strong> call <code>next()</code>.
          </li>
          <li>
            <strong>Respect Performance</strong>: Keep your{" "}
            <code>onRequest</code> and <code>onResponse</code> logic synchronous
            and lightweight (under 7ms).
          </li>
          <li>
            <strong>Zero-Trust Model</strong>: <code>ON_REQUEST</code>,{" "}
            <code>ON_RESPONSE</code>, and sensitive data access (
            <code>ACCESS_SENSITIVE_DATA</code>) are deeply privileged actions.
            Document in your plugin{"'"}s README that users must explicitly grant
            these permissions.
          </li>
        </ul>
      </Callout>

      <SectionHeading level={2} id="permissions">
        Phase 3: Permission Discovery & Configuration
      </SectionHeading>
      <p>
        XyPriss G3 uses a Zero-Trust security model. Your plugin{" "}
        <strong>must</strong> declare every permission it intends to use in its{" "}
        <code>package.json</code>. If a hook is implemented but not declared,
        the engine will block its execution.
      </p>

      <SectionHeading level={3}>
        Identify Required Permissions with Plugin.inspect()
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Instead of guessing which permission IDs correspond to your hooks,
        XyPriss provides a built-in discovery tool.
      </p>

      <div className="space-y-4 my-6">
        <CodeBlock
          language="typescript"
          code={`// inspect.ts
import { Plugin } from "xypriss";
import { requestIdPlugin } from "./src";

// Run the deep-scan inspector
Plugin.inspect(requestIdPlugin());
process.exit(0);`}
        />
        <CodeBlock language="bash" code="xfpm run inspect.ts" />
      </div>

      <Callout type="info" title="Example Output">
        <CodeBlock
          language="text"
          code={`══════════════════════════════════════════════════
[XyPriss Plugin Inspector] xypriss-plugin-request-id v1.0.0
══════════════════════════════════════════════════
Detected Hooks & Authorized Permission IDs:

  ○ Hook/Capability: onRequest
    ID:   XHS.HOOK.HTTP.REQUEST ⚠️  [PRIVILEGED]
    Role: intercept and process incoming requests

  ○ Hook/Capability: onResponse
    ID:   XHS.HOOK.HTTP.RESPONSE ⚠️  [PRIVILEGED]
    Role: intercept and process outgoing responses

Summary: Found 2 required permissions.
══════════════════════════════════════════════════`}
        />
      </Callout>

      <SectionHeading level={3}>Update package.json</SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Copy the IDs found by the inspector into your <code>package.json</code>{" "}
        under the <code>xfpm.permissions</code> field.
      </p>
      <CodeBlock
        language="json"
        code={`{
    "name": "xypriss-plugin-request-id",
    "version": "1.0.0",
    "xfpm": {
        "permissions": [
            "XHS.HOOK.HTTP.REQUEST",
            "XHS.HOOK.HTTP.RESPONSE"
        ]
    }
}`}
      />

      <SectionHeading level={2} id="testing">
        Phase 4: Testing & Documentation
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Before publishing, verify your plugin in a real environment and prepare
        user documentation.
      </p>

      <SectionHeading level={3}>Local Testing</SectionHeading>
      <p className="text-xs text-muted-foreground mb-2">
        Create a <code>test-server.ts</code> file in your root to verify the
        plugin{"'"}s behavior.
      </p>

      <SectionHeading level={3}>User Documentation (README.md)</SectionHeading>
      <p className="text-xs text-muted-foreground mb-2">
        You <strong>must</strong> show users how to grant your plugin the
        required permissions in their <code>xypriss.config.jsonc</code> file.
        Use the following syntax to keep the ID synchronized:
      </p>
      <CodeBlock
        language="jsonc"
        code={`{
    "$internal": {
        // Users must use the explicit package name of your plugin
        // to grant permissions in their own project configuration.
        "xypriss-plugin-request-id": {
            "permissions": {
                "allowedHooks": [
                    "XHS.HOOK.HTTP.REQUEST",
                    "XHS.HOOK.HTTP.RESPONSE",
                ],
                "policy": "allow",
            },
        },
    },
}`}
      />

      <SectionHeading level={2} id="signing">
        Phase 5: Security Identity & Signing
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyPriss G3 requires all plugins to be cryptographically signed. This
        prevents code tampering and ensures that only trusted authors can
        interact with the framework{"'"}s core.
      </p>

      <Steps>
        <Step title="Generate Your Developer Identity">
          <p className="text-xs text-muted-foreground mb-2">
            If you are a new author, generate your Ed25519 identity key. This
            only needs to be done once per machine.
          </p>
          <CodeBlock language="bash" code="xfpm gen-key" />
          <Callout type="warning" title="Important">
            You <strong>MUST</strong> include the resulting Public Key
            (Developer ID) in your plugin{"'"}s official README. Users will use
            it to verify your identity during installation.
          </Callout>
        </Step>
        <Step title="Sign the Assets">
          <p className="text-xs text-muted-foreground mb-2">
            Generate the <code>xypriss.plugin.xsig</code> manifest.
          </p>
          <CodeBlock
            language="bash"
            code="xfpm sign -p package.json -m 1.0.0"
          />
          <Callout type="info" title="Auto-Correction with --fix">
            To avoid manual errors, XFPM can automatically fix your manifest.
            Using the <code>--fix</code> flag will create missing config files,
            inject required metadata, and de-duplicate permissions
            automatically.
            <CodeBlock
              language="bash"
              code="xfpm sign -p package.json --min-version 1.0.0 --fix"
            />
          </Callout>
        </Step>
      </Steps>

      <Callout type="danger" title="Pre-Sign Checklist (XFPM Validations)">
        Before running the signature command, ensure you have respected these
        engine requirements:
        <ol className="list-decimal pl-6 space-y-1 text-sm text-muted-foreground mt-2">
          <li>
            <strong>Configuration File</strong>:{" "}
            <code>xypriss.config.jsonc</code> must exist in the root and contain
            the mandatory <code>$internal[{"&"}(pkg).name] = {"{"}"type": "plugin"{ "}"}</code> block.
          </li>
          <li>
            <strong>File References</strong>: EVERY file or glob pattern listed
            in the <code>files</code> array of your <code>package.json</code>{" "}
            MUST exist on disk.
          </li>
          <li>
            <strong>Signature Export</strong>: The exact string{" "}
            <code>"xypriss.plugin.xsig"</code> MUST be explicitly listed in the{" "}
            <code>files</code> array of your <code>package.json</code> so it
            gets published.
          </li>
          <li>
            <strong>Permissions Validity</strong>: Ensure there are no duplicate
            entries in the <code>xfpm.permissions</code> array, and that you
            only request valid XHS permission IDs.
          </li>
        </ol>
      </Callout>

      <SectionHeading level={2} id="publication">
        Phase 6: Publication
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
        Ensure your <code>package.json</code> includes the correct entry points
        and build scripts:
      </p>
      <CodeBlock
        language="json"
        code={`{
    "name": "xypriss-plugin-request-id",
    "version": "1.0.0",
    "main": "dist/index.js",
    "types": "dist/index.d.ts",
    "scripts": {
        "build": "tsc",
        "prepublishOnly": "xfpm run build && xfpm sign ./"
    }
}`}
      />
      <p className="text-xs text-muted-foreground mt-2">
        Then publish to the registry:
      </p>
      <CodeBlock language="bash" code="xfpm publish" />

      <SectionHeading level={2} id="maintenance">
        Phase 7: Maintenance & Revocation
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        If you discover a critical security vulnerability or if your private key
        is compromised, you must immediately revoke the affected versions.
      </p>
      <ol className="list-decimal pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong>Generate a Revocation Manifest</strong>: Use the{" "}
          <code>xfpm revoke</code> command (refer to the XFPM Security Guide).
        </li>
        <li>
          <strong>Publish a New Version</strong>: Update your plugin and
          publish. The XyPriss G3 engine will automatically block the execution
          of the revoked versions in the next audit cycle.
        </li>
      </ol>

      <DocsFooter
        title="Usage Tutorial"
        description="Learn how to install and secure plugins in your XyPriss projects."
        buttonText="View Usage Tutorial"
        href="/docs/plugins/tutorials/usage"
        iconName="Rocket"
      />
    </div>
  );
}
