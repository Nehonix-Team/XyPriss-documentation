import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import {
  Calendar,
  Clock,
  Plus,
  History,
  CalendarDays,
  Timer,
  Sparkles,
  Hourglass,
  CalendarCheck,
  Zap,
} from "lucide-react";

export default function DateUtilsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Calendar size={14} />
          System Utilities
        </div>
        <SectionHeading level={1}>Date Utilities (date)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Comprehensive temporal library designed for Unix timestamps, JavaScript dates, natural expression parsing, and calendar arithmetic with millisecond precision.
        </p>
      </div>

      <Callout type="info" title="Technical Heuristics: Seconds vs. Milliseconds">
        XyPriss <code className="text-primary font-mono font-bold">DateUtils</code> automatically detects the unit of numeric timestamps to bridge XHSC (which typically uses Unix seconds) and JavaScript (milliseconds).
        If a number is less than <code className="text-primary font-mono font-bold">100,000,000,000</code> (1e11), it is automatically treated as <strong>seconds</strong> and converted to milliseconds. This heuristic remains valid until the year 2286.
      </Callout>

      <SectionHeading level={2} id="current-time">
        Core &amp; Current Time
      </SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Quick access to current system timestamps in your preferred unit or as native <code className="text-primary font-mono">Date</code> objects.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
            <Clock size={16} className="text-primary" />
            .now() &amp; .nowMs()
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Returns current timestamp in Unix seconds or milliseconds.
          </p>
          <CodeBlock
            language="typescript"
            code={`const seconds = __sys__.utils.date.now();   // e.g. 1776287197
const millis  = __sys__.utils.date.nowMs(); // e.g. 1776287197000`}
          />
        </div>

        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col gap-3">
          <h4 className="font-bold text-white flex items-center gap-2 text-sm">
            <CalendarCheck size={16} className="text-primary" />
            .today()
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Returns a fresh JavaScript <code className="text-primary font-mono">Date</code> instance set to the current instant.
          </p>
          <CodeBlock
            language="typescript"
            code={`const currentDate: Date = __sys__.utils.date.today();`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="formatting">
        Formatting &amp; Duration Serialization
      </SectionHeading>

      <div className="space-y-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            .format(date, locale?, options?)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Primary method for localized date serialization. Auto-detects ISO strings, Date objects, and numeric timestamps.
          </p>
          <CodeBlock
            language="typescript"
            code={`// From a XHSC Unix timestamp (seconds)
__sys__.utils.date.format(1776287197, "fr-FR", { dateStyle: "long" });
// → "15 avril 2026"

// Standard format with default locale
__sys__.utils.date.format(new Date());`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Hourglass size={16} className="text-primary" />
            .formatDuration(value, unit?)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Converts a raw duration into a component-based string (e.g. <code className="text-primary font-mono">1d 2h 1m 1s</code>). Zero-value components are automatically omitted.
          </p>
          <CodeBlock
            language="typescript"
            code={`const uptimeSec = 93661;
__sys__.utils.date.formatDuration(uptimeSec, "s");
// → "1d 2h 1m 1s"

__sys__.utils.date.formatDuration(3600000, "ms");
// → "1h"`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <History size={16} className="text-primary" />
            .timeAgo(date, locale?)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Returns a localized relative time string relative to the current instant.
          </p>
          <CodeBlock
            language="typescript"
            code={`const lastPost = Date.now() - 1000 * 60 * 15;
__sys__.utils.date.timeAgo(lastPost);
// → "15 minutes ago"`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="arithmetic">
        Arithmetic &amp; Comparisons
      </SectionHeading>

      <div className="space-y-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Plus size={16} className="text-primary" />
            .add(date, value, unit) &amp; .subtract(date, value, unit)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Performs calendar-aware arithmetic handling month-length variations and leap years automatically. Supported units: <code className="text-primary font-mono">ms, s, m, h, d, w, mo, y</code>.
          </p>
          <CodeBlock
            language="typescript"
            code={`const subDate = new Date("2026-01-31");
const nextBilling = __sys__.utils.date.add(subDate, 1, "mo");
// → "2026-02-28" (Clamped to end of Feb)

const pastDate = __sys__.utils.date.subtract(new Date(), 2, "w");
// → Date 2 weeks ago`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Timer size={16} className="text-primary" />
            .diff(dateA, dateB, unit?)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Returns the signed integer difference between two dates in the requested unit (<code className="text-primary font-mono">ms, s, m, h, d, w</code>).
          </p>
          <CodeBlock
            language="typescript"
            code={`const days = __sys__.utils.date.diff("2026-12-25", "2026-12-20", "d");
// → 5`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="natural-parsing">
        Natural Language Parsing &amp; Expression Support
      </SectionHeading>

      <div className="space-y-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            .from(expression, baseDate?)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Parses natural language shorthands (e.g. <code className="text-primary font-mono">"7d"</code>, <code className="text-primary font-mono">"3M"</code>, <code className="text-primary font-mono">"+2w"</code>, <code className="text-primary font-mono">"-2h"</code>, <code className="text-primary font-mono">"tomorrow"</code>, <code className="text-primary font-mono font-bold">"yesterday"</code>) into a <code className="text-primary font-mono">Date</code> instance.
          </p>
          <CodeBlock
            language="typescript"
            code={`const expiration = __sys__.utils.date.from("7d");
// → Date 7 days from now

const pastEvent = __sys__.utils.date.from("-2h");
// → Date 2 hours ago

const target = __sys__.utils.date.from("1w 2d", "2026-01-01");
// → Date("2026-01-10")`}
          />
        </div>

        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <Zap size={16} className="text-primary" />
            .parseDuration(duration)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Parses a duration shorthand string and returns the total duration in <strong>milliseconds</strong>.
          </p>
          <CodeBlock
            language="typescript"
            code={`__sys__.utils.date.parseDuration("7d");     // → 604800000 (ms)
__sys__.utils.date.parseDuration("2h 30m"); // → 9000000 (ms)`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="calendar-queries">
        Calendar Queries &amp; Ranges
      </SectionHeading>

      <div className="space-y-6 my-2">
        <div>
          <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CalendarDays size={16} className="text-primary" />
            .dateRange(start, end)
          </h3>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            Generates an array of Date objects for every calendar day between start and end. Capped at 3,650 days (approx. 10 years) for memory safety.
          </p>
          <CodeBlock
            language="typescript"
            code={`const week = __sys__.utils.date.dateRange("2026-01-01", "2026-01-07");
// Returns an array of 7 Date objects`}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          {[
            { n: ".weekNumber(date?)", d: "ISO 8601 week number (1–53)" },
            { n: ".isLeapYear(year?)", d: "Returns true if year has 366 days" },
            { n: ".isWeekend(date?)", d: "Returns true for Sat / Sun" },
            { n: ".isWeekday(date?)", d: "Returns true for Mon – Fri" },
            { n: ".isValid(value)", d: "Validates finite non-NaN date input" },
          ].map((u, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
              <div className="font-mono text-primary text-xs font-bold mb-2">{u.n}</div>
              <p className="text-[10px] text-muted-foreground">{u.d}</p>
            </div>
          ))}
        </div>
      </div>

      <DocsFooter
        title="Data Utilities"
        description="Explore deep object cloning, data manipulation, and advanced array helpers."
        buttonText="Explore Data Utils"
        href="/docs/system/utils/data"
        iconName="Database"
      />
    </div>
  );
}
