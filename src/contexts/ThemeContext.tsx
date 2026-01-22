'use client';

import { createContext, useContext, useEffect, useState, useCallback, useRef, ReactNode } from 'react';

export type Theme = 'obsidian' | 'alabaster' | 'dusk';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Duration should match the CSS transition duration (--transition-slow: 350ms)
const TRANSITION_DURATION = 350;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('obsidian');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Wrapped setTheme that handles smooth transitions
  const setTheme = useCallback((newTheme: Theme) => {
    if (newTheme === theme || isTransitioning) return;

    const root = document.documentElement;

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // Enable transitions
    setIsTransitioning(true);
    root.classList.add('theme-transition');

    // Use requestAnimationFrame to ensure the class is applied before changing theme
    requestAnimationFrame(() => {
      // Apply the new theme
      root.setAttribute('data-theme', newTheme);
      localStorage.setItem('blog-theme', newTheme);
      setThemeState(newTheme);

      // Remove transition class after animation completes
      transitionTimeoutRef.current = setTimeout(() => {
        root.classList.remove('theme-transition');
        setIsTransitioning(false);
      }, TRANSITION_DURATION);
    });
  }, [theme, isTransitioning]);

  // Load theme from localStorage on mount (sync with inline script)
  useEffect(() => {
    // Read the theme that was already set by the inline script
    const currentTheme = document.documentElement.getAttribute('data-theme') as Theme;
    if (currentTheme && ['obsidian', 'alabaster', 'dusk'].includes(currentTheme)) {
      setThemeState(currentTheme);
    }

    // Cleanup timeout on unmount
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // The inline script in layout.tsx already sets the theme before hydration,
  // so we don't need to hide content - just sync React state with DOM
  return (
    <ThemeContext.Provider value={{ theme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // Return default values during SSR/SSG when context is not available
  if (context === undefined) {
    return {
      theme: 'obsidian' as Theme,
      setTheme: () => {},
      isTransitioning: false,
    };
  }
  return context;
}
