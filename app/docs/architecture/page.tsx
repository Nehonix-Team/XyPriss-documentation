"use client";

import React, { useState, useCallback } from "react";
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

      <Callout type="tip" title="Quick Bootstrap with xfpm init">
        The sections below walk through the manual setup to explain how each
        layer fits together. To scaffold this clean, pre-configured architecture
        automatically in seconds, run:
        <div className="mt-3">
          <CodeBlock language="bash" code="xfpm init" />
        </div>
      </Callout>

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
                        { name: "router.ts", icon: FileCode2 },
                        {
                          name: "configs",
                          icon: Folder,
                          children: [
                            { name: "xypriss.config.ts", icon: FileCode2 },
                            { name: "manifest.ts", icon: FileCode2 },
                            { name: "db.ts", icon: FileCode2 },
                          ],
                        },
                        {
                          name: "routes",
                          icon: Folder,
                          children: [
                            { name: "api.route.ts", icon: FileCode2 },
                            { name: "auth.route.ts", icon: FileCode2 },
                          ],
                        },
                        {
                          name: "controller",
                          icon: Folder,
                          children: [
                            { name: "api.controller.ts", icon: FileCode2 },
                            { name: "auth.controller.ts", icon: FileCode2 },
                          ],
                        },
                        {
                          name: "services",
                          icon: Folder,
                          children: [
                            { name: "api.service.ts", icon: FileCode2 },
                            { name: "auth.service.ts", icon: FileCode2 },
                          ],
                        },
                        {
                          name: "guards",
                          icon: Folder,
                          children: [
                            { name: "index.guard.ts", icon: FileCode2 },
                            { name: "auth.guard.ts", icon: FileCode2 },
                          ],
                        },
                        { name: "schemas", icon: Folder, children: [{ name: "auth.schema.ts", icon: FileCode2 }] },
                        { name: "db", icon: Folder, children: [{ name: "schema.ts", icon: FileCode2 }] },
                        { name: "const", icon: Folder, children: [{ name: "timeout.ts", icon: FileCode2 }] },
                        { name: "types", icon: Folder, children: [{ name: "all.ts", icon: FileCode2 }] },
                        { name: "utils", icon: Folder, children: [{ name: "crypto.ts", icon: FileCode2 }] },
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
import { serverConfigs } from "./configs/xypriss.config";
import { guardsRunner } from "./guards/index.guard";

