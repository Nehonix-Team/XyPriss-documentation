import React from "react";
import { Rocket, Book, Code2, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Features() {
  const features = [
    {
      title: "Démarrage",
      desc: "Installez, configurez et lancez votre première application.",
      icon: Rocket,
      link: "/docs/installation",
      linkText: "Voir les guides"
    },
    {
      title: "Guides",
      desc: "Apprenez les concepts essentiels étape par étape.",
      icon: Book,
      link: "/docs/introduction",
      linkText: "Voir les guides"
    },
    {
      title: "API Reference",
      desc: "Référence complète de toutes les APIs et classes.",
      icon: Code2,
      link: "/docs/api-reference",
      linkText: "Voir la référence"
    },
    {
      title: "Sécurité",
      desc: "Protégez vos applications avec les meilleures pratiques.",
      icon: ShieldCheck,
      link: "/docs/security/overview",
      linkText: "Voir la sécurité"
    }
  ];

  return (
    <section className="py-24 bg-xp-bg relative overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-xp-text mb-6">
            Tout ce dont vous avez besoin, inclus.
          </h2>
          <p className="text-xp-muted max-w-2xl mx-auto">
            XyPriss fournit une boîte à outils complète pour développer, sécuriser et scaler vos applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-xp-surface/50 border border-xp-border hover:border-xp-primary/30 transition-all group flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-xp-primary/10 flex items-center justify-center text-xp-primary mb-6 group-hover:scale-110 group-hover:bg-xp-primary/20 transition-all">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-xp-text mb-4">{feature.title}</h3>
              <p className="text-sm text-xp-muted leading-relaxed mb-6 flex-1">
                {feature.desc}
              </p>
              <Link 
                href={feature.link}
                className="text-xp-primary font-bold text-sm hover:underline flex items-center gap-1"
              >
                {feature.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
