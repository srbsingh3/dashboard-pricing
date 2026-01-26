"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ScrollContainerProps {
  children: React.ReactNode;
  className?: string;
  /** Use "thick" for main layout scrollbar, default is thin */
  variant?: "thin" | "thick";
}

/**
 * A scroll container that hides the native scrollbar and shows
 * an overlay scroll indicator only while actively scrolling.
 */
export function ScrollContainer({ children, className, variant = "thin" }: ScrollContainerProps) {
  const thumbWidth = variant === "thick" ? "w-2" : "w-1.5";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollInfo, setScrollInfo] = useState({
    thumbHeight: 0,
    thumbTop: 0,
  });
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const calculateScrollInfo = useCallback((container: HTMLDivElement) => {
    const { scrollTop, scrollHeight, clientHeight } = container;

    // Only show indicator if content is scrollable
    if (scrollHeight <= clientHeight) {
      return { thumbHeight: 0, thumbTop: 0 };
    }

    // Calculate thumb size proportional to visible area
    const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 32);

    // Calculate thumb position
    const scrollableHeight = scrollHeight - clientHeight;
    const thumbTrackHeight = clientHeight - thumbHeight;
    const thumbTop = (scrollTop / scrollableHeight) * thumbTrackHeight;

    return { thumbHeight, thumbTop };
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    setIsScrolling(true);
    setScrollInfo(calculateScrollInfo(container));

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Hide indicator after scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  }, [calculateScrollInfo]);

  return (
    <div className="relative h-full">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={cn("scrollbar-hidden h-full overflow-y-auto", className)}
      >
        {children}
      </div>

      {/* Overlay scroll indicator */}
      <div
        className={cn(
          "pointer-events-none absolute top-0 right-1 bottom-0 transition-opacity duration-300",
          thumbWidth,
          isScrolling && scrollInfo.thumbHeight > 0 ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cn("absolute right-0 rounded-full bg-neutral-400/50", thumbWidth)}
          style={{
            height: `${scrollInfo.thumbHeight}px`,
            top: `${scrollInfo.thumbTop}px`,
          }}
        />
      </div>
    </div>
  );
}
