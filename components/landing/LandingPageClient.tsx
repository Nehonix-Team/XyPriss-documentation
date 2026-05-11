"use client";

import React from "react";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { CodeShowcase } from "./CodeShowcase";
import { LandingFooter } from "./LandingFooter";
import { DocsHeader } from "../layout/DocsHeader";

export function LandingPageClient() {
  return (
    <div className="min-h-screen bg-xp-bg selection:bg-xp-primary/30 selection:text-xp-primary">
      <DocsHeader />
      <main>
        <Hero />
        <Features />
        <CodeShowcase />
      </main>
      <LandingFooter />
    </div>
  );
}
