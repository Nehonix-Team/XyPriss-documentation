---
title: Introduction to XyPriss
description: XyPriss Hybrid Server Core (XHSC) - A high-performance, hybrid backend framework combining Rust efficiency with Node.js flexibility.
---

# Introduction to XyPriss

**XyPriss Hybrid Server Core (XHSC)** represents a paradigm shift in modern backend development. It is an enterprise-grade, high-performance framework that seamlessly integrates the raw computational power of **Rust** with the developer-friendly ecosystem of **Node.js**.

Built for demanding production environments, XyPriss delivers native networking capabilities, robust multi-core process management through intelligent clustering, and comprehensive traffic management guardrails—all configured and ready to deploy out of the box.

### What Makes XyPriss Different

**Hybrid Architecture at Scale**  
XyPriss leverages Rust for computationally intensive operations and low-level system tasks while maintaining the Node.js event loop unblocked. This allows developers to write business logic in TypeScript while benefiting from Rust's performance, memory safety, and multi-threading capabilities.

**Native Resilience**  
The framework includes built-in circuit breakers, intelligent rate limiting, and resource guardrails managed directly at the native layer—eliminating the performance overhead typically associated with middleware-based implementations.

**Zero-Overhead Abstractions**  
XyPriss provides high-level, developer-friendly APIs that map directly to optimized native implementations, ensuring maximum performance without sacrificing code clarity or development velocity.

---

## Cross-Platform Support

XyPriss is engineered for universal high-performance across multiple platforms and architectures. Native Rust binaries (XFPM & XHSC) are provided for:

| Operating System | Architecture            | Status               |
| ---------------- | ----------------------- | -------------------- |
| **Linux**        | x86_64 (AMD64)          | ✅ Fully Supported   |
| **Linux**        | aarch64 (ARM64)         | ✅ Fully Supported   |
| **Windows**      | x86_64 (AMD64)          | ✅ Fully Supported   |
| **Windows**      | aarch64 (ARM64)         | ✅ Fully Supported   |
| **macOS**        | x86_64 (Intel)          | 🛠️ Source Build Only |
| **macOS**        | aarch64 (Apple Silicon) | 🛠️ Source Build Only |

_XyPriss is committed to future-proofing the engine for emerging architectures, including RISC-V._

---

## Architecture

### System Components

XyPriss operates on a three-tier architectural strategy:

#### 1. XHSC (XyPriss Hybrid Server Core)

The high-performance Rust engine that manages:

- HTTP/HTTPS protocol handling with native TLS support
- Ultra-fast radix tree-based routing with microsecond-level latency
- Real-time hardware telemetry and resource monitoring
- Multi-core clustering and load balancing
- Advanced traffic shaping and request prioritization

**XHSC** acts as the high-speed gateway for all incoming traffic, processing millions of requests per second while maintaining low memory overhead.

#### 2. Node.js Application Runtime

The enterprise-ready application layer where developers implement:

- Business logic and application workflows in TypeScript
- Security middleware and authentication handlers
- Data processing and transformation pipelines
- API integrations and third-party services

This layer benefits from the extensive Node.js ecosystem while remaining lightweight due to offloaded system-level operations.

#### 3. XFPM (XyPriss Fast Package Manager)

An ultra-fast, Rust-powered package manager specifically optimized for the XyPriss ecosystem:

- Parallel dependency resolution with intelligent caching
- Lightning-fast package extraction and installation
- Optimized network protocols for reduced download times
- Seamless integration with XyPriss project structure

