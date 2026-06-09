"use client";

import React, { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import {
  Server,
  Layers,
  ShieldCheck,
  Zap,
  GitBranch,
  Network,
  Lock,
  BookOpen,
  ChevronRight,
  FolderTree,
  FileCode2,
  Folder,
  FileJson,
  FileType,
  Box,
} from "lucide-react";
import Link from "next/link";

const ARCHITECTURE_MODE = {
  SINGLE: "single",
  MULTI: "multi",
} as const;

type Mode = (typeof ARCHITECTURE_MODE)[keyof typeof ARCHITECTURE_MODE];

function TreeNode({
  name,
  icon: Icon,
  children,
  depth = 0,
}: {
  name: string;
  icon?: React.ElementType;
  children?: React.ReactNode;
  depth?: number;
}) {
  const hasChildren = Boolean(children);

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-white/[0.03] transition-colors"
        style={{ paddingLeft: depth * 16 }}
      >
        {hasChildren && <ChevronRight size={12} className="text-primary" />}
        {Icon && !hasChildren && (
          <span className="text-muted-foreground">
            {React.createElement(Icon, { size: 14 })}
          </span>
        )}
        {!hasChildren && (
          <span className="w-[10px] inline-block" />
        )}
        {hasChildren && (
          <span className="text-primary">
            <FolderTree size={14} />
          </span>
        )}
        <span className="text-xs text-slate-200">{name}</span>
      </div>
      {hasChildren && <div className="ml-3 border-l border-white/5 pl-2">{children}</div>}
    </div>
  );
}

