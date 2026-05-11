"use client";

import React from "react";
import { 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb
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
  info: "border-blue-500/20 bg-blue-500/5 text-blue-200",
  warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-200",
  success: "border-green-500/20 bg-green-500/5 text-green-200",
  danger: "border-red-500/20 bg-red-500/5 text-red-200",
  tip: "border-purple-500/20 bg-purple-500/5 text-purple-200",
};

const iconColors = {
  info: "text-blue-400",
  warning: "text-yellow-400",
  success: "text-green-400",
  danger: "text-red-400",
  tip: "text-purple-400",
};

export const Callout: React.FC<CalloutProps> = ({
  children,
  type = "info",
  title,
  className,
}) => {
  return (
    <div className={cn(
      "my-6 flex gap-4 p-4 rounded-xl border backdrop-blur-md transition-all",
      styles[type],
      className
    )}>
      <div className={cn("shrink-0 mt-0.5", iconColors[type])}>
        {icons[type]}
      </div>
      <div className="flex flex-col gap-1">
        {title && (
          <div className="font-bold text-sm uppercase tracking-wider mb-1">
            {title}
          </div>
        )}
        <div className="text-sm leading-relaxed opacity-90">
          {children}
        </div>
      </div>
    </div>
  );
};
