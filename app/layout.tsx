import type { Metadata } from "next";
import "./globals.css";
import "./animations.scss";
import "./documentation-modern.scss";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "XyPriss - Enterprise-Grade Node.js Web Framework",
  description:
    "Hybrid Rust + TypeScript framework bridging the power of Rust with the flexibility of Node.js. Built for performance, security, and scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
