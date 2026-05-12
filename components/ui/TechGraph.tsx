"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface GraphNode {
  iconName: string;
  title: string;
  subtitle: string;
  active?: boolean;
  color?: "blue" | "primary" | "purple" | "green" | "orange";
}

interface GraphFooter {
  label: string;
  description: string;
  color: "blue" | "primary" | "purple" | "green" | "orange";
}

interface TechGraphProps {
  title: string;
  badge?: string;
  nodes: GraphNode[];
  footer?: GraphFooter[];
}

const Node = ({ iconName, title, subtitle, active, color = "primary" }: GraphNode) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  
  const colors = {
    blue: "text-blue-400 border-blue-500/30 bg-blue-500/5 shadow-blue-500/5",
    primary: "text-primary border-primary/30 bg-primary/5 shadow-primary/5",
    purple: "text-purple-400 border-purple-500/30 bg-purple-500/5 shadow-purple-500/5",
    green: "text-green-400 border-green-500/30 bg-green-500/5 shadow-green-500/5",
    orange: "text-orange-400 border-orange-500/30 bg-orange-500/5 shadow-orange-500/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col items-center p-4 rounded-2xl border backdrop-blur-sm transition-all duration-500 w-40 text-center relative z-10",
        colors[color],
        active ? "shadow-lg scale-105" : "opacity-80"
      )}
    >
      <div className={cn("p-2 rounded-lg mb-2 transition-colors", active ? "bg-white/10" : "bg-white/5")}>
        <Icon size={20} />
      </div>
      <span className="text-xs font-bold text-white uppercase tracking-wider">{title}</span>
      <span className="text-[10px] text-muted-foreground mt-1 leading-tight">{subtitle}</span>
      
      {active && (
        <motion.div 
          layoutId="glow"
          className={cn("absolute inset-0 blur-xl -z-10 rounded-full opacity-20", colors[color])}
        />
      )}
    </motion.div>
  );
};

const Connection = ({ delay = 0 }: { delay?: number }) => (
  <div className="flex flex-col items-center justify-center px-2 shrink-0">
    <div className="h-px w-8 md:w-12 bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
      <motion.div
        initial={{ left: "-10%" }}
        animate={{ left: "110%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
        className="absolute top-1/2 -translate-y-1/2 w-4 h-px bg-primary shadow-[0_0_8px_var(--color-primary)]"
      />
    </div>
    <ArrowRight size={12} className="text-muted-foreground/20 mt-1" />
  </div>
);

export const TechGraph = ({ title, badge, nodes, footer }: TechGraphProps) => {
  return (
    <div className="my-12 p-8 rounded-3xl border border-white/5 bg-white/[0.01] overflow-hidden group">
      <div className="flex flex-col items-center gap-10">
        {(title || badge) && (
          <div className="text-center space-y-2 mb-4">
            {badge && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest">
                <Zap size={10} />
                {badge}
              </div>
            )}
            {title && <h4 className="text-lg font-bold text-white tracking-tight">{title}</h4>}
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 relative w-full">
          {nodes.map((node, idx) => (
            <React.Fragment key={idx}>
              <Node {...node} />
              {idx < nodes.length - 1 && <Connection delay={idx * 0.4} />}
            </React.Fragment>
          ))}
        </div>

        {footer && footer.length > 0 && (
          <div className={cn(
            "grid gap-6 w-full max-w-3xl mt-6 pt-8 border-t border-white/5",
            footer.length === 2 ? "grid-cols-2" : "grid-cols-1 md:grid-cols-3"
          )}>
            {footer.map((item, idx) => {
              const footerColors = {
                blue: "bg-blue-500/5 border-blue-500/10 text-blue-300",
                primary: "bg-primary/5 border-primary/10 text-primary",
                purple: "bg-purple-500/5 border-purple-500/10 text-purple-300",
                green: "bg-green-500/5 border-green-500/10 text-green-300",
                orange: "bg-orange-500/5 border-orange-500/10 text-orange-300",
              };

              return (
                <div key={idx} className={cn("flex flex-col gap-2 p-4 rounded-xl border", footerColors[item.color])}>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
