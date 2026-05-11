# XyPriss Docs — Architecture v2 (Stable Release)

> **Objectif** : Remplacer le système `.md` → render dynamique par une architecture de pages React manuelles, modulaires, maintenables par la communauté. Chaque contributeur reçoit 1–3 fichiers `.md` comme spécification, écrit sa page, push et passe la main.

---

## 1. Vue d'ensemble de l'arbre de fichiers cible

```
app/
├── layout.tsx                        ← Root layout (ThemeProvider, fonts)
├── page.tsx                          ← Landing page (inchangée, déjà propre)
├── not-found.tsx                     ← 404 global
│
└── docs/
    ├── layout.tsx                    ← ★ UNIQUE layout pour toutes les pages doc
    │                                    (Header, Sidebar, TableOfContents, Footer)
    │
    ├── page.tsx                      ← /docs → redirect vers /docs/introduction
    │
    ├── introduction/
    │   └── page.tsx                  ← /docs/introduction
    ├── installation/
    │   └── page.tsx
    ├── quick-start/
    │   └── page.tsx
    │
    ├── core/
    │   ├── page.tsx                  ← /docs/core (index de section)
    │   ├── xhsc/
    │   │   └── page.tsx              ← /docs/core/xhsc
    │   ├── xstatic/
    │   │   └── page.tsx
    │   ├── workspace/
    │   │   └── page.tsx
    │   ├── global-apis/
    │   │   └── page.tsx
    │   └── const-api/
    │       └── page.tsx
    │
    ├── security/
    │   ├── page.tsx
    │   ├── overview/
    │   │   └── page.tsx
    │   ├── xems/
    │   │   └── page.tsx
    │   ├── environment-shield/
    │   │   └── page.tsx
    │   └── honeypot/
    │       └── page.tsx
    │
    ├── plugins/
    │   ├── page.tsx
    │   ├── overview/
    │   │   └── page.tsx
    │   ├── api-reference/
    │   │   └── page.tsx
    │   └── permissions/
    │       └── page.tsx
    │
    └── api-reference/
        ├── page.tsx
        └── response/
            └── page.tsx

components/
├── docs/                             ← ★ Primitives docs réutilisables
│   ├── DocLayout.tsx                 ← Wrapper page (titre, description, breadcrumb)
│   ├── Prose.tsx                     ← Conteneur typographie (remplace prose tailwind)
│   ├── CodeBlock.tsx                 ← Bloc de code avec onglets TS/JS + copier
│   ├── Callout.tsx                   ← NOTE / WARNING / CAUTION / TIP
│   ├── PropsTable.tsx                ← Tableau d'API (prop, type, défaut, desc)
│   ├── Steps.tsx                     ← Numérotation étapes
│   ├── TabGroup.tsx                  ← Onglets (ex: TypeScript | JavaScript)
│   ├── SectionHeading.tsx            ← H2/H3 avec ancre auto
│   └── OnThisPage.tsx                ← Table des matières auto (côté droit)
│
├── layout/
│   ├── DocsHeader.tsx                ← Header docs (logo, nav, search, thème, GitHub)
│   ├── DocsSidebar.tsx               ← Sidebar gauche (navigation hiérarchique)
│   └── DocsFooter.tsx                ← Pager prev/next + lien "Edit on GitHub"
│
└── ui/                               ← Composants génériques (inchangés)
    ├── badge.tsx
    ├── button.tsx
    └── card.tsx

lib/
├── docs-config.ts                    ← ★ Navigation sidebar (source unique de vérité)
├── docs-meta.ts                      ← Helpers generateMetadata() réutilisables
└── utils.ts
```

---

## 2. Le contrat d'une page doc (ce que chaque contributeur écrit)

Chaque page est un **Server Component Next.js** standard. Voici le template exact à copier-coller :

```tsx
// app/docs/[section]/[page]/page.tsx
import { DocLayout } from "@/components/docs/DocLayout";
import { Prose } from "@/components/docs/Prose";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { PropsTable } from "@/components/docs/PropsTable";
import { SectionHeading } from "@/components/docs/SectionHeading";
import { generateDocMeta } from "@/lib/docs-meta";
import type { Metadata } from "next";

// ── SEO ──────────────────────────────────────────────────────────────────────
export const metadata: Metadata = generateDocMeta({
  title: "Titre de la page",
  description: "Description courte pour les moteurs de recherche.",
  slug: "section/page",
});

// ── Sections pour la table des matières (OnThisPage) ─────────────────────────
const TOC = [
  { id: "apercu",      label: "Aperçu" },
  { id: "utilisation", label: "Utilisation" },
  { id: "api",         label: "Référence API" },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function MaPage() {
  return (
    <DocLayout
      title="Titre affiché"
      description="Sous-titre / chapeau visible en haut de page."
      toc={TOC}
      editPath="app/docs/section/page/page.tsx"
    >
      <Prose>
        <SectionHeading id="apercu" level={2}>Aperçu</SectionHeading>
        <p>Contenu rédigé directement en JSX...</p>

        <Callout type="note">
          Conseil utile à mettre en avant.
        </Callout>

        <SectionHeading id="utilisation" level={2}>Utilisation</SectionHeading>
        <CodeBlock
          tabs={[
            { label: "TypeScript", lang: "ts", code: `import { XyPriss } from "xypriss";` },
            { label: "JavaScript", lang: "js", code: `const { XyPriss } = require("xypriss");` },
          ]}
        />

        <SectionHeading id="api" level={2}>Référence API</SectionHeading>
        <PropsTable rows={[
          { prop: "port",    type: "number",  default: "3000",  description: "Port d'écoute du serveur." },
          { prop: "enabled", type: "boolean", default: "true",  description: "Active le module." },
        ]} />
      </Prose>
    </DocLayout>
  );
}
```

