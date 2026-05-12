import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Database, Box, Layers, Filter, List, GitBranch } from "lucide-react";

export default function DataUtilsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Database size={14} />
          Utilities Module
        </div>
        <SectionHeading level={1}>Data Utilities (obj & arr)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          High-performance operations for deep object manipulation and collection management.
        </p>
      </div>

      <SectionHeading level={2} id="object-utilities">
        Object Utilities (obj)
      </SectionHeading>
      
      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Layers size={18} className="text-primary" />
            .deepClone(obj)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Creates a complete, recursive copy of an object. Handles circular references and complex prototypes for immutable state updates.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const original = { api: { timeout: 5000 } };
const cloned = __sys__.utils.obj.deepClone(original);`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Filter size={18} className="text-primary" />
            .pick() / .omit()
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Filters object properties based on a whitelist (<code className="text-primary">pick</code>) or blacklist (<code className="text-primary">omit</code>).
          </p>
          <CodeBlock 
            language="typescript"
            code={`const user = { id: 1, email: "j@d.com", password: "HIDDEN" };
const publicProfile = __sys__.utils.obj.omit(user, ["password"]); // { id: 1, email: "j@d.com" }`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Box size={18} className="text-primary" />
            .flattenObject(obj, separator?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Recursively reduces a nested object into a single-level object with path-based keys.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const data = { user: { profile: { name: "John" } } };
const flat = __sys__.utils.obj.flattenObject(data); // { "user.profile.name": "John" }`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="array-utilities">
        Array Utilities (arr)
      </SectionHeading>

      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <List size={18} className="text-primary" />
            .chunk(array, size)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Splits an array into smaller sub-arrays of a defined maximum size. Ideal for batch processing.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const items = [1, 2, 3, 4, 5, 6, 7];
const batches = __sys__.utils.arr.chunk(items, 3); // [[1, 2, 3], [4, 5, 6], [7]]`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <GitBranch size={18} className="text-primary" />
            .groupBy(array, keyFn)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Buckets elements of an array into an object based on a discriminator function.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const items = [{ cat: "A" }, { cat: "B" }, { cat: "A" }];
const grouped = __sys__.utils.arr.groupBy(items, i => i.cat);`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="other-data-utils">
        More Utilities
      </SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {[
          { name: "obj.parse(json, fallback)", desc: "Safe JSON.parse alternative" },
          { name: "obj.merge(target, ...sources)", desc: "Deep recursive object merging" },
          { name: "arr.unique(array)", desc: "Deduplicates while preserving order" },
          { name: "arr.shuffle(array)", desc: "Fisher-Yates randomization" },
        ].map((util, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <div className="text-primary font-mono text-xs font-bold mb-1 group-hover:text-white transition-colors">{util.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{util.desc}</div>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Logic Utilities"
        description="Master asynchronous control flow and validation guards."
        buttonText="Explore API"
        href="/docs/system/utils/logic"
        iconName="Activity"
      />
    </div>
  );
}
