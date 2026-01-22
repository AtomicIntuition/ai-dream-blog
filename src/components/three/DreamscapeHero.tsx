'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { useGPUDetection } from '@/hooks/useGPUDetection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { StaticHeroFallback } from './StaticHeroFallback';

// Lazy load the heavy 3D canvas
const DreamscapeCanvas = lazy(() =>
  import('./DreamscapeCanvas').then((mod) => ({ default: mod.DreamscapeCanvas }))
);

interface DreamscapeHeroProps {
  /** Content to render on top of the hero */
  children?: React.ReactNode;
  /** Minimum height of the hero section */
  minHeight?: string;
  /** Additional className for the container */
  className?: string;
  /** Force a specific tier for testing */
  forceTier?: 'high' | 'medium' | 'low';
}

export function DreamscapeHero({
  children,
  minHeight = '70vh',
  className = '',
  forceTier,
}: DreamscapeHeroProps) {
  const { tier, isLoading } = useGPUDetection();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Ensure we're mounted on client before rendering 3D
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use forced tier if provided, otherwise use detected tier
  const effectiveTier = forceTier || tier;

  // Determine if we should show 3D canvas
  const show3D = mounted && !isLoading && effectiveTier !== 'low' && !reducedMotion;

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Loading state - show static fallback while loading */}
        {(!mounted || isLoading) && (
          <StaticHeroFallback reducedMotion={reducedMotion} />
        )}

        {/* 3D Canvas for capable devices */}
        {show3D && (
          <Suspense fallback={<StaticHeroFallback reducedMotion={reducedMotion} />}>
            <DreamscapeCanvas tier={effectiveTier} reducedMotion={reducedMotion} />
          </Suspense>
        )}

        {/* Static fallback for low-tier devices or reduced motion */}
        {mounted && !isLoading && (effectiveTier === 'low' || reducedMotion) && (
          <StaticHeroFallback reducedMotion={reducedMotion} />
        )}
      </div>

      {/* Content overlay */}
      <div className="relative z-10">{children}</div>

      {/* Performance indicator for development */}
      {process.env.NODE_ENV === 'development' && mounted && !isLoading && (
        <div className="absolute bottom-4 left-4 z-50 px-2 py-1 text-xs font-mono bg-black/50 text-white rounded">
          GPU: {effectiveTier} | Motion: {reducedMotion ? 'reduced' : 'full'}
        </div>
      )}
    </section>
  );
}

// Export individual components for advanced usage
export { DreamscapeCanvas } from './DreamscapeCanvas';
export { StaticHeroFallback } from './StaticHeroFallback';
export { ParticleField } from './ParticleField';
export { FloatingObjects } from './FloatingObjects';
export { NebulaBackground } from './NebulaBackground';
export { CameraRig, ParallaxGroup, AutoCameraAnimation } from './CameraRig';
