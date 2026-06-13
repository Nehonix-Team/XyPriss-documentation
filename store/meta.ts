"use client";

import { docsConfig } from "@/lib/docs-config";
import { defineFlow, getFlow } from "fractostate";

interface MetaState {
  title: string;
  description: string;
}

export const MetaFlow = defineFlow(
  "meta",
  {
    title: "XyPriss - Enterprise-Grade Hybrid Web Framework",
    description:
      "Stop Coding Backends. Start Deploying Fortresses. XyPriss is a Hybrid Native (Go) + TypeScript framework built for extreme performance and zero-trust security.",
  } as MetaState,
  {
    actions: {
      // __init__() {},
      setTitle: (title: string) => (ops) => {
        ops.self.title._set(title);
      },
      setDescription: (description: string) => (ops) => {
        ops.self.description._set(description);
      },
      update: (title: string, description: string) => (ops) => {
        ops.self.title._set(title);
        ops.self.description._set(description);
      },
      getDTitle: (pathname: string) => (ops) => {
        const actions = ops.self.__actions__;
        return actions.findTitleInConfig(
          docsConfig,
          pathname,
        ) as unknown as string | null;
      },
      findTitleInConfig: (items: any[], path: string) => (ops) => {
        for (const item of items) {
          if (item.href === path) return item.title;
          if (item.items) {
            const found = ops.self.__actions__.findTitleInConfig(
              item.items,
              path,
            );
            if (found) return found;
          }
        }
        return null;
      },
    },
  },
);
