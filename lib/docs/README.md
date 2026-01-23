---
title: Introduction to XyPriss
description: XyPriss Hybrid Server Core (XHSC) - A high-performance, hybrid backend framework combining Rust efficiency with Node.js flexibility.
---

# Introduction to XyPriss

**XyPriss Hybrid Server Core (XHSC)** represents a paradigm shift in backend development. It is a high-performance framework that seamlessly fuses the raw speed of **[Rust](https://www.rust-lang.org/)** with the developer-friendly ecosystem of **[Node.js](https://nodejs.org/)**.

Designed for improved scalability, XyPriss enables native networking, robust process management (clustering), and advanced traffic guardrails out of the box.

## Core Value Proposition

- **Hybrid Architecture**: Leverage Rust for computationally intensive tasks and keeping the event loop unblocked, while using Node.js for rapid business logic development.
- **Native Resilience**: Built-in circuit breakers, rate limiting, and resource guardrails managed at the native layer.
- **Zero-Overhead abstractions**: High-level APIs that map directly to optimized native implementations.

## Key Subsystems

### 1. Cluster Management

The **[Cluster Overview](/docs/cluster-overview)** system provides a hybrid master/worker architecture.

- **Scalability**: Automatic worker spawning based on available CPU cores.
- **Stability**: Automatic worker respawning and health monitoring.
- **Load Balancing**: 6 configurable strategies (Least Connection, Round Robin, Random, etc.).

### 2. Traffic Control

Protect your infrastructure with **[Network Quality Guardrails](/docs/NETWORK_CONFIG_GUIDE)**.

- **Latency Protection**: Automatically reject connections from clients with poor network quality.
- **Concurrency Limits**: Enforce strict per-IP and global concurrency limits at the Rust layer, before requests even reach Node.js.

### 3. XHSC Engine

The **[XHSC Core](/docs/XHSC_CORE)** is the engine room.

- **Radix Trie Routing**: Ultra-fast route matching.
- **Native Telemetry**: Real-time metrics with zero JavaScript overhead.

## Quick Look

Here is a glimpse of a production-ready XyPriss server configuration.  
In a `server.ts` file, you can write

```typescript
import { createServer } from "xypriss";

const app = createServer({
  cluster: {
    enabled: true,
    workers: "auto", // Clique to learn more [!#workspace::Automatically detects available cores]
    strategy: "least-connections",
  },
  requestManagement: {
    networkQuality: {
      enabled: true,
      rejectOnPoorConnection: true,
      maxLatency: 500, // Reject if latency > 500ms
    },
  },
});

// Start the server
await app.start(3000);
console.log("XyPriss server running on port 3000");
```

## Next Steps

- **[Getting Started](/docs/getting-started)**: Set up your first XyPriss project.
- **[Configuration Guide](/docs/CONFIGURATION)**: Deep dive into all available configuration options.
- **[Performance Tuning](/docs/cluster-performance-tuning-updated)**: Optimize your server for maximum throughput.
