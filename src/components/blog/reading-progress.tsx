"use client";

import { useState, useEffect } from "react";

function FlagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    const article = document.getElementById("blog-post-article");
    if (!article) return;

    const updateProgress = () => {
      const articleRect = article.getBoundingClientRect();
      const articleTop = articleRect.top + window.scrollY;
      const articleHeight = article.scrollHeight;
      const viewportHeight = window.innerHeight;

      if (articleHeight <= viewportHeight) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      const scrollStart = articleTop;
      const scrollEnd = articleTop + articleHeight - viewportHeight;
      const currentScroll = window.scrollY;

      let rawProgress = 0;
      if (scrollEnd > scrollStart) {
        rawProgress = (currentScroll - scrollStart) / (scrollEnd - scrollStart);
      }

      setProgress(Math.max(0, Math.min(1, rawProgress)));
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  if (!isVisible) return null;

  const ballRotation = progress * 360 * 2;
  const ballLeft = `calc(${progress * 100}% - ${progress * 16}px)`;

  return (
    <div
      className="fixed top-16 left-0 right-0 z-50 h-6"
      aria-hidden="true"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-[#152119] border-y border-[#5F8C6B]/20" />

      {prefersReducedMotion && (
        <div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 bg-[#5F8C6B]"
          style={{ width: `${progress * 100}%` }}
        />
      )}

      {!prefersReducedMotion && (
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#E8F0E9] shadow-md"
          style={{
            left: ballLeft,
            transform: `translateY(-50%) rotate(${ballRotation}deg)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-px bg-[#0D1610]/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="h-px w-full bg-[#0D1610]/20"
              style={{ transform: "rotate(90deg)" }}
            />
          </div>
        </div>
      )}

      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <FlagIcon className="h-4 w-4 text-[#5F8C6B]" />
      </div>
    </div>
  );
}
