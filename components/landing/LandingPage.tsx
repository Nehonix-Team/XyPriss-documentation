"use client";

import Link from "next/link";

import { motion } from "motion/react";
import {
  Shield,
  Zap,
  Cpu,
  Lock,
  Server,
  Activity,
  Globe,
  ChevronRight,
  Github,
  RefreshCw,
  Box,
  Copy,
  Layers,
} from "lucide-react";
import { stableVersion } from "@/lib/stableVersion";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="glass-card group p-6 rounded-2xl hover:border-xy-blue/50 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-xy-blue/10 flex items-center justify-center mb-4 group-hover:bg-xy-blue/20 transition-colors">
      <Icon className="w-6 h-6 text-xy-blue" />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const SecurityPoint = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex gap-4 p-4 items-start"
  >
    <div className="flex-shrink-0 mt-1">
      <Icon className="w-5 h-5 text-xy-blue" />
    </div>
    <div>
      <h4 className="font-semibold text-slate-100 mb-1">{title}</h4>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-xy-blue/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://dll.nehonix.com/assets/XyPriss/XLanding-decor-xhead.png"
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
            <span className="font-bold text-2xl tracking-tighter text-white">
              <span className="text-primary">Xy</span>Priss
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#security" className="hover:text-white transition-colors">
              Security
            </a>
            <a
              href="#architecture"
              className="hover:text-white transition-colors"
            >
              Architecture
            </a>
            <a href="/docs/" className="hover:text-white transition-colors">
              Docs
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Nehonix-Team/XyPriss"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <Link
              href="/docs/installation"
              className="bg-transparent border border-xy-blue/50 text-xy-blue hover:bg-xy-blue hover:text-white px-5 py-2 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(59,130,246,0.1)] transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20">
        {/* Background Decorative Panther */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full lg:w-[65%] pointer-events-none opacity-90 mix-blend-screen hidden lg:block">
          <img
            src="https://dll.nehonix.com/assets/XyPriss/XLanding-decor-xd.png"
            alt="Hero Background"
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-widest text-slate-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-xy-blue" />v
              {stableVersion} Stable
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
              <span className="text-white">Stop Coding</span>
              <br />
              <span className="text-white">Backends.</span>
              <br />
              <span className="text-xy-blue text-glow-blue">
                Start Deploying
              </span>
              <br />
              <span className="text-xy-blue text-glow-blue uppercase">
                Fortresses.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
              Enterprise-Grade Hybrid Web Framework. Combine the raw performance
              of{" "}
              <span className="text-xy-blue font-medium italic underline decoration-xy-blue/30 underline-offset-4">
                Go-native engine
              </span>{" "}
              with the productivity of{" "}
              <span className="text-white font-medium">TypeScript</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 items-center">
              <Link
                href="/docs/quick-start"
                className="w-full sm:w-auto bg-xy-deep-blue border border-xy-blue/50 text-white px-10 py-4 rounded-lg font-bold flex items-center justify-center gap-3 hover:bg-xy-blue transition-all group"
              >
                Quick Start{" "}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="w-full sm:w-auto px-5 py-4 rounded-lg bg-white/5 border border-white/10 font-mono text-sm flex items-center gap-4 group hover:border-white/20 transition-all">
                <span className="text-slate-500 font-bold">$</span>
                <span className="text-slate-300">xfpm init my-app</span>
                <Copy className="w-4 h-4 text-slate-600 cursor-pointer hover:text-xy-blue transition-colors" />
              </div>
            </div>
          </motion.div>

          {/* Mobile Background Panther (Smaller/Lower opacity) */}
          <div className="lg:hidden opacity-30 mt-8">
            <img
              src="https://dll.nehonix.com/assets/XyPriss/XLanding-decor-xd.png"
              alt="Decoration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="py-2 px-6">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl py-10 px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-xl bg-xy-blue/10 flex items-center justify-center shrink-0 border border-xy-blue/20">
              <Zap className="w-7 h-7 text-xy-blue" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                XHSC
              </h4>
              <p className="text-slate-500 text-[11px] font-medium leading-tight">
                HYPER-ENGINE
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-xy-blue/10 flex items-center justify-center shrink-0 border border-xy-blue/20">
              <Shield className="w-7 h-7 text-xy-blue" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                SECURE BY
              </h4>
              <p className="text-slate-500 text-[11px] font-medium leading-tight">
                DEFAULT
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-xy-blue/10 flex items-center justify-center shrink-0 border border-xy-blue/20">
              <Globe className="w-7 h-7 text-xy-blue" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                ZERO-COPY
              </h4>
              <p className="text-slate-500 text-[11px] font-medium leading-tight">
                IPC TRANSFERS
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-xl bg-xy-blue/10 flex items-center justify-center shrink-0 border border-xy-blue/20">
              <Layers className="w-7 h-7 text-xy-blue" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">
                HYBRID
              </h4>
              <p className="text-slate-500 text-[11px] font-medium leading-tight">
                ARCHITECTURE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-4 tracking-tight">
            System Core Built for Scale
          </h2>
          <div className="w-20 h-1 bg-xy-blue mb-6" />
          <p className="text-slate-400 max-w-2xl leading-relaxed">
            Every component is engineered for extreme performance and
            military-grade security. No compromises between developer speed and
            operational safety.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Cpu}
            title="XHSC Native Engine"
            description="Statically-linked system core written in Go. Manages multi-core clustering, high-speed radix routing, and hardware telemetry."
          />
          <FeatureCard
            icon={Lock}
            title="XEMS Sidecar Security"
            description="AES-256-GCM encrypted session management. Complete isolation of security context from the main application thread."
          />
          <FeatureCard
            icon={Box}
            title="XFPM Engine"
            description="Optimized package manager for rapid dependency resolution. Built specifically for the XyPriss ecosystem's security requirements."
          />
          <FeatureCard
            icon={Activity}
            title="Real-time Telemetry"
            description="Direct access to low-level system metrics: memory, IOPS, and process state through high-performance native bridges."
          />
          <FeatureCard
            icon={Globe}
            title="Zero-Copy Processing"
            description="High-speed data transfer between native core and JS runtime through shared memory, bypassing standard I/O bottlenecks."
          />
          <FeatureCard
            icon={Server}
            title="Multi-Server Isolation"
            description="Run multiple isolated server instances within a single process, each with its own security and session context."
          />
        </div>
      </section>

      {/* Security Focus */}
      <section id="security" className="py-32 px-6 bg-slate-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-white mb-8">
              Hardened by Neutrality
            </h2>
            <SecurityPoint
              icon={Shield}
              title="Anti-ReDoS Sandbox"
              description="Regex evaluations are offloaded to isolated contexts to prevent Denial of Service attacks from malicious payloads."
            />
            <SecurityPoint
              icon={Lock}
              title="Identity Integrity"
              description="Native verification of every request signature before application-level middleware is even triggered."
            />
            <SecurityPoint
              icon={Server}
              title="Directory Traversal Shield"
              description="Automatic normalization and sanitization of all incoming URIs to eliminate path crawling and injection vulnerabilities."
            />
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-xy-blue to-xy-deep-blue rounded-3xl blur opacity-20 transition duration-1000 group-hover:opacity-40" />
            <div className="relative glass-card rounded-3xl p-10 overflow-hidden">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-3 h-3 rounded-full bg-slate-800" />
                <div className="w-3 h-3 rounded-full bg-slate-800" />
                <div className="w-3 h-3 rounded-full bg-slate-800" />
              </div>
              <div className="space-y-6 font-mono text-sm leading-relaxed">
                <div className="text-xy-blue flex gap-4">
                  <span className="opacity-40">01</span>
                  <span>// Military-Grade Env Protection</span>
                </div>
                <div className="text-slate-400 flex gap-4">
                  <span className="opacity-40">02</span>
                  <span>
                    const secret = process.env.API_KEY; //{" "}
                    <span className="text-red-500">BLOCKED</span>
                  </span>
                </div>
                <div className="text-white flex gap-4">
                  <span className="opacity-40">03</span>
                  <span>const safe = __sys__.__env__.get("API_KEY");</span>
                </div>
                <div className="text-slate-500 flex gap-4">
                  <span className="opacity-40">04</span>
                  <span className="italic">
                    // Native Proxy prevents leakage
                  </span>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500 uppercase tracking-widest font-bold">
                <span>Security Layer: Active</span>
                <RefreshCw className="w-4 h-4 animate-spin-slow text-xy-blue" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Showcase */}
      <section
        id="architecture"
        className="py-32 px-6 max-w-7xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold mb-16 tracking-tight">
          The Hybrid Engine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-xy-blue">
              Native Engine (Go)
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              Handles Networking, Routing, and FS operations with compiled
              precision.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="w-px h-24 bg-gradient-to-b from-transparent via-xy-blue to-transparent" />
            <div className="w-16 h-16 rounded-full border border-xy-blue/30 flex items-center justify-center bg-xy-blue/5 my-4">
              <RefreshCw className="w-8 h-8 text-xy-blue animate-spin-slow" />
            </div>
            <div className="w-px h-24 bg-gradient-to-b from-xy-blue via-xy-blue/30 to-transparent" />
          </div>
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white">Application (TS)</h4>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              Defines business logic, security middleware, and plugin
              controllers.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <img
                  src="https://dll.nehonix.com/assets/XyPriss/XLanding-decor-xhead.png"
                  alt="Footer Logo"
                  className="w-8 h-8 object-contain"
                />
                <span className="font-bold text-2xl tracking-tighter text-white">
                  XyPriss
                </span>
              </div>
              <p className="text-slate-400 max-w-sm mb-8 leading-relaxed font-medium">
                The enterprise-grade Node.js web framework for high-performance
                fortresses. Built for those who demand absolute control.
              </p>
              <div className="flex gap-6">
                <Github className="w-6 h-6 text-slate-500 hover:text-white cursor-pointer transition-all" />
                <Globe className="w-6 h-6 text-slate-500 hover:text-white cursor-pointer transition-all" />
                <Activity className="w-6 h-6 text-slate-500 hover:text-white cursor-pointer transition-all" />
              </div>
            </div>
            <div>
              <h5 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
                Documentation
              </h5>
              <ul className="space-y-5 text-sm text-slate-500 font-medium">
                <li>
                  <a href="#" className="hover:text-xy-blue transition-colors">
                    Setup Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-xy-blue transition-colors">
                    XFPM Protocol
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-xy-blue transition-colors">
                    XEMS Specs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-xy-blue transition-colors">
                    API Reference
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
                Security
              </h5>
              <ul className="space-y-5 text-sm text-slate-500 font-medium">
                <li>
                  <a
                    href="/docs/contributing#disclosure-policy"
                    className="hover:text-xy-blue transition-colors"
                  >
                    Reporting Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-xy-blue transition-colors">
                    Disclosures
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-xy-blue transition-colors">
                    Audits
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
                Company
              </h5>
              <ul className="space-y-5 text-sm text-slate-500 font-medium">
                <li>
                  <a
                    href="https://www.nehonix.com/about"
                    className="hover:text-xy-blue transition-colors"
                  >
                    About Nehonix
                  </a>
                </li>
                <li>
                  <a
                    href="https://dll.nehonix.com/licenses/NOSL/v2"
                    className="hover:text-xy-blue transition-colors"
                  >
                    Licenses (NOSL)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nehonix.com/contact"
                    className="hover:text-xy-blue transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.3em]">
              © 2026 NEHONIX. FORGED IN PERFECTION.
            </div>
            <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                Maintained By
              </span>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                </div>
                <span className="text-[10px] font-black text-white tracking-widest">
                  NEHONIX
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
