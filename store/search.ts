import { defineFlow } from "fractostate";
import Fuse from "fuse.js";

export interface SearchItem {
  title: string;
  href: string;
  category: string;
  content: string;
  description: string;
}

export interface SearchState {
  query: string;
  results: any[];
  isLoading: boolean;
  isIndexReady: boolean;
  selectedIndex: number;
}

let fuseInst: Fuse<SearchItem> | null = null;

export const SearchFlow = defineFlow(
  "search",
  {
    query: "",
    results: [],
    isLoading: false,
    isIndexReady: false,
    selectedIndex: 0,
  } as SearchState,
  {
    actions: {
      setQuery: (newQuery: string) => (ops) => {
        ops.self._merge({ query: newQuery, selectedIndex: 0 });
        
        if (!fuseInst) return;

        if (newQuery.trim() === "") {
          ops.self.results._set([]);
        } else {
          const results = fuseInst.search(newQuery);
          ops.self.results._set(results.slice(0, 6));
        }
      },
      nextResult: () => (ops) => {
        const { results, selectedIndex } = ops.state;
        if (selectedIndex < results.length - 1) {
          ops.self.selectedIndex._set(selectedIndex + 1);
        }
      },
      prevResult: () => (ops) => {
        const { selectedIndex } = ops.state;
        if (selectedIndex > 0) {
          ops.self.selectedIndex._set(selectedIndex - 1);
        }
      },
      setSelectedIndex: (index: number) => (ops) => {
        ops.self.selectedIndex._set(index);
      },
      reset: () => (ops) => {
        ops.self._merge({ query: "", results: [], selectedIndex: 0 });
      },
    },
    effects: [
      {
        run: async (ops) => {
          if (ops.state.isIndexReady) return;

          ops.self.isLoading._set(true);
          try {
            const res = await fetch("/api/search");
            const data: SearchItem[] = await res.json();
            
            fuseInst = new Fuse(data, {
              keys: [
                { name: "title", weight: 2 },
                { name: "content", weight: 1 },
                { name: "category", weight: 0.5 }
              ],
              threshold: 0.4,
              includeMatches: true,
              minMatchCharLength: 1,
              ignoreLocation: true,
              distance: 100,
              useExtendedSearch: true,
            });

            ops.self.isIndexReady._set(true);
            ops.self.isLoading._set(false);
          } catch (error) {
            console.error("SearchFlow index error:", error);
            ops.self.isLoading._set(false);
          }
        },
      },
    ],
  }
);
