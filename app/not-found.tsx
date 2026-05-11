"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, ShieldAlert } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-xp-bg text-xp-text selection:bg-xp-primary/30 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-xp-primary/5 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-24 h-24 bg-xp-surface border border-xp-border rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <ShieldAlert size={48} className="text-xp-primary" />
          </div>
        </motion.div>

        <h1 className="text-[120px] font-black leading-none tracking-tighter text-xp-text/20 mb-4">
          404
        </h1>
        
        <h2 className="text-3xl md:text-4xl font-black text-xp-text mb-6">
          Signal Perdu
        </h2>
        
        <p className="text-xp-muted mb-12 max-w-md mx-auto leading-relaxed">
          La ressource que vous recherchez semble être hors de portée ou n&apos;existe plus dans cette version de la documentation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/"
            className="px-8 py-4 bg-xp-primary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all flex items-center gap-2"
          >
            <Home size={18} />
            Accueil
          </Link>

          <Link 
            href="/docs/introduction"
            className="px-8 py-4 bg-xp-surface border border-xp-border text-xp-text font-bold rounded-xl hover:bg-xp-surface/80 transition-all flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Retour aux Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
