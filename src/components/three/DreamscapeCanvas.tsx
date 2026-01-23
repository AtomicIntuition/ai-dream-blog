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
      {/* Lighting - softer for smoother look */}
      <ambientLight intensity={0.5} />
      <pointLight
        position={[10, 10, 10]}
        intensity={0.6}
        color={colors.primaryHex}
        distance={50}
        decay={2}
      />
      <pointLight
        position={[-10, -10, -10]}
        intensity={0.3}
        color={colors.secondaryHex}
        distance={50}
        decay={2}
      />

      {/* Camera controls with smooth damping */}
      {!reducedMotion && <CameraRig intensity={0.1} smoothing={4} />}

      {/* Background nebula */}
      <NebulaBackground />

      {/* Particle field - smooth stars */}
      {particleCount > 0 && (
        <ParallaxGroup intensity={0.25} smoothing={3}>
          <ParticleField count={particleCount} />
        </ParallaxGroup>
      )}

      {/* Floating glass objects */}
      {floatingCount > 0 && !reducedMotion && (
        <Suspense fallback={null}>
          <ParallaxGroup intensity={0.35} smoothing={3}>
            <FloatingObjects count={floatingCount} />
          </ParallaxGroup>
        </Suspense>
      )}

      {/* Post-processing effects - subtle bloom */}
      {enableBloom && !reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.95}
            mipmapBlur
          />
          <Vignette
            offset={0.35}
            darkness={0.4}
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
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
      frameloop="always"
      performance={{ min: 0.5 }}
    >
      <color attach="background" args={[colors.backgroundStartHex]} />
      <fog attach="fog" args={[colors.fogColorHex, colors.fogNear, colors.fogFar]} />

      <Suspense fallback={null}>
        <Scene tier={tier} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
