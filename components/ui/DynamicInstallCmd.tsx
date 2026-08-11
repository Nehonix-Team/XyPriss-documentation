"use client";

import React, { useState, useEffect } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export type OS = "linux" | "macos" | "windows";

interface DynamicInstallCmdProps {
  type: "setup-bins" | "xhsc";
  className?: string;
}

export const DynamicInstallCmd: React.FC<DynamicInstallCmdProps> = ({
  type,
  className = "",
}) => {
  const [selectedOS, setSelectedOS] = useState<OS>("linux");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("win")) {
        setSelectedOS("windows");
      } else if (ua.includes("mac")) {
        setSelectedOS("macos");
      } else {
        setSelectedOS("linux");
      }
    }
  }, []);

  const getCmd = (os: OS) => {
    if (type === "setup-bins") {
      if (os === "windows") {
        return {
          lang: "powershell",
          title: "Windows (PowerShell / Node.js)",
          code: "Invoke-RestMethod https://dll.nehonix.com/repo/xypriss/scripts/setup-bins.js | node",
        };
      }
      return {
        lang: "bash",
        title: os === "macos" ? "macOS (cURL / Node.js)" : "Linux (cURL / Node.js)",
        code: "curl -sL https://dll.nehonix.com/repo/xypriss/scripts/setup-bins.js | node",
      };
    } else {
      // type === "xhsc"
      if (os === "windows") {
        return {
          lang: "powershell",
          title: "Windows (PowerShell)",
          code: "iwr -useb https://dll.nehonix.com/repo/xypriss/install-xhsc.ps1 | iex",
        };
      }
      return {
        lang: "bash",
        title: os === "macos" ? "macOS (Bash)" : "Linux (Bash)",
        code: "curl -sL https://dll.nehonix.com/repo/xypriss/install-xhsc.sh | bash",
      };
    }
  };

  const activeCmd = getCmd(selectedOS);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-lg border border-white/10 text-xs font-mono">
          {(["linux", "macos", "windows"] as OS[]).map((os) => (
            <button
              key={os}
              onClick={() => setSelectedOS(os)}
              className={`px-3 py-1 rounded-md transition-all ${
                selectedOS === os
                  ? "bg-primary text-white font-bold shadow-md shadow-primary/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {os === "linux" ? "Linux" : os === "macos" ? "macOS" : "Windows"}
            </button>
          ))}
        </div>
      </div>

      <CodeBlock
        language={activeCmd.lang}
        title={activeCmd.title}
        code={activeCmd.code}
        className="my-0"
      />
    </div>
  );
};
