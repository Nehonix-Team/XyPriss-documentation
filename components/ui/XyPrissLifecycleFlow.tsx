"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  Shield,
  Cpu,
  Layers,
  Play,
  GitBranch,
  ArrowDown,
  Zap,
  Lock,
  EyeOff,
  KeyRound,
  FolderSearch,
  RefreshCw,
  Plug,
  Server,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface LayerSpec {
  number: number;
  title: string;
  subtitle: string;
  accent: "blue" | "rose" | "amber" | "emerald" | "purple" | "cyan";
  icon: React.ElementType;
  steps: StepItem[];
}

const LAYERS: LayerSpec[] = [
  {
    number: 1,
    title: "CLI & Dev Orchestration",
    subtitle: "xfpm dev",
    accent: "blue",
    icon: Terminal,
    steps: [
      {
        id: "1",
        title: "1. User Command",
        description:
          "Invokes xfpm dev (alias xfpm run dev) with automatic target & runtime detection (Bun / Node.js).",
        icon: Terminal,
      },
      {
        id: "2",
        title: "2. Project Discovery",
        description:
          "Resolves project root (package.json, .env, xypriss.config.jsonc) and active execution profile.",
        icon: FolderSearch,
      },
      {
        id: "3",
        title: "3. Hot-Reload Supervisor",
        description:
          "Watches source files and orchestrates controlled, zero-orphan restart cycles.",
        icon: RefreshCw,
      },
    ],
  },
  {
    number: 2,
    title: "Confinement Envelope & Memory Vault",
    subtitle: "libXESS",
    accent: "rose",
    icon: Shield,
    steps: [
      {
        id: "4",
        title: "4. Isolated Memory Vault",
        description:
          "Loads .env secrets exclusively into supervisor memory and scrubs the child runtime environment.",
        icon: Lock,
      },
      {
        id: "5",
        title: "5. File Shield & Canary Decoy",
        description:
          "Intercepts direct .env filesystem reads and transparently serves synthetic canary decoys.",
        icon: EyeOff,
      },
      {
        id: "6",
        title: "6. Confined Runtime Launch",
        description:
          "Spawns the supervised child process with anti-inspection bounds and an authenticated session channel.",
        icon: Shield,
      },
    ],
  },
  {
    number: 3,
    title: "JS/TS Runtime & Bootstrap",
    subtitle: 'import "xypriss"',
    accent: "amber",
    icon: KeyRound,
    steps: [
      {
        id: "7",
        title: "7. Envelope Verification",
        description:
          "Verifies active libXESS confinement on boot (throws XessShieldRequiredError if unconfined).",
        icon: Shield,
      },
      {
        id: "8",
        title: "8. process.env Shield",
        description:
          "Enforces system whitelists, audit logging, and scoped package sandboxes ($env.packages).",
        icon: EyeOff,
      },
      {
        id: "9",
        title: "9. __sys__.__env__ API",
        description:
          "Provides caller-scoped secret retrieval via get(), getStrict(), and zeroizable withSecret().",
        icon: KeyRound,
      },
    ],
  },
  {
    number: 4,
    title: "Application Construction",
    subtitle: "createServer, Routes, Guards, Plugins",
    accent: "emerald",
    icon: Layers,
    steps: [
      {
        id: "10",
        title: "10. Config & Factory",
        description:
          "createServer(configs) resolves &(env).KEY interpolations and Single or Multi-Server (XMS) topology.",
        icon: Cpu,
      },
      {
        id: "11",
        title: "11. App Topology",
        description:
          "Mounts routers (app.use), middlewares, XyGuard security rules, and sandboxed XStatic routes.",
        icon: GitBranch,
      },
      {
        id: "12",
        title: "12. Plugin Manager",
        description:
          "Registers plugins, isolates execution contexts, and prepares lifecycle hooks.",
        icon: Plug,
      },
    ],
  },
  {
    number: 5,
    title: "Startup Orchestration",
    subtitle: "app.start()",
    accent: "purple",
    icon: Play,
    steps: [
      {
        id: "13",
        title: "13. Mode Dispatch",
        description:
          "app.start() evaluates execution mode (Cluster Worker vs. Primary / Single Instance).",
        icon: Server,
      },
      {
        id: "14a",
        title: "14a. Worker Branch",
        description:
          "In cluster mode, attaches the worker to the libSynapx IPC pool and maintains the event loop.",
        icon: GitBranch,
      },
      {
        id: "14b",
        title: "14b. Primary / Single Branch",
        description:
          "Cleans stale endpoints and delegates native network engine startup to XHSC.",
        icon: Zap,
      },
      {
        id: "15",
        title: "15. Hooks & Readiness",
        description:
          'Executes "onServerReady" plugin hooks and invokes the app.start(cb) readiness callback.',
        icon: CheckCircle2,
      },
    ],
  },
  {
    number: 6,
    title: "Native Control Plane & IPC Bus",
    subtitle: "libSynapx ↔ System Services",
    accent: "cyan",
    icon: Activity,
    steps: [
      {
        id: "ipc",
        title: "Authenticated IPC Bus (libSynapx)",
        description:
          "Persistent bidirectional binary transport between JS workers and the native Go core.",
        icon: GitBranch,
      },
      {
        id: "vault",
        title: "Vault Service (env)",
        description:
          "Serves authenticated secret reads and ephemeral byte transfers backed by the libXESS vault.",
        icon: Lock,
      },
      {
        id: "sys",
        title: "System & Lifecycle Services",
        description:
          "Manages process supervision, __sys__.fs, telemetry, and XHSC engine lifecycle.",
        icon: Cpu,
      },
    ],
  },
];

