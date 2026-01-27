"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronRight, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTour } from "./tour-provider";

// Tooltip offset styles based on beacon position relative to target
const TOOLTIP_STYLE: Record<string, React.CSSProperties> = {
  top: { transform: "translate(-50%, calc(-100% - 14px))" },
  bottom: { top: "14px", transform: "translateX(-50%)" },
  left: { transform: "translate(calc(-100% - 14px), -50%)" },
  right: { left: "14px", transform: "translateY(-50%)" },
};

export function TourOverlay() {
  const {
    isActive,
    toggleTour,
    currentStep,
    currentStepIndex,
    totalSteps,
    nextStep,
    prevStep,
  } = useTour();

  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);
  const [targetVisible, setTargetVisible] = useState(false);
  const rafRef = useRef(0);

  // Track target element position
  const updatePosition = useCallback(() => {
    if (!currentStep || !isActive) {
      setTargetVisible(false);
      return;
    }

    const el = document.querySelector(
      `[data-tour="${currentStep.target}"]`
    ) as HTMLElement | null;

    if (!el) {
      setTargetVisible(false);
      return;
    }

    const rect = el.getBoundingClientRect();
    const DOT_GAP = 8;

    let x = 0;
    let y = 0;

    switch (currentStep.position) {
      case "top":
        x = rect.left + rect.width / 2;
        y = rect.top - DOT_GAP;
        break;
      case "bottom":
        x = rect.left + rect.width / 2;
        y = rect.bottom + DOT_GAP;
        break;
      case "left":
        x = rect.left - DOT_GAP;
        y = rect.top + rect.height / 2;
        break;
      case "right":
        x = rect.right + DOT_GAP;
        y = rect.top + rect.height / 2;
        break;
    }

    setAnchor({ x, y });
    setTargetVisible(true);
  }, [currentStep, isActive]);

  // Update position on scroll, resize, and DOM mutations (~30fps)
  useEffect(() => {
    let lastUpdate = 0;
    const loop = (time: number) => {
      if (time - lastUpdate > 33) {
        updatePosition();
        lastUpdate = time;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [updatePosition]);

  // SSR guard — createPortal requires document
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Beacon + Tooltip */}
      <AnimatePresence mode="wait">
        {isActive && targetVisible && anchor && currentStep && (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="pointer-events-none fixed z-9999"
            style={{ top: anchor.y, left: anchor.x }}
          >
            {/* Pulsing dot */}
            <div className="absolute -translate-1/2">
              <div className="relative">
                <div className="size-2.5 rounded-full bg-brand-500" />
                <div className="absolute inset-0 animate-tour-pulse rounded-full bg-brand-400" />
              </div>
            </div>

            {/* Tooltip card */}
            <div
              className="pointer-events-auto absolute w-64 rounded-lg border border-neutral-800 bg-neutral-900 p-3 shadow-xl"
              style={TOOLTIP_STYLE[currentStep.position]}
            >
              <p className="text-caption leading-relaxed text-neutral-200">
                {currentStep.message}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-caption text-neutral-500 tabular-nums">
                  {currentStepIndex + 1} / {totalSteps}
                </span>
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevStep();
                    }}
                    disabled={currentStepIndex === 0}
                    className="rounded-sm p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextStep();
                    }}
                    disabled={currentStepIndex === totalSteps - 1}
                    className="rounded-sm p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200 disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Next step"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button — always visible */}
      <button
        onClick={toggleTour}
        className="fixed right-4 bottom-4 z-9999 flex items-center gap-1.5 rounded-full border border-neutral-200 bg-default-background px-3 py-1.5 text-caption shadow-md transition-all hover:shadow-lg"
        title="Press ? to toggle"
      >
        {isActive ? (
          <>
            <EyeOff className="size-3.5 text-neutral-500" />
            <span className="text-neutral-600">Hide guide</span>
          </>
        ) : (
          <>
            <Eye className="size-3.5 text-brand-500" />
            <span className="text-neutral-600">Show guide</span>
          </>
        )}
      </button>
    </>,
    document.body
  );
}
