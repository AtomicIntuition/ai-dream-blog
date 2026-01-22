'use client';

import { useMemo } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface FloatingDot {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface StaticHeroFallbackProps {
  reducedMotion?: boolean;
}

export function StaticHeroFallback({ reducedMotion = false }: StaticHeroFallbackProps) {
  const { theme } = useTheme();

  // Generate random floating dots
  const dots = useMemo<FloatingDot[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 4,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * -20,
      opacity: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  // Theme-specific gradient colors
  const gradientColors = useMemo(() => {
    switch (theme) {
      case 'obsidian':
        return {
          from: 'rgb(10, 10, 15)',
          via: 'rgb(18, 18, 26)',
          to: 'rgb(26, 26, 36)',
          accent1: 'rgba(201, 168, 124, 0.15)',
          accent2: 'rgba(139, 157, 195, 0.1)',
          dotColor: 'rgba(232, 196, 160, 0.6)',
        };
      case 'alabaster':
        return {
          from: 'rgb(250, 250, 250)',
          via: 'rgb(245, 245, 245)',
          to: 'rgb(238, 238, 238)',
          accent1: 'rgba(90, 103, 216, 0.08)',
          accent2: 'rgba(74, 85, 104, 0.05)',
          dotColor: 'rgba(90, 103, 216, 0.4)',
        };
      case 'dusk':
        return {
          from: 'rgb(28, 25, 23)',
          via: 'rgb(38, 34, 32)',
          to: 'rgb(48, 43, 39)',
          accent1: 'rgba(194, 65, 12, 0.12)',
          accent2: 'rgba(161, 98, 7, 0.08)',
          dotColor: 'rgba(251, 146, 60, 0.5)',
        };
    }
  }, [theme]);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${gradientColors.from} 0%, ${gradientColors.via} 50%, ${gradientColors.to} 100%)`,
      }}
      aria-hidden="true"
    >
      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px]"
        style={{ background: gradientColors.accent1 }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{ background: gradientColors.accent2 }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
        style={{ background: gradientColors.accent1, opacity: 0.5 }}
      />

      {/* Floating dots (only if motion is allowed) */}
      {!reducedMotion &&
        dots.map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full animate-float-gentle"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: gradientColors.dotColor,
              opacity: dot.opacity,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}

      {/* Static dots for reduced motion */}
      {reducedMotion &&
        dots.slice(0, 15).map((dot) => (
          <div
            key={dot.id}
            className="absolute rounded-full"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              backgroundColor: gradientColors.dotColor,
              opacity: dot.opacity * 0.5,
            }}
          />
        ))}

      {/* Subtle grid pattern for texture */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(${theme === 'alabaster' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} 1px, transparent 1px),
            linear-gradient(90deg, ${theme === 'alabaster' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
