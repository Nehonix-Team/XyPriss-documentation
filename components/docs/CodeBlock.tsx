"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

interface CodeTab {
  label: string;
  lang: string;
  code: string;
}

interface CodeBlockProps {
  lang?: string;
  code?: string;
  tabs?: CodeTab[];
  filename?: string;
}

export function CodeBlock({ lang = "bash", code = "", tabs, filename }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const currentCode = tabs ? tabs[activeTab].code : code;
  const currentLang = tabs ? tabs[activeTab].lang : lang;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-xp-border bg-xp-code-bg group">
      {(tabs || filename) && (
        <div className="flex items-center justify-between px-4 py-2 bg-xp-surface/50 border-b border-xp-border">
          <div className="flex gap-2">
            {tabs ? (
              tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
                    activeTab === idx 
                      ? "bg-xp-primary/20 text-xp-primary" 
                      : "text-xp-muted hover:text-xp-text"
                  }`}
                >
                  {tab.label}
                </button>
              ))
            ) : (
              <span className="text-xs font-mono text-xp-muted">{filename || currentLang}</span>
            )}
          </div>
          <button
            onClick={copyToClipboard}
            className="text-xp-muted hover:text-xp-text transition-colors p-1"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      )}
      
      {!tabs && !filename && (
        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
           <button
            onClick={copyToClipboard}
            className="text-xp-muted hover:text-xp-text transition-colors p-1.5 bg-xp-surface/80 rounded-md border border-xp-border"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          </button>
        </div>
      )}

      <div className="relative">
        <SyntaxHighlighter
          language={currentLang}
          style={atomDark}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "transparent",
            fontSize: "0.9rem",
            lineHeight: "1.5",
          }}
        >
          {currentCode.trim()}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
