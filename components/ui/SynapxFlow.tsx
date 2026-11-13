"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  GitBranch,
  Layers,
  ShieldCheck,
  Zap,
  ArrowDown,
  ArrowUpDown,
  Terminal,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const WORKERS = [
  {
    id: 0,
    label: "TypeScript Worker Pool #0",
    runtime: "libSynapx • Bun / Node.js",
    badge: "Primary",
    status: "Duplex Ready",
  },
  {
    id: 1,
    label: "TypeScript Worker Pool #1",
    runtime: "libSynapx • Bun / Node.js",
    badge: "Active",
    status: "Duplex Ready",
  },
  {
    id: 2,
    label: "TypeScript Worker Pool #N",
    runtime: "libSynapx • Auto-Scaled",
    badge: "Elastic",
    status: "Pool Standby",
  },
];

export const SynapxFlow = () => {
  const [activeWorker, setActiveWorker] = useState<number | null>(null);

  return (
    <div className="my-6 p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
            <Zap size={11} />
            XHSC G5 Data Plane
          </div>
          <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
            Persistent Multiplexed IPC Flow
          </h4>
        </div>

        {/* Layer 1: Native XHSC Core */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-2xl rounded-2xl border border-blue-500/30 bg-blue-500/[0.06] backdrop-blur-sm p-4 md:p-5 shadow-lg shadow-blue-500/5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-400 shrink-0">
                <Cpu size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-tight">
                    Native XHSC Core
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 text-[10px] font-semibold uppercase tracking-wider">
                    Go Engine
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Go Network Layer / Kernel Epoll &amp; Kqueue Listener
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-blue-300 self-start sm:self-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Zero-Copy Socket
            </div>
          </div>
        </motion.div>

        {/* Connector 1: Persistent Multiplexed IPC */}
        <div className="flex flex-col items-center my-1 relative w-full max-w-2xl">
          <div className="h-6 w-px bg-gradient-to-b from-blue-400/50 to-primary/50 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="w-full h-3 bg-gradient-to-b from-transparent via-primary to-transparent"
            />
          </div>

          <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-primary/25 bg-[#0b0f17]/90 backdrop-blur-md flex flex-col sm:flex-row items-center gap-2 sm:gap-4 shadow-md">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <ArrowUpDown size={13} />
              <span>Persistent Multiplexed IPC</span>
            </div>
            <div className="hidden sm:block h-3.5 w-px bg-white/10" />
            <div className="flex flex-wrap justify-center gap-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">
                <Layers size={10} className="text-primary" />
                Binary Wire Framing
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/5">
                <ShieldCheck size={10} className="text-emerald-400" />
                Adaptive Backpressure &amp; Circuit Breaking
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-gradient-to-b from-primary/50 to-primary/80 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
                delay: 0.4,
              }}
              className="w-full h-3 bg-gradient-to-b from-transparent via-primary to-transparent"
            />
          </div>
          <ArrowDown size={12} className="text-primary -mt-1.5" />
        </div>

        {/* Layer 2: libSynapx Dispatcher */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-2xl rounded-2xl border border-primary/40 bg-primary/[0.07] backdrop-blur-sm p-4 md:p-5 shadow-lg shadow-primary/10 relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/30 text-primary shrink-0">
                <GitBranch size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-tight">
                    libSynapx Dispatcher
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[10px] font-semibold uppercase tracking-wider">
                    Core Router
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Intelligent Load Balancer / Dynamic Route Synchronizer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] text-primary self-start sm:self-center">
              <Activity size={12} />
              Pooled Memory Arena
            </div>
          </div>
        </motion.div>

        {/* Connector 2: 3-Way Fan-Out */}
        <div className="w-full max-w-2xl px-8 hidden md:block">
          <div className="relative h-10 w-full">
            {/* Center stem from dispatcher */}
            <div className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-primary/50" />
            {/* Horizontal distribution bar */}
            <div className="absolute top-5 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-emerald-500/40 via-primary/60 to-purple-500/40" />
            {/* Left drop */}
            <div className="absolute top-5 left-[16.66%] h-5 w-px bg-emerald-500/50 overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="w-full h-2.5 bg-emerald-400"
              />
            </div>
            {/* Center drop */}
            <div className="absolute top-5 left-1/2 h-5 w-px -translate-x-1/2 bg-primary/50 overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.25,
                }}
                className="w-full h-2.5 bg-primary"
              />
            </div>
            {/* Right drop */}
            <div className="absolute top-5 right-[16.66%] h-5 w-px bg-purple-500/50 overflow-hidden">
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
                className="w-full h-2.5 bg-purple-400"
              />
            </div>
          </div>
        </div>

        {/* Mobile connector */}
        <div className="flex md:hidden flex-col items-center my-1">
          <div className="h-5 w-px bg-primary/50" />
          <ArrowDown size={12} className="text-primary -mt-1" />
        </div>

        {/* Layer 3: TypeScript Worker Pools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl">
          {WORKERS.map((worker, idx) => {
            const isHighlighted = activeWorker === worker.id;
            const accents = [
              "border-emerald-500/30 bg-emerald-500/[0.05] hover:border-emerald-400/50",
              "border-primary/30 bg-primary/[0.05] hover:border-primary/50",
              "border-purple-500/30 bg-purple-500/[0.05] hover:border-purple-400/50",
            ];
            const iconColors = [
              "text-emerald-400 bg-emerald-500/15 border-emerald-500/25",
              "text-primary bg-primary/15 border-primary/25",
              "text-purple-400 bg-purple-500/15 border-purple-500/25",
            ];
            const dotColors = [
              "bg-emerald-400",
              "bg-primary",
              "bg-purple-400",
            ];

            return (
              <motion.button
                key={worker.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + idx * 0.06 }}
                onMouseEnter={() => setActiveWorker(worker.id)}
                onMouseLeave={() => setActiveWorker(null)}
                onClick={() =>
                  setActiveWorker(isHighlighted ? null : worker.id)
                }
                className={cn(
                  "text-left rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between gap-3 cursor-pointer",
                  accents[idx],
                  isHighlighted && "ring-1 ring-white/20 -translate-y-0.5 shadow-lg"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={cn(
                      "p-2 rounded-lg border shrink-0",
                      iconColors[idx]
                    )}
                  >
                    <Terminal size={15} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-medium text-muted-foreground">
                    {worker.badge}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-white leading-snug">
                    {worker.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">
                    {worker.runtime}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-white/5 text-[10px] text-muted-foreground">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      dotColors[idx],
                      isHighlighted && "animate-ping"
                    )}
                  />
                  <span>{worker.status}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

