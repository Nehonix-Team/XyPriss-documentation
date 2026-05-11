import React from "react";

interface PropsTableRow {
  prop: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  rows: PropsTableRow[];
  caption?: string;
}

export function PropsTable({ rows, caption }: PropsTableProps) {
  return (
    <div className="my-8 overflow-x-auto rounded-lg border border-xp-border bg-xp-surface/30">
      <table className="w-full text-left text-sm border-collapse">
        {caption && (
          <caption className="px-4 py-3 text-left font-medium text-xp-muted italic border-b border-xp-border">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="border-b border-xp-border bg-xp-surface/50">
            <th className="px-4 py-3 font-semibold text-xp-text">Property</th>
            <th className="px-4 py-3 font-semibold text-xp-text">Type</th>
            <th className="px-4 py-3 font-semibold text-xp-text">Default</th>
            <th className="px-4 py-3 font-semibold text-xp-text">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-xp-border/50">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-xp-surface/20 transition-colors">
              <td className="px-4 py-3 font-mono text-xp-primary">
                {row.prop}
                {row.required && <span className="text-red-400 ml-1">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-xp-accent text-xs">
                {row.type}
              </td>
              <td className="px-4 py-3 font-mono text-xp-muted text-xs">
                {row.default || "-"}
              </td>
              <td className="px-4 py-3 text-xp-text/90 leading-relaxed min-w-[200px]">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
