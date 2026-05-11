---
title: Getting Started with XyPriss
description: A step-by-step guide to installing XyPriss and building your first high-performance hybrid server.
---

# Getting Started with XyPriss

Welcome to XyPriss, the hybrid framework designed for building ultra-resilient, high-performance Node.js applications with the power of Rust.

This guide will walk you through the installation process and help you create your first XyPriss server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18** or higher
- **npm** (or yarn/pnpm)
- **bun**
- **TypeScript** (Strongly recommended for the best development experience)

## Installation

You can install XyPriss via your preferred package manager.

```bash
# Using npm
xfpm i xypriss

# Optional: Install the security module for enhanced protection
xfpm i xypriss-security
```

### TypeScript Setup (Recommended)

Since XyPriss is written in **[TypeScript](https://www.typescriptlang.org/)** and **[Rust](https://www.rust-lang.org/)**, it provides first-class type definitions. For a new project, we recommend initializing with TypeScript:

```bash
npm install -D typescript @types/node ts-node
npx tsc --init
```

## Your First XyPriss Server

Let's build a basic server that demonstrates the simplicity of the API.

Create a file named `server.ts`:

```typescript
import { createServer } from "xypriss";

// 1. Initialize the server
const server = createServer({
  server: {
    port: 3000,
    host: "localhost",
  },
});

// 2. Define a route
server.get("/", (req, res) => {
  res.xJson({
    message: "Hello from XyPriss!",
    timestamp: new Date().toISOString(),
    core: "XHSC (Rust)",
  });
});

// 3. Start the server
server.start(undefined, () => {
  console.log("🚀 XyPriss server running at http://localhost:3000");
});
```

To run your server:

```bash
npx ts-node server.ts
```

## Auto Port Switching

One of XyPriss's convenient features is **Auto Port Switching**. If your configured port is busy, XyPriss can automatically find the next available port, which is perfect for development environments.

```typescript
const server = createServer({
  server: {
    port: 3000,
    // If 3000 is taken, it will try 3001, 3002, etc. (up to 3010)
    autoPortSwitch: {
      enabled: true,
      portRange: [3000, 3010],
      strategy: "increment",
    },
  },
});
```

## Adding Caching

XyPriss provides built-in caching capabilities:

### Memory Cache

```typescript
import { createServer } from "xypriss";

const server = createServer({
  server: {
    port: 3000,
  },
  cache: {
    strategy: "memory",
    maxSize: 100 * 1024 * 1024, // 100MB
    ttl: 3600, // 1 hour
  },
});

server.get("/api/data", (req, res) => {
  // This response will be cached automatically
  res.xJson({
    data: "This will be cached",
    timestamp: new Date().toISOString(),
  });
});
```

### Redis Cache

```typescript
const server = createServer({
  cache: {
    strategy: "redis",
    redis: {
      host: "localhost",
      port: 6379,
    },
    ttl: 7200, // 2 hours
  },
});
```

## Request Management

Configure timeouts and concurrency limits:

```typescript
const server = createServer({
  requestManagement: {
    timeout: {
      enabled: true,
      defaultTimeout: 30000, // 30 seconds
      routes: {
        "/api/upload": 300000, // 5 minutes for uploads
        "/api/quick": 5000, // 5 seconds for quick endpoints
      },
    },
    concurrency: {
      maxConcurrentRequests: 1000,
      maxPerIP: 50,
    },
  },
});
```

## Adding Security

### Basic Security

```typescript
import { createServer } from "xypriss";

const server = createServer({
  server: {
    port: 3000,
  },
  // Security middleware is enabled by default
});

// Security notice [!#securityNotice::
XyPriss automatically includes:
 - Helmet for security headers
 - CORS support
 - Rate limiting
 - Input validation /!]
```

### With XyPriss Security Module

```typescript
import { createServer } from "xypriss";
import {
  XyPrissSecurity,
  fString,
  fArray,
  generateSecureToken,
} from "xypriss-security";

const server = createServer({
  server: { port: 3000 },
});

server.post("/api/secure", async (req, res) => {
  try {
    // Use secure data structures
    const secureData = fArray(req.body.items);
    const secureMessage = fString(req.body.message, {
      protectionLevel: "maximum",
    });

    // Generate secure token
    const token = generateSecureToken({
      length: 32,
      entropy: "maximum",
    });

    res.xJson({
      success: true,
      token,
      itemCount: secureData.length,
    });
  } catch (error) {
    res.status(500).json({ error: "Security operation failed" });
  }
});
```

## Clustering

Enable clustering for better performance:

```typescript
const server = createServer({
  cluster: {
    enabled: true,
    workers: "auto", // Use all CPU cores
    autoScale: {
      enabled: true,
      minWorkers: 2,
      maxWorkers: 8,
      cpuThreshold: 80,
    },
  },
});
```

## Middleware

XyPriss is fully compatible with Express.js middleware:

```typescript
import { createServer } from "xypriss";
import morgan from "morgan";
import bodyParser from "body-parser";

const server = createServer();

// Standard Express middleware works
server.use(morgan("combined"));
server.use(bodyParser.json());

// Custom middleware
server.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

server.get("/", (req, res) => {
  const duration = Date.now() - req.startTime;
  res.xJson({
    message: "Hello World",
    processingTime: `${duration}ms`,
  });
});
```

## Error Handling

```typescript
const server = createServer();

// Route handlers
server.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
```

## Environment Configuration

### Development vs Production

```typescript
const server = createServer({
  env: process.env.NODE_ENV || "development",
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost",
  },
  cache: {
    strategy: process.env.NODE_ENV === "production" ? "redis" : "memory",
    redis:
      process.env.NODE_ENV === "production"
        ? {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || "6379"),
          }
        : undefined,
  },
});
```

### Configuration File

Create `xypriss.config.json`:

```json
{
  "$internal": {
    "$plg": {
      "__meta__": {
        "path": "#$./plugin/directory" // [!#workspace::Learn more about the workspace <link to="https://xypriss.nehonix.com/docs/WORKSPACE_SYSTEM?kw=Project+Root+Resolution">system</link>]
      },
      "__xfs__": {
        "path": "$#./path/to/xfs/directory" // [!^workspace::]
      }
    }
  },
  "__sys__": {
    "__PORT__": 4567,
    "__alias__": "my-app",
    "__author__": "Nehonix-Team",
    "__description__": "A starter XyPriss server for building secure web applications",
    "__name__": "my-app",
    "__port__": 4567,
    "__version__": "1.0.0"
  }
}
```

XyPriss will automatically load this configuration.

## Testing Your Application

### Basic Testing

```typescript
import request from "supertest";
import { createServer } from "xypriss";

describe("XyPriss App", () => {
  let server: any;

  beforeAll(() => {
    server = createServer({
      server: { port: 0 }, // Use random port for testing
    });

    server.get("/test", (req, res) => {
      res.xJson({ message: "test" });
    });
  });

  it("should respond to GET /test", async () => {
    const response = await request(server).get("/test").expect(200);

    expect(response.body.message).toBe("test");
  });
});
```

<!--
## Performance Monitoring

```typescript
const server = createServer();

// Get performance metrics
server.get("/metrics", (req, res) => {
  const metrics = server.getMetrics();
  res.xJson(metrics);
});

// Access cache statistics
server.get("/cache-stats", (req, res) => {
  const cache = server.getCache();
  const stats = cache.getStats();
  res.xJson(stats);
});
``` -->

## Next Steps

Now that you have a basic XyPriss server running, you can:

1. **Explore the API**: Check out the [API Reference](./api-reference.md)
2. **Learn the Architecture**: Read the [Architecture Guide](./architecture.md)
3. **Add Security**: Integrate [XyPriss Security](../mods/securityREADME.md)
4. **Optimize Performance**: Configure caching and clustering
5. **Build Plugins**: Extend functionality with custom plugins

## Common Patterns

### API Server with Database

```typescript
import { createServer } from "xypriss";
import { Pool } from "pg"; // PostgreSQL example

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const server = createServer({
  server: { port: 3000 },
  cache: { strategy: "redis" },
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.xJson(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});
```

### Microservice with Health Checks

```typescript
const server = createServer({
  server: { port: 3000 },
  cluster: { enabled: true },
});

// Health check endpoint
server.get("/health", (req, res) => {
  res.xJson({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Ready check endpoint
server.get("/ready", async (req, res) => {
  // Check database connection, external services, etc.
  const isReady = await checkDependencies();

  if (isReady) {
    res.xJson({ status: "ready" });
  } else {
    res.status(503).json({ status: "not ready" });
  }
});
```

You're now ready to build powerful applications with XyPriss!
