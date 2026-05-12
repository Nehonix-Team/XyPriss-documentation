import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { TechGraph } from "@/components/ui/TechGraph";
import { Steps, Step } from "@/components/ui/Steps";
import { Code, ShieldCheck, Box } from "lucide-react";

export default function PluginDevelopmentGuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Code size={14} />
          Authoring Guide
        </div>
        <SectionHeading level={1}>
          Plugin Development Guide
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Learn how to build, test, and publish professional XyPriss plugins. Extend the framework's core while leveraging its native security and performance features.
        </p>
      </div>

      <TechGraph 
        title="Plugin Lifecycle Flow"
        badge="Deterministic Execution"
        nodes={[
          { iconName: "Layers", title: "Register", subtitle: "onRegister", color: "blue" },
          { iconName: "Zap", title: "Initialize", subtitle: "onServerStart", color: "primary", active: true },
          { iconName: "Activity", title: "Ready", subtitle: "onServerReady", color: "purple" },
          { iconName: "Box", title: "Shutdown", subtitle: "onServerStop", color: "orange" }
        ]}
        footer={[
          { label: "Blocking Init", description: "onServerStart blocks startup until database/resources are ready.", color: "blue" },
          { label: "Cleanup", description: "onServerStop ensures graceful resource disposal on shutdown.", color: "orange" }
        ]}
      />

      <SectionHeading level={2} id="architecture">Plugin Structure</SectionHeading>
      <p>
        A XyPriss plugin is a structured object implementing the <code>XyPrissPlugin</code> interface. It combines metadata with lifecycle hooks and functional middleware.
      </p>

      <div className="my-6">
        <CodeBlock 
          language="typescript" 
          code={`interface XyPrissPlugin {
  name: string;
  version: string;
  description?: string;
  dependencies?: string[];

  // Lifecycle hooks (Sandboxed)
  onServerStart?: (server: PluginServer) => void | Promise<void>;
  onServerReady?: (server: PluginServer) => void | Promise<void>;
  onServerStop?: (server: PluginServer) => void | Promise<void>;

  // Functional hooks
  onRequest?: (req: Request, res: Response, next: NextFunction) => void;
  onResponse?: (req: Request, res: Response) => void;
  registerRoutes?: (app: UltraFastApp) => void;
}`}
        />
      </div>

      <SectionHeading level={2} id="getting-started">Getting Started</SectionHeading>
      <p>Follow these steps to create and register your first functional plugin.</p>

      <Steps>
        <Step title="Create the Plugin File">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Define your plugin using the <code>Plugin.create</code> factory to ensure full type safety.</p>
            <CodeBlock 
              language="typescript"
              code={`// plugins/my-plugin.ts
import { Plugin } from "xypriss";

export const MyPlugin = Plugin.create({
  name: "my-plugin",
  version: "1.0.0",
  onServerStart(server) {
    console.log("[MyPlugin] Initializing resources...");
  },
  registerRoutes(app) {
    app.get("/plugin/status", (req, res) => {
      res.json({ status: "active" });
    });
  }
});`}
            />
          </div>
        </Step>
        <Step title="Register the Plugin">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Register your plugin programmatically using the <code>Plugin.exec</code> API before starting the server.</p>
            <CodeBlock 
              language="typescript"
              code={`import { createServer, Plugin } from "xypriss";
import { MyPlugin } from "./plugins/my-plugin";

Plugin.exec(MyPlugin);

const app = createServer({ server: { port: 3000 } });
app.start();`}
            />
          </div>
        </Step>
      </Steps>

      <SectionHeading level={2} id="patterns">Authoring Patterns</SectionHeading>
      <p>
        XyPriss encourages the <strong>Plugin Factory</strong> pattern to allow users to pass configuration options during registration.
      </p>

      <div className="my-6">
        <CodeBlock 
          language="typescript"
          code={`export function myPlugin(options: MyOptions = {}) {
  // Retrieve manifest metadata from package.json automatically
  const pkg = Plugin.manifest(import.meta.url);

  return Plugin.create({
    name: pkg.name,
    version: pkg.version,
    onServerStart(server) {
      console.log(\`[\${pkg.name}] Initializing with options:\`, options);
    }
  });
}`}
        />
      </div>

      <SectionHeading level={2} id="permissions-discovery">Permission Discovery</SectionHeading>
      <p>
        Use the <code>Plugin.inspect()</code> tool to identify the exact permission IDs required by your hooks.
      </p>
      
      <div className="my-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
        <CodeBlock 
          language="bash"
          code={`xfpm run inspect.ts # Runs Plugin.inspect(myPlugin())`}
        />
        <p className="mt-2 text-[10px] text-muted-foreground italic">
          Output: Found 2 required permissions: XHS.HOOK.HTTP.REQUEST, XHS.HOOK.HTTP.RESPONSE.
        </p>
      </div>

      <SectionHeading level={2} id="signing">Security Identity & Signing</SectionHeading>
      <p>
        All G3 plugins must be cryptographically signed. This prevents code tampering and ensures non-repudiation.
      </p>

      <Steps>
        <Step title="Generate Identity">
          <p className="text-xs text-muted-foreground mb-2">Create your Ed25519 developer identity key.</p>
          <CodeBlock language="bash" code="xfpm gen-key" />
        </Step>
        <Step title="Sign Assets">
          <p className="text-xs text-muted-foreground mb-2">Generate the <code>xypriss.plugin.xsig</code> manifest.</p>
          <CodeBlock language="bash" code="xfpm sign ./ --min-version 1.0.0 --fix" />
        </Step>
      </Steps>

      <SectionHeading level={2} id="best-practices">Best Practices</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
            <ShieldCheck size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Error Handling</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Always handle errors in lifecycle hooks. Throwing an error in <code>onServerStart</code> will safely prevent the server from starting in a corrupted state.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
            <Box size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Resource Cleanup</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Use <code>onServerStop</code> to close database connections and flush logs. This prevents memory leaks and ensures clean process termination.
          </p>
        </div>
      </div>

      <Callout type="info" title="Performance Tip">
        Minimize heavy synchronous operations in <code>onRequest</code> and <code>onResponse</code> hooks. For high-throughput servers, offload complex processing to background workers or the <code>onServerReady</code> hook.
      </Callout>

      <DocsFooter 
        title="Built-in Plugins"
        description="Explore the production-grade official plugins provided by the XyPriss core."
        buttonText="View Official Plugins"
        href="/docs/plugins/built-in"
        iconName="Box"
      />
    </div>
  );
}
