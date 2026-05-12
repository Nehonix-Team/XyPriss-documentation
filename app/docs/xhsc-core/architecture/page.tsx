import { TechGraph } from "@/components/docs/TechGraph";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { DocsFooter } from "@/components/docs/DocsFooter";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { Steps, Step } from "@/components/docs/Steps";
import {
  Server,
  Zap,
  Cpu,
  Layers,
  Activity,
  Shield,
  ArrowRightLeft,
  Share2,
} from "lucide-react";

export default function ServerArchitecturePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Layers size={14} />
          Core Architecture
        </div>
        <SectionHeading level={1}>Server Core Architecture</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyPriss features a unique <strong>Hybrid Architecture</strong> that
          combines the raw performance of <strong>XHSC</strong> with the
          high-level productivity of <strong>TypeScript</strong>.
        </p>
        <p>
          This dual-core approach ensures microsecond routing latency while
          maintaining the rich ecosystem and developer experience of Node.js.
        </p>
      </div>

      <SectionHeading level={2} id="hybrid-strategy">
        The Hybrid Strategy
      </SectionHeading>
      <p>
        XyPriss is composed of two primary layers that work in tandem to deliver
        an enterprise-grade execution environment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Cpu size={24} />
            </div>
            <h4 className="font-bold text-lg">XHSC (Native Core)</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            The "hot path" of the server, implemented in Go for maximum
            throughput and predictable latency.
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground list-none">
            <li className="flex items-center gap-2">
              <Zap size={14} className="text-blue-400" /> Direct Network Stack
              (TCP/HTTP)
            </li>
            <li className="flex items-center gap-2">
              <Activity size={14} className="text-blue-400" /> Radix Tree
              Nano-Routing
            </li>
            <li className="flex items-center gap-2">
              <Server size={14} className="text-blue-400" /> Native Streaming
              File I/O
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Layers size={24} />
            </div>
            <h4 className="font-bold text-lg">TypeScript Layer</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            The application logic layer where developers define business rules
            and complex processing.
          </p>
          <ul className="text-sm space-y-2 text-muted-foreground list-none">
            <li className="flex items-center gap-2">
              <Shield size={14} className="text-primary" /> Enterprise Security
              Modules
            </li>
            <li className="flex items-center gap-2">
              <Share2 size={14} className="text-primary" /> Permission-based
              Plugin System
            </li>
            <li className="flex items-center gap-2">
              <ArrowRightLeft size={14} className="text-primary" /> High-speed
              IPC Bridge
            </li>
          </ul>
        </div>
      </div>

      <SectionHeading level={2} id="lifecycle">
        Request Lifecycle
      </SectionHeading>
      <p>
        The flow of a request through the hybrid stack is optimized for speed
        and reliability.
      </p>

      <TechGraph
        title="Hybrid Request Pipeline"
        badge="Data Flow Visualization"
        nodes={[
          {
            iconName: "Globe",
            title: "Ingress",
            subtitle: "Client Request",
            color: "blue",
          },
          {
            iconName: "Cpu",
            title: "XHSC",
            subtitle: "Handling ",
            color: "blue",
            active: true,
          },
          {
            iconName: "ArrowRightLeft",
            title: "IPC Bridge",
            subtitle: "Zero-Copy",
            color: "primary",
          },
          {
            iconName: "Layers",
            title: "Node.js",
            subtitle: "Business Logic",
            color: "purple",
          },
          {
            iconName: "Server",
            title: "Egress",
            subtitle: "Client Response",
            color: "purple",
          },
        ]}
        footer={[
          {
            label: "Native Domain",
            description: "Low-latency networking and I/O offloading in Go.",
            color: "blue",
          },
          {
            label: "Application Domain",
            description:
              "High-level security and logic orchestration in TypeScript.",
            color: "purple",
          },
        ]}
      />

      <Steps>
        <Step title="Ingress & Fast Match">
          <p>
            A request hits the <strong>XHSC</strong> engine, which immediately
            performs a Radix Tree lookup to identify the route with microsecond
            precision.
          </p>
        </Step>
        <Step title="Native Preprocessing">
          <p>
            If the request contains file uploads, XHSC parses the{" "}
            <code>multipart/form-data</code> and streams files directly to{" "}
            <code>[serverOptions.fileUpload.destination]</code>, offloading
            heavy I/O.
          </p>
        </Step>
        <Step title="IPC Dispatch">
          <p>
            The request metadata is bridged to the <strong>Node.js</strong>{" "}
            layer via a zero-copy optimized IPC mechanism.
          </p>
        </Step>
        <Step title="Enhancement">
          <p>
            Node.js decorates the raw message with <code>RequestEnhancer</code>{" "}
            and runs it.
          </p>
        </Step>
        <Step title="Handler & Egress">
          <p>
            The route handler executes, and the response is sent back through
            the bridge to XHSC for final delivery to the client.
          </p>
        </Step>
      </Steps>

      <SectionHeading level={2} id="components">
        Core Components
      </SectionHeading>
      <div className="space-y-6 my-6">
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-white flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            XHSCBridge
          </h4>
          <p className="text-sm text-muted-foreground pl-3.5">
            The specialized component in Node.js that manages the lifecycle of
            the XHSC binary and handles binary-level communication via Unix
            sockets.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-white flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            HttpServer (Virtual Server)
          </h4>
          <p className="text-sm text-muted-foreground pl-3.5">
            A virtualized server implementation that mimics the native Node.js{" "}
            <code>http.Server</code> API while delegating actual network
            listening to the native core.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-white flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Request & Response Enhancers
          </h4>
          <p className="text-sm text-muted-foreground pl-3.5">
            Modules that transform low-level IPC messages into feature-rich
            objects, providing methods like <code>res.json()</code>,{" "}
            <code>res.send()</code>, and cookie management.
          </p>
        </div>
      </div>

      <DocsFooter
        title="Explore Global APIs"
        description="Learn about the global runtime namespaces injected into the environment for system-wide accessibility."
        buttonText="Read Global APIs"
        href="/docs/global-apis"
        iconName="Rocket"
      />
    </div>
  );
}
