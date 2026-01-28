"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className={cn(
        "group/theme w-full justify-between text-neutral-600 hover:bg-neutral-100 hover:text-neutral-600 active:bg-neutral-200",
        "transition-transform duration-100 active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:active:scale-100",
        className
      )}
    >
      <span className="flex items-center gap-2">
        <span className="relative size-4">
          {/* Sun icon - visible in dark mode (click to go to light) */}
          <Sun
            className={cn(
              "absolute inset-0 size-4",
              "transition-all duration-200 ease-out-expo",
              "motion-reduce:transition-none",
              theme === "dark"
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 -rotate-90 opacity-0"
            )}
          />
          {/* Moon icon - visible in light mode (click to go to dark) */}
          <Moon
            className={cn(
              "absolute inset-0 size-4",
              "transition-all duration-200 ease-out-expo",
              "motion-reduce:transition-none",
              theme === "light"
                ? "scale-100 rotate-0 opacity-100"
                : "scale-0 rotate-90 opacity-0"
            )}
          />
        </span>
        <span className="transition-opacity duration-150 ease-out-expo motion-reduce:transition-none">
          {theme === "light" ? "Dark mode" : "Light mode"}
        </span>
      </span>
    </Button>
  );
}
