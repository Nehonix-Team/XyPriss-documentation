import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   BENCH GRAPH COMPONENTS (shared)
   ───────────────────────────────────────────── */

const COLORS = {
  express: "#64748b",
  fastify: "#f59e0b",
  xypriss: "#3b82f6",
};

export { COLORS };

export function BenchStatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value?: string;
  sub: string;
  icon: React.ElementType;
  accent: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col gap-3 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
          style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent }}
        >
          <Icon size={20} />
        </div>
        <span className="text-xs text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
      </div>
      {value && (
        <div className="font-mono text-2xl font-bold text-white">{value}</div>
      )}
      <p className="text-[10px] text-muted-foreground leading-relaxed">{sub}</p>
    </div>
  );
}

export function BenchBarChart({
  title,
  data,
  unit,
  xLabel,
  width = 600,
  height = 260,
}: {
  title: string;
  data: { label: string; express: number; fastify: number; xypriss: number }[];
  unit: string;
  xLabel?: string;
  width?: number;
  height?: number;
}) {
  const maxValue = Math.max(...data.flatMap((d) => [d.express, d.fastify, d.xypriss]));
  const barGroupWidth = (width - 80) / data.length;
  const barWidth = barGroupWidth * 0.6;
  const chartHeight = height - 60;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-[10px] text-muted-foreground mb-6">{xLabel}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id={`grad-express-${title.replace(/[^a-z]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.express} />
            <stop offset="100%" stopColor={COLORS.express} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`grad-fastify-${title.replace(/[^a-z]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.fastify} />
            <stop offset="100%" stopColor={COLORS.fastify} stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id={`grad-xypriss-${title.replace(/[^a-z]/gi, "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.xypriss} />
            <stop offset="100%" stopColor={COLORS.xypriss} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = 20 + chartHeight * (1 - tick);
          const val = Math.round(maxValue * tick);
          return (
            <g key={tick}>
              <line x1={50} y1={y} x2={width - 20} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={48} y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {data.map((d, i) => {
          const cx = 70 + i * barGroupWidth + barGroupWidth / 2;
          const hE = (d.express / maxValue) * chartHeight;
          const hF = (d.fastify / maxValue) * chartHeight;
          const hX = (d.xypriss / maxValue) * chartHeight;
          const base = 20 + chartHeight;

          return (
            <g key={i}>
              <text x={cx} y={base + 14} fill="#94a3b8" fontSize="9" textAnchor="middle">
                {d.label}
              </text>

              <rect
                x={cx - barWidth}
                y={base - hE}
                width={barWidth * 0.32}
                height={hE}
                rx="3"
                fill={`url(#grad-express-${title.replace(/[^a-z]/gi, "")})`}
                opacity="0.9"
              />
              <rect
                x={cx - barWidth + barWidth * 0.34}
                y={base - hF}
                width={barWidth * 0.32}
                height={hF}
                rx="3"
                fill={`url(#grad-fastify-${title.replace(/[^a-z]/gi, "")})`}
                opacity="0.9"
              />
              <rect
                x={cx + barWidth * 0.34}
                y={base - hX}
                width={barWidth * 0.32}
                height={hX}
                rx="3"
                fill={`url(#grad-xypriss-${title.replace(/[^a-z]/gi, "")})`}
                opacity="0.95"
              />

              <text x={cx - barWidth + barWidth * 0.16} y={base - hX - 4} fill={COLORS.express} fontSize="8" textAnchor="middle">
                {d.express}
              </text>
              <text x={cx - barWidth + barWidth * 0.5} y={base - hF - 4} fill={COLORS.fastify} fontSize="8" textAnchor="middle">
                {d.fastify}
              </text>
              <text x={cx + barWidth * 0.5} y={base - hX - 4} fill={COLORS.xypriss} fontSize="8" fontWeight="bold" textAnchor="middle">
                {d.xypriss}
              </text>
            </g>
          );
        })}

        <g transform={`translate(60, 0)`}>
          <rect x={0} y={6} width={10} height={10} rx="2" fill={COLORS.express} />
          <text x={14} y={15} fill="#94a3b8" fontSize="9">Express</text>
          <rect x={70} y={6} width={10} height={10} rx="2" fill={COLORS.fastify} />
          <text x={84} y={15} fill="#94a3b8" fontSize="9">Fastify</text>
          <rect x={130} y={6} width={10} height={10} rx="2" fill={COLORS.xypriss} />
          <text x={144} y={15} fill="#94a3b8" fontSize="9">XyPriss</text>
        </g>
      </svg>
      <p className="text-[10px] text-muted-foreground mt-2 text-right">{unit}</p>
    </div>
  );
}

export function BenchLineChart({
  title,
  data,
  unit,
  width = 600,
  height = 260,
}: {
  title: string;
  data: { x: number; express: number; fastify: number; xypriss: number }[];
  unit: string;
  width?: number;
  height?: number;
}) {
  const maxY = Math.max(...data.flatMap((d) => [d.express, d.fastify, d.xypriss]));
  const minX = data[0].x;
  const maxX = data[data.length - 1].x;
  const padL = 55;
  const padR = 20;
  const padT = 30;
  const padB = 35;
  const chartW = width - padL - padR;
  const chartH = height - padT - padB;

  const toX = (val: number) => padL + ((val - minX) / (maxX - minX)) * chartW;
  const toY = (val: number) => padT + chartH - (val / maxY) * chartH;

  const datasets = [
    { key: "express" as const, color: COLORS.express, label: "Express" },
    { key: "fastify" as const, color: COLORS.fastify, label: "Fastify" },
    { key: "xypriss" as const, color: COLORS.xypriss, label: "XyPriss" },
  ];

  const path = (vals: number[]) =>
    vals
      .map((v, i) => `${i === 0 ? "M" : "L"} ${toX(data[i].x)} ${toY(v)}`)
      .join(" ");

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h4 className="text-sm font-bold text-white mb-1">{title}</h4>
      <p className="text-[10px] text-muted-foreground mb-4">{unit}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          {datasets.map((ds) => (
            <linearGradient key={ds.key} id={`area-${title.replace(/[^a-z]/gi, "")}-${ds.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ds.color} stopOpacity="0.35" />
              <stop offset="100%" stopColor={ds.color} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>

        {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
          const y = padT + chartH * (1 - tick);
          const val = Math.round(maxY * tick);
          return (
            <g key={tick}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255,255,255,0.06)" />
              <text x={padL - 8} y={y + 4} fill="#94a3b8" fontSize="9" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {data.map((d) => (
          <text key={d.x} x={toX(d.x)} y={padT + chartH + 18} fill="#94a3b8" fontSize="9" textAnchor="middle">
            {d.x}
          </text>
        ))}

        {datasets.map((ds) => {
          const vals = data.map((d) => d[ds.key]);
          const linePath = path(vals);
          const areaPath = `${linePath} L ${toX(data[data.length - 1].x)} ${padT + chartH} L ${toX(data[0].x)} ${padT + chartH} Z`;

          return (
            <g key={ds.key}>
              <path d={areaPath} fill={`url(#area-${title.replace(/[^a-z]/gi, "")}-${ds.key})`} />
              <path d={linePath} fill="none" stroke={ds.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {vals.map((v, i) => (
                <circle key={i} cx={toX(data[i].x)} cy={toY(v)} r="3.5" fill={ds.color} stroke="#000" strokeWidth="1.5" />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
