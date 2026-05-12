"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, MoveLeft, Sparkles, Orbit } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground selection:bg-primary/20 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex flex-col items-center text-center px-4"
      >
        <div className="relative mb-8">
           <div className="absolute inset-0 blur-2xl bg-primary/20 rounded-full animate-pulse" />
           <Orbit className="w-24 h-24 text-primary relative" />
           <div className="absolute -top-2 -right-2 bg-background border border-primary/30 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)]">
             404
           </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
          Lost in Space
        </h1>
        
        <p className="max-w-[500px] text-muted-foreground text-lg mb-10 leading-relaxed">
          The page you are looking for might have been moved, deleted, or never existed in the XyPriss system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <Link 
            href="/docs"
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full font-semibold hover:bg-white/10 transition-all backdrop-blur-md"
          >
            <Sparkles size={18} className="text-primary" />
            View Documentation
          </Link>
        </div>
      </motion.div>

      {/* Cosmic particles decoration */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary/40 rounded-full"
          initial={{ 
            x: Math.random() * 2000 - 1000, 
            y: Math.random() * 2000 - 1000,
            opacity: 0
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
