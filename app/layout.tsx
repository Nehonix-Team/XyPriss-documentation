import { ThemeProvider } from "next-themes";
import "./globals.css";
export { metadata } from "./metadata";
import "./style.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Nehonix",
              url: "https://nehonix.com",
              logo: "https://xypriss.nehonix.com/xypriss-logo.png",
              sameAs: ["https://github.com/Nehonix-Team"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "technical support",
                url: "https://xypriss.nehonix.com/docs/contributing#disclosure-policy",
              },
            }),
          }}
        />
        <link rel="canonical" href="https://xypriss.nehonix.com" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
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
