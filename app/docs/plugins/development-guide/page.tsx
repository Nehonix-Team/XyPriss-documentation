import React from "react";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { DocsFooter } from "@/components/docs/DocsFooter";
import { TechGraph } from "@/components/docs/TechGraph";
import { Steps, Step } from "@/components/docs/Steps";
import { Code, ShieldCheck, Box, Zap, Activity, Terminal, Layers } from "lucide-react";

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

  // Lifecycle hooks (Zero-Trust Restricted)
  onServerStart?: (server: PluginServer) => void | Promise<void>;
  onServerReady?: (server: PluginServer) => void | Promise<void>;
  onServerStop?: (server: PluginServer) => void | Promise<void>;

  // Request/Response hooks
  onRequest?: (req: Request, res: Response, next: NextFunction) => void;
  onResponse?: (req: Request, res: Response) => void;
  onError?: (error: Error, req: Request, res: Response, next: NextFunction) => void;

  // Route registration
  registerRoutes?: (app: UltraFastApp) => void;
}`}
        />
      </div>

      <SectionHeading level={2} id="getting-started">Getting Started</SectionHeading>
      <p>Follow these steps to create and register your first functional plugin.</p>

      <Steps>
        <Step title="Create the Plugin File">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Define your plugin using the <code>Plugin.create</code> factory to ensure full type safety and metadata validation.</p>
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
            <p className="text-sm text-muted-foreground">Register your plugin programmatically using the <code>Plugin.exec</code> API. This must occur before server creation to ensure correct hook ordering.</p>
            <CodeBlock 
              language="typescript"
              code={`import { createServer, Plugin } from "xypriss";
import { MyPlugin } from "./plugins/my-plugin";

// Register before server creation
Plugin.exec(MyPlugin);

const app = createServer({ server: { port: 3000 } });
app.start();`}
            />
          </div>
        </Step>
      </Steps>

      <SectionHeading level={2} id="advanced">Advanced Features</SectionHeading>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
            <Layers size={16} />
            Dependency Resolution
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Plugins can declare <code>dependencies</code>. The framework automatically resolves the execution order to ensure required resources are available.
          </p>
          <CodeBlock 
            language="typescript"
            code={`dependencies: ["database", "auth"]`}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
            <Zap size={16} />
            Plugin Factories
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Use <code>Plugin.factory</code> to create configurable plugins that can be instantiated with different parameters.
          </p>
          <CodeBlock 
            language="typescript"
            code={`export const createLogger = Plugin.factory<Config>((c) => ({ ... }));`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="security">Security Authorization</SectionHeading>
      <Callout type="warning" title="Zero-Trust Requirement">
        Lifecycle hooks (<code>onServerStart</code>, etc.) are restricted by default. To enable them, your plugin must be explicitly authorized in the <code>allowedHooks</code> security policy, or <code>allowLifecycleByDefault</code> must be enabled in server options.
      </Callout>

      <SectionHeading level={2} id="best-practices">Best Practices</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
            <ShieldCheck size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Atomic Init</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Ensure <code>onServerStart</code> only handles critical resource allocation. Heavy computations should be deferred to <code>onServerReady</code>.
          </p>
        </div>
        <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
            <Box size={20} />
          </div>
          <h4 className="font-bold text-white text-sm">Resource Disposal</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Always implement <code>onServerStop</code> to close database connections and flush buffers, preventing memory leaks on shutdown.
          </p>
        </div>
      </div>

      <DocsFooter 
        title="Plugin Permissions"
        description="Learn how to configure capability-based security for your plugins."
        buttonText="View Permissions Guide"
        href="/docs/plugins/permissions"
        iconName="ShieldCheck"
      />
    </div>
  );
}
