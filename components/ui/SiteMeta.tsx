"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getFlow, useFlow } from "fractostate";
import { MetaFlow } from "@/store/meta";

export function SiteMeta() {
  const pathname = usePathname();

  const [, lM] = getFlow(MetaFlow);
  const newTitle = lM.ops.self.__actions__.getDTitle(pathname) as unknown as
    | string
    | null;
  const finalTitle = newTitle || "Documentation | XyPriss";

  useEffect(() => {
    lM.ops.self.title._set(finalTitle);

    // Force the document title to update and prevent Next.js from overwriting it during hydration/streaming
    document.title = finalTitle;
    const observer = new MutationObserver(() => {
      if (document.title !== finalTitle) {
        document.title = finalTitle;
      }
    });

    observer.observe(document.head, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [finalTitle, lM]);

  return <title>{finalTitle}</title>;
}
