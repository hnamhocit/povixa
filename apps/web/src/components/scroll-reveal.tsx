"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("rm-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      },
    );

    // Give it a tiny delay to ensure DOM is fully painted and stable
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        "section h1, section h2, section h3, section p, .rm-card, article",
      );

      elements.forEach((el) => {
        if (
          el.closest(".rm-card") &&
          el.tagName.toLowerCase() !== "article" &&
          !el.classList.contains("rm-card")
        )
          return;

        if (!el.classList.contains("rm-animate-on-scroll")) {
          el.classList.add("rm-animate-on-scroll");
        }

        // Always observe it, because React StrictMode might unmount/remount
        // and we need to re-observe elements that already have the class.
        if (!el.classList.contains("rm-revealed")) {
          observer.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
