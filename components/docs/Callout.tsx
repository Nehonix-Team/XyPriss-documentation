import React from "react";
import { Info, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CalloutType = "note" | "warning" | "caution" | "tip";

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const icons = {
  note: Info,
  warning: AlertTriangle,
  caution: AlertCircle,
  tip: Lightbulb,
};

const styles = {
  note: "bg-blue-500/10 border-blue-500/20 text-blue-200",
  warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-200",
  caution: "bg-red-500/10 border-red-500/20 text-red-200",
  tip: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200",
};

export function Callout({ type, title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={cn("my-6 flex gap-4 rounded-lg border p-4", styles[type])}>
      <div className="mt-1 flex-shrink-0">
        <Icon size={20} />
      </div>
      <div className="flex flex-col gap-1">
        {title && <div className="font-bold uppercase tracking-wide text-sm">{title}</div>}
        <div className="text-[15px] leading-relaxed opacity-90">{children}</div>
      </div>
    </div>
  );
}
