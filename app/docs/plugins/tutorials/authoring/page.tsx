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
        <SectionHeading level={1}>Creating & Publishing Plugins</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          The complete A-Z guide to building high-performance, cryptographically
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

      <SectionHeading level={2} id="bootstrap">
        Phase 1: Bootstrapping
      </SectionHeading>
      <p>
        Begin by creating a new directory. The community standard dictates
        prefixing your plugin name with <code>xypriss-plugin-</code>.
      </p>
      <Steps>
        <Step title="Initialize Project">
          <CodeBlock
            language="bash"
            code='xfpm init --name "xypriss-plugin-request-id"'
          />
        </Step>
        <Step title="Install Dependencies">
          <div className="space-y-4">
            <p className="text-xs text-muted-foreground italic">
              Add XyPriss as a peer dependency (<code>-R</code>) as it will be
              supplied by the host project.
            </p>
            <CodeBlock
              language="bash"
              code="xfpm add -D typescript @types/node
xfpm add -R xypriss
xfpm add nehoid"
            />
          </div>
        </Step>
      </Steps>

      <Callout type="warning" title="Mandatory Configuration">
        For XyPriss to recognize your directory, you <strong>must</strong>{" "}
        include a <code>xypriss.config.jsonc</code> file with{" "}
        <code>"type": "plugin"</code>. Use <code>$(pkg).name</code> to keep the
        ID synchronized with your <code>package.json</code>.
      </Callout>

      <SectionHeading level={2} id="authoring">
        Phase 2: Writing the Code
      </SectionHeading>
      <p>
        XyPriss highly encourages exporting a <strong>Plugin Factory</strong>.
        This allows users to pass configuration options during registration. For
        a deep dive into the available hooks (<code>onRequest</code>,{" "}
        <code>onResponse</code>, etc.), consult the{" "}
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
    const pkg = Plugin.manifest(__sys__);
    const headerName = options.headerName || "X-Request-ID";
    const generateId = options.generateId || (() => ID.generate());

    return Plugin.create({
        name: pkg.name,
        version: pkg.version,
        type: "NETWORK",
        onRequest(req, res, next) {
            const reqId = req.headers[headerName.toLowerCase()] || generateId();
            req.id = reqId;
            next();
        },
        onResponse(req, res) {
            if (req.id) res.setHeader(headerName, req.id);
        },
        onServerStart(server) {
            console.log(\`[Request-ID] Initialized on: \${headerName}\`);
        }
    }, __sys__.__root__);
}`}
        />
      </div>

      <SectionHeading level={2} id="permissions">
        Phase 3: Permission Discovery
      </SectionHeading>
      <p>
        Use the built-in discovery tool to identify exactly which permission IDs
        your hooks require.
      </p>

      <div className="space-y-4 my-6">
        <CodeBlock
          language="typescript"
          code={`// inspect.ts
import { Plugin } from "xypriss";
import { requestIdPlugin } from "./src";

Plugin.inspect(requestIdPlugin());
process.exit(0);`}
        />
        <CodeBlock language="bash" code="xfpm run inspect.ts" />
      </div>

      <SectionHeading level={2} id="signing">
        Phase 4: Security & Signing
      </SectionHeading>
      <p>G3 plugins must be cryptographically signed to prevent tampering.</p>

      <Steps>
        <Step title="Generate Identity">
          <p className="text-xs text-muted-foreground mb-2">
            Create your Ed25519 developer keypair.
          </p>
          <CodeBlock language="bash" code="xfpm gen-key" />
        </Step>
        <Step title="Sign Assets">
          <p className="text-xs text-muted-foreground mb-2">
            Generate the <code>xypriss.plugin.xsig</code> manifest.
          </p>
          <CodeBlock
            language="bash"
            code="xfpm sign ./ --min-version 1.0.0 --fix"
          />
        </Step>
      </Steps>

      <SectionHeading level={2} id="publication">
        Phase 5: Publication
      </SectionHeading>
      <p>
        Ensure your <code>package.json</code> is prepared and publish to the
        registry.
      </p>
      <CodeBlock language="bash" code="xfpm publish" />

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
