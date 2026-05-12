import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Calendar, Clock, RotateCcw, Plus, Minus, CheckCircle2, History, CalendarDays, Timer } from "lucide-react";

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
            .now() / .nowMs()
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Helpers to get the current system time in the preferred unit (seconds or milliseconds).
          </p>
          <CodeBlock 
            language="typescript"
            code={`const sec = __sys__.utils.date.now();
const ms = __sys__.utils.date.nowMs();`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Calendar size={18} className="text-primary" />
            .format(date, locale?, options?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            The primary method for localized date serialization. Handles ISO strings, Date objects, and numeric timestamps seamlessly.
          </p>
          <CodeBlock 
            language="typescript"
            code={`// From a XHSC timestamp (seconds)
__sys__.utils.date.format(1776287197, "fr-FR", { dateStyle: "long" });
// → "15 avril 2026"`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <History size={18} className="text-primary" />
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
            .add(date, value, unit)
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
            <Timer size={18} className="text-primary" />
            .diff(dateA, dateB, unit?)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Returns the signed integer difference between two dates in the requested unit.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const days = __sys__.utils.date.diff("2026-12-25", "2026-12-20", "d"); // → 5`}
          />
        </div>

        <div>
          <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <CalendarDays size={18} className="text-primary" />
            .dateRange(start, end)
          </h4>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Generates an array of Date objects for every calendar day between start and end. Capped at 3,650 days.
          </p>
          <CodeBlock 
            language="typescript"
            code={`const week = __sys__.utils.date.dateRange("2026-01-01", "2026-01-07");`}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { n: ".today()", d: "Current Date instance" },
            { n: ".weekNumber()", d: "ISO 8601 week" },
            { n: ".isLeapYear()", d: "Check for 366 days" },
            { n: ".isValid()", d: "Finite date check" },
          ].map((u, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="font-mono text-primary text-[10px] font-bold mb-1">{u.n}</div>
              <p className="text-[9px] text-muted-foreground uppercase">{u.d}</p>
            </div>
          ))}
        </div>
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
