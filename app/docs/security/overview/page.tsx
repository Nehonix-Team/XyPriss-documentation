import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { TechGraph } from "@/components/ui/TechGraph";
import {
  Shield,
  ShieldCheck,
  Lock,
  EyeOff,
  Zap,
  Terminal,
  Activity,
  Globe,
} from "lucide-react";

export default function SecurityOverviewPage() {
  const securityNodes = [
    {
      iconName: "Terminal",
      title: "Request Flow",
      subtitle: "Inbound Data",
      color: "blue" as const,
    },
    {
      iconName: "Shield",
      title: "XHSC Bridge",
      subtitle: "Binary Validation",
      color: "primary" as const,
      active: true,
    },
    {
      iconName: "Lock",
      title: "Security Layers",
      subtitle: "CSP / CORS / Signatures",
      color: "purple" as const,
    },
    {
      iconName: "Activity",
      title: "Response Masking",
      subtitle: "Sensitive Data Shield",
      color: "green" as const,
    },
  ];

  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading className="flex justify-center items-center" level={1}>
        Security Architecture
      </SectionHeading>

      <p>
        XyPriss is built with a "Security-First" philosophy, integrating
        enterprise-grade protection directly into the core engine. Unlike
        traditional frameworks that rely on third-party middleware, XyPriss
        utilizes its native <strong>XHSC Bridge</strong> to perform security
        validations at the binary level.
      </p>

      <TechGraph
        title="Security Pipeline"
        badge="Enterprise Protection"
        nodes={securityNodes}
        footer={[
          {
            label: "Performance",
            description: "O(1) matching with minimal CPU overhead.",
            color: "blue",
          },
          {
            label: "Integrity",
            description: "Cryptographic assurance for all data.",
            color: "primary",
          },
        ]}
      />

      <SectionHeading level={2}>Comprehensive Protection Layers</SectionHeading>
      <p>
        The XyPriss security stack is composed of several specialized layers
        designed to neutralize threats before they reach your application logic.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <ShieldCheck className="w-5 h-5" /> Inbound Protection
          </div>
          <p className="text-xs text-slate-400">
            Request signatures, advanced rate limiting, and route-based security
            rules (XSS, SQLi, Path Traversal).
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <EyeOff className="w-5 h-5" /> Outbound Safety
          </div>
          <p className="text-xs text-slate-400">
            Dynamic response manipulation to mask sensitive fields like tokens
            and internal errors before they leave the server.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Lock className="w-5 h-5" /> Environment Shield
          </div>
          <p className="text-xs text-slate-400">
            Strict isolation of environment variables and system file access to
            prevent accidental secret leakage.
          </p>
        </div>
        <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl">
          <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
            <Globe className="w-5 h-5" /> Content Security
          </div>
          <p className="text-xs text-slate-400">
            Flexible CSP configuration with nonce support and wildcard CORS
            pattern matching for complex domains.
          </p>
        </div>
      </div>

      <SectionHeading level={2}>Quick Start</SectionHeading>
      <p>
        Configure the security modules in your server options. XyPriss supports
        three security levels to quickly set up your defensive posture.
      </p>

      <CodeBlock
        language="typescript"
        code={`
          
          import { createServer } from "xypriss";

const app = createServer({
  /**
   * Advanced request lifecycle and traffic management.
   *
   * Includes:
   * - Route-specific timeouts
   * - Network quality detection
   * - Request concurrency protection
   * - Retry and circuit breaker resilience
   * - Payload size limitations
   */
  requestManagement: {
    timeout: {
      enabled: true,

      // Default timeout for all incoming requests
      defaultTimeout: 30000,

      // Route-level timeout overrides
      routes: {
        "/api/upload": 300000,
        "/api/export": 120000,
        "/api/health": 3000,
      },

      staticTimeout: 10000,

      errorMessage: "Request timeout exceeded",
    },

    /**
     * Reject requests from unstable or extremely slow connections.
     */
    networkQuality: {
      enabled: true,

      rejectOnPoorConnection: true,

      // Minimum required bandwidth (1KB/s)
      minBandwidth: 1024,

      // Maximum acceptable latency
      maxLatency: 2000,
    },

    /**
     * Protect the server against request floods
     * and excessive concurrent workloads.
     */
    concurrency: {
      maxConcurrentRequests: 1000,

      maxPerIP: 50,

      queueTimeout: 10000,

      maxQueueSize: 5000,

      /**
       * Prioritize critical routes under heavy load.
       */
      priorityQueue: {
        enabled: true,

        priorities: {
          "/api/auth": 1,
          "/api/payment": 2,
          "/api/upload": 5,
        },
      },
    },

    /**
     * Track request execution stages and slow operations.
     */
    lifecycle: {
      enabled: true,

      trackStartTime: true,

      trackStages: true,

      // Emit warnings for long-running requests
      warnAfter: 5000,
    },

    /**
     * Built-in retry logic and circuit breaker protection.
     */
    resilience: {
      retryEnabled: true,

      maxRetries: 3,

      retryDelay: 1000,

      circuitBreaker: {
        enabled: true,

        failureThreshold: 10,

        resetTimeout: 30000,

        monitoringPeriod: 60000,
      },
    },

    /**
     * Request payload limitations and validation.
     */
    payload: {
      // 10MB request body limit
      maxBodySize: 10 * 1024 * 1024,

      maxUrlLength: 2048,

      maxFields: 100,
    },
  },

  /**
   * Automatically sanitize outgoing JSON responses
   * before they are sent to clients.
   */
  responseManipulation: {
    enabled: true,

    rules: [
      /**
       * Completely hide password fields.
       */
      {
        field: "password",
        replacement: "[MASKED]",
      },

      /**
       * Preserve only the first 4 characters
       * of sensitive API keys.
       */
      {
        field: "apiKey",
        preserve: 4,
        replacement: "****",
      },

      /**
       * Replace credit card patterns globally.
       */
      {
        valuePattern: /\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,
        replacement: "[REDACTED_CARD]",
      },

      /**
       * Remove deeply nested secret tokens.
       */
      {
        field: "user.secretToken",
        replacement: null,
      },
    ],

    maxDepth: 15,
  },

  security: {
    /**
     * XyRS request signature validation.
     *
     * Every request must provide a valid
     * XP-Request-Sig header matching the configured secret.
     */
    requestSignature: {
      secret: __sys__.__env__.getStrict("API_SECRET"),

      headerName: "XP-Request-Sig",

      errorMessage: "Invalid request signature",

      statusCode: 401,

      caseSensitive: false,

      trimValue: true,

      debug: false,

      maxHeaderLength: 256,

      maxFailedAttempts: 10,

      // Temporary block duration (10 minutes)
      blockDuration: 1000 * 60 * 10,

      timingSafeComparison: true,

      rejectSuspiciousPatterns: true,
    },
  },
});

`}
      />

      <Callout type="info" title="Binary-Level Validation">
        XyPriss performs most security checks within the native XHSC bridge
        using optimized Go-based Regex engines. This ensures high-performance
        protection even under extreme load without blocking the Node.js event
        loop.
      </Callout>

      <DocsFooter
        title="General Security Guide"
        description="Learn how to configure security levels and built-in protection modules."
        buttonText="Next: Security Guide"
        href="/docs/security/guide"
        iconName="Shield"
      />
    </div>
  );
}
