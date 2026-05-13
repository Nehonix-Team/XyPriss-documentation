import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Layers, GitBranch, ShieldCheck, Zap } from "lucide-react";

export default function GroupsVersioningPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Groups & API Versioning</SectionHeading>

      <p>
        Route groups allow you to apply shared configuration—such as prefixes, 
        guards, and middleware—to a logical set of routes. This significantly 
        reduces boilerplate and enforces consistency across your API.
      </p>

      <SectionHeading level={2}>Basic Groups</SectionHeading>
      <p>
        Use <code>router.group()</code> to define a set of routes that share a 
        common URL prefix.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.group({ prefix: "/users" }, (group) => {
    group.get("/", (req, res) => res.success("User list"));
    group.post("/", (req, res) => res.success("User created"));
    group.get("/:id", (req, res) => res.success(\`User \${req.params.id}\`));
});
// Resulting paths: GET /users/, POST /users/, GET /users/:id`}
      />

      <SectionHeading level={2}>Nested Groups</SectionHeading>
      <p>
        Groups can be arbitrarily nested to produce complex hierarchical APIs with 
        overlapping shared logic.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.group({ prefix: "/api" }, (api) => {
    api.group({ prefix: "/v1" }, (v1) => {
        v1.get("/status", (req, res) => res.success("V1 OK"));
    });

    api.group({ prefix: "/v2" }, (v2) => {
        v2.get("/status", (req, res) => res.success("V2 OK"));
        v2.get("/users", (req, res) =>
            res.json({ users: [], meta: { page: 1 } }),
        );
    });
});
// Resulting paths: /api/v1/status, /api/v2/status, /api/v2/users`}
      />

      <SectionHeading level={2}>API Versioning</SectionHeading>
      <p>
        XyPriss provides a semantic shorthand for versioned APIs, ensuring 
        consistency and readability.
      </p>

      <SectionHeading level={3}>Using <code>router.version()</code></SectionHeading>
      <CodeBlock
        language="typescript"
        code={`router.version("v1", (r) => {
    r.get("/users", (req, res) => res.success("V1 Users"));
});

router.version("v2", (r) => {
    r.get("/users", (req, res) => res.success("V2 Users"));
});
// Paths: /v1/users, /v2/users`}
      />

      <Callout type="tip" title="Path Order">
        When both <code>prefix</code> and <code>version</code> are provided in a 
        group config, the version is always prepended to the prefix: 
        <code>/&#123;version&#125;/&#123;prefix&#125;</code>.
      </Callout>

      <SectionHeading level={2}>Group Guards & Security</SectionHeading>
      <p>
        Security guards applied at the group level are automatically inherited by 
        every route within that group. This is the recommended approach for 
        protecting entire API namespaces.
      </p>
      <CodeBlock
        language="typescript"
        code={`const adminGuard = (req: any, _res: any) => {
    if (req.user?.role === "admin") return true;
    return "Admin access required";
};

router.group(
    {
        prefix: "/admin",
        guards: [adminGuard],
    },
    (admin) => {
        admin.get("/dashboard", (req, res) => res.success("Admin dashboard"));
        admin.get("/users", (req, res) => res.json({ users: [] }));
        // adminGuard runs before BOTH routes
    },
);`}
      />

      <DocsFooter
        title="Parameters & Constraints"
        description="Learn how to handle dynamic parameters, regex constraints, and query parsing."
        buttonText="Next: Parameters"
        href="/docs/routing/parameters"
        iconName="Activity"
      />
    </div>
  );
}
