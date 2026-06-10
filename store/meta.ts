import { defineFlow } from "fractostate";

interface MetaState {
  title: string;
  description: string;
}

export const MetaFlow = defineFlow("meta", {
  title: "XyPriss Documentation",
  description:
    "Enterprise-Grade Hybrid Web Framework. Stop Coding Backends. Start Deploying Fortresses.",
} as MetaState, {
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
});
