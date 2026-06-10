"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useFlow } from "fractostate";
import { MetaFlow } from "@/store/meta";
import { docsConfig } from "@/lib/docs-config";

export function SiteMeta() {
  const pathname = usePathname();
  const [, { actions }] = useFlow(MetaFlow);

  useEffect(() => {
    const findTitleInConfig = (items: any[], path: string): string | null => {
      for (const item of items) {
        if (item.href === path) return item.title;
        if (item.items) {
          const found = findTitleInConfig(item.items, path);
          if (found) return found;
        }
      }
      return null;
    };

    const title = findTitleInConfig(docsConfig, pathname);
    if (title) {
      actions.update(`${title} | XyPriss`, `Documentation: ${title}`);
    } else {
      actions.update(
        "Documentation | XyPriss",
        "XyPriss documentation"
      );
    }
  }, [pathname, actions]);

  return null;
}