const app = createServer(serverConfigs);
guardsRunner();`}
              />
            </Step>
            <Step title="Mount Root Router">
              <CodeBlock
                language="typescript"
                code={`import { router } from "./router";

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

          <Callout type="info" title="Enterprise Modular XMS Topology">
            The recommended multi-server setup splits the application into three
            dedicated nodes resolved from{" "}
            <code className="text-primary">xypriss.config.jsonc</code>:{" "}
            <code className="text-primary">api</code> (primary REST API),{" "}
            <code className="text-primary">auth</code> (authentication &amp;
            identity), and <code className="text-primary">cdn</code> (media
            &amp; sandboxed static assets).
          </Callout>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                <Server size={16} className="text-primary" /> api.server.ts
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  Node: <code className="text-primary">servers.main</code>
                </li>
                <li>
                  Prefix: <code className="text-primary">/api</code>,{" "}
                  <code className="text-primary">/</code>
                </li>
                <li>Scope: Core REST API &amp; business services</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                <Lock size={16} className="text-primary" /> auth.server.ts
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  Node: <code className="text-primary">servers.auth</code>
                </li>
                <li>
                  Prefix: <code className="text-primary">/auth</code>,{" "}
                  <code className="text-primary">/api</code>
                </li>
                <li>Scope: Login, registration, RBAC &amp; tokens</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" /> cdn.server.ts
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  Node: <code className="text-primary">servers.cdn</code>
                </li>
                <li>
                  Prefix: <code className="text-primary">/cdn</code>
                </li>
                <li>Scope: XStatic sandboxed uploads &amp; media</li>
              </ul>
            </div>
          </div>

          <Callout type="info" title="How They Work Together">
            All three server nodes share the underlying native XHSC engine
            while remaining isolated at the HTTP and security boundary layer.{" "}
            <code className="text-primary">src/router.ts</code> dispatches
            requests by both URL prefix and{" "}
            <code className="text-primary">serverId</code>:{" "}
            <code>/api/*</code> to <code className="text-primary">mainServer</code>,{" "}
            <code>/auth/*</code> to <code className="text-primary">authServer</code>,
            and <code>/cdn/*</code> to <code className="text-primary">cdnServer</code>.
          </Callout>

          <SectionHeading level={3} id="multi-structure">
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
                      { name: "router.ts", icon: FileCode2 },
                      {
                        name: "configs",
                        icon: Folder,
                        children: [
                          { name: "xypriss.config.ts", icon: FileCode2 },
                          { name: "servers.config.ts", icon: FileCode2 },
                          { name: "manifest.ts", icon: FileCode2 },
                          { name: "xemsConfigs.ts", icon: FileCode2 },
                          { name: "db.ts", icon: FileCode2 },
                          { name: "db.prisma.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "servers",
                        icon: Folder,
                        children: [
                          { name: "api.server.ts", icon: FileCode2 },
                          { name: "auth.server.ts", icon: FileCode2 },
                          { name: "cdn.server.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "routes",
                        icon: Folder,
                        children: [
                          { name: "api.route.ts", icon: FileCode2 },
                          { name: "auth.route.ts", icon: FileCode2 },
                          { name: "cdn.route.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "controller",
                        icon: Folder,
                        children: [
                          { name: "api.controller.ts", icon: FileCode2 },
                          { name: "auth.controller.ts", icon: FileCode2 },
                          { name: "cdn.controller.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "services",
                        icon: Folder,
                        children: [
                          { name: "api.service.ts", icon: FileCode2 },
                          { name: "auth.service.ts", icon: FileCode2 },
                          { name: "cdn.service.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "guards",
                        icon: Folder,
                        children: [
                          { name: "index.guard.ts", icon: FileCode2 },
                          { name: "auth.guard.ts", icon: FileCode2 },
                          { name: "roles.guard.ts", icon: FileCode2 },
                        ],
                      },
                      { name: "db", icon: Folder, children: [{ name: "schema.ts", icon: FileCode2 }] },
                      { name: "schemas", icon: Folder, children: [{ name: "auth.schema.ts", icon: FileCode2 }] },
                      { name: "types", icon: Folder, children: [{ name: "all.ts", icon: FileCode2 }] },
                      {
                        name: "const",
                        icon: Folder,
                        children: [
                          { name: "cdnPaths.ts", icon: FileCode2 },
                          { name: "corsOrigins.ts", icon: FileCode2 },
                          { name: "csrfCfg.ts", icon: FileCode2 },
                          { name: "responseC.ts", icon: FileCode2 },
                          { name: "timeout.ts", icon: FileCode2 },
                        ],
                      },
                      {
                        name: "utils",
                        icon: Folder,
                        children: [
                          { name: "crypto.ts", icon: FileCode2 },
                          { name: "fs.ts", icon: FileCode2 },
                          { name: "obj.ts", icon: FileCode2 },
                          { name: "path.ts", icon: FileCode2 },
                        ],
                      },
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
            <Step title="Declare Environment & Server Topology (xypriss.config.jsonc)">
              <CodeBlock
                language="jsonc"
                code={`// xypriss.config.jsonc
{
  "$env": {
    "whitelist": ["NODE_ENV", "PORT"]
  },
  "$vars": {
    "servers": {
      "auth": { "port": "&(env).AUTH_SERVER_PORT || 9182", "id": "&(env).AUTH_DOMAIN || rest.auth.domain.com" },
      "main": { "port": "&(env).MAIN_SERVER_PORT || 1822", "id": "&(env).MAIN_DOMAIN || rest.api.domain.com" },
      "cdn": { "port": "&(env).CDN_SERVER_PORT || 5829", "id": "&(env).CDN_DOMAIN || rest.cdn.domain.com" }
    }
  }
}`}
              />
            </Step>
            <Step title="Bind Multi-Server Router (src/router.ts)">
              <CodeBlock
                language="typescript"
                code={`// src/router.ts
import { Router } from "xypriss";
import { apiRouter } from "./routes/api.route";
import { authRouter } from "./routes/auth.route";
import { cdnRouter } from "./routes/cdn.route";
import { mainServer } from "./servers/api.server";
import { authServer } from "./servers/auth.server";
import { cdnServer } from "./servers/cdn.server";

const r = Router();

r.group({ prefix: ["/api", "/"], serverId: mainServer.id }, (api) => {
  api.use("/", apiRouter);
});

r.group({ prefix: ["/auth", "/api"], serverId: authServer.id }, (auth) => {
  auth.use("/", authRouter);
});

r.group({ prefix: "/cdn", serverId: cdnServer.id }, (cdn) => {
  cdn.use("/", cdnRouter);
});

export { r as router };`}
              />
            </Step>
            <Step title="Bootstrap Guards, Router, XStatic & Start (src/server.ts)">
              <CodeBlock
                language="typescript"
                code={`// src/server.ts
import { createServer, XStatic } from "xypriss";
import { serverConfigs } from "./configs/xypriss.config";
import { router } from "./router";
import { guardsRunner } from "./guards/index.guard";
import { permanentCdnPath, publicCdnPath, publicCdnTmpPath } from "./const/cdnPaths";

const app = createServer(serverConfigs);

// 1. Register global XyGuard rules
guardsRunner();

// 2. Mount central multi-server routing topology
app.use("/", router);

// 3. Sandboxed static asset & temp upload delivery via XStatic
const xs = new XStatic(app, __sys__);
xs.define(publicCdnTmpPath, __sys__.path.tmpUserDir, {
  allowOutsideRoot: true,
  allowOutsideDir: false,
});
xs.define(publicCdnPath, permanentCdnPath, {
  allowOutsideRoot: false,
  allowOutsideDir: false,
});

// 4. Start all configured XMS server nodes
app.start();`}
              />
            </Step>
          </Steps>

          <Callout type="success" title="Why This Architecture?">
            <strong>Strict Separation of Concerns:</strong> Routes, controllers,
            services, guards, and schemas live in dedicated layers.{" "}
            <strong>Zero-Trust by Default:</strong> Environment access is
            whitelisted in <code>xypriss.config.jsonc</code>, guards are
            registered globally via <code>XyGuard</code>, and temporary storage
            is sandboxed inside <code>__sys__.path.tmpUserDir</code> with{" "}
            <code>XStatic</code>.
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
