'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/lib/theme-colors';

interface ParticleFieldProps {
  count?: number;
}

// Vertex shader with smooth animation
const vertexShader = `
  attribute float size;
  attribute float brightness;
  attribute vec3 customColor;
  attribute float phase;

  varying vec3 vColor;
  varying float vBrightness;
  varying float vPhase;

  uniform float time;
  uniform float pixelRatio;

  void main() {
    vColor = customColor;
    vBrightness = brightness;
    vPhase = phase;

    vec3 pos = position;

    // Smooth floating animation with unique phase per particle
    float t = time * 0.15 + phase;
    pos.y += sin(t + pos.x * 0.1) * 0.4;
    pos.x += cos(t * 0.7 + pos.z * 0.1) * 0.3;
    pos.z += sin(t * 0.5 + pos.y * 0.1) * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation with distance - larger base size for smoother circles
    float depth = -mvPosition.z;
    gl_PointSize = size * pixelRatio * (400.0 / max(depth, 1.0));

    // Clamp size to prevent too small (pixelated) or too large
    gl_PointSize = clamp(gl_PointSize, 2.0, 64.0);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader with perfect anti-aliased circles
const fragmentShader = `
  varying vec3 vColor;
  varying float vBrightness;
  varying float vPhase;

  uniform float time;

  void main() {
    // Distance from center (0 at center, 0.5 at edge)
    vec2 cxy = gl_PointCoord * 2.0 - 1.0;
    float dist = length(cxy);

    // Discard pixels outside the circle for clean edges
    if (dist > 1.0) discard;

    // Smooth anti-aliased circle using smoothstep
    // The key to smooth circles is a gradual falloff at the edge
    float edgeSoftness = fwidth(dist) * 2.0;
    float circle = 1.0 - smoothstep(0.8 - edgeSoftness, 0.8 + edgeSoftness, dist);

    // Soft inner glow - gaussian-like falloff
    float glow = exp(-dist * dist * 2.0);

    // Combine circle and glow
    float alpha = mix(glow, circle, 0.5);

    // Gentle twinkle effect - very subtle
    float twinkle = 0.85 + 0.15 * sin(time * 2.0 + vPhase * 6.28);
    alpha *= vBrightness * twinkle;

    // Boost the center brightness for star-like appearance
    vec3 finalColor = vColor;
    float centerBoost = exp(-dist * dist * 4.0) * 0.3;
    finalColor += centerBoost;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export function ParticleField({ count = 800 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const timeRef = useRef(0);

  // Generate particle positions and attributes
  const { positions, sizes, brightnesses, particleColors, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightnesses = new Float32Array(count);
    const particleColors = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    // Parse colors for interpolation
    const primaryColor = new THREE.Color(colors.particlePrimaryHex);
    const secondaryColor = new THREE.Color(colors.particleSecondaryHex);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere with more density toward center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      // Use cube root for more even volume distribution
      const radius = 12 + Math.pow(Math.random(), 0.5) * 28;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 3;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 15;

      // Vary sizes - slightly larger for smoother rendering
      sizes[i] = 1.0 + Math.random() * 2.5;

      // Brightness variation
      brightnesses[i] = 0.4 + Math.random() * 0.6;

      // Random phase for animation offset
      phases[i] = Math.random();

      // Interpolate between primary and secondary colors
      const t = Math.random();
      const color = primaryColor.clone().lerp(secondaryColor, t);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    return { positions, sizes, brightnesses, particleColors, phases };
  }, [count, colors.particlePrimaryHex, colors.particleSecondaryHex]);

  // Smooth animation with delta time
  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;

      // Accumulate time smoothly
      timeRef.current += delta;
      material.uniforms.time.value = timeRef.current;

      // Very slow, smooth rotation
      meshRef.current.rotation.y += delta * 0.015;
    }
  });

  // Update colors when theme changes
  useMemo(() => {
    if (meshRef.current) {
      const geometry = meshRef.current.geometry;
      const colorAttr = geometry.getAttribute('customColor');

      if (colorAttr) {
        const primaryColor = new THREE.Color(colors.particlePrimaryHex);
        const secondaryColor = new THREE.Color(colors.particleSecondaryHex);

        for (let i = 0; i < count; i++) {
          const t = Math.random();
          const color = primaryColor.clone().lerp(secondaryColor, t);
          colorAttr.setXYZ(i, color.r, color.g, color.b);
        }
        colorAttr.needsUpdate = true;
      }
    }
  }, [colors.particlePrimaryHex, colors.particleSecondaryHex, count]);

  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    }),
    []
  );

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-brightness"
          count={count}
          array={brightnesses}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-customColor"
          count={count}
          array={particleColors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-phase"
          count={count}
          array={phases}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
