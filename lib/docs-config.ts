import { DocT } from "./DocT";

export const docsConfig: DocT[] = [
  {
    title: "Start Here",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        title: "XHSC Engine",
        href: "/docs/xhsc-core",
        items: [
          {
            title: "Server Architecture",
            href: "/docs/xhsc-core/architecture",
          },
          { title: "XInS (Intelligent Scaling)", href: "/docs/xhsc-core/XInS" },
        ],
      },
      { title: "Global APIs", href: "/docs/global-apis" },
      { title: "XFPM CLI", href: "/docs/xfpm" },
    ],
  },
  {
    title: "HTTP Server",
    items: [
      { title: "Request & Response", href: "/docs/server/request-response" },
      { title: "XJSON API", href: "/docs/features/xjson" },
      { title: "Client IP Detection", href: "/docs/server/get-ip" },
      { title: "File Streaming", href: "/docs/server/send-file" },
      { title: "Structured Responses (Send)", href: "/docs/server/send" },
      { title: "Static Files (XStatic)", href: "/docs/server/static-files" },
      { title: "File Uploads", href: "/docs/server/file-uploads" },
      { title: "Response Control", href: "/docs/server/response-control" },
      {
        title: "NotFound vs Response Control",
        href: "/docs/server/notfound-vs-responsecontrol",
      },
    ],
  },
  {
    title: "Routing",
    items: [
      { title: "Overview", href: "/docs/routing" },
      { title: "Groups & Versioning", href: "/docs/routing/groups-versioning" },
      { title: "Parameters & Constraints", href: "/docs/routing/parameters" },
      { title: "Security Guards", href: "/docs/routing/guards" },
      { title: "Advanced Features", href: "/docs/routing/advanced" },
      { title: "Inspection", href: "/docs/routing/inspection" },
      { title: "Methods Reference", href: "/docs/routing/methods" },
    ],
  },
  {
    title: "Configuration",
    items: [
      { title: "Guide & Structure", href: "/docs/config/guide" },
      { title: "Network Engine", href: "/docs/config/network" },
      { title: "Configs API", href: "/docs/config/api" },
      { title: "Multi-Server Setup", href: "/docs/config/multi-server" },
      { title: "Meta Config (+meta)", href: "/docs/config/meta" },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Overview", href: "/docs/system" },
      { title: "Environment", href: "/docs/system/environment" },
      {
        title: "Filesystem",
        href: "/docs/system/filesystem",
        items: [
          { title: "Core Operations", href: "/docs/system/filesystem/core" },
          { title: "Helpers & Utils", href: "/docs/system/filesystem/helpers" },
          {
            title: "Search & Patterns",
            href: "/docs/system/filesystem/search",
          },
          {
            title: "Archive & Compression",
            href: "/docs/system/filesystem/archive",
          },
          { title: "File Watching", href: "/docs/system/filesystem/watch" },
          { title: "Security & Advanced", href: "/docs/system/filesystem/security" },
        ]
      },
      { title: "Path", href: "/docs/system/path" },
      { title: "Operating System", href: "/docs/system/os" },
      {
        title: "Utilities",
        href: "/docs/system/utils",
        items: [
          { title: "Strings", href: "/docs/system/utils/strings" },
          { title: "Numbers", href: "/docs/system/utils/numbers" },
          { title: "Dates", href: "/docs/system/utils/dates" },
          { title: "Data", href: "/docs/system/utils/data" },
          { title: "Logic", href: "/docs/system/utils/logic" },
          { title: "Primitives", href: "/docs/system/utils/primitives" },
        ],
      },
      { title: "Dynamic Variables", href: "/docs/system/vars" },
    ],
  },
  {
    title: "Cluster",
    items: [
      { title: "Overview", href: "/docs/cluster" },
      { title: "Configuration", href: "/docs/cluster/configuration" },
      { title: "Performance Tuning", href: "/docs/cluster/performance" },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Overview", href: "/docs/security/overview" },
      { title: "General Guide", href: "/docs/security/guide" },
      {
        title: "Environment Shield",
        href: "/docs/security/environment-shield",
      },
      { title: "Access Control", href: "/docs/security/access-control" },
      { title: "Content Security (CSP)", href: "/docs/security/csp" },
      { title: "CORS Policy", href: "/docs/security/cors" },
      { title: "CSRF Protection", href: "/docs/security/csrf" },
      { title: "Malicious URL Scanner", href: "/docs/security/malicious-url-scanner" },
      { title: "Rate Limiting", href: "/docs/security/rate-limiting" },
      { title: "Request Signatures", href: "/docs/security/signatures" },
      { title: "Route Security", href: "/docs/security/route-security" },
      { title: "Trust Proxy", href: "/docs/security/trust-proxy" },
      { title: "Honeypot & Tarpit", href: "/docs/security/honeypot" },
      {
        title: "Response Manipulation",
        href: "/docs/security/response-manipulation",
      },
      {
        title: "Security Module (XSec-M)",
        href: "/docs/security/xsec-m",
        items: [
          { title: "Core Primitives", href: "/docs/security/xsec-m/core" },
          {
            title: "Ed25519 Signatures",
            href: "/docs/security/xsec-m/ed25519",
          },
          {
            title: "RSA & Byte Utils",
            href: "/docs/security/xsec-m/rsa-utils",
          },
          { title: "Encryption", href: "/docs/security/xsec-m/encryption" },
          { title: "Utilities", href: "/docs/security/xsec-m/utils" },
        ],
      },
      {
        title: "XEMS",
        href: "/docs/security/xems",
        items: [
          { title: "Architecture", href: "/docs/security/xems/architecture" },
          { title: "Configuration", href: "/docs/security/xems/configuration" },
          { title: "Performance", href: "/docs/security/xems/performance" },
          { title: "Usage Guide", href: "/docs/security/xems/usage" },
          { title: "Tutorial", href: "/docs/security/xems/tutorial" },
        ],
      },
    ],
  },
  {
    title: "Plugins",
    items: [
      { title: "Overview", href: "/docs/plugins" },
      { title: "Workspace System", href: "/docs/plugins/workspace" },
      { title: "System Guide", href: "/docs/plugins/system-guide" },
      { title: "Development Guide", href: "/docs/plugins/development-guide" },
      {
        title: "Tutorials",
        href: "/docs/plugins/tutorials",
        items: [
          {
            title: "Authoring Plugins",
            href: "/docs/plugins/tutorials/authoring",
          },
          { title: "Using Plugins", href: "/docs/plugins/tutorials/usage" },
        ],
      },
      { title: "Permissions", href: "/docs/plugins/permissions" },
      { title: "Built-in Plugins", href: "/docs/plugins/built-in" },
      {
        title: "Official Plugins",
        href: "/docs/plugins/official",
        items: [
          { title: "XyPriss Swagger", href: "/docs/plugins/official/swagger" },
          { title: "Xyphra Logger", href: "/docs/plugins/official/xyphra" },
          {
            title: "XyNginC (Nginx)",
            href: "/docs/plugins/official/xynginc",
            items: [
              {
                title: "Installation",
                href: "/docs/plugins/official/xynginc/installation",
              },
              {
                title: "Build from Source",
                href: "/docs/plugins/official/xynginc/build",
              },
            ],
          },
        ],
      },
      {
        title: "API Reference",
        href: "/docs/plugins/api-reference",
        items: [
          {
            title: "Lifecycle Hooks",
            href: "/docs/plugins/api-reference/lifecycle",
          },
          { title: "HTTP Hooks", href: "/docs/plugins/api-reference/http" },
          {
            title: "Routing & Middleware",
            href: "/docs/plugins/api-reference/routing",
          },
          {
            title: "Logging & Ops",
            href: "/docs/plugins/api-reference/logging-ops",
          },
          {
            title: "Security Permissions",
            href: "/docs/plugins/api-reference/security",
          },
          {
            title: "Unified Hook Registry",
            href: "/docs/plugins/api-reference/hooks",
          },
        ],
      },
    ],
  },
  {
    title: "Performance",
    items: [{ title: "Benchmarks", href: "/docs/performance/benchmarks" }],
  },
  {
    title: "Community",
    items: [{ title: "Contributing", href: "/docs/contributing" }],
  },
];
