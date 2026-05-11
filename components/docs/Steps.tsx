import React from "react";

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="relative pl-10 pb-10 last:pb-0 group">
      <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full border border-xp-primary bg-xp-primary/10 text-xp-primary text-sm font-bold transition-all group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)]">
        {/* The number will be injected by the Steps container or we can use CSS counters */}
      </div>
      <div className="absolute left-4 top-8 w-px h-full bg-xp-border group-last:hidden" />
      
      <h3 className="text-xl font-bold text-xp-text mb-2">{title}</h3>
      <div className="text-xp-text/80">{children}</div>
    </div>
  );
}

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 [counter-reset:step]">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return (
            <div className="relative pl-10 pb-10 last:pb-0 group [counter-increment:step]">
              <div className="absolute left-0 top-0 flex items-center justify-center w-8 h-8 rounded-full border border-xp-primary bg-xp-primary/10 text-xp-primary text-sm font-bold transition-all group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] after:content-[counter(step)]">
              </div>
              <div className="absolute left-4 top-8 w-px h-full bg-xp-border group-last:hidden" />
              
              {/* @ts-ignore */}
              <h3 className="text-xl font-bold text-xp-text mb-2">{child.props.title}</h3>
              <div className="text-xp-text/80">{child.props.children}</div>
            </div>
          );
        }
        return child;
      })}
    </div>
  );
}
