"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "dps-theme";

// Lazy initializer for theme state - called only once during initial render
function getInitialTheme(): Theme {
  // Server-side: return light as default
  if (typeof window === "undefined") return "light";

  // Client-side: check localStorage first, default to light
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (stored) return stored;

  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initialization to get theme from localStorage/system on first render
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
