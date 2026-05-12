export const docsConfig = [
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
          { title: "Server Architecture", href: "/docs/xhsc-core/architecture" },
        ]
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
      { title: "Static Files (XStatic)", href: "/docs/server/static-files" },
      { title: "File Uploads", href: "/docs/server/file-uploads" },
      { title: "Response Control", href: "/docs/server/response-control" },
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
          { title: "Search & Patterns", href: "/docs/system/filesystem/search" },
          { title: "Archive & Compression", href: "/docs/system/filesystem/archive" },
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
        ]
      },
      { title: "Dynamic Variables", href: "/docs/system/vars" },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Environment Shield", href: "/docs/security/environment-shield" },
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
          { title: "Authoring Plugins", href: "/docs/plugins/tutorials/authoring" },
          { title: "Using Plugins", href: "/docs/plugins/tutorials/usage" },
        ]
      },
      { title: "Permissions", href: "/docs/plugins/permissions" },
      { title: "Built-in Plugins", href: "/docs/plugins/built-in" },
      { 
        title: "API Reference", 
        href: "/docs/plugins/api-reference",
        items: [
          { title: "Lifecycle Hooks", href: "/docs/plugins/api-reference/lifecycle" },
          { title: "HTTP Hooks", href: "/docs/plugins/api-reference/http" },
          { title: "Routing & Middleware", href: "/docs/plugins/api-reference/routing" },
          { title: "Logging & Ops", href: "/docs/plugins/api-reference/logging-ops" },
          { title: "Security Permissions", href: "/docs/plugins/api-reference/security" },
          { title: "Unified Hook Registry", href: "/docs/plugins/api-reference/hooks" },
        ]
      },
    ],
  },
  {
    title: "Community",
    items: [
      { title: "Contributing", href: "/docs/contributing" },
    ],
  },
];
