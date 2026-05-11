// lib/docs-config.ts
export type DocItem = { title: string; href: string; badge?: "new" | "beta" };
export type DocGroup = { title: string; items: DocItem[] };

export const docsConfig: DocGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core Architecture",
    items: [
      { title: "XHSC Core", href: "/docs/core/xhsc" },
      { title: "XStatic Engine", href: "/docs/core/xstatic" },
      { title: "Workspace System", href: "/docs/core/workspace" },
      { title: "Global APIs", href: "/docs/core/global-apis" },
      { title: "Constants Reference", href: "/docs/core/const-api" },
    ],
  },
  {
    title: "Security",
    items: [
      { title: "Security Overview", href: "/docs/security/overview" },
      { title: "XEMS Security", href: "/docs/security/xems" },
      { title: "Environment Shield", href: "/docs/security/environment-shield" },
      { title: "Honeypot Logic", href: "/docs/security/honeypot" },
    ],
  },
  {
    title: "Plugin System",
    items: [
      { title: "Overview", href: "/docs/plugins/overview" },
      { title: "Plugin Hooks", href: "/docs/plugins/api-reference" },
      { title: "Permission Sets", href: "/docs/plugins/permissions" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Overview", href: "/docs/api-reference" },
      { title: "Response Object", href: "/docs/api-reference/response" },
    ],
  },
];

export const flatDocs: DocItem[] = docsConfig.flatMap((g) => g.items);

export function getPagerLinks(href: string) {
  const idx = flatDocs.findIndex((d) => d.href === href);
  return {
    prev: idx > 0 ? flatDocs[idx - 1] : null,
    next: idx < flatDocs.length - 1 ? flatDocs[idx + 1] : null,
  };
}
