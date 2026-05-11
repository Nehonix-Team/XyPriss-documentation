"use client";

import React, { JSX } from "react";
import { Link as LinkIcon } from "lucide-react";

interface SectionHeadingProps {
  id: string;
  level: 2 | 3 | 4;
  children: React.ReactNode;
}

export function SectionHeading({ id, level, children }: SectionHeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag 
      id={id} 
      className="group scroll-mt-24 flex items-center gap-2 text-xp-text font-bold mt-10 mb-4"
      style={{
        fontSize: level === 2 ? '1.875rem' : level === 3 ? '1.5rem' : '1.25rem',
        borderBottom: level === 2 ? '1px solid var(--xp-border)' : 'none',
        paddingBottom: level === 2 ? '0.5rem' : '0',
      }}
    >
      {children}
      <a 
        href={`#${id}`} 
        className="opacity-0 group-hover:opacity-100 transition-opacity text-xp-primary"
        aria-label="Link to this section"
      >
        <LinkIcon size={18} />
      </a>
    </Tag>
  );
}
