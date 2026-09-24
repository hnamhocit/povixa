"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`group fixed bottom-6 right-6 z-[90] flex h-10 w-10 items-center justify-center border border-[var(--ink-line)] bg-[var(--ink)]/80 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-primary hover:text-primary md:bottom-8 md:right-8 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
      <ChevronUp className="h-4 w-4" />
      {/* Optional gaming corner trace */}
      <span className="absolute -right-[1px] -top-[1px] h-2 w-2 border-r border-t border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="absolute -bottom-[1px] -left-[1px] h-2 w-2 border-b border-l border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
