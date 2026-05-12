import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Type, Link as LinkIcon, Hash, Scissors, Sparkles } from "lucide-react";

export default function StringUtilsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Type size={14} />
          Utilities Module
        </div>
        <SectionHeading level={1}>String Utilities (str)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Optimized functions for string manipulation, generation, and formatting.
        </p>
      </div>

      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            .randomString(length?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Generates a random Alpha-Numeric string. Ideal for temporary identifiers or nonces.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const tempId = \`tmp-\${__sys__.utils.str.randomString(6)}\`; // → "tmp-aB7x9z"`}
          />
          <Callout type="warning" title="Non-Cryptographic">
            This implementation is not cryptographically secure. For security-critical tokens, use the <code className="text-primary">crypto</code> module.
          </Callout>
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <LinkIcon size={18} className="text-primary" />
            .slugify(text)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Transforms an arbitrary string into a URL-safe slug by normalizing case and removing non-alphanumeric characters.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const slug = __sys__.utils.str.slugify("Implementing XyPriss Utilities!");
// → "implementing-xypriss-utilities"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Scissors size={18} className="text-primary" />
            .truncate(text, maxLength, suffix?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Shortens a string to a specific length. The total length, including the suffix, will exactly equal <code className="text-primary">maxLength</code>.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const short = __sys__.utils.str.truncate(longText, 30);`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Hash size={18} className="text-primary" />
            .toCamelCase(text)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Converts hyphenated, underscored, or space-separated strings into standard camelCase notation.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const key = __sys__.utils.str.toCamelCase("first_name"); // → "firstName"`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="other-utilities">
        Other Utilities
      </SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {[
          { name: ".capitalize(text)", desc: "Uppercases first character" },
          { name: ".pad(text, len, char, pos)", desc: "Pads string to length" },
          { name: ".countOccurrences(text, word)", desc: "Analyzes text occurrences" },
          { name: ".toQueryString(params)", desc: "Serializes record to URL params" },
        ].map((util, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <div className="text-primary font-mono text-xs font-bold mb-1 group-hover:text-white transition-colors">{util.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{util.desc}</div>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Number Utilities"
        description="Learn about math operations and byte formatting in XyPriss."
        buttonText="Explore API"
        href="/docs/system/utils/numbers"
        iconName="Hash"
      />
    </div>
  );
}
