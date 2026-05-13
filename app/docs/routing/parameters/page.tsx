import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Brackets, Terminal, Hash, Shield, Search } from "lucide-react";

export default function ParametersConstraintsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Parameters & Constraints</SectionHeading>

      <p>
        XyPriss Router V2 supports dynamic path segments with optional inline Regex 
        constraints and type-safe shortcuts, all enforced at the routing layer.
      </p>

      <SectionHeading level={2}>Path Parameters</SectionHeading>
      <p>
        Parameters are defined using the <code>:name</code> prefix and are 
        accessible via <code>req.params</code>.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.json({ userId });
});

// Multiple parameters
router.get("/posts/:year/:month/:slug", (req, res) => {
    const { year, month, slug } = req.params;
    res.json({ year, month, slug });
});`}
      />

      <SectionHeading level={2}>Regex Constraints</SectionHeading>
      <p>
        You can enforce a specific format on a parameter directly in the path 
        definition using standard Regular Expressions.
      </p>
      <CodeBlock
        language="typescript"
        code={`// Only matches when 'id' consists of digits
router.get("/users/:id(\\\\d+)", (req, res) => {
    res.json({ userId: req.params.id });
});

// Matches slugs like: word-word-word
router.get("/shop/:slug([a-z]+-[a-z]+-[a-z]+)", (req, res) => {
    res.json({ slug: req.params.slug });
});`}
      />

      <SectionHeading level={2}>Typed Parameters</SectionHeading>
      <p>
        For cleaner definitions, use built-in type shortcuts. XyPriss handles 
        the regex generation and validation for you.
      </p>
      <CodeBlock
        language="typescript"
        code={`// Only matches numbers
router.get("/items/:id<number>", (req, res) => {
    res.json({ id: req.params.id });
});

// Only matches UUIDs
router.get("/jobs/:uuid<uuid>", (req, res) => {
    res.json({ uuid: req.params.uuid });
});

// Enum constraint
router.get("/status/:type<enum(active,inactive,pending)>", (req, res) => {
    res.json({ type: req.params.type });
});`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" /> Layer-1 Validation
          </h5>
          <p className="text-[10px] text-slate-400 m-0">
            Requests that don't satisfy constraints are rejected at the routing 
            layer, never reaching your application logic.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <h5 className="text-white font-semibold mb-2 text-sm flex items-center gap-2">
            <Hash className="w-4 h-4 text-green-400" /> Multi-Segment Support
          </h5>
          <p className="text-[10px] text-slate-400 m-0">
            Combine multiple parameters in a single segment, e.g., 
            <code>/files/:name.:ext</code>.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Wildcard Routes</SectionHeading>
      <p>
        XyPriss distinguishes between single-segment and recursive wildcards.
      </p>
      <ul>
        <li>
          <strong>Single Wildcard (<code>*</code>):</strong> Matches exactly one 
          segment within a path. Accessible via <code>req.params["*"]</code>.
        </li>
        <li>
          <strong>Double Wildcard (<code>**</code>):</strong> Matches multiple 
          segments recursively. Accessible via <code>req.params["**"]</code>.
        </li>
      </ul>
      <CodeBlock
        language="typescript"
        code={`router.get("/files/*", (req, res) => {
    const filename = req.params["*"];
    res.json({ filename });
});

router.get("/api/**", (req, res) => {
    const capturedPath = req.params["**"];
    res.json({ capturedPath });
});`}
      />

      <SectionHeading level={2}>Query Parameters</SectionHeading>
      <p>
        Query strings are automatically parsed and made available via 
        <code>req.query</code>.
      </p>
      <CodeBlock
        language="typescript"
        code={`// GET /search?q=xypriss&limit=10
router.get("/search", (req, res) => {
    const { q, limit } = req.query;
    res.json({ query: q, limit: Number(limit) });
});`}
      />

      <DocsFooter
        title="Security Guards"
        description="Implement declarative route protection using the XyGuard API."
        buttonText="Next: Guards"
        href="/docs/routing/guards"
        iconName="ShieldCheck"
      />
    </div>
  );
}
