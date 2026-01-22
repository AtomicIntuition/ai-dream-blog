'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';
import { getThemeColors } from '@/lib/theme-colors';

interface ParticleFieldProps {
  count?: number;
}

// Vertex shader for particles with custom attributes
const vertexShader = `
  attribute float size;
  attribute float brightness;
  attribute vec3 customColor;

  varying vec3 vColor;
  varying float vBrightness;

  uniform float time;
  uniform float pixelRatio;

  void main() {
    vColor = customColor;
    vBrightness = brightness;

    vec3 pos = position;

    // Gentle floating animation
    pos.y += sin(time * 0.5 + position.x * 0.5) * 0.3;
    pos.x += cos(time * 0.3 + position.z * 0.5) * 0.2;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

    // Size attenuation
    gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader for soft glowing particles
const fragmentShader = `
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    // Create soft circular particle
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);

    // Soft falloff
    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
    alpha *= vBrightness;

    // Add glow effect
    float glow = exp(-dist * 3.0) * 0.5;
    alpha += glow * vBrightness;

    // Twinkle effect based on brightness variation
    alpha *= 0.6 + 0.4 * vBrightness;

    gl_FragColor = vec4(vColor, alpha);
  }
`;

export function ParticleField({ count = 800 }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  // Generate particle positions and attributes
  const { positions, sizes, brightnesses, particleColors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const brightnesses = new Float32Array(count);
    const particleColors = new Float32Array(count * 3);

    // Parse colors for interpolation
    const primaryColor = new THREE.Color(colors.particlePrimaryHex);
    const secondaryColor = new THREE.Color(colors.particleSecondaryHex);

    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere with more density in the center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 15 + Math.random() * 25;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) - 5;
      positions[i * 3 + 2] = radius * Math.cos(phi) - 20;

      // Vary sizes
      sizes[i] = 0.5 + Math.random() * 2;

      // Random brightness for twinkle effect
      brightnesses[i] = 0.3 + Math.random() * 0.7;

      // Interpolate between primary and secondary colors
      const t = Math.random();
      const color = primaryColor.clone().lerp(secondaryColor, t);
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    return { positions, sizes, brightnesses, particleColors };
  }, [count, colors.particlePrimaryHex, colors.particleSecondaryHex]);

  // Animate particles
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value = clock.getElapsedTime();

      // Slow rotation
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
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