**Ce que le contributeur NE touche PAS :**
- `app/docs/layout.tsx` (layout global docs)
- `components/docs/*` (primitives)
- `components/layout/*` (header, sidebar, footer)
- `lib/docs-config.ts` — sauf pour **ajouter son entrée de navigation** (voir §4)

---

## 3. Primitives docs — contrat d'interface

### `DocLayout`
```ts
interface DocLayoutProps {
  title: string;
  description?: string;
  toc?: { id: string; label: string; level?: 2 | 3 }[];
  editPath?: string;       // chemin relatif GitHub pour "Edit this page"
  children: ReactNode;
}
```
Rend : breadcrumb auto, titre H1, description, contenu enfant, table des matières droite, pager prev/next bas de page.

### `CodeBlock`
```ts
interface CodeBlockProps {
  // Mode mono-onglet
  lang?: string;
  code?: string;
  // Mode multi-onglets
  tabs?: { label: string; lang: string; code: string }[];
  filename?: string;       // affiché en haut du bloc
  highlight?: number[];    // lignes à surligner
}
```

### `Callout`
```ts
type CalloutType = "note" | "warning" | "caution" | "tip";
interface CalloutProps { type: CalloutType; title?: string; children: ReactNode; }
```

### `PropsTable`
```ts
interface PropsTableRow {
  prop: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}
interface PropsTableProps { rows: PropsTableRow[]; caption?: string; }
```

### `Steps`
```tsx
<Steps>
  <Step title="Installer XFPM">...</Step>
  <Step title="Créer le projet">...</Step>
</Steps>
```

### `SectionHeading`
```ts
// Génère automatiquement un id slugifié + lien ancre (#)
interface SectionHeadingProps {
  id: string;
  level: 2 | 3 | 4;
  children: ReactNode;
}
```

---

## 4. Source unique de vérité : `lib/docs-config.ts`

```ts
// lib/docs-config.ts
export type DocItem  = { title: string; href: string; badge?: "new" | "beta" };
export type DocGroup = { title: string; items: DocItem[] };

export const docsConfig: DocGroup[] = [
  {
    title: "Démarrage",
    items: [
      { title: "Introduction",    href: "/docs/introduction" },
      { title: "Installation",    href: "/docs/installation" },
      { title: "Quick Start",     href: "/docs/quick-start" },
    ],
  },
  {
    title: "Core",
    items: [
      { title: "XHSC Core",       href: "/docs/core/xhsc" },
      { title: "XStatic",         href: "/docs/core/xstatic" },
      { title: "Workspace",       href: "/docs/core/workspace" },
      { title: "Global APIs",     href: "/docs/core/global-apis" },
      { title: "Const API",       href: "/docs/core/const-api" },
    ],
  },
  {
    title: "Sécurité",
    items: [
      { title: "Vue d'ensemble",  href: "/docs/security/overview" },
      { title: "XEMS",            href: "/docs/security/xems" },
      { title: "Env Shield",      href: "/docs/security/environment-shield" },
      { title: "Honeypot",        href: "/docs/security/honeypot" },
    ],
  },
  {
    title: "Plugins",
    items: [
      { title: "Vue d'ensemble",  href: "/docs/plugins/overview" },
      { title: "API Reference",   href: "/docs/plugins/api-reference" },
      { title: "Permissions",     href: "/docs/plugins/permissions" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "Vue d'ensemble",  href: "/docs/api-reference" },
      { title: "res.sendFile()",  href: "/docs/api-reference/response" },
    ],
  },
];

// Helpers (utilisés par DocLayout pour le pager prev/next)
export const flatDocs: DocItem[] = docsConfig.flatMap((g) => g.items);

export function getPagerLinks(href: string) {
  const idx = flatDocs.findIndex((d) => d.href === href);
  return {
    prev: idx > 0                    ? flatDocs[idx - 1] : null,
    next: idx < flatDocs.length - 1  ? flatDocs[idx + 1] : null,
  };
}
```

**Règle d'or :** quand tu ajoutes une page, tu ajoutes **une seule ligne** dans ce fichier. C'est tout.

---

## 5. `lib/docs-meta.ts` — SEO mutualisé

