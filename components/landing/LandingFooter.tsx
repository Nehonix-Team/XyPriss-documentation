import React from "react";
import Link from "next/link";
import { Github, Twitter, Youtube, ExternalLink } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="py-20 border-t border-xp-border bg-xp-bg relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-xp-primary rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                X
              </div>
              <span className="text-2xl font-black text-xp-text tracking-tighter">XyPriss</span>
            </Link>
            <p className="text-xp-muted max-w-sm leading-relaxed mb-8">
              Le framework web Node.js nouvelle génération, conçu pour la performance, la sécurité et l&apos;élégance.
            </p>
            <div className="flex gap-4">
              {[Github, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-xp-surface border border-xp-border flex items-center justify-center text-xp-muted hover:text-xp-primary hover:border-xp-primary/30 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xp-text font-bold mb-6">Documentation</h4>
            <ul className="space-y-4 text-sm text-xp-muted">
              <li><Link href="/docs/introduction" className="hover:text-xp-primary transition-colors">Introduction</Link></li>
              <li><Link href="/docs/installation" className="hover:text-xp-primary transition-colors">Installation</Link></li>
              <li><Link href="/docs/core/xhsc" className="hover:text-xp-primary transition-colors">XHSC Core</Link></li>
              <li><Link href="/docs/api-reference" className="hover:text-xp-primary transition-colors">API Reference</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xp-text font-bold mb-6">Communauté</h4>
            <ul className="space-y-4 text-sm text-xp-muted">
              <li><a href="#" className="hover:text-xp-primary transition-colors flex items-center gap-1">GitHub <ExternalLink size={12} /></a></li>
              <li><a href="#" className="hover:text-xp-primary transition-colors flex items-center gap-1">Discord <ExternalLink size={12} /></a></li>
              <li><a href="#" className="hover:text-xp-primary transition-colors flex items-center gap-1">Twitter <ExternalLink size={12} /></a></li>
              <li><a href="#" className="hover:text-xp-primary transition-colors flex items-center gap-1">Discussions <ExternalLink size={12} /></a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-xp-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-xp-muted">
          <p>© 2026 NEHONIX. Tous droits réservés.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-xp-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-xp-text transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-xp-text transition-colors">Licence NOSL</a>
          </div>
        </div>
      </div>
      
      {/* Footer background panther detail */}
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
         <img src="https://dll.nehonix.com/assets/xypriss/file_0000000083bc71f4998cbc2f4f0c9629.png" alt="" className="w-96 h-96" />
      </div>
    </footer>
  );
}
