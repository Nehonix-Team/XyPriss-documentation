"use client";

import React, { JSX }  from "react";
import { Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  children,
  level = 2,
  className,
  id,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  // Auto-generate ID if not provided
  const headingId = id || (typeof children === "string" 
    ? children.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
    : undefined);

  return (
    <Tag
      id={headingId}
      className={cn(
        "group relative flex items-center gap-2 scroll-mt-24",
        level === 1 && "text-4xl font-extrabold mb-8",
        level === 2 && "text-3xl font-bold mt-12 mb-6 pb-2 border-b border-white/10",
        level === 3 && "text-2xl font-semibold mt-8 mb-4",
        level === 4 && "text-xl font-medium mt-6 mb-2",
        className
      )}
    >
      {children}
      {headingId && (
        <a
          href={`#${headingId}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-primary"
          aria-label="Link to this section"
        >
          <LinkIcon size={18} />
        </a>
      )}
    </Tag>
  );
};
