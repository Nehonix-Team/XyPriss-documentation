import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Type, Link as LinkIcon, Hash, Scissors, Sparkles, CaseSensitive, AlignLeft, Search, Braces } from "lucide-react";

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
// → "implementing-xypriss-utilities-a-deep-dive"`}
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
            code={`const short = __sys__.utils.str.truncate("This is a very long description", 30);
// → "This is a very long descri..."`}
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

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <CaseSensitive size={18} className="text-primary" />
            .capitalize(text)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Ensures the first character of the input string is uppercase.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.utils.str.capitalize("john_doe"); // → "John_doe"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <AlignLeft size={18} className="text-primary" />
            .pad(text, length, char?, position?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Pads the input string to a target length using a specific character at the start or end.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.utils.str.pad("42", 5, "0"); // → "00042"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Search size={18} className="text-primary" />
            .countOccurrences(text, word, caseSensitive?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Analyzes a text body to count how many times a specific substring appeared.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.utils.str.countOccurrences("ERROR: Failed. ERROR: Timeout.", "error"); // → 2`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Braces size={18} className="text-primary" />
            .toQueryString(params)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Serializes a flat record into a URL-encoded query string format.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const qs = __sys__.utils.str.toQueryString({ search: "query string", page: 1 });
// → "search=query%20string&page=1"`}
          />
        </div>
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
