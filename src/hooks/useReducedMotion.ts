'use client';

import { useState, useEffect } from 'react';

/**
 * Detects if user prefers reduced motion via OS/browser settings
 * Returns true if user has enabled "Reduce motion" in their system preferences
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check media query for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers support addEventListener
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that combines reduced motion preference with an override
 * Useful when you want to allow users to enable animations even with system preference
 */
export function useAnimationPreference(userOverride?: boolean): boolean {
  const systemPreference = useReducedMotion();

  // If user explicitly set a preference, use that
  if (userOverride !== undefined) {
    return userOverride;
  }

  // Otherwise respect system preference (true = no animations)
  return systemPreference;
}
