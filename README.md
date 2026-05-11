# XyPriss Documentation Engine

This repository contains the source code for the official XyPriss documentation. It is an enterprise-grade documentation engine designed to provide a premium, high-performance developer experience through a component-based React architecture.

## Architectural Overview

Unlike traditional documentation systems that rely on static markdown parsing, the XyPriss Documentation Engine is built using a "React-First" methodology. This allows for:

- **High-Fidelity UI**: Direct control over animations, glassmorphism effects, and responsive layouts via Tailwind CSS v4 and Framer Motion.
- **Dynamic Interactivity**: Native integration of stateful components, such as the VS Code-inspired CodeBlock and dynamic Table of Contents.
- **Verification Integrity**: Manual implementation of documentation pages ensures a rigorous review process for all technical content and examples.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Management**: XFPM (XyPriss Package Manager)

## Getting Started

### Prerequisites

Ensure you have the latest version of the XyPriss ecosystem tools installed.

### Installation

Clone the repository and install dependencies using XFPM:

```bash
git clone https://github.com/Nehonix-Team/XyPriss-documentation.git
cd XyPriss-documentation
xfpm install
```

### Development

Start the development server:

```bash
xfpm run dev
```

The documentation will be available at `http://localhost:3000`.

## Contribution Standards

Contributors must adhere to the following technical and stylistic requirements:

- **No Emojis**: Emojis are strictly prohibited in the codebase and documentation.
- **Professional Tone**: Maintain a serious and technical tone in all written content.
- **Component Usage**: Always use the standardized documentation components (`SectionHeading`, `CodeBlock`, `Callout`, `Steps`) located in `components/docs/`.
- **Licensing**: All contributions are governed by the Nehonix Open Source License (NOSL) v2.0.

For detailed instructions, refer to [CONTRIBUTING.md](CONTRIBUTING.md).

---

© 2026 Nehonix Team. Forged in perfection.
