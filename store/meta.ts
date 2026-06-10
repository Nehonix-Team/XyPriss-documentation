import { defineFlow } from "fractostate";

interface MetaState {
  title: string;
  description: string;
}

export const MetaFlow = defineFlow(
  "meta",
  {
    title:
      "XyPriss - Enterprise-Grade Hybrid Web Framework",
    description:
      "Stop Coding Backends. Start Deploying Fortresses. XyPriss is a Hybrid Native (Go) + TypeScript framework built for extreme performance and zero-trust security.",
  } as MetaState,
  {
    actions: {
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
    },
  },
);
