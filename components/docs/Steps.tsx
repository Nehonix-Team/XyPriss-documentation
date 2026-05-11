"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export const Step: React.FC<StepProps> = ({ title, children }) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Line connecting steps */}
      <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-white/5 group-last:hidden" />
      
      {/* Step circle */}
      <div className="absolute left-0 top-0 w-[24px] h-[24px] rounded-full bg-black border-2 border-primary/50 flex items-center justify-center text-[10px] font-bold text-primary group-hover:border-primary transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
      
      <div className="flex flex-col gap-2 pt-0.5">
        <h3 className="text-lg font-bold text-white leading-none mb-2">{title}</h3>
        <div className="text-muted-foreground text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({ children, className }) => {
  return (
    <div className={cn("my-8", className)}>
      {children}
    </div>
  );
};
