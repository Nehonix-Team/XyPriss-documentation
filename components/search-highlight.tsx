"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function SearchHighlightContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kw = searchParams.get("kw");

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Trigger search if element has cursor: help or is strong/b
      const hasHelpCursor = window.getComputedStyle(target).cursor === "help";
      const isSearchable =
        target.tagName === "STRONG" || target.tagName === "B" || hasHelpCursor;

      if (isSearchable) {
        const text = target.innerText.trim();
        if (text) {
          // Update URL using Next.js router - Trigger BOTH global search (q) and local highlight (kw)
          const params = new URLSearchParams(searchParams.toString());
          params.set("q", text);
          params.set("kw", text);
          router.push(`?${params.toString()}`, { scroll: false });

          // Manually trigger highlight for immediate feedback
          target.classList.add("kw-highlight");
          setTimeout(() => {
            target.classList.remove("kw-highlight");
          }, 3000);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (!kw) return;

    // Small delay to ensure content is rendered
    const timer = setTimeout(() => {
      const searchTerm = kw.toLowerCase();

      // We want to search inside the article
      const article = document.querySelector(".documentation-article");
      if (!article) return;

      // Find all elements that might contain text, including spans for code blocks
      const elements = article.querySelectorAll(
        "p, li, h1, h2, h3, h4, strong, code, span",
      );

      let foundElement: HTMLElement | null = null;

      for (const el of Array.from(elements)) {
        const htmlElement = el as HTMLElement;
        const text = htmlElement.innerText; // Use original case for better text flow check

        if (text.toLowerCase().includes(searchTerm)) {
          // Robust check: Is this the smallest element containing the term?
          const hasDeeperMatch = Array.from(htmlElement.children).some(
            (child) =>
              (child as HTMLElement).innerText
                .toLowerCase()
                .includes(searchTerm),
          );

          if (!hasDeeperMatch) {
            foundElement = htmlElement;
            break;
          }
        }
      }

      if (foundElement) {
        // Scroll to the element
        foundElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // Add highlight effect
        foundElement.classList.add("kw-highlight");

        // Remove highlight after some time
        setTimeout(() => {
          foundElement?.classList.remove("kw-highlight");
        }, 3000);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [kw]);

  return null;
}

export function SearchHighlight() {
  return (
    <Suspense fallback={null}>
      <SearchHighlightContent />
    </Suspense>
  );
}
