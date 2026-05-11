"use client";

import React from "react";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { Steps, Step } from "@/components/docs/Steps";
import { DocsFooter } from "@/components/docs/DocsFooter";
import { Zap, Terminal, Code2, Rocket, Globe, Shield, Cpu } from "lucide-react";

export default function QuickStartPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Zap size={14} />
          Fast Track
        </div>
        <SectionHeading level={1}>Quick Start Guide</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Launch your first XyPriss server in minutes using the CLI or manual
          setup.
        </p>
      </div>

      <SectionHeading level={2} id="cli-method">
        Method 1: Using XyPriss CLI (Recommended)
      </SectionHeading>
      <p>
        The CLI provides the fastest way to initialize a production-ready
        project with all the necessary boilerplate.
      </p>

      <Steps>
        <Step title="Initialize the project">
          <p className="mb-4">
            Run the following command to start the interactive project setup:
          </p>
          <CodeBlock language="bash" code="xfpm init" />
        </Step>
        <Step title="Verification and Install">
          <p className="mb-4">
            Navigate to your project directory. While <code>xfpm init</code> usually handles dependency installation, you can run this manually if the process was interrupted (network failure, crash, etc.):
          </p>
          <CodeBlock language="bash" code="cd my-app && xfpm install" />
        </Step>
        <Step title="Start development">
          <p className="mb-4">
            Launch the development server with hot-reload enabled:
          </p>
          <CodeBlock language="bash" code="xfpm dev" />
        </Step>
      </Steps>

      <Callout type="tip" title="CLI Features">
        The CLI automatically configures TypeScript, security headers, and can
        optionally set up authentication and file upload support.
      </Callout>

      <SectionHeading level={2} id="manual-method">
        Method 2: Manual Setup
      </SectionHeading>
      <p>
        If you prefer to build from scratch, you can install the `xypriss`
        package manually.
      </p>

      <CodeBlock
        language="bash"
        title="Install Core Package"
        code="xfpm install xypriss"
      />

      <SectionHeading level={3} id="basic-server">
        Create a Basic Server
      </SectionHeading>
      <p>
        Create an `index.ts` file and add the following code to initialize a
        secure server:
      </p>

      <CodeBlock
        language="typescript"
        title="index.ts"
        code={`import { createServer } from "xypriss";

const app = createServer({
    server: { port: 3000 },
    security: { enabled: true },
});

app.get("/", (req, res) => {
    res.success("Hello from XyPriss Stable");
});

app.start();`}
      />

      <SectionHeading level={2} id="advanced-features">
        Advanced Features
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="text-primary" size={20} />
            <h4 className="font-bold">Typed Routing</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Native support for typed path parameters and API versioning.
          </p>
          <CodeBlock
            language="typescript"
            code={`app.version("v1", (v1) => {
  v1.get("/user/:id<number>", (req, res) => {
    res.success(\`User \${req.params.id}\`);
  });
});`}
          />
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="text-primary" size={20} />
            <h4 className="font-bold">Multi-Server</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Run multiple isolated server instances from a single process.
          </p>
          <CodeBlock
            language="typescript"
            code={`const app = createServer({
  multiServer: {
    enabled: true,
    servers: [
      { id: "api", port: 3001 },
      { id: "admin", port: 3002 }
    ]
  }
});`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="running">
        Running your app
      </SectionHeading>
      <p>
        Always use <code>xfpm run</code> to execute your scripts and entry points.
      </p>
      <CodeBlock language="bash" code="xfpm dev" />

      <Callout type="danger" title="Unsupported Runtimes">
        Using `npm run` or `node` directly is not supported and will cause
        undefined behavior due to the native engine requirements.
      </Callout>

      <DocsFooter 
        title="Deep Dive into XHSC"
        description="Learn how the native Go-core handles routing, security, and performance at the lowest level."
        buttonText="Explore XHSC Core"
        href="/docs/xhsc-core"
        iconName="Cpu"
      />
    </div>
  );
}
