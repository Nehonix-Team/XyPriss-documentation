import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { ShieldCheck, Zap, Shield, Database, Code, List, Key, Package, ArrowDown, ArrowRight } from "lucide-react";

export default function SecurityGuardsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <ShieldCheck size={14} />
          Routage
        </div>
        <SectionHeading level={1}>Security Guards (XyGuard)</SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          XyGuard est le registre global et déclaratif des guards du framework XyPriss. Il permet de sécuriser les routes et les groupes de routes de manière centralisée, sans imposer d'implémentation sous-jacente spécifique (JWT, sessions, RBAC, etc.).
        </p>
      </div>

      <SectionHeading level={2}>Architecture et Concepts Fondamentaux</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Le fonctionnement de XyGuard repose sur un registre statique et un middleware compilé qui intercepte les requêtes avant l'exécution du gestionnaire principal.
      </p>

      <div className="my-10 flex flex-col items-center font-sans">
        {/* XyGuard Block */}
        <div className="w-full max-w-2xl rounded-xl border border-blue-500/50 bg-blue-500/10 p-5 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-wide">
              XyGuard <span className="text-blue-400/70 text-sm font-normal tracking-normal">(static registry)</span>
            </h3>
          </div>
          <div className="ml-11 flex items-center gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
            <Database className="w-5 h-5 text-blue-400" />
            <code className="text-sm text-slate-300">resolvers: <span className="text-teal-300">Map&lt;string, GuardResolver&gt;</span></code>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="h-10 w-0.5 bg-blue-500 relative shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          <ArrowDown className="absolute -bottom-3 -left-[7px] text-blue-500 w-4 h-4" strokeWidth={3} />
        </div>

        {/* Middleware Block */}
        <div className="w-full max-w-2xl rounded-xl border border-purple-500/50 bg-purple-500/10 p-5 mt-3 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide">createGuardMiddleware()</h3>
            </div>
            <span className="px-2 py-1 rounded text-xs font-mono border border-purple-500/30 bg-purple-500/20 text-purple-300">
              helpers.ts
            </span>
          </div>
          <div className="ml-11 flex flex-col gap-3">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
              <div className="mt-0.5 p-1.5 rounded-lg border border-green-500/30 bg-green-500/20 text-green-400">
                <List className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-slate-300">guards is an <span className="text-green-400 font-semibold">array</span></span>
                <div className="text-slate-400 mt-1 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> executes each inline function
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border border-white/5 bg-black/40">
              <div className="mt-0.5 p-1.5 rounded-lg border border-blue-500/30 bg-blue-500/20 text-blue-400">
                <Key className="w-4 h-4" />
              </div>
              <div className="text-sm">
                <span className="text-slate-300">guards is an <span className="text-blue-400 font-semibold">object</span></span>
                <div className="text-slate-400 mt-1 flex items-center gap-1">
                  <ArrowRight className="w-3 h-3 text-slate-500" /> calls <span className="text-blue-400 px-1">XyGuard.get(key)</span> for each active key
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="h-10 w-0.5 bg-purple-500 relative shadow-[0_0_10px_rgba(168,85,247,0.5)]">
          <ArrowDown className="absolute -bottom-3 -left-[7px] text-purple-500 w-4 h-4" strokeWidth={3} />
        </div>

        {/* Route Block */}
        <div className="w-full max-w-2xl rounded-xl border border-orange-500/50 bg-orange-500/10 p-5 mt-3 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/20 text-orange-400">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide">addRichRoute() / handleGroup()</h3>
            </div>
            <span className="px-2 py-1 rounded text-xs font-mono border border-orange-500/30 bg-orange-500/20 text-orange-300">
              registry.ts / groups.ts
            </span>
          </div>
          <div className="ml-11 flex items-start gap-2 text-sm text-slate-300">
            <ArrowRight className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              injects the guard middleware <br/>
              <strong className="text-orange-400">BEFORE</strong> all other route middlewares
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mb-6 space-y-2 leading-relaxed">
        <p><strong>Fonctionnement :</strong></p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Au démarrage de l'application, les résolveurs sont enregistrés via <code>XyGuard.define(name, resolver)</code>.</li>
          <li>Sur chaque route (ou groupe), les guards requis sont déclarés via la propriété <code>guards</code>.</li>
          <li>Le framework compile un middleware de guard qui s'exécute avant le gestionnaire de route.</li>
          <li>Si un guard échoue, la requête est immédiatement rejetée avec le code d'état HTTP approprié (401 ou 403). Le gestionnaire principal n'est jamais appelé.</li>
        </ol>
      </div>

      <SectionHeading level={2}>XyGuard.define() — Enregistrement</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        La méthode <code>XyGuard.define()</code> permet d'enregistrer la logique d'un guard. Il est recommandé de les définir au point d'entrée du serveur, avant le montage des routes.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { XyGuard } from "xypriss";

