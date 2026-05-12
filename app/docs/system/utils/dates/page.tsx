import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Calendar, Clock, RotateCcw, Plus, Minus, CheckCircle2 } from "lucide-react";

export default function DateUtilsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Calendar size={14} />
          Utilities Module
        </div>
        <SectionHeading level={1}>Date Utilities (date)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Comprehensive temporal library for timestamps, calendar arithmetic, and relative time.
        </p>
      </div>

      <Callout type="info" title="Seconds vs. Milliseconds">
        XyPriss automatically detects if a timestamp is in seconds (Go native) or milliseconds (JS native). 
        Numbers below <code className="text-primary font-bold">100,000,000,000</code> are treated as seconds and bridged automatically.
      </Callout>

      <div className="space-y-12 my-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Clock size={18} className="text-primary" />
            .format(date, locale?, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The primary method for localized date serialization. Handles ISO strings, Date objects, and numeric timestamps seamlessly.
          </p>
          <CodeBlock 
            language="typescript"
            code={`// From a Go-native timestamp (seconds)
__sys__.utils.date.format(1776287197, "fr-FR", { dateStyle: "long" });
// → "15 avril 2026"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <RotateCcw size={18} className="text-primary" />
            .timeAgo(date, locale?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Returns a localized relative time string (e.g., "15 minutes ago") relative to the current instant.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const lastAction = Date.now() - 1000 * 60 * 15;
__sys__.utils.date.timeAgo(lastAction); // → "15 minutes ago"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Plus size={18} className="text-primary" />
            .add() / .subtract()
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Performs calendar-aware arithmetic. Correctly handles month-length variations and leap years.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const subDate = new Date("2026-01-31");
const nextBilling = __sys__.utils.date.add(subDate, 1, "mo");
// → "2026-02-28" (Automatically clamped to end of February)`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-primary" />
            .formatDuration(value, unit?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Converts raw durations into component-based strings. Zero-value components are omitted.
          </p>
          <CodeBlock 
            language="typescript"
            code={`__sys__.utils.date.formatDuration(93661, "s"); // → "1d 2h 1m 1s"`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="calendar-queries">
        Calendar & Validation
      </SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        {[
          { name: ".weekNumber(date?)", desc: "ISO 8601 week number (1-53)" },
          { name: ".isLeapYear(year?)", desc: "Check for 366-day years" },
          { name: ".isWeekend(date?)", desc: "Day-of-week classification" },
          { name: ".isValid(value)", desc: "Parseable, non-NaN date check" },
          { name: ".diff(a, b, unit?)", desc: "Signed integer difference" },
          { name: ".dateRange(start, end)", desc: "Array of Dates between points" },
        ].map((util, i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 transition-colors group">
            <div className="text-primary font-mono text-xs font-bold mb-1 group-hover:text-white transition-colors">{util.name}</div>
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{util.desc}</div>
          </div>
        ))}
      </div>

      <DocsFooter 
        title="Data Utilities"
        description="Explore deep object cloning and advanced array management."
        buttonText="Explore API"
        href="/docs/system/utils/data"
        iconName="Database"
      />
    </div>
  );
}
