import React from "react";
import { Terminal, Apple, Monitor, Database } from "lucide-react";

export function CodeShowcase() {
  return (
    <section className="py-24 border-t border-xp-border/30 bg-xp-bg relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-xp-text mb-8">
              Déployez partout.<br />Sans dépendances.
            </h2>
            
            <div className="flex flex-wrap gap-12 mb-12">
              <div className="flex items-center gap-4">
                <Database size={32} className="text-xp-muted" />
                <div>
                  <div className="text-xp-text font-bold text-sm">Linux</div>
                  <div className="text-xp-muted text-xs font-mono">x64, arm64</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Monitor size={32} className="text-xp-muted" />
                <div>
                  <div className="text-xp-text font-bold text-sm">Windows</div>
                  <div className="text-xp-muted text-xs font-mono">x64, arm64</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Apple size={32} className="text-xp-muted" />
                <div>
                  <div className="text-xp-text font-bold text-sm">macOS</div>
                  <div className="text-xp-muted text-xs font-mono">Intel, Apple Silicon</div>
                </div>
              </div>
            </div>

            <div className="p-1 rounded-2xl bg-gradient-to-br from-xp-primary/20 to-transparent border border-xp-border">
              <div className="p-6 bg-xp-code-bg rounded-xl font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex gap-4">
                  <span className="text-xp-primary">$</span>
                  <span className="text-xp-text">xfpm create xypriss@latest my-app</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-xp-primary">$</span>
                  <span className="text-xp-text">cd my-app && xfpm run dev</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-xp-primary/20 blur-[100px] rounded-full group-hover:bg-xp-primary/30 transition-all" />
            <div className="relative p-1 rounded-3xl bg-xp-surface/50 border border-xp-border backdrop-blur-xl">
               <div className="p-6 md:p-10">
                 <div className="flex items-center gap-3 mb-8">
                   <div className="p-3 rounded-xl bg-xp-primary/10 text-xp-primary">
                     <Terminal size={24} />
                   </div>
                   <h3 className="text-2xl font-bold text-xp-text">Code simple. Puissance native.</h3>
                 </div>

                 <pre className="text-sm font-mono leading-relaxed text-xp-text/90 overflow-x-auto whitespace-pre-wrap">
{`import { XyPriss } from 'xypriss';

const app = new XyPriss();

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur XyPriss !' });
});

app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});`}
                 </pre>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
