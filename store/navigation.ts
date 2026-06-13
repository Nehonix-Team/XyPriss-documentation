"use client";

import { defineFlow } from "fractostate";

export interface NavigationState {
  collapsedSections: string[];
  expandedItems: string[];
  isLeftSidebarCollapsed: boolean;
  isRightSidebarCollapsed: boolean;
}

export const NavigationFlow = defineFlow(
  "navigation",
  {
    collapsedSections: [],
    expandedItems: [],
    isLeftSidebarCollapsed: false,
    isRightSidebarCollapsed: false,
  } as NavigationState,
  {
    actions: {
      toggleSection: (title: string) => (ops) => {
        const { collapsedSections } = ops.state;
        ops.self.collapsedSections._set(
          collapsedSections.includes(title)
            ? collapsedSections.filter((t) => t !== title)
            : [...collapsedSections, title]
        );
      },
      toggleItem: (title: string) => (ops) => {
        const { expandedItems } = ops.state;
        ops.self.expandedItems._set(
          expandedItems.includes(title)
            ? expandedItems.filter((t) => t !== title)
            : [...expandedItems, title]
        );
      },
      setExpandedItems: (items: string[]) => (ops) => {
        ops.self.expandedItems._set(items);
      },
      setCollapsedSections: (titles: string[]) => (ops) => {
        ops.self.collapsedSections._set(titles);
      },
      expandSections: (titles: string[]) => (ops) => {
        const { collapsedSections } = ops.state;
        ops.self.collapsedSections._set(
          collapsedSections.filter((t) => !titles.includes(t))
        );
      },
      collapseSections: (titles: string[]) => (ops) => {
        const { collapsedSections } = ops.state;
        ops.self.collapsedSections._set(
          Array.from(new Set([...collapsedSections, ...titles]))
        );
      },
      collapseAll: (allTitles: string[]) => (ops) => {
        ops.self.collapsedSections._set(allTitles);
        ops.self.expandedItems._set([]);
      },
      expandAll: () => (ops) => {
        ops.self.collapsedSections._set([]);
      },
      toggleLeftSidebar: () => (ops) => {
        ops.self.isLeftSidebarCollapsed._set(!ops.state.isLeftSidebarCollapsed);
      },
      toggleRightSidebar: () => (ops) => {
        ops.self.isRightSidebarCollapsed._set(!ops.state.isRightSidebarCollapsed);
      },
    },
  }
);
