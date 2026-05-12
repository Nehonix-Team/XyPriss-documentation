"use client";

import React from "react";
import {
  Info,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warning" | "success" | "danger" | "tip";

interface CalloutProps {
  children: React.ReactNode;
  type?: CalloutType;
  title?: string;
  className?: string;
}

const icons = {
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
  success: <CheckCircle2 size={20} />,
  danger: <AlertCircle size={20} />,
  tip: <Lightbulb size={20} />,
};

const styles = {
  info: "border-blue-400/50   bg-blue-50   dark:bg-blue-500/5   text-blue-950   dark:text-blue-200",
  warning:
    "border-yellow-500/60 bg-yellow-50 dark:bg-yellow-500/5 text-yellow-950 dark:text-yellow-200",
  success:
    "border-green-400/50  bg-green-50  dark:bg-green-500/5  text-green-950  dark:text-green-200",
  danger:
    "border-red-400/50    bg-red-50    dark:bg-red-500/5    text-red-950    dark:text-red-200",
  tip: "border-purple-400/50 bg-purple-50 dark:bg-purple-500/5 text-purple-950 dark:text-purple-200",
};

const iconColors = {
  info: "text-blue-700   dark:text-blue-400",
  warning: "text-yellow-700 dark:text-yellow-400",
  success: "text-green-700  dark:text-green-400",
  danger: "text-red-700    dark:text-red-400",
  tip: "text-purple-700 dark:text-purple-400",
};

export const Callout: React.FC<CalloutProps> = ({
  children,
  type = "info",
  title,
  className,
}) => {
  return (
    <div
      className={cn(
        "my-6 flex gap-4 p-4 rounded-xl border backdrop-blur-md transition-all",
        styles[type],
        className,
      )}
    >
      <div className={cn("shrink-0 mt-0.5", iconColors[type])}>
        {icons[type]}
      </div>
      <div className="flex flex-col gap-1">
        {title && (
          <div className="font-bold text-sm uppercase tracking-wider mb-1">
            {title}
          </div>
        )}
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
};
