import LandingPage from "@/components/landing/LandingPage";

export const revalidate = 14400; // 4 hours

export default function Home() {
  return (
    <div
      className="dark min-h-screen bg-black text-white"
      style={
        {
          "--background": "#000000",
          "--foreground": "#f8fafc",
          "--primary": "#3b82f6",
          "--muted": "#0f172a",
          "--muted-foreground": "#94a3b8",
          "--border": "#1e293b",
        } as React.CSSProperties
      }
    >
      <LandingPage />
    </div>
  );
}
