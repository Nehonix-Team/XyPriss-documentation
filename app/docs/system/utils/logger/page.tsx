import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import {
  Terminal,
  Zap,
  Clock,
  Layers,
  GitBranch,
  FileCode2,
} from "lucide-react";

export default function LoggerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Terminal size={14} />
          System Utilities
        </div>
        <SectionHeading level={1}>
          System Logger (`__sys__.utils.log`)
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A structured, colorful, and high-performance console logger built into
          XyPriss. Access it globally via <code>__sys__.utils.log</code> or
          create scoped instances with <code>__sys__.utils.createLogger()</code>.
        </p>
      </div>

      <SectionHeading level={2} id="quick-start">Quick Start</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        The global logger is ready to use anywhere in your application without
        configuration:
      </p>
      <CodeBlock
        language="typescript"
        title="Basic logging"
        code={`// Global logger — zero config
__sys__.utils.log.info("Application ready");
__sys__.utils.log.success("Database connected");
__sys__.utils.log.warn("High memory usage", { memory: "1.2GB" });
__sys__.utils.log.error("Failed to parse request", new Error("Invalid JSON"));`}
      />

      <Callout type="info" title="Why use the system logger?">
        Unlike <code>console.log</code>, the system logger provides structured
        levels, ANSI-colored output, optional namespaces, timers, and child
        loggers — all with zero external dependencies.
      </Callout>

      <SectionHeading level={2} id="scoped-loggers">Creating a Scoped Logger</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        For larger applications, namespaced loggers make it easy to filter
        console output by module or layer:
      </p>
      <CodeBlock
        language="typescript"
        code={`const log = __sys__.utils.createLogger({
  namespace: "Auth",
  minLevel: "debug"
});

log.debug("Authenticating user...");
log.success("User logged in successfully");`}
      />

      <SectionHeading level={3} id="options">Options</SectionHeading>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5 my-6">
        <table className="w-full text-sm text-left">
          <thead className="bg-white/10 text-xs uppercase font-bold text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Option</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Default</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { o: "namespace", t: "string", d: "Prefix shown in every log line (e.g., [Auth]).", def: '""' },
              { o: "minLevel", t: "LogLevel", d: "Minimum level to display.", def: '"debug"' },
              { o: "timestamps", t: "boolean", d: "Include an ISO timestamp in every line.", def: "true" },
              { o: "plain", t: "boolean", d: "Emit plain text with no ANSI colors (ideal for CI/CD).", def: "false" },
            ].map((opt, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-mono text-primary text-xs">{opt.o}</td>
                <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">{opt.t}</td>
                <td className="px-4 py-3 text-[10px] text-muted-foreground font-mono">{opt.def}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{opt.d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SectionHeading level={2} id="advanced">Advanced Features</SectionHeading>

      <SectionHeading level={3} id="timers">Timers</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Measure execution time with <code>.time()</code>. It returns a stop
        function that automatically logs the elapsed time in milliseconds:
      </p>
      <CodeBlock
        language="typescript"
        code={`const stopTimer = __sys__.utils.log.time("Database query");

// Execute operations...
await fetchUsersFromDatabase();

// Outputs: ✅ [MyApp] Database query — 42.15 ms
stopTimer();`}
      />

      <SectionHeading level={3} id="grouping">Grouping</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Visually separate sequential logs under a labeled header block:
      </p>
      <CodeBlock
        language="typescript"
        code={`__sys__.utils.log.group("Bootstrap Sequence", () => {
  __sys__.utils.log.info("Loading environment variables...");
  __sys__.utils.log.info("Initializing cache...");
  __sys__.utils.log.success("Bootstrap complete");
});`}
      />

      <SectionHeading level={3} id="child-loggers">Child Loggers</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Inherit configuration from an existing logger and extend its namespace:
      </p>
      <CodeBlock
        language="typescript"
        code={`const baseLog = __sys__.utils.createLogger({ namespace: "Core" });
const networkLog = baseLog.child("Network"); // Namespace becomes "Core:Network"

networkLog.warn("Connection timeout");`}
      />

      <SectionHeading level={3} id="formatting">Formatting Extra Arguments</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Extra arguments (objects, arrays, errors) are automatically formatted
        for readability:
      </p>
      <CodeBlock
        language="typescript"
        code={`__sys__.utils.log.warn("Rate limit approaching", {
    userId: "u_123",
    remaining: 5,
    resetIn: "2m"
});`}
      />

      <Callout type="tip" title="Production tip">
        Use <code>minLevel: "warn"</code> in production to reduce noise. Use{" "}
        <code>plain: true</code> when writing logs to files or CI/CD pipelines
        where ANSI colors are not supported.
      </Callout>

      <DocsFooter
        title="System Environment"
        description="Explore other system utilities exposed through the __sys__ global."
        buttonText="System Overview"
        href="/docs/system"
        iconName="Terminal"
      />
    </div>
  );
}