**We highly recommend using XFPM for all package operations.** [Learn more about XFPM →](https://xypriss.nehonix.com/docs/xfpm?kw=XFPM%20is%20the%20high-performance)

---

## Core Features

### Performance & Scalability

- **Multi-Core Clustering**: Native support for horizontal scaling across CPU cores
- **Radix Tree Routing**: Microsecond-latency path matching and parameter extraction
- **Zero-Copy Operations**: Minimized memory allocations in hot paths
- **High-Precision Telemetry**: Real-time metrics for CPU, memory, and network utilization

### Security Architecture

- **12+ Built-in Security Modules**: Including CSRF protection, XSS prevention, SQL injection guards, and request sanitization
- **Intelligent Rate Limiting**: Adaptive throttling with configurable strategies (fixed window, sliding window, token bucket)
- **TLS/SSL Native Support**: Automatic certificate management and renewal
- **Security Headers**: Automatic injection of recommended security headers (HSTS, CSP, X-Frame-Options)

### Developer Experience

- **TypeScript-First**: Full type safety with comprehensive type definitions
- **Hot Reload**: Instant development feedback without manual restarts
- **Extensible Plugin System**: Permission-based architecture with lifecycle hooks
- **CLI Tools**: Professional-grade command-line utilities for scaffolding and deployment

### Production Features

- **File Upload Management**: Production-ready multipart/form-data handling with streaming support
- **Automated SSL Management**: Integration with XyNginC for certificate provisioning
- **Multi-Server Instances**: Run isolated server configurations with independent security policies
- **Graceful Shutdown**: Coordinated connection draining and resource cleanup

---

## Installation

### Recommended: XyPriss CLI

The fastest and most reliable installation method is via the XyPriss CLI:

```bash
# Unix-based systems (Linux, macOS)
curl -sL https://xypriss.nehonix.com/install.js | node
```

After installation, the `xyp` command will be available globally.

### Alternative: Package Managers

You can also install XyPriss using standard package managers:

```bash
# Using XFPM (recommended)
xfpm install xypriss

# Using Yarn
yarn add xypriss

# Using npm
npm install xypriss
```

### Optional: Security Extensions

For additional security features and hardening:

```bash
xfpm install xypriss-security
```

For detailed platform-specific installation instructions, refer to the [Installation Guide →](./docs/INSTALLATION.md)

---

## Quick Start

### Using the CLI (Recommended)

Create a new XyPriss project with a single command:

```bash
# Initialize new project
xfpm init my-app

# Navigate to project directory
cd my-app

# Start development server
xfpm dev
# Alternatively: xyp dev
```

The development server will start with hot reload enabled and all default security features activated.

### Manual Configuration

For custom setups or integration into existing projects:

```typescript
import { createServer } from "xypriss";

const app = createServer({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
  security: {
    enabled: true,
    csrf: true,
    rateLimit: {
      windowMs: 60000,
      maxRequests: 100,
    },
  },
  cluster: {
    enabled: true,
    workers: "auto", // Auto-detect CPU cores
  },
});

// Define routes
app.get("/", (req, res) => {
  res.json({
    message: "Hello from XyPriss",
    timestamp: Date.now(),
  });
});

app.post("/api/data", (req, res) => {
  const { body } = req;
  // Process data...
  res.json({ success: true, data: body });
});

// Start server
app.start();
```

For comprehensive examples and patterns, visit the [Complete Quick Start Guide →](https://xypriss.nehonix.com/docs/QUICK_START)

---

## Documentation

### Getting Started Resources

| Resource                                                                | Description                                              |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| [Quick Start Guide](https://xypriss.nehonix.com/docs/QUICK_START)       | Installation, basic configuration, and first application |
| [XFPM Guide](https://xypriss.nehonix.com/docs/xfpm)                     | Comprehensive package manager documentation              |
| [Code Examples](https://xypriss.nehonix.com/docs/EXAMPLES)              | Real-world implementation patterns and recipes           |
| [Features Overview](https://xypriss.nehonix.com/docs/FEATURES_OVERVIEW) | Complete feature catalog with use cases                  |

### Core Framework Guides

| Topic                                                           | Description                                                    |
| --------------------------------------------------------------- | -------------------------------------------------------------- |
| [Routing System](https://xypriss.nehonix.com/docs/ROUTING)      | Route configuration, middleware chains, and parameter handling |
| [Security](https://xypriss.nehonix.com/docs/SECURITY)           | Security features, best practices, and compliance guidelines   |
| [File Upload](./docs/FILE_UPLOAD_GUIDE.md)                      | Multipart handling, validation, and storage strategies         |
| [Configuration](https://xypriss.nehonix.com/docs/CONFIGURATION) | Complete configuration reference and environment management    |
| [Multi-Server](https://xypriss.nehonix.com/docs/MULTI_SERVER)   | Orchestrating multiple server instances and load balancing     |

### Plugin Development

| Topic                                                                             | Description                                        |
| --------------------------------------------------------------------------------- | -------------------------------------------------- |
| [Plugin Development](https://xypriss.nehonix.com/docs/PLUGIN_DEVELOPMENT_GUIDE)   | Creating custom plugins with lifecycle integration |
| [Plugin Hooks](https://xypriss.nehonix.com/docs/PLUGIN_CORE_HOOKS)                | Available lifecycle hooks and event system         |
| [Plugin Permissions](https://xypriss.nehonix.com/docs/PLUGIN_PERMISSIONS)         | Security model and permission management           |
| [Console Intercept Hook](https://xypriss.nehonix.com/docs/CONSOLE_INTERCEPT_HOOK) | Advanced logging and debugging capabilities        |

### Advanced Topics

| Topic                                                      | Description                                                |
| ---------------------------------------------------------- | ---------------------------------------------------------- |
| [XJson API](./docs/XJSON_API.md)                           | High-performance JSON serialization and deserialization    |
| [Clustering](./docs/cluster-overview.md)                     | Multi-worker architectures and inter-process communication |

[**Browse All Documentation →**](./docs/)

---

## Security

Security is not an afterthought in XyPriss—it is a foundational design principle. The framework implements defense-in-depth strategies with multiple layers of protection, following OWASP guidelines and industry best practices for secure web application development.

### Security Features

- Automatic HTTPS enforcement with certificate management
- Built-in protection against common vulnerabilities (CSRF, XSS, SQL injection)
- Configurable Content Security Policies
- Request sanitization and validation
- Secure session management
- Rate limiting
- Comprehensive audit logging

### Responsible Disclosure Policy

While XyPriss maintains rigorous security standards through continuous testing and auditing, we acknowledge that vulnerabilities may be discovered. We are committed to responsible disclosure and working collaboratively with the security research community.

**If you discover a security vulnerability:**

1. **Email us immediately:** [support@team.nehonix.com](mailto:support@team.nehonix.com)
2. **Do not open public GitHub issues** for security vulnerabilities
3. Include detailed reproduction steps and impact assessment
4. Allow reasonable time for patching before public disclosure

**Our Commitment:**

- Acknowledgment of your report within 48 hours
- Regular updates on investigation and remediation progress
- Public credit for responsibly disclosed vulnerabilities (unless you prefer anonymity)
- Coordinated disclosure timeline

Your assistance in maintaining the security and integrity of XyPriss is greatly appreciated.

---

## Contributing

XyPriss is an open-source project that thrives on community contributions. We welcome developers, technical writers, security researchers, and users of all skill levels to help improve the framework.

### Ways to Contribute

**Support the Project**

- ⭐ Star the repository on GitHub to increase visibility
- Share XyPriss with your network and development communities
- Write blog posts or tutorials about your experience
- Present XyPriss at meetups or conferences

**Report Issues**

- [Submit bug reports](https://github.com/Nehonix-Team/XyPriss/issues) with detailed reproduction steps
- Include environment details (OS, Node.js version, XyPriss version)
- Provide minimal reproducible examples when possible

**Suggest Enhancements**

- [Open feature discussions](https://github.com/Nehonix-Team/XyPriss/discussions) with clear use cases
- Share implementation ideas and architectural considerations
- Participate in design discussions for upcoming features

**Submit Code**

- Review the [Contributing Guide](./CONTRIBUTING.md) before starting
- Follow existing code style and conventions
- Include comprehensive tests for new features
- Update documentation to reflect changes
- Ensure all CI checks pass before submitting

**Improve Documentation**

- Fix typos, clarify explanations, and improve examples
- Add missing documentation for undocumented features
- Translate documentation to other languages
- Create video tutorials or interactive guides

### Contribution Guidelines

Before submitting a pull request:

1. **Read the Contributing Guide** – Understand our development workflow and standards
2. **Follow Code Style** – Use ESLint and Prettier configurations provided in the repository
3. **Write Tests** – Maintain or improve code coverage
4. **Update Documentation** – Document all user-facing changes
5. **Test Thoroughly** – Verify changes across supported platforms
6. **Write Clear Commits** – Use conventional commit messages

[**Read the Complete Contributing Guide →**](./CONTRIBUTING.md)

---

## Community & Support

### Getting Help

| Resource                                                                  | Purpose                                                 |
| ------------------------------------------------------------------------- | ------------------------------------------------------- |
| [Documentation](https://xypriss.nehonix.com/docs/)                        | Comprehensive guides and API reference                  |
| [GitHub Discussions](https://github.com/Nehonix-Team/XyPriss/discussions) | Community Q&A, feature requests, and general discussion |
| [Issue Tracker](https://github.com/Nehonix-Team/XyPriss/issues)           | Bug reports and technical issues                        |
| [Nehonix Website](https://nehonix.com)                                    | Company information and professional services           |

### Reporting Security Issues

For security-related concerns, always use our dedicated security email:  
**[support@team.nehonix.com](mailto:support@team.nehonix.com)**

**Never report security vulnerabilities through public GitHub issues.**

---

## License

XyPriss is licensed under the **[Nehonix Open Source License (NOSL)](https://dll.nehonix.com/licenses/NOSL)**.

Please review the license terms before using XyPriss in your projects.

---

## Acknowledgments

XyPriss is built and maintained by the **Nehonix Team** with contributions from developers worldwide. We are grateful to the open-source community for their support, feedback, and contributions.

---

**Ready to build something amazing?** [Get started with XyPriss →](https://xypriss.nehonix.com/docs/QUICK_START)