```ts
// lib/docs-meta.ts
import type { Metadata } from "next";

const BASE_URL = "https://xypriss.nehonix.com";
const OG_IMAGE  = "https://dll.nehonix.com/assets/xypriss/xypriss-og.png";

export function generateDocMeta({
  title,
  description,
  slug,
}: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  const url = `${BASE_URL}/docs/${slug}`;
  const fullTitle = `XyPriss — ${title}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle, description, url,
      type: "article", siteName: "XyPriss",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle, description,
      images: [OG_IMAGE],
    },
  };
}
```

---

## 6. Design système (référence au maquette)

Le design de référence (image fournie) suit un thème **dark cyberpunk / enterprise** :

| Token CSS            | Valeur                    | Usage                        |
|----------------------|---------------------------|------------------------------|
| `--xp-bg`            | `#0a0a0f`                 | Background général           |
| `--xp-surface`       | `#11111a`                 | Cards, sidebar               |
| `--xp-border`        | `rgba(99,102,241,0.15)`   | Séparateurs                  |
| `--xp-primary`       | `#6366f1` (indigo)        | Liens actifs, boutons        |
| `--xp-accent`        | `#06b6d4` (cyan)          | Surlignage code, badges      |
| `--xp-text`          | `#e2e8f0`                 | Texte principal              |
| `--xp-muted`         | `#64748b`                 | Texte secondaire             |
| `--xp-code-bg`       | `#0d1117`                 | Background blocs code        |

Sidebar : largeur `260px`, sticky, scroll interne indépendant.  
Table des matières : `280px` côté droit, visible `xl:` uniquement.  
Contenu central : `max-w-3xl`, padding `py-10 px-6`.

---

## 7. Workflow contributeur — du `.md` à la page

```
┌──────────────────────────────────────────────────────────┐
│  Responsable (toi)                                       │
│  1. Crée le dossier route  app/docs/[section]/[page]/    │
│  2. Donne au contributeur :                              │
│     - Le fichier .md source (spécification du contenu)   │
│     - Le template page.tsx (§2)                          │
│     - La liste des primitives disponibles (§3)           │
│     - L'entrée à ajouter dans docs-config.ts (§4)        │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│  Contributeur                                            │
│  1. Crée app/docs/[section]/[page]/page.tsx              │
│  2. Traduit le .md en JSX avec les primitives            │
│  3. Ajoute son entrée dans docs-config.ts                │
│  4. `git push` → PR → review → merge                    │
└──────────────────────────────────────────────────────────┘
```

### Ce qu'il NE peut PAS casser :
- Il ne modifie **jamais** les primitives (`components/docs/*`)
- Il ne modifie **jamais** le layout (`app/docs/layout.tsx`)
- Sa page est **isolée** : si elle a un bug, seule sa route est affectée
- TypeScript + ESLint bloquent les mauvaises interfaces en CI

---

## 8. Mapping `tmp/nouveau_docs` → routes cibles

| Fichier source                          | Route cible                            | Priorité |
|-----------------------------------------|----------------------------------------|----------|
| `docs/README.md`                        | `/docs/introduction`                   | P0       |
| `docs/core/XHSC_CORE.md`               | `/docs/core/xhsc`                      | P0       |
| `docs/core/XSTATIC.md`                 | `/docs/core/xstatic`                   | P0       |
| `docs/core/SERVER_CORE_ARCHITECTURE.md`| `/docs/core/architecture`              | P1       |
| `docs/core/WORKSPACE_SYSTEM.md`        | `/docs/core/workspace`                 | P1       |
| `docs/core/GLOBAL_APIS.md`             | `/docs/core/global-apis`               | P1       |
| `docs/core/CONST_API.md`               | `/docs/core/const-api`                 | P2       |
| `docs/core/api-reference.md`           | `/docs/api-reference`                  | P1       |
| `docs/core/response-sendfile.md`       | `/docs/api-reference/response`         | P2       |
| `docs/core/SECURITY.md`               | `/docs/security/overview`              | P0       |
| `docs/plugins/README.md`               | `/docs/plugins/overview`               | P1       |
| `docs/plugins/PLUGIN_CORE_HOOKS.md`   | `/docs/plugins/api-reference`          | P2       |

---

## 9. Fichiers à supprimer / archiver

```bash
# Supprimer l'ancienne logique .md
rm -rf lib/doc-helper.ts
rm -rf lib/docs-loader.ts    # si existant
rm -rf app/docs/[[...slug]]/ # remplacé par les routes statiques

# Garder mais vider
# app/api/search/route.ts → adapter pour indexer les nouvelles pages
```

---

## 10. Checklist de migration

- [ ] Créer `components/docs/` avec les 8 primitives
- [ ] Créer `components/layout/DocsHeader`, `DocsSidebar`, `DocsFooter`  
- [ ] Créer `lib/docs-config.ts` et `lib/docs-meta.ts`
- [ ] Réécrire `app/docs/layout.tsx` (utilise les nouveaux composants layout)
- [ ] Migrer page par page selon tableau §8 (P0 → P1 → P2)
- [ ] Supprimer `app/docs/[[...slug]]/` une fois toutes les pages migrées
- [ ] Adapter `app/api/search/route.ts` pour indexer statiquement
- [ ] Mettre à jour `app/sitemap.ts` (partir de `flatDocs`)
- [ ] Rédiger `CONTRIBUTING_DOCS.md` avec le template §2 + §4