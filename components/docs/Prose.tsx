import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProseProps {
  children: React.ReactNode;
  className?: string;
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div className={cn(
      "max-w-none prose prose-invert",
      "prose-headings:text-xp-text prose-headings:font-bold prose-headings:tracking-tight",
      "prose-p:text-xp-text/90 prose-p:leading-relaxed prose-p:my-6",
      "prose-a:text-xp-primary prose-a:no-underline hover:prose-a:underline",
      "prose-strong:text-xp-text prose-strong:font-semibold",
      "prose-code:text-xp-accent prose-code:bg-xp-accent/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none",
      "prose-ul:list-disc prose-ul:pl-6 prose-li:my-2",
      "prose-hr:border-xp-border prose-hr:my-12",
      "prose-img:rounded-xl prose-img:border prose-img:border-xp-border",
      className
    )}>
      {children}
    </div>
  );
}
