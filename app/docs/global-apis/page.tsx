import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocsFooter } from "@/components/docs/DocsFooter";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { Steps, Step } from "@/components/docs/Steps";
import { 
  Globe, 
  ShieldCheck, 
  Lock, 
  Terminal,
  Settings,
  Info
} from "lucide-react";

export default function GlobalAPIsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Globe size={14} />
          Runtime Environment
        </div>
        <SectionHeading level={1}>
          XyPriss Global Runtime APIs
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Centralized, type-safe, and secure access to system variables, configurations, and immutable constants across the entire application lifecycle.
        </p>
        <p>
          XyPriss introduces three primary global namespaces to the execution environment. These namespaces are injected into the <code>globalThis</code> context, making them accessible from any module without requiring explicit local imports, provided the framework has been initialized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
          <Terminal className="text-primary mb-4 transition-transform group-hover:scale-110" size={24} />
          <h4 className="font-bold mb-2">__sys__</h4>
          <p className="text-sm text-muted-foreground">
            Manages system-level metadata, environment variables, hardware telemetry, and high-performance filesystem operations.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
          <Settings className="text-primary mb-4 transition-transform group-hover:rotate-45" size={24} />
          <h4 className="font-bold mb-2">__cfg__</h4>
          <p className="text-sm text-muted-foreground">
            Acts as the single source of truth for server and plugin configurations with automated state propagation.
          </p>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
          <ShieldCheck className="text-primary mb-4 transition-transform group-hover:scale-110" size={24} />
          <h4 className="font-bold mb-2">__const__</h4>
          <p className="text-sm text-muted-foreground">
            Enforces strict data integrity through a global constants registry and recursive deep immutability proxies.
          </p>
        </div>
      </div>

      <SectionHeading level={2} id="sys">sys: System Runtime Environment</SectionHeading>
      <p>
        The <code>__sys__</code> object provides structured access to the application's runtime metadata and environment-specific utilities.
      </p>

      <SectionHeading level={3}>Core Properties</SectionHeading>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Property</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td className="px-4 py-3 font-mono text-primary">__version__</td>
              <td className="px-4 py-3 text-muted-foreground">The current semantic version of the application.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">__name__</td>
              <td className="px-4 py-3 text-muted-foreground">The unique identifier for the application instance.</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">__env__</td>
              <td className="px-4 py-3 text-muted-foreground">The current execution environment (e.g., "development", "production").</td>
            </tr>
            <tr>
              <td className="px-4 py-3 font-mono text-primary">__port__ / __PORT__</td>
              <td className="px-4 py-3 text-muted-foreground">Synchronized access to the primary server port.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <SectionHeading level={3}>Environment Management</SectionHeading>
      <p>
        The <code>__sys__.__env__</code> utility provides a type-safe wrapper around <code>process.env</code>:
      </p>
      <CodeBlock 
        language="typescript" 
        code={`// Retrieval with fallback
const apiKey = __sys__.__env__.get("API_KEY", "default_value");

// Existence verification
if (__sys__.__env__.has("DATABASE_URL")) {
    // Logic for database initialization
}`}
      />

      <SectionHeading level={2} id="cfg">cfg: Centralized Configuration Management</SectionHeading>
      <p>
        The <code>__cfg__</code> API is a singleton manager for the XyPriss Server Configuration (XPSC). It ensures that configuration updates are propagated correctly and that components always access the most recent state.
      </p>

      <div className="space-y-4 my-6">
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-mono text-primary text-sm font-bold">get(section)</h4>
          <p className="text-sm text-muted-foreground">Retrieves a specific configuration segment.</p>
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-mono text-primary text-sm font-bold">update(section, partialValue)</h4>
          <p className="text-sm text-muted-foreground">Performs a deep merge of the provided values into the existing configuration.</p>
        </div>
        <div className="flex flex-col gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.01]">
          <h4 className="font-mono text-primary text-sm font-bold">getAll()</h4>
          <p className="text-sm text-muted-foreground">Returns a snapshot of the entire configuration state.</p>
        </div>
      </div>

      <Callout type="warning" title="Integration with Immutability">
        When the server is initialized via <code>createServer</code>, the configuration managed by <code>__cfg__</code> is automatically transitioned into an immutable state using the <code>__const__</code> engine. Subsequent attempts to modify the configuration via <code>__cfg__.update()</code> will throw a runtime exception.
      </Callout>

      <SectionHeading level={2} id="const">const: Immutability Engine</SectionHeading>
      <p>
        The <code>__const__</code> API is the primary mechanism for enforcing data integrity within XyPriss. It serves two distinct purposes: managing a registry of named constants and creating deeply immutable object structures.
      </p>

      <SectionHeading level={3}>Named Constants Registry</SectionHeading>
      <p>Use <code>$set</code> to register a value that must remain unchanged for the duration of the process.</p>
      <CodeBlock 
        language="typescript" 
        code={`__const__.$set("MAX_RETRIES", 5);

// Attempting to redefine will throw an error
__const__.$set("MAX_RETRIES", 10); // Error: Cannot redefine constant "MAX_RETRIES"`}
      />

      <SectionHeading level={3}>Deep Immutability with $make</SectionHeading>
      <p>The <code>$make</code> method transforms an object, array, Map, or Set into a deeply immutable structure using recursive Proxies and <code>Object.freeze</code>.</p>
      <CodeBlock 
        language="typescript" 
        code={`const secureConfig = __const__.$make({
    security: {
        level: "high",
        roles: ["admin", "user"],
    },
});

// Any attempt to modify nested properties will fail
secureConfig.security.level = "low"; // Error: Cannot modify immutable property
secureConfig.security.roles.push("guest"); // Error: Cannot modify immutable array`}
      />

      <SectionHeading level={2} id="mechanics">Deep Immutability Mechanics</SectionHeading>
      <p>
        It is critical to distinguish between <strong>variable reassignment</strong> and <strong>object property modification</strong> when working with the Immutability Engine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-4">
          <h4 className="font-bold flex items-center gap-2">
            <Info size={18} className="text-blue-400" />
            Variable Reassignment
          </h4>
          <p className="text-sm text-muted-foreground">
            The <code>__const__.$make()</code> method returns an immutable Proxy. However, it cannot prevent the JavaScript engine from reassigning a variable declared with <code>let</code>.
          </p>
          <CodeBlock 
            language="typescript" 
            code={`let x = __const__.$make({ value: 10 });
x = 20; // Valid JS. Not intercepted.`}
          />
          <Callout type="tip" className="mt-auto">
            Always use the <code>const</code> keyword to prevent reassignment.
          </Callout>
        </div>
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-4">
          <h4 className="font-bold flex items-center gap-2 text-green-400">
            <Lock size={18} />
            Property Modification
          </h4>
          <p className="text-sm text-muted-foreground">
            The Immutability Engine intercepts operations that attempt to mutate the state of the object itself, including nested properties and arrays.
          </p>
          <CodeBlock 
            language="typescript" 
            code={`const x = __const__.$make({ value: 10 });
x.value = 20; // Throws Runtime Error.`}
          />
          <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4 mt-auto">
            <li>Property assignments/deletions</li>
            <li>Array mutations (push, pop, etc.)</li>
            <li>Map/Set mutations (set, add, etc.)</li>
          </ul>
        </div>
      </div>

      <SectionHeading level={2} id="initialization">Initialization and Availability</SectionHeading>
      <Steps>
        <Step title="In Application Code">
          <p>The global APIs are initialized automatically when any part of the XyPriss framework is imported.</p>
          <CodeBlock 
            language="typescript" 
            code={`import { createServer } from "xypriss";

// Globals are now available
console.log(__sys__.__version__);`}
          />
        </Step>
        <Step title="In Independent Scripts">
          <p>For scripts that do not initialize a full server instance, ensure the framework is loaded to register the globals.</p>
          <CodeBlock 
            language="typescript" 
            code={`import "xypriss"; // Side-effect import

const immutableData = __const__.$make({ key: "value" });`}
          />
        </Step>
        <Step title="Runtime Verification">
          <p>To verify if the globals are correctly registered, you can check their existence on <code>globalThis</code>.</p>
          <CodeBlock 
            language="typescript" 
            code={`if (typeof __const__ !== "undefined") {
    // Framework is initialized
}`}
          />
        </Step>
      </Steps>

      <DocsFooter 
        title="Deep Dive: XHSC Engine"
        description="Learn about the high-performance Go core that powers the underlying system capabilities of __sys__."
        buttonText="Go to XHSC"
        href="/docs/xhsc-core"
        iconName="Cpu"
      />
    </div>
  );
}