function FileTree({ data }: { data: any[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      {data.map((node, idx) => (
        <TreeNode key={idx} name={node.name} icon={node.icon} depth={0}>
          {node.children?.map((child: any, cIdx: number) => (
            <TreeNode
              key={cIdx}
              name={child.name}
              icon={child.icon}
              depth={1}
            >
              {child.children?.map((grand: any, gIdx: number) => (
                <TreeNode
                  key={gIdx}
                  name={grand.name}
                  icon={grand.icon}
                  depth={2}
                />
              ))}
            </TreeNode>
          ))}
        </TreeNode>
      ))}
    </div>
  );
}

function ArchitectureCard({
  title,
  description,
  features,
  recommended,
  mode,
  onSelect,
}: {
  title: string;
  description: string;
  features: string[];
  recommended?: boolean;
  mode: Mode;
  onSelect: (mode: Mode) => void;
}) {
  return (
    <button
      onClick={() => onSelect(mode)}
      className={`w-full text-left p-6 rounded-2xl border transition-all group ${
        recommended
          ? "border-primary/30 bg-primary/5 hover:border-primary/50"
          : "border-white/10 bg-white/[0.02] hover:border-white/20"
      }`}
    >
      {recommended && (
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            Recommended
          </span>
        </div>
      )}
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>
      <ul className="space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
            <ChevronRight size={12} className="text-primary mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </button>
  );
}

export default function ArchitecturePage() {
  const [selectedMode, setSelectedMode] = React.useState<Mode>("multi");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <BookOpen size={14} />
          Architecture
        </div>
        <SectionHeading level={1}>
          Recommended XyPriss Project Architecture
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A production-ready structure for both single-server and multi-server
          deployments, designed for scalability, security, and maintainability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ArchitectureCard
          title="Single Server"
          description="Simplified architecture for small to medium applications. All logic runs in a single XyPriss instance with shared routing and plugins."
          features={[
            "Single process, single port",
            "Simplified debugging and local development",
            "Ideal for MVPs, internal tools, and micro-apps",
            "Lower operational overhead",
          ]}
          mode="single"
          onSelect={setSelectedMode}
        />
        <ArchitectureCard
          title="Multi-Server (Recommended)"
          description="Enterprise-grade separation of concerns. Run isolated server instances (e.g., public API + auth) within the same process, each with independent security policies and plugins."
          features={[
            "Network isolation between public and sensitive surfaces",
            "Independent security policies per instance",
            "Horizontal scaling per server type",
            "Production-ready for enterprise workloads",
          ]}
          recommended
          mode="multi"
          onSelect={setSelectedMode}
        />
      </div>

      {selectedMode === "single" && (
        <div className="flex flex-col gap-6">
          <SectionHeading level={2} id="single-overview">
            Single-Server Architecture
          </SectionHeading>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The single-server mode is the default XyPriss setup. It is perfect
            for applications that do not require network-level isolation
            between different surfaces (public API, admin panel, auth, etc.).
            Everything runs in one process with a unified router and shared
            plugins.
          </p>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 my-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Layers size={20} />
              </div>
              <h4 className="font-bold text-white text-sm">
                Unified Server Instance
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                  Entry Point
                </h5>
                <p className="text-[10px] text-muted-foreground">
                  <code className="text-primary">src/server.ts</code> creates
                  one instance via <code>createServer()</code>.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                  Router
                </h5>
                <p className="text-[10px] text-muted-foreground">
                  One root router aggregates all sub-routers (
                  <code>/api</code>, <code>/auth</code>, <code>/admin</code>).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h5 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
                  Security
                </h5>
                <p className="text-[10px] text-muted-foreground">
                  Global security config applies to all routes. Use guards for
                  fine-grained control.
                </p>
              </div>
            </div>
          </div>

            <Callout type="info" title="When to use Single Server">
              Use single-server mode when you are building an MVP, an internal
              tool, or a micro-service that does not need network-level isolation.
              It is simpler to debug, easier to deploy, and fully supports all
              XyPriss features (plugins, XEMS, XInS, XStatic).
            </Callout>

            <SectionHeading level={3} id="single-structure">
              Recommended Project Structure
            </SectionHeading>
            <FileTree
              data={[
                {
                  name: "my-xypriss-app",
                  icon: Folder,
                  children: [
                    { name: "package.json", icon: FileJson },
                    { name: "tsconfig.json", icon: FileType },
                    { name: "xypriss.config.jsonc", icon: FileJson },
                    {
                      name: "src",
                      icon: Folder,
                      children: [
                        { name: "server.ts", icon: FileCode2 },
                        {
                          name: "configs",
                          icon: Folder,
                          children: [{ name: "manifest.ts", icon: FileCode2 }],
                        },
                        {
                          name: "routers",
                          icon: Folder,
                          children: [
                            { name: "index.ts", icon: FileCode2 },
                            { name: "api.router.ts", icon: FileCode2 },
                            { name: "auth.router.ts", icon: FileCode2 },
                            { name: "admin.router.ts", icon: FileCode2 },
                          ],
                        },
                        {
                          name: "controllers",
                          icon: Folder,
                          children: [
                            {
                              name: "api",
                              icon: Folder,
                              children: [{ name: "books.controller.ts", icon: FileCode2 }],
                            },
                            {
                              name: "auth",
                              icon: Folder,
                              children: [{ name: "auth.controller.ts", icon: FileCode2 }],
                            },
                            {
                              name: "admin",
                              icon: Folder,
                              children: [{ name: "dashboard.controller.ts", icon: FileCode2 }],
                            },
                          ],
                        },
                        {
                          name: "middleware",
                          icon: Folder,
                          children: [{ name: "logger.ts", icon: FileCode2 }],
                        },
                        { name: "database", icon: Folder, children: [{ name: "db.ts", icon: FileCode2 }] },
                        { name: "schema", icon: Folder, children: [{ name: "schema.ts", icon: FileCode2 }] },
                      ],
                    },
                  ],
                },
              ]}
            />

          <SectionHeading level={3} id="single-flow">
            Initialization Flow
          </SectionHeading>
          <Steps>
            <Step title="Create Server">
              <CodeBlock
                language="typescript"
                code={`import { createServer } from "xypriss";

const app = createServer({
    // Global config (security, plugins, logging)
});`}
              />
            </Step>
            <Step title="Mount Root Router">
              <CodeBlock
                language="typescript"
                code={`import router from "./routers";

app.use("/", router);`}
              />
            </Step>
            <Step title="Start">
              <CodeBlock language="typescript" code="app.start();" />
            </Step>
          </Steps>
        </div>
      )}

      {selectedMode === "multi" && (
        <div className="flex flex-col gap-6">
          <SectionHeading level={2} id="multi-overview">
            Multi-Server Architecture
          </SectionHeading>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            XyPriss Multi-Server (XMS) allows you to run multiple isolated
            server instances within a single Node.js process. Each instance has
            its own port, security policy, plugin set, and route scope. This is
            the recommended architecture for production workloads that require
            separation between public access, authentication, and administrative
            surfaces.
          </p>

          <Callout type="info" title="Example Scope">
            The diagrams below show a two-server setup for clarity:{" "}
            <code className="text-primary">main</code> for the public API and{" "}
            <code className="text-primary">login</code> for authentication. The
            same pattern can be extended to additional servers (admin, webhooks,
            internal) as your surface area grows.
          </Callout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" /> main.server
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  Port: dynamic (assigned via config or manifest)
                </li>
                <li>
                  Prefix: <code className="text-primary">/api</code>
                </li>
                <li>Strategy: strict-match</li>
                <li>Routes: public API endpoints</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                <Lock size={16} className="text-primary" /> login.server
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  Port: <code className="text-primary">manifest.servers.login.port</code>
                </li>
                <li>
                  Prefix: <code className="text-primary">/auth</code>
                </li>
                <li>Plugins: superdev, Swagger (7289), Xyphra</li>
                <li>Routes: rate-limited GET /, POST /login</li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="How They Work Together">
            Both servers share the same underlying XHSC native engine but are
            fully isolated at the HTTP layer. The main server handles public API
            traffic, while the login server concentrates all authentication,
            session, and security-critical logic. Requests are routed by
            prefix: <code>/api/*</code> goes to{" "}
            <code className="text-primary">main.server</code>,{" "}
            <code>/auth/*</code> goes to{" "}
            <code className="text-primary">login.server</code>.
          </Callout>

          <SectionHeading level={3} id="multi-structure">
            Recommended Project Structure
          </SectionHeading>
          <FileTree
            data={[
              {
                name: "supperdev",
                icon: Folder,
                children: [
                  { name: "package.json", icon: FileJson },
                  { name: "tsconfig.json", icon: FileType },
                  { name: "xypriss.config.jsonc", icon: FileJson },
                  {
                    name: "src",
                    icon: Folder,
                    children: [
                      { name: "server.ts", icon: FileCode2 },
                      {
                        name: "configs",
                        icon: Folder,
                        children: [
                          { name: "manifest.ts", icon: FileCode2 },
                          { name: "xypriss.config.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "servers",
                        icon: Folder,
                        children: [
                          { name: "main.server.ts", icon: FileCode2 },
                          { name: "login.server.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "routers",
                        icon: Folder,
                        children: [
                          { name: "index.ts", icon: FileCode2 },
                          { name: "main.router.ts", icon: FileCode2 },
                          { name: "auth.router.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "controllers",
                        icon: Folder,
                        children: [
                          {
                            name: "main",
                            icon: Folder,
                            children: [{ name: "books.controller.ts", icon: FileCode2 }],
                          },
                          {
                            name: "auth",
                            icon: Folder,
                            children: [{ name: "auth.controller.ts", icon: FileCode2 }],
                          },
                        ],
                      },
                      { name: "plugins", icon: Folder, children: [] },
                      { name: "database", icon: Folder, children: [{ name: "db.ts", icon: FileCode2 }] },
                      { name: "schema", icon: Folder, children: [{ name: "schema.ts", icon: FileCode2 }] },
                    ],
                  },
                ],
              },
            ]}
          />

          <SectionHeading level={3} id="multi-flow">
            Initialization Flow
          </SectionHeading>
          <Steps>
            <Step title="Configure Multi-Server">
              <CodeBlock
                language="typescript"
                code={`// src/configs/xypriss.config.ts
export default {
    multiServer: {
        enabled: true,
        servers: [
            { id: "main", port: 3000, routePrefix: "/api", routePrefixStrategy: "strict" },
            { id: "login", port: 3001, routePrefix: "/auth", routePrefixStrategy: "strict" }
        ]
    }
};`}
              />
            </Step>
            <Step title="Create Server">
              <CodeBlock
                language="typescript"
                code={`import { createServer } from "xypriss";
import serverConfigs from "./configs/xypriss.config";

const app = createServer(serverConfigs);`}
              />
            </Step>
            <Step title="Mount Root Router">
              <CodeBlock
                language="typescript"
                code={`import router from "./routers";

app.use("/", router);`}
              />
            </Step>
            <Step title="Start">
              <CodeBlock
                language="typescript"
                code={`app.start(); // Boots both main & login instances`}
              />
            </Step>
          </Steps>

          <Callout type="success" title="Why This Architecture?">
            <strong>Security:</strong> The auth server can have stricter plugins
            (rate limiting, Swagger, Xyphra) without affecting the public API
            surface. <strong>Scalability:</strong> Each server can be scaled or
            deployed independently. <strong>Maintainability:</strong> Clear
            separation of concerns makes the codebase easier to navigate and
            test.
          </Callout>
        </div>
      )}

      <DocsFooter
        title="Multi-Server Setup"
        description="Configure per-instance response control and route isolation with XMS."
        buttonText="Multi-Server Docs"
        href="/docs/config/multi-server"
        iconName="Server"
      />
    </div>
  );
}