// Guard d'authentification standard
XyGuard.define("authenticated", (req) => {
    return !!(req as any).user ? true : "Non authentifié";
});

// Guard basé sur les rôles
XyGuard.define("roles", (req, required) => {
    const user = (req as any).user;
    if (!user) return "Non authentifié";
    return required.includes(user.role);
});

// Guard personnalisé (ex: Liste blanche d'IP)
XyGuard.define("ipWhitelist", (req) => {
    const allowedIps = ["127.0.0.1", "192.168.1.100"];
    return allowedIps.includes(req.ip ?? "") ? true : \`IP \${req.ip} non autorisée\`;
});`}
      />

      <SectionHeading level={2}>Utilisation sur une Route</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        La propriété <code>guards</code> est passée dans les options de la route. L'utilisation de la syntaxe objet déclarative est fortement recommandée.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { router } from "./router";

router.put(
    "/admin/settings",
    {
        guards: {
            authenticated: true,
            roles: ["admin"],
            ipWhitelist: true, // Guard personnalisé
        },
    },
    (req, res) => {
        res.json({ success: true, message: "Paramètres mis à jour" });
    },
);`}
      />

      <Callout type="info" title="Ordre d'évaluation">
        Les guards déclaratifs (format objet) sont évalués selon l'ordre d'itération de <code>Object.entries()</code>. Le premier guard qui échoue court-circuite immédiatement la chaîne et renvoie la réponse d'erreur.
      </Callout>

      <SectionHeading level={2}>Utilisation sur un Groupe</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Il est possible d'appliquer des guards à l'échelle d'un groupe. Ceux-ci s'exécuteront avant les guards spécifiques à chaque route.
      </p>
      <CodeBlock
        language="typescript"
        code={`router.group(
    {
        prefix: "/admin",
        guards: {
            authenticated: true,
            roles: ["admin"],
        },
    },
    (adminRouter) => {
        // Cette route requiert en plus la permission "reports:export"
        adminRouter.get(
            "/reports/export",
            {
                guards: { permissions: ["reports:export"] },
            },
            exportHandler,
        );
    },
);`}
      />

      <SectionHeading level={2}>Valeurs de Retour et Comportement HTTP</SectionHeading>
      
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left border-collapse border border-white/10 text-sm">
          <thead>
            <tr className="bg-white/[0.05]">
              <th className="p-3 border border-white/10 font-bold text-white">Valeur retournée</th>
              <th className="p-3 border border-white/10 font-bold text-white">Statut HTTP</th>
              <th className="p-3 border border-white/10 font-bold text-white">Corps de la réponse</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-white/10 text-green-400 font-mono">true</td>
              <td className="p-3 border border-white/10">Aucun</td>
              <td className="p-3 border border-white/10 text-slate-400">Accès accordé, passage au prochain guard.</td>
            </tr>
            <tr className="bg-white/[0.02]">
              <td className="p-3 border border-white/10 text-red-400 font-mono">false</td>
              <td className="p-3 border border-white/10">401 / 403</td>
              <td className="p-3 border border-white/10 text-slate-400">Message d'erreur générique par défaut.</td>
            </tr>
            <tr>
              <td className="p-3 border border-white/10 text-yellow-400 font-mono">"message"</td>
              <td className="p-3 border border-white/10">401 / 403</td>
              <td className="p-3 border border-white/10 text-slate-400"><code>{`{ success: false, error: "message" }`}</code></td>
            </tr>
          </tbody>
        </table>
      </div>

      <Callout type="warning" title="Recommandation de conception">
        Pour fournir des messages d'erreur précis et utiles aux clients de l'API, il est préférable de renvoyer une chaîne de caractères (string) détaillant la raison du rejet plutôt que de renvoyer simplement <code>false</code>.
      </Callout>

      <SectionHeading level={2}>Auto-complétion TypeScript</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        XyPriss expose l'interface <code>CustomGuards</code> permettant de bénéficier de l'auto-complétion pour les guards personnalisés via la fusion de déclarations (Declaration Merging).
      </p>

      <CodeBlock
        language="typescript"
        code={`// Dans un fichier .d.ts de votre projet
declare module "xypriss" {
    interface CustomGuards {
        ipWhitelist?: boolean;
        plan?: "free" | "starter" | "premium" | "enterprise";
        apiKey?: boolean;
    }
}`}
      />

      <DocsFooter
        title="Fonctionnalités Avancées"
        description="Optimisez vos routes avec le rate limiting, la mise en cache et les hooks de cycle de vie."
        buttonText="Suivant: Fonctionnalités Avancées"
        href="/docs/routing/advanced"
        iconName={"Zap"}
      />
    </div>
  );
}
