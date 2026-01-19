'use client';

import { useEffect, useRef, useState, startTransition } from 'react';

// Throttle function to limit scroll handler calls
function throttle<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Use startTransition for non-urgent UI updates
      startTransition(() => {
        setProgress(scrollPercent);
      });
    };

    // Throttle scroll handler to ~60fps (16ms) for smooth performance
    const throttledUpdate = throttle(() => {
      // Cancel any pending RAF to avoid stacking
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateProgress);
    }, 16);

    window.addEventListener('scroll', throttledUpdate, { passive: true });
    updateProgress(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledUpdate);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      className="reading-progress"
      style={{ width: `${progress}%` }}
      aria-hidden="true"
    />
  );
}
