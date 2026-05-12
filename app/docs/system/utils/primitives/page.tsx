import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Fingerprint, Zap, Key, Layers } from "lucide-react";

export default function PrimitiveUtilsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Fingerprint size={14} />
          Utilities Module
        </div>
        <SectionHeading level={1}>Primitive Utilities (id & fn)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Foundational primitives for identity management and functional programming utility patterns.
        </p>
      </div>

      <SectionHeading level={2} id="identity-utilities">
        Identity Utilities (id)
      </SectionHeading>
      
      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Key size={18} className="text-primary" />
            .uuid()
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Generates a standard RFC 4122 Compliant Version 4 UUID. This is the recommended primary key strategy for distributed systems within the XyPriss framework.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const entityId = __sys__.utils.id.uuid();
// → "f47ac10b-58cc-4372-a567-0e02b2c3d479"`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="functional-utilities">
        Functional Utilities (fn)
      </SectionHeading>

      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            .memo(fn)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Wraps a function with a cache that stores results based on input arguments. Subsequent calls with the same arguments will return the cached result instantly.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const heavyCalc = __sys__.utils.fn.memo((n: number) => {
    // ... expensive iterative operations ...
    return result;
});

const val1 = heavyCalc(42); // Executes
const val2 = heavyCalc(42); // Returns from cache immediately`}
          />
        </div>
      </div>

      <DocsFooter 
        title="Dynamic Variables"
        description="Learn about standardized key-value stores for application configuration."
        buttonText="Explore API"
        href="/docs/system/vars"
        iconName="Database"
      />
    </div>
  );
}
