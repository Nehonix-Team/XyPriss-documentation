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
    title: "Security",
    items: [
      { title: "Environment Shield", href: "/docs/security/environment-shield" },
    ],
  },
  {
    title: "Plugins",
    items: [
      { title: "Overview", href: "/docs/plugins" },
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
