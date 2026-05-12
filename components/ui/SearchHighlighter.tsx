"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

export const SearchHighlighter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const highlight = searchParams.get("h");

  useEffect(() => {
    if (!highlight || highlight.length < 2) return;

    // Reset previous highlights before applying new ones
    const clearHighlights = () => {
      document.querySelectorAll("mark.search-highlight").forEach(mark => {
        const parent = mark.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
          parent.normalize();
        }
      });
    };

    const applyHighlight = () => {
      const main = document.querySelector("main .prose");
      if (!main) return;

      const walk = (node: Node) => {
        // Skip code blocks, preformatted text, and scripts
        const parentElement = node.parentElement;
        if (parentElement) {
          const tagName = parentElement.tagName.toLowerCase();
          if (tagName === "code" || tagName === "pre" || tagName === "script" || tagName === "style") {
            return;
          }
        }

        if (node.nodeType === 3) { // Text node
          const text = node.nodeValue || "";
          if (text.toLowerCase().includes(highlight.toLowerCase())) {
            const regex = new RegExp(`(${highlight})`, "gi");
            const parts = text.split(regex);
            
            const fragment = document.createDocumentFragment();
            parts.forEach(part => {
              if (part.toLowerCase() === highlight.toLowerCase()) {
                const mark = document.createElement("mark");
                mark.textContent = part;
                // Using a vibrant Amber/Yellow for maximum visibility in dark mode
                mark.className = "search-highlight bg-amber-500/20 text-amber-400 font-bold rounded-sm px-0.5 shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-500 ring-1 ring-amber-500/30";
                fragment.appendChild(mark);
              } else {
                fragment.appendChild(document.createTextNode(part));
              }
            });
            
            node.parentNode?.replaceChild(fragment, node);
          }
        } else if (node.nodeType === 1) {
          Array.from(node.childNodes).forEach(walk);
        }
      };

      walk(main);
      
      // Smooth scroll to the first match
      const firstMark = main.querySelector("mark.search-highlight");
      if (firstMark) {
        setTimeout(() => {
          firstMark.scrollIntoView({ behavior: "smooth", block: "center" });
          // Add a temporary strong glow effect to guide the eye
          firstMark.classList.add("ring-2", "ring-amber-500", "bg-amber-500/40");
          setTimeout(() => {
            firstMark.classList.remove("ring-2", "ring-amber-500", "bg-amber-500/40");
          }, 2500);
        }, 100);
      }
    };

    // Use a slight delay to ensure the page has transitioned and content is stable
    const timer = setTimeout(() => {
      clearHighlights();
      applyHighlight();
    }, 400);

    return () => {
      clearHighlights();
      clearTimeout(timer);
    };
  }, [highlight, pathname]);

  return null;
};
