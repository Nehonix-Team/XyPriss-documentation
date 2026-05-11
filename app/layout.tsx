import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "XyPriss — Enterprise-Grade Node.js Web Framework",
  description:
    "XyPriss combine la puissance d'un moteur natif écrit en Go avec la flexibilité de TypeScript pour créer des applications web ultra-performantes.",
  icons: {
    icon: "/xypriss-logo.png",
  },
  openGraph: {
    title: "XyPriss Framework",
    description: "The Enterprise-Grade Web Framework for Node.js.",
    url: "https://xypriss.nehonix.com",
    siteName: "XyPriss Documentation",
    images: [
      {
        url: "https://dll.nehonix.com/assets/xypriss/xypriss-og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XyPriss Framework",
    description: "Enterprise-Grade Node.js Web Framework powered by Go.",
    images: ["https://dll.nehonix.com/assets/xypriss/xypriss-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="scroll-smooth">
      <body className="antialiased bg-xp-bg text-xp-text">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
