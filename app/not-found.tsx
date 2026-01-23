"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, MoveLeft, Sparkles, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white selection:bg-primary/30 overflow-hidden relative">
      {/* Background Cosmic Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 space-y-12 max-w-2xl">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
              <div className="relative p-6 bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                <Orbit className="w-16 h-16 text-primary animate-[spin_10s_linear_infinite]" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter bg-gradient-to-b from-white via-white to-white/20 bg-clip-text text-transparent"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2"
          >
            <div className="h-[1px] w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary px-2">
              Cosmic Signal Lost
            </span>
            <div className="h-[1px] w-8 bg-primary/50" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-zinc-300">
            This node has drifted beyond the observable flux.
          </h2>
          <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
            The documentation path you're tracking doesn't exist in this
            quadrant. Reposition your sensors or return to the main hub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <Button
            asChild
            size="lg"
            className="group h-12 px-8 bg-primary hover:bg-primary/90 text-black font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-12px_rgba(var(--primary-rgb),0.4)]"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 px-8 border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white rounded-2xl transition-all backdrop-blur-md"
          >
            <Link href="/docs" className="flex items-center gap-2 group">
              <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Docs
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20 pointer-events-none"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: ["-10%", "110%"],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
}
