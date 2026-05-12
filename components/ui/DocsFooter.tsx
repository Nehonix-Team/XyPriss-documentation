"use client";

import {
  ChevronRight,
  Zap,
  Rocket,
  AlertCircle,
  Cpu,
  Package,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Rocket,
  AlertCircle,
  Cpu,
  Package,
  HelpCircle,
};

interface DocsFooterProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  iconName?: string;
}

export const DocsFooter = ({
  title,
  description,
  buttonText,
  href,
  iconName,
}: DocsFooterProps) => {
  const Icon = iconName ? iconMap[iconName] : null;

  const handleNavigation = () => {
    window.location.href = href;
  };

  return (
    <div className="mt-16 p-8 rounded-2xl border border-primary/10 bg-primary/5 flex flex-col md:flex-row items-center justify-between gap-8 transition-all hover:border-primary/20 group">
      <div className="flex-1 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 text-primary mb-3">
          {Icon && <Icon size={20} />}
          <span className="font-bold text-lg">{title}</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
      <button
        onClick={handleNavigation}
        className="w-full md:w-auto bg-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0 active:scale-95 relative z-10"
      >
        <span className="tracking-tight">{buttonText}</span>
        <ChevronRight
          size={20}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};
