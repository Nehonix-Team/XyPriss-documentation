import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Hash, Activity, Zap, HardDrive, Globe, Dice5 } from "lucide-react";

export default function NumberUtilsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Hash size={14} />
          Utilities Module
        </div>
        <SectionHeading level={1}>Number Utilities (num)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Optimized mathematical operations and locale-aware unit formatting.
        </p>
      </div>

      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Activity size={18} className="text-primary" />
            .clamp(value, min, max)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Ensures a number stays within the specified range. Essential for validating sensory inputs or bounding UI elements.
          </p>
          <CodeBlock 
            language="typescript"
            code={`let health = 150;
health = __sys__.utils.num.clamp(health, 0, 100); // → 100`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Zap size={18} className="text-primary" />
            .lerp(start, end, t)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Performs linear interpolation between two values. Commonly used for smooth UI animations and progress tracking.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const opacity = __sys__.utils.num.lerp(0, 1, progress);`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Dice5 size={18} className="text-primary" />
            .randomInt(min, max)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Returns a pseudo-random integer within the inclusive range [min, max].
          </p>
          <CodeBlock 
            language="typescript"
            code={`const roll = __sys__.utils.num.randomInt(1, 6); // Dice roll`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <HardDrive size={18} className="text-primary" />
            .formatBytes(bytes, decimals?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Converts raw byte counts into human-readable formats (KB, MB, GB, TB) using base-1024.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const readable = __sys__.utils.num.formatBytes(15728640); // → "15 MB"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Globe size={18} className="text-primary" />
            .formatNumber(value, locale?, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            A wrapper around the <code className="text-primary">Intl.NumberFormat</code> API for localized currency, percentage, and number formatting.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const price = __sys__.utils.num.formatNumber(1250.5, "en-US", {
    style: "currency",
    currency: "USD",
}); // → "$1,250.50"`}
          />
        </div>
      </div>

      <DocsFooter 
        title="Date Utilities"
        description="Learn about calendar arithmetic and relative time formatting."
        buttonText="Explore API"
        href="/docs/system/utils/dates"
        iconName="Calendar"
      />
    </div>
  );
}
