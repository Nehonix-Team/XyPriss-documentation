
## 2. Architecture Multi-Serveur

Le projet utilise le mode **multi-serveur** de XyPriss avec deux serveurs distincts :

```
┌─────────────────────────────────────────────────────────────┐
│                    XyPriss Multi-Server                      │
│                                                             │
│  ┌─────────────────┐         ┌─────────────────────────┐   │
│  │   main.server    │         │      login.server        │   │
│  │   (API Principale)│         │   (Auth / Sécurité)      │   │
│  │                   │         │                          │   │
│  │  Port: Dynamic    │         │  Port: manifest.servers  │   │
│  │  Prefix: /api     │         │       .login.port       │   │
│  │  Strategy: strict │         │  Prefix: /auth          │   │
│  │                   │         │  Plugins: superdev,      │   │
│  │  Routes:          │         │  Swagger (7289), Xyphra  │   │
│  │  - GET /          │         │                          │   │
│  │  - GET /books     │         │  Routes:                 │   │
│  │                   │         │  - GET / (rate limit)    │   │
│  │                   │         │  - POST / (login)        │   │
│  └─────────────────┘         └─────────────────────────┘   │
│           │                           │                     │
│           └─────────────┬─────────────┘                     │
│                         │                                   │
│              ┌──────────▼──────────┐                       │
│              │   Router Principal  │                       │
│              │   (src/router/)     │                       │
│              └─────────────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Structure du Projet

```
supperdev/
├── package.json                          # Dépendances & scripts
├── tsconfig.json                         # Configuration TypeScript
├── fileonix.config.json                  # Config hot-reload (dev)
├── xypriss.config.jsonc                  # Config XyPriss
│
├── src/
│   ├── server.ts                         # Point d'entrée principal
│   │
│   ├── configs/
│   │   ├── manifest.ts                   # Métadonnées app (name, version, author)
│   │   └── xypriss.config.ts             # Configuration multi-serveur
│   │
│   ├── servers/                          # Configurations des serveurs
│   │   ├── main.server.ts                # Serveur API principale
│   │   └── login.server.ts               # Serveur Auth (avec plugins)
│   │
│   ├── routers/                          # Définition des routes
│   │   ├── index.ts                      # Router principal (agrège main + auth)
│   │   ├── main.router.ts                # Routes API (/api/*)
│   │   └── auth.router.ts                # Routes Auth (/auth/*)
│   │
│   ├── controllers/                      # Logique métier (handlers)
│   │   ├── main/
│   │   │   └── books.controller.ts       # Controller pour les livres
│   │   └── auth/
│   │       └── auth.controller.ts        # Controller login
│   │
│   ├── database/
│   │   └── db.ts                         # DB
│   │
│   └── schema/
│       └── schema.ts                 # Validation schéma (en utilisant la librairie reliant-type (https://github.com/Nehonix-Team/reliant-type) ou autre)
│
├── dist/                                 # Build output (généré)
└── README.md
```

---

## 4. Flux d'initialisation

```
1. src/server.ts
   └─> createServer(serverConfigs)  // XyPriss multi-server
   └─> app.use("/", router)        // Router principal
   └─> app.start()                 // Démarrage

2. serverConfigs (xypriss.config.ts)
   └─> multiServer.enabled = true
   └─> servers: [mainServer, loginServer]

3. Router principal (src/router/index.ts)
   └─> /api  → mainRouter
   └─> /auth → authRouter

4. Routers montent les controllers
   └─> /books → BookController.getBooks
   └─> POST / → AuthController.login
```


