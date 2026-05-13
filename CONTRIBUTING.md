# Contributing to XyPriss Documentation

This document outlines the standards and procedures for contributing to the XyPriss documentation codebase. We employ a specific architectural approach that prioritizes visual precision and component-based extensibility over traditional markdown parsing.

## Architectural Methodology

XyPriss Documentation is implemented using manual React components rather than a markdown-to-html pipeline. This decision is based on several core requirements:

1. **Visual Excellence**: Direct implementation in React/Tailwind allows for high-fidelity UI control, including complex animations and glassmorphism effects that exceed standard markdown capabilities.
2. **Technical Flexibility**: This architecture allows for the direct embedding of interactive technical demonstrations and stateful components without the limitations of MDX or similar parsers.
3. **Manual Verification**: The process of converting markdown content into React components serves as a rigorous peer-review phase. It ensures that every technical instruction is verified and styled according to the project's design language.
4. **Consistency**: Utilizing a unified set of documentation components ensures that the developer experience remains consistent across all documentation pages.

## Design System & Aesthetics

All documentation pages must adhere to the **Nehonix Premium** design language. Consistency in color and typography is non-negotiable.

### 1. Color Palette (Dark Mode)

We use a high-contrast, deep-space palette to emphasize technical precision:

- **Primary (Nehonix Blue)**: `#3b82f6` — Used for active states, CTA buttons, and highlights.
- **Background (Zero Black)**: `#000000` — The absolute foundation of all pages.
- **Surface (Deep Slate)**: `#0f172a` — Used for cards, code blocks, and muted backgrounds.
- **Border (Subtle White)**: `rgba(255, 255, 255, 0.05)` — Used for glassmorphism borders.

### 2. Typography

- **Headings & UI**: `Inter` — Clean, modern, and highly legible.
- **Technical Content**: `JetBrains Mono` — Used for all code blocks, inline code, and terminal outputs.

### 3. Visual Language

- **Glassmorphism**: Use `bg-white/[0.02]` with `backdrop-blur-sm` and `border-white/5` for containers.
- **Interactive States**: Hover effects should involve subtle translation (`hover:-translate-y-0.5`) and increased border opacity.
- **Glow Effects**: Use `text-glow-blue` or `shadow-primary/20` sparingly to highlight critical technical milestones.

## Page Development Workflow

### 1. Project Structure

Documentation pages are located within the `app/docs/` directory. Each page follows the Next.js App Router convention:

- Path: `app/docs/[slug]/page.tsx`
- Example: `app/docs/xhsc-core/page.tsx`

### 2. Implementation Template

When implementing a new documentation page, use the following standardized structure:

```tsx
import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Steps, Step } from "@/components/ui/Steps";
import { Rocket } from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>Page Title</SectionHeading>

      <p>Technical description of the feature or concept.</p>

      <Callout type="info">
        Provide important technical context or architectural notes here.
      </Callout>

      <SectionHeading level={2}>Implementation Details</SectionHeading>

      <Steps>
        <Step title="Step Definition">
          Technical instructions.
          <CodeBlock language="bash" code="xfpm run command" />
        </Step>
      </Steps>

      <DocsFooter
        title="Next Topic"
        description="Brief description of the next logical documentation page."
        buttonText="Read More"
        href="/docs/next-topic"
        iconName={Rocket}
      />
    </div>
  );
}
```

### 3. Navigation Configuration

While the search engine dynamically indexes all pages under `app/docs/`, manual registration is required for the sidebar.

- Update `lib/docs-config.ts` to include the new route in the appropriate section.
- **Sub-modules (Grouping)**: To create a nested documentation group, add an `items` array to a route object. These are visually marked in the sidebar with a `Layers` icon and a dedicated button-style toggle.

```typescript
// Example of a grouped route in lib/docs-config.ts
{
  title: "Parent Topic",
  href: "/docs/parent",
  items: [
    { title: "Sub-topic A", href: "/docs/parent/a" },
    { title: "Sub-topic B", href: "/docs/parent/b" },
  ]
}
```

## Component Library

The following components must be used to maintain architectural integrity:

- **SectionHeading**: Used for all titles (level 1) and sub-sections (levels 2-4). Handles automatic anchor ID generation.
- **CodeBlock**: Mandatory for all code snippets. Implements the VS Code Dark Plus theme.
- **Callout**: Used for highlighting important information (types: info, warning, success, danger, tip).
- **TechGraph**: Used for visualizing data flows, architecture layers, and technical pipelines through animated node-link diagrams.
- **Steps / Step**: Mandatory for sequential tutorials or installation flows.
- **DocsFooter**: Mandatory at the end of every page to provide a clear Call-to-Action (CTA) and navigation to the next logical topic.

## Submission Process

All contributions must be submitted via a **Pull Request** targeting the `main` branch. PRs will be rigorously reviewed for technical accuracy, architectural alignment, and design consistency before merging.

Thank you for contributing to the XyPriss ecosystem.
