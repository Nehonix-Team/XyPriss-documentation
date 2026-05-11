"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Panther Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://dll.nehonix.com/assets/XyPriss/xp-template-bgimg.png" 
          alt="XyPriss Background" 
          className="w-full h-full object-cover opacity-40 mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-xp-bg via-transparent to-xp-bg" />
      </div>

      <div className="container relative z-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-xp-primary font-black tracking-widest uppercase text-xs mb-4 border border-xp-primary/30 px-3 py-1 rounded-full bg-xp-primary/5">
            Enterprise-Grade
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black text-xp-text tracking-tighter mb-6 leading-tight">
            Node.js <span className="text-xp-primary drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">Web</span><br />
            Framework
          </h1>
          
          <p className="text-xl md:text-2xl text-xp-muted max-w-2xl mx-auto mb-10 font-medium">
            Performance native. Productivité TypeScript. <br className="hidden md:block" />
            Sécurité sans compromis.
          </p>

          <p className="text-sm md:text-base text-xp-muted/60 max-w-3xl mx-auto mb-12 leading-relaxed">
            XyPriss combine la puissance d&apos;un moteur natif écrit en Go avec la flexibilité et la rapidité de développement de TypeScript pour créer des applications web ultra-performantes et sécurisées.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link 
              href="/docs/introduction"
              className="px-8 py-4 bg-xp-primary text-white font-bold rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all flex items-center gap-2 group"
            >
              Commencer
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/docs/introduction"
              className="px-8 py-4 bg-xp-surface border border-xp-border text-xp-text font-bold rounded-xl hover:bg-xp-surface/80 transition-all"
            >
              Documentation
            </Link>

            <a 
              href="https://github.com/nehonix/xypriss"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-xp-surface border border-xp-border text-xp-text font-bold rounded-xl hover:bg-xp-surface/80 transition-all flex items-center gap-2"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Feature Highlights matching Mockup 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24 max-w-5xl mx-auto"
        >
          {[
            { label: "Performance Native", desc: "Moteur XHSC écrit en Go multi-cœurs & zero-copy" },
            { label: "Sécurité Intégrée", desc: "12+ middlewares de sécurité et chiffrement natif" },
            { label: "DX Exceptionnelle", desc: "TypeScript, hot-reload et outils intégrés" },
            { label: "Cross-Platform", desc: "Binaires précompilés pour tous les OS" },
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-xp-surface/30 backdrop-blur-md border border-xp-border rounded-2xl text-left hover:border-xp-primary/30 transition-all group">
               <h3 className="text-xp-text font-bold mb-2 group-hover:text-xp-primary transition-colors">{item.label}</h3>
               <p className="text-xs text-xp-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