const ACCENT_STYLES: Record<
  LayerSpec["accent"],
  {
    border: string;
    bg: string;
    badge: string;
    icon: string;
    connector: string;
  }
> = {
  blue: {
    border: "border-blue-500/30",
    bg: "bg-blue-500/[0.04]",
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/25",
    icon: "text-blue-400",
    connector: "from-blue-400/50 to-rose-400/50",
  },
  rose: {
    border: "border-rose-500/30",
    bg: "bg-rose-500/[0.04]",
    badge: "bg-rose-500/15 text-rose-300 border-rose-500/25",
    icon: "text-rose-400",
    connector: "from-rose-400/50 to-amber-400/50",
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/[0.04]",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    icon: "text-amber-400",
    connector: "from-amber-400/50 to-emerald-400/50",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/[0.04]",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    icon: "text-emerald-400",
    connector: "from-emerald-400/50 to-purple-400/50",
  },
  purple: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/[0.04]",
    badge: "bg-purple-500/15 text-purple-300 border-purple-500/25",
    icon: "text-purple-400",
    connector: "from-purple-400/50 to-cyan-400/50",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/[0.04]",
    badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    icon: "text-cyan-400",
    connector: "from-cyan-400/50 to-cyan-400/50",
  },
};

export const XyPrissLifecycleFlow = () => {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  return (
    <div className="my-6 p-5 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary uppercase tracking-widest mb-2">
            <Zap size={11} />
            Execution &amp; Boot Lifecycle
          </div>
          <h4 className="text-base md:text-lg font-bold text-white tracking-tight">
            XyPriss Runtime Flow (<code>xfpm dev</code> →{" "}
            <code>app.start()</code>)
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            Layered architecture from CLI supervision and libXESS confinement to
            application bootstrap and the native libSynapx control plane.
          </p>
        </div>

        {/* Layers */}
        <div className="w-full flex flex-col items-center">
          {LAYERS.map((layer, idx) => {
            const style = ACCENT_STYLES[layer.accent];
            const LayerIcon = layer.icon;
            const isSelected = selectedLayer === layer.number;

            return (
              <React.Fragment key={layer.number}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() =>
                    setSelectedLayer(isSelected ? null : layer.number)
                  }
                  className={cn(
                    "w-full rounded-2xl border p-4 md:p-5 transition-all duration-200 cursor-pointer",
                    style.border,
                    style.bg,
                    isSelected && "ring-1 ring-white/20 shadow-lg"
                  )}
                >
                  {/* Layer header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                          style.badge
                        )}
                      >
                        <LayerIcon size={11} />
                        Layer {layer.number}
                      </span>
                      <span className="text-sm font-bold text-white">
                        {layer.title}
                      </span>
                    </div>
                    <code className="text-[11px] font-mono text-muted-foreground bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/5">
                      {layer.subtitle}
                    </code>
                  </div>

                  {/* Steps Grid */}
                  <div
                    className={cn(
                      "grid gap-3",
                      layer.steps.length === 4
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                        : "grid-cols-1 md:grid-cols-3"
                    )}
                  >
                    {layer.steps.map((step) => {
                      const StepIcon = step.icon;
                      return (
                        <div
                          key={step.id}
                          className="p-3.5 rounded-xl border border-white/10 bg-[#0b0f17]/75 flex flex-col gap-1.5"
                        >
                          <div className="flex items-center gap-2">
                            <StepIcon
                              size={14}
                              className={cn("shrink-0", style.icon)}
                            />
                            <span className="text-xs font-bold text-white leading-snug">
                              {step.title}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Animated connector between layers */}
                {idx < LAYERS.length - 1 && (
                  <div className="flex flex-col items-center my-1">
                    <div
                      className={cn(
                        "h-5 w-px bg-gradient-to-b relative overflow-hidden",
                        style.connector
                      )}
                    >
                      <motion.div
                        animate={{ y: ["-100%", "200%"] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                          delay: idx * 0.2,
                        }}
                        className="w-full h-2.5 bg-white/80"
                      />
                    </div>
                    <ArrowDown size={11} className="text-muted-foreground -mt-1" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Public Scope Footnote */}
        <p className="text-[11px] text-muted-foreground text-center mt-5 max-w-2xl leading-relaxed">
          Note: Low-level XHSC HTTP transport details (TLS, socket listeners,
          wire transcoding) and private confinement internals are abstracted from
          this lifecycle overview.
        </p>
      </div>
    </div>
  );
};

