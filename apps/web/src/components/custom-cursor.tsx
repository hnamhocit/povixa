"use client";

import { Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const isPointer =
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";

      const isTextInput =
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        window.getComputedStyle(target).cursor === "text";

      setIsHovering(!!isPointer);
      setIsText(!!isTextInput);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseMove);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 hidden md:block ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        ref={cursorRef}
        className="absolute left-0 top-0 will-change-transform"
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ease-out ${
            isHovering
              ? "scale-125 -rotate-12"
              : isText
                ? "scale-50 opacity-50"
                : "-rotate-90"
          }`}
          style={{ transformOrigin: "0 0" }}
        >
          <Rocket
            className="h-5 w-5 text-primary drop-shadow-[0_0_8px_var(--primary)]"
            fill="currentColor"
          />
        </div>
      </div>
    </div>
  );
}
