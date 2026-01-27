"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";
import { TOUR_STEPS, type TourStep } from "@/lib/tour-config";

interface TourContextType {
  isActive: boolean;
  toggleTour: () => void;
  currentStep: TourStep | null;
  currentStepIndex: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
}

const TourContext = createContext<TourContextType | null>(null);

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useTour must be used within TourProvider");
  return ctx;
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  // When route changes, jump to first step for that route
  // (React-recommended pattern: adjust state during render when props change)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    const idx = TOUR_STEPS.findIndex((s) => s.route === pathname);
    if (idx !== -1) setStepIndex(idx);
  }

  const currentStep = TOUR_STEPS[stepIndex] ?? null;

  const nextStep = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, TOUR_STEPS.length - 1));
  }, []);

  const prevStep = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
  }, []);

  const toggleTour = useCallback(() => {
    setIsActive((v) => !v);
  }, []);

  // Keyboard: press "?" to toggle tour
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        toggleTour();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleTour]);

  const value = useMemo(
    () => ({
      isActive,
      toggleTour,
      currentStep,
      currentStepIndex: stepIndex,
      totalSteps: TOUR_STEPS.length,
      nextStep,
      prevStep,
    }),
    [isActive, toggleTour, currentStep, stepIndex, nextStep, prevStep]
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}
