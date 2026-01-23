<div align="center">
  <img src="https://dll.nehonix.com/assets/xypriss/file_0000000083bc71f4998cbc2f4f0c9629.png" width="128" height="128" alt="XyPriss Logo" />
  
  # XyPriss Documentation
  
  ### *Hybrid Rust + TypeScript Web Framework*
  
  [![License: NOSL](https://img.shields.io/badge/License-NOSL-blue.svg)](https://dll.nehonix.com/licenses/NOSL)
  [![Version](https://img.shields.io/badge/version-1.0.0--beta.2-green.svg)](https://github.com/Nehonix-Team/XyPriss)
  [![Documentation](https://img.shields.io/badge/docs-live-orange.svg)](https://xypriss.nehonix.com)
  
  [Official Site](https://nehonix.com) • [Main Repository](https://github.com/Nehonix-Team/XyPriss) • [Documentation](https://xypriss.nehonix.com)
</div>

---

## Welcome to XyPriss

**XyPriss** is an enterprise-grade web framework designed to bridge the raw performance of **Rust** with the flexibility and developer experience of **Node.js**. This repository hosts the official documentation, built with **Next.js 15** and a custom-engineered cosmic visual engine.

### Key Pillars

- **Hybrid Core (XHSC)**: An independent Rust server engine handling routing and hardware monitoring at microsecond latency.
- **XFPM (XyPriss Package Manager)**: A dedicated, ultra-fast package manager optimized for the XyPriss ecosystem.
- **Security First**: 12+ built-in security modules (CSRF, XSS, Rate Limiting) designed for production environments.
- **Unified DX**: Write business logic in TypeScript while benefiting from a Rust-powered high-speed gateway.

---

## Technological Stack

This documentation site is a showcase of modern web engineering:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Sass/SCSS](https://sass-lang.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Visuals**: Future-classic video background and "typing-style" entrance animations.
- **Content**: Markdown-driven documentation with automatic SEO revalidation.

---

## Local Development

To run the documentation locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Nehonix-Team/XyPriss-documentation.git
   cd XyPriss-documentation
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   xfpm dev
   ```

4. **Visit the site**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Interactive Documentation Syntax

To create interactive code blocks with floating details and flux connectors, use the following syntax inside your markdown code blocks. **Tags can be placed anywhere (inline, beginning of line, or as comments).**

### 1. Master Trigger (Zap Icon)

Defines the main explanation for a piece of code.

- **Single-line Syntax**: `[!#id::Your detail content here]`
- **Multi-line Syntax**:
  ```text
  [!#id::
  Line 1
  Line 2 /!]
  ```
- **Example**: `workers: "auto", [!#cluster::Detects available CPU cores]`

### 2. Secondary Trigger (Branch Icon)

Connects another line of code to an existing Master explanation using the same `id`.

- **Syntax**: `[!^id::]`
- **Example**: `strategy: "least-conn", [!^cluster::]`

### 3. Rich Links

You can add interactive links inside the detail content.

- **Syntax**: `<link to="URL">Label</link>`
- **Example**: `[!#api::See our <link to="/docs/api">Full API</link>]`

_Note: These markers and their content are automatically stripped when a user clicks the "Copy" button, ensuring the code remains clean and functional._

---

## Contributing

Contributions are welcome! If you find any errors in the documentation or want to add a guide:

1. Fork the project.
2. Create your branch (`git checkout -b feature/AmazingGuide`).
3. Commit your changes (`git commit -m 'Add: New Guide for XFPM'`).
4. Push to the branch (`git push origin feature/AmazingGuide`).
5. Open a Pull Request.

---

<div align="center">
  <p>Licensed under <b>NOSL</b> (Nehonix Open Source License)</p>
</div>
