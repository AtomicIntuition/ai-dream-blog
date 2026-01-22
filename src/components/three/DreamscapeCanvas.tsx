'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

import { ParticleField } from './ParticleField';
import { FloatingObjects } from './FloatingObjects';
import { NebulaBackground } from './NebulaBackground';
import { CameraRig, ParallaxGroup } from './CameraRig';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/lib/theme-colors';
import type { GPUTier } from '@/hooks/useGPUDetection';
import {
  getParticleCount,
  shouldEnableBloom,
  getFloatingObjectCount,
} from '@/hooks/useGPUDetection';

interface DreamscapeCanvasProps {
  tier: GPUTier;
  reducedMotion: boolean;
}

function Scene({ tier, reducedMotion }: DreamscapeCanvasProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const particleCount = getParticleCount(tier);
  const floatingCount = getFloatingObjectCount(tier);
  const enableBloom = shouldEnableBloom(tier);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <pointLight
        position={[10, 10, 10]}
        intensity={0.8}
        color={colors.primaryHex}
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.4}
        color={colors.secondaryHex}
      />

      {/* Camera controls */}
      {!reducedMotion && <CameraRig intensity={0.12} smoothing={0.04} />}

      {/* Background nebula */}
      <NebulaBackground />

      {/* Particle field */}
      {particleCount > 0 && (
        <ParallaxGroup intensity={0.3}>
          <ParticleField count={particleCount} />
        </ParallaxGroup>
      )}

      {/* Floating glass objects */}
      {floatingCount > 0 && !reducedMotion && (
        <Suspense fallback={null}>
          <ParallaxGroup intensity={0.5}>
            <FloatingObjects count={floatingCount} />
          </ParallaxGroup>
        </Suspense>
      )}

      {/* Post-processing effects */}
      {enableBloom && !reducedMotion && (
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette
            offset={0.3}
            darkness={0.5}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      )}

      {/* Preload assets */}
      <Preload all />
    </>
  );
}

export function DreamscapeCanvas({ tier, reducedMotion }: DreamscapeCanvasProps) {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <Canvas
      camera={{
        position: [0, 0, 10],
        fov: 60,
        near: 0.1,
        far: 100,
      }}
      dpr={[1, tier === 'high' ? 2 : 1.5]}
      gl={{
        antialias: tier === 'high',
        alpha: true,
        powerPreference: tier === 'high' ? 'high-performance' : 'default',
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <color attach="background" args={[colors.backgroundStartHex]} />
      <fog attach="fog" args={[colors.fogColorHex, colors.fogNear, colors.fogFar]} />

      <Suspense fallback={null}>
        <Scene tier={tier} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
